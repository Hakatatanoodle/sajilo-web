# Dwaar — concept hotel site by Sajilo Web

A full single-page hotel website: door-slide intro, Three.js image hover effects,
smooth scrolling, horizontal-scroll experiences, rooms, food, FAQ and booking form.
Dwaar is a **concept** (not a real hotel). Prices, hours and address are placeholders.

## Files
    index.html        markup (all sections)
    css/style.css     styles and colour tokens (:root)
    js/main.js        intro animation, WebGL images, scroll, form
    assets/*.jpg      photos (hero, win, tower, sq, arch, gate, room1, room2, food1, food2, lamps, pot)
    assets/door-*.webp  the two halves of the intro "door"

## Run it
Double-click `index.html` and it works with every effect (hover ripple, smooth scroll). That is possible
because `assets/images.js` holds the photos for WebGL. When you host the folder on a server you can delete
`assets/images.js` and the page loads the normal `assets/*.jpg` files instead.

## Put it on Sajilo Web
- Static site / Vercel: drop the `dwaar` folder into your `public/` directory. It is then
  live at `https://sajiloweb.vercel.app/dwaar/` (links are relative, so the folder name can change).
- Own subdomain: deploy the `dwaar` folder as its own Vercel project (no build step, framework "Other").
- Inside a Next.js app: keep it in `public/dwaar/` and link to `/dwaar/` (or embed with an iframe).
  Porting it into React components is possible but not needed for a showcase.

## Things to edit
- Text, prices, FAQ: `index.html`.  Colours and fonts: `:root` in `css/style.css`.
- Swap a photo: replace the file in `assets/` (same name). Hero crop and gallery crops are
  set by `data-crop="x,y,w,h"` on each `data-img` element (fractions of the image).
- Intro timing: `open()` in `js/main.js`.   Intro image: `assets/door-left/right.webp`
  (one photo cut in half; the split point is the width in `.dl` / `.dr` in the CSS).
- CTA links point to https://sajiloweb.vercel.app/contact. Change if your route differs.
- The booking form does not send anything. Connect it to your email/API in `js/main.js` (search `bf`).

## Libraries (now self-hosted, versions pinned)
three r128, GSAP 3.12.5 + ScrollTrigger, Lenis 1.1.13 live in `js/`
(`three.min.js`, `gsap.min.js`, `ScrollTrigger.min.js`, `lenis.min.js`) so the
demo works offline and inside a Content-Security-Policy that only allows
same-origin scripts. To update, replace the file in `js/` and keep the
`<script src>` lines in `index.html` pointing at it.

## Photo credits (Unsplash licence; keep the credit line in the footer)
Sagar Shrestha, Slava Auchynnikau, Harsh Khandelwal, Tobias Federle, Sushanta Rokka,
Stan Tuladhar, Peter Mason, Mihai Lazăr, Sajan Rajbahak, Jhigu Bhoye,
Bhupinder Singh Attkley, Tuan Nguyen.
