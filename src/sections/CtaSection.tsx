import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { ArrowRight } from "@/components/icons";
import Reveal from "@/components/Reveal";

/**
 * Final call to action — the calmest section on the page (design.md:
 * intensity tapers from hero to contact).
 */
export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-strong/15 blur-[130px]" />
      </div>

      <Container className="relative text-center">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-accent">
            Ready when you are
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">
            Let&apos;s build your business&apos;s digital side.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
            Tell us how your business works. We&apos;ll handle the technical
            side — and keep the process Sajilo.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Get in touch
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost" size="lg">
              Look at the work first
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
