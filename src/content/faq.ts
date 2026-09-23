/**
 * FAQ — Contact page.
 *
 * Two tiers, per the handover brief's "5-then-11" split: `coreFaqs` are the
 * five load-bearing questions for a hesitant first-time visitor (cost,
 * timeline, payment, ownership, honesty about being a newer studio) and
 * render as the always-visible list. `moreFaqs` are the remaining eleven —
 * real answers for people looking for something specific — offered behind
 * a single "More questions" disclosure so the page doesn't front-load 16
 * accordions.
 *
 * Plain visible content, readable by humans — deliberately no FAQPage
 * JSON-LD alongside it (Google fully deprecated FAQ rich results as of
 * May 2026; only the visible content does anything).
 *
 * No price figures here, ever — pricing stays custom-quote-only. Keep the
 * answers in this plain, direct voice; don't rewrite into marketing-speak.
 */

export type Faq = { question: string; answer: string };

export const coreFaqs: Faq[] = [
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

export const moreFaqs: Faq[] = [
  {
    question: "Do you only work with businesses in Kathmandu?",
    answer:
      "Right now we're focused on Kathmandu, Lalitpur, and Bhaktapur — that's where we can work closely with clients. If you're elsewhere in Nepal, reach out anyway; it depends on the project.",
  },
  {
    question:
      "I already have a Facebook/Instagram page — do I really need a website too?",
    answer:
      "Social media is great for reach, but you don't fully control it — the algorithm decides who sees your posts, and it's not built for things like a menu, prices, hours, or a booking form living in one place. A website is the one thing that's fully yours, always findable, and works alongside your social pages instead of replacing them.",
  },
  {
    question: "What's your process — how does a project actually go?",
    answer:
      "Six steps: Understand (we learn how your business actually works before designing anything), Plan (we scope the smallest build that solves the real problem — no padded features), Build (in the open — you see progress as it happens), Review (tested on real phones and real connections, you approve before anything ships), Launch (domain, hosting, and the basics handled and explained), and Support (we stay reachable after launch).",
  },
  {
    question:
      "Do you help after the site is live, or is that it once you're done?",
    answer:
      "That's its own service, not an afterthought — Maintenance & Support is one of the five things we offer, specifically for updates and fixes after launch.",
  },
  {
    question:
      "What if something's wrong after launch, or I want to add something new?",
    answer:
      "If it's a bug on our end, or something we agreed to build that isn't working right, we fix it — no charge. If it's a genuinely new feature beyond what we originally scoped, that's treated as new work with its own cost.",
  },
  {
    question: "How do I pay?",
    answer: "Bank transfer, eSewa, or Khalti.",
  },
  {
    question: "Do you build online stores, not just informational sites?",
    answer:
      "Yes — that falls under Business Websites or Custom Digital Solutions depending on what you need (inventory, payments, etc.).",
  },
  {
    question:
      "We already have a site someone else built — can you take it over?",
    answer:
      "Often, yes — as long as there's no legal complication (like unclear ownership of the existing code) and everyone's on the same page about the arrangement. Send us what you have and we'll tell you honestly if it's workable.",
  },
  {
    question:
      "I don't really know what I need yet — is that okay to reach out anyway?",
    answer:
      "Yes — that's literally step one of how we work. We figure out what your business actually needs before proposing anything.",
  },
  {
    question: "Will there be something in writing before you start?",
    answer:
      "Yes — scope, timeline, and price agreed in writing before any work begins.",
  },
  {
    question: "Is there a project too small for you to take on?",
    answer:
      "Not really — a single landing page is a completely normal-sized project for us.",
  },
];

