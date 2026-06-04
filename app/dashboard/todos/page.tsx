import { DeleteTodoButton } from "@/components/todos/delete-todo-button";
import { TodoStatusSelect } from "@/components/todos/todo-status-select";
import { getTodos } from "@/lib/services/todo.service";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function TodosPage() {
  const user = await getCurrentUser();
  if (!user) return <p>Please login to continue.</p>;

  const todos = await getTodos(user.id);

  return (
    <div>
      <h1>Todos</h1>

      <Link href="/dashboard/todos/new">Create Todo</Link>

      <hr />

      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <TodoStatusSelect todoId={todo.id} currentStatus={todo.status} />
            <DeleteTodoButton todoId={todo.id} />
          </div>
        ))
      )}
    </div>
  );
}
