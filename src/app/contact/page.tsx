import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { FaqSection } from "@/components/FaqSection";
import { InquiryComposer } from "@/components/InquiryComposer";
import { PageHeader } from "@/components/PageHeader";
import { Mail, MapPin, WhatsApp } from "@/components/icons";
import { site, whatsappHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Sajilo Web about your business website, booking system, or online store. We reply personally — no bots, no ticket queues.",
  alternates: { canonical: "/contact" },
};

const NEXT_STEPS = [
  "We reply and set up a short conversation — call, chat, or WhatsApp, whatever suits you.",
  "You tell us how the business works; we ask questions until we actually understand it.",
  "You get a clear scope and plan. No pressure, no obligations, no jargon.",
] as const;

/**
 * Contact — the conversation. Real channels on a hairline rail, an honest
 * inquiry composer that opens a prefilled email draft, then the FAQ bento.
 * No backend, no fake submission success.
 */
export default function ContactPage() {
  return (
    <>
      <Container className="section-pad grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <PageHeader
            eyebrow="The conversation"
            title="Let's talk about your business."
            lead="Tell us where your business is — and where the digital side should catch up. We reply personally."
          />

          <ul className="mt-10 border-b border-line">
            <li className="border-t border-line">
              <a
                href={`mailto:${site.contact.email}`}
                className="group flex items-baseline gap-4 py-4"
              >
                <Mail className="size-4 shrink-0 self-center text-accent" />
                <span className="w-24 shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-faint">
                  Email
                </span>
                <span className="text-sm font-semibold text-fg transition-colors group-hover:text-accent">
                  {site.contact.email}
                </span>
              </a>
            </li>
            <li className="border-t border-line">
              <a
                href={whatsappHref(
                  "Hi Sajilo Web — I run a business in Nepal and I'd like to talk about getting online."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-4 py-4"
              >
                <WhatsApp className="size-4 shrink-0 self-center text-accent" />
                <span className="w-24 shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-faint">
                  WhatsApp
                </span>
                <span className="text-sm font-semibold text-fg transition-colors group-hover:text-accent">
                  {site.contact.phoneDisplay}
                </span>
              </a>
            </li>
            <li className="flex items-baseline gap-4 border-t border-line py-4">
              <MapPin className="size-4 shrink-0 self-center text-accent" />
              <span className="w-24 shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-faint">
                Where
              </span>
              <span className="text-sm font-semibold text-fg">
                {site.contact.location}
              </span>
            </li>
          </ul>

          <div className="mt-10">
            <p className="chapter">What happens next</p>
            <ol className="mt-5 border-b border-line">
              {NEXT_STEPS.map((step, index) => (
                <li key={step} className="flex gap-4 border-t border-line py-4">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-[0.6rem] text-brand">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-fg-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <InquiryComposer />
      </Container>

      <FaqSection />
    </>
  );
}
