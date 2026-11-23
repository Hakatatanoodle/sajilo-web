import type { Metadata } from "next";
import { IndustryIndex } from "@/sections/IndustryIndex";
import { LaunchCta } from "@/sections/LaunchCta";
import { ProcessStage } from "@/sections/ProcessStage";
import { SelectedWork } from "@/sections/SelectedWork";
import { ServicesIndex } from "@/sections/ServicesIndex";
import { StudioHero } from "@/sections/StudioHero";
import { StudioNote } from "@/sections/StudioNote";

/**
 * Home — "The Open Studio".
 *
 * Seven plates, each with its own job: open (promise + live window), qualify
 * (industries), prove (selected work), explain the offer (services), show the
 * method (process), introduce the studio, then close on the brand yellow.
 * Sections are not a repeated card grid; the accent yellow is the through-line.
 */
export const metadata: Metadata = {
  /* metadataBase (layout) turns "/" into the full canonical origin. */
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <StudioHero />
      <IndustryIndex />
      <SelectedWork />
      <ServicesIndex />
      <ProcessStage />
      <StudioNote />
      <LaunchCta />
    </>
  );
}
