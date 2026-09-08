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
  return (
    <div
      role="region"
      aria-label={`Live demo: ${title}`}
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_80px_-30px_rgba(31,39,64,0.28)]",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-[#f7f6f2] px-3.5 py-2">
        <span className="size-2 rounded-full bg-[#FF5F57]" />
        <span className="size-2 rounded-full bg-[#FEBC2E]" />
        <span className="size-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 flex-1 truncate rounded-md bg-navy/[0.06] px-2.5 py-0.5 text-[10px] text-fg-faint">
          {urlLabel}
        </span>
      </div>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className={cn(
          "block w-full border-0 bg-white",
          heightClass ?? "h-[540px] sm:h-[680px]"
        )}
      />
    </div>
  );
}
