import { cn } from "@/lib/cn";
import type { MiniProps } from "./types";

/**
 * Miniature of dwaar/ — Dwaar, a concept hotel site for a restored Newari
 * house in Patan. Faithful to the real demo: ink-blue canvas, the lamp-gold
 * "Book" outline, the demo's own mountain hero photo, the giant Gloock-style
 * "Dwaar" wordmark, the real intro copy and both hero CTAs, then the house's
 * four facts (11 rooms, 3 yrs restoration, 5 min to Durbar Square, 7 am
 * breakfast).
 */

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

const facts: Array<[string, string]> = [
  ["11", "rooms"],
  ["3 yrs", "restoration"],
  ["5 min", "to Durbar Sq."],
  ["7 am", "breakfast"],
];

export function DwaarMini({ palette, className }: MiniProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 flex flex-col overflow-hidden", className)}
      style={{ background: palette.base, color: palette.ink }}
    >
      {/* Hero — the demo's own mountain photo under its dark gradient */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <img
          src="/demos/dwaar/assets/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,23,34,.52) 0%, rgba(12,23,34,.02) 42%, rgba(12,23,34,.94) 100%)",
          }}
        />

        {/* Nav — real links, lamp-gold Book outline */}
        <div className="relative z-10 flex items-center justify-between px-4 py-2">
          <span className="flex items-baseline gap-1.5">
            <span
              className="text-[8px] leading-none"
              style={{ fontFamily: "'Tiro Devanagari Hindi', Georgia, serif" }}
            >
              द्वार
            </span>
            <span className="text-[6px] font-semibold text-[#A9A398]">
              Dwaar
            </span>
          </span>
          <span className="flex items-center gap-2 text-[5px]">
            <span className="hidden items-center gap-2 sm:flex">
              <span>The house</span>
              <span>Rooms</span>
              <span>Food</span>
              <span>Visit</span>
            </span>
            <span
              className="border px-1.5 py-0.5"
              style={{ borderColor: palette.accent }}
            >
              Book
            </span>
          </span>
        </div>

        {/* Hero copy — giant wordmark, intro line, both real CTAs */}
        <div className="absolute inset-x-4 bottom-3 z-10 flex items-end justify-between gap-3">
          <p
            className="shrink-0 font-normal leading-[.78] tracking-[-0.03em]"
            style={{ ...serif, fontSize: "3.9rem" }}
          >
            Dwaar
          </p>
          <div className="max-w-[8.5rem] pb-0.5">
            <p className="text-[5.5px] leading-[1.45]">
              A restored Newari house in Patan. Eleven rooms around one brick
              courtyard.
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              <span
                className="px-1.5 py-1 text-[4.5px] font-semibold"
                style={{ background: "#A8442A", color: "#ECE3D2" }}
              >
                Check availability
              </span>
              <span
                className="border px-1.5 py-1 text-[4.5px] font-semibold"
                style={{ borderColor: palette.ink }}
              >
                See the rooms
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The house's real facts, from the demo's stats row */}
      <div
        className="grid shrink-0 grid-cols-4 gap-2 border-t px-4 py-2"
        style={{ borderColor: "#2B3C4D" }}
      >
        {facts.map(([big, small]) => (
          <div key={small}>
            <b
              className="block font-normal leading-none"
              style={{ ...serif, fontSize: "0.72rem" }}
            >
              {big}
            </b>
            <span className="mt-0.5 block text-[4px] leading-tight text-[#A9A398]">
              {small}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
