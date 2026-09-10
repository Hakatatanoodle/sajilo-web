import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRight } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getFeatured } from "@/content/work";

/**
 * Selected work teaser — three featured projects, each honestly tagged
 * "Concept · Demo" (design.md §26).
 */
export function WorkTeaser() {
  const featured = getFeatured();

  return (
    <section className="relative isolate overflow-hidden py-20">
      <AuroraBackdrop variant="edge-right" />
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title={<>Real builds, honestly labeled.</>}
            lead="Every project below is a Sajilo Web concept build — designed and developed by us to show what we can do for businesses like yours."
          />
          <ButtonLink href="/work" variant="ghost" size="md" className="shrink-0">
            All work
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 110} className="h-full">
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mt-8 text-sm text-fg-faint">
            No client projects are shown yet — when they exist, they will be
            labeled &ldquo;Client Project&rdquo;, kept separate from these
            demos.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
