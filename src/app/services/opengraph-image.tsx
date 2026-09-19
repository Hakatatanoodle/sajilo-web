import { createOgImage, ogContentType, ogSize } from "@/components/OgImage";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Services — Sajilo Web: what we build for local businesses";

/**
 * Services index social card (route-level OG convention) — the offer, not
 * the homepage. Shares the visual system with every other card.
 */
export default function Image() {
  return createOgImage({
    eyebrow: "SAJILO WEB — SERVICES",
    headline: "What we build.",
    swipeHeadline: true,
    sub: "Five focused services — recommended by fit, not by invoice size.",
  });
}