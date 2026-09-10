import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "dark" | "onDark" | "quiet";
type Size = "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variantStyles: Record<Variant, string> = {
  /* Brand yellow with navy text — the logo's "Web" pill as an action. */
  primary:
    "border border-navy/10 bg-brand text-navy shadow-[0_10px_30px_-10px_rgba(255,198,41,0.8)] hover:bg-brand-deep hover:shadow-[0_14px_38px_-10px_rgba(255,198,41,0.9)] hover:brightness-105",
  ghost:
    "border border-line-strong bg-white text-fg hover:border-navy/30 hover:bg-surface-2",
  /* Navy solid — for use on the yellow CTA band or other brand surfaces. */
  dark: "border border-navy bg-navy text-white shadow-[0_12px_32px_-12px_rgba(31,39,64,0.55)] hover:bg-navy-deep",
  /* Ghost tuned for use on the yellow CTA band. */
  onDark:
    "border border-navy/30 bg-transparent text-navy hover:border-navy/60 hover:bg-navy/10",
  quiet: "text-fg-muted hover:text-fg",
};

const sizeStyles: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Link-styled button — the standard way to point at a route or channel. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Real <button> for client-side actions. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type={type}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
