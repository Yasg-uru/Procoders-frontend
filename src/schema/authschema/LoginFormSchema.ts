import { z } from "zod";
export const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "password must be atleas 5 characters"),
});
