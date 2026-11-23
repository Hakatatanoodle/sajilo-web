import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { FounderCard } from "@/components/FounderCard";
import { PageHeader } from "@/components/PageHeader";
import { founders } from "@/content/site";
import { LaunchCta } from "@/sections/LaunchCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sajilo Web is a small, founder-led web studio for growing local businesses in Nepal. Small on purpose, serious about the work.",
  alternates: { canonical: "/about" },
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
 * About — the studio note. An editorial statement, the working principles as
 * a hairline list, and the two people who answer. No stock portraits.
 */
export default function AboutPage() {
  return (
    <>
      <Container className="section-pad">
        <PageHeader
          eyebrow="The studio note"
          title="A small team, on purpose."
          lead="Sajilo Web is a web and digital solutions studio for growing local businesses in Nepal — early-stage, founder-led, and intentionally small."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-5 text-base leading-relaxed text-fg-muted lg:col-span-6">
            <p>
              &ldquo;Sajilo&rdquo; means easy. It&apos;s the standard we hold
              ourselves to: the technical process should feel easy for the
              customer, even when the work underneath isn&apos;t.
            </p>
            <p>
              We work with businesses whose real-world growth has outpaced
              their digital presence — the restaurant with a line out the door
              and no website, the clinic with loyal patients and no way to
              book online.
            </p>
            <p>
              We&apos;re small, and that&apos;s the point: the people you talk
              to are the people who design, build, and support your project. It
              also means we take on fewer projects — and take them seriously.
            </p>
          </div>

          <ul className="border-b border-line lg:col-span-6">
            {PRINCIPLES.map((principle, index) => (
              <li key={principle.title} className="flex gap-5 border-t border-line py-5">
                <span className="w-6 shrink-0 font-mono text-[0.6rem] tracking-[0.1em] text-fg-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-lg font-medium tracking-tight text-fg">
                    {principle.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                    {principle.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <p className="chapter">The people behind it</p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {founders.map((founder) => (
              <FounderCard
                key={founder.role}
                name={founder.name}
                role={founder.role}
                focus={founder.focus}
              />
            ))}
          </div>
        </div>
      </Container>
      <LaunchCta />
    </>
  );
}
