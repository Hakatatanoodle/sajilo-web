import { createOgImage, ogContentType, ogSize } from "@/components/OgImage";
import { work } from "@/content/work";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Selected work — Sajilo Web case studies and live demos";

/**
 * Work index social card (route-level OG convention). Shares the system
 * with the root card but speaks for the work section — so a shared /work
 * link no longer falls back to the generic homepage card.
 */
export default function Image() {
  return createOgImage({
    eyebrow: "SAJILO WEB — SELECTED WORK",
    headline: "Work we can show you.",
    swipeHeadline: true,
    sub: "Real builds across the businesses we serve — open the live demos and click through.",
    footer: `${work.length} builds · every one tagged honestly`,
  });
}