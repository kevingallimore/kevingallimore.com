import type { MetadataRoute } from "next";
import { getPublishedPosts, getTags } from "@/lib/posts";
import { isSplashMode } from "@/lib/site-mode";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isSplashMode()) return [];

  const posts = await getPublishedPosts();
  const tags = await getTags();
  const latest = posts[0]?.date;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/blog`,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${site.url}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${site.url}/tags/${tag.slug}`,
    lastModified: latest,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
