"use server";

import { getCurrentUser } from "@/lib/auth";
import {
  createProject,
  deleteProject,
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
  if (!validated.success)
    throw new Error("Please enter a valid project title.");

  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorized");

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
  if (!validated.success) throw new Error("Invalid project status.");

  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await updateProjectStatus(projectId, user.id, validated.data.status);
  redirect(`/dashboard/projects/${projectId}`);
}

export async function deleteProjectAction(projectId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await deleteProject(projectId, user.id);
  redirect("/dashboard/projects");
}
