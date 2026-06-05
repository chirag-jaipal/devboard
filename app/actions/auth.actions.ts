"use server";

import { signIn, signOut } from "@/auth";
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
    return {
      error: "Please provide valid registration details.",
    };
  }

  try {
    await registerUser(validated.data);
  } catch {
    return {
      error: "An account with this email already exists.",
    };
  }

  redirect("/login");
}

export async function loginUserAction(formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = loginUserSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      error: "Please enter valid credentials.",
    };
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid email or password.",
          };

        default:
          return {
            error: "Something went wrong. Please try again.",
          };
      }
    }

    throw error;
  }
}

export async function logoutUserAction() {
  await signOut({
    redirectTo: "/",
  });
}
