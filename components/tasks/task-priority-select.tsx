"use client";

import { updateTaskPriorityAction } from "@/app/actions/task.actions";
import { TaskPriority } from "@/app/generated/prisma/client";

interface TaskPriorityProps {
  taskId: string;
  projectId: string;
  currentPriority: TaskPriority;
}

export function TaskPrioritySelect({
  taskId,
  projectId,
  currentPriority,
}: TaskPriorityProps) {
  const updatePriority = updateTaskPriorityAction.bind(null, taskId, projectId);

  return (
    <form action={updatePriority}>
      <span>Priority:</span>
      <select
        name="priority"
        value={currentPriority}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
    </form>
  );
}
