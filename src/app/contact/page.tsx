import type { Metadata } from "next";
import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { Container } from "@/components/Container";
import { InquiryComposer } from "@/components/InquiryComposer";
import { Clock, Mail, MapPin, WhatsApp } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { site, whatsappHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Sajilo Web about your business website, booking system, or online store. We reply personally — no bots, no ticket queues.",
};

const NEXT_STEPS = [
  "We reply and set up a short conversation — call, chat, or WhatsApp, whatever suits you.",
  "You tell us how the business works; we ask questions until we actually understand it.",
  "You get a clear scope and plan. No pressure, no obligations, no jargon.",
] as const;

/**
 * Contact page (design.md §68: CONTACT ★2 — the calmest page).
 * Real channels + an honest inquiry composer that opens a prefilled
 * email draft. No backend, no fake submission success.
 */
export default function ContactPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <AuroraBackdrop variant="edge-right" />
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-accent">
            Contact
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
            Let&apos;s talk about your business.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">
            Tell us where your business is — and where the digital side should
            catch up. We reply personally.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <ul className="mt-9 space-y-4">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-fg-faint">
                    Email
                  </span>
                  <span className="block text-sm font-semibold text-fg">
                    {site.contact.email}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(
                  "Hi Sajilo Web — I run a business in Nepal and I'd like to talk about getting online."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                  <WhatsApp className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-fg-faint">
                    WhatsApp
                  </span>
                  <span className="block text-sm font-semibold text-fg">
                    {site.contact.phoneDisplay}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <MapPin className="size-5" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-fg-faint">
                  Where we are
                </span>
                <span className="block text-sm font-semibold text-fg">
                  {site.contact.location}
                </span>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-8 rounded-2xl border border-dashed border-line-strong p-6">
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-fg">
              <Clock className="size-4 text-accent" />
              What happens next
            </h2>
            <ol className="mt-4 space-y-3">
              {NEXT_STEPS.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[10px] font-bold text-accent">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>

      <Reveal delay={140}>
        <InquiryComposer />
      </Reveal>
      </Container>
    </div>
  );
}
