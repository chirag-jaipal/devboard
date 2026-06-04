import { CreateTodoSchemaType } from "@/schemas/todo.schema";

export type CreateTodoInput = CreateTodoSchemaType & {
  userId: string;
};
