"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Check } from "@/components/icons";

const STEPS = [
  {
    num: "01",
    title: "Understand",
    label: "A conversation, not a form",
    text: "We learn how the business actually runs — customers, flow, bottlenecks — before touching any design.",
  },
  {
    num: "02",
    title: "Plan",
    label: "The smallest honest scope",
    text: "You get a clear proposal: what we build, what we leave out, and why. No padded features.",
  },
  {
    num: "03",
    title: "Build",
    label: "Working screens, early",
    text: "Design and development happen in the open. You see real progress and shape decisions as they happen.",
  },
  {
    num: "04",
    title: "Review",
    label: "Tested on real phones",
    text: "We check real devices, real connections and real workflows. You approve — nothing ships silently.",
  },
  {
    num: "05",
    title: "Launch",
    label: "Live, and explained",
    text: "Domain, hosting, business info and search basics — handled, explained and documented for you.",
  },
  {
    num: "06",
    title: "Support",
    label: "A person, after launch",
    text: "We stay reachable: content changes, fixes and improvements as the business grows.",
  },
] as const;

/**
 * Process — the second (and last) scroll scene on the home page.
 *
 * The step list reads like a project file; the stage on the right shows what
 * that step actually produces, ending on the live site. Nothing is pinned or
 * hijacked: the stage sticks while the steps scroll past it, and reduced
 * motion simply keeps the first step visible.
 */
export function ProcessStage() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.stepIndex ?? 0
            );
            setActive(index);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const step = STEPS[active];

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="section-pad border-t border-line"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chapter">04 — How we work</p>
            <h2 id="process-title" className="display-lg mt-5 max-w-[18ch]">
              You see it being built. That&apos;s the point.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted md:text-right">
            Six steps, no mystery. You always know where the project is and
            what happens next.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <ol className="lg:col-span-5">
            {STEPS.map((item, index) => (
              <li
                key={item.num}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                data-step-index={index}
                data-active={index === active}
                data-past={index < active}
                className="process-step"
              >
                <div className="flex items-start gap-4">
                  <span className="process-step__num">
                    {index < active ? <Check className="size-3.5" /> : item.num}
                  </span>
                  <div>
                    <h3 className="process-step__title">{item.title}</h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-fg-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="lg:sticky lg:top-28">
              <div
                className="process-stage"
                data-live={active === 4 ? "true" : undefined}
              >
                <div className="process-stage__top">
                  <span>
                    {step.num} / {step.title} — {step.label}
                  </span>
                  <span className="hidden sm:inline">
                    {active === 4 ? "Live" : "In progress"}
                  </span>
                </div>
                <div className="process-stage__body">
                  <div key={step.num} className="stage-enter h-full">
                    <Stage index={active} />
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-faint">
                <span>
                  {String(active + 1).padStart(2, "0")} — 06
                </span>
                <span className="hidden sm:inline">
                  {active === 4
                    ? "Handover, then the final step"
                    : "Scroll to follow the build"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The visual state of each step — paper artifacts, not dashboard stock. */
function Stage({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="process-note">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-accent">
            First conversation
          </p>
          <p className="mt-2 font-display text-lg font-medium leading-snug text-fg">
            &ldquo;On Saturdays the phone doesn&rsquo;t stop. The notebook is
            full.&rdquo;
          </p>
          <ul className="mt-4 space-y-1.5 text-xs text-fg-muted">
            <li>· Walk-in customers, mostly</li>
            <li>· Orders arrive on WhatsApp</li>
            <li>· Every price is quoted by hand</li>
          </ul>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.12em] text-fg-faint">
          <span>Scope — page one</span>
          <span>Not now: online payments</span>
        </div>
        <div className="process-wire">
          {["Hero", "Menu", "Order", "About", "Visit", "Contact"].map((cell) => (
            <div key={cell} className="process-wire__cell">
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.08em] text-fg-faint">
                {cell}
              </p>
              <div className="mt-2 h-1.5 rounded-full bg-navy/15" />
              <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-navy/10" />
            </div>
          ))}
        </div>
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-accent">
          One clear job per screen
        </p>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="flex h-full flex-col justify-center">
        <div className="overflow-hidden rounded-lg border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-3 py-2">
            <span className="font-logo text-[0.7rem] font-extrabold tracking-tight text-fg">
              SWEETS <span className="rounded bg-brand px-1 text-navy">House</span>
            </span>
            <span className="rounded-full bg-navy px-2 py-0.5 text-[0.5rem] font-semibold text-white">
              Order
            </span>
          </div>
          <div className="grid gap-2 p-3 sm:grid-cols-2">
            <div className="rounded-md bg-brand/25 p-3">
              <p className="font-display text-base font-medium leading-tight text-fg">
                Festive boxes, ready to gift.
              </p>
              <p className="mt-1 text-[0.6rem] text-fg-muted">Dashain · Tihar</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Motichoor", "Besan", "Namkeen", "Gift box"].map((item) => (
                <div key={item} className="rounded-md border border-line p-2">
                  <div className="h-6 rounded bg-paper-deep" />
                  <p className="mt-1.5 text-[0.55rem] font-semibold">{item}</p>
                  <p className="text-[0.5rem] text-fg-faint">Rs. 720 / kg</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-fg-faint">
          Design in the browser — you review real screens
        </p>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="rounded-lg border border-line bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="font-display text-sm font-medium">Sajilo Sweets House</p>
            <span className="rounded-full bg-brand px-2 py-0.5 text-[0.5rem] font-semibold text-navy">
              Ready for review
            </span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {["iPhone · Safari", "Android · Chrome", "Laptop · 1440"].map((device) => (
              <div key={device} className="rounded border border-line p-2">
                <div className="h-10 rounded bg-paper-deep" />
                <p className="mt-1.5 font-mono text-[0.5rem] text-fg-faint">{device}</p>
              </div>
            ))}
          </div>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {["Readable in sunlight", "Thumb-sized buttons", "Works on 3G", "Every price in Rs."].map(
            (item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-fg-muted">
                <Check className="size-3.5 text-accent" />
                {item}
              </li>
            )
          )}
        </ul>
      </div>
    );
  }

  if (index === 4) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/25 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-navy">
          <span className="size-1.5 rounded-full bg-emerald-700" aria-hidden />
          Live
        </span>
        <p className="mt-4 font-display text-3xl font-medium leading-none tracking-tight text-navy sm:text-4xl">
          sajilosweets.com.np
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-navy/70">
          Domain, hosting, business info and search basics — all handled. Then
          we walk you through it, once, slowly.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-navy/60">
          <span className="rounded-full border border-navy/25 px-2 py-0.5">HTTPS</span>
          <span className="rounded-full border border-navy/25 px-2 py-0.5">Google profile</span>
          <span className="rounded-full border border-navy/25 px-2 py-0.5">Handover notes</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="rounded-lg border border-line bg-white p-4">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-fg-faint">
          Since launch
        </p>
        <ul className="mt-3 divide-y divide-line">
          {[
            ["Dashain offers updated", "Client request · same week"],
            ["Menu prices refreshed", "14 items · no code needed"],
            ["New gallery added", "Two photos, one afternoon"],
          ].map(([title, meta]) => (
            <li key={title} className="flex items-baseline justify-between gap-4 py-2.5">
              <p className="text-xs font-semibold text-fg">{title}</p>
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.08em] text-fg-faint">
                {meta}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-accent">
        A real person answers — no ticket queue
      </p>
    </div>
  );
}
