"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { BrowserChrome } from "@/components/BrowserChrome";
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
  /** Path of the runnable demo under /public/demos (optional). */
  demoUrl?: string;
};

/** The miniatures are drawn for a ~380px-wide card; we scale them up to fit. */
const MINI_WIDTH = 380;
/** Live demos are rendered at a desktop viewport, then scaled to fit. */
const LIVE_WIDTH = 1280;
const AUTO_MS = 6500;
const SWAP_MS = 1150;
/** First live demo waits for the hero's load-in to finish. */
const FIRST_LIVE_DELAY_MS = 1600;

type SaveDataNavigator = Navigator & { connection?: { saveData?: boolean } };

/**
 * Hero showcase — tabs over a browser frame.
 *
 * Every tab starts as a lightweight CSS miniature ("poster"). On desktop
 * (≥1024px, not reduced-data) the real demo site is mounted on top of the
 * active poster once its wipe has finished, and fades in when loaded — so the
 * hero never shows a blank box, and phones / data-saver visitors never pay
 * for an iframe.
 *
 * The live demo is click-to-activate: until the visitor clicks it, a guard
 * sits over the iframe so page scroll is never trapped inside it. Moving the
 * pointer out of the frame releases it again.
 *
 * Switching tabs plays a direction-aware wipe (forward = from the right,
 * backward = from the left; the old page recedes and dims). Auto-advances
 * every few seconds until the visitor hovers or focuses it; never
 * auto-advances for prefers-reduced-motion.
 */
export function HeroShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "back">("next");
  const [turns, setTurns] = useState(0);
  const [hover, setHover] = useState(false);
  const [width, setWidth] = useState<number | null>(null);

  // Live-demo state.
  const [live, setLive] = useState(false);
  const [liveSlug, setLiveSlug] = useState<string | null>(null);
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  // Autoplay stays paused while hovering, focused, or using the live demo.
  const paused = hover || interactive;

  const activeRef = useRef(0);
  const swapTimer = useRef(0);
  const reduced = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const go = useCallback((index: number, direction?: "next" | "back") => {
    const current = activeRef.current;
    if (index === current) return;
    activeRef.current = index;
    setDir(direction ?? (index > current ? "next" : "back"));
    setPrev(current);
    setActive(index);
    setTurns((t) => t + 1);
    setInteractive(false);
    window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => setPrev(null), SWAP_MS);
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Live demos only on roomy screens and when the visitor hasn't asked
    // the browser to save data.
    const wide = window.matchMedia("(min-width: 1024px)");
    const saveData = (navigator as SaveDataNavigator).connection?.saveData;
    const update = () => setLive(wide.matches && !saveData);
    update();
    wide.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      window.clearTimeout(swapTimer.current);
    };
  }, []);

  // Fit the miniatures and the live demo to the frame's actual width.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
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

  // While the live demo is active, release it when the pointer goes anywhere
  // outside the frame (the page only receives pointer events outside the
  // iframe), on a press outside it, or when keyboard focus returns to the
  // page (tabbing out of the demo). We deliberately do NOT use
  // pointerleave on the wrapper: browsers can report "left" the moment the
  // pointer moves onto the iframe, which would re-lock it under the user.
  useEffect(() => {
    if (!interactive) return;
    const outside = (e: PointerEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        setInteractive(false);
      }
    };
    // Key presses inside a cross-origin iframe never reach the page, so a
    // key like Escape can't be used; focus returning to the page is the signal.
    const onFocusIn = (e: FocusEvent) => {
      if (e.target !== frameRef.current) setInteractive(false);
    };
    window.addEventListener("pointermove", outside, { passive: true });
    window.addEventListener("pointerdown", outside, { passive: true });
    window.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("pointermove", outside);
      window.removeEventListener("pointerdown", outside);
      window.removeEventListener("focusin", onFocusIn);
    };
  }, [interactive]);

  // Mount the live demo once the active tab has settled.
  useEffect(() => {
    setLiveSlug(null);
    setLoadedSlug(null);
    if (!live) return;
    const item = items[active];
    if (!item?.demoUrl) return;
    const id = window.setTimeout(
      () => setLiveSlug(item.slug),
      turns === 0 ? FIRST_LIVE_DELAY_MS : SWAP_MS - 150
    );
    return () => window.clearTimeout(id);
  }, [active, live, items, turns]);

  const current = items[active];

  return (
    <div
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
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
          <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_80px_-30px_rgba(31,39,64,0.28)]">
            <BrowserChrome url={`${current.slug}.sajiloweb-demo.build`} />
            <div className="relative aspect-[16/10]">
              <div
                ref={stageRef}
                className="hn-shots"
                data-dir={dir}
                data-ready={width !== null ? "" : undefined}
                style={
                  width !== null
                    ? ({
                        "--k": width / MINI_WIDTH,
                        "--kl": width / LIVE_WIDTH,
                      } as CSSProperties)
                    : undefined
                }
              >
                {items.map((item, i) => {
                  const state = i === active ? "on" : i === prev ? "out" : null;
                  if (!state) return null;
                  const showLive =
                    state === "on" && liveSlug === item.slug && item.demoUrl;
                  return (
                    <div
                      key={state === "on" ? `${item.slug}-${turns}` : item.slug}
                      className="hn-shot"
                      data-state={state}
                      data-enter={state === "on" && turns > 0 ? "" : undefined}
                    >
                      <div className="hn-scale">
                        <ProjectMockup
                          kind={item.kind}
                          palette={item.palette}
                        />
                      </div>

                      {showLive ? (
                        <>
                          <div
                            className="hn-live"
                            data-loaded={
                              loadedSlug === item.slug ? "" : undefined
                            }
                          >
                            <iframe
                              ref={frameRef}
                              src={item.demoUrl}
                              title={`${item.title} — live demo`}
                              sandbox="allow-scripts allow-forms"
                              referrerPolicy="no-referrer"
                              tabIndex={interactive ? 0 : -1}
                              onLoad={() => setLoadedSlug(item.slug)}
                            />
                          </div>
                          {!interactive && loadedSlug === item.slug ? (
                            <button
                              type="button"
                              className="hn-guard"
                              aria-label={`Try the ${item.title} demo — click to interact`}
                              onClick={() => {
                                setInteractive(true);
                                window.setTimeout(
                                  () => frameRef.current?.focus(),
                                  0
                                );
                              }}
                            >
                              <span>Click to try it live</span>
                            </button>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
