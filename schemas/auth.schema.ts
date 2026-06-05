import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  email: z.email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type registerUserSchemaType = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
});

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;
