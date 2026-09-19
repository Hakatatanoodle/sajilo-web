/**
 * Central site configuration — brand facts, navigation, contact channels.
 *
 * Source of truth for brand voice and positioning: portfolio_v0.1.md.
 * Every value a real user must personalise is marked `TODO(user)` and uses an
 * obviously-placeholder value. The full placeholder checklist lives in README.md
 * (section "Before going live"). We never invent brand facts (portfolio_v0.1.md §35).
 */

function originFrom(value: string): string {
  const trimmed = value.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return originFrom(explicit);

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.NEXT_PUBLIC_VERCEL_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercelHost) return originFrom(vercelHost);

  return "http://localhost:3000";
}

export const site = {
  name: "Sajilo Web",
  /** Final brand sentence — portfolio_v0.1.md §38 */
  tagline: "Understand the business. Make the digital side Sajilo.",
  /** Condensed positioning — portfolio_v0.1.md §37 */
  description:
    "Sajilo Web is a small, serious web and digital solutions studio focused on growing local businesses in Nepal. We build professional websites, structured online experiences, and useful custom digital tools — and we handle the technical complexity so getting online feels simple.",
  /** One-line description for the PWA manifest and the social card footer. */
  shortDescription:
    "Websites and digital tools for growing local businesses in Nepal.",
  /**
   * Canonical origin for sitemap, robots, and Open Graph.
   * Deploy without setting anything — Vercel fills this in. Set
   * NEXT_PUBLIC_SITE_URL later if you attach a custom domain.
   */
  url: resolveSiteUrl(),

  contact: {
    email: "sajiloweb2@gmail.com",
    /**
     * WhatsApp is currently the same line as the display phone.
     * TODO(user): confirm — if WhatsApp runs on a different number, change
     * `whatsapp` (digits only, with country code).
     */
    whatsapp: "9779746345871",
    phoneDisplay: "+977 9746345871",
    /**
     * Real service focus (owner-confirmed): the studio works across the
     * Kathmandu valley, not the whole country. Shown in the footer and the
     * contact page's "Where we are" block; `areaServed` (schema) mirrors it.
     */
    location: "Kathmandu, Lalitpur & Bhaktapur, Nepal",
  },
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Industries we typically serve — portfolio_v0.1.md §3 */
export const industries = [
  "Restaurants",
  "Cafés",
  "Clothing businesses",
  "Gyms",
  "Clinics",
  "Salons",
  "Hotels & homestays",
  "Travel businesses",
  "Local services",
  "Education consultancies",
  "Photography studios",
] as const;

/**
 * Areas the studio actively serves — used in the Organization structured
 * data (SEO). TODO(user): widen or trim this list if you serve more of the
 * valley or beyond.
 */
export const areaServed = ["Kathmandu", "Lalitpur", "Bhaktapur"] as const;

/**
 * Founders. Roles are provisional — TODO(user): confirm the real role split
 * (current assignment by listing order: Yochan = Engineering & Delivery,
 * Rohan = Design & Client Care). Photos can be added in
 * src/sections/AboutStrip.tsx and src/app/about/page.tsx when ready.
 */
export const founders = [
  {
    name: "Yochan Kulung",
    role: "Founder — Engineering & Delivery",
    focus: "Architecture, builds, and the technical side of every project.",
  },
  {
    name: "Rohan Kumar Sah",
    role: "Founder — Design & Client Care",
    focus: "Design direction, communication, and how every client experiences the process.",
  },
];

/** Build a WhatsApp deep link, optionally with a prefilled draft message. */
export function whatsappHref(message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.contact.whatsapp}${text}`;
}

