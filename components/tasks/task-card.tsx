import { TaskPriority, TaskStatus } from "@/app/generated/prisma/client";
import { TaskStatusSelect } from "./task-status-select";
import { TaskPrioritySelect } from "./task-priority-select";
import { DeleteTaskButton } from "./delete-task-button";

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
  return (
    <div>
      <h3>{title}</h3>
      <TaskStatusSelect
        key={projectId}
        taskId={taskId}
        projectId={projectId}
        currentStatus={status}
      />
      <TaskPrioritySelect
        key={taskId}
        taskId={taskId}
        projectId={projectId}
        currentPriority={priority}
      />
      {dueDate && <p>Due: {dueDate.toLocaleString()}</p>}
      <DeleteTaskButton taskId={taskId} projectId={projectId} />
    </div>
  );
}
