import z from "zod";

export const loginSchema = z.object({
  email: z.email("Niepoprawny email"),
  password: z.string().min(8, "Hasło jest za krótkie"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
