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
