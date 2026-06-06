import { TaskStatus } from "@prisma/client";
import { CreateTodoInput, GetTodos } from "@/types/todo.types";
import { prisma } from "../db";

export async function createTodo(data: CreateTodoInput) {
  const { title, description, userId } = data;

  return prisma.todo.create({
    data: {
      title,
      description,
      userId,
    },
  });
}

export async function getTodos(userId: string): Promise<GetTodos[]> {
  return prisma.todo.findMany({
    where: {
      userId,
    },

    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateTodoStatus(
  todoId: string,
  userId: string,
  status: TaskStatus,
) {
  const todo = await prisma.todo.findFirst({
    where: {
      id: todoId,
      userId,
    },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      status,
    },
  });
}

export async function deleteTodo(todoId: string, userId: string) {
  const todo = await prisma.todo.findFirst({
    where: {
      id: todoId,
      userId,
    },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
}
