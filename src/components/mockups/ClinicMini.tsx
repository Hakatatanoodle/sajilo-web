import { cn } from "@/lib/cn";
import type { MiniProps } from "./types";

/**
 * Miniature of web_agency_portfolio/clinic.html — CarePoint Clinic.
 * Decorative representation of the actual demo build.
 */
export function ClinicMini({ palette, className }: MiniProps) {
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
          CAREPOINT CLINIC
        </span>
        <span className="hidden gap-2 text-[6px] opacity-60 sm:flex">
          <span>Services</span>
          <span>Doctors</span>
          <span>Appointment</span>
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[6px] font-bold text-white"
          style={{ background: palette.accent }}
        >
          Book now
        </span>
      </div>

      <div
        className="px-4 py-4 sm:px-6"
        style={{ background: `linear-gradient(120deg, ${palette.heroFrom}, ${palette.heroTo})` }}
      >
        <p className="text-[5.5px] font-bold tracking-[0.18em] text-white/75">
          PRIMARY CARE · SPECIALIST · DIAGNOSTICS
        </p>
        <p className="mt-1 font-display text-[15px] font-extrabold leading-[1.05] text-white sm:text-[19px]">
          CARE THAT
          <br />
          STARTS WITH YOU.
        </p>
        <div className="mt-2 h-1 w-3/4 rounded-full bg-white/40" />
        <div className="mt-1 h-1 w-1/2 rounded-full bg-white/30" />
        <span
          className="mt-2.5 inline-block rounded-full bg-white px-2.5 py-1 text-[6px] font-bold"
          style={{ color: palette.ink }}
        >
          Book an appointment
        </span>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2 px-4 py-3">
        {["General Consultation", "Eye Care", "Diagnostics"].map((s) => (
          <div
            key={s}
            className="rounded-lg border bg-white p-2"
            style={{ borderColor: "rgba(0,0,0,0.08)" }}
          >
            <div className="h-1 w-1/2 rounded-full" style={{ background: palette.accent }} />
            <p className="mt-1.5 text-[6.5px] font-bold leading-tight">{s}</p>
            <div className="mt-1.5 space-y-1">
              <div className="h-0.5 w-full rounded-full bg-black/10" />
              <div className="h-0.5 w-4/5 rounded-full bg-black/10" />
            </div>
          </div>
        ))}
      </div>

      <div
        className="flex items-center justify-between border-t px-4 py-2"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="space-y-1">
          <div className="h-0.5 w-16 rounded-full bg-black/15" />
          <div className="h-0.5 w-10 rounded-full bg-black/10" />
        </div>
        <div className="flex gap-1">
          <span className="h-3 w-10 rounded-full bg-black/10" />
          <span className="h-3 w-10 rounded-full" style={{ background: palette.accent, opacity: 0.85 }} />
        </div>
      </div>
    </div>
  );
}
