import Link from "next/link";
import { Container } from "@/components/Container";
import { ArrowUpRight } from "@/components/icons";
import { industries } from "@/content/site";

/** What each kind of business usually needs first — honest, not salesy. */
const needs: Record<string, string> = {
  Restaurants: "Menu · Booking · Directions",
  Cafés: "Menu · Hours · Orders",
  "Clothing businesses": "Catalog · Cart · Delivery",
  Gyms: "Programs · Pricing · Intro visit",
  Clinics: "Services · Appointments · Records",
  Salons: "Services · Booking · Prices",
  "Hotels & homestays": "Rooms · Booking · Enquiries",
  "Travel businesses": "Packages · Enquiry · Payments",
  "Local services": "Services · Area · Quotes",
  "Education consultancies": "Programs · Counselling · Enquiries",
  "Photography studios": "Portfolio · Packages · Enquiries",
};

/**
 * "Who it's for" — a typographic index of the businesses Sajilo actually
 * serves. No logo wall, no invented logos: the names and the things each
 * one needs are the qualification.
 */
export function IndustryIndex() {
  return (
    <section className="section-pad border-t border-line" id="who" aria-labelledby="who-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="chapter">01 — Who it&apos;s for</p>
            <h2 id="who-title" className="display-lg mt-5 max-w-[14ch]">
              Built for the businesses on your street.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-fg-muted">
              The shop, the clinic, the gym, the studio. Local businesses with
              real customers and a digital side that hasn&apos;t caught up yet.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              Recognise yours? Start with a sentence
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <ul className="industry-list">
              {industries.map((industry, index) => (
                <li key={industry} className="industry-row">
                  <span className="industry-row__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="industry-row__name">{industry}</span>
                  <span className="ml-auto hidden text-right font-mono text-[0.6rem] uppercase tracking-[0.1em] text-fg-faint sm:block">
                    {needs[industry]}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fg-faint">
              Eleven starting points · Kathmandu · Lalitpur · Bhaktapur
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
