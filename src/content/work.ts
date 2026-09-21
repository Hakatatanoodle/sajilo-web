import type { ServiceSlug } from "@/content/services";

/**
 * Work / portfolio projects.
 *
 * Three of these builds are Sajilo Web concepts and demos — self-initiated
 * work that demonstrates capability, each tagged "Concept · Demo". One —
 * Ganapati Eye Care Clinic — is a real, named client system running in
 * production, tagged "Client · Live". design.md §26 and portfolio_v0.1.md §35
 * require that concept work is ALWAYS visibly distinguished from client work,
 * and never described in the other's language — in both directions.
 *
 * Concept facts (features, pricing, palette) come from the actual demo builds.
 * All three demos are real, runnable sites served from public/demos/ (synced
 * from the source folders in the parent directory via `npm run sync-demos`)
 * and embedded live on their case-study pages via `demoUrl`. The client
 * system is login-gated and deliberately has no demoUrl — its
 * case study is text and abstract visuals only, never a fake demo or a
 * screenshot of real records.
 */

export type ProjectKind = "gym" | "store" | "sweet" | "client-system";

/**
 * Status tag, always rendered on cards and case-study pages. design.md §26:
 * concept work and real client work must never be presented as each other.
 */
export type ProjectTag = "Concept · Demo" | "Client · Live";

export type Project = {
  slug: string;
  title: string;
  industry: string;
  /**
   * "Concept · Demo" for self-initiated builds; "Client · Live" for real
   * client work — never swapped (design.md §26).
   */
  tag: ProjectTag;
  year: string;
  /**
   * Slug of the service (content/services.ts) this build best demonstrates.
   * Drives the case-study ↔ service cross-links on both pages — every
   * project must name the service that produced it (SEO internal linking).
   */
  relatedService: ServiceSlug;
  /**
   * Optional path to the real, runnable demo under public/demos/. When set,
   * the case-study page embeds the actual site in a live frame instead of
   * the illustrative miniature. Update the files under public/demos/<slug>/
   * in place (same filenames) or run `npm run sync-demos` — no code changes.
   */
  demoUrl?: string;
  /** One-liner for cards and meta descriptions. */
  summary: string;
  /** The demo's actual headline — shown as the case-study title. */
  heroLine: string;
  overview: string[];
  challenge: string;
  solution: string;
  features: string[];
  demonstrates: string[];
  /**
   * Section heading for the `demonstrates` list on the case-study page.
   * Concept builds use the default "What it demonstrates"; real client
   * builds override it so client work is never framed as a demonstration.
   */
  demonstratesLabel?: string;
  mockKind: ProjectKind;
  palette: {
    heroFrom: string;
    heroTo: string;
    base: string;
    ink: string;
    accent: string;
  };
};

