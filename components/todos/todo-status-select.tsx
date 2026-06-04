"use client";

import { updateTodoStatusAction } from "@/app/actions/todo.actions";
import { TaskStatus } from "@/app/generated/prisma/client";

interface TodoStatusSelectProps {
  todoId: string;
  currentStatus: TaskStatus;
}

const statusStyles: Record<TaskStatus, string> = {
  TODO: "bg-neutral-100 text-neutral-600",
  IN_PROGRESS: "bg-blue-50 text-blue-600",
  DONE: "bg-emerald-50 text-emerald-600",
};

export function TodoStatusSelect({
  todoId,
  currentStatus,
}: TodoStatusSelectProps) {
  const updateStatus = updateTodoStatusAction.bind(null, todoId);

  return (
    <form action={updateStatus}>
      <select
        name="status"
        defaultValue={currentStatus}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`
          w-full text-xs font-medium px-2.5 py-1.5 rounded-md border-0
          appearance-none cursor-pointer outline-none
          focus:ring-2 focus:ring-neutral-200 transition-colors
          ${statusStyles[currentStatus]}
        `}
      >
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
    </form>
  );
}
