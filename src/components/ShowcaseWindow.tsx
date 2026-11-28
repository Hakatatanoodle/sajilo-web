"use client";

import Image from "next/image";
import { useState } from "react";

type Demo = {
  slug: string;
  label: string;
  title: string;
  image: string;
};

const demos: Demo[] = [
  {
    slug: "dwaar",
    label: "Hotel",
    title: "Dwaar",
    image: "/showcase/dwaar-hero.webp",
  },
  {
    slug: "sajilo-sweets-house",
    label: "Sweets",
    title: "Sajilo Sweets House",
    image: "/showcase/sweets-hero.webp",
  },
  {
    slug: "sajilo-hub-store",
    label: "Clothing",
    title: "Sajilo HUB",
    image: "/showcase/hub-hero.webp",
  },
  {
    slug: "ironforge-fitness",
    label: "Fitness",
    title: "IronForge Fitness",
    image: "/showcase/ironforge-hero.webp",
  },
];

/**
 * The hero window — four real concept builds, open on the table.
 *
 * A tabbed frame rather than a fake browser: the tabs choose a real
 * screenshot of a build you can open, so the hero proves the work instead of
 * illustrating it. The frame stays whole as you scroll; no auto rotation.
 */
export function ShowcaseWindow() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "back">("next");
  const [turn, setTurn] = useState(0);

  const select = (next: number) => {
    if (next === active) return;
    setDirection(next > active ? "next" : "back");
    setPrevious(active);
    setActive(next);
    setTurn((value) => value + 1);
  };

  const move = (next: number) => {
    select(next);
    document.getElementById(`showcase-tab-${next}`)?.focus();
  };

  return (
    <div className="hero-showcase">
      <div className="showcase-tabs" role="tablist" aria-label="Concept builds">
        {demos.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              id={`showcase-tab-${index}`}
              aria-selected={selected}
              aria-controls="showcase-panel"
              tabIndex={selected ? 0 : -1}
              className="showcase-tab"
              onClick={() => select(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight")
                  move((index + 1) % demos.length);
                if (event.key === "ArrowLeft")
                  move((index - 1 + demos.length) % demos.length);
                if (event.key === "Home") move(0);
                if (event.key === "End") move(demos.length - 1);
              }}
            >
              <span className="showcase-tab__dot" aria-hidden />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="showcase-scene">
        <div className="showcase-frame">
          <div
            id="showcase-panel"
            role="tabpanel"
            aria-label={`${demos[active].title} — concept demo`}
            data-dir={direction}
            className="showcase-stage"
          >
            {demos.map((item, index) => {
              const state =
                index === active ? "on" : index === previous ? "off" : "idle";
              return (
                <div
                  key={`${item.slug}-${index === active ? turn : 0}`}
                  className="showcase-shot"
                  data-state={state}
                  data-turned={index === active && turn > 0 ? "" : undefined}
                >
                  <Image
                    src={item.image}
                    alt={`${item.title} — concept demo homepage`}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? undefined : "eager"}
                    sizes="(max-width: 768px) 100vw, 1100px"
                    className="showcase-shot__image"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
