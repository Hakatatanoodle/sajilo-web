"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in milliseconds (applied to the entrance only). */
  delay?: number;
  className?: string;
};

/**
 * Scroll-reveal wrapper — fully reversible.
 *
 * - Entering the viewing band animates the element in (with its stagger
 *   delay); leaving the band animates it back out, so every element replays
 *   fresh each time it is scrolled into view — down, up, either direction.
 * - Two IntersectionObservers create hysteresis so elements never flicker at
 *   the viewport edge: the "in" trigger sits well inside the viewport, the
 *   "out" trigger sits at its lower edge — the gap between them is a dead
 *   zone where neither fires.
 * - CSS lives in globals.css and is scoped under `html.js`, so content is
 *   fully visible when JavaScript is unavailable (no-JS safety).
 * - Respects prefers-reduced-motion by revealing immediately.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-visible", "");
      return;
    }

    // "In" — element is meaningfully inside the viewport (12% visible,
    // slightly past the bottom edge for a natural head start).
    const inObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.remove("reveal-out-top");
            el.setAttribute("data-visible", "");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    // "Out" — element has fully left the central viewing band. The -15%
    // bottom margin means the exit transition plays while the bottom ~15%
    // of the screen can still show it: the undo is visible, not abrupt.
    // Direction-aware: elements that left through the TOP hide by moving
    // further up (reveal-out-top), so the hidden offset always pushes them
    // AWAY from the viewport — a small element can never be pushed back in
    // by its own hidden transform and flicker forever.
    const outObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            el.classList.toggle(
              "reveal-out-top",
              entry.boundingClientRect.bottom <= 0
            );
            el.removeAttribute("data-visible");
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );

    inObserver.observe(el);
    outObserver.observe(el);
    return () => {
      inObserver.disconnect();
      outObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}
