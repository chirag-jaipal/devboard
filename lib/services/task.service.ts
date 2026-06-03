import { CreateTaskInput } from "@/types/task.types";
import { prisma } from "../db";

export async function createTask(data: CreateTaskInput): Promise<void> {
  const { title, description, projectId } = data;

  await prisma.task.create({
    data: {
      title,
      description,
      projectId,
    },
  });
}

export async function getTasksByProjectId(projectId: string, userId: string) {
  return prisma.task.findMany({
    where: {
      projectId,

      project: {
        userId,
      },
    },

    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      dueDate: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}
