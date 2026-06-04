"use client";

import { updateTaskStatusAction } from "@/app/actions/task.actions";
import { TaskStatus } from "@/app/generated/prisma/client";

interface TaskStatusSelectProps {
  taskId: string;
  projectId: string;
  currentStatus: TaskStatus;
}

export function TaskStatusSelect({
  taskId,
  projectId,
  currentStatus,
}: TaskStatusSelectProps) {
  const updateStatus = updateTaskStatusAction.bind(null, taskId, projectId);

  return (
    <form action={updateStatus}>
      <span>Status:</span>
      <select
        name="status"
        value={currentStatus}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      >
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
    </form>
  );
}
