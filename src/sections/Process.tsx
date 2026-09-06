import { Container } from "@/components/Container";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * The six-step process — design.md §30 (Understand, Plan, Build, Review,
 * Launch, Support). No invented timelines, no invented guarantees.
 */

const STEPS = [
  {
    num: "01",
    title: "Understand",
    text: "We learn how your business actually works — customers, flow, bottlenecks — before touching any design.",
  },
  {
    num: "02",
    title: "Plan",
    text: "We propose the smallest build that solves the real problem, with a clear scope and no padded features.",
  },
  {
    num: "03",
    title: "Build",
    text: "We design and develop in the open. You see progress and shape decisions as they happen.",
  },
  {
    num: "04",
    title: "Review",
    text: "We test on real phones, real connections, and real workflows. You approve — nothing ships silently.",
  },
  {
    num: "05",
    title: "Launch",
    text: "Domain, hosting, business info, search basics — handled, explained, and documented for you.",
  },
  {
    num: "06",
    title: "Support",
    text: "After launch we stay reachable: updates, fixes, and improvements as your business grows.",
  },
] as const;

export function Process() {
  return (
    <section className="relative py-20">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title={<>A process you can follow.</>}
          lead="Six steps, no mystery. You always know where the project is and what happens next."
        />

        <Reveal className="mt-12">
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step) => (
              <li
                key={step.num}
                className="bg-ink p-7 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <p className="text-gradient font-display text-3xl font-extrabold tracking-tight">
                  {step.num}
                </p>
                <h3 className="mt-4 font-display text-lg font-bold text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
