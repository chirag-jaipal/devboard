"use server";

import { getCurrentUser } from "@/lib/auth";
import {
  createProject,
  updateProjectStatus,
} from "@/lib/services/project.service";
import {
  CreateProjectSchema,
  UpdateProjectStatusSchema,
} from "@/schemas/project.schema";

import { redirect } from "next/navigation";

export async function createProjectAction(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const validated = CreateProjectSchema.safeParse(rawData);
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

  const projectData = {
    title: validated.data.title,
    description: validated.data.description,
    userId: user.id,
  };

  await createProject(projectData);

  redirect("/dashboard/projects");
}

export async function updateProjectStatusAction(
  projectId: string,
  formData: FormData,
) {
  const rawData = {
    status: formData.get("status"),
  };

  const validated = UpdateProjectStatusSchema.safeParse(rawData);

  if (!validated.success) {
    return;
  }

  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  await updateProjectStatus(projectId, user.id, validated.data.status);

  redirect(`/dashboard/projects/${projectId}`);
}
