import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { HeroShowcase, type ShowcaseItem } from "@/components/HeroShowcase";
import { ArrowRight } from "@/components/icons";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SplitHeadline } from "@/components/SplitHeadline";
import { getFeatured } from "@/content/work";

/**
 * Home hero, variant A — "navy sunrise".
 * Dark navy canvas with a yellow sun rising from the bottom; the headline
 * reveals word by word; the browser frame arrives tilted back and flattens as
 * you scroll, and its tabs wipe between the three demo builds.
 * All styling lives in app/hero-navy.css.
 */
export function HeroNavy() {
  const items: ShowcaseItem[] = getFeatured().map((p) => ({
    slug: p.slug,
    title: p.title,
    industry: p.industry,
    tag: p.tag,
    kind: p.mockKind,
    palette: p.palette,
    demoUrl: p.demoUrl,
  }));

  return (
    <ScrollProgress className="hero-navy" navDark>
      <div className="hero-navy__bg" aria-hidden>
        <div className="hero-navy__dots" />
        <div className="hero-navy__sun">
          <div className="hero-navy__core" />
          <div className="hero-navy__ember" />
        </div>
        <div className="hero-navy__grain" />
        <div className="hero-navy__veil" />
      </div>

      <Container>
        <div className="hero-navy__copy">
          <p className="hn-pill">
            <i />
            Web &amp; digital solutions · for local businesses in Nepal
          </p>

          <SplitHeadline
            className="hn-title"
            lines={[
              { text: "Your business." },
              { text: "Online, properly.", accent: true },
            ]}
          />

          <p className="hn-lead">
            We build professional websites and useful digital tools for growing
            local businesses — so the way customers find you online finally
            matches the business you&apos;ve built.
          </p>

          <div className="hn-actions">
            <ButtonLink href="/contact" size="lg">
              Start a conversation
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/work" variant="onNavy" size="lg">
              See the work first
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>

          <p className="hn-micro">
            One short conversation is usually enough — or look at the work first
            to see how we build.
          </p>
        </div>

        <div className="hn-stage">
          <HeroShowcase items={items} />
        </div>
      </Container>
    </ScrollProgress>
  );
}
