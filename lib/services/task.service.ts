import { CreateTaskInput } from "@/types/task.types";
import { prisma } from "../db";
import { TaskStatus } from "@/app/generated/prisma/client";

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
  });
}

export async function updateTaskStatus(
  taskId: string,
  userId: string,
  status: TaskStatus,
) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,

      project: {
        userId,
      },
    },
  });

  if (!task) throw new Error("Task not found");

  await prisma.task.update({
    where: {
      id: taskId,
    },

    data: {
      status,
    },
  });
}
