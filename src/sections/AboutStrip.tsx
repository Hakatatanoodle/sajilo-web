import { founders } from "@/content/site";
import { ButtonLink } from "@/components/Button";
import { CheckList } from "@/components/CheckList";
import { Container } from "@/components/Container";
import { FounderCard } from "@/components/FounderCard";
import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
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
            <CheckList
              spacing="relaxed"
              className="mt-8"
              items={[
                "You talk directly to the people building your site.",
                "Small on purpose — focused attention, no account managers.",
                "Serious process: scoped, reviewed, documented.",
              ]}
            />
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
              <FounderCard
                key={founder.role}
                name={founder.name}
                role={founder.role}
                focus={founder.focus}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
