import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Line = { text: string; accent?: boolean };

/**
 * Headline split into masked words for the load-in reveal (styles in
 * app/hero-navy.css). Server component: the words are real text nodes in a
 * normal <h1>, so screen readers and search engines read it as one sentence.
 * --w / --l (word / line index) drive each word's stagger delay in CSS.
 */
export function SplitHeadline({
  lines,
  className,
}: {
  lines: Line[];
  className?: string;
}) {
  return (
    <h1 className={className}>
      {lines.map((line, l) => {
        const words = line.text.split(" ");
        return (
          <span key={l} className={cn("hl-line", line.accent && "hl-accent")}>
            {words.map((word, w) => (
              <span key={w}>
                <span
                  className="hl-word"
                  style={{ "--w": w, "--l": l } as CSSProperties}
                >
                  <span>{word}</span>
                </span>
                {w < words.length - 1 ? " " : null}
              </span>
            ))}
          </span>
        );
      })}
    </h1>
  );
}
