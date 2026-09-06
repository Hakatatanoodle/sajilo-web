import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Sajilo Web — Understand the business. Make the digital side Sajilo.";

/**
 * Default social-share image for the whole site (app-level OG convention).
 * Generated at build time — no binary asset to maintain.
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
          background:
            "linear-gradient(135deg, #0A0A10 0%, #171232 60%, #2A1B52 100%)",
          color: "#EDEFF7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6D5CFF, #C86BFF)",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700 }}>Sajilo Web</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -2,
              }}
            >
              Your business.
            </div>
            <div
              style={{
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -2,
              }}
            >
              Online, properly.
            </div>
          </div>
          <div style={{ fontSize: 28, color: "#A7ACBF" }}>
            Understand the business. Make the digital side Sajilo.
          </div>
        </div>

        <div style={{ fontSize: 22, color: "#70768C" }}>
          Websites &amp; digital tools for local businesses in Nepal
        </div>
      </div>
    ),
    size
  );
}
