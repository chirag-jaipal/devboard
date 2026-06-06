import { ProjectStatus } from "@prisma/client";
import { ProjectStatusSelect } from "./project-status-select";
import { Calendar, CheckSquare } from "lucide-react";

interface ProjectDetailsProps {
  title: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: Date;
  taskCount: number;
  projectId: string;
}

const STATUS_CONFIG: Record<
  string,
  { dot: string; pill: string; label: string }
> = {
  ACTIVE: {
    dot: "bg-emerald-400",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-100",
    label: "Active",
  },
  COMPLETED: {
    dot: "bg-blue-400",
    pill: "bg-blue-50 text-blue-700 border-blue-100",
    label: "Completed",
  },
  ARCHIVED: {
    dot: "bg-neutral-300",
    pill: "bg-neutral-100 text-neutral-500 border-neutral-200",
    label: "Archived",
  },
  PAUSED: {
    dot: "bg-amber-400",
    pill: "bg-amber-50 text-amber-700 border-amber-100",
    label: "Paused",
  },
  DRAFT: {
    dot: "bg-neutral-300",
    pill: "bg-neutral-100 text-neutral-500 border-neutral-200",
    label: "Draft",
  },
};

function getStatusConfig(status: string) {
  return (
    STATUS_CONFIG[status] ??
    STATUS_CONFIG[status.toUpperCase()] ?? {
      dot: "bg-neutral-300",
      pill: "bg-neutral-100 text-neutral-500 border-neutral-200",
      label: status,
    }
  );
}

export function ProjectDetails({
  projectId,
  title,
  description,
  status,
  createdAt,
  taskCount,
}: ProjectDetailsProps) {
  const s = getStatusConfig(status);

  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-6 space-y-5">
      {/* Top: Status badge */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${s.pill}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </span>
      </div>

      {/* Title + Description */}
      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold text-neutral-900 tracking-tight leading-snug">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-100" />

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {/* Status Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-400">Status</span>
          <ProjectStatusSelect projectId={projectId} currentStatus={status} />
        </div>

        {/* Task count */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <CheckSquare size={13} strokeWidth={2} className="text-neutral-400" />
          <span>
            <span className="font-semibold text-neutral-700">{taskCount}</span>{" "}
            task{taskCount !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Created date */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <Calendar size={13} strokeWidth={2} className="text-neutral-400" />
          <span>
            Created{" "}
            <span className="font-medium text-neutral-700">
              {createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
