import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { industries, areaServed, site } from "@/content/site";
import { services } from "@/content/services";
import "./globals.css";

/*
 * Brand typography — Manrope for display, DM Sans for body.
 * Deliberately the same pairing as Sajilo Web's existing demo builds.
 */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

/*
 * Site-wide structured data (schema.org JSON-LD) — tells Google AND the
 * AI answer engines (Google AI Overviews, ChatGPT, Perplexity, Gemini)
 * that "Sajilo Web" is an entity: a web studio serving the Kathmandu
 * valley, not just words on a page. Typed as `ProfessionalService` (a
 * LocalBusiness subtype of Organization) so engines categorise it as a
 * local web-development agency — the entity class AEO/GEO systems look
 * for when someone asks "web design agency in Kathmandu". Still
 * deliberately minimal: no `sameAs` (no confirmed live social profiles),
 * no `priceRange`, no `aggregateRating` (no real reviews yet) — anything
 * else would be an invented fact.
 */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description: site.shortDescription,
      email: site.contact.email,
      telephone: site.contact.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
      areaServed: [...areaServed],
      knowsAbout: [...services.map((service) => service.title), ...industries],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sajilo Web — Websites for growing local businesses in Nepal",
    template: "%s — Sajilo Web",
  },
  description: site.description,
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Sajilo Web — Your business. Online, properly.",
    description: site.description,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sajilo Web — Your business. Online, properly.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajilo Web — Your business. Online, properly.",
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  /*
   * Google Search Console ownership verification. The Metadata API emits
   * <meta name="google-site-verification" content="…"/> into every page's
   * head — Google reads it from the live homepage to confirm ownership.
   */
  verification: {
    google: "1A9qhWvG7ei6fQl6eWjcQSiJJPnlUJMlszf8lMS2zLQ",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable}`}
      /*
       * suppressHydrationWarning: the inline script below adds the `js`
       * class to <html> before React hydrates (it gates the scroll-reveal
       * animations so no-JS visitors always see all content). React would
       * otherwise flag that intentional attribute difference on hydration.
       * Same pattern as next-themes. Affects only this element's attributes,
       * not children.
       */
      suppressHydrationWarning
    >
      <head>
        {/*
          Adds .js to <html> before first paint. Reveal animations only
          activate when this class exists, so visitors without JavaScript
          see all content immediately (no hidden content).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <JsonLd data={siteJsonLd} />
      </head>
      <body className="min-h-dvh bg-ink font-body text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-navy"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main" className="pt-16">
          {children}
        </main>
        <SiteFooter />
        <StickyMobileCta />
      </body>
    </html>
  );
}
