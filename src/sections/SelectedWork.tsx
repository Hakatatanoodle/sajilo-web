import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { ArrowRight, ArrowUpRight, Lock } from "@/components/icons";
import { getProject } from "@/content/work";

const featureSlugs = ["sajilo-hub-store", "ironforge-fitness"] as const;

/**
 * Selected work — a case plate you can open, then a short index.
 *
 * The featured build is shown with its real interface at working scale, the
 * way a studio pins a print to the wall. Concept work is always labelled;
 * the client system is a separate, quiet dark plate because it is private
 * by design and has no public screen to show.
 */
export function SelectedWork() {
  const feature = getProject("sajilo-sweets-house");
  const ganapati = getProject("ganapati-eye-care");
  if (!feature) return null;

  return (
    <section className="section-pad border-t border-line" id="work" aria-labelledby="work-title">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chapter">02 — Selected work</p>
            <h2 id="work-title" className="display-lg mt-5 max-w-[16ch]">
              Work you can open and click.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-fg-muted md:text-right">
            Three concept builds you can use right now, and one private system
            running in a real clinic. Every label is honest.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-fg-muted">
                  {feature.tag}
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-fg-faint">
                  {feature.industry} · {feature.year}
                </span>
              </div>

              <h3 className="display-md mt-5 max-w-[16ch]">{feature.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
                {feature.summary}
              </p>

              <ul className="mt-7 space-y-3 border-t border-line pt-5">
                {[
                  "Order by piece or by weight — 250g / 500g / 1kg",
                  "Festive Dashain and Tihar gift boxes",
                  "Cash on delivery or pay at the store",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-snug text-fg">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {feature.demoUrl ? (
                <a
                  href={feature.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-deep"
                >
                  Open the demo
                  <ArrowUpRight className="size-4" />
                </a>
              ) : null}
              <Link
                href={`/work/${feature.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-navy/40 hover:bg-paper-light"
              >
                Read the case study
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <figure className="work-plate">
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-fg-faint">
                  sajilosweets.demo / menu
                </span>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-accent">
                  Concept · Demo
                </span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11]">
                <Image
                  src="/showcase/sweets-work.webp"
                  alt="Sajilo Sweets House demo — menu, weight-based ordering and festive gift boxes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="work-plate__image"
                />
                <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap gap-2">
                  <span className="annotation">Weight ordering</span>
                  <span className="annotation">Festive boxes</span>
                  <span className="annotation">Cash on delivery</span>
                </div>
              </div>
            </figure>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureSlugs.map((slug) => {
            const project = getProject(slug);
            if (!project) return null;
            return (
              <Link key={slug} href={`/work/${slug}`} className="work-index-card group">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                  <Image
                    src={
                      slug === "sajilo-hub-store"
                        ? "/showcase/hub-hero.webp"
                        : "/showcase/ironforge-hero.webp"
                    }
                    alt={`${project.title} concept demo`}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="work-index-card__image object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-fg-faint">
                    {project.tag}
                  </p>
                  <p className="mt-2 font-display text-lg font-medium leading-tight tracking-tight">
                    {project.title}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-accent">
                    Case study
                    <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}

          {ganapati ? (
            <Link
              href={`/work/${ganapati.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-[#0e3a31] p-5 text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-brand">
                <Lock className="size-3" />
                Client · Live
              </span>
              <p className="mt-6 font-display text-2xl font-medium leading-tight tracking-tight">
                {ganapati.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Private by design: patient records and SMS broadcasts, live in
                a real clinic.
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-8 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-brand">
                Read the case file
                <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ) : null}

          <Link
            href="/contact"
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-navy/15 bg-brand/25 p-5 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand/35"
          >
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-accent">
                The next plate
              </p>
              <p className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight text-fg">
                Your business, built properly.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Tell us how it runs. We&apos;ll show you what the digital side
                could look like.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 pt-8 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-navy">
              Start a conversation
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fg-faint">
            Concept builds are runnable demos, not live businesses
          </p>
          <ButtonLink href="/work" variant="ghost" size="sm">
            All work
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