export const work: Project[] = [
  {
    slug: "sajilo-hub-store",
    title: "Sajilo HUB — Clothing Store",
    industry: "E-commerce",
    tag: "Concept · Demo",
    year: "2026",
    relatedService: "business-information-systems",
    demoUrl: "/demos/sajilo-hub-store/index.html",
    summary:
      "A working storefront demo: searchable catalog with filters and swatches, cart, and a three-step checkout that treats cash on delivery as the primary payment method.",
    heroLine: "Wear what feels like you.",
    overview: [
      "Sajilo HUB is our most complete demo: a full front-end clothing store built around how people in Nepal actually buy online — browse casually, ask questions, pay on delivery.",
      "It shows what “digital business tools” means in practice: not decoration, but structure that replaces manual DM-to-DM order handling.",
    ],
    challenge:
      "Local clothing businesses sell through social inboxes — every order is a manual conversation, and nothing is structured. The question: how far can a real store go while fitting local buying habits, where cash on delivery is the default and trust is built conversationally?",
    solution:
      "Sajilo HUB answers with a complete shopping flow: a 12-product catalog with search, price and rating sorting, category and sale filters; product cards with sale badges and color swatches; and a three-step checkout that puts cash on delivery first — with online payment ready to plug in when the business wants it.",
    features: [
      "12-product catalog with photos, ratings, and sale badges",
      "Search, sort by price or rating, category and sale filters",
      "Color swatches and per-product ordering",
      "Three-step checkout: details → payment → confirm",
      "Cash on Delivery first, with online payment ready to plug in",
      "Order summary with delivery charge (Rs. 299)",
      "Store locator view with hours, contact, and demo map",
    ],
    demonstrates: [
      "E-commerce structure adapted to local buying habits",
      "Search and filtering UX at small-catalog scale",
      "Checkout flows that put COD first",
      "Payment-ready structure — a gateway plugs in when the business is ready",
    ],
    mockKind: "store",
    palette: {
      heroFrom: "#B6ADA0",
      heroTo: "#D7D1C8",
      base: "#FAFAF9",
      ink: "#141414",
      accent: "#111111",
    },
  },
  {
    slug: "ironforge-fitness",
    title: "IronForge Fitness",
    industry: "Fitness",
    demoUrl: "/demos/ironforge-fitness/index.html",
    tag: "Concept · Demo",
    year: "2026",
    relatedService: "business-websites",
    summary:
      "A membership-first gym site: programs explained, three honest pricing tiers in Rs., and a free intro visit instead of a hard sell.",
    heroLine: "Build your edge.",
    overview: [
      "IronForge is a concept site for a serious training gym — built around the reality that people choosing a gym want to know two things early: how training works and what it costs.",
      "The site answers both on one page, then converts interest into a low-pressure first visit.",
    ],
    challenge:
      "Gyms sell transformation, but most gym sites bury the two things a newcomer needs — what training actually looks like, and what membership costs. Vague “contact us for pricing” erodes trust before the first visit.",
    solution:
      "IronForge leads with its three training paths, shows every membership tier openly with real prices, and invites a free introductory visit — a concrete, low-pressure step into the gym rather than a generic “join now”.",
    features: [
      "Programs: strength, conditioning, personal training",
      "Three membership tiers with open pricing — Rs. 2,499 / 3,999 / 6,999 per month",
      "Free introductory visit request",
      "Direct tone — motivation without the hype",
    ],
    demonstrates: [
      "Open pricing used as a trust device",
      "Conversion paths that respect the visitor",
      "Page structure for membership businesses",
    ],
    mockKind: "gym",
    // Real demo tokens: near-black canvas with the electric-yellow accent.
    palette: {
      heroFrom: "#050505",
      heroTo: "#1C1C1C",
      base: "#0A0A0A",
      ink: "#F5F5F5",
      accent: "#E7FF00",
    },
  },
  {
    slug: "sajilo-sweets-house",
    title: "Sajilo Sweets House",
    industry: "Food & Sweets",
    tag: "Concept · Demo",
    year: "2026",
    demoUrl: "/demos/sweet-house/index.html",
    relatedService: "business-information-systems",
    summary:
      "A neighbourhood mithai shop, online: filterable menu, per-piece and weight-based ordering with bulk discounts, a cart that survives refreshes, and festive Dashain–Tihar gift boxes — every price in Rs.",
    heroLine: "Sweet moments, made the Sajilo way.",
    overview: [
      "Sajilo Sweets House is a concept build for a local New Road mithai shop — the kind of business whose busiest seasons (Dashain, Tihar) are exactly when a phone-and-counter-only setup falls apart.",
      "The demo covers the full sweets-shop journey online: browsing a fresh menu, ordering by piece or by weight, gifting curated festive boxes, and hearing it from other customers first.",
    ],
    challenge:
      "Sweets shops run on tradition, but their ordering runs on handwriting: festival pre-books jotted in notebooks, weight pricing explained over the counter, and no way to plan a Dashain gift order unless you walk in. The question: how much of that can a simple front-end demo make self-serve?",
    solution:
      "Sajilo Sweets House answers with a 10-item menu across sweets, snacks, namkeen and drinks — filterable in one click. Sweets order by the piece or by approximate weight (250g / 500g / 1kg) with bulk discounts applied automatically. A cart drawer persists between visits, checkout offers cash on delivery or pay-at-store, and a dedicated festive section sells curated Dashain and Tihar gift boxes.",
    features: [
      "10-item menu across sweets, snacks, namkeen and drinks",
      "Category filtering with instant updates",
      "Weight-based ordering — 250g / 500g / 1kg with automatic bulk discounts",
      "Cart drawer that persists between visits",
      "Cash on delivery or pay-at-store checkout",
      "Dashain gift box at Rs. 1,499, Tihar boxes pre-bookable",
      "Customer reviews with a submission flow",
    ],
    demonstrates: [
      "Local-food e-commerce without a backend",
      "Weight-based pricing UI kept simple",
      "Festive-commerce patterns for Nepali businesses",
      "A checkout flow that mirrors how the shop actually takes orders",
    ],
    mockKind: "sweet",
    palette: {
      heroFrom: "#EF6C18",
      heroTo: "#FF9B32",
      base: "#FFFDFB",
      ink: "#28221E",
      accent: "#EF6C18",
    },
  },
  {
    // Real client build — tagged "Client · Live", never "Concept · Demo".
    // Login-gated and private by design: no demoUrl, no screenshots of real
    // records, no invented before-story or outcomes (portfolio_v0.1.md §35).
    slug: "ganapati-eye-care",
    title: "Ganapati Eye Care Clinic",
    industry: "Eye Care",
    tag: "Client · Live",
    year: "2026",
    relatedService: "business-information-systems",
    summary:
      "A real clinic's records system, live in production: login-gated patient records — refraction, clinical, lens orders, payments — plus SMS broadcasts from the clinic's own SIM.",
    heroLine: "Patient records and SMS, in one private system.",
    overview: [
      "Ganapati Eye Care Clinic runs on a system we designed and built end to end: a login-gated web app where the clinic's own staff keep patient records — personal details, refraction and clinical findings, lens and frame orders, payments — and reach patients by SMS straight from the clinic's own phone.",
      "This one is deliberately not a demo. There is no public page to click through: records are private to each clinic account, and the whole system is kept out of search engines. This page describes what was built and why it helps.",
    ],
    challenge:
      "An eye-care clinic's daily work generates exactly the kind of information that is easy to lose track of: refraction readings for each eye at each visit, lens and frame orders, payments and balances, follow-ups. The problem this system solves is keeping all of it structured, private to the clinic's own accounts, and reachable from the front desk — without patient records ever sitting on a public web page.",
    solution:
      "A single staff tool built on Firebase Authentication and Firestore: every record is stored under the signed-in clinic user's own path in the database, so no account can read another's. The SMS Broadcast module composes a message, picks recipients from the clinic's own records, and delivers through an Android SMS gateway on the clinic's phone and SIM — and the broadcast API verifies each caller's identity server-side before it will send anything.",
    features: [
      "Login-gated access — records stay private to each clinic account",
      "Complete patient record: personal, refraction, clinical, lens & frame, payments",
      "SMS Broadcast — compose, select recipients, send via the clinic's own SIM",
      "Dashboard with today's and total record counts",
      "Hosted on Vercel; every sensitive endpoint checks who is calling",
    ],
    demonstratesLabel: "Why it matters",
    demonstrates: [
      "We build systems businesses actually run, not just pages they show off",
      "Privacy-first defaults: login-gated, per-account data isolation, noindex",
      "SMS automation that uses hardware the business already owns",
      "Security treated as a launch requirement — authenticated before publicised",
    ],
    mockKind: "client-system",
    palette: {
      heroFrom: "#0E3A31",
      heroTo: "#2E7D6B",
      base: "#F7FAF8",
      ink: "#12241E",
      accent: "#1E7A66",
    },
  },
];

export const featuredSlugs = [
  "sajilo-hub-store",
  "ironforge-fitness",
  "sajilo-sweets-house",
] as const;

/** design.md §26 — client work must be visually and verbally distinct. */
export function isClientProject(project: Project): boolean {
  return project.tag !== "Concept · Demo";
}

export function getProject(slug: string): Project | undefined {
  return work.find((p) => p.slug === slug);
}

export function isFeatured(slug: string): boolean {
  return (featuredSlugs as readonly string[]).includes(slug);
}

export function getFeatured(): Project[] {
  return featuredSlugs
    .map((slug) => getProject(slug))
    .filter((p): p is Project => Boolean(p));
}

/** The next project in the list, wrapping around — used on case-study pages. */
export function nextProject(slug: string): Project {
  const index = work.findIndex((p) => p.slug === slug);
  return work[(index + 1) % work.length];
}
