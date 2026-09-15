import Link from "next/link";
import { services } from "@/content/services";
import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { Container } from "@/components/Container";
import { IconChip } from "@/components/IconChip";
import { ArrowUpRight, serviceIconMap } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * Home services grid — five service areas from portfolio_v0.1.md §6,
 * each linking to its detailed block on the services page.
 */
export function ServicesGrid() {
  return (
    <section className="relative isolate overflow-hidden py-20">
      <AuroraBackdrop variant="edge-left" />
      <Container>
        <SectionHeading
          eyebrow="What we build"
          title={<>Everything a growing business needs online.</>}
          lead="Five focused services. We recommend the smallest one that solves your actual problem — not the biggest one we could sell."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <Reveal key={service.slug} delay={index * 80} className="h-full">
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2"
                >
                  <IconChip>
                    <Icon className="size-5" />
                  </IconChip>
                  <h3 className="mt-5 font-display text-lg font-bold text-fg">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {service.short}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent">
                    Details
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}

          <Reveal delay={400} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-line-strong p-6">
              <p className="text-sm leading-relaxed text-fg-faint">
                Not sure what you need? That&apos;s normal.{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-accent hover:underline"
                >
                  Tell us how your business works
                </Link>{" "}
                — we&apos;ll recommend the smallest useful thing.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
