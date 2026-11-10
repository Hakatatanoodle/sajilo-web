"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type ScrollProgressProps = {
  children: ReactNode;
  className?: string;
  /** Marks the section as a dark surface so the fixed header can restyle itself. */
  navDark?: boolean;
  /** Scroll distance (in viewport heights) over which --p goes 0 → 1. */
  distance?: number;
};

/**
 * Writes one CSS custom property, `--p` (0 → 1), on its <section> as the page
 * scrolls through the first `distance` viewport heights. CSS does everything
 * else with calc(), so scroll-driven effects need no animation library.
 *
 * - Updates are rAF-throttled, passive, and skipped when the value is
 *   unchanged (so it costs nothing once the hero has scrolled away).
 * - prefers-reduced-motion: --p is pinned to 1 (the settled, flat state).
 * - Server render and no-JS: --p is 0 (hero in its starting pose).
 */
export function ScrollProgress({
  children,
  className,
  navDark,
  distance = 0.85,
}: ScrollProgressProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      const span = Math.max(window.innerHeight * distance, 1);
      const p = Math.min(1, Math.max(0, window.scrollY / span));
      const value = Math.round(p * 1000) / 1000;
      if (value !== last) {
        last = value;
        el.style.setProperty("--p", String(value));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [distance]);

  return (
    <section
      ref={ref}
      className={className}
      style={{ "--p": 0 } as CSSProperties}
      data-nav-dark={navDark ? "" : undefined}
    >
      {children}
    </section>
  );
}
