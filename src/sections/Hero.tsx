import { ButtonLink } from "@/components/Button";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Container } from "@/components/Container";
import { GenericLocalMini } from "@/components/mockups";
import { ArrowRight, Check } from "@/components/icons";
import Reveal from "@/components/Reveal";

/**
 * Home hero — the site's highest-intensity moment (design.md: HOME ★5).
 * Cinematic backdrop, kinetic reveals, and an honest illustration of what a
 * Sajilo-built site does for a business.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-14 sm:pt-20">
      {/* Backdrop: grid + brand glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-accent-strong/25 blur-[140px]" />
        <div className="absolute right-[-160px] top-1/3 h-[360px] w-[360px] rounded-full bg-accent-2/15 blur-[120px]" />
      </div>

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold tracking-wide text-fg-muted">
              <span className="size-1.5 rounded-full bg-mint" />
              Web &amp; digital solutions · for local businesses in Nepal
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-[4.2rem]">
              Your business.
              <br />
              <span className="text-gradient">Online, properly.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              We build professional websites and useful digital tools for
              growing local businesses — so the way customers find you online
              finally matches the business you&apos;ve built.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" size="lg">
                Start a conversation
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/work" variant="ghost" size="lg">
                See our work
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-7 flex items-center gap-2 text-sm text-fg-faint">
              <Check className="size-4 shrink-0 text-mint" />
              Everything in our work section is our own build — no borrowed
              screenshots, no invented clients.
            </p>
          </Reveal>
        </div>

        {/* Illustrative composition: a generic local-business site + the
            outcomes a Sajilo site produces. Decorative — the frame carries
            the accessible label. */}
        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-[540px]">
            <BrowserFrame
              title="A local business website built by Sajilo Web (illustration)"
              url="yourbusiness.com.np"
            >
              <GenericLocalMini />
            </BrowserFrame>

            <div className="absolute -right-3 -top-7 animate-float-a rounded-xl border border-white/10 bg-ink-2/90 px-4 py-3 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur sm:-right-6">
              <p className="text-[11px] font-semibold text-fg">Booking request</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-fg-faint">
                <span className="size-1.5 rounded-full bg-mint" />
                Today · via the website
              </p>
            </div>

            <div className="absolute -bottom-7 -left-3 animate-float-b rounded-xl border border-white/10 bg-ink-2/90 px-4 py-3 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur sm:-left-8">
              <p className="text-[11px] font-semibold text-fg">New WhatsApp inquiry</p>
              <p className="mt-0.5 text-[10px] text-fg-faint">
                &ldquo;Do you deliver to Bhaktapur?&rdquo;
              </p>
            </div>

            <div className="absolute -bottom-4 right-6 animate-float-a rounded-full border border-white/10 bg-ink-2/90 px-4 py-2 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur [animation-delay:1.4s]">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold text-fg-muted">
                <Check className="size-3.5 text-mint" />
                Hours &amp; location — updated
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
