"use client";

import { deleteTodoAction } from "@/app/actions/todo.actions";

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
