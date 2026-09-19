import { createOgImage, ogContentType, ogSize } from "@/components/OgImage";
import { getService } from "@/content/services";

export const size = ogSize;
export const contentType = ogContentType;

/** Alt text follows the service, so crawlers get the specific offer. */
export async function alt({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return service
    ? `${service.title} — Sajilo Web service`
    : "Sajilo Web services";
}

/**
 * Per-service social card (route-level OG convention). Each of the five
 * /services/[slug] pages shares a card naming its own offer — so sharing
 * a specific service link shows the specific service.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  return createOgImage(
    service
      ? {
          eyebrow: "SAJILO WEB — SERVICES",
          headline: service.title,
          swipeHeadline: true,
          sub: service.short,
        }
      : { headline: "What we build.", swipeHeadline: true }
  );
}