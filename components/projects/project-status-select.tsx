"use client";

import { updateProjectStatusAction } from "@/app/actions/project.actions";
import { ProjectStatus } from "@prisma/client";
import { ChevronDown } from "lucide-react";

interface ProjectStatusProps {
  projectId: string;
  currentStatus: ProjectStatus;
}

const STATUS_STYLES: Record<
  ProjectStatus,
  { select: string; chevron: string }
> = {
  PLANNING: {
    select: "bg-neutral-100 text-neutral-600 border-neutral-200",
    chevron: "text-neutral-400",
  },
  ACTIVE: {
    select: "bg-emerald-50 text-emerald-700 border-emerald-100",
    chevron: "text-emerald-400",
  },
  COMPLETED: {
    select: "bg-blue-50 text-blue-700 border-blue-100",
    chevron: "text-blue-400",
  },
  ARCHIVED: {
    select: "bg-neutral-100 text-neutral-500 border-neutral-200",
    chevron: "text-neutral-300",
  },
};

export function ProjectStatusSelect({
  projectId,
  currentStatus,
}: ProjectStatusProps) {
  const updateStatus = updateProjectStatusAction.bind(null, projectId);
  const styles = STATUS_STYLES[currentStatus] ?? STATUS_STYLES.PLANNING;

  return (
    <form action={updateStatus} className="relative inline-flex items-center">
      <select
        name="status"
        defaultValue={currentStatus}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`
          appearance-none cursor-pointer
          text-[11px] font-semibold uppercase tracking-wider
          pl-2.5 pr-6 py-1 rounded-full border
          outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-200
          transition-colors
          ${styles.select}
        `}
      >
        <option value="PLANNING">Planning</option>
        <option value="ACTIVE">Active</option>
        <option value="COMPLETED">Completed</option>
        <option value="ARCHIVED">Archived</option>
      </select>
      <ChevronDown
        size={11}
        strokeWidth={2.5}
        className={`absolute right-2 pointer-events-none ${styles.chevron}`}
      />
    </form>
  );
}
