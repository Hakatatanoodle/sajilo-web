# Demo websites — real, runnable builds

These folders contain the actual demo websites, copied from the source
folders that live outside this repo. They are embedded live on the
case-study pages (`src/components/LiveDemoFrame.tsx`) — visitors click
around inside the real build, not a screenshot.

They are **concept demos, not live businesses**. Each page is `noindex`
and discloses that it is a concept demo, and is iframed with `sandbox`. The sandbox
**must keep `allow-same-origin`** (see `LiveDemoFrame.tsx`): without it, Vercel
preview deployments with Deployment Protection redirect every demo CSS/JS/image
request to vercel.com/sso-api and the demo renders as unstyled HTML. Only put
first-party static files in `public/demos/`. `/demos/` is
also disallowed in `robots.ts`.

## The update contract (important)

To publish a demo change: **overwrite the files here, keeping the same
filenames and folder names — no code changes needed.** Or run:

    npm run sync-demos

which copies the current source demos from the parent directory.

| Folder | Source | Shown at |
|---|---|---|
| `dwaar/` | `../../dwaar/` | `/work/dwaar` |
| `sajilo-hub-store/` | `../../sajilo_hub_clothing_store_updated/` | `/work/sajilo-hub-store` |
| `ironforge-fitness/` | `../../sajiloweb_gym_website_responsive/` | `/work/ironforge-fitness` |
| `sweet-house/` | `../../sajilo_sweets_house_redesigned/` | `/work/sajilo-sweets-house` |

Adding a future demo = put its files in `public/demos/<slug>/`, add the
source to `scripts/sync-demos.mjs`, and set `demoUrl` on the project in
`src/content/work.ts`.
