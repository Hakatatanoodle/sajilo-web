import Link from "next/link";
import { Container } from "@/components/Container";
import { ArrowRight } from "@/components/icons";
import { founders } from "@/content/site";

const principles = [
  {
    title: "Small on purpose",
    text: "Two founders, direct access, no account manager relaying messages.",
  },
  {
    title: "Plain language",
    text: "No jargon walls. If you can't explain it to a customer, we simplify it.",
  },
  {
    title: "The smallest build",
    text: "We solve the real problem first, then earn the right to add more.",
  },
  {
    title: "Built to keep",
    text: "Documented, handed over, and supported after launch — not abandoned.",
  },
];

/**
 * The studio note — the quiet page between the process and the close.
 *
 * No cards, no portraits we don't have: an editorial statement, four
 * working principles as a hairline list, and the two people who answer.
 */
export function StudioNote() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-title"
      className="section-pad border-t border-line bg-paper-light"
    >
      <Container>
        <p className="chapter">05 — The studio</p>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h2 id="studio-title" className="display-lg max-w-[12ch]">
              Sajilo means <span className="hero-mark">easy.</span>
            </h2>
            <div className="mt-7 max-w-lg space-y-4 text-base leading-relaxed text-fg-muted">
              <p>
                Easy is not the same as simple-minded. It means the business
                owner isn&apos;t left guessing: no unexplained invoices, no
                dashboard nobody logs into, no site that quietly stops
                working.
              </p>
              <p>
                We&apos;re a small studio in the Kathmandu valley. We take a
                few projects at a time, build them properly, and stay
                reachable afterwards. That&apos;s the whole model.
              </p>
            </div>
            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              More about how we work
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="lg:col-span-6">
            <ul className="border-b border-line">
              {principles.map((item, index) => (
                <li key={item.title} className="flex gap-5 border-t border-line py-5">
                  <span className="w-6 shrink-0 font-mono text-[0.58rem] tracking-[0.1em] text-fg-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-lg font-medium leading-tight tracking-tight text-fg">
                      {item.title}
                    </p>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-fg-muted">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-8">
              {founders.map((person) => (
                <div key={person.name} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex size-10 items-center justify-center rounded-full bg-navy font-mono text-[0.65rem] tracking-wide text-brand"
                  >
                    {person.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-fg">{person.name}</p>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-fg-faint">
                      {person.role.replace("Founder — ", "")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
