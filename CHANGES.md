# Fix: demo iframe renders as unstyled HTML on Vercel preview

## Root cause
`LiveDemoFrame` sandboxed the iframe WITHOUT `allow-same-origin`. That gives the demo an opaque
origin, so the browser stops sending cookies for the demo's own CSS/JS/image requests. The preview
has Vercel Deployment Protection on, so each cookie-less request is redirected to
`vercel.com/sso-api?...`, which the CSP blocks (that is the `<URL>` / sso-api console errors).
The HTML arrives, everything it links to does not -> plain Times New Roman page.
Reproduced in Chromium with a simulated protected server; fixed version verified on all 4 demos.

## Changes
- `src/components/LiveDemoFrame.tsx`: sandbox now includes `allow-same-origin` (+ `allow-popups` so credit links open).
- `next.config.ts`: two CSPs were stacking on `/demos/*` (browsers enforce all of them). Site CSP now
  excludes `/demos/`; demos get one clean CSP. Removed `vercel.com` and the nonsense host lists.
- `public/demos/README.md`: corrected the sandbox note.
- Credit lines added to `ironforge-fitness` and `sajilo-hub-store` footers.
- `PHOTO-CREDITS.md`: audit of every photo and its credit status.

## Not verified here
`npm run lint` / `build` / `typecheck` were NOT run (no node_modules, no network). Run them before merging.
