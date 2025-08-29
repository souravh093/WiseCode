import z from "zod/v3";

export const loginSchema = z.object({
  email: z
    .string()
    .min(0, { message: "Email is required" })
    .email("Invalid email address"),
  password: z.string().min(1, { message: "Password is required" }),
});
