import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getPostsByTag, getTag, getTags } from "@/lib/posts";
import { site } from "@/lib/site";

export const ensureStatic = "navigation";

export async function generateStaticParams() {
  const tags = await getTags();
  if (tags.length === 0) {
    throw new Error(
      "Add at least one tag to a published post before building. Tag pages are prerendered.",
    );
  }
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = await getTag(slug);
  if (!tag) return { title: "Not found" };

  const path = `/tags/${tag.slug}`;
  const description = `Posts by ${site.name} tagged ${tag.name}.`;
  const title = tag.name;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/rss.xml" },
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TagPage({ params }: PageProps<"/tags/[tag]">) {
  const { tag: slug } = await params;
  const tag = await getTag(slug);
  if (!tag) notFound();

  const posts = await getPostsByTag(slug);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
        Tag
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
        {tag.name}
      </h1>
      <p className="mt-4 text-muted">
        {tag.count} {tag.count === 1 ? "post" : "posts"}
      </p>
      <PostList posts={posts} />
    </div>
  );
}
