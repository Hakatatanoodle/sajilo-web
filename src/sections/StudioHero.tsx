import Link from "next/link";
import type { CSSProperties } from "react";
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
  return (
    <section className="hero-open" aria-labelledby="hero-title">
      <div className="hero-open__halo" aria-hidden />

      <Container className="hero-open__inner">
        <div className="flex flex-col items-center text-center">
          <p className="chapter" data-hero-enter style={{ "--enter-delay": "0ms" } as CSSProperties}>
            Web studio · Kathmandu Valley
          </p>

          <h1
            id="hero-title"
            className="hero-open__title mt-6 max-w-[19ch]"
            data-hero-enter
            style={{ "--enter-delay": "70ms" } as CSSProperties}
          >
            Your business.
            <br />
            Online, <span className="hero-mark">properly.</span>
          </h1>

          <p
            className="mt-6 max-w-[52ch] text-balance text-base leading-relaxed text-fg-muted sm:text-lg"
            data-hero-enter
            style={{ "--enter-delay": "140ms" } as CSSProperties}
          >
            Websites, booking flows and useful custom tools for local
            businesses — built with care, launched with you, and easy to keep
            running.
          </p>

          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
            data-hero-enter
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
