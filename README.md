# kevingallimore.com

Personal site and technical blog for Kevin Gallimore, a Senior CRM Manager working in CRM, email, personalization, and customer data platforms on Salesforce Marketing Cloud and Data 360.

The public URL is [https://kevingallimore.com](https://kevingallimore.com).

## Stack

- [Next.js](https://nextjs.org/) App Router and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- MDX posts in `content/posts`, with [rehype-pretty-code](https://github.com/rehype-pretty/rehype-pretty-code) and [Shiki](https://shiki.style/) for syntax highlighting
- Static pages on Vercel. DNS stays on Cloudflare.

Analytics and a newsletter are intentionally not included yet.

## Prerequisites

Node.js 20.9 or newer. The GitHub Actions workflow uses Node.js 22.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). With no environment variable, this is the coming-soon splash, which is also what a fresh Vercel deploy shows.

To work on the full site locally:

```bash
SITE_MODE=live npm run dev
```

```bash
npm run lint
npm run build
SITE_MODE=live npm run build
npm start
```

`npm run build` with `SITE_MODE` unset builds the splash. `npm start` serves that production build. Use `SITE_MODE=live npm run build` before `npm start` when you want to preview the full site.

Posts marked `draft: true` show up in `npm run dev` with a Draft label. A production build, the sitemap, and the RSS feed skip them.

## Write a post

Add a file in `content/posts`. The filename is the URL: `content/posts/lookup-rows.mdx` becomes `/blog/lookup-rows`. Use lowercase kebab-case.

```mdx
---
title: "LookupRows, the short version"
description: "When to use LookupRows, and the one argument people forget."
date: 2026-10-31
tags:
  - ampscript
draft: false
---

The first paragraph of the post.
```

| Field | What it does |
| --- | --- |
| `title` | The H1 and the social title. Quote it if it contains a colon. |
| `description` | The line under the title, the meta description, and the RSS summary. |
| `date` | `YYYY-MM-DD`. Posts are listed newest first. |
| `tags` | At least one. Each tag gets a page at `/tags/that-tag`. |
| `draft` | `true` hides the post from the production site. `false` publishes it. |

Name a code fence so it is highlighted:

````md
```ampscript
SET @name = AttributeValue("FirstName")
```

```ssjs
Platform.Load("Core", "1.1.1");
```

```sql
SELECT SubscriberKey FROM ExampleAudience
```

```json
{ "status": "ok" }
```
````

`ampscript` uses the small grammar in `lib/languages/ampscript.ts`. `ssjs` is highlighted as JavaScript, because SSJS is JavaScript plus the Marketing Cloud platform libraries, and the block label still says SSJS. SQL, JSON, and other [Shiki languages](https://shiki.style/languages) work by their usual names.

`content/posts/example-code-blocks.mdx` is a sample. Delete it when you no longer need the example.

The site needs at least one published post to build. Post and tag pages are prerendered, and Next.js requires a real path for those routes.

## Project structure

```text
app/                  routes, sitemap, robots, RSS, and generated images
components/splash.tsx the coming-soon / offline page
content/posts/        one MDX file per post
lib/site-mode.ts      reads SITE_MODE (unset means splash)
lib/posts.ts          reads posts and hides drafts in production
lib/highlight.ts      Shiki setup, including AMPscript and SSJS
lib/site.ts           name, title, canonical URL, and profile links
proxy.ts              sends every public URL to the splash while offline
```

`lib/site.ts` is the place to change the public URL or a profile link. The LinkedIn URL must stay `https://www.linkedin.com/in/kevin-gallimore` (with the hyphen). The path without the hyphen is a different person.

## Turn the site on

`SITE_MODE` chooses what a deployment serves. It is read at **build** time. Saving the variable in Vercel does not change the site that is already deployed. You have to deploy again.

| `SITE_MODE` | What visitors get |
| --- | --- |
| unset | The splash. This is the default. |
| `splash` | The splash. Same as unset. |
| `live` | The full site. |

Anything else fails the build, so a typo cannot quietly publish or hide the wrong version.

While the splash is up, `/about`, `/blog`, posts, tags, `/rss.xml`, and `/sitemap.xml` redirect to `/`. That page is the splash and is served with HTTP 503, a `noindex` robots tag, and an `X-Robots-Tag: noindex` header. `robots.txt` disallows the whole host and does not list a sitemap, so the blog URLs are not advertised. The Person details (name, job title, and the LinkedIn, GitHub, and Trailblazer profiles) stay on the splash for search engines.

### Publish the full site

1. Open the Vercel project.
2. Go to **Settings → Environment Variables**.
3. Add `SITE_MODE` with the value `live`.
4. Apply it to **Production**. Add it to **Preview** as well if preview URLs should show the full site.
5. Deploy again. Open **Deployments**, choose the latest deployment, **Redeploy**, and leave **Use existing Build Cache** off. A new build is what picks up the variable.

After that deploy finishes, the home page, blog, and About page should be the real site, and `/robots.txt` should allow crawling and point at the sitemap.

### Take the site offline again

1. In the same Vercel setting, change `SITE_MODE` to `splash`, or delete the variable. Unset means splash.
2. Redeploy with the build cache off, the same way as above.

The splash component is `components/splash.tsx`. The sentence on that page is "This site is coming soon." Change that sentence in the file if a later outage needs a different note, then redeploy.

Local equivalents:

```bash
npm run dev                  # splash
SITE_MODE=live npm run dev   # full site
SITE_MODE=splash npm run build
SITE_MODE=live npm run build
```

## Deploy

Hosting is Vercel Hobby. DNS stays on Cloudflare. The only environment variable is `SITE_MODE`, and only when you want the full site. Leave it unset to keep the splash.

1. Merge this project to `main`.
2. In Vercel, import the GitHub repository. The framework preset is Next.js. The build command is `npm run build`.
3. Deploy once so the project exists, then add the domain `kevingallimore.com` in the Vercel project settings.
4. Vercel shows the DNS records to add. Create those records in Cloudflare. Leave the records on DNS only (the grey cloud) until Vercel finishes issuing the certificate. An orange-cloud proxy can block that step.
5. Add `www` only if you want it. Point it where Vercel tells you, and redirect `www` to the apex host in Vercel so there is one canonical URL.

The canonical host is hard-coded as `https://kevingallimore.com` in `lib/site.ts`. Change that value if the public URL ever changes, then redeploy.

## Before you share the site widely

- Rewrite the About page. The bio and the headshot are marked TODO. Put a photo in `public/` and render it with `next/image` where the placeholder is.
- Replace or delete the example post.
- Confirm the Vercel domain and the Cloudflare records above.
