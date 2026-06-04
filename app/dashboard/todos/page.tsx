import { DeleteTodoButton } from "@/components/todos/delete-todo-button";
import { TodoStatusSelect } from "@/components/todos/todo-status-select";
import { getTodos } from "@/lib/services/todo.service";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { CheckSquare } from "lucide-react";

export default async function TodosPage() {
  const user = await getCurrentUser();
  if (!user)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-neutral-400">Please login to continue.</p>
      </div>
    );

  const todos = await getTodos(user.id);

  const doneCount = todos.filter((t) => t.status === "DONE").length;
  const pendingCount = todos.length - doneCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
            Personal
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Todos
          </h1>
          {todos.length > 0 && (
            <p className="text-sm text-neutral-400 mt-1">
              {pendingCount} pending &middot; {doneCount} done
            </p>
          )}
        </div>
        <Link
          href="/dashboard/todos/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors shrink-0"
        >
          <span className="text-lg leading-none font-light">+</span>
          New Todo
        </Link>
      </div>

      {/* Empty State */}
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-neutral-100 text-center">
          <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
            <CheckSquare
              size={20}
              strokeWidth={1.5}
              className="text-neutral-400"
            />
          </div>
          <p className="text-sm font-medium text-neutral-700 mb-1">
            No todos yet
          </p>
          <p className="text-xs text-neutral-400 mb-6">
            Capture personal tasks outside of your projects.
          </p>
          <Link
            href="/dashboard/todos/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            <span className="text-lg leading-none font-light">+</span>
            Create your first todo
          </Link>
        </div>
      ) : (
        /* Todo List */
        <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_200px_56px] gap-4 px-5 py-2.5 border-b border-neutral-100 bg-neutral-50/70">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              Task
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 hidden sm:block">
              Status
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 text-right">
              &nbsp;
            </span>
          </div>

          {/* Rows */}
          <ul className="divide-y divide-neutral-100">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_200px_56px] gap-4 items-center px-5 py-3.5 hover:bg-neutral-50/60 transition-colors"
              >
                {/* Title */}
                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium truncate transition-colors ${
                      todo.status === "DONE"
                        ? "text-neutral-400 line-through"
                        : "text-neutral-800"
                    }`}
                  >
                    {todo.title}
                  </p>
                </div>

                {/* Status select */}
                <div className="hidden sm:block">
                  <TodoStatusSelect
                    todoId={todo.id}
                    currentStatus={todo.status}
                  />
                </div>

                {/* Delete */}
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <DeleteTodoButton todoId={todo.id} />
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/70">
            <p className="text-xs text-neutral-400">
              {todos.length} {todos.length === 1 ? "todo" : "todos"} total
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
