import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Sajilo Web — Understand the business. Make the digital side Sajilo.";

/**
 * Default social-share image for the whole site (app-level OG convention).
 * Light brand treatment: white canvas, navy type, the yellow "Web" pill and
 * the yellow marker swipe from the logo. Generated at build time.
 */
export default function OpengraphImage() {
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

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Your business.
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontSize: 78,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -2,
                background: "linear-gradient(to top, #ffc629 36%, transparent 36%)",
                padding: "0 12px",
                marginLeft: -12,
              }}
            >
              Online, properly.
            </div>
          </div>
          <div style={{ fontSize: 30, color: "#4a5268" }}>
            Understand the business. Make the digital side Sajilo.
          </div>
        </div>

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
            Websites &amp; digital tools for local businesses in Nepal
          </div>
        </div>
      </div>
    ),
    size
  );
}
