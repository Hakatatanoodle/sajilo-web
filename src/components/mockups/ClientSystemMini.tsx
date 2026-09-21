import { cn } from "@/lib/cn";
import type { MiniProps } from "./types";

/**
 * Abstract visual for the real client build (Ganapati Eye Care Clinic).
 * Deliberately NOT a miniature of the app: a lock, a wordmark, and abstract
 * record bars only — never patient data, never a fake screen of the real
 * system, never a fabricated URL.
 */
export function ClientSystemMini({ palette, className }: MiniProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 flex flex-col overflow-hidden", className)}
      style={{ background: palette.base, color: palette.ink }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        <span className="font-display text-[8px] font-extrabold tracking-[0.12em]">
          GANAPATI EYE CARE CLINIC
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[6px] font-bold text-white"
          style={{ background: palette.accent }}
        >
          Live · Private
        </span>
      </div>

      <div
        className="flex flex-1 flex-col items-center justify-center gap-2.5 px-4"
        style={{ background: `linear-gradient(120deg, ${palette.heroFrom}, ${palette.heroTo})` }}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-7 text-white/90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5" />
          <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
          <circle cx="12" cy="15.2" r="1.5" fill="currentColor" stroke="none" />
        </svg>
        <p className="font-display text-[10px] font-extrabold tracking-[0.16em] text-white">
          PATIENT RECORDS · SMS BROADCAST
        </p>
        <div className="flex gap-1.5">
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[6px] font-bold text-white">
            Login-gated
          </span>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[6px] font-bold text-white">
            Clinic SIM
          </span>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[6px] font-bold text-white">
            Noindex
          </span>
        </div>
        <div className="mt-1 space-y-1">
          <div className="h-1 w-24 rounded-full bg-white/30" />
          <div className="h-1 w-16 rounded-full bg-white/20" />
        </div>
      </div>

      <div
        className="flex items-center justify-between border-t px-4 py-2"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="h-0.5 w-16 rounded-full bg-black/15" />
        <div
          className="h-3 w-10 rounded-full"
          style={{ background: palette.accent, opacity: 0.85 }}
        />
      </div>
    </div>
  );
}
