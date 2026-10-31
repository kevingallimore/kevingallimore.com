import {next} from "@vercel/functions";

/**
 * Vercel runs this before a request reaches the static files.
 * The pages themselves are chosen at build time by SITE_MODE in
 * docusaurus.config.ts. This file only does the request-time part:
 * send every other URL to the splash, and serve that page as 503.
 * Live builds pass the request through.
 */
const mode = process.env.SITE_MODE?.trim() || "splash";

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/img/") ||
    pathname === "/robots.txt" ||
    pathname === "/index.html" ||
    /\.(?:css|js|mjs|png|jpe?g|gif|svg|ico|webp|woff2?|map)$/.test(pathname)
  );
}

export default async function middleware(request: Request): Promise<Response> {
  if (mode === "live") return next();

  const {pathname} = new URL(request.url);
  if (isStaticAsset(pathname)) return next();

  if (pathname !== "/") {
    return Response.redirect(new URL("/", request.url), 307);
  }

  // index.html is excluded above so this fetch does not call middleware again.
  const page = await fetch(new URL("/index.html", request.url));
  const html = await page.text();
  return new Response(html, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow, noarchive",
      "retry-after": "86400",
      "cache-control": "no-store",
    },
  });
}

// The path matcher lives only in this file. vercel.json names this file as
// the proxy entrypoint, and a second matcher there fails the Vercel build.
export const config = {
  matcher: ["/((?!assets/|img/).*)"],
};
