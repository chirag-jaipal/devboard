"use client";

import { updateTaskStatusAction } from "@/app/actions/task.actions";
import { TaskStatus } from "@prisma/client";

interface TaskStatusSelectProps {
  taskId: string;
  projectId: string;
  currentStatus: TaskStatus;
}

const STATUS_STYLES: Record<TaskStatus, string> = {
  TODO: "bg-neutral-100 text-neutral-600 border-neutral-200",
  IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-100",
  DONE: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export function TaskStatusSelect({
  taskId,
  projectId,
  currentStatus,
}: TaskStatusSelectProps) {
  const updateStatus = updateTaskStatusAction.bind(null, taskId, projectId);

  return (
    <form action={updateStatus}>
      <select
        name="status"
        defaultValue={currentStatus}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`
          text-[11px] font-semibold uppercase tracking-wider
          px-2.5 py-1 rounded-full border
          appearance-none cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-neutral-200
          transition-colors
          ${STATUS_STYLES[currentStatus] ?? "bg-neutral-100 text-neutral-500 border-neutral-200"}
        `}
      >
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
    </form>
  );
}
