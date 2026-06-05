import { CheckSquare, Calendar, ArrowUpRight } from "lucide-react";
import { DeleteProjectButton } from "./delete-project-button";

interface ProjectCardProps {
  projectId: string;
  title: string;
  status: string;
  createdAt: Date | string;
  taskCount: number;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; pill: string }
> = {
  active: {
    label: "Active",
    dot: "bg-emerald-400",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  completed: {
    label: "Completed",
    dot: "bg-blue-400",
    pill: "bg-blue-50 text-blue-700 border-blue-100",
  },
  archived: {
    label: "Archived",
    dot: "bg-neutral-300",
    pill: "bg-neutral-100 text-neutral-500 border-neutral-200",
  },
  paused: {
    label: "Paused",
    dot: "bg-amber-400",
    pill: "bg-amber-50 text-amber-700 border-amber-100",
  },
  draft: {
    label: "Draft",
    dot: "bg-neutral-300",
    pill: "bg-neutral-100 text-neutral-500 border-neutral-200",
  },
};

function getStatusConfig(status: string) {
  return (
    STATUS_CONFIG[status.toLowerCase()] ?? {
      label: status,
      dot: "bg-neutral-300",
      pill: "bg-neutral-100 text-neutral-500 border-neutral-200",
    }
  );
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ProjectCard({
  projectId,
  title,
  status,
  createdAt,
  taskCount,
}: ProjectCardProps) {
  const s = getStatusConfig(status);

  return (
    <div className="relative flex flex-col gap-4 bg-white border border-neutral-100 rounded-xl p-5 h-full hover:border-neutral-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 group-hover:-translate-y-0.5">
      {/* Top row: status badge + arrow icon */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${s.pill}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DeleteProjectButton projectId={projectId} />

          <div className="w-7 h-7 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center">
            <ArrowUpRight
              size={13}
              className="text-neutral-500"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-neutral-800 leading-snug line-clamp-2 group-hover:text-neutral-900 transition-colors">
          {title}
        </h3>
      </div>

      {/* Footer: task count + created date */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-50">
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <CheckSquare size={12} strokeWidth={2} />
          <span>
            {taskCount} task{taskCount !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <Calendar size={12} strokeWidth={2} />
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
