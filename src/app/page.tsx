import { AboutStrip } from "@/sections/AboutStrip";
import { CtaSection } from "@/sections/CtaSection";
import { Hero } from "@/sections/Hero";
import { Positioning } from "@/sections/Positioning";
import { Process } from "@/sections/Process";
import { ServicesGrid } from "@/sections/ServicesGrid";
import { WorkTeaser } from "@/sections/WorkTeaser";

/**
 * Home — the site's most cinematic page (design.md §68: HOME ★5).
 * Intensity tapers down the page: hero → positioning → work → services →
 * process → about → calm contact CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <WorkTeaser />
      <ServicesGrid />
      <Process />
      <AboutStrip />
      <CtaSection />
    </>
  );
}
