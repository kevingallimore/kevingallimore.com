import {themes as prismThemes} from "prism-react-renderer";
import type {Config} from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import siteExtrasPlugin from "./src/plugins/site-extras";
import {personJsonLd, site, splashDocumentTitle} from "./src/site";

/**
 * Read when the site is built, not on each visit.
 * Unset means splash, so a deploy cannot publish the full site by accident.
 * Set SITE_MODE=live and deploy again to publish. Set it back to splash,
 * or delete it, and deploy again to take the site offline.
 */
const siteMode = process.env.SITE_MODE?.trim() || "splash";

if (siteMode !== "splash" && siteMode !== "live") {
  throw new Error(
    `SITE_MODE must be "splash" or "live". Leave it unset for splash. Received "${siteMode}".`,
  );
}

const isLive = siteMode === "live";

const config: Config = {
  // Splash builds use the full homepage title so Docusaurus does not append
  // the name a second time. Live builds keep the short site name.
  title: isLive ? site.name : splashDocumentTitle,
  tagline: site.tagline,
  favicon: "img/favicon.svg",
  url: site.url,
  baseUrl: "/",
  organizationName: "kevingallimore",
  projectName: "kevingallimore.com",
  onBrokenLinks: "throw",
  future: {
    // 3.10 is the last v3 release. This flag turns on the v4-compatible defaults.
    v4: true,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  customFields: {
    siteMode,
  },
  // Same Person block on every page, including /about and the splash.
  // Do not add another Person script on a single page.
  headTags: [
    ...site.sameAs.map((href) => ({
      tagName: "link",
      attributes: {rel: "me", href},
    })),
    {
      tagName: "script",
      attributes: {type: "application/ld+json"},
      innerHTML: JSON.stringify(personJsonLd),
    },
  ],
  plugins: [
    siteExtrasPlugin,
    // Local search. No Algolia key. The index is built with the site,
    // so it shows up after `npm run build`, not during `npm start`.
    ...(isLive
      ? [
          [
            "@cmfcmf/docusaurus-search-local",
            {
              indexBlog: true,
              indexDocs: true,
              indexPages: true,
              language: "en",
            },
          ],
        ]
      : []),
  ],
  presets: [
    [
      "classic",
      {
        // Splash builds omit docs, blog, and the sitemap so those URLs are not published.
        docs: isLive
          ? {
              path: "docs",
              routeBasePath: "sfmc-reference",
              sidebarPath: "./sidebars.ts",
            }
          : false,
        blog: isLive
          ? {
              showReadingTime: false,
              blogTitle: "Blog",
              blogDescription: `Writing by ${site.name} on CRM, email, personalization, Salesforce Marketing Cloud, and Data 360.`,
              postsPerPage: 10,
              feedOptions: {
                type: ["rss", "atom"],
                title: site.name,
                description: site.description,
                copyright: site.name,
                language: "en",
              },
              onInlineTags: "warn",
              onInlineAuthors: "warn",
              onUntruncatedBlogPosts: "warn",
            }
          : false,
        sitemap: isLive ? {changefreq: "weekly", priority: 0.5} : false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: isLive ? "img/og.png" : "img/og-splash.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: site.name,
      items: isLive
        ? [
            {to: "/blog", label: "Blog", position: "left"},
            {
              type: "docSidebar",
              sidebarId: "sfmc",
              position: "left",
              label: "SFMC Reference",
            },
            {to: "/about", label: "About", position: "left"},
          ]
        : [],
    },
    footer: {
      links: [
        {
          title: "Connect",
          items: [
            {label: "LinkedIn", href: site.sameAs[0]},
            {label: "GitHub", href: site.sameAs[1]},
            {label: "Trailblazer", href: site.sameAs[2]},
            ...(isLive
              ? [
                  {label: "Contact", to: "/contact"},
                  {label: "RSS", href: `${site.url}/blog/rss.xml`},
                ]
              : []),
          ],
        },
      ],
      copyright: `${site.name} · ${site.jobTitle}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ["sql", "json"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
