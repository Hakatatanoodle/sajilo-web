import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { ButtonLink } from "@/components/Button";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Container } from "@/components/Container";
import { GenericLocalMini } from "@/components/mockups";
import { InteractiveWindow } from "@/components/InteractiveWindow";
import { LogoLockup, LogoTagline } from "@/components/Logo";
import { ArrowRight, Check } from "@/components/icons";
import Reveal from "@/components/Reveal";

/**
 * Home hero — the site's highest-intensity moment (design.md: HOME ★5).
 * Cinematic backdrop, kinetic reveals, and an honest illustration of what a
 * Sajilo-built site does for a business.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-14 sm:pt-20">
      {/* Backdrop: dynamic multi-color aurora + dot grid (refs: amphora) */}
      <AuroraBackdrop variant="hero" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-dots opacity-70 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_32%,black,transparent)]" />
      </div>

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold tracking-wide text-fg-muted">
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
          <InteractiveWindow
            className="mx-auto max-w-[540px]"
            front={
              <>
                <BrowserFrame
                  title="A local business website built by Sajilo Web (illustration)"
                  url="yourbusiness.com.np"
                >
                  <GenericLocalMini />
                </BrowserFrame>

                {/* Floating notifications — real translateZ depth on the
                    front face, so they parallax as the window spins. */}
                <div className="absolute -right-3 -top-7 backface-hidden [transform:translateZ(56px)] sm:-right-6">
                  <div className="animate-float-a rounded-xl border border-line bg-ink-2/90 px-4 py-3 shadow-[0_16px_40px_-16px_rgba(31,39,64,0.16)] backdrop-blur">
                    <p className="text-[11px] font-semibold text-fg">Booking request</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-fg-faint">
                      <span className="size-1.5 rounded-full bg-mint" />
                      Today · via the website
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-7 -left-3 backface-hidden [transform:translateZ(48px)] sm:-left-8">
                  <div className="animate-float-b rounded-xl border border-line bg-ink-2/90 px-4 py-3 shadow-[0_16px_40px_-16px_rgba(31,39,64,0.16)] backdrop-blur">
                    <p className="text-[11px] font-semibold text-fg">New WhatsApp inquiry</p>
                    <p className="mt-0.5 text-[10px] text-fg-faint">
                      &ldquo;Do you deliver to Bhaktapur?&rdquo;
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-4 right-6 backface-hidden [transform:translateZ(52px)]">
                  <div className="animate-float-a rounded-full border border-line bg-ink-2/90 px-4 py-2 shadow-[0_16px_40px_-16px_rgba(31,39,64,0.16)] backdrop-blur [animation-delay:1.4s]">
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold text-fg-muted">
                      <Check className="size-3.5 text-mint" />
                      Hours &amp; location — updated
                    </p>
                  </div>
                </div>
              </>
            }
            back={
              <>
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgb(255 255 255 / 0.6) 1px, transparent 1.4px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 size-56 rounded-full border-[10px] border-brand/20"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-20 -left-14 size-64 rounded-full border-[10px] border-white/10"
                />
                <div className="relative flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                  <LogoLockup inverted className="scale-125" />
                  <LogoTagline className="text-brand" />
                  <p className="max-w-[28ch] text-sm leading-relaxed text-white/60">
                    Websites built properly — from every angle.
                  </p>
                </div>
              </>
            }
          />

          <p className="mt-10 text-center text-[11px] font-medium text-fg-faint">
            Grab the window — give it a spin. There&apos;s a back.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
