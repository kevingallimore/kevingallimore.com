# kevingallimore.com

Personal site, blog, and reference notes for Kevin Gallimore, a Senior CRM Manager. The writing lives in Markdown. The site is [Docusaurus](https://docusaurus.io/) 3.

The public URL is [https://www.kevingallimore.com](https://www.kevingallimore.com). The apex domain redirects there.

Posts go in `blog/`. Reference notes go in `docs/`. The homepage, About page, and splash page are React files under `src/pages/` because they are not articles.

## Prerequisites

Node.js 20 or newer. GitHub Actions uses Node.js 22.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). With no environment variable, this is the coming-soon splash. That is also what a fresh Vercel deploy shows.

To work on the full site:

```bash
SITE_MODE=live npm start
```

```bash
npm run typecheck
npm run build
SITE_MODE=live npm run build
npm run serve
```

`npm run build` with `SITE_MODE` unset builds the splash into the `build/` folder. `npm run serve` serves that folder. Run `SITE_MODE=live npm run build` first when you want to preview the full site.

Local search is built with the site. It does not appear while `npm start` is running. Build, then `npm run serve`, and the search box is in the header.

## Write a post

Add a file in `blog/`. The name becomes the URL: `blog/lookup-rows.mdx` becomes `/blog/lookup-rows`.

```mdx
---
title: "LookupRows, the short version"
description: "When to use LookupRows, and the one argument people forget."
date: 2026-10-31
authors: [kevin]
tags: [ampscript]
---

The summary that shows on the blog index.

{/* truncate */}

The rest of the post.
```

| Field | What it does |
| --- | --- |
| `title` | The heading and the social title. Quote it if it contains a colon. |
| `description` | The meta description. |
| `date` | `YYYY-MM-DD`. Newest posts are listed first. |
| `authors` | Use `kevin`, defined in `blog/authors.yml`. |
| `tags` | Each tag needs a matching entry in `blog/tags.yml`. Each tag gets a page. |
| `draft` | `draft: true` hides the post from a production build. It still shows in `npm start`. |

`{/* truncate */}` splits the short preview from the rest of the article. Put it after the opening paragraph. An HTML comment does not work here, because posts are MDX.

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

`ampscript` uses the grammar in `src/theme/prism-ampscript.js`. `ssjs` is highlighted as JavaScript, because SSJS is JavaScript plus the Marketing Cloud platform libraries, and the label still says SSJS. SQL and JSON are built in.

`blog/example-code-blocks.mdx` is a sample. Delete it when you no longer need it.

## Write a reference note

Add a Markdown file in `docs/`, then add its id to `sidebars.ts`. The id is the file path without the extension. `docs/sql/date-functions.mdx` has the id `sql/date-functions` and is published at `/sfmc-reference/sql/date-functions`.

`docs/start-here.mdx` is a placeholder. Replace it when the first real note exists.

## Turn the site on

`SITE_MODE` chooses what a deployment serves. It is read when the site is **built**. Saving it in Vercel does not change a deployment that already finished. Deploy again after you change it.

| `SITE_MODE` | What visitors get |
| --- | --- |
| unset | The splash. This is the default. |
| `splash` | The splash. Same as unset. |
| `live` | The full site. |

Anything else stops the build, so a typo cannot publish the wrong version.

While the splash is up:

- The homepage is a short profile: name, tagline, the bio in sections (now, before marketing, off the clock, speaking), a "Get in Touch" note, and the contact form. Profile links stay in the footer. There is no email address.
- The page is indexable. The response is HTTP 200, with no `noindex` and no `Retry-After`.
- `/about`, `/blog`, posts, tags, the reference section, RSS, and `/sitemap.xml` redirect to `/`.
- `robots.txt` allows the host and does not list a sitemap, because this build does not publish one.
- The Person details stay in the page for search engines. The LinkedIn URL is `https://www.linkedin.com/in/kevin-gallimore` (with the hyphen).

### Publish the full site

The Vercel project was created as a Next.js app. This repo's `vercel.json` switches the preset:

- Framework: Docusaurus (`docusaurus-2`, which is Vercel's name for current Docusaurus)
- Build command: `npm run build`
- Output directory: `build`

If the project settings still say Next.js after the next deploy, set those three values in **Settings → Build and Deployment** so they match `vercel.json`.

Then:

1. Open **Settings → Environment Variables**.
2. Add `SITE_MODE` with the value `live`.
3. Apply it to **Production**. Add it to **Preview** as well if preview URLs should show the full site.
4. **Redeploy** and leave **Use existing Build Cache** off. A new build is what picks up the variable.

### Take the site offline again

1. Change `SITE_MODE` to `splash`, or delete the variable. Unset means splash.
2. Redeploy with the build cache off.

The sentence on the splash page is in `src/components/Splash.tsx`.

## Project structure

```text
blog/                 one Markdown file per post
docs/                 reference notes, published under /sfmc-reference
src/pages/            homepage, About, and the 404 page
src/components/       splash page and the recent-posts list
src/theme/            AMPscript and SSJS syntax highlighting
docusaurus.config.ts  site title, navbar, and the splash/live switch
sidebars.ts           order of the reference notes
middleware.ts         Vercel redirects other URLs to the splash homepage
vercel.json           tells Vercel this is Docusaurus, not Next.js
```

`src/site.ts` is the place to change a profile link. Do not drop the hyphen in the LinkedIn URL.
