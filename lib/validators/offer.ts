import z from "zod";

const fileValidator = (
  maxSize: number,
  acceptedTypes: string[],
  errorMessage?: string,
) =>
  z
    .any()
    .refine(
      (file) => {
        // Jeśli nie ma pliku (np. w edycji), przechodzi walidację
        if (!(file instanceof File) || file.size === 0) return true;

        // Sprawdzanie typu MIME (dla zdjęć) lub rozszerzenia (dla modeli)
        const isAcceptedType = acceptedTypes.includes(file.type);
        const isAcceptedExtension = acceptedTypes.some((ext) =>
          file.name.endsWith(ext),
        );

        return isAcceptedType || isAcceptedExtension;
      },
      errorMessage || `Dozwolone formaty: ${acceptedTypes.join(", ")}`,
    )
    .refine(
      (file) => {
        if (!(file instanceof File) || file.size === 0) return true;
        return file.size <= maxSize;
      },
      `Maksymalny rozmiar to ${maxSize / (1024 * 1024)}MB`,
    );

export const offerSchema = z.object({
  title: z.string().min(1, "Pole nie może być puste"),
  slug: z.string().min(1, "Pole nie może być puste"),
  coverImage: fileValidator(
    5 * 1024 * 1024,
    ["image/jpeg", "image/png", "image/webp"],
    "Zdjęcie musi być w formacie JPG, PNG lub WebP",
  ),
  images: z
    .array(z.any())
    .refine((files) => {
      return files.every((file) => {
        if (!(file instanceof File) || file.size === 0) return true;
        return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      });
    }, "Jedno lub więcej zdjęć ma niepoprawny format")
    .optional(),
  description: z.string().min(1, "Pole nie może być puste"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Cena musi być większa od 0"),
  ),
  size: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1, "Metraż musi być większy od 0"),
  ),
  bedrooms: z.preprocess((val) => Number(val), z.number().int().min(0)),
  bathrooms: z.preprocess((val) => Number(val), z.number().int().min(0)),
  garage: z.preprocess((val) => val === "true" || val === true, z.boolean()),
  balcony: z.preprocess((val) => Number(val), z.number().int().min(0)),
  story: z.preprocess((val) => Number(val), z.number().int().min(0)),
  model: fileValidator(
    20 * 1024 * 1024,
    [".glb"], // Tutaj sprawdzamy po rozszerzeniu
    "Model musi mieć rozszerzenie .glb i max 20MB",
  ),
  published: z.preprocess((val) => val === "true", z.boolean()),
  badge: z.string(),
});

export type OfferFormData = z.infer<typeof offerSchema>;
