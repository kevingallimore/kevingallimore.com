import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.jobTitle}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    kicker: site.jobTitle,
    title: site.name,
    footer: site.tagline,
  });
}
