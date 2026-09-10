import { cn } from "@/lib/cn";
import type { MiniProps } from "./types";

/**
 * Miniature of sajilo_sweets_house_redesigned/ — Sajilo Sweets House.
 * Faithful to the real demo: festive Dashain top bar, header with the
 * orange "S" logo tile and "🛒 Order 0" pill, the cream hero with the
 * Georgia-serif headline (orange second line), real stats, the demo's own
 * motichoor-ladoo plate photo with its "FRESH TODAY" float card, and the
 * four-column features strip.
 */

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

const stats: Array<[string, string]> = [
  ["20+", "Sweet varieties"],
  ["4.9★", "Customer rating"],
  ["Fresh", "Made daily"],
];

const features = [
  { icon: "🥮", name: "Fresh Mithai", sub: "Made every morning" },
  { icon: "⚖️", name: "Order by Weight", sub: "250g • 500g • 1kg+" },
  { icon: "🎁", name: "Gift Boxes", sub: "Festive & custom" },
  { icon: "🚚", name: "Local Delivery", sub: "Fast & careful" },
];

export function SweetMini({ palette, className }: MiniProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 flex flex-col overflow-hidden", className)}
      style={{ background: palette.base, color: palette.ink }}
    >
      {/* Festive top bar — real copy */}
      <div
        className="flex items-center justify-center py-0.5 text-center text-[4.5px] font-bold text-white"
        style={{ background: "#EE6A18" }}
      >
        🎉 Dashain Special • Up to 15% OFF on selected sweet boxes • All prices
        in NPR
      </div>

      {/* Header — real logo lockup, nav, cart pill */}
      <div
        className="flex items-center justify-between border-b bg-white px-4 py-1.5"
        style={{ borderColor: "#EEE4DC" }}
      >
        <span className="flex items-center gap-1">
          <span
            className="grid h-3.5 w-3.5 place-items-center rounded-[4px] text-[6.5px] font-bold text-white"
            style={{ background: palette.accent, ...serif }}
          >
            S
          </span>
          <span className="leading-none">
            <span className="block text-[6px] font-bold" style={serif}>
              Sajilo
            </span>
            <span className="mt-px block text-[3px] tracking-[0.2em] text-[#8E8178]">
              SWEETS HOUSE
            </span>
          </span>
        </span>
        <span className="hidden gap-2 text-[5px] font-bold text-[#665A51] sm:flex">
          <span>Home</span>
          <span style={{ color: palette.accent }}>Menu</span>
          <span>Offers</span>
          <span>Reviews</span>
          <span>About</span>
          <span>Contact</span>
        </span>
        <span
          className="flex items-center gap-0.5 rounded-full border bg-white px-1.5 py-px text-[4.5px] font-bold"
          style={{ borderColor: "#EADFD7" }}
        >
          🛒 Order
          <em
            className="rounded-full px-1 py-px text-[3.5px] not-italic text-white"
            style={{ background: palette.accent }}
          >
            0
          </em>
        </span>
      </div>

      {/* Hero — cream gradient, serif headline with orange second line */}
      <div
        className="relative min-h-0 flex-1"
        style={{ background: "linear-gradient(110deg,#FFF6ED,#FFFFFF)" }}
      >
        <div className="relative z-[2] max-w-[58%] px-4 pt-3">
          <p
            className="text-[4px] font-black tracking-[0.25em]"
            style={{ color: "#E36115" }}
          >
            TRADITION • FRESHNESS • CELEBRATION
          </p>
          <p
            className="mt-1 text-[14px] font-extrabold leading-[0.98] tracking-[-0.02em] sm:text-[17px]"
            style={serif}
          >
            Sweet moments,
            <br />
            <span style={{ color: palette.accent }}>
              made the Sajilo way.
            </span>
          </p>
          <p className="mt-1 max-w-[92%] text-[4.5px] leading-relaxed text-[#7C6F66]">
            Fresh mithai, beloved Nepali snacks and celebration boxes,
            prepared every day with care.
          </p>
          <div className="mt-1.5 flex gap-1">
            <span
              className="rounded-[4px] px-2 py-0.5 text-[5px] font-bold text-white"
              style={{ background: palette.accent }}
            >
              Explore Sweets →
            </span>
            <span
              className="rounded-[4px] bg-white px-2 py-0.5 text-[5px] font-bold"
              style={{ color: "#DF5F15" }}
            >
              View Offers
            </span>
          </div>
          <div className="mt-1.5 flex gap-2.5">
            {stats.map(([value, label]) => (
              <div key={label} className="leading-tight">
                <b className="block text-[6.5px] font-bold" style={serif}>
                  {value}
                </b>
                <small className="block text-[3.5px] text-[#94877F]">
                  {label}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* Hero art — the demo's own ladoo photo on a white plate */}
        <div className="absolute right-[7%] top-[8%] z-[1] aspect-square h-[72%]">
          <div
            className="h-full w-full overflow-hidden rounded-full border-[5px] bg-white shadow-md"
            style={{ borderColor: "#F0E2D8" }}
          >
            {/* Photo served from the synced demo folder (public/demos/) */}
            <img
              src="/demos/sweet-house/imgs/motichoor_ladoo.jpg"
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1.5 -right-1 rounded-[5px] bg-white px-1.5 py-1 shadow-md">
            <b
              className="block text-[4px] font-bold leading-tight"
              style={{ color: palette.accent }}
            >
              FRESH TODAY
            </b>
            <small className="block text-[3.5px] leading-tight text-[#94877F]">
              Motichoor • Rasbari • Jalebi
            </small>
          </div>
        </div>
      </div>

      {/* Features strip — the real four items */}
      <div
        className="grid grid-cols-4 border-t"
        style={{ borderColor: "#EEE4DC" }}
      >
        {features.map((f) => (
          <div
            key={f.name}
            className="flex items-center justify-center gap-1 border-r py-1.5 last:border-r-0"
            style={{ borderColor: "#EEE4DC" }}
          >
            <span className="text-[7px] leading-none">{f.icon}</span>
            <span className="leading-tight">
              <b className="block text-[4.5px] font-bold">{f.name}</b>
              <small className="block text-[3.5px] text-[#9A8D84]">
                {f.sub}
              </small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
