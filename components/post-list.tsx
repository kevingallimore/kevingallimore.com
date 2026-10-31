import Link from "next/link";
import { formatDate, tagSlug } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="mt-6 text-muted">
        No posts yet. Add an MDX file in <code>content/posts</code> to publish
        one.
      </p>
    );
  }

  return (
    <ul className="mt-2 divide-y divide-line">
      {posts.map((post) => (
        <li key={post.slug} className="py-8">
          <article>
            <p className="text-sm text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.draft ? <span> · Draft</span> : null}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
              <Link
                href={`/blog/${post.slug}`}
                className="underline decoration-transparent underline-offset-4 hover:decoration-current"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 max-w-2xl leading-7 text-muted">
              {post.description}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1" aria-label="Tags">
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
          </article>
        </li>
      ))}
    </ul>
  );
}
