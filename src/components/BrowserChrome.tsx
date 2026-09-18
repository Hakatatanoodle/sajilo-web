/**
 * Traffic-light dots + address bar shared by BrowserFrame (decorative
 * mockups) and LiveDemoFrame (real embedded demos).
 */
export function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-line bg-[#f7f6f2] px-3.5 py-2">
      <span className="size-2 rounded-full bg-[#FF5F57]" />
      <span className="size-2 rounded-full bg-[#FEBC2E]" />
      <span className="size-2 rounded-full bg-[#28C840]" />
      <span className="ml-2 flex-1 truncate rounded-md bg-navy/[0.06] px-2.5 py-0.5 text-xs text-fg-faint">
        {url}
      </span>
    </div>
  );
}