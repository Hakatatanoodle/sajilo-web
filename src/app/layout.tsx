import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { site } from "@/content/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sajilo Web — Websites for growing local businesses in Nepal",
    template: "%s — Sajilo Web",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Sajilo Web — Your business. Online, properly.",
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajilo Web — Your business. Online, properly.",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a10",
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
      </head>
      <body className="min-h-dvh bg-ink font-body text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-strong focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main" className="pt-16">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
