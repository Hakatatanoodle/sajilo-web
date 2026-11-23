import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ArrowUpRight } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { LaunchCta } from "@/sections/LaunchCta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business websites, landing pages, booking systems, custom digital tools, and ongoing support — sized to the problem, honestly scoped.",
  alternates: { canonical: "/services" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
  ],
};

/**
 * Services index — the contents page. Five offers as a typographic index;
 * each row opens its own offer sheet. Recommended by fit, not invoice size.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <Container className="section-pad">
        <PageHeader
          eyebrow="The contents page"
          title="What we build."
          lead="Five focused services — recommended by fit, not by invoice size. Every engagement starts with understanding how your business works."
        />

        <ul className="mt-12 border-b border-line">
          {services.map((service, index) => (
            <li key={service.slug} className="border-t border-line">
              <Link
                href={`/services/${service.slug}`}
                className="group grid gap-4 py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <span className="font-mono text-[0.62rem] tracking-[0.12em] text-fg-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="industry-row__name block font-display text-2xl font-medium tracking-tight text-fg sm:text-3xl">
                    {service.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-fg-muted">
                    {service.short}
                  </span>
                  <span className="mt-3 block max-w-xl text-sm leading-relaxed text-fg-faint">
                    <span className="font-semibold text-accent">Good fit:</span>{" "}
                    {service.goodFit}
                  </span>
                </span>
                <ArrowUpRight className="hidden size-6 text-fg-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy sm:block" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-fg-muted">
          Not sure which one fits? That&apos;s exactly what the first
          conversation is for — we&apos;ll tell you honestly if a smaller job
          is the right one.
        </p>
      </Container>
      <LaunchCta />
    </>
  );
}
