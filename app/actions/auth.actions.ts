"use server";

import { registerUser } from "@/lib/services/auth.service";
import { registerUserSchema } from "@/schemas/register.schema";
import { redirect } from "next/navigation";

export async function registerUserAction(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = registerUserSchema.safeParse(rawData);

  if (!validated.success) {
    return;
  }

  await registerUser(validated.data);

  redirect("/login");
}
