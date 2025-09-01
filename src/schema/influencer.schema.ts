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

export const formSchemaUpdate = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  platform: z.nativeEnum(Platform),
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username is too long")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "Username can only contain letters, numbers, dots, underscores, and hyphens"
    ),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  followers: z.string().regex(/^\d+$/, "Followers must be a valid number"),
  engagementRate: z.string().regex(/^\d+(\.\d+)?$/, "Invalid engagement rate"),
  country: z
    .string()
    .min(2, "Please select a country")
    .max(2, "Invalid country code"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
});

export type FormData = z.infer<typeof formSchema>;
export type FormDataUpdate = z.infer<typeof formSchemaUpdate>;
