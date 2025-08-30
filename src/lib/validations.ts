import z from "zod/v3";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const influencerCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  platform: z.enum(["INSTAGRAM", "TIKTOK", "YOUTUBE", "X"], {
    message: "Platform must be INSTAGRAM, TIKTOK, YOUTUBE, or X",
  }),
  username: z.string().min(1, "Username is required"),
  followers: z.number().min(0, "Followers must be a positive number"),
  engagement_rate: z
    .number()
    .min(0)
    .max(100, "Engagement rate must be between 0 and 100"),
  country: z.string().length(2, "Country must be a 2-letter ISO code"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  email: z.string().email("Invalid email address").optional(),
});

export const influencerUpdateSchema = influencerCreateSchema.partial();

export type LoginInput = z.infer<typeof loginSchema>;
export type InfluencerCreateInput = z.infer<typeof influencerCreateSchema>;
export type InfluencerUpdateInput = z.infer<typeof influencerUpdateSchema>;
