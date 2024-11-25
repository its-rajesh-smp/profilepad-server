import { z } from "zod";

export const registerSchema = z.object({
  data: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password cannot be empty"),
    slug: z.string().min(1, "Slug cannot be empty"), // Ensures slug is not empty
  }),
});

export const loginSchema = z.object({
  data: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password cannot be empty"),
  }),
});

export const updateUserProfileSchema = z
  .object({
    data: z.object({
      name: z.string().optional(),
      headline: z.any().optional(),
      profileImageSrc: z.string().optional(),
    }),
  })
  .strict();
