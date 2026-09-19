/**
 * Inline JSON-LD structured data (schema.org) — the standard way to give
 * search engines machine-readable facts about the site and its pages.
 *
 * Server component: renders a <script type="application/ld+json"> tag.
 * `<` is escaped so no string content can ever close the tag early
 * (standard hardening for inline JSON).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}