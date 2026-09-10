import type { ProjectKind } from "@/content/work";
import { ClinicMini } from "./ClinicMini";
import { GymMini } from "./GymMini";
import { GenericLocalMini } from "./GenericLocalMini";
import { HotelMini } from "./HotelMini";
import { RestaurantMini } from "./RestaurantMini";
import { StoreMini } from "./StoreMini";
import { SweetMini } from "./SweetMini";
import type { MiniPalette, MiniProps } from "./types";

export type { MiniPalette, MiniProps };
export { GenericLocalMini };

const registry: Record<ProjectKind, (props: MiniProps) => React.ReactElement> = {
  clinic: ClinicMini,
  gym: GymMini,
  hotel: HotelMini,
  restaurant: RestaurantMini,
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

