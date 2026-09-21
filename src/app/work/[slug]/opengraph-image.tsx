import { createOgImage, ogContentType, ogSize } from "@/components/OgImage";
import { getProject } from "@/content/work";

export const size = ogSize;
export const contentType = ogContentType;

/** Alt text follows the project, so screen readers and crawlers get context. */
export async function alt({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? `${project.title} — Sajilo Web case study`
    : "Sajilo Web case study";
}

/**
 * Per-project social card (route-level OG convention). Same visual system
 * as the root card, but the headline belongs to this build: the project
 * title plain, the demo's actual heroLine under the yellow marker swipe.
 * Generated at build time for every case study.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return createOgImage(
    project
      ? {
          eyebrow: `${project.industry} · ${project.tag} · ${project.year}`.toUpperCase(),
          headline: project.title,
          accent: project.heroLine,
          sub: project.summary,
          footer: project.title,
        }
      : { headline: "Work we can show you.", swipeHeadline: true }
  );
}