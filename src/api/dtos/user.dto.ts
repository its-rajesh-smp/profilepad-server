import { z } from "zod";

export const RegisterUserDto = z.object({
  email: z
    .string()
    .email()
    .refine((val) => val.includes("@"), {
      message: "Email must contain an @ symbol.",
    }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  dashboardSlug: z
    .string()
    .min(3, {
      message: "Dashboard slug must be at least 3 characters long.",
    })
    .max(32, {
      message: "Dashboard slug must be at most 32 characters long.",
    }),
});
