/**
 * FAQ — Contact page.
 *
 * The five load-bearing questions for a hesitant first-time visitor: cost,
 * timeline, payment, ownership, and honesty about being a newer studio.
 * Plain visible content, readable by humans — deliberately no FAQPage
 * JSON-LD alongside it (Google fully deprecated FAQ rich results as of
 * May 2026; only the visible content does anything).
 *
 * No price figures here, ever — pricing stays custom-quote-only. Keep the
 * answers in this plain, direct voice; don't rewrite into marketing-speak.
 */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How much does a website cost?",
    answer:
      "We don't work off fixed packages — every project gets a quote based on what you actually need, not a generic price list. Tell us what you're trying to do and we'll give you a clear number before any work starts.",
  },
  {
    question: "Roughly how long does a project take?",
    answer:
      "Usually 2 to 4 weeks, depending on scope — a simple site is faster, something like a booking system takes longer. We'll give you a realistic estimate once we understand what you need.",
  },
  {
    question: "How does payment actually work?",
    answer:
      "A portion upfront to begin, and the remainder before the site goes live — the exact numbers depend on the project and get agreed on in writing before we start.",
  },
  {
    question:
      "Once the site is live, can I make changes myself, or do I need you for everything?",
    answer:
      "Once we hand it over, it's yours. If you'd rather manage it yourself — or bring in someone else down the line — that's completely fine.",
  },
  {
    question:
      "Have you actually built real things before, or is this your first project?",
    answer:
      "We're a small, newer studio, and we're upfront about that — most of our portfolio is labeled concept work we built ourselves to show what we can do. We also have one real, live client system in production for Ganapati Eye Care Clinic, which we still maintain.",
  },
];
