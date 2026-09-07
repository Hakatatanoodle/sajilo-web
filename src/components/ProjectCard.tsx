import Link from "next/link";
import type { Project } from "@/content/work";
import { ProjectMockup } from "@/components/mockups";
import { Tag } from "@/components/Tag";
import { ArrowUpRight } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Work card used on the home page and the work index.
 * The Concept · Demo tag is always rendered — design.md §26.
 */
export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-2 hover:shadow-[0_24px_60px_-24px_rgba(31,39,64,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className
      )}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden border-b border-line"
        role="img"
        aria-label={`Preview of the ${project.title} concept demo`}
      >
        <ProjectMockup
          kind={project.mockKind}
          palette={project.palette}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <Tag>{project.tag}</Tag>
          <span className="text-xs text-fg-faint">
            {project.industry} · {project.year}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight text-fg">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-fg-muted">{project.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-accent">
          View case study
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
