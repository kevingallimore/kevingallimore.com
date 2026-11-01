import type {ReactNode} from "react";
import {ExternalLink} from "lucide-react";
import {siGithub, siRss, siX, siYoutube, type SimpleIcon} from "simple-icons";

/**
 * GitHub, X, YouTube, and RSS use Simple Icons (CC0). The icon is decorative.
 * The link text is the accessible name, and the icon follows the link color.
 *
 * LinkedIn and Salesforce Trailblazer are not in Simple Icons. Do not draw a
 * lookalike logo. Those links use Lucide's generic external-link icon.
 * Official brand assets can replace that icon later.
 * The LinkedIn URL stays https://www.linkedin.com/in/kevin-gallimore.
 */

function hostOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function BrandSvg({icon}: {icon: SimpleIcon}): ReactNode {
  return (
    <svg
      className="brand-icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

export function FooterLinkIcon({
  href,
  label,
}: {
  href?: string;
  label: string;
}): ReactNode {
  if (!href) return null;

  const host = hostOf(href);
  const path = (() => {
    try {
      return new URL(href).pathname.toLowerCase();
    } catch {
      return href.toLowerCase();
    }
  })();

  if (host === "github.com") return <BrandSvg icon={siGithub} />;
  if (host === "x.com" || host === "twitter.com") return <BrandSvg icon={siX} />;
  if (host === "youtube.com" || host === "youtu.be") return <BrandSvg icon={siYoutube} />;
  if (path.endsWith("/rss.xml") || path.endsWith("/rss") || label.toLowerCase() === "rss") {
    return <BrandSvg icon={siRss} />;
  }
  if (host === "linkedin.com" || path.includes("/trailblazer")) {
    return (
      <ExternalLink
        className="footer-link-icon"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    );
  }

  return null;
}
