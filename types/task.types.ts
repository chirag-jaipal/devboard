import { createTaskSchemaType } from "@/schemas/task.schema";
import { TaskPriority, TaskStatus } from "@prisma/client";

export type CreateTaskInput = createTaskSchemaType & {
  projectId: string;
};

export interface ProjectTask {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  createdAt: Date;
}
