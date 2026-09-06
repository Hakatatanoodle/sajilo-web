import { industries } from "@/content/site";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/**
 * Positioning strip — who we serve. Industry chips from portfolio_v0.1.md §3,
 * framed by the real qualification: growth + digital gap.
 */
export function Positioning() {
  return (
    <section className="relative py-20">
      <Container>
        <SectionHeading
          eyebrow="Who we work with"
          title={
            <>
              Built for businesses <span className="text-gradient">like yours.</span>
            </>
          }
          lead="Restaurants, clinics, gyms, boutiques, homestays — the industry matters less than the situation: a business whose real-world growth has outpaced its digital presence."
        />

        <Reveal className="mt-10">
          <ul className="flex flex-wrap gap-2.5" aria-label="Industries we typically serve">
            {industries.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
              >
                {industry}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-fg-muted">
            If customers already want what you offer, the digital side should
            keep up — structured, findable, and easy to act on. That&apos;s
            what we build.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
