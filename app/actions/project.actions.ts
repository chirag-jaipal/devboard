"use server";

import { getCurrentUser } from "@/lib/auth";
import { createProject } from "@/lib/services/project.service";
import { CreateProjectSchema } from "@/schemas/project.schema";

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
}
