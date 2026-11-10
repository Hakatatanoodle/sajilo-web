"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { ButtonLink } from "@/components/Button";
import { LogoLockup } from "@/components/Logo";
import { Close, Menu } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Fixed site header. Transparent at rest, gains a soft white blurred
 * surface on scroll. The mobile menu is a full overlay: Escape closes,
 * body scroll is locked, and it closes automatically on route change.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8);
      // A section marked data-nav-dark (the navy hero) restyles the header
      // for as long as it is behind it; the bottom margin flips back to the
      // light header a little early because the hero fades to white there.
      const dark = document.querySelector("[data-nav-dark]");
      if (!dark) {
        setOnDark(false);
        return;
      }
      const rect = dark.getBoundingClientRect();
      setOnDark(rect.top <= 32 && rect.bottom > 340);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape-to-close + scroll lock while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const dark = onDark && !open;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? dark
            ? "border-b border-white/10 bg-navy-deep/80 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "border-b border-line bg-white/85 shadow-[0_10px_40px_-24px_rgba(31,39,64,0.35)] backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="rounded-md"
          aria-label={`${site.name} — home`}
        >
          <LogoLockup inverted={dark} />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? dark
                    ? "bg-white/10 font-semibold text-white"
                    : "bg-brand/20 font-semibold text-navy"
                  : dark
                    ? "text-white/75 hover:bg-white/10 hover:text-white"
                    : "text-fg-muted hover:bg-surface-2 hover:text-fg"
              )}
            >
              {item.label}
            </Link>
          ))}
          {/* Same label + destination as the hero's primary button — the
              header opens the identical contact flow (audit fix #1). Kept
              at size "sm": fully accessible, but visually smaller than the
              hero's lg CTA so the in-page action always leads. */}
          <ButtonLink href="/contact" size="sm" className="ml-3">
            Start a conversation
          </ButtonLink>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border transition-colors md:hidden",
            dark
              ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
              : "border-line bg-white text-fg hover:bg-surface-2"
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <Close className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-line bg-white/95 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 font-display text-lg font-bold transition-colors",
                  isActive(item.href)
                    ? "bg-brand/15 text-navy"
                    : "text-fg-muted hover:bg-surface-2 hover:text-fg"
                )}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/contact" size="lg" className="mt-3">
              Start a conversation
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
