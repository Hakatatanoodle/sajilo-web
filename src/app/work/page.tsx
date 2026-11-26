import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ArrowUpRight, Lock } from "@/components/icons";
import { isClientProject, work } from "@/content/work";
import { LaunchCta } from "@/sections/LaunchCta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Three labelled concept builds you can open and click through — and our first real client system, live in production for Ganapati Eye Care Clinic. By Sajilo Web.",
  alternates: { canonical: "/work" },
};

const shots: Record<string, string> = {
  "sajilo-hub-store": "/showcase/hub-hero.webp",
  "ironforge-fitness": "/showcase/ironforge-hero.webp",
  "sajilo-sweets-house": "/showcase/sweets-work.webp",
};

/**
 * Work index — the contact sheet. Every build is shown with its real
 * interface at working scale, honestly tagged. Concept work is never
 * presented as client work and vice versa (design.md §26).
 */
export default function WorkPage() {
  return (
    <>
      <Container className="section-pad">
        <PageHeader
          eyebrow="The contact sheet"
          title="Work we can show you."
          lead="Three labelled concept builds you can open and click through — plus our first real client system, live in production for Ganapati Eye Care Clinic."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {work.map((project) => {
            const client = isClientProject(project);
            const shot = shots[project.slug];
            return (
              <article
                key={project.slug}
                className={
                  client
                    ? "flex flex-col overflow-hidden rounded-2xl bg-[#0e3a31]"
                    : "work-plate flex flex-col"
                }
              >
                {client ? (
                  <div className="flex flex-1 flex-col p-7 text-white">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-brand">
                      <Lock className="size-3" />
                      {project.tag}
                    </span>
                    <h2 className="display-md mt-6 max-w-[16ch] text-white">
                      {project.title}
                    </h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
                      {project.summary}
                    </p>
                    <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/45">
                      Private by design · no public demo
                    </p>
                    <Link
                      href={`/work/${project.slug}`}
                      className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-brand"
                    >
                      Read the case file
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-fg-faint">
                        {project.slug}.demo
                      </span>
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-accent">
                        {project.tag}
                      </span>
                    </div>
                    <Link
                      href={`/work/${project.slug}`}
                      className="relative block aspect-[16/10] overflow-hidden"
                    >
                      <Image
                        src={shot}
                        alt={`${project.title} — concept demo`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="work-plate__image"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-fg-faint">
                        {project.industry} · {project.year}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-fg">
                        {project.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                        {project.summary}
                      </p>
                      <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                        >
                          Case study
                          <ArrowUpRight className="size-4" />
                        </Link>
                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted transition-colors hover:text-fg"
                          >
                            Open the live demo
                            <ArrowUpRight className="size-4" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>

        <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fg-faint">
          Concept builds are runnable demos, not live businesses · one client
          system in production
        </p>
      </Container>
      <LaunchCta />
    </>
  );
}
