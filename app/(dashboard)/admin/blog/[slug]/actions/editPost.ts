"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { postSchema } from "@/lib/validators/post";
import { mapErrors } from "@/utils/formatErrors";
import { mkdir, unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

export type ActionState = {
  success?: boolean;
  errors?: any;
};

export async function editPost(prevState: ActionState, formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie");
  }

  const data = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    published: formData.get("published"),
    originalSlug: formData.get("originalSlug"),
    coverImage: formData.get("coverImage") as File,
  };

  const result = postSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: mapErrors(result.error),
    };
  }

  const { title, slug, excerpt, content, published, originalSlug, coverImage } =
    result.data;

  let forcedPublished = published;

  if (user.role !== "SUPERADMIN") {
    forcedPublished = false;
  }

  try {
    const foundPost = await db.post.findFirst({
      where: { slug: originalSlug },
    });

    if (!foundPost) {
      return {
        success: false,
        errors: { general: ["Nie znaleziono postu"] },
      };
    }

    if (slug !== foundPost.slug) {
      const existingPostWithSlug = await db.post.findUnique({
        where: { slug: slug },
      });

      if (existingPostWithSlug) {
        return {
          success: false,
          errors: { slug: ["Ten adres URL jest już używany przez inny post"] },
        };
      }
    }

    let finalImageUrl = foundPost.coverImage;

    const hasNewImage = coverImage instanceof File && coverImage.size > 0;

    if (hasNewImage) {
      // 1. Jeśli post miał już zdjęcie, usuwamy stary plik z dysku
      if (
        foundPost.coverImage &&
        foundPost.coverImage.startsWith("/uploads/")
      ) {
        try {
          const oldPath = join(process.cwd(), "public", foundPost.coverImage);
          await unlink(oldPath);
        } catch (err) {
          console.error("Nie udało się usunąć starego zdjęcia:", err);
        }
      }

      // 2. Zapisujemy nowy plik
      const bytes = await coverImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${coverImage.name.replaceAll(" ", "_")}`;
      const uploadDir = join(process.cwd(), "public/uploads");
      const path = join(uploadDir, filename);

      await mkdir(uploadDir, { recursive: true });
      await writeFile(path, buffer);

      finalImageUrl = `/uploads/${filename}`;
    }

    await db.post.update({
      where: {
        slug: result.data.originalSlug,
      },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: finalImageUrl,
        published: forcedPublished,
        publishedAt:
          forcedPublished === foundPost.published
            ? foundPost.publishedAt
            : result.data.published
              ? new Date()
              : null,
        metaTitle: title,
        metaDescription: excerpt,
        authorId: user.id,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error(error);
    return {
      success: false,
      errors: { general: ["Coś poszło nie tak"] },
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${slug}`);
  redirect("/admin/blog");
}
