import { prisma } from "../db";

export async function getDashboardStats(userId: string) {
  const [
    totalProjects,
    activeProjects,
    totalTasks,
    completedTasks,
    totalTodos,
  ] = await Promise.all([
    prisma.project.count({
      where: {
        userId,
      },
    }),

    prisma.project.count({
      where: {
        userId,
        status: "ACTIVE",
      },
    }),

    prisma.task.count({
      where: {
        project: {
          userId,
        },
      },
    }),

    prisma.task.count({
      where: {
        project: {
          userId,
        },

        status: "DONE",
      },
    }),

    prisma.todo.count({
      where: {
        userId,
      },
    }),
  ]);

  return {
    totalProjects,
    activeProjects,
    totalTasks,
    completedTasks,
    totalTodos,
  };
}

export async function getRecentProjects(userId: string) {
  return prisma.project.findMany({
    where: {
      userId,
    },

    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 5,
  });
}

export async function getRecentTasks(userId: string) {
  return prisma.task.findMany({
    where: {
      project: {
        userId,
      },
    },

    select: {
      id: true,
      title: true,
      status: true,
      priority: true,

      project: {
        select: {
          title: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 5,
  });
}

export async function getRecentTodos(userId: string) {
  return prisma.todo.findMany({
    where: {
      userId,
    },

    select: {
      id: true,
      title: true,
      status: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 5,
  });
}
