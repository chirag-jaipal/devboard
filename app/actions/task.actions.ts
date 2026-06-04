"use server";

import { createTask, updateTaskStatus } from "@/lib/services/task.service";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import {
  createTaskSchema,
  UpdateTaskStatusSchema,
} from "@/schemas/task.schema";

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

  revalidatePath(`/dashboard/projects/${projectId}`);
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

  console.log("revalidating...");
  revalidatePath(`/dashboard/projects/${projectId}`);
}
