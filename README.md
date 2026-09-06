# Sajilo Web — Public Website

The Sajilo Web agency website: who we are, what we build, the work we can
honestly show, and how to reach us. Built as a **small, serious, capable**
studio site — cinematic surface, functional core.

Governing docs live one level up: `../portfolio_v0.1.md` (brand),
`../architecture.md` (engineering), `../design.md` (design direction),
`../agent.md` (AI workflow).

## Stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens in `src/app/globals.css`
- **npm** · **Vercel** (deployment)
- Zero runtime dependencies beyond Next/React — motion is CSS + one small
  IntersectionObserver component (`src/components/Reveal.tsx`)

## Quick start

```bash
npm install        # already done if node_modules exists
npm run dev        # http://localhost:3000
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # production build (also runs type checks)
```

## Structure

```text
src/
├─ app/                  # Routes (App Router)
│  ├─ page.tsx           # Home            (cinematic ★5)
│  ├─ work/              # Work index ★4 + [slug] case studies ★3
│  ├─ services/          # Services ★3
│  ├─ about/             # About ★2
│  ├─ contact/           # Contact ★2
│  ├─ not-found.tsx      # Designed 404
│  ├─ sitemap.ts / robots.ts / manifest.ts
│  ├─ icon.svg           # Favicon
│  ├─ opengraph-image.tsx# Social card (generated at build)
│  └─ globals.css        # Design tokens + base styles
├─ components/           # Reusable primitives (Button, Reveal, Nav, …)
│  └─ mockups/           # CSS miniatures of the demo projects
├─ sections/             # Page composition (Hero, WorkTeaser, Process, …)
├─ content/              # ALL site content lives here
│  ├─ site.ts            # Brand, nav, industries, founders, contact
│  ├─ services.ts        # The five services
│  └─ work.ts            # The five concept/demo projects
└─ lib/cn.ts             # Tiny class-name helper
```

## Content editing

Everything a non-developer might change is in `src/content/`. Copy is written
to be honest by construction: **every project is tagged `Concept · Demo`**
(design.md §26, portfolio_v0.1.md §35 — we never present invented work as
client work). The `Tag` component has a `client` variant styled and reserved
for future real client projects.

## Before going live — remaining items

Real values are now in place for the contact email, phone, WhatsApp, and
founder names. Still outstanding:

- [ ] **Domain** — set `NEXT_PUBLIC_SITE_URL` in Vercel (or `.env.local`) to
      the real project URL; the fallback `https://sajilo-web.vercel.app` is a
      placeholder used for metadata, sitemap, and robots.
- [ ] **Founder roles** — currently provisional (Yochan = Engineering &
      Delivery, Rohan = Design & Client Care); adjust in
      `src/content/site.ts` when the real split is decided.
- [ ] **Founder photos** — add to the About sections when ready.
- [ ] **WhatsApp number** — currently the same line as the display phone
      (+977 9746345871); change `contact.whatsapp` in `src/content/site.ts`
      if WhatsApp runs on a different number.

Nothing else on the site is placeholder: all project facts (features, prices,
palettes) come from the real demo builds in `../web_agency_portfolio/` and
`../sajilo_hub_clothing_store_updated/`.

## Deployment (Vercel)

1. Push to GitHub, import the repo in Vercel (framework auto-detected).
2. Set `NEXT_PUBLIC_SITE_URL` to the final URL.
3. Deploy — the site is fully static; no database, no server functions.

## Verification performed

`npm run lint` · `npm run typecheck` · `npm run build` · manual pass:
keyboard navigation, reduced motion, mobile widths, contrast on dark surfaces.
