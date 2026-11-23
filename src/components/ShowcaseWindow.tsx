"use client";

import Image from "next/image";
import { useState } from "react";

type Demo = {
  slug: string;
  label: string;
  title: string;
  url: string;
  image: string;
  note: string;
};

const demos: Demo[] = [
  {
    slug: "sajilo-hub-store",
    label: "Clothing",
    title: "Sajilo HUB",
    url: "sajilohub.demo",
    image: "/showcase/hub-hero.webp",
    note: "Catalog · Cart · COD checkout",
  },
  {
    slug: "ironforge-fitness",
    label: "Fitness",
    title: "IronForge Fitness",
    url: "ironforge.demo",
    image: "/showcase/ironforge-hero.webp",
    note: "Programs · Open pricing · Intro visit",
  },
  {
    slug: "sajilo-sweets-house",
    label: "Sweets",
    title: "Sajilo Sweets House",
    url: "sajilosweets.demo",
    image: "/showcase/sweets-hero.webp",
    note: "Menu · Weight ordering · Festive boxes",
  },
];

/**
 * The hero window — three real concept builds, live inside a paper browser.
 *
 * Deliberately simple: the tabs switch a real screenshot of a build you can
 * open, so the hero proves the work instead of illustrating it. No auto
 * rotation; the visitor chooses.
 */
export function ShowcaseWindow() {
  const [active, setActive] = useState(0);
  const demo = demos[active];

  return (
    <div className="hero-showcase">
      <div className="demo-tabs" role="tablist" aria-label="Concept builds">
        {demos.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            id={`showcase-tab-${index}`}
            aria-selected={index === active}
            aria-controls="showcase-panel"
            tabIndex={index === active ? 0 : -1}
            className="demo-tab"
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              const move = (next: number) => {
                setActive(next);
                document.getElementById(`showcase-tab-${next}`)?.focus();
              };
              if (event.key === "ArrowRight")
                move((index + 1) % demos.length);
              if (event.key === "ArrowLeft")
                move((index - 1 + demos.length) % demos.length);
              if (event.key === "Home") move(0);
              if (event.key === "End") move(demos.length - 1);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="browser-shell">
        <div className="browser-shell__bar">
          <span className="browser-shell__dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="browser-shell__url">{demo.url}</span>
          <span className="browser-shell__badge">Concept demo</span>
        </div>
        <div
          id="showcase-panel"
          role="tabpanel"
          aria-labelledby={`showcase-tab-${active}`}
          className="browser-shell__body hero-open__window"
        >
          <div key={demo.slug} className="demo-panel absolute inset-0">
            <Image
              src={demo.image}
              alt={`${demo.title} — concept demo homepage`}
              fill
              priority={active === 0}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="hero-window-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
