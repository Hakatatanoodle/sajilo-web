"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { ButtonLink } from "@/components/Button";
import { LogoLockup, LogoTagline } from "@/components/Logo";
import { Close, Menu } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Fixed site header — a dark floating capsule over the paper ground.
 *
 * The pill is deliberately the only "chrome" on the page: it stays quiet,
 * keeps the logo readable on every ground, and turns the yellow CTA into the
 * one persistent action. On mobile the menu opens as a full navy sheet.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex h-14 w-full max-w-5xl items-center justify-between rounded-full border border-white/10 pl-4 pr-2 text-white transition-all duration-300 sm:pl-5",
          scrolled
            ? "bg-navy-deep/95 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl"
            : "bg-navy/92 shadow-[0_14px_40px_-24px_rgba(0,0,0,0.55)] backdrop-blur-md"
        )}
      >
        <Link
          href="/"
          className="rounded-md"
          aria-label={`${site.name} — home`}
        >
          <LogoLockup inverted />
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-[0.8rem] font-medium transition-colors",
                isActive(item.href)
                  ? "bg-white/10 font-semibold text-brand"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink
            href="/contact"
            size="sm"
            className="ml-2 shadow-none"
          >
            Start a conversation
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
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
          className="fixed inset-0 z-40 bg-navy-deep pt-24 md:hidden"
        >
          <div className="flex h-[calc(100dvh-6rem)] flex-col px-6 pb-8">
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "border-b border-white/10 py-4 font-display text-3xl font-medium tracking-tight transition-colors",
                    isActive(item.href)
                      ? "text-brand"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <ButtonLink href="/contact" size="lg" className="w-full">
                Start a conversation
              </ButtonLink>
              <p className="mt-5 text-sm leading-relaxed text-white/55">
                {site.contact.email}
                <br />
                {site.contact.location}
              </p>
              <LogoTagline className="mt-6 text-brand" />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
