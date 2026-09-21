import type { Metadata } from "next";
import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { work } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Three labelled concept builds you can open and click through — and our first real client system, live in production for Ganapati Eye Care Clinic. By Sajilo Web.",
  alternates: { canonical: "/work" },
};

/**
 * Work index (design.md §68: WORK ★4). Three projects are our own concept/demo
 * builds, tagged "Concept · Demo"; Ganapati Eye Care Clinic is a real client
 * system, tagged "Client · Live". The distinction is non-negotiable and stays
 * visible on every card (design.md §26, portfolio_v0.1.md §35).
 */
export default function WorkPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <AuroraBackdrop variant="page" />
      <Container className="py-16 sm:py-20">
        <PageHeader
          eyebrow="Our work"
          title="Work we can show you."
          lead="Three labelled concept builds you can open and click through — plus our first real client system, live in production for Ganapati Eye Care Clinic."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {work.map((project, index) => (
            <Reveal key={project.slug} delay={index * 90} className="h-full">
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
