import { cn } from "@/lib/cn";
import type { MiniProps } from "./types";

/**
 * Miniature of the IronForge gym demo (sajiloweb_gym_website_responsive/).
 * Faithful to the real demo: near-black canvas (#0A0A0A) with the
 * electric-yellow accent (#E7FF00), the two-tone IRONFORGE wordmark, the
 * real five-link nav with JOIN NOW, the full dark hero ("BUILD YOUR
 * STRONGEST SELF.") over the demo's own darkened gym photo with its real
 * stat counters, and the membership tiers with the demo's real plans and
 * prices (Basic 2,499 / Pro 3,999 / Elite 6,999).
 */

const tiers = [
  { name: "BASIC", price: "Rs. 2,499", popular: false },
  { name: "PRO", price: "Rs. 3,999", popular: true },
  { name: "ELITE", price: "Rs. 6,999", popular: false },
];

const stats: Array<[string, string]> = [
  ["8+", "Years Experience"],
  ["25+", "Expert Trainers"],
  ["2K+", "Active Members"],
];

export function GymMini({ className }: MiniProps) {
  // The demo's fixed identity (black + #E7FF00) is used directly; the
  // palette prop is intentionally unused — see src/content/work.ts.
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 flex flex-col overflow-hidden", className)}
      style={{ background: "#0A0A0A", color: "#F5F5F5" }}
    >
      {/* Navbar — two-tone logo, real links, yellow CTA */}
      <div
        className="flex items-center justify-between border-b px-4 py-2"
        style={{ borderColor: "#222" }}
      >
        <span className="font-display text-[8px] font-black tracking-[-0.04em]">
          IRON<span className="text-[#E7FF00]">FORGE</span>
        </span>
        <span className="hidden gap-2 text-[5.5px] font-semibold text-[#BBB] sm:flex">
          <span>Home</span>
          <span>About</span>
          <span>Programs / Trainings</span>
          <span>Memberships</span>
          <span>Offers</span>
        </span>
        <span className="rounded-[2px] bg-[#E7FF00] px-2 py-0.5 text-[5px] font-extrabold uppercase tracking-[0.04em] text-[#080808]">
          Join Now
        </span>
      </div>

      {/* Hero — the demo's own gym photo under its exact left-to-right fade */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=60)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,#050505 0%,rgba(5,5,5,.85) 45%,rgba(5,5,5,.3) 100%)",
          }}
        />
        <div className="relative px-4 py-4 sm:px-5">
          <p className="text-[5px] font-black tracking-[0.18em] text-[#E7FF00]">
            NO EXCUSES. JUST PROGRESS.
          </p>
          <p className="mt-1.5 font-display text-[19px] font-black leading-[0.92] tracking-[-0.06em] sm:text-[23px]">
            BUILD YOUR
            <br />
            <span className="text-[#E7FF00]">STRONGEST SELF.</span>
          </p>
          <p className="mt-1.5 max-w-[55%] text-[5px] leading-relaxed text-[#C6C6C6]">
            Premium training, expert coaching and a community that keeps you
            moving forward.
          </p>
          <div className="mt-2 flex gap-1">
            <span className="rounded-[2px] bg-[#E7FF00] px-2 py-1 text-[5px] font-extrabold uppercase tracking-[0.04em] text-[#080808]">
              Start Your Journey
            </span>
            <span
              className="rounded-[2px] border px-2 py-1 text-[5px] font-extrabold uppercase tracking-[0.04em] text-white"
              style={{ borderColor: "#777", background: "rgba(0,0,0,.35)" }}
            >
              Explore Programs
            </span>
          </div>
        </div>

        {/* Real hero stats, bottom-right as in the demo */}
        <div className="absolute bottom-2.5 right-4 flex gap-3 sm:gap-4">
          {stats.map(([value, label]) => (
            <div key={label} className="flex flex-col leading-tight">
              <strong className="font-display text-[9px] font-black text-[#E7FF00]">
                {value}
              </strong>
              <span className="text-[4px] font-semibold text-[#BBB]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Memberships — the demo's real tiers and prices */}
      <div className="grid grid-cols-3 gap-1.5 px-4 pb-3 pt-2.5">
        {tiers.map((t) => (
          <div
            key={t.name}
            className="relative rounded-[3px] border bg-[#111] p-1.5"
            style={{ borderColor: t.popular ? "#E7FF00" : "#333" }}
          >
            {t.popular ? (
              <span className="absolute -top-1 right-1 rounded-[2px] bg-[#E7FF00] px-1 py-px text-[4px] font-black text-[#080808]">
                MOST POPULAR
              </span>
            ) : null}
            <p className="text-[5px] font-black tracking-[0.1em] text-[#BBB]">
              {t.name}
            </p>
            <p className="mt-0.5 font-display text-[7.5px] font-black leading-none">
              {t.price}
              <span className="text-[4px] font-semibold text-[#888]">
                /month
              </span>
            </p>
            <div className="mt-1 h-0.5 w-4/5 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
