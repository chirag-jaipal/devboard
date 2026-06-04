"use server";

import { getCurrentUser } from "@/lib/auth";
import {
  createTodo,
  deleteTodo,
  updateTodoStatus,
} from "@/lib/services/todo.service";
import {
  createTodoSchema,
  updateTodoStatusSchema,
} from "@/schemas/todo.schema";

import { redirect } from "next/navigation";

export async function createTodoAction(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const validated = createTodoSchema.safeParse(rawData);
  if (!validated.success) return;

  const user = await getCurrentUser();
  if (!user) return;

  const todoData = {
    title: validated.data.title,
    description: validated.data.description,
    userId: user.id,
  };

  await createTodo(todoData);

  redirect(`/dashboard/todos`);
}

export async function updateTodoStatusAction(
  todoId: string,
  formData: FormData,
) {
  const rawData = {
    status: formData.get("status"),
  };

  const validated = updateTodoStatusSchema.safeParse(rawData);
  if (!validated.success) return;

  const user = await getCurrentUser();
  if (!user) return;

  await updateTodoStatus(todoId, user.id, validated.data.status);

  redirect("/dashboard/todos");
}

export async function deleteTodoAction(todoId: string) {
  const user = await getCurrentUser();
  if (!user) return;

  await deleteTodo(todoId, user.id);

  redirect("/dashboard/todos");
}
