import { cn } from "@/lib/cn";
import type { MiniProps } from "./types";

/**
 * Miniature of sajilo_hub_clothing_store_updated/ — Sajilo HUB storefront.
 * The most detailed mini: announcement bar, header with cart badge,
 * warm hero, and a product catalog grid with sale badges and prices.
 */
export function StoreMini({ palette, className }: MiniProps) {
  const products = [
    { name: "Classic Black Hoodie", price: "Rs. 3,999", old: "Rs. 4,999", bg: "#18263A", sale: "-20%" },
    { name: "Oversized Beige Tee", price: "Rs. 1,999", old: null, bg: "#DED3BF", sale: null },
    { name: "Denim Jacket", price: "Rs. 5,999", old: "Rs. 6,999", bg: "#16446A", sale: "-15%" },
    { name: "Maroon Hoodie", price: "Rs. 3,749", old: "Rs. 4,999", bg: "#64182E", sale: "-25%" },
    { name: "Knit Cardigan", price: "Rs. 4,299", old: null, bg: "#C6B59F", sale: null },
    { name: "Everyday Cap", price: "Rs. 1,699", old: "Rs. 2,199", bg: "#7C674E", sale: "-20%" },
  ];
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 flex flex-col overflow-hidden", className)}
      style={{ background: palette.base, color: palette.ink }}
    >
      <div className="flex items-center justify-center bg-[#111] py-1 text-[5px] font-bold tracking-[0.08em] text-white">
        FREE SHIPPING ON ORDERS ABOVE Rs. 5,000 <span className="mx-1.5 opacity-40">•</span> FLASH SALE UP TO 25% OFF
      </div>

      <div className="flex items-center justify-between border-b bg-white px-4 py-1.5" style={{ borderColor: "#E7E5E1" }}>
        <span className="font-display text-[8px] font-extrabold leading-none">
          SAJILO HUB
          <span className="block text-[4px] font-bold tracking-[0.3em] opacity-70">CLOTHING CO.</span>
        </span>
        <span className="hidden gap-2.5 text-[6px] opacity-70 sm:flex">
          <span>Home</span>
          <span>Men</span>
          <span>Women</span>
          <span>Accessories</span>
          <span>Sale</span>
        </span>
        <span className="relative text-[8px]" style={{ color: palette.accent }}>
          ▢
          <span className="absolute -right-1.5 -top-1 grid h-2 w-2 place-items-center rounded-full bg-[#111] text-[4px] font-bold text-white">
            2
          </span>
        </span>
      </div>

      <div className="mx-4 mt-2 flex items-center justify-between rounded-xl px-4 py-2.5" style={{ background: "#E8E4DC" }}>
        <div>
          <p className="text-[5px] font-extrabold tracking-[0.18em] text-[#777]">NEW SEASON / 2026</p>
          <p className="mt-0.5 font-display text-[12px] font-extrabold leading-[1.02] tracking-tight sm:text-[14px]">
            Wear what feels
            <br />
            <span className="font-medium">like you.</span>
          </p>
          <span className="mt-1.5 inline-block rounded-full bg-[#111] px-2 py-0.5 text-[5.5px] font-bold text-white">
            Shop collection →
          </span>
        </div>
        <div
          className="relative h-10 w-16 overflow-hidden rounded-lg sm:w-20"
          style={{ background: `linear-gradient(125deg, ${palette.heroFrom}, ${palette.heroTo})` }}
        >
          <span className="absolute left-1 top-1 rounded-md bg-white/85 px-1 py-0.5 text-[4.5px] font-extrabold leading-tight">
            NEW
            <span className="block font-bold">ESSENTIALS</span>
          </span>
          <span className="absolute bottom-1 right-1 rounded-md bg-[#111]/85 px-1 py-0.5 text-[4.5px] font-extrabold leading-tight text-white">
            SAJILO
            <span className="block">SELECT</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pt-2">
        <span className="h-2.5 w-20 rounded-full border bg-white" style={{ borderColor: "#E7E5E1" }} />
        <div className="flex gap-1">
          <span className="rounded-full bg-[#111] px-1.5 py-0.5 text-[4.5px] font-bold text-white">All</span>
          <span className="rounded-full border bg-white px-1.5 py-0.5 text-[4.5px] font-bold" style={{ borderColor: "#E7E5E1" }}>Men</span>
          <span className="rounded-full border bg-white px-1.5 py-0.5 text-[4.5px] font-bold" style={{ borderColor: "#E7E5E1" }}>Women</span>
          <span className="rounded-full px-1.5 py-0.5 text-[4.5px] font-bold text-[#D64545]">Sale</span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-1.5 px-4 py-2">
        {products.map((p) => (
          <div key={p.name} className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: "#E7E5E1" }}>
            <div className="relative h-6 w-full" style={{ background: p.bg }}>
              {p.sale ? (
                <span className="absolute left-1 top-1 rounded-full bg-[#D64545] px-1 py-px text-[4px] font-bold text-white">
                  {p.sale}
                </span>
              ) : null}
            </div>
            <div className="p-1">
              <p className="truncate text-[5px] font-bold leading-tight">{p.name}</p>
              <p className="mt-0.5 text-[5.5px] font-extrabold">
                {p.price}
                {p.old ? <span className="ml-1 font-normal text-[#999] line-through">{p.old}</span> : null}
              </p>
              <span className="mt-0.5 block w-full rounded-full bg-[#111] py-0.5 text-center text-[4.5px] font-bold text-white">
                Order now
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
