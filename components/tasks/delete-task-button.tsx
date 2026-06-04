"use client";

import { deleteTaskAction } from "@/app/actions/task.actions";
import { Trash2 } from "lucide-react";

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
          if (!confirmed) e.preventDefault();
        }}
        className="w-7 h-7 flex items-center justify-center rounded-md text-neutral-300 hover:text-red-500 hover:bg-red-50 transition-colors"
        aria-label="Delete task"
      >
        <Trash2 size={13} strokeWidth={2} />
      </button>
    </form>
  );
}
