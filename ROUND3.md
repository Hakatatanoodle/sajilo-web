# Round 3 — live demos inside the hero frame (variant A)

Extract over the repo (on top of rounds 1-2 as merged on main). Only these files:

CHANGED
- src/components/HeroShowcase.tsx   live iframe layer, click-to-activate guard, desktop-only
- src/app/hero-navy.css             +styles for .hn-live and .hn-guard
- src/sections/HeroNavy.tsx         passes each project's demoUrl to the showcase

No new dependencies. Demos are read from public/demos/ via each project's
existing `demoUrl` in src/content/work.ts.

## Behaviour
- Every tab starts as the CSS miniature (instant, tiny). On desktop (>=1024px,
  not data-saver) the real demo mounts on top ~1.6s after load (and ~1s after a
  tab switch, once the wipe finishes) and fades in when loaded.
- Phones/tablets, data-saver visitors: miniatures only, no iframes loaded.
- Click-to-activate: a guard sits over the demo ("Click to try it live") so the
  page can still be scrolled with the mouse wheel. Move the pointer out of the
  frame and it locks again. Keyboard: Tab to the guard, press Enter.
- Reduced motion: no auto-advance, no wipe animation.

## Check after extracting
    npm run dev   # desktop width: wait ~2s for the demo; click a tab; click the demo
    npm run lint && npm run build
