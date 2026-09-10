import Link from "next/link";
import { nav, site, whatsappHref } from "@/content/site";
import { Container } from "@/components/Container";
import { LogoLockup, LogoTagline } from "@/components/Logo";
import { Mail, MapPin, WhatsApp } from "@/components/icons";

/**
 * Site footer — the navy band of the brand: logo lockup (inverted), the
 * BUILD · LAUNCH · GROW tagline, honesty note, site links, and real
 * contact channels.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_0.8fr_1fr]">
        <div>
          <Link
            href="/"
            aria-label="Sajilo Web — home"
            className="inline-block rounded-md focus-visible:outline-brand"
          >
            <LogoLockup inverted />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/50">
            All work shown on this site is our own concept/demo builds. Real
            client projects will always be labeled &ldquo;Client
            Project&rdquo; — never mixed in.
          </p>
          <LogoTagline className="mt-5 text-brand" />
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
            Site
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                href="/"
                className="text-white/75 transition-colors hover:text-white focus-visible:outline-brand"
              >
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/75 transition-colors hover:text-white focus-visible:outline-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white focus-visible:outline-brand"
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
                className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white focus-visible:outline-brand"
              >
                <WhatsApp className="size-4 text-brand" />
                WhatsApp us
              </a>
            </li>
            <li>
              <span className="inline-flex items-center gap-2 text-white/75">
                <MapPin className="size-4 text-brand" />
                {site.contact.location}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {year} Sajilo Web. Built for local businesses.</p>
          <p>Made in Nepal</p>
        </Container>
      </div>
    </footer>
  );
}
