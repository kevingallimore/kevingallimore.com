import fs from "node:fs/promises";
import path from "node:path";
import type {Plugin} from "@docusaurus/types";

type RecentPost = {
  title: string;
  description: string;
  permalink: string;
  date: string;
  tags: {label: string; permalink: string}[];
};

type BlogContent = {
  blogPosts?: {
    metadata: {
      title: string;
      description: string;
      permalink: string;
      date: Date | string;
      unlisted?: boolean;
      tags?: {label: string; permalink: string}[];
    };
  }[];
};

/**
 * Two small jobs the classic preset does not do on its own:
 * copy the newest posts onto the homepage, and write robots.txt for
 * whichever mode this build is (splash or live).
 */
export default function siteExtrasPlugin(): Plugin {
  return {
    name: "site-extras",
    async allContentLoaded({allContent, actions}) {
      const blog = allContent["docusaurus-plugin-content-blog"]?.default as
        | BlogContent
        | undefined;

      const posts = (blog?.blogPosts ?? [])
        .filter((post) => !post.metadata.unlisted)
        .map((post) => {
          const date = post.metadata.date;
          return {
            title: post.metadata.title,
            description: post.metadata.description,
            permalink: post.metadata.permalink,
            date: date instanceof Date ? date.toISOString() : String(date),
            tags: (post.metadata.tags ?? []).map((tag) => ({
              label: tag.label,
              permalink: tag.permalink,
            })),
          };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 5);

      actions.setGlobalData({posts});
    },
    async postBuild({outDir, siteConfig}) {
      const live = siteConfig.customFields?.siteMode === "live";
      // Splash builds must not hand crawlers a sitemap of pages that are hidden.
      const robots = live
        ? `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.url}/sitemap.xml\n`
        : `User-agent: *\nDisallow: /\n`;
      await fs.writeFile(path.join(outDir, "robots.txt"), robots);
    },
  };
}
