"use server";

import { signIn } from "@/auth";
import { registerUser } from "@/lib/services/auth.service";
import { loginUserSchema, registerUserSchema } from "@/schemas/auth.schema";
import { AuthError } from "next-auth";
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

export async function loginUserAction(formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = loginUserSchema.safeParse(rawData);

  if (!validated.success) {
    return;
  }

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // switch (error.type) {
      //   case "CredentialsSignin":
      //     return {
      //       error: "Invalid email or password.",
      //     };

      //   default:
      //     return {
      //       error: "Something went wrong. Please try again.",
      //     };
      // }
      return;
    }

    throw error;
  }
}
