"use server";

import {
  createTask,
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
  if (!validated.success) {
    return;
    // return {
    //   success: false,
    //   errors: validated.error.flatten().fieldErrors,
    // };
  }

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
  if (!validated.success) {
    return;
    // return {
    //   success: false,
    //   errors: validated.error.flatten().fieldErrors,
    // };
  }

  const user = await getCurrentUser();
  if (!user) {
    // TODO
    return;
  }

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
  if (!validated.success) return;

  const user = await getCurrentUser();
  if (!user) return;

  await updateTaskPriority(taskId, user.id, validated.data.priority);

  redirect(`/dashboard/projects/${projectId}`);
}
