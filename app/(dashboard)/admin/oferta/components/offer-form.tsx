"use client";

import { PrimaryButton } from "@/components/buttons";
import { postStatusOptions } from "@/utils/options";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { editOffer } from "../[slug]/actions/editOffer";
import { createOffer } from "../nowa/actions/createOffer";

type Props = {
  defaultValues?: {
    title: string;
    slug: string;
    coverImage: string;
    images: string[];
    description: string;
    price: string;
    size: number;
    bedrooms: number;
    bathrooms: number;
    garage: boolean;
    balcony: number;
    story: number;
    model: string;
    published: boolean;
    badge: string;
  };
  editing?: boolean;
};

interface FormState {
  success: boolean;
  errors: {
    title?: string[];
    slug?: string[];
    coverImage?: string[];
    images?: string[];
    description?: string[];
    price?: string[];
    size?: string[];
    bedrooms?: string[];
    bathrooms?: string[];
    garage?: string[];
    balcony?: string[];
    story?: string[];
    model?: string[];
    published?: string[];
    badge?: string[];
  };
}

const initialState: FormState = {
  success: false,
  errors: {},
};

const OfferForm = ({ defaultValues, editing = false }: Props) => {
  const actionFn = editing ? editOffer : createOffer;

  const [state, formAction, isPending] = useActionState(actionFn, initialState);

  const [localErrors, setLocalErrors] = useState<any>({});

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name;

    setLocalErrors((prev: any) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValues?.coverImage || null,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Walidacja po stronie klienta (opcjonalna, ale dobra dla UX)
      if (file.size > 5 * 1024 * 1024) {
        alert("Plik jest za duży! Max 5MB.");
        e.target.value = ""; // Resetuj input
        return;
      }

      // Tworzymy tymczasowy URL dla podglądu
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const [imagesPreviews, setImagesPreviews] = useState<string[]>(
    defaultValues?.images ?? [], // Jeśli images to tablica, po prostu ją przypisz
  );

  const handleMultipleFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);

      // Generujemy podglądy
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));

      // Łączymy z poprzednimi lub zastępujemy (zależnie od UX jaki chcesz)
      setImagesPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    // 1. Usuwamy z podglądu (to już masz)
    setImagesPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));

    // 2. Usuwamy z samego inputu HTML
    const input = document.getElementById("images") as HTMLInputElement;
    if (!input || !input.files) return;

    const dt = new DataTransfer();
    const files = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (indexToRemove !== i) {
        dt.items.add(file); // Dodajemy wszystkie pliki OPRÓCZ tego usuwanego
      }
    }

    input.files = dt.files; // Nadpisujemy listę plików w inpucie nową paczką
  };

  useEffect(() => {
    setLocalErrors(state?.errors);

    if (state?.errors) {
      setPreviewUrl(null);
      setImagesPreviews([]);
    }
  }, [state]);

  return (
    <form action={formAction} className="w-full flex flex-col gap-6">
      {editing && (
        <input type="hidden" name="originalSlug" value={defaultValues?.slug} />
      )}
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-3">
          Tytuł
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Tytuł oferty"
          defaultValue={defaultValues?.title}
          onFocus={handleFocus}
          className={`${localErrors.title ? "border-red-500" : ""}`}
        />
        <AnimatePresence>
          {localErrors.title && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">* {localErrors.title[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="slug" className="mb-3">
          Link
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          placeholder="url"
          defaultValue={defaultValues?.slug}
          onFocus={handleFocus}
          className={`${localErrors.slug ? "border-red-500" : ""}`}
        />
        <AnimatePresence>
          {localErrors.slug && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">* {localErrors.slug[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-3">
          Opis
        </label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="tekst"
          defaultValue={defaultValues?.description}
          onFocus={handleFocus}
          className={`${localErrors.description ? "border-red-500" : ""}`}
        />
        <AnimatePresence>
          {localErrors.description && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">
                * {localErrors.description[0]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="published" className="mb-3">
          Status publikacji
        </label>
        <select
          id="published"
          name="published"
          defaultValue={String(defaultValues?.published ?? false)}
        >
          {postStatusOptions.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
        <AnimatePresence>
          {localErrors.published && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">
                * {localErrors.published[0]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="coverImage">Zdjęcie okładkowe</label>
        <input
          id="coverImage"
          name="coverImage"
          type="file"
          accept="image/*"
          onFocus={handleFocus}
          onChange={handleFileChange}
          className={localErrors?.coverImage ? "border-red-500" : ""}
        />
        <AnimatePresence>
          {localErrors.coverImage && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">
                * {localErrors.coverImage[0]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {previewUrl && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <Image
                src={previewUrl}
                alt="Podgląd"
                width={1440}
                height={1440}
                className="rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="images" className="mb-3">
          Galeria zdjęć
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple // KLUCZOWE: pozwala wybrać wiele plików
          onChange={handleMultipleFilesChange}
          onFocus={handleFocus}
          className={localErrors?.images ? "border-red-500" : ""}
        />

        {/* Siatka z podglądami */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <AnimatePresence>
            {imagesPreviews.map((url, index) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative aspect-video"
              >
                <Image
                  src={url}
                  alt={`Podgląd ${index}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {localErrors.images && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">* {localErrors.images[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="badge" className="mb-3">
          Label
        </label>
        <input
          id="badge"
          name="badge"
          type="text"
          placeholder="np. nowy"
          defaultValue={defaultValues?.badge}
          onFocus={handleFocus}
          className={`${localErrors.badge ? "border-red-500" : ""}`}
        />
        <AnimatePresence>
          {localErrors.badge && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">* {localErrors.badge[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="price" className="mb-3">
          Cena
        </label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="np. 0"
          step="0.01"
          min="0"
          onFocus={handleFocus}
          defaultValue={defaultValues?.price}
          className={localErrors?.price ? "border-red-500" : ""}
        />
        <AnimatePresence>
          {localErrors.price && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">* {localErrors.price[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="size" className="mb-3">
          Metry
        </label>
        <input
          type="number"
          id="size"
          name="size"
          placeholder="np. 80"
          min="0"
          step="1" // Wymusza tylko liczby całkowite
          onKeyDown={(e) => {
            // Blokujemy kropkę i przecinek, żeby wymusić Int
            if (e.key === "." || e.key === ",") {
              e.preventDefault();
            }
          }}
          onFocus={handleFocus}
          defaultValue={defaultValues?.size}
          className={localErrors?.size ? "border-red-500" : ""}
        />
        <AnimatePresence>
          {localErrors.size && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">* {localErrors.size[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="bedrooms" className="mb-3">
          Sypialnie
        </label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          placeholder="np. 0"
          min="0"
          step="1" // Wymusza tylko liczby całkowite
          onKeyDown={(e) => {
            // Blokujemy kropkę i przecinek, żeby wymusić Int
            if (e.key === "." || e.key === ",") {
              e.preventDefault();
            }
          }}
          onFocus={handleFocus}
          defaultValue={defaultValues?.bedrooms}
          className={localErrors?.bedrooms ? "border-red-500" : ""}
        />
        <AnimatePresence>
          {localErrors.bedrooms && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">
                * {localErrors.bedrooms[0]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="bathrooms" className="mb-3">
          Łazienki
        </label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          placeholder="np. 0"
          min="0"
          step="1" // Wymusza tylko liczby całkowite
          onKeyDown={(e) => {
            // Blokujemy kropkę i przecinek, żeby wymusić Int
            if (e.key === "." || e.key === ",") {
              e.preventDefault();
            }
          }}
          onFocus={handleFocus}
          defaultValue={defaultValues?.bathrooms}
          className={localErrors?.bathrooms ? "border-red-500" : ""}
        />
        <AnimatePresence>
          {localErrors.bathrooms && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">
                * {localErrors.bathrooms[0]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="balcony" className="mb-3">
          Balkony
        </label>
        <input
          type="number"
          id="balcony"
          name="balcony"
          placeholder="np. 0"
          min="0"
          step="1" // Wymusza tylko liczby całkowite
          onKeyDown={(e) => {
            // Blokujemy kropkę i przecinek, żeby wymusić Int
            if (e.key === "." || e.key === ",") {
              e.preventDefault();
            }
          }}
          onFocus={handleFocus}
          defaultValue={defaultValues?.balcony}
          className={localErrors?.balcony ? "border-red-500" : ""}
        />
        <AnimatePresence>
          {localErrors.balcony && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">
                * {localErrors.balcony[0]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="garage" className="mb-3">
          Garaż
        </label>
        <select
          id="garage"
          name="garage"
          defaultValue={String(defaultValues?.garage ?? false)}
        >
          <option value={String(true)}>Tak</option>
          <option value={String(false)}>Nie</option>
        </select>
        <AnimatePresence>
          {localErrors.garage && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">* {localErrors.garage[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col">
        <label htmlFor="model" className="mb-3 font-medium">
          Model 3D (.glb)
        </label>
        <div className="relative">
          <input
            id="model"
            name="model"
            type="file"
            accept=".glb" // Ograniczamy wybór w oknie systemowym
            onFocus={handleFocus}
            className={`w-full p-2 border rounded-md ${
              localErrors.model ? "border-red-500" : ""
            }`}
          />
        </div>

        {/* Informacja o wybranym modelu (opcjonalne, bo pliku 3D nie wyświetlisz tak łatwo jak zdjęcia) */}
        <p className="text-gray-400 text-[10px] mt-1">
          Maksymalny rozmiar: 20MB. Format: GLB.
        </p>

        <AnimatePresence>
          {localErrors.model && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">* {localErrors.model[0]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PrimaryButton disabled={isPending} className="" type="submit">
        {isPending ? "Ładowanie..." : "Dodaj"}
      </PrimaryButton>
    </form>
  );
};
export default OfferForm;
