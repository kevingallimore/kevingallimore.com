import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { isSplashMode } from "@/lib/site-mode";
import { site } from "@/lib/site";

export const alt = isSplashMode()
  ? `${site.name}. This site is coming soon.`
  : `${site.name}, ${site.jobTitle}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  if (isSplashMode()) {
    return renderOgImage({
      kicker: "Coming soon",
      title: site.name,
      footer: site.tagline,
    });
  }

  return renderOgImage({
    kicker: site.jobTitle,
    title: site.name,
    footer: site.tagline,
  });
}
