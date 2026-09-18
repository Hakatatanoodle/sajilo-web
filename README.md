# Sajilo Web — Public Website

The Sajilo Web agency website: who we are, what we build, the work we can
honestly show, and how to reach us. Built as a **small, serious, capable**
studio site.

> **v0.2 — Brand retheme.** The visual identity now comes directly from the
> Sajilo Web logo: white canvas, brand yellow (`#FFC629`), navy ink
> (`#1F2740`), the S-ribbon + cursor logo mark (`src/components/Logo.tsx`),
> the yellow "Web" pill as the primary button style, a yellow CTA band, a
> navy footer, and the BUILD · LAUNCH · GROW tagline. The previous dark
> violet theme was replaced in a single pass; it remains recoverable from
> git history.

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
│  ├─ privacy/           # Privacy (honest, short)
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
│  └─ work.ts            # The six demo projects (3 runnable, 3 concept)
└─ lib/cn.ts             # Tiny class-name helper
```

## Content editing

Everything a non-developer might change is in `src/content/`. Copy is written
to be honest by construction: **every project is tagged `Concept · Demo`**
(design.md §26, portfolio_v0.1.md §35 — we never present invented work as
client work). The `Tag` component has a `client` variant styled and reserved
for future real client projects.

## Before going live — remaining items

These need a human decision; they are not code bugs:

- [ ] **Domain** — set `NEXT_PUBLIC_SITE_URL` in Vercel (see `.env.example`)
      to the real project URL. Until then, metadata / sitemap / robots fall
      back to `https://sajilo-web.vercel.app`.
- [ ] **Founder roles** — currently provisional (Yochan = Engineering &
      Delivery, Rohan = Design & Client Care); adjust in
      `src/content/site.ts` when the real split is decided.
- [ ] **Founder photos** — add to the About sections when ready.
- [ ] **WhatsApp number** — currently the same line as the display phone
      (+977 9746345871); change `contact.whatsapp` in `src/content/site.ts`
      if WhatsApp runs on a different number.

Security hardening already in the repo: demo iframes are sandboxed, `/demos/`
is `noindex`, security headers live in `next.config.ts`, and the leftover
`cloudflared` package is not part of the site.

## Real demo websites (`public/demos/`)

Two featured builds started it — now **three of the projects are real,
runnable demo websites** embedded live on their case-study pages: the Sajilo
HUB clothing store, IronForge Fitness, and Sajilo Sweets House. They are
plain static sites copied into `public/demos/` and rendered inside a
sandboxed browser frame (`src/components/LiveDemoFrame.tsx`) — visitors click
around inside the actual build, not a screenshot. Demos are labelled as
concept pieces, blocked from search indexing, and cannot touch the parent
page's DOM or storage.

**Updating a demo takes no code changes:** overwrite the files in the
matching folder (keep the same filenames), or run:

```bash
npm run sync-demos   # copies the source demo folders from ../
```

| Folder in `public/demos/` | Source (outside the repo) | Shown at |
|---|---|---|
| `sajilo-hub-store/` | `../sajilo_hub_clothing_store_updated/` | `/work/sajilo-hub-store` |
| `ironforge-fitness/` | `../sajiloweb_gym_website_responsive/` | `/work/ironforge-fitness` |
| `sweet-house/` | `../sajilo_sweets_house_redesigned/` | `/work/sajilo-sweets-house` |

The other three projects are illustrated with CSS miniatures. To add a real
demo later: drop its files into `public/demos/<slug>/`, register the source
in `scripts/sync-demos.mjs`, and set `demoUrl` on the project in
`src/content/work.ts`.

## Deployment (Vercel)

1. Push to GitHub, import the repo in Vercel (framework auto-detected).
2. Deploy — no env vars required. The site is fully static; no database,
   no server functions. Security headers are set in `next.config.ts`.
3. When you add a custom domain, set `NEXT_PUBLIC_SITE_URL` to that origin
   and redeploy so canonicals / sitemap / social cards match.

## Verification performed

`npm run lint` · `npm run typecheck` · `npm run build` · manual pass:
keyboard navigation, reduced motion, mobile widths, contrast on the light
theme (yellow is used as a surface with navy text, never as text on white;
accent *text* uses a darker amber for readability).
