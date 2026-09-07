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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-line bg-white/85 shadow-[0_10px_40px_-24px_rgba(31,39,64,0.35)] backdrop-blur-md"
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
          <LogoLockup />
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
                  ? "bg-brand/20 font-semibold text-navy"
                  : "text-fg-muted hover:bg-surface-2 hover:text-fg"
              )}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact" className="ml-3">
            Let&apos;s Talk
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-fg transition-colors hover:bg-surface-2 md:hidden"
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
              Let&apos;s Talk
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
