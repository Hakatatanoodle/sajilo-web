"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { ShowcaseWindow } from "@/components/ShowcaseWindow";
import { ArrowRight } from "@/components/icons";

/**
 * Home hero — "The Open Studio" opening plate.
 *
 * One screen: the promise in monument type, the action, and a real build
 * already open on the table. The window is cropped by the fold on purpose —
 * it is an invitation to scroll, not a decoration.
 */
export function StudioHero() {
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * The scroll scene: as the visitor moves past the opening, the copy drifts
   * apart and fades, the tab row settles, and the tilted window flattens and
   * grows into the page. Scrolling back reverses it. Values follow the
   * reference build (desktop and a gentler phone set), applied with a short
   * scrub so the motion trails the wheel rather than snapping to it.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stage = section.querySelector<HTMLElement>(".hero-open__stage");
    const frame = section.querySelector<HTMLElement>(".showcase-frame");
    const tabs = section.querySelector<HTMLElement>(".showcase-tabs");
    const copy = section.querySelector<HTMLElement>(".hero-open__copy");
    const glow = section.querySelector<HTMLElement>(".hero-open__halo");
    const lines = Array.from(
      section.querySelectorAll<HTMLElement>("[data-drift]")
    );
    if (!stage || !frame || !tabs || !copy) return;

    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const config = () =>
      wide.matches
        ? {
            frameY: 40,
            rotate: 26,
            scale: 0.84,
            tabsY: 22,
            drift: [-140, -96, -64, -40],
            glow: 4,
            fade: 0.2,
          }
        : {
            frameY: 18,
            rotate: 12,
            scale: 0.94,
            tabsY: 10,
            drift: [-56, -40, -28, -18],
            glow: 6,
            fade: 0.45,
          };

    let target = 0;
    let current = 0;
    let raf = 0;

    const apply = (p: number) => {
      const c = config();
      frame.style.transform =
        `translateY(${c.frameY * (1 - p)}px) ` +
        `rotateX(${c.rotate * (1 - p)}deg) ` +
        `scale(${c.scale + (1 - c.scale) * p})`;
      tabs.style.transform = `translateY(${c.tabsY * (1 - p)}px)`;
      copy.style.opacity = String(1 - (1 - c.fade) * p);
      lines.forEach((line, index) => {
        line.style.translate = `0 ${c.drift[index] * p}px`;
      });
      if (glow) {
        glow.style.transform =
          `translateX(-50%) translateY(${c.glow * p}%) ` +
          `scale(${1 + 0.06 * p})`;
      }
    };

    const progress = () => {
      const top = stage.getBoundingClientRect().top + window.scrollY;
      const end = Math.max(320, top - 0.2 * window.innerHeight);
      return Math.min(1, Math.max(0, window.scrollY / end));
    };

    const tick = () => {
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.0015) current = target;
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
      target = 0;
      current = 0;
      frame.style.transform = "";
      tabs.style.transform = "";
      copy.style.opacity = "";
      lines.forEach((line) => {
        line.style.translate = "";
      });
      if (glow) glow.style.transform = "";
    };

    const onMotionChange = () => {
      if (reduce.matches) reset();
      else request();
    };

    if (reduce.matches) {
      reset();
    } else {
      target = progress();
      current = target;
      apply(current);
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduce.addEventListener("change", onMotionChange);
    wide.addEventListener("change", request);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduce.removeEventListener("change", onMotionChange);
      wide.removeEventListener("change", request);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-open"
      aria-labelledby="hero-title"
    >
      <div className="hero-open__halo" aria-hidden />

      <Container className="hero-open__inner">
        <div className="hero-open__copy flex flex-col items-center text-center">
          <p
            className="chapter"
            data-hero-enter
            data-drift
            style={{ "--enter-delay": "0ms" } as CSSProperties}
          >
            Web studio · Kathmandu Valley
          </p>

          <h1
            id="hero-title"
            className="hero-open__title mt-6 max-w-[19ch]"
            data-hero-enter
            data-drift
            style={{ "--enter-delay": "70ms" } as CSSProperties}
          >
            Your business.
            <br />
            Online, <span className="hero-mark">properly.</span>
          </h1>

          <p
            className="mt-6 max-w-[52ch] text-balance text-base leading-relaxed text-fg-muted sm:text-lg"
            data-hero-enter
            data-drift
            style={{ "--enter-delay": "140ms" } as CSSProperties}
          >
            Websites, booking flows and useful custom tools for local
            businesses — built with care, launched with you, and easy to keep
            running.
          </p>

          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
            data-hero-enter
            data-drift
            style={{ "--enter-delay": "210ms" } as CSSProperties}
          >
            <ButtonLink href="/contact" size="lg">
              Start a conversation
              <ArrowRight className="size-4" />
            </ButtonLink>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-fg transition-colors hover:text-accent"
            >
              See the work
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="hero-open__stage">
          <ShowcaseWindow />
        </div>
      </Container>
    </section>
  );
}
