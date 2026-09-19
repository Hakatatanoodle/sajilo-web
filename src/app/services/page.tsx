import type { Metadata } from "next";
import Link from "next/link";
import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { CheckList } from "@/components/CheckList";
import { Container } from "@/components/Container";
import { IconChip } from "@/components/IconChip";
import { ArrowUpRight, serviceIconMap } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/sections/CtaSection";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { work, type Project } from "@/content/work";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business websites, landing pages, booking systems, custom digital tools, and ongoing support — sized to the problem, honestly scoped.",
  alternates: { canonical: "/services" },
};

/* Breadcrumb structured data — Home > Services. */
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
  ],
};

/* Case-study ↔ service cross-links: the first project that demonstrates
   each service, keyed by service slug. Services with no matching build
   simply render without a "see it built" link. */
const showcaseByService = new Map<string, Project>();
for (const project of work) {
  if (!showcaseByService.has(project.relatedService)) {
    showcaseByService.set(project.relatedService, project);
  }
}

/**
 * Services detail page (design.md §68: SERVICES ★3).
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <div className="relative isolate overflow-hidden">
        <AuroraBackdrop variant="edge-right" />
        <Container className="py-16 sm:py-20">
          <PageHeader
            eyebrow="Services"
            title="What we build."
            lead="Five focused services — recommended by fit, not by invoice size. Every engagement starts with understanding how your business works."
          />

          <div className="mt-14 space-y-6">
            {services.map((service, index) => {
              const Icon = serviceIconMap[service.icon];
              const showcase = showcaseByService.get(service.slug);
              return (
                <Reveal key={service.slug} delay={index * 70}>
                  <section
                    id={service.slug}
                    className="scroll-mt-24 rounded-2xl border border-line bg-surface p-7 sm:p-9"
                  >
                    <div className="flex flex-wrap items-center gap-4">
                      <IconChip>
                        <Icon className="size-5" />
                      </IconChip>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-fg-faint">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h2 className="font-display text-2xl font-extrabold text-fg">
                          <Link
                            href={`/services/${service.slug}`}
                            className="transition-colors hover:text-accent"
                          >
                            {service.title}
                          </Link>
                        </h2>
                      </div>
                    </div>

                    <p className="mt-5 max-w-3xl leading-relaxed text-fg-muted">
                      {service.description}
                    </p>

                    <div className="mt-7 grid gap-6 md:grid-cols-[1.2fr_1fr]">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-fg-faint">
                          What&apos;s included
                        </h3>
                        <CheckList
                          items={service.includes}
                          spacing="compact"
                          className="mt-3"
                        />
                      </div>
                      <div className="rounded-xl border border-dashed border-line-strong p-5">
                        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-fg-faint">
                          A good fit if
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                          {service.goodFit}
                        </p>
                      </div>
                    </div>

                    {showcase ? (
                      <Link
                        href={`/work/${showcase.slug}`}
                        className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-fg"
                      >
                        See it built — {showcase.title}
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    ) : null}
                  </section>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </div>
      <CtaSection />
    </>
  );
}
