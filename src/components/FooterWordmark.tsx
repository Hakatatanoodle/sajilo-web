"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

/*
 * The closing signature — a monument-scale "SajiloWeb" at the very end of
 * the page. It is set in Manrope 800, the same face as the logo lockup, and
 * "Web" takes the brand yellow of the lockup's pill. The letters rise
 * through a mask from the centre outward as the footer arrives, over a
 * yellow sunrise that lifts and opens behind them.
 *
 * The final state is the default (no JS, reduced motion). This component
 * only supplies the scroll-scrubbed entrance — the same reading as the
 * reference: one scrubbed timeline, glow first, letters from the centre.
 */

const WORD = "SajiloWeb";
/** "Sajilo" is the ivory half; "Web" carries the brand yellow. */
const WEB_START = 6;

const LETTERS = Array.from(WORD).map((char, index) => ({
  char,
  web: index >= WEB_START,
  /** A touch more air before the colour change. */
  loose: index === WEB_START,
}));

export function FooterWordmark() {
  const rootRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const mask = maskRef.current;
    const glow = glowRef.current;
    if (!root || !mask || !glow) return;

    const letters = Array.from(
      mask.querySelectorAll<HTMLElement>("[data-letter]")
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let target = 0;
    let current = 0;
    let raf = 0;

    const easeGlow = (p: number) => 1 - (1 - p) ** 2;
    const easeLetter = (t: number) => 1 - (1 - t) ** 3;

    const apply = (p: number) => {
      const g = easeGlow(p);
      glow.style.opacity = (0.5 + 0.42 * g).toFixed(3);
      glow.style.transform =
        `translateY(${(14 * (1 - g)).toFixed(2)}%) ` +
        `scale(${(0.72 + 0.28 * g).toFixed(4)}, ${(0.42 + 0.58 * g).toFixed(4)})`;

      letters.forEach((letter, index) => {
        // Same choreography as the reference: centre first, then outward.
        const distance = Math.abs(index - (letters.length - 1) / 2);
        const start = 0.12 + distance * 0.045;
        const t = Math.min(1, Math.max(0, (p - start) / 0.5));
        const e = easeLetter(t);
        letter.style.transform = `translateY(${(104 * (1 - e)).toFixed(2)}%)`;
      });

      root.toggleAttribute("data-awake", p > 0.02);
    };

    const progress = () => {
      const rect = mask.getBoundingClientRect();
      const vh = window.innerHeight;
      // Finish around the bottom of the page, but give small screens enough
      // travel for the rise to read.
      const travel = Math.max(rect.height * 0.85, vh * 0.25);
      return Math.min(1, Math.max(0, (vh - rect.top) / travel));
    };

    const tick = () => {
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.001) current = target;
      apply(current);
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const request = () => {
      target = progress();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const reset = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      glow.style.opacity = "";
      glow.style.transform = "";
      letters.forEach((letter) => {
        letter.style.transform = "";
      });
      root.removeAttribute("data-awake");
    };

    const onMotionChange = () => {
      if (reduce.matches) {
        reset();
      } else {
        target = progress();
        current = target;
        apply(current);
      }
    };

    if (reduce.matches) {
      reset();
    } else {
      target = progress();
      current = target;
      apply(current);
    }

    // The wordmark's height depends on Manrope. If the swap lands after this
    // first pass, re-read the geometry so the finished state is exact.
    let alive = true;
    document.fonts?.ready
      .then(() => {
        if (!alive || reduce.matches) return;
        target = progress();
        current = target;
        apply(current);
      })
      .catch(() => {});

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduce.addEventListener("change", onMotionChange);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduce.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div ref={rootRef} className="sj-wordmark pb-28 md:pb-0">
      <div ref={glowRef} className="sj-wordmark__glow" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="sj-wordmark__fit">
          <Link
            href="/"
            className="sj-wordmark__link"
            aria-label="Sajilo Web — home"
          >
            <span ref={maskRef} className="sj-wordmark__mask">
              <span className="sj-wordmark__word">
                {LETTERS.map((letter, index) => (
                  <span
                    key={`${letter.char}-${index}`}
                    data-letter
                    data-loose={letter.loose ? "" : undefined}
                    aria-hidden="true"
                    className={cn(
                      "sj-wordmark__letter",
                      letter.web && "sj-wordmark__letter--web"
                    )}
                  >
                    {letter.char}
                  </span>
                ))}
              </span>
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
