import Link from "next/link";
import { nav, site, whatsappHref } from "@/content/site";
import { Container } from "@/components/Container";
import { FooterWordmark } from "@/components/FooterWordmark";
import { LogoLockup, LogoTagline } from "@/components/Logo";
import { Mail, MapPin, WhatsApp } from "@/components/icons";

/**
 * Site footer — the navy chapter that closes every page.
 *
 * The big promise sits above it in <LaunchCta>; the footer stays practical:
 * who we are, where to go, and how to reach a person. Then it signs off with
 * the monument wordmark.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-navy-deep text-white">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.4fr_0.8fr_1fr] md:py-16">
        <div>
          <Link
            href="/"
            aria-label="Sajilo Web — home"
            className="inline-block rounded-md"
          >
            <LogoLockup inverted />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            {site.tagline}
          </p>
          <LogoTagline className="mt-6 text-brand" />
          <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40">
            Kathmandu · Lalitpur · Bhaktapur
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/45">
            Site
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <Link
                href="/"
                className="text-white/72 transition-colors hover:text-brand"
              >
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/72 transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacy"
                className="text-white/72 transition-colors hover:text-brand"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/45">
            Contact
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2.5 text-white/72 transition-colors hover:text-brand"
              >
                <Mail className="size-4 text-brand" />
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(
                  "Hi Sajilo Web — I'd like to talk about a website for my business."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white/72 transition-colors hover:text-brand"
              >
                <WhatsApp className="size-4 text-brand" />
                WhatsApp us
              </a>
            </li>
            <li>
              <span className="inline-flex items-start gap-2.5 text-white/72">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                {site.contact.location}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-2 py-5 text-[0.68rem] text-white/45 sm:flex-row sm:items-center">
          <p>© {year} Sajilo Web. Built for local businesses.</p>
          <p>
            Concept demo photography from Unsplash · Made in Nepal
          </p>
        </Container>
      </div>

      <FooterWordmark />
    </footer>
  );
}
