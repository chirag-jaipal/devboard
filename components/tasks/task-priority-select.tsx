"use client";

import { updateTaskPriorityAction } from "@/app/actions/task.actions";
import { TaskPriority } from "@/app/generated/prisma/client";

interface TaskPriorityProps {
  taskId: string;
  projectId: string;
  currentPriority: TaskPriority;
}

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  LOW: "text-neutral-400",
  MEDIUM: "text-amber-500",
  HIGH: "text-red-500",
};

const PRIORITY_DOT: Record<TaskPriority, string> = {
  LOW: "bg-neutral-300",
  MEDIUM: "bg-amber-400",
  HIGH: "bg-red-400",
};

export function TaskPrioritySelect({
  taskId,
  projectId,
  currentPriority,
}: TaskPriorityProps) {
  const updatePriority = updateTaskPriorityAction.bind(null, taskId, projectId);

  return (
    <form action={updatePriority} className="flex items-center gap-1.5">
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${PRIORITY_DOT[currentPriority] ?? "bg-neutral-300"}`}
      />
      <select
        name="priority"
        defaultValue={currentPriority}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`
          text-xs font-medium
          appearance-none cursor-pointer bg-transparent
          focus:outline-none
          transition-colors
          ${PRIORITY_STYLES[currentPriority] ?? "text-neutral-400"}
        `}
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
    </form>
  );
}
