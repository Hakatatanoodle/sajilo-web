"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { BrowserFrame } from "@/components/BrowserFrame";
import { ArrowUpRight } from "@/components/icons";
import { ProjectMockup, type MiniPalette } from "@/components/mockups";
import type { ProjectKind } from "@/content/work";

export type ShowcaseItem = {
  slug: string;
  title: string;
  industry: string;
  tag: string;
  kind: ProjectKind;
  palette: MiniPalette;
};

/** The miniatures are drawn for a ~380px-wide card; we scale them up to fit. */
const BASE_WIDTH = 380;
const AUTO_MS = 6500;
const SWAP_MS = 1150;

/**
 * Hero showcase — tabs over a browser frame. Switching tabs plays a
 * direction-aware wipe (forward tab = wipes in from the right, backward =
 * from the left; the outgoing page recedes and dims). Auto-advances every
 * few seconds until the visitor hovers or focuses it; never auto-advances
 * for prefers-reduced-motion.
 *
 * Round 2 will swap the CSS miniatures for the live demos in public/demos.
 */
export function HeroShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "back">("next");
  const [turns, setTurns] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scale, setScale] = useState<number | null>(null);

  const activeRef = useRef(0);
  const swapTimer = useRef(0);
  const reduced = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const go = useCallback((index: number, direction?: "next" | "back") => {
    const current = activeRef.current;
    if (index === current) return;
    activeRef.current = index;
    setDir(direction ?? (index > current ? "next" : "back"));
    setPrev(current);
    setActive(index);
    setTurns((t) => t + 1);
    window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => setPrev(null), SWAP_MS);
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return () => window.clearTimeout(swapTimer.current);
  }, []);

  // Fit the miniatures to the frame's actual width.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / BASE_WIDTH);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Gentle auto-advance.
  useEffect(() => {
    if (paused || reduced.current || items.length < 2) return;
    const id = window.setTimeout(
      () => go((active + 1) % items.length, "next"),
      AUTO_MS
    );
    return () => window.clearTimeout(id);
  }, [active, paused, items.length, go]);

  const current = items[active];

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="hn-tabs"
        role="tablist"
        aria-label="Example builds"
        style={{ "--n": items.length, "--i": active } as CSSProperties}
      >
        <span className="hn-tab-ind" aria-hidden />
        {items.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            id={`hn-tab-${i}`}
            aria-selected={i === active}
            aria-controls="hn-panel"
            tabIndex={i === active ? 0 : -1}
            className="hn-tab"
            onClick={() => go(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight")
                go((active + 1) % items.length, "next");
              if (e.key === "ArrowLeft")
                go((active - 1 + items.length) % items.length, "back");
            }}
          >
            {item.industry}
          </button>
        ))}
      </div>

      <div className="hn-frame">
        <div id="hn-panel" role="tabpanel" aria-labelledby={`hn-tab-${active}`}>
          <BrowserFrame
            title={`${current.title} (concept demo)`}
            url="yourbusiness.com.np"
          >
            <div
              ref={stageRef}
              className="hn-shots"
              data-dir={dir}
              data-ready={scale !== null ? "" : undefined}
              style={
                scale !== null ? ({ "--k": scale } as CSSProperties) : undefined
              }
            >
              {items.map((item, i) => {
                const state = i === active ? "on" : i === prev ? "out" : null;
                if (!state) return null;
                return (
                  <div
                    key={state === "on" ? `${item.slug}-${turns}` : item.slug}
                    className="hn-shot"
                    data-state={state}
                    data-enter={state === "on" && turns > 0 ? "" : undefined}
                  >
                    <div className="hn-scale">
                      <ProjectMockup kind={item.kind} palette={item.palette} />
                    </div>
                  </div>
                );
              })}
            </div>
          </BrowserFrame>
        </div>
      </div>

      <div className="hn-caption">
        <p>
          <span className="hn-tag">{current.tag}</span>
          {current.title}
        </p>
        <Link href={`/work/${current.slug}`}>
          View case study
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
