import { z } from "zod";

export const registerSchema = z.object({
  data: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password cannot be empty"),
    slug: z.string().min(1, "Slug cannot be empty"), // Ensures slug is not empty
  }),
});
