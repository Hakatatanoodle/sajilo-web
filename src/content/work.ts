/**
 * Work / portfolio projects.
 *
 * Every project here is a Sajilo Web concept or demo build — self-initiated
 * work that demonstrates capability. design.md §26 and portfolio_v0.1.md §35
 * require that concept work is ALWAYS visibly distinguished from client work,
 * so the tag is part of the type and rendered on every card and page.
 *
 * Project facts (features, pricing, palette) come from the actual demo builds.
 * Two demos are real, runnable sites served from public/demos/ (synced from
 * the source folders/zips in the parent directory via `npm run sync-demos`)
 * and embedded live on their case-study pages via `demoUrl`; the rest are
 * illustrated with CSS miniatures until their real builds are delivered.
 */

export type ProjectKind = "clinic" | "gym" | "hotel" | "restaurant" | "store";

export type Project = {
  slug: string;
  title: string;
  industry: string;
  /** Always "Concept · Demo" — never presented as client work. */
  tag: "Concept · Demo";
  year: string;
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
      "Sajilo HUB answers with a complete shopping flow: a 12-product catalog with search, price and rating sorting, category and sale filters; product cards with sale badges and color swatches; and a three-step checkout that puts cash on delivery first — with online payment as a clearly-marked integration point, not a fake success screen.",
    features: [
      "12-product catalog with photos, ratings, and sale badges",
      "Search, sort by price or rating, category and sale filters",
      "Color swatches and per-product ordering",
      "Three-step checkout: details → payment → confirm",
      "Cash on Delivery first; online payment marked as an integration point",
      "Order summary with delivery charge ($2.99)",
      "Store locator view with hours, contact, and demo map",
    ],
    demonstrates: [
      "E-commerce structure adapted to local buying habits",
      "Search and filtering UX at small-catalog scale",
      "Checkout flows that put COD first",
      "Honest demo boundaries — payment gateways marked as integration points",
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
    slug: "carepoint-clinic",
    title: "CarePoint Clinic",
    industry: "Healthcare",
    tag: "Concept · Demo",
    year: "2026",
    summary:
      "A clean clinic concept: services explained in plain language, clinicians introduced properly, and appointment requests without the phone ping-pong.",
    heroLine: "Care that starts with you.",
    overview: [
      "CarePoint Clinic is a concept website for a modern primary-care practice — the kind of clinic that already has loyal patients but is effectively invisible online.",
      "The build covers the full patient journey: understanding services, meeting the clinicians, and requesting an appointment with clear expectations of what happens next.",
    ],
    challenge:
      "Clinic websites usually fail patients in the same ways: services described in jargon, no way to know who the clinicians are, and appointments that mean calling during working hours and hoping someone picks up.",
    solution:
      "CarePoint is structured around what a patient actually needs. Services are written in plain language, the clinicians section introduces people rather than wall-of-text credentials, and the appointment form asks only for what the front desk genuinely acts on — then states clearly what happens after the request.",
    features: [
      "Services: general consultation, eye care, diagnostics",
      "Clinician profiles with roles and specialities",
      "Appointment request form — name, phone, date, reason",
      "Honest confirmation of what happens after a request",
    ],
    demonstrates: [
      "Turning medical services into plain language",
      "Trust-oriented structure for healthcare businesses",
      "Form UX that sets expectations instead of faking success",
    ],
    mockKind: "clinic",
    palette: {
      heroFrom: "#1D4558",
      heroTo: "#86B8C5",
      base: "#F6F8F9",
      ink: "#16262E",
      accent: "#2C7A8C",
    },
  },
  {
    slug: "ironforge-fitness",
    title: "IronForge Fitness",
    industry: "Fitness",
    demoUrl: "/demos/ironforge-fitness/index.html",
    tag: "Concept · Demo",
    year: "2026",
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
      "Three membership tiers with open pricing — Rs. 2,500 to Rs. 7,500 per month",
      "Free introductory visit request",
      "Direct tone — motivation without the hype",
    ],
    demonstrates: [
      "Open pricing used as a trust device",
      "Conversion paths that respect the visitor",
      "Page structure for membership businesses",
    ],
    mockKind: "gym",
    palette: {
      heroFrom: "#151515",
      heroTo: "#555555",
      base: "#F7F7F5",
      ink: "#1A1A1A",
      accent: "#8A8A8A",
    },
  },
  {
    slug: "himalayan-haven",
    title: "Himalayan Haven",
    industry: "Hospitality",
    tag: "Concept · Demo",
    year: "2026",
    summary:
      "A boutique mountain retreat: rooms with honest “from Rs.” pricing, an experience section that sells the feeling, and booking inquiries with dates and guests.",
    heroLine: "Stay above the ordinary.",
    overview: [
      "Himalayan Haven is a concept site for a boutique mountain retreat in Nepal — quiet rooms, mountain views, and slow mornings.",
      "It balances two jobs that usually fight each other: evoking a place well enough that people want to go, and capturing a real booking inquiry once they do.",
    ],
    challenge:
      "Small hotels compete with booking platforms on the platforms' terms. A direct website has to do what an OTA listing can't: convey the feeling of the place, and take a proper booking inquiry — with dates and party size, not just a name and a hope.",
    solution:
      "Himalayan Haven pairs its room tiers with transparent “from Rs.” pricing, tells the experience story — local food, village walks, fire-side evenings — and captures booking inquiries with the fields a host actually plans around: check-in, check-out, and guest count.",
    features: [
      "Rooms & suites with “from Rs.” pricing",
      "Experience section with first-person storytelling",
      "Booking inquiry: check-in, check-out, guests",
      "Warm, unhurried visual tone",
    ],
    demonstrates: [
      "Hospitality storytelling that still converts",
      "Booking inquiry flows with the right fields",
      "Presenting a physical place honestly online",
    ],
    mockKind: "hotel",
    palette: {
      heroFrom: "#3E2D1C",
      heroTo: "#C9A875",
      base: "#FAF7F2",
      ink: "#2C2013",
      accent: "#B08D57",
    },
  },
  {
    slug: "the-courtyard",
    title: "The Courtyard",
    industry: "Restaurant",
    tag: "Concept · Demo",
    year: "2026",
    summary:
      "A neighbourhood restaurant site: a readable menu with real prices, a story with a voice, and reservations in three fields.",
    heroLine: "Taste the moment.",
    overview: [
      "The Courtyard is a concept site for a neighbourhood restaurant — familiar ingredients, seasonal plates, and a room built for conversation.",
      "The site is deliberately small: menu, story, reservations. Everything a diner needs on a phone, nothing that gets between them and booking a table.",
    ],
    challenge:
      "Restaurant websites die under PDF menus, Instagram-only presence, and reservation forms that ask for everything except what a host needs. Diners on phones want the menu and a table — fast.",
    solution:
      "The Courtyard keeps it useful: today's menu highlights with prices in Rs., a short story section with an actual voice, and a reservation request with date, time, and party size — the fields a restaurant acts on immediately.",
    features: [
      "Menu highlights with prices — momo, thali, seasonal plates",
      "Story section with a real voice",
      "Reservation request: date, time, guests",
      "Fresh · local · seasonal positioning",
    ],
    demonstrates: [
      "Menus people can actually read on a phone",
      "Reservation UX with minimal friction",
      "Brand voice in a small business site",
    ],
    mockKind: "restaurant",
    palette: {
      heroFrom: "#173C2B",
      heroTo: "#9A6741",
      base: "#FBF9F4",
      ink: "#1E2B22",
      accent: "#3E6B4F",
    },
  },
];

export const featuredSlugs = [
  "sajilo-hub-store",
  "ironforge-fitness",
  "carepoint-clinic",
] as const;

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
