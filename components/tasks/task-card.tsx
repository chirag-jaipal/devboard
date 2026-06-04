import { TaskPriority, TaskStatus } from "@/app/generated/prisma/client";
import { TaskStatusSelect } from "./task-status-select";

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
        taskId={taskId}
        projectId={projectId}
        currentStatus={status}
      />
      <p>Priority: {priority}</p>
      {dueDate && <p>Due: {dueDate.toLocaleString()}</p>}
    </div>
  );
}
