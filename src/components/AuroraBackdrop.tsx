import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

/**
 * Backdrop washes — soft brand-color fields on the light canvas (white /
 * yellow / navy identity). Blobs are blurred and drift very slowly so the
 * composition keeps shifting without demanding attention (motion is killed
 * by prefers-reduced-motion in globals.css). A whisper of grain sits on top.
 *
 * Decorative only: aria-hidden, pointer-events none, -z-10 so page content
 * always paints above it (pair with `relative isolate` on the section).
 *
 * Intensity mapping (design.md taper):
 *  - hero       → fullest wash (★5)
 *  - page       → inner-page header wash
 *  - edge-left / edge-right → faint corner washes for mid-page sections
 */
type Variant = "hero" | "page" | "edge-left" | "edge-right";

type BlobSpec = {
  className: string;
  style: CSSProperties;
};

const PRESETS: Record<Variant, BlobSpec[]> = {
  hero: [
    {
      className: "aurora-drift-a",
      style: {
        top: "-20%",
        right: "-12%",
        width: "52rem",
        height: "52rem",
        background: "rgba(255, 198, 41, 0.32)",
      },
    },
    {
      className: "aurora-drift-b",
      style: {
        top: "-22%",
        left: "-10%",
        width: "40rem",
        height: "40rem",
        background: "rgba(31, 39, 64, 0.07)",
      },
    },
    {
      className: "aurora-drift-b",
      style: {
        top: "26%",
        left: "-16%",
        width: "38rem",
        height: "38rem",
        background: "rgba(255, 184, 0, 0.15)",
      },
    },
    {
      className: "aurora-drift-a",
      style: {
        bottom: "-30%",
        left: "10%",
        width: "44rem",
        height: "44rem",
        background: "rgba(255, 216, 77, 0.32)",
      },
    },
    {
      className: "aurora-drift-b",
      style: {
        bottom: "-28%",
        right: "-8%",
        width: "36rem",
        height: "36rem",
        background: "rgba(240, 180, 41, 0.14)",
      },
    },
  ],
  page: [
    {
      className: "aurora-drift-a",
      style: {
        top: "-34%",
        left: "50%",
        width: "44rem",
        height: "44rem",
        marginLeft: "-22rem",
        background: "rgba(255, 198, 41, 0.22)",
      },
    },
    {
      className: "aurora-drift-b",
      style: {
        bottom: "-42%",
        left: "-12%",
        width: "38rem",
        height: "38rem",
        background: "rgba(255, 184, 0, 0.12)",
      },
    },
    {
      className: "aurora-drift-b",
      style: {
        bottom: "-40%",
        right: "-10%",
        width: "36rem",
        height: "36rem",
        background: "rgba(31, 39, 64, 0.05)",
      },
    },
  ],
  "edge-left": [
    {
      className: "aurora-drift-a",
      style: {
        top: "14%",
        left: "-20%",
        width: "40rem",
        height: "40rem",
        background: "rgba(255, 198, 41, 0.16)",
      },
    },
    {
      className: "aurora-drift-b",
      style: {
        top: "-26%",
        left: "-8%",
        width: "34rem",
        height: "34rem",
        background: "rgba(31, 39, 64, 0.05)",
      },
    },
  ],
  "edge-right": [
    {
      className: "aurora-drift-b",
      style: {
        top: "20%",
        right: "-20%",
        width: "40rem",
        height: "40rem",
        background: "rgba(255, 184, 0, 0.13)",
      },
    },
    {
      className: "aurora-drift-a",
      style: {
        bottom: "-28%",
        right: "-8%",
        width: "34rem",
        height: "34rem",
        background: "rgba(255, 198, 41, 0.15)",
      },
    },
  ],
};

export function AuroraBackdrop({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {PRESETS[variant].map((blob, index) => (
        <div
          key={index}
          className={cn("aurora-blob", blob.className)}
          style={{
            ...blob.style,
            animationDelay: `${index * -8}s`,
          }}
        />
      ))}
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
