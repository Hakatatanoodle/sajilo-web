import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  /**
   * Header eyebrow. A plain string renders as the mono chapter label;
   * pass a node (e.g. a <Tag/>) for a custom one.
   */
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
};

/**
 * Page-level header (h1) — the Open Studio editorial stack: a mono chapter
 * label, a monument display title, and a calm lead. Shared by the work,
 * services, about and contact pages so every route opens with the same voice.
 */
export function PageHeader({ eyebrow, title, lead, className }: PageHeaderProps) {
  return (
    <header className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        typeof eyebrow === "string" ? (
          <p className="chapter">{eyebrow}</p>
        ) : (
          eyebrow
        )
      ) : null}

      <h1
        className={cn(
          "display-lg text-fg",
          eyebrow ? "mt-5" : undefined
        )}
      >
        {title}
      </h1>

      {lead ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
          {lead}
        </p>
      ) : null}
    </header>
  );
}
