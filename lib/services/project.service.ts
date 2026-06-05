import { ProjectStatus } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/db";
import { CreateProjectInput } from "@/types/project.types";

export async function getProjects(userId: string) {
  const projects = await prisma.project.findMany({
    where: {
      userId,
    },

    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,

      _count: {
        select: {
          tasks: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return projects.map((project) => ({
    id: project.id,
    title: project.title,
    status: project.status,
    createdAt: project.createdAt,
    taskCount: project._count.tasks,
  }));
}

export async function createProject(data: CreateProjectInput): Promise<void> {
  const { title, description, userId } = data;

  await prisma.project.create({
    data: {
      title,
      description,
      userId,
    },
  });
}

export async function getProjectById(projectId: string, userId: string) {
  const existingProject = await prisma.project.findFirst({
    where: {
      userId,
      id: projectId,
    },

    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      createdAt: true,

      _count: {
        select: {
          tasks: true,
        },
      },
    },
  });

  if (!existingProject) return null;

  return {
    id: existingProject.id,
    title: existingProject.title,
    description: existingProject.description,
    status: existingProject.status,
    createdAt: existingProject.createdAt,
    taskCount: existingProject._count.tasks,
  };
}

export async function updateProjectStatus(
  projectId: string,
  userId: string,
  status: ProjectStatus,
) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      status,
    },
  });
}

export async function deleteProject(projectId: string, userId: string) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
}
