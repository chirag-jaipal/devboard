import { Zap } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  project: {
    title: string;
  };
}

interface RecentTasksProps {
  tasks: Task[];
}

const STATUS_STYLES: Record<string, string> = {
  todo: "bg-neutral-100 text-neutral-500",
  "in-progress": "bg-blue-50 text-blue-600",
  "in progress": "bg-blue-50 text-blue-600",
  done: "bg-emerald-50 text-emerald-600",
  completed: "bg-emerald-50 text-emerald-600",
  blocked: "bg-red-50 text-red-500",
};

const PRIORITY_STYLES: Record<string, { dot: string; label: string }> = {
  high: { dot: "bg-red-400", label: "text-red-500" },
  medium: { dot: "bg-amber-400", label: "text-amber-500" },
  low: { dot: "bg-neutral-300", label: "text-neutral-400" },
  urgent: { dot: "bg-red-600", label: "text-red-600" },
};

function priorityStyle(priority: string) {
  return (
    PRIORITY_STYLES[priority.toLowerCase()] ?? {
      dot: "bg-neutral-300",
      label: "text-neutral-400",
    }
  );
}

function statusStyle(status: string) {
  return (
    STATUS_STYLES[status.toLowerCase()] ?? "bg-neutral-100 text-neutral-500"
  );
}

export function RecentTasks({ tasks }: RecentTasksProps) {
  return (
    <section className="bg-white border border-neutral-100 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-neutral-100 flex items-center justify-center">
            <Zap size={14} className="text-neutral-600" strokeWidth={2} />
          </div>
          <h2 className="text-sm font-semibold text-neutral-800">
            Recent Tasks
          </h2>
        </div>
        {tasks.length > 0 && (
          <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        )}
      </div>

      {/* Table Header */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-12 px-5 py-2 bg-neutral-50/80 border-b border-neutral-100">
          <span className="col-span-5 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
            Task
          </span>
          <span className="col-span-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
            Project
          </span>
          <span className="col-span-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
            Priority
          </span>
          <span className="col-span-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 text-right">
            Status
          </span>
        </div>
      )}

      {/* Rows */}
      <div className="divide-y divide-neutral-50">
        {tasks.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-xs text-neutral-400">No tasks yet.</p>
          </div>
        ) : (
          tasks.map((task) => {
            const p = priorityStyle(task.priority);
            return (
              <div
                key={task.id}
                className="grid grid-cols-12 items-center px-5 py-3.5 hover:bg-neutral-50/60 transition-colors"
              >
                {/* Title */}
                <div className="col-span-5 pr-4">
                  <p className="text-sm font-medium text-neutral-800 truncate">
                    {task.title}
                  </p>
                </div>

                {/* Project */}
                <div className="col-span-3 pr-4">
                  <span className="text-xs text-neutral-400 truncate block">
                    {task.project.title}
                  </span>
                </div>

                {/* Priority */}
                <div className="col-span-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.dot}`}
                    />
                    <span
                      className={`text-xs font-medium capitalize ${p.label}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2 flex justify-end">
                  <span
                    className={`text-[10px] font-semibold capitalize px-2 py-0.5 rounded-full ${statusStyle(task.status)}`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
