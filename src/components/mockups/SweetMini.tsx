import { cn } from "@/lib/cn";
import type { MiniProps } from "./types";

/**
 * Miniature of sajilo_sweets_house_redesigned — Sajilo Sweets House.
 */
export function SweetMini({ palette, className }: MiniProps) {
  const menu = [
    { name: "Motichoor Ladoo", price: "Rs. 45" },
    { name: "Kaju Barfi", price: "Rs. 75" },
    { name: "Jalebi", price: "Rs. 30" },
  ];
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
          SAJILO SWEETS HOUSE
        </span>
        <span className="hidden gap-2 text-[6px] opacity-60 sm:flex">
          <span>Menu</span>
          <span>Offers</span>
          <span>Reviews</span>
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[6px] font-bold text-white"
          style={{ background: palette.accent }}
        >
          Order
        </span>
      </div>

      <div
        className="px-4 py-4 sm:px-6"
        style={{ background: `linear-gradient(120deg, ${palette.heroFrom}, ${palette.heroTo})` }}
      >
        <p className="text-[5.5px] font-bold tracking-[0.18em] text-white/75">
          TRADITION · FRESHNESS · CELEBRATION
        </p>
        <p className="mt-1 font-display text-[15px] font-extrabold leading-[1.05] text-white sm:text-[19px]">
          SWEET MOMENTS,
          <br />
          MADE THE SAJILO WAY.
        </p>
        <div className="mt-2 h-1 w-2/3 rounded-full bg-white/40" />
        <span
          className="mt-2.5 inline-block rounded-full bg-white px-2.5 py-1 text-[6px] font-bold"
          style={{ color: palette.ink }}
        >
          Explore sweets
        </span>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2 px-4 py-3">
        {menu.map((m) => (
          <div
            key={m.name}
            className="rounded-lg border bg-white p-2"
            style={{ borderColor: "rgba(0,0,0,0.08)" }}
          >
            <div
              className="h-6 w-full rounded-md"
              style={{
                background: `linear-gradient(135deg, ${palette.heroFrom}66, ${palette.heroTo}99)`,
              }}
            />
            <p className="mt-1.5 text-[6.5px] font-bold leading-tight">{m.name}</p>
            <p className="mt-0.5 text-[6px] font-bold" style={{ color: palette.accent }}>
              {m.price}
            </p>
          </div>
        ))}
      </div>

      <div
        className="flex items-center justify-between border-t px-4 py-2"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="space-y-1">
          <div className="h-0.5 w-14 rounded-full bg-black/15" />
          <div className="h-0.5 w-9 rounded-full bg-black/10" />
        </div>
        <span className="h-3 w-12 rounded-full" style={{ background: palette.accent, opacity: 0.85 }} />
      </div>
    </div>
  );
}
