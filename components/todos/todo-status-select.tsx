"use client";

import { updateTodoStatusAction } from "@/app/actions/todo.actions";
import { TaskStatus } from "@/app/generated/prisma/client";

interface TodoStatusSelectProps {
  todoId: string;
  currentStatus: TaskStatus;
}

export function TodoStatusSelect({
  todoId,
  currentStatus,
}: TodoStatusSelectProps) {
  const updateStatus = updateTodoStatusAction.bind(null, todoId);

  return (
    <form action={updateStatus}>
      <span>Select:</span>
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
