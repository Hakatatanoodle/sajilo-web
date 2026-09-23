import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { coreFaqs, moreFaqs } from "@/content/faq";

/**
 * FAQ section (Contact page) — the questions a hesitant prospect reads
 * right before deciding whether to reach out. Native <details>/<summary>
 * accordions: expands and collapses with zero JavaScript, consistent with
 * the site's progressive-enhancement approach (content fully in the
 * server-rendered HTML, usable with JS disabled per the html.js pattern).
 *
 * Two tiers: the five load-bearing questions render as the always-visible
 * list; the remaining eleven sit behind a single native <details> ("More
 * questions") with a hint of what's inside, so a visitor looking for
 * something specific can find it without the page front-loading 16
 * accordions. Still fully content-in-HTML — the details block is just
 * collapsed by default.
 *
 * Deliberately no FAQPage JSON-LD here — see src/content/faq.ts.
 */
export function FaqSection() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions people ask before reaching out."
        lead="Short, honest answers — the things you'd probably want to know before the first conversation."
      />

      <div className="mt-12 space-y-4">
        {coreFaqs.map((faq, index) => (
          <Reveal key={faq.question} delay={index * 60}>
            <details className="group rounded-2xl border border-line bg-surface px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-fg">
                {faq.question}
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-bold text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-muted">
                {faq.answer}
              </p>
            </details>
          </Reveal>
        ))}

        {/* The remaining questions, behind one zero-JS disclosure. The
            summary lists what's inside so someone searching for a specific
            topic can tell it's worth opening before they commit. */}
        <Reveal delay={coreFaqs.length * 60}>
          <details className="group rounded-2xl border border-dashed border-line-strong bg-transparent px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-fg">
              More questions
              <span className="text-sm font-medium text-fg-faint">
                payments, location, process, existing sites…
              </span>
              <span
                aria-hidden
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-bold text-accent transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="mt-6 space-y-4">
              {moreFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group/nested rounded-2xl border border-line bg-surface px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-bold text-fg">
                    {faq.question}
                    <span
                      aria-hidden
                      className="flex size-6 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-xs font-bold text-accent transition-transform duration-200 group-open/nested:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </details>
        </Reveal>
      </div>
    </Container>
  );
}

