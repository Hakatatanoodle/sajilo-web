"use client";

import { useState } from "react";
import { BrowserChrome } from "@/components/BrowserChrome";
import { cn } from "@/lib/cn";

type LiveDemoFrameProps = {
  /** Path to the demo's entry HTML under /demos/ (public folder). */
  src: string;
  /** Accessible name for the embedded document. */
  title: string;
  /** Fictional display URL for the chrome's address bar. */
  urlLabel: string;
  className?: string;
  /** Override the default viewport height of the embedded demo. */
  heightClass?: string;
};

/**
 * Browser chrome around a REAL, runnable demo embedded from public/demos/.
 *
 * Unlike BrowserFrame (decorative — exposed as one labelled image with its
 * contents aria-hidden), the iframe here is a live, interactive document and
 * is exposed to assistive tech with its own accessible name.
 *
 * A spinner covers the frame until the demo document fires onLoad, so lazy
 * demos never appear as a blank white box (client component — without JS the
 * iframe simply loads as before).
 *
 * The demo files are plain static sites copied verbatim from the source demo
 * folders/zips (see public/demos/README.md). Updating a demo means
 * overwriting those files — same filenames — or running `npm run sync-demos`.
 * No code changes are required.
 */
export function LiveDemoFrame({
  src,
  title,
  urlLabel,
  className,
  heightClass,
}: LiveDemoFrameProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      role="region"
      aria-label={`Live demo: ${title}`}
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_80px_-30px_rgba(31,39,64,0.28)]",
        className
      )}
    >
      <BrowserChrome url={urlLabel} />
      <div className={cn("relative", heightClass ?? "h-[540px] sm:h-[680px]")}>
        {!loaded ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface">
            <p className="flex items-center gap-3 text-sm text-fg-faint">
              <span className="size-4 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
              Loading demo…
            </p>
          </div>
        ) : null}
        <iframe
          src={src}
          title={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="block h-full w-full border-0 bg-white"
        />
      </div>
    </div>
  );
}
