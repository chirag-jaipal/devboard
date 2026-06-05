import { registerUserSchemaType } from "@/schemas/auth.schema";
import { prisma } from "../db";

import bcrypt from "bcryptjs";

export async function registerUser({
  name,
  email,
  password,
}: registerUserSchemaType) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) throw new Error("User already exists");

  const hashPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  return { id: user.id };
}

export async function validateUserCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return null;
  }

  return user;
}
