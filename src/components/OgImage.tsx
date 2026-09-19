import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/** Standard Open Graph dimensions — matches the layout's metadata declaration. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export type OgCardProps = {
  /** Small uppercase label above the headline. */
  eyebrow?: string;
  /** Main headline line — plain navy type. */
  headline: string;
  /** Renders the headline with the yellow marker swipe (single-line cards). */
  swipeHeadline?: boolean;
  /** Optional second headline line — carries the marker swipe itself. */
  accent?: string;
  /** One-line supporting text; auto-truncated so it never overflows. */
  sub?: string;
  /** Right-aligned footer line (defaults to the site's short description). */
  footer?: string;
};

const clamp = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

/**
 * The Sajilo Web social-card visual system, extracted from the root
 * opengraph-image.tsx so every per-route card stays on-brand by
 * construction: white canvas, navy type, the yellow "Web" pill, the yellow
 * marker swipe, and the BUILD • LAUNCH • GROW footer.
 */
export function createOgImage({
  eyebrow,
  headline,
  swipeHeadline = false,
  accent,
  sub,
  footer,
}: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          color: "#1c2333",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#1f2740",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 34, fontWeight: 800, color: "#ffc629" }}>
              S
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <div style={{ fontSize: 38, fontWeight: 800 }}>Sajilo</div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                background: "#ffc629",
                color: "#1f2740",
                borderRadius: 12,
                padding: "2px 18px",
              }}
            >
              Web
            </div>
          </div>
        </div>

        {/* Headline block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow ? (
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 4,
                color: "#b45309",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              ...(swipeHeadline
                ? {
                    background:
                      "linear-gradient(to top, #ffc629 36%, transparent 36%)",
                    padding: "0 12px",
                    marginLeft: -12,
                    alignSelf: "flex-start",
                  }
                : {}),
            }}
          >
            {headline}
          </div>
          {accent ? (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: -2,
                  background:
                    "linear-gradient(to top, #ffc629 36%, transparent 36%)",
                  padding: "0 12px",
                  marginLeft: -12,
                }}
              >
                {accent}
              </div>
            </div>
          ) : null}
          {sub ? (
            <div style={{ fontSize: 30, color: "#4a5268" }}>
              {clamp(sub, 110)}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 6,
              color: "#b45309",
            }}
          >
            BUILD • LAUNCH • GROW
          </div>
          <div style={{ fontSize: 22, color: "#8a90a6" }}>
            {footer ?? site.shortDescription}
          </div>
        </div>
      </div>
    ),
    ogSize
  );
}