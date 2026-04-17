import { z } from "zod";

export const sizeOptions = [
  { value: "80-100", label: "80–100" },
  { value: "100-120", label: "100–120" },
  { value: "120-140", label: "120–140" },
] as const;

const sizeValues = sizeOptions.map((opt) => opt.value) as [
  (typeof sizeOptions)[number]["value"],
  ...(typeof sizeOptions)[number]["value"][],
];

export const quotationSchema = z.object({
  name: z.string().min(1, "Pole nie może być puste"),
  email: z.email("Niepoprawny email"),
  phone: z
    .string()
    .min(9, "Numer za krótki")
    .regex(/^[0-9+\-\s]+$/, "Niepoprawny numer telefonu"),

  size: z.enum(sizeValues, {
    message: "Wybierz zakres",
  }),
  message: z.string().min(10, "Wiadomość musi mieć min. 10 znaków"),
});

export type QuotationFormData = z.infer<typeof quotationSchema>;
