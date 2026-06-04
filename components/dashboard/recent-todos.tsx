import { ListTodo } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  status: string;
}

interface RecentTodosProps {
  todos: Todo[];
}

const STATUS_CONFIG: Record<
  string,
  { ring: string; fill: string; label: string }
> = {
  done: {
    ring: "border-emerald-400",
    fill: "bg-emerald-400",
    label: "text-emerald-600",
  },
  completed: {
    ring: "border-emerald-400",
    fill: "bg-emerald-400",
    label: "text-emerald-600",
  },
  "in-progress": {
    ring: "border-blue-400",
    fill: "bg-blue-400",
    label: "text-blue-500",
  },
  "in progress": {
    ring: "border-blue-400",
    fill: "bg-blue-400",
    label: "text-blue-500",
  },
  todo: {
    ring: "border-neutral-300",
    fill: "bg-transparent",
    label: "text-neutral-400",
  },
  pending: {
    ring: "border-neutral-300",
    fill: "bg-transparent",
    label: "text-neutral-400",
  },
};

function todoStatusConfig(status: string) {
  return (
    STATUS_CONFIG[status.toLowerCase()] ?? {
      ring: "border-neutral-300",
      fill: "bg-transparent",
      label: "text-neutral-400",
    }
  );
}

export function RecentTodos({ todos }: RecentTodosProps) {
  return (
    <section className="bg-white border border-neutral-100 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-neutral-100 flex items-center justify-center">
            <ListTodo size={14} className="text-neutral-600" strokeWidth={2} />
          </div>
          <h2 className="text-sm font-semibold text-neutral-800">
            Recent Todos
          </h2>
        </div>
        <Link
          href="/dashboard/todos"
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-700 transition-colors font-medium"
        >
          View all
          <ArrowRight size={12} strokeWidth={2} />
        </Link>
      </div>

      {/* List */}
      <div className="divide-y divide-neutral-50">
        {todos.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-xs text-neutral-400">No todos yet.</p>
          </div>
        ) : (
          todos.map((todo) => {
            const cfg = todoStatusConfig(todo.status);
            const isDone =
              todo.status.toLowerCase() === "done" ||
              todo.status.toLowerCase() === "completed";
            return (
              <div
                key={todo.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-neutral-50/60 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Checkbox indicator */}
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${cfg.ring} ${cfg.fill}`}
                  >
                    {isDone && (
                      <svg
                        width="8"
                        height="6"
                        viewBox="0 0 8 6"
                        fill="none"
                        className="text-white"
                      >
                        <path
                          d="M1 3L3 5L7 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <p
                    className={`text-sm font-medium truncate ${
                      isDone
                        ? "line-through text-neutral-300"
                        : "text-neutral-700"
                    }`}
                  >
                    {todo.title}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-semibold capitalize ml-4 shrink-0 ${cfg.label}`}
                >
                  {todo.status}
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
