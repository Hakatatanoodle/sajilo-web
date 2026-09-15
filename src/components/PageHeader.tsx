import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  /**
   * Header eyebrow. A plain string renders as the standard brand eyebrow
   * (small caps, accent color); pass a node (e.g. a <Tag/>) for a custom one.
   */
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
};

/**
 * Page-level header (h1) — the standard eyebrow / title / lead stack shared
 * by the work, services, about, and contact pages, with the same reveal
 * rhythm (0ms / 80ms / 160ms). The h2 counterpart for mid-page sections is
 * SectionHeading.
 */
export function PageHeader({ eyebrow, title, lead, className }: PageHeaderProps) {
  return (
    <header className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <Reveal>
          {typeof eyebrow === "string" ? (
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-accent">
              {eyebrow}
            </p>
          ) : (
            eyebrow
          )}
        </Reveal>
      ) : null}

      <Reveal delay={80}>
        <h1
          className={cn(
            "font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl",
            typeof eyebrow === "string" ? "mt-3" : "mt-5"
          )}
        >
          {title}
        </h1>
      </Reveal>

      {lead ? (
        <Reveal delay={160}>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">{lead}</p>
        </Reveal>
      ) : null}
    </header>
  );
}