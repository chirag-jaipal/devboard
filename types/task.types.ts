import { createTaskSchemaType } from "@/schemas/task.schema";

export type CreateTaskInput = createTaskSchemaType & {
  projectId: string;
};
