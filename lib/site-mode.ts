export type SiteMode = "splash" | "live";

/**
 * Read when the project is built, not on each visit.
 * Unset means splash, so merging and deploying cannot publish the full site
 * until SITE_MODE=live is set and the project is deployed again.
 * Set SITE_MODE=splash (or delete it) and redeploy to take the site offline.
 */
export function getSiteMode(): SiteMode {
  const raw = process.env.SITE_MODE?.trim() ?? "";

  if (raw === "" || raw === "splash") return "splash";
  if (raw === "live") return "live";

  throw new Error(
    `SITE_MODE must be "splash" or "live". Leave it unset for splash. Received "${raw}".`,
  );
}

export function isSplashMode(): boolean {
  return getSiteMode() === "splash";
}
