import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Pole nie może być puste"),
  email: z.email("Niepoprawny email"),
  phone: z
    .string()
    .min(9, "Numer jest za krótki")
    .regex(/^[0-9+\-\s]+$/, "Niepoprawny numer telefonu"),
  message: z.string().min(10, "Wiadomość musi mieć min. 10 znaków"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
