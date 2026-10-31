import { getPublishedPosts } from "@/lib/posts";
import { renderRss } from "@/lib/rss";
import { isSplashMode } from "@/lib/site-mode";

export async function GET() {
  if (isSplashMode()) {
    return new Response("This site is coming soon.\n", {
      status: 503,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Retry-After": "86400",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  }

  const posts = await getPublishedPosts();
  const xml = renderRss(posts);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
