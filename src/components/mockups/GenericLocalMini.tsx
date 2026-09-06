import { cn } from "@/lib/cn";

/**
 * Generic "local business" miniature used in the home hero composition.
 * Deliberately generic — it illustrates the kind of site Sajilo Web builds,
 * it is not presented as a project. Decorative: always rendered inside a
 * labelled frame.
 */
export function GenericLocalMini({ className }: { className?: string }) {
  const palette = { heroFrom: "#2A2118", heroTo: "#8A6D4B", ink: "#241C12", accent: "#3E6B4F" };
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 flex flex-col overflow-hidden bg-[#FAF8F4]", className)}
      style={{ color: palette.ink }}
    >
      <div className="flex items-center justify-between border-b px-4 py-2" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <span className="font-display text-[8px] font-extrabold tracking-[0.1em]">
          NEPALI LOCAL BUSINESS
        </span>
        <span className="hidden gap-2 text-[6px] opacity-60 sm:flex">
          <span>Products</span>
          <span>Bookings</span>
          <span>Contact</span>
        </span>
        <span className="rounded-full px-2 py-0.5 text-[6px] font-bold text-white" style={{ background: palette.accent }}>
          Get in touch
        </span>
      </div>

      <div
        className="px-4 py-4 sm:px-6"
        style={{ background: `linear-gradient(120deg, ${palette.heroFrom}, ${palette.heroTo})` }}
      >
        <p className="text-[5.5px] font-bold tracking-[0.18em] text-white/70">
          SERVING THE NEIGHBOURHOOD · OPEN DAILY
        </p>
        <p className="mt-1 font-display text-[15px] font-extrabold leading-[1.05] text-white sm:text-[19px]">
          Everything you need,
          <br />
          in one place.
        </p>
        <div className="mt-2 h-1 w-3/4 rounded-full bg-white/40" />
        <div className="mt-1 h-1 w-1/2 rounded-full bg-white/30" />
        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded-full bg-white px-2.5 py-1 text-[6px] font-bold" style={{ color: palette.ink }}>
            Browse products
          </span>
          <span className="rounded-full border border-white/40 px-2.5 py-1 text-[6px] font-bold text-white">
            Book now
          </span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2 px-4 py-3">
        {["Products & services", "Bookings & hours", "Contact & location"].map((s) => (
          <div key={s} className="rounded-lg border bg-white p-2" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <div className="h-1 w-1/2 rounded-full" style={{ background: palette.accent }} />
            <p className="mt-1.5 text-[6.5px] font-bold leading-tight">{s}</p>
            <div className="mt-1.5 space-y-1">
              <div className="h-0.5 w-full rounded-full bg-black/10" />
              <div className="h-0.5 w-4/5 rounded-full bg-black/10" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t px-4 py-2" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#28C840]" />
          <span className="text-[6px] font-semibold opacity-70">Replies on WhatsApp today</span>
        </div>
        <span className="h-3 w-12 rounded-full" style={{ background: palette.accent, opacity: 0.85 }} />
      </div>
    </div>
  );
}
