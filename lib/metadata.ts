import type { Metadata } from "next";
import { site } from "@/lib/site";

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
