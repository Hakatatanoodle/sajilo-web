import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { industries } from "@/content/site";

/**
 * FAQ content for the Services page — the core AEO (Answer Engine
 * Optimization) asset. Answer engines (Google AI Overviews, ChatGPT,
 * Perplexity, Gemini) lift well-structured question/answer pairs almost
 * verbatim, so each answer is written to stand alone as a complete,
 * quotable fact — while staying honest by construction: every answer is
 * derived from existing site content (src/content/*), never invented.
 *
 * The same array drives the visible section AND the FAQPage JSON-LD, so
 * the structured data can never disagree with what humans read.
 */
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What does Sajilo Web do?",
    answer:
      "Sajilo Web is a small, founder-led web and digital solutions studio for local businesses in Nepal. We build business websites, focused landing pages, booking and information systems, online storefronts, and custom digital tools — and we handle the technical complexity so getting online feels simple. Maintenance and support continue after launch.",
  },
  {
    question: "Which kinds of businesses do you work with?",
    answer: `We typically work with ${industries
      .slice(0, -1)
      .join(", ")}, and ${industries[industries.length - 1]} — any local business that needs a proper home online.`,
  },
  {
    question: "Where in Nepal do you work?",
    answer:
      "Across the Kathmandu valley — Kathmandu, Lalitpur, and Bhaktapur. Conversations, scoping, and support all happen with a real person you can reach on WhatsApp or email.",
  },
  {
    question: "How much does a website cost, and how long does it take?",
    answer:
      "Every project is scoped individually, so we quote real prices per project instead of selling fixed packages. It starts with a short conversation about how your business works; you then get a clear scope and plan with real prices and timelines — no pressure, no obligations, no jargon.",
  },
  {
    question: "Are the projects in your Work section real client work?",
    answer:
      "One is: Ganapati Eye Care Clinic runs on a patient-records and SMS system we designed and built, live in production. The other projects are concept builds — real, runnable demo websites we designed ourselves, always tagged \u201CConcept \u00B7 Demo\u201D. We never present concept work as client work, in either direction.",
  },
  {
    question: "How do we start?",
    answer:
      "Send a message on the contact page — WhatsApp or email, whichever suits you. We reply personally, set up a short conversation about your business, and follow with a clear scope and plan. No bots, no ticket queues.",
  },
];

/* FAQPage structured data — machine-readable mirror of the visible
   section below. Answer engines read this to quote the site as an answer. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/**
 * FAQ section (Services page) — native <details>/<summary> accordions:
 * crawlable, keyboard-accessible, zero JavaScript, and every answer is in
 * the server-rendered HTML whether or not a visitor expands it.
 */
export function FaqSection() {
  return (
    <Container className="py-16 sm:py-20" >
      <JsonLd data={faqJsonLd} />
      <SectionHeading
        eyebrow="FAQ"
        title="Common questions, answered honestly."
        lead="Short, factual answers to what businesses usually ask before the first conversation."
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