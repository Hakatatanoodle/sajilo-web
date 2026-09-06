import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { User } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { CtaSection } from "@/sections/CtaSection";
import { founders } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sajilo Web is a small, founder-led web studio for growing local businesses in Nepal. Small on purpose, serious about the work.",
};

const PRINCIPLES = [
  {
    title: "No fake work",
    text: "Every project on this site is labeled for what it is. Concept builds are ours; client projects will be labeled as clients'. Nothing in between.",
  },
  {
    title: "No invented numbers",
    text: "No fake testimonials, no made-up statistics, no borrowed trust logos. If a claim isn't true, it doesn't go on the page.",
  },
  {
    title: "Smallest thing that works",
    text: "We recommend down, not up. A landing page that solves the problem beats a platform that doesn't.",
  },
  {
    title: "We answer after launch",
    text: "Launch isn't the end. Updates, fixes, and questions are part of the product — you'll know how to reach us.",
  },
] as const;

/**
 * About page (design.md §68: ABOUT ★2 — calm, credible, honest).
 */
export default function AboutPage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <header className="max-w-2xl">
          <Reveal>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-accent">
              About
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
              A small team, on purpose.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">
              Sajilo Web is a web and digital solutions studio for growing
              local businesses in Nepal — early-stage, founder-led, and
              intentionally small.
            </p>
          </Reveal>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 leading-relaxed text-fg-muted">
              <p>
                &ldquo;Sajilo&rdquo; means easy. It&apos;s the standard we
                hold ourselves to: the technical process should feel easy for
                the customer, even when the work underneath isn&apos;t.
              </p>
              <p>
                We work with businesses whose real-world growth has outpaced
                their digital presence — the restaurant with a line out the
                door and no website, the clinic with loyal patients and no way
                to book online.
              </p>
              <p>
                We&apos;re small, and that&apos;s the point: the people you
                talk to are the people who design, build, and support your
                project. It also means we take on fewer projects — and take
                them seriously.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              {PRINCIPLES.map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <h2 className="font-display text-base font-bold text-fg">
                    {principle.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {principle.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-fg sm:text-3xl">
              The people behind it
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {founders.map((founder, index) => (
              <Reveal key={founder.role} delay={index * 90} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <span className="flex size-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                    <User className="size-5" />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold text-fg">
                    {founder.name}
                  </p>
                  <p className="text-sm text-accent">{founder.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {founder.focus}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
      <CtaSection />
    </>
  );
}
