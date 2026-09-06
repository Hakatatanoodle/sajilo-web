import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";

/**
 * Designed 404 — clear state, obvious way back (design.md §70).
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-gradient font-display text-7xl font-extrabold tracking-tight sm:text-8xl">
        404
      </p>
      <h1 className="mt-6 font-display text-2xl font-extrabold text-fg sm:text-3xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-balance leading-relaxed text-fg-muted">
        The link may be old or mistyped. The site itself is fine — here&apos;s
        the way back.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          See our work
        </ButtonLink>
      </div>
    </Container>
  );
}
