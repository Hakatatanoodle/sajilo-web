import type { Metadata } from "next";
import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { Tag } from "@/components/Tag";
import { work } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Concept and demo builds by Sajilo Web — clinic, gym, hotel, restaurant, and storefront. Every project honestly labeled; no invented client work.",
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
      <header className="max-w-2xl">
        <Reveal>
          <Tag>What this is</Tag>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
            Work we can show you.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">
            Three of these are real, runnable demo websites you can open and
            click through; the rest are concept builds designed by us. It&apos;s
            all self-initiated work made by Sajilo Web — we don&apos;t present
            borrowed or invented client work; when real client projects exist,
            they&apos;ll appear here labeled &ldquo;Client Project&rdquo;.
          </p>
        </Reveal>
      </header>

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
