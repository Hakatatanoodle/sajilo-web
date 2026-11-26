"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/Container";
import { ArrowRight } from "@/components/icons";
import { services } from "@/content/services";

/**
 * Services — one active line at a time.
 *
 * A vertical index of the five offers on the right, a working detail sheet on
 * the left. The active row is the only yellow thing on the navy field, which
 * is the whole point: five services, one clear next step. Click or tap a row;
 * nothing moves on its own.
 */
export function ServicesIndex() {
  const [active, setActive] = useState(0);
  const service = services[active];
  const labels = [
    "Presence",
    "Campaigns",
    "Systems",
    "Custom builds",
    "After launch",
  ];

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="on-dark section-pad bg-navy text-white"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chapter">03 — Services</p>
            <h2 id="services-title" className="display-lg mt-5 max-w-[17ch]">
              Five ways to make the digital side Sajilo.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/60 md:text-right">
            Start where the business actually hurts. We&apos;ll tell you
            honestly if a smaller job is the right one.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="lg:sticky lg:top-28">
              <div key={service.slug} className="stage-enter">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-brand">
                  {String(active + 1).padStart(2, "0")} — 05 · {labels[active]}
                </p>
                <p className="display-md mt-4 max-w-[15ch] text-white">
                  {service.title}
                </p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
                  {service.short}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-white/15 pt-5">
                  {service.includes.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-snug text-white/75"
                    >
                      <span
                        className="mt-1.5 size-1 shrink-0 rounded-full bg-brand"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand"
                >
                  More on {service.title.toLowerCase()}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="service-rail">
              {services.map((item, index) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    className="service-rail__link w-full text-left"
                    data-active={index === active}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                  >
                    <span className="service-rail__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      {item.title}
                      <span className="mt-1 block max-w-md text-[0.8rem] font-normal leading-snug tracking-normal text-white/70 lg:hidden">
                        {item.short}
                      </span>
                    </span>
                    <ArrowRight
                      className="size-5 shrink-0 self-center opacity-0 transition-opacity duration-200"
                      aria-hidden
                    />
                  </button>
                  <div className="pb-4 lg:hidden">
                    <Link
                      href={`/services/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand"
                    >
                      More on this service
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/60">
              Not sure which one? That&apos;s what the first conversation is for.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
