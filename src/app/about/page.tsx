import type { Metadata } from "next";
import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { Container } from "@/components/Container";
import { FounderCard } from "@/components/FounderCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
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
    text: "Every project in our work section was designed and built by us. Ask about any of them — we'll happily walk you through every screen.",
  },
  {
    title: "No invented numbers",
    text: "Real prices, real timelines, and no inflated promises — what we quote is what you get.",
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
      <div className="relative isolate overflow-hidden">
        <AuroraBackdrop variant="edge-left" />
        <Container className="py-16 sm:py-20">
          <PageHeader
            eyebrow="About"
            title="A small team, on purpose."
            lead="Sajilo Web is a web and digital solutions studio for growing local businesses in Nepal — early-stage, founder-led, and intentionally small."
          />

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
                    className="rounded-2xl border border-line bg-surface p-5"
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
                <Reveal
                  key={founder.role}
                  delay={index * 90}
                  className="h-full"
                >
                  <FounderCard
                    name={founder.name}
                    role={founder.role}
                    focus={founder.focus}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <CtaSection />
    </>
  );
}
