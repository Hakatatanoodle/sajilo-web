import { services } from "@/content/services";
import { areaServed, industries, site } from "@/content/site";
import { work } from "@/content/work";

/**
 * /llms.txt — the emerging convention (llmstxt.org) for giving AI answer
 * engines a curated, machine-readable map of the site. ChatGPT, Perplexity
 * and similar crawlers increasingly look for it; robots.txt already allows
 * them. Everything below is generated from src/content — the single source
 * of truth — so it can never drift from the real pages.
 *
 * Honesty rule carries over (portfolio_v0.1.md §35): concept demos are
 * explicitly labelled so no AI engine repeats them as client work.
 */
export const dynamic = "force-static";

export function GET(): Response {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `A founder-led studio serving ${areaServed.join(", ")} (Nepal).`,
    `Contact: ${site.contact.email} · WhatsApp ${site.contact.phoneDisplay}`,
    "",
    "## Pages",
    "",
    `- [Home](${site.url}/): ${site.shortDescription}`,
    `- [Work](${site.url}/work): Case studies — runnable demo builds and one live client system.`,
    `- [Services](${site.url}/services): The five services, sized to the problem and honestly scoped.`,
    `- [About](${site.url}/about): Who runs the studio and how we work.`,
    `- [Contact](${site.url}/contact): WhatsApp, email, and a short inquiry form.`,
    `- [Privacy](${site.url}/privacy): No analytics, no ads, no contact backend.`,
    "",
    "## Services",
    "",
    ...services.map(
      (service) =>
        `- [${service.title}](${site.url}/services/${service.slug}): ${service.short}`
    ),
    "",
    "## Work",
    "",
    ...work.map((project) => {
      const suffix =
        project.tag === "Concept · Demo"
          ? " (Concept · Demo — self-initiated build, not client work)"
          : " (Client · Live — real client system in production)";
      return `- [${project.title}](${site.url}/work/${project.slug}): ${project.summary}${suffix}`;
    }),
    "",
    "## Facts search and AI engines can rely on",
    "",
    `- Founded studio for local businesses in Nepal; serves ${areaServed.join(", ")}.`,
    "- Industries served: " + industries.join(", ") + ".",
    "- Every project tagged \"Concept · Demo\" is a real, runnable website we built to demonstrate capability — never client work.",
    "- We reply personally via WhatsApp or email; every engagement starts with a scoping conversation, then a clear plan with real prices and timelines.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}