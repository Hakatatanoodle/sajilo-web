import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BrowserFrameProps = {
  /** Accessible name for the illustration. */
  title: string;
  url?: string;
  children: ReactNode;
  className?: string;
  /** Override the default 16/10 content box if needed. */
  contentClassName?: string;
};

/**
 * Browser chrome around decorative mockup content. The frame is exposed to
 * assistive tech as a single labelled image; the mockup inside is aria-hidden.
 */
export function BrowserFrame({
  title,
  url = "sajiloweb-demo.build",
  children,
  className,
  contentClassName,
}: BrowserFrameProps) {
  return (
    <div
      role="img"
      aria-label={`Illustrative preview: ${title}`}
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-[#0F0F17] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.03] px-3.5 py-2">
        <span className="size-2 rounded-full bg-[#FF5F57]" />
        <span className="size-2 rounded-full bg-[#FEBC2E]" />
        <span className="size-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.05] px-2.5 py-0.5 text-[10px] text-fg-faint">
          {url}
        </span>
      </div>
      <div aria-hidden className={cn("relative aspect-[16/10]", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
