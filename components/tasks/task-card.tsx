import { TaskPriority, TaskStatus } from "@prisma/client";
import { TaskStatusSelect } from "./task-status-select";
import { TaskPrioritySelect } from "./task-priority-select";
import { DeleteTaskButton } from "./delete-task-button";
import { Calendar } from "lucide-react";

interface TaskCardProps {
  taskId: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
}

export function TaskCard({
  taskId,
  projectId,
  title,
  status,
  priority,
  dueDate,
}: TaskCardProps) {
  const isDone = status === "DONE";

  return (
    <div className="grid grid-cols-12 items-center px-5 py-3.5 hover:bg-neutral-50/60 transition-colors group gap-2">
      {/* Title */}
      <div className="col-span-5 flex items-center gap-3 min-w-0">
        {/* Done indicator dot */}
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            isDone ? "bg-emerald-400" : "bg-neutral-200"
          }`}
        />
        <div className="min-w-0">
          <p
            className={`text-sm font-medium truncate transition-colors ${
              isDone ? "line-through text-neutral-300" : "text-neutral-800"
            }`}
          >
            {title}
          </p>
          {dueDate && (
            <div className="flex items-center gap-1 mt-0.5">
              <Calendar
                size={10}
                className="text-neutral-400"
                strokeWidth={2}
              />
              <span className="text-[10px] text-neutral-400">
                {new Date(dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="col-span-3">
        <TaskStatusSelect
          key={`${taskId}-status`}
          taskId={taskId}
          projectId={projectId}
          currentStatus={status}
        />
      </div>

      {/* Priority */}
      <div className="col-span-3">
        <TaskPrioritySelect
          key={`${taskId}-priority`}
          taskId={taskId}
          projectId={projectId}
          currentPriority={priority}
        />
      </div>

      {/* Delete */}
      <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <DeleteTaskButton taskId={taskId} projectId={projectId} />
      </div>
    </div>
  );
}
