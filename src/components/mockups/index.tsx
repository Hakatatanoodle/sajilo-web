import type { ProjectKind } from "@/content/work";
import { ClientSystemMini } from "./ClientSystemMini";
import { GymMini } from "./GymMini";
import { GenericLocalMini } from "./GenericLocalMini";
import { StoreMini } from "./StoreMini";
import { SweetMini } from "./SweetMini";
import type { MiniPalette, MiniProps } from "./types";

export type { MiniPalette, MiniProps };
export { GenericLocalMini };

const registry: Record<ProjectKind, (props: MiniProps) => React.ReactElement> = {
  "client-system": ClientSystemMini,
  gym: GymMini,
  store: StoreMini,
  sweet: SweetMini,
};

/**
 * Renders the CSS miniature for a project kind. Decorative content — always
 * wrap in a labelled BrowserFrame (role="img").
 */
export function ProjectMockup({
  kind,
  palette,
  className,
}: {
  kind: ProjectKind;
  palette: MiniPalette;
  className?: string;
}) {
  const Mini = registry[kind];
  return <Mini palette={palette} className={className} />;
}

