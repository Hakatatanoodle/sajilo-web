import { cn } from "@/lib/cn";

/**
 * Sajilo Web brand assets, recreated as vector from the supplied logo:
 * the S-ribbon in navy with the yellow swoosh and the yellow cursor
 * ("click" energy), plus the wordmark lockup — "Sajilo" + "Web" in the
 * yellow pill — and the BUILD · LAUNCH · GROW tagline.
 *
 * The mark is drawn with fixed brand colors (navy #1F2740, yellow #FFC629)
 * so it is identical everywhere; the lockup's text adapts via `inverted`
 * for dark surfaces (footer).
 */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      {/* yellow swoosh hugging the upper-left of the S */}
      <path
        d="M15 40 C 15 18 33 7 50 10"
        fill="none"
        stroke="#ffc629"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* the S ribbon */}
      <path
        d="M69 22 C 63 11 33 11 28 27 C 23 44 74 46 70 65 C 66 83 30 86 23 71"
        fill="none"
        stroke="#1f2740"
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* cursor — the click */}
      <path
        d="M61 60 L61 81 L66.4 76.8 L70 84.8 L74.6 82.8 L71 75 L77.4 74.4 Z"
        fill="#ffc629"
        stroke="#1f2740"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoLockup({
  className,
  inverted = false,
}: {
  className?: string;
  /** Use on dark surfaces (footer) — "Sajilo" switches to white. */
  inverted?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-9 shrink-0" />
      <span className="flex items-baseline gap-1.5 font-display text-xl font-extrabold tracking-tight">
        <span className={inverted ? "text-white" : "text-fg"}>Sajilo</span>
        <span className="rounded-lg bg-brand px-2 pb-0.5 pt-0.5 leading-[1.15] text-navy">
          Web
        </span>
      </span>
    </span>
  );
}

export function LogoTagline({ className }: { className?: string }) {
  return (
    <p className={cn("font-display text-[11px] font-bold tracking-[0.28em]", className)}>
      BUILD &middot; LAUNCH &middot; GROW
    </p>
  );
}
