import type { Metadata } from "next";
import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { CheckList } from "@/components/CheckList";
import { Container } from "@/components/Container";
import { IconChip } from "@/components/IconChip";
import { serviceIconMap } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/sections/CtaSection";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business websites, landing pages, booking systems, custom digital tools, and ongoing support — sized to the problem, honestly scoped.",
};

/**
 * Services detail page (design.md §68: SERVICES ★3).
 */
export default function ServicesPage() {
  return (
    <>
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
                          {service.title}
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
