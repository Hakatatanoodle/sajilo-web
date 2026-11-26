import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Mid-page section header in the Open Studio voice: mono chapter label,
 * display title, optional lead. The h1 counterpart is PageHeader.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className={cn("chapter", align === "center" && "justify-center")}>
        {eyebrow}
      </p>
      <h2 className="display-md mt-4 text-fg">{title}</h2>
      {lead ? (
        <p className="mt-4 text-base leading-relaxed text-fg-muted">{lead}</p>
      ) : null}
    </div>
  );
}
