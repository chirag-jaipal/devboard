"use server";

import {
  createTask,
  deleteTask,
  updateTaskPriority,
  updateTaskStatus,
} from "@/lib/services/task.service";
import { getCurrentUser } from "@/lib/auth";
import {
  createTaskSchema,
  UpdateTaskPrioritySchema,
  UpdateTaskStatusSchema,
} from "@/schemas/task.schema";

import { redirect } from "next/navigation";

export async function createTaskAction(projectId: string, formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const validated = createTaskSchema.safeParse(rawData);
  if (!validated.success) throw new Error("Please enter a valid task title.");

  const taskData = {
    title: validated.data.title,
    description: validated.data.description,
    projectId: projectId,
  };

  await createTask(taskData);
  redirect(`/dashboard/projects/${projectId}`);
}

export async function updateTaskStatusAction(
  taskId: string,
  projectId: string,
  formData: FormData,
) {
  const rawData = {
    status: formData.get("status"),
  };

  const validated = UpdateTaskStatusSchema.safeParse(rawData);
  if (!validated.success) throw new Error("Invalid task status.");

  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorized");

  await updateTaskStatus(taskId, user.id, validated.data.status);
  redirect(`/dashboard/projects/${projectId}`);
}

export async function updateTaskPriorityAction(
  taskId: string,
  projectId: string,
  formData: FormData,
) {
  const rawData = {
    priority: formData.get("priority"),
  };

  const validated = UpdateTaskPrioritySchema.safeParse(rawData);
  if (!validated.success) throw new Error("Invalid task priority.");

  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorized");

  await updateTaskPriority(taskId, user.id, validated.data.priority);
  redirect(`/dashboard/projects/${projectId}`);
}

export async function deleteTaskAction(taskId: string, projectId: string) {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorized");

  await deleteTask(taskId, user.id);
  redirect(`/dashboard/projects/${projectId}`);
}
