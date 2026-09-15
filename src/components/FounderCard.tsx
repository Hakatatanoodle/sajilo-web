import { IconChip } from "@/components/IconChip";
import { User } from "@/components/icons";

type FounderCardProps = {
  name: string;
  role: string;
  focus: string;
};

/** Founder profile card — shared by the home AboutStrip and the About page. */
export function FounderCard({ name, role, focus }: FounderCardProps) {
  return (
    <div className="h-full rounded-2xl border border-line bg-surface p-6">
      <IconChip shape="circle">
        <User className="size-5" />
      </IconChip>
      <p className="mt-4 font-display text-lg font-bold text-fg">{name}</p>
      <p className="text-sm text-accent">{role}</p>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{focus}</p>
    </div>
  );
}