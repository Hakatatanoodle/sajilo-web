import { cn } from "@/lib/cn";
import type { MiniProps } from "./types";

/**
 * Miniature of sajilo_hub_clothing_store_updated/ — Sajilo HUB storefront.
 * Faithful to the real demo: black announcement bar (Rs. 2,000 / 50% OFF),
 * header with the six real nav links, beige hero with the demo's exact
 * headline and copy, and the 4-column catalog showing the demo's own
 * products — names, photos, ratings, prices and color swatches straight
 * from the demo's script.js.
 */

const products = [
  {
    name: "Classic Black Hoodie",
    price: "Rs. 3,999",
    old: "Rs. 4,999",
    rating: 4.6,
    sale: "-20%",
    colors: ["#111", "#444", "#DDD", "#18263A"],
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Oversized Beige Tee",
    price: "Rs. 1,999",
    old: null,
    rating: 4.3,
    sale: null,
    colors: ["#DED3BF", "#6C7048", "#4D392D", "#EEE"],
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Denim Jacket",
    price: "Rs. 5,999",
    old: "Rs. 6,999",
    rating: 4.7,
    sale: "-15%",
    colors: ["#16446A", "#8BB2CE"],
    img: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Polo T-Shirt",
    price: "Rs. 2,499",
    old: null,
    rating: 4.2,
    sale: null,
    colors: ["#EEE", "#162443", "#111"],
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=70",
  },
];

const stars = (rating: number) =>
  "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));

