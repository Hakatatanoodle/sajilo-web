import { createOgImage, ogContentType, ogSize } from "@/components/OgImage";
import { site } from "@/content/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${site.name} — ${site.tagline}`;

/**
 * Default social-share image for the whole site (app-level OG convention).
 * Uses the shared card visual system — the same one every per-route card
 * inherits. Generated at build time.
 */
export default function OpengraphImage() {
  return createOgImage({
    headline: "Your business.",
    accent: "Online, properly.",
    sub: site.tagline,
  });
}
