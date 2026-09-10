# Demo websites — real, runnable builds

These folders contain the actual demo websites, copied verbatim from the
source folders/zips that live outside this repo. They are embedded live on
the case-study pages (`src/components/LiveDemoFrame.tsx`) — visitors click
around inside the real build, not a screenshot.

## The update contract (important)

To publish a demo change: **overwrite the files here, keeping the same
filenames and folder names — no code changes needed.** Or run:

    npm run sync-demos

which copies the current source demos from the parent directory.

| Folder | Source | Shown at |
|---|---|---|
| `sajilo-hub-store/` | `../../sajilo_hub_clothing_store_updated/` | `/work/sajilo-hub-store` |
| `ironforge-fitness/` | `../../sajiloweb_gym_website_responsive/` | `/work/ironforge-fitness` |
| `sweet-house/` | `../../sajilo_sweets_house_redesigned/` | `/work/sajilo-sweets-house` |

Adding a future demo = put its files in `public/demos/<slug>/`, add the
source to `scripts/sync-demos.mjs`, and set `demoUrl` on the project in
`src/content/work.ts`.
