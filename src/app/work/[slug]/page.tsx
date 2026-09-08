import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Container } from "@/components/Container";
import { LiveDemoFrame } from "@/components/LiveDemoFrame";
import { ProjectMockup } from "@/components/mockups";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { Tag } from "@/components/Tag";
import { getProject, nextProject, work } from "@/content/work";

export function generateStaticParams() {
  return work.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.industry} concept demo`,
    description: project.summary,
  };
}

/**
 * Project case study (design.md §68: PROJECT ★3, structure per §69).
 * Concept builds are presented honestly: what it solves, what we built,
 * what it demonstrates — never claimed as client work.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = nextProject(project.slug);

  return (
    <article>
      <Container className="py-14 sm:py-16">
        <Reveal>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>
        </Reveal>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Reveal delay={60}>
            <Tag>{project.tag}</Tag>
          </Reveal>
          <Reveal delay={90}>
            <span className="text-sm text-fg-faint">
              {project.industry} · {project.year}
            </span>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-fg sm:text-6xl">
            {project.heroLine}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {project.summary}
          </p>
        </Reveal>

        <Reveal delay={260} className="mt-12">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-3xl blur-3xl"
              style={{
                background: `linear-gradient(120deg, ${project.palette.heroTo}66, ${project.palette.accent}30)`,
              }}
            />
            {project.demoUrl ? (
              <>
                <LiveDemoFrame
                  src={project.demoUrl}
                  title={`${project.title} — interactive demo build`}
                  urlLabel={`${project.slug}.sajiloweb-demo.build`}
                  className="relative"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="max-w-sm text-xs text-fg-faint">
                    This is the actual demo running in the frame — click
                    around, it works.
                  </p>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3.5 py-2 text-xs font-semibold text-fg transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Open full demo
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </>
            ) : (
              <>
                <BrowserFrame
                  title={`${project.title} — ${project.industry} concept demo`}
                  url={`${project.slug}.sajiloweb-demo.build`}
                  className="relative"
                >
                  <ProjectMockup
                    kind={project.mockKind}
                    palette={project.palette}
                  />
                </BrowserFrame>
                <p className="mt-4 text-xs text-fg-faint">
                  Illustrative miniature rendered in the demo&apos;s own visual
                  language. The full build is available to view on request.
                </p>
              </>
            )}
          </div>
        </Reveal>
      </Container>
      <Container className="grid gap-10 pb-4 md:grid-cols-2">
        <Reveal>
          <section>
            <h2 className="font-display text-xl font-bold text-fg">
              The problem it solves
            </h2>
            <p className="mt-3 leading-relaxed text-fg-muted">{project.challenge}</p>
          </section>
        </Reveal>
        <Reveal delay={100}>
          <section>
            <h2 className="font-display text-xl font-bold text-fg">What we built</h2>
            <p className="mt-3 leading-relaxed text-fg-muted">{project.solution}</p>
          </section>
        </Reveal>
      </Container>

      <Container className="py-8">
        <Reveal>
          <section className="max-w-3xl">
            <h2 className="font-display text-xl font-bold text-fg">Overview</h2>
            {project.overview.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-3 leading-relaxed text-fg-muted"
              >
                {paragraph}
              </p>
            ))}
          </section>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <Reveal>
            <section>
              <h2 className="font-display text-xl font-bold text-fg">
                What&apos;s inside
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-fg-muted"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
          <Reveal delay={100}>
            <section>
              <h2 className="font-display text-xl font-bold text-fg">
                What it demonstrates
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.demonstrates.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-fg-muted"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mt-10 rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-fg-faint">
            <strong className="font-semibold text-fg-muted">{project.title}</strong>{" "}
            is a concept demo — a self-initiated build by Sajilo Web, not a
            client engagement. Every project on this site is labeled this way
            so the work always speaks honestly.
          </p>
        </Reveal>
      </Container>

      <Container className="py-12">
        <Reveal>
          <Link
            href={`/work/${next.slug}`}
            className="group block rounded-2xl border border-line bg-surface p-8 transition-colors hover:border-accent/40"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-fg-faint">
              Next project
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-fg">
                  {next.title}
                </h2>
                <p className="mt-1 text-sm text-fg-muted">
                  {next.industry} · {next.tag}
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface text-fg transition-all group-hover:border-accent/50 group-hover:text-accent">
                <ArrowRight className="size-5" />
              </span>
            </div>
          </Link>
        </Reveal>
      </Container>
    </article>
  );
}
