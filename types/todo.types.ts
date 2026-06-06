import { CreateTodoSchemaType } from "@/schemas/todo.schema";
import { TaskPriority, TaskStatus } from "@prisma/client";

export type CreateTodoInput = CreateTodoSchemaType & {
  userId: string;
};

export interface GetTodos {
  id: string;
  description: string | null;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
}
