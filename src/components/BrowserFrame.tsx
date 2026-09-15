import type { ReactNode } from "react";
import { BrowserChrome } from "@/components/BrowserChrome";
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
        "overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_80px_-30px_rgba(31,39,64,0.28)]",
        className
      )}
    >
      <BrowserChrome url={url} />
      <div aria-hidden className={cn("relative aspect-[16/10]", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
