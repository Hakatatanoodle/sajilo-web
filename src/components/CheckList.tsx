import { Check } from "@/components/icons";
import { cn } from "@/lib/cn";

const spacingStyles = {
  compact: "space-y-2",
  default: "space-y-2.5",
  relaxed: "space-y-3.5",
} as const;

type CheckListProps = {
  items: readonly string[];
  spacing?: keyof typeof spacingStyles;
  /** Extra classes for the check icons (color); defaults to brand mint. */
  iconClassName?: string;
  /** Classes for the list itself — typically margins (mt-*, …). */
  className?: string;
};

/**
 * Checklist with the shared check-bullet pattern used on the services page,
 * the case-study pages, and the about strip.
 */
export function CheckList({
  items,
  spacing = "default",
  iconClassName = "text-mint",
  className,
}: CheckListProps) {
  return (
    <ul className={cn(spacingStyles[spacing], className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
          <Check className={cn("mt-0.5 size-4 shrink-0", iconClassName)} />
          {item}
        </li>
      ))}
    </ul>
  );
}