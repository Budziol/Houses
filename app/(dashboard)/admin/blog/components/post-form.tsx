"use client";

import { postStatusOptions } from "@/utils/options";
import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useState } from "react";
import { PrimaryButton } from "../../../../../components/buttons";
import { createPost } from "@/app/(dashboard)/admin/blog/nowy/actions/createPost";
import { editPost } from "../[slug]/actions/editPost";
import Image from "next/image";

type Props = {
  defaultValues?: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    published: boolean;
    metaTitle: string;
    metaDescription: string;
  };
  editing?: boolean;
};

interface FormState {
  success: boolean;
  errors: {
    title?: string[];
    slug?: string[];
    excerpt?: string[];
    content?: string[];
    coverImage?: string[];
    published?: string[];
  };
}

const initialState: FormState = {
  success: false,
  errors: {},
};

const MotionImage = motion.create(Image);

const PostForm = ({ defaultValues, editing = false }: Props) => {
  const actionFn = editing ? editPost : createPost;

  const [state, formAction, isPending] = useActionState(actionFn, initialState);

  const [localErrors, setLocalErrors] = useState<any>({});

  useEffect(() => {
    setLocalErrors(state?.errors);
  }, [state]);

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
          placeholder="Tytuł posta"
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
        <label htmlFor="excerpt" className="mb-3">
          Krótki opis
        </label>
        <input
          id="excerpt"
          name="excerpt"
          type="text"
          placeholder="tekst"
          defaultValue={defaultValues?.excerpt}
          onFocus={handleFocus}
          className={`${localErrors.excerpt ? "border-red-500" : ""}`}
        />
        <AnimatePresence>
          {localErrors.excerpt && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">
                * {localErrors.excerpt[0]}
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
      <div className="flex flex-col h-full">
        <label htmlFor="content" className="mb-3">
          Treść
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Treść posta"
          onFocus={handleFocus}
          defaultValue={defaultValues?.content}
          className={`min-h-[800px] resize-none overflow-auto h-full ${localErrors.content ? "border-red-500" : ""}`}
        />
        <AnimatePresence>
          {localErrors.content && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden mt-2"
            >
              <p className="text-text-sub text-xs">
                * {localErrors.content[0]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PrimaryButton disabled={isPending} className="" type="submit">
        {isPending ? "Ładowanie..." : editing ? "Edytuj" : "Dodaj"}
      </PrimaryButton>
    </form>
  );
};
export default PostForm;
