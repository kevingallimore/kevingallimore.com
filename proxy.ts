import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isSplashMode } from "@/lib/site-mode";

/**
 * Splash mode is a gate in front of the app.
 * Blog, posts, tags, about, RSS, and the sitemap redirect to `/`.
 * Icons, the home social image, and robots.txt stay available. robots.txt
 * is what tells crawlers not to continue.
 *
 * Next drops the status code on a rewrite, so the production splash is the
 * built home HTML returned directly with 503. Dev has no built HTML yet, so
 * it renders the page normally and still sends noindex.
 */
const PASSTHROUGH = new Set([
  "/favicon.ico",
  "/icon",
  "/apple-icon",
  "/opengraph-image",
  "/twitter-image",
  "/robots.txt",
]);

let splashHtml: Promise<string | null> | undefined;

function loadSplashHtml(): Promise<string | null> {
  splashHtml ??= readFile(
    path.join(process.cwd(), ".next/server/app/index.html"),
    "utf8",
  ).catch(() => null);
  return splashHtml;
}

function splashHeaders(): Headers {
  const headers = new Headers();
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  headers.set("Retry-After", "86400");
  return headers;
}

function rewriteToSplash(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  const headers = splashHeaders();
  headers.delete("content-type");
  return NextResponse.rewrite(url, { headers });
}

export async function proxy(request: NextRequest) {
  if (!isSplashMode()) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (PASSTHROUGH.has(pathname)) return NextResponse.next();

  // App Router navigations ask for a flight payload, not a document.
  // Those are rewritten so the splash still renders. A 503 document
  // response would break that request.
  if (request.headers.get("rsc") === "1") {
    if (pathname === "/") {
      const headers = splashHeaders();
      headers.delete("content-type");
      return NextResponse.next({ headers });
    }
    return rewriteToSplash(request);
  }

  // One public URL. Other paths redirect here, then this response is 503.
  if (pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 307);
  }

  if (process.env.NODE_ENV === "production") {
    const html = await loadSplashHtml();
    if (html) {
      return new NextResponse(html, { status: 503, headers: splashHeaders() });
    }
  }

  const headers = splashHeaders();
  headers.delete("content-type");
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
