import { TaskPriority, TaskStatus } from "@/app/generated/prisma/client";
import { z } from "zod";

export const createTaskSchema = z.object({
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

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;

export const UpdateTaskStatusSchema = z.object({
  status: z.nativeEnum(TaskStatus),
});

export type UpdateTaskStatusSchemaType = z.infer<typeof UpdateTaskStatusSchema>;

export const UpdateTaskPrioritySchema = z.object({
  priority: z.nativeEnum(TaskPriority),
});

export type UpdateTaskPrioritySchemaType = z.infer<
  typeof UpdateTaskPrioritySchema
>;
