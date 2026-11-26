type FounderCardProps = {
  name: string;
  role: string;
  focus: string;
};

/**
 * Founder profile — a working-file entry, not a stock portrait: monogram,
 * name, role and focus on a hairline. No invented photos.
 */
export function FounderCard({ name, role, focus }: FounderCardProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="flex h-full gap-5 border-t border-line pt-6">
      <span
        aria-hidden
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-sm tracking-wide text-brand"
      >
        {initials}
      </span>
      <div>
        <p className="font-display text-xl font-medium tracking-tight text-fg">
          {name}
        </p>
        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent">
          {role.replace("Founder — ", "")}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{focus}</p>
      </div>
    </div>
  );
}
