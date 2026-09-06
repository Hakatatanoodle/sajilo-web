import { founders } from "@/content/site";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { ArrowRight, Check, User } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * About strip — founder-led, intentionally small (portfolio_v0.1.md §28).
 * Founders render with roles only until real names are added to
 * src/content/site.ts. We never invent people.
 */
export function AboutStrip() {
  return (
    <section className="relative py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Who we are"
            title={
              <>
                Founders. Small team.
                <br />
                Serious work.
              </>
            }
            lead="Sajilo Web is early-stage, founder-led, and intentionally small. The people you talk to are the people who design and build your project — nothing gets handed down a chain."
          />
          <Reveal delay={120}>
            <ul className="mt-8 space-y-3.5 text-sm text-fg-muted">
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                You talk directly to the people building your site.
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                Small on purpose — focused attention, no account managers.
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                Serious process: scoped, reviewed, documented.
              </li>
            </ul>
          </Reveal>
          <Reveal delay={200}>
            <ButtonLink href="/about" variant="ghost" className="mt-8">
              More about us
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="grid gap-4 sm:grid-cols-2">
            {founders.map((founder) => (
              <div
                key={founder.role}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <User className="size-5" />
                </span>
                <p className="mt-4 font-display text-base font-bold text-fg">
                  {founder.name}
                </p>
                <p className="text-sm text-accent">{founder.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {founder.focus}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
