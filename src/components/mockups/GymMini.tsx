import { cn } from "@/lib/cn";
import type { MiniProps } from "./types";

/**
 * Miniature of web_agency_portfolio/gym.html — IronForge Fitness.
 */
export function GymMini({ palette, className }: MiniProps) {
  const tiers = [
    { name: "Starter", price: "Rs. 2,500/mo" },
    { name: "Unlimited", price: "Rs. 4,000/mo" },
    { name: "Elite", price: "Rs. 7,500/mo" },
  ];
  const programs = [
    { name: "Strength", bg: "linear-gradient(135deg,#222,#777)" },
    { name: "Conditioning", bg: "linear-gradient(135deg,#6B4D2D,#C7A776)" },
    { name: "Personal Training", bg: "linear-gradient(135deg,#284638,#8DA98F)" },
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
        <span className="font-display text-[8px] font-extrabold tracking-[0.14em]">IRONFORGE</span>
        <span className="hidden gap-2 text-[6px] opacity-60 sm:flex">
          <span>Programs</span>
          <span>Membership</span>
          <span>Contact</span>
        </span>
        <span className="rounded-full bg-[#171717] px-2 py-0.5 text-[6px] font-bold text-white">
          Join
        </span>
      </div>

      <div
        className="px-4 py-4 sm:px-6"
        style={{ background: `linear-gradient(120deg, ${palette.heroFrom}, ${palette.heroTo})` }}
      >
        <p className="text-[5.5px] font-bold tracking-[0.18em] text-white/70">
          PRIVATE TRAINING · GROUP FITNESS · STRENGTH
        </p>
        <p className="mt-1 font-display text-[17px] font-extrabold leading-[1.02] tracking-tight text-white sm:text-[21px]">
          BUILD YOUR EDGE.
        </p>
        <div className="mt-2 h-1 w-2/3 rounded-full bg-white/35" />
        <span className="mt-2.5 inline-block rounded-full bg-white px-2.5 py-1 text-[6px] font-bold text-[#171717]">
          View memberships
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 pt-3">
        {programs.map((p) => (
          <div key={p.name} className="flex h-9 items-end rounded-lg p-1.5" style={{ background: p.bg }}>
            <span className="text-[6px] font-bold text-white">{p.name}</span>
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2 px-4 py-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className="rounded-lg border bg-white p-2"
            style={{ borderColor: "rgba(0,0,0,0.08)" }}
          >
            <p className="text-[6.5px] font-bold">{t.name}</p>
            <p className="mt-1 font-display text-[8px] font-extrabold">{t.price}</p>
            <div className="mt-1.5 h-0.5 w-4/5 rounded-full bg-black/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