export function StoreMini({ palette, className }: MiniProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 flex flex-col overflow-hidden", className)}
      style={{ background: palette.base, color: palette.ink }}
    >
      {/* Announcement bar — real copy */}
      <div className="flex items-center justify-center bg-[#111] py-1 text-[5px] font-bold tracking-[0.02em] text-white">
        FREE SHIPPING ON ORDERS ABOVE Rs. 2,000
        <span className="mx-1.5 opacity-45">•</span>
        FLASH SALE UP TO 50% OFF
      </div>

      {/* Header — brand lockup, six real nav links, actions with empty cart */}
      <div
        className="flex items-center justify-between border-b bg-white px-4 py-1.5"
        style={{ borderColor: "#E7E5E1" }}
      >
        <span className="leading-none">
          <span className="block font-display text-[8px] font-extrabold">
            SAJILO HUB
          </span>
          <span className="mt-0.5 block text-[3.5px] font-semibold tracking-[0.35em] opacity-70">
            CLOTHING CO.
          </span>
        </span>
        <span className="hidden gap-2.5 text-[6px] font-medium opacity-80 sm:flex">
          <span className="relative">
            Home
            <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#111]" />
          </span>
          <span>Men</span>
          <span>Women</span>
          <span>Accessories</span>
          <span>Sale</span>
          <span>Location</span>
        </span>
        <span className="flex items-center gap-1.5 text-[7px] opacity-80">
          <span>♙</span>
          <span>♡</span>
          <span className="relative">
            ▢
            <span className="absolute -right-1.5 -top-1 grid h-2 w-2 place-items-center rounded-full bg-[#111] text-[4px] font-bold text-white">
              0
            </span>
          </span>
        </span>
      </div>

      {/* Hero — beige block with the real headline, copy and art cards */}
      <div
        className="mx-4 mt-2 flex overflow-hidden rounded-[10px]"
        style={{ background: "#E8E4DC" }}
      >
        <div className="min-w-0 flex-1 px-3 py-2.5">
          <p className="text-[4.5px] font-extrabold tracking-[0.18em] text-[#777]">
            NEW SEASON / 2026
          </p>
          <p className="mt-1 font-display text-[13px] font-extrabold leading-[0.98] tracking-[-0.05em] sm:text-[15px]">
            Wear what feels
            <br />
            <span className="font-medium">like you.</span>
          </p>
          <p className="mt-1 max-w-[85%] text-[4.5px] leading-relaxed text-[#555]">
            Curated everyday clothing with clean silhouettes, easy colors and
            prices that make shopping simple.
          </p>
          <span className="mt-1.5 inline-block rounded-[3px] bg-[#111] px-2 py-0.5 text-[5px] font-bold text-white">
            Shop collection →
          </span>
        </div>
        <div
          className="relative w-[36%] shrink-0"
          style={{ background: "linear-gradient(125deg,#B6ADA0,#D7D1C8)" }}
        >
          <span className="absolute left-2 top-2 rounded-[2px] bg-white px-1.5 py-1 text-[4.5px] leading-[1.5] tracking-[0.12em] shadow-sm">
            NEW
            <b className="block font-extrabold">ESSENTIALS</b>
          </span>
          <span className="absolute bottom-2 right-2 rounded-[2px] bg-white px-1.5 py-1 text-[4.5px] leading-[1.5] tracking-[0.12em] shadow-sm">
            SAJILO
            <b className="block font-extrabold">SELECT</b>
          </span>
        </div>
      </div>

      {/* Catalog heading — real eyebrow/title and product count */}
      <div className="flex items-end justify-between px-4 pt-2">
        <div>
          <p className="text-[4.5px] font-extrabold tracking-[0.18em] text-[#777]">
            THE COLLECTION
          </p>
          <p className="font-display text-[8px] font-bold tracking-[-0.04em]">
            Find your next favorite.
          </p>
        </div>
        <span className="text-[5px] text-[#777]">12 products</span>
      </div>

      {/* Filters — search/sort/rating controls and the real type buttons */}
      <div className="flex items-center gap-1 px-4 pt-1.5">
        <span
          className="h-2.5 w-14 rounded-[3px] border bg-white px-1 text-[4.5px] leading-[8px] opacity-60"
          style={{ borderColor: "#DDD" }}
        >
          Search products…
        </span>
        <span
          className="h-2.5 w-9 rounded-[3px] border bg-white px-1 text-[4.5px] leading-[8px] opacity-60"
          style={{ borderColor: "#DDD" }}
        >
          Sort
        </span>
        <span
          className="h-2.5 w-9 rounded-[3px] border bg-white px-1 text-[4.5px] leading-[8px] opacity-60"
          style={{ borderColor: "#DDD" }}
        >
          Rating
        </span>
        <span className="ml-auto flex gap-0.5">
          <span className="rounded-[2px] bg-[#111] px-1 py-px text-[4.5px] font-bold text-white">
            All
          </span>
          {["Men", "Women", "Accessories", "Sale"].map((t) => (
            <span
              key={t}
              className="rounded-[2px] border bg-white px-1 py-px text-[4.5px] font-bold"
              style={{ borderColor: "#DDD" }}
            >
              {t}
            </span>
          ))}
        </span>
      </div>

      {/* Products — the demo's real items with photos, ratings, swatches */}
      <div className="grid flex-1 grid-cols-4 gap-1.5 px-4 py-2">
        {products.map((p) => (
          <div
            key={p.name}
            className="flex flex-col overflow-hidden rounded-[6px] border bg-white"
            style={{ borderColor: "#E3E1DD" }}
          >
            <div
              className="relative h-7 w-full shrink-0 overflow-hidden"
              style={{ background: "#F0EEEA" }}
            >
              {/* Same photo URL the real store loads (demo script.js) */}
              <img src={p.img} alt="" className="h-full w-full object-cover" />
              {p.sale ? (
                <span className="absolute left-1 top-1 rounded-[2px] bg-[#111] px-1 py-px text-[4px] font-extrabold text-white">
                  {p.sale}
                </span>
              ) : null}
              <span className="absolute right-1 top-1 text-[5px] text-[#555]">
                ♡
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col p-1.5">
              <p className="truncate text-[5px] font-semibold leading-tight">
                {p.name}
              </p>
              <p className="mt-px text-[4.5px] leading-tight text-[#E99516]">
                {stars(p.rating)}{" "}
                <span className="opacity-60">{p.rating.toFixed(1)} rating</span>
              </p>
              <p className="mt-px text-[5.5px] font-bold leading-tight">
                <span style={p.sale ? { color: "#D92828" } : undefined}>
                  {p.price}
                </span>
                {p.old ? (
                  <span className="ml-1 font-normal opacity-60 line-through">
                    {p.old}
                  </span>
                ) : null}
              </p>
              <span className="mt-0.5 flex gap-0.5">
                {p.colors.map((c) => (
                  <span
                    key={c}
                    className="h-1.5 w-1.5 rounded-full border border-black/10"
                    style={{ background: c }}
                  />
                ))}
              </span>
              <span
                className="mt-auto block w-full rounded-[3px] border py-0.5 text-center text-[4.5px] font-bold"
                style={{ borderColor: "#DDD" }}
              >
                Order now
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
