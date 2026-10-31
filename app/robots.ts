import type { MetadataRoute } from "next";
import { isSplashMode } from "@/lib/site-mode";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Disallow the whole host and omit the sitemap so crawlers are not handed
  // the blog, posts, or tags while the splash is up.
  if (isSplashMode()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
