/** Shared types for the CSS project miniatures. */
export type MiniPalette = {
  heroFrom: string;
  heroTo: string;
  base: string;
  ink: string;
  accent: string;
};

export type MiniProps = {
  palette: MiniPalette;
  className?: string;
};
