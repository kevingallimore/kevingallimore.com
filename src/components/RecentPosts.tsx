import type {ReactNode} from "react";
import Link from "@docusaurus/Link";
import {usePluginData} from "@docusaurus/useGlobalData";
import TagChip from "@site/src/components/TagChip";

type RecentPost = {
  title: string;
  description: string;
  permalink: string;
  date: string;
  tags: {label: string; permalink: string}[];
};

function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

export default function RecentPosts(): ReactNode {
  const {posts} = usePluginData("site-extras") as {posts: RecentPost[]};

  return (
    <section className="recent-posts" aria-labelledby="recent-posts">
      <h2 id="recent-posts">Recent posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Add a Markdown file in the blog folder to publish one.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.permalink}>
              <article>
                <p className="recent-posts__date">
                  <time dateTime={post.date.slice(0, 10)}>{formatDate(post.date)}</time>
                </p>
                <h3>
                  <Link to={post.permalink}>{post.title}</Link>
                </h3>
                {post.description ? <p>{post.description}</p> : null}
                {post.tags.length > 0 ? (
                  <ul className="recent-posts__tags" aria-label="Tags">
                    {post.tags.map((tag) => (
                      <li key={tag.permalink}>
                        <TagChip permalink={tag.permalink} label={tag.label} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
