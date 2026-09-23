import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/content/faq";

/**
 * FAQ section (Contact page) — the questions a hesitant prospect reads
 * right before deciding whether to reach out. Native <details>/<summary>
 * accordions: expands and collapses with zero JavaScript, consistent with
 * the site's progressive-enhancement approach (content fully in the
 * server-rendered HTML, usable with JS disabled per the html.js pattern).
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
        {faqs.map((faq, index) => (
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
      </div>
    </Container>
  );
}
