import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { proseClassName } from "@/components/mdx";
import { compilePost } from "@/lib/compile";
import { formatDate, tagSlug } from "@/lib/format";
import { getPost, getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const ensureStatic = "navigation";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  if (posts.length === 0) {
    throw new Error(
      "Add at least one published MDX file in content/posts (draft: false) before building. Posts are prerendered.",
    );
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };

  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/rss.xml" },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: `${post.date}T00:00:00.000Z`,
      tags: post.tags,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const content = await compilePost(post.content);
  const url = `${site.url}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: url,
    keywords: post.tags.join(", "),
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <JsonLd data={articleJsonLd} />
      <p className="text-sm text-muted">
        <Link
          href="/blog"
          className="underline decoration-transparent underline-offset-4 hover:decoration-current hover:text-ink"
        >
          Blog
        </Link>
      </p>
      <header className="mt-6">
        <p className="text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.draft ? <span> · Draft</span> : null}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-muted">
          {post.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1" aria-label="Tags">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/tags/${tagSlug(tag)}`}
                className="text-sm text-accent underline decoration-transparent underline-offset-4 hover:decoration-current"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <div className={`mt-10 ${proseClassName}`}>{content}</div>
    </article>
  );
}
