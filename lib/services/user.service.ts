import { prisma } from "../db";

export async function getUserStats(userId: string) {
  const [projects, tasks, todos] = await Promise.all([
    prisma.project.count({
      where: {
        userId,
      },
    }),

    prisma.task.count({
      where: {
        project: {
          userId,
        },
      },
    }),

    prisma.todo.count({
      where: {
        userId,
      },
    }),
  ]);

  return { projects, tasks, todos };
}
