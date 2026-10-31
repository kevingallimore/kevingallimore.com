import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export type SiteMode = "splash" | "live";

/** The value is fixed when the site is built. See docusaurus.config.ts. */
export function useSiteMode(): SiteMode {
  const {siteConfig} = useDocusaurusContext();
  return siteConfig.customFields?.siteMode === "live" ? "live" : "splash";
}
