"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/Button";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Mobile-only sticky CTA — slides in after the visitor has scrolled past the
 * hero, so it never competes with the big above-the-fold buttons. Hidden on
 * the contact page (that page itself is the CTA). While off screen the bar is
 * `inert` — out of the tab order and the accessibility tree. Motion respects
 * prefers-reduced-motion; without JavaScript it never appears (the nav and
 * page CTAs still cover the job).
 */
export function StickyMobileCta() {
  const pathname = usePathname();
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <aside
      inert={!past}
      aria-label="Quick action"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-300 motion-reduce:transition-none md:hidden",
        past ? "translate-y-0" : "pointer-events-none translate-y-full"
      )}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-3">
        <p className="text-xs font-semibold leading-tight text-fg-muted">
          Business online,
          <br />
          properly.
        </p>
        <ButtonLink href="/contact">
          Start a project
          <ArrowRight className="size-4" />
        </ButtonLink>
      </div>
    </aside>
  );
}
