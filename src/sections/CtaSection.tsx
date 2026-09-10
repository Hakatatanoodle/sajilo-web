import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { ArrowRight } from "@/components/icons";
import Reveal from "@/components/Reveal";

/**
 * Final call to action — the yellow brand band (the logo's "Web" pill,
 * scaled up): navy on yellow, dotted texture, playful ring shapes.
 * The calmest section turned into the boldest brand moment.
 */
export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-brand">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute -right-24 -top-28 size-80 rounded-full border-[12px] border-navy/10" />
        <div className="absolute -bottom-32 -left-20 size-96 rounded-full border-[12px] border-white/50" />
      </div>

      <Container className="relative py-20 text-center sm:py-24">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-navy/70">
            Ready when you are
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Let&apos;s build your business&apos;s digital side.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-navy/75">
            Tell us how your business works. We&apos;ll handle the technical
            side — and keep the process Sajilo.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/contact" variant="dark" size="lg">
              Get in touch
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/work" variant="onDark" size="lg">
              Look at the work first
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
