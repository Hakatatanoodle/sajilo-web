import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Check, Globe, Layers, Shield, Spark, Target } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { CtaSection } from "@/sections/CtaSection";
import type { ServiceIcon } from "@/content/services";
import { services } from "@/content/services";

const iconMap: Record<ServiceIcon, typeof Globe> = {
  globe: Globe,
  target: Target,
  layers: Layers,
  spark: Spark,
  shield: Shield,
};

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
      <Container className="py-16 sm:py-20">
        <header className="max-w-2xl">
          <Reveal>
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Services
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
              What we build.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">
              Five focused services — recommended by fit, not by invoice size.
              Every engagement starts with understanding how your business
              works.
            </p>
          </Reveal>
        </header>

        <div className="mt-14 space-y-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal key={service.slug} delay={index * 70}>
                <section
                  id={service.slug}
                  className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <Icon className="size-5" />
                    </span>
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
                      <ul className="mt-3 space-y-2">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-fg-muted"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-dashed border-white/15 p-5">
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
      <CtaSection />
    </>
  );
}
