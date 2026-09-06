/**
 * Services — portfolio_v0.1.md §6 defines the five service areas.
 * Copy is honest: no invented prices, timelines, or client counts.
 */

export type ServiceIcon =
  | "globe"
  | "target"
  | "layers"
  | "spark"
  | "shield";

export type Service = {
  slug: string;
  title: string;
  /** One-liner used on the home page grid. */
  short: string;
  /** Full paragraph used on the services page. */
  description: string;
  /** What's included — concrete, not padded. */
  includes: string[];
  /** Honest "good fit if" line. */
  goodFit: string;
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    slug: "business-websites",
    title: "Business Websites",
    short:
      "Fast, mobile-friendly websites that explain what you do and make contacting you easy.",
    description:
      "A proper home for your business online: clear pages for what you offer, where you are, and how to reach you. Built to load fast on the phones your customers actually use, and structured so search engines can understand your business.",
    includes: [
      "Design shaped around your business, not a recycled template",
      "Mobile-first and fast on real-world connections",
      "Clear contact and inquiry paths",
      "Google Maps, hours, and business info done right",
      "A walkthrough so you know how everything works",
    ],
    goodFit:
      "You have real-world traction, but your online presence is missing, outdated, or scattered across social media.",
    icon: "globe",
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    short:
      "Focused pages built around one goal — a booking, an inquiry, a campaign.",
    description:
      "When one action matters — bookings for a program, inquiries for a service, sign-ups for a launch — a focused landing page removes everything that gets in the way. One clear message, one path, no distractions.",
    includes: [
      "A single-purpose page with one clear call to action",
      "Inquiry or booking form connected to where you actually reply",
      "Copy help so the page speaks your customers' language",
      "Fast loads and clean behaviour on mobile",
    ],
    goodFit:
      "You're promoting something specific — a new service, a season, an event — and need one page that turns attention into action.",
    icon: "target",
  },
  {
    slug: "business-information-systems",
    title: "Business Information Systems",
    short:
      "Booking flows, catalogs, and tools that structure how customers interact with your business.",
    description:
      "Some businesses need more than a website: appointment requests that reach the right person, product catalogs that stay up to date, inquiry flows your team can actually manage. We design systems that match how your business already operates.",
    includes: [
      "Booking and appointment request flows",
      "Product or service catalogs with search and filtering",
      "Structured inquiry handling",
      "Admin views — only where they earn their complexity",
    ],
    goodFit:
      "Customers keep asking for the same information or bookings by phone, and a structured system would save your team real time.",
    icon: "layers",
  },
  {
    slug: "custom-digital-solutions",
    title: "Custom Digital Solutions",
    short:
      "When off-the-shelf doesn't fit, we build the tool your business actually needs.",
    description:
      "Every business works a little differently. When standard options don't match — an unusual workflow, a niche process, a specific integration — we scope the problem honestly, build the smallest thing that solves it, and skip the parts that don't earn their place.",
    includes: [
      "Scoping conversations before any code is written",
      "The smallest viable build that solves the real problem",
      "Honest advice — including when a simpler option is better",
      "Handover documentation you can actually use",
    ],
    goodFit:
      "You've looked at existing tools and none of them match how your business actually runs.",
    icon: "spark",
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    short:
      "Updates, fixes, and honest advice after launch — so your site stays useful.",
    description:
      "A website is not a one-time event. Content changes, things break, opportunities appear. We stay reachable after launch — updating content, fixing issues, and improving the site as your business grows.",
    includes: [
      "Content updates and small changes",
      "Fixes when something breaks",
      "Uptime and update guidance",
      "A real person you can reach — not a ticket queue",
    ],
    goodFit:
      "Your site is live (or about to be) and you want a partner who answers when something comes up.",
    icon: "shield",
  },
];
