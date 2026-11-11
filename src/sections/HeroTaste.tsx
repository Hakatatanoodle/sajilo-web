import Link from "next/link";
import { ScrollProgress } from "@/components/ScrollProgress";

/**
 * Home hero, variant B — "tasteskill monument".
 *
 * Poster-scale typography: one sentence as layout. Dark slate chapter canvas
 * with drifting violet/emerald/amber blobs, a terminal-style CTA, and a
 * large chapter number in the corner (tasteskill "3 / 8 / 18" vibe).
 *
 * Scroll-driven parallax via --p from <ScrollProgress>. All styling in
 * app/hero-taste.css.
 */
export function HeroTaste() {
  return (
    <ScrollProgress className="hero-taste" navDark>
      <div className="hero-taste__bg" aria-hidden>
        <div className="hero-taste__blob hero-taste__blob--a" />
        <div className="hero-taste__blob hero-taste__blob--b" />
        <div className="hero-taste__blob hero-taste__blob--c" />
        <div className="hero-taste__grid" />
        <div className="hero-taste__grain" />
      </div>

      <div className="hero-taste__number">01</div>

      <div className="container mx-auto px-5 sm:px-8">
        <div className="hero-taste__copy">
          <p className="hero-taste__pill">
            <i />
            Web &amp; digital solutions · for local businesses in Nepal
          </p>

          <h1 className="hero-taste__title">
            Your business.{" "}
            <span className="taste-accent">Online, properly.</span>
          </h1>

          <p className="hero-taste__lead">
            We build professional websites and useful digital tools for growing
            local businesses — so the way customers find you online finally
            matches the business you&apos;ve built.
          </p>

          <div className="hero-taste__actions">
            <Link
              href="/contact"
              className="hero-taste__term"
            >
              <span className="prompt">&gt;</span> start a conversation
              <span className="cursor"></span>
            </Link>
            <Link href="/work" className="hero-taste__secondary">
              See the work first
            </Link>
          </div>
        </div>
      </div>
    </ScrollProgress>
  );
}