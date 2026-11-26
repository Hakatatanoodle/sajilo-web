import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { ArrowRight, Mail, MapPin, WhatsApp } from "@/components/icons";
import { site, whatsappHref } from "@/content/site";

/**
 * The close — the brand yellow, used once, at full strength.
 *
 * This is the highlighter mark scaled up to a whole screen: the page has been
 * paper and navy; now the one accent takes over and asks for the conversation.
 */
export function LaunchCta() {
  return (
    <section className="launch-cta" aria-labelledby="launch-title">
      <Container className="relative py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-navy/65">
              06 — Ready when you are
            </p>
            <h2 id="launch-title" className="launch-cta__title mt-5 max-w-[15ch]">
              Let&apos;s make the digital side Sajilo.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/contact" variant="dark" size="lg">
                Start a conversation
                <ArrowRight className="size-4" />
              </ButtonLink>
              <a
                href={whatsappHref(
                  "Hi Sajilo Web — I'd like to talk about a website for my business."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-navy/30 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-navy/60 hover:bg-navy/10"
              >
                <WhatsApp className="size-4" />
                WhatsApp us
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="space-y-3 border-t border-navy/25 pt-5 text-sm lg:border-t-0 lg:pt-0">
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 font-medium text-navy transition-opacity hover:opacity-70"
              >
                <Mail className="size-4" />
                {site.contact.email}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-medium text-navy transition-opacity hover:opacity-70"
              >
                <WhatsApp className="size-4" />
                {site.contact.phoneDisplay}
              </a>
              <p className="flex items-start gap-3 text-navy/70">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {site.contact.location}
              </p>
              <p className="pt-3 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-navy/70">
                A first conversation costs nothing
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-4 border-t border-navy/20 pt-5">
          <p className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
            Understand the business.
            <br className="sm:hidden" /> Make the digital side Sajilo.
          </p>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy/75 transition-colors hover:text-navy"
          >
            Or look at the work first
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
