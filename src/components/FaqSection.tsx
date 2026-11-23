import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { coreFaqs, moreFaqs } from "@/content/faq";

/**
 * FAQ — a calm hairline bento. The load-bearing questions are all visible at
 * once (no accordion friction); the long tail sits behind one native
 * <details> so the page doesn't front-load sixteen disclosures. Fully
 * content-in-HTML, usable with JavaScript disabled.
 */
export function FaqSection() {
  return (
    <section className="border-t border-line bg-paper-light" aria-labelledby="faq-title">
      <Container className="section-pad">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions people ask before reaching out."
          lead="Short, honest answers — the things you'd probably want to know before the first conversation."
        />

        <div className="mt-10 overflow-hidden rounded-2xl border border-line-strong">
          <div className="grid gap-px bg-line sm:grid-cols-2">
            {coreFaqs.map((faq, index) => (
              <div
                key={faq.question}
                className={
                  "bg-paper-light p-6 sm:p-7 " +
                  (index === coreFaqs.length - 1 && coreFaqs.length % 2 === 1
                    ? "sm:col-span-2"
                    : "")
                }
              >
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-fg-faint">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-lg font-medium leading-snug tracking-tight text-fg">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <details className="group mt-6 rounded-2xl border border-dashed border-line-strong px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-medium text-fg">
            More questions
            <span className="hidden text-sm font-normal text-fg-faint sm:inline">
              payments, location, process, existing sites…
            </span>
            <span
              aria-hidden
              className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-sm font-bold text-accent transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {moreFaqs.map((faq) => (
              <div key={faq.question} className="border-t border-line pt-4">
                <h3 className="font-display text-base font-medium leading-snug text-fg">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </details>
      </Container>
    </section>
  );
}
