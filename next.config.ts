import type { NextConfig } from "next";

// Baked in at build time. Unset deploys as splash. See README, "Turn the site on".
const siteMode = process.env.SITE_MODE?.trim() || "splash";

if (siteMode !== "splash" && siteMode !== "live") {
  throw new Error(
    `SITE_MODE must be "splash" or "live". Leave it unset for splash. Received "${siteMode}".`,
  );
}

const nextConfig: NextConfig = {
  env: {
    SITE_MODE: siteMode,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
