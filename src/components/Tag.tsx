import { cn } from "@/lib/cn";

type TagVariant = "concept" | "client";

/**
 * Project status tag. design.md §26: the distinction between concept/demo
 * work and real client work must ALWAYS be visible. Only "concept" is used
 * today — "client" is styled and reserved for future real client projects.
 */
export function Tag({
  variant = "concept",
  children,
  className,
}: {
  variant?: TagVariant;
  children: React.ReactNode;
  className?: string;
}) {
  const styles =
    variant === "concept"
      ? "border-amber-300 bg-amber-50 text-amber-800"
      : "border-emerald-300 bg-emerald-50 text-emerald-700";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        styles,
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}
