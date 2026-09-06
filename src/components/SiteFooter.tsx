import Link from "next/link";
import { nav, site, whatsappHref } from "@/content/site";
import { Container } from "@/components/Container";
import { Mail, MapPin, WhatsApp } from "@/components/icons";

/**
 * Site footer: brand + honesty note, site links, real contact channels.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-ink-2/60">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_0.8fr_1fr]">
        <div>
          <Link
            href="/"
            className="font-display text-xl font-extrabold tracking-tight text-fg"
          >
            Sajilo
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              Web
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-fg-faint">
            All work shown on this site is our own concept/demo builds. Real
            client projects will always be labeled &ldquo;Client
            Project&rdquo; — never mixed in.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-fg-faint">
            Site
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-fg-muted transition-colors hover:text-fg">
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-fg-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-fg-faint">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
              >
                <Mail className="size-4 text-accent" />
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
                className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
              >
                <WhatsApp className="size-4 text-accent" />
                WhatsApp us
              </a>
            </li>
            <li>
              <span className="inline-flex items-center gap-2 text-fg-muted">
                <MapPin className="size-4 text-accent" />
                {site.contact.location}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/[0.06]">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-fg-faint sm:flex-row">
          <p>© {year} Sajilo Web. Built for local businesses.</p>
          <p>Made in Nepal</p>
        </Container>
      </div>
    </footer>
  );
}
