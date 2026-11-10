import type { Metadata } from "next";
import { CtaSection } from "@/sections/CtaSection";
import { HeroNavy } from "@/sections/HeroNavy";
import { Positioning } from "@/sections/Positioning";
import { Process } from "@/sections/Process";
import { ServicesGrid } from "@/sections/ServicesGrid";
import { WorkTeaser } from "@/sections/WorkTeaser";

/**
 * Home — the site's most cinematic page (design.md §68: HOME ★5).
 * Intensity tapers down the page: hero → positioning → work → services →
 * process → calm contact CTA. (Founders strip removed.)
 */
export const metadata: Metadata = {
  /* metadataBase (layout) turns "/" into the full canonical origin. */
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroNavy />
      <Positioning />
      <WorkTeaser />
      <ServicesGrid />
      <Process />
      <CtaSection />
    </>
  );
}
