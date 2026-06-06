import { z } from "zod";
import { TaskStatus } from "@prisma/client";

export const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(65, "Title cannot exceed 65 characters")
    .describe("Title of the project"),

  description: z
    .string()
    .max(500)
    .optional()
    .describe("Description of the project"),
});

export type CreateTodoSchemaType = z.infer<typeof createTodoSchema>;

export const updateTodoStatusSchema = z.object({
  status: z.nativeEnum(TaskStatus),
});

export type UpdateTodoStatusSchemaType = z.infer<typeof updateTodoStatusSchema>;
