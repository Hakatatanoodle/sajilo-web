/**
 * Central site configuration — brand facts, navigation, contact channels.
 *
 * Source of truth for brand voice and positioning: portfolio_v0.1.md.
 * Every value a real user must personalise is marked `TODO(user)` and uses an
 * obviously-placeholder value. The full placeholder checklist lives in README.md
 * (section "Before going live"). We never invent brand facts (portfolio_v0.1.md §35).
 */

export const site = {
  name: "Sajilo Web",
  /** Final brand sentence — portfolio_v0.1.md §38 */
  tagline: "Understand the business. Make the digital side Sajilo.",
  /** Condensed positioning — portfolio_v0.1.md §37 */
  description:
    "Sajilo Web is a small, serious web and digital solutions studio focused on growing local businesses in Nepal. We build professional websites, structured online experiences, and useful custom digital tools — and we handle the technical complexity so getting online feels simple.",
  /**
   * TODO(user): set NEXT_PUBLIC_SITE_URL in Vercel (or .env.local) to the real
   * project URL. The fallback below is a placeholder.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sajilo-web.vercel.app",

  contact: {
    email: "sajiloweb2@gmail.com",
    /**
     * WhatsApp is currently the same line as the display phone.
     * TODO(user): confirm — if WhatsApp runs on a different number, change
     * `whatsapp` (digits only, with country code).
     */
    whatsapp: "9779746345871",
    phoneDisplay: "+977 9746345871",
    location: "Nepal",
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

