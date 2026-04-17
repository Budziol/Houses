import { z } from "zod";

export const adminsSchema = z.object({
  name: z.string().min(1, "Pole nie może być puste"),
  email: z.email("Niepoprawny email"),
  password: z.string().min(8, "Hasło jest za krótkie"),
});

export type AdminsFormData = z.infer<typeof adminsSchema>;
