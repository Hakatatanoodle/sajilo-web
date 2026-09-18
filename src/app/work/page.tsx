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
    "Websites and digital builds by Sajilo Web — clinic, gym, hotel, restaurant, and storefront. Open the live demos and click through.",
};

/**
 * Work index (design.md §68: WORK ★4). Every project is our own concept/demo
 * build and is labeled as such — the distinction from client work is
 * non-negotiable (design.md §26, portfolio_v0.1.md §35).
 */
export default function WorkPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <AuroraBackdrop variant="page" />
      <Container className="py-16 sm:py-20">
        <PageHeader
          eyebrow="Our work"
          title="Work we can show you."
          lead="Browse real builds across the businesses we serve — a storefront, a gym, a sweets shop, a clinic, a retreat, and a restaurant. Several run live right on the page."
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
