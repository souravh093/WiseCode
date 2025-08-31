import { Platform } from "@prisma/client";
import z from "zod/v3";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  platform: z.nativeEnum(Platform, {
    required_error: "Please select a platform",
  }),
  username: z
    .string()
    .min(1, "Username is required")
    .max(255, "Username is too long"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  followers: z.coerce
    .number()
    .min(0, "Followers cannot be negative")
    .int("Must be a whole number"),
  engagement_rate: z.coerce
    .number()
    .min(0, "Engagement rate cannot be negative")
    .max(100, "Engagement rate cannot exceed 100%"),
  country: z.string().length(2, "Country must be a 2-character code"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
});

export type FormData = z.infer<typeof formSchema>;
