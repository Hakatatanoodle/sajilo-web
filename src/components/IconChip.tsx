import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const sizeStyles = { sm: "size-10", md: "size-11" } as const;
const shapeStyles = {
  square: "rounded-xl border-accent/25",
  circle: "rounded-full border-accent/30",
} as const;

type IconChipProps = {
  children: ReactNode;
  size?: keyof typeof sizeStyles;
  shape?: keyof typeof shapeStyles;
  className?: string;
};

/** Bordered accent tile that frames an inline icon (shared across pages). */
export function IconChip({
  children,
  size = "md",
  shape = "square",
  className,
}: IconChipProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center border bg-accent/10 text-accent",
        sizeStyles[size],
        shapeStyles[shape],
        className
      )}
    >
      {children}
    </span>
  );
}