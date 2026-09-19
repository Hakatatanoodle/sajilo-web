import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { ArrowLeft } from "@/components/icons";
import { CheckList } from "@/components/CheckList";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/sections/CtaSection";
import { getService, services } from "@/content/services";
import { areaServed, site } from "@/content/site";

/** The five services, each a standalone route (static, prerendered). */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

/** Unknown slugs 404 — never render a service on the fly. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${slug}` },
  };
}

/**
 * Service detail page — a specific, shareable offer. Content comes entirely
 * from content/services.ts (description, includes, goodFit) — one source of
 * truth shared with the /services index, which keeps its #<slug> anchors.
 */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  /* The offer as a typed entity, linked to the site-wide Organization via
     its @id — plus the Home > Services > {service} breadcrumb trail. */
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${site.url}/services/${service.slug}`,
    serviceType: service.title,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [...areaServed],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${site.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${site.url}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbLd} />
      <div className="relative isolate overflow-hidden">
        <AuroraBackdrop variant="edge-right" />
        <Container className="py-16 sm:py-20">
          <Reveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4" />
              All services
            </Link>
          </Reveal>

          <PageHeader
            eyebrow="Services"
            title={`${service.title}.`}
            lead={service.description}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <section className="h-full rounded-2xl border border-line bg-surface p-7 sm:p-9">
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-fg-faint">
                  What&apos;s included
                </h2>
                <CheckList items={service.includes} className="mt-4" />
              </section>
            </Reveal>
            <Reveal delay={100}>
              <section className="h-full rounded-2xl border border-dashed border-line-strong p-7 sm:p-9">
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-fg-faint">
                  A good fit if
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {service.goodFit}
                </p>
              </section>
            </Reveal>
          </div>
        </Container>
      </div>
      <CtaSection />
    </>
  );
}