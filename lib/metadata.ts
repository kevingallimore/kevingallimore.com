import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Metadata for the holding page. noindex so the placeholder is not the public site. */
export function splashMetadata(): Metadata {
  const description = `${site.tagline} This site is coming soon.`;

  return {
    title: { absolute: site.name },
    description,
    robots: { index: false, follow: false },
    alternates: { canonical: "/" },
    openGraph: {
      title: site.name,
      description,
      url: "/",
      type: "website",
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description,
    },
  };
}

/** Shared title, description, canonical URL, and social tags for one page. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const socialTitle = title ?? site.name;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": "/rss.xml",
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      type: "website",
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
