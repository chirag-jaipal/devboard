"use server";

import { createTask } from "@/lib/services/task.service";
import { createTaskSchema } from "@/schemas/task.schema";
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
