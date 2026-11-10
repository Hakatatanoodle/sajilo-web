# Round 1 — Hero A ("navy sunrise") + foundations

Drop-in files (paths are relative to the repo root). Extract this zip over
your fresh clone; Git will show exactly these files as changed/new.

NEW
- src/app/hero-navy.css            all hero styles + keyframes (plain CSS)
- src/components/ScrollProgress.tsx  writes --p (0→1) on scroll; no library
- src/components/SplitHeadline.tsx   masked word-by-word headline
- src/components/HeroShowcase.tsx    tabs + direction-aware wipe between demos
- src/sections/HeroNavy.tsx          the new hero (variant A)

CHANGED
- src/app/globals.css       +1 line: @import "./hero-navy.css";
- src/app/page.tsx          uses <HeroNavy/>; <AboutStrip/> (founders) removed
- src/components/SiteNav.tsx   header turns white-on-navy while over the hero
- src/components/Button.tsx    +1 variant, "onNavy"

NOT TOUCHED (kept for variant B / later): src/sections/Hero.tsx, AboutStrip.tsx,
FounderCard.tsx, the About page.

## No new dependencies
No package.json change. Scroll effects are CSS calc() on one custom property.

## Check after extracting
    npm run dev       # look at / on desktop + phone width, reduced-motion on/off
    npm run lint && npm run build   # I could not run these here (no network)

## Clean the repo (the .vscode you mentioned)
    git rm -r --cached .vscode
    printf '\n.vscode/\n' >> .gitignore      # skip if already listed
    git status                                # also make sure teardown/ is not tracked
