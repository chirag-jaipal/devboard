"use client";

import { deleteTaskAction } from "@/app/actions/task.actions";

interface DeleteTaskProps {
  taskId: string;
  projectId: string;
}

export function DeleteTaskButton({ taskId, projectId }: DeleteTaskProps) {
  const deleteTask = deleteTaskAction.bind(null, taskId, projectId);

  return (
    <form action={deleteTask}>
      <button
        type="submit"
        onClick={(e) => {
          const confirmed = confirm("Delete this task?");

          if (!confirmed) {
            e.preventDefault();
          }
        }}
      >
        Delete
      </button>
    </form>
  );
}
