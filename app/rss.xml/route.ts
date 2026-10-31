import { getPublishedPosts } from "@/lib/posts";
import { renderRss } from "@/lib/rss";

export async function GET() {
  const posts = await getPublishedPosts();
  const xml = renderRss(posts);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
