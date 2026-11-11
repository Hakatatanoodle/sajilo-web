# Round 3b — hotfix for the live-demo click / release logic

One file, extract over the repo:
- src/components/HeroShowcase.tsx

What changed
- The demo no longer re-locks when the browser reports the pointer "left" the
  wrapper (it can do that the moment the pointer moves onto the iframe).
  It now releases only when the pointer is outside the frame, on a press
  outside it, or when keyboard focus returns to the page (tabbing out).
- Autoplay stays paused the whole time the live demo is active.

Does NOT change what loads inside the iframe: if the demo itself shows up
unstyled, that is a loading problem with the demo's CSS/JS files (see chat).
