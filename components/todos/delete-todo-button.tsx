"use client";

import { deleteTodoAction } from "@/app/actions/todo.actions";
import { Trash2 } from "lucide-react";

interface DeleteTodoButtonProps {
  todoId: string;
}

export function DeleteTodoButton({ todoId }: DeleteTodoButtonProps) {
  const deleteTodo = deleteTodoAction.bind(null, todoId);

  return (
    <form action={deleteTodo}>
      <button
        type="submit"
        onClick={(e) => {
          const confirmed = confirm("Delete this todo?");
          if (!confirmed) e.preventDefault();
        }}
        className="p-1.5 rounded-md text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        aria-label="Delete todo"
      >
        <Trash2 size={14} strokeWidth={1.8} />
      </button>
    </form>
  );
}
