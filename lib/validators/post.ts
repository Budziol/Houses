import z from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Pole nie może być puste"),
  slug: z.string().min(1, "Pole nie może być puste"),
  excerpt: z.string().min(1, "Pole nie może być puste"),
  published: z.preprocess((val) => val === "true", z.boolean()),
  coverImage: z
    .any()
    .refine((file) => {
      // Jeśli to nie jest plik (np. null/undefined), przejdź dalej (opcjonalne)
      if (!(file instanceof File)) return true;
      // Jeśli plik ma rozmiar 0, to znaczy, że user nic nie wybrał w edycji -> przejdź dalej
      if (file.size === 0) return true;

      // Jeśli plik istnieje i ma rozmiar, sprawdź formaty
      const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];
      return acceptedTypes.includes(file.type);
    }, "Dozwolone formaty to .jpg, .png, .webp")
    .refine((file) => {
      if (!(file instanceof File) || file.size === 0) return true;
      // Sprawdź rozmiar tylko dla nowych plików
      return file.size <= 5 * 1024 * 1024;
    }, "Maksymalny rozmiar zdjęcia to 5MB"),
  content: z.string().min(10, "Treść musi mieć min. 10 znaków"),
  originalSlug: z.string().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;
