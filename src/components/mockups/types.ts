import type { Project } from "@/content/work";

/** Shared types for the CSS project miniatures. */

/**
 * The miniature palette is the same shape as a project's palette in
 * src/content/work.ts — derived from it, so the two can never drift apart.
 */
export type MiniPalette = Project["palette"];

export type MiniProps = {
  palette: MiniPalette;
  className?: string;
};
