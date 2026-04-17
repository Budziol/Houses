"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { postSchema } from "@/lib/validators/post";
import { mapErrors } from "@/utils/formatErrors";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

export type ActionState = {
  success?: boolean;
  errors?: any;
};

export async function createPost(prevState: ActionState, formData: FormData) {
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
    coverImage: formData.get("coverImage") as File,
  };

  const result = postSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: mapErrors(result.error),
    };
  }

  const { title, slug, excerpt, content, published, coverImage } = result.data;

  let imageUrl: string | null = null;

  let forcedPublished = published;

  if (user.role !== "SUPERADMIN") {
    forcedPublished = false;
  }

  try {
    if (coverImage instanceof File && coverImage.size > 0) {
      const bytes = await coverImage.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${coverImage.name.replaceAll(" ", "_")}`;
      const uploadDir = join(process.cwd(), "public/uploads");
      const path = join(uploadDir, filename);

      // Upewnij się, że folder istnieje
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path, buffer);

      imageUrl = `/uploads/${filename}`;
    }

    await db.post.create({
      data: {
        title: title,
        slug: slug,
        excerpt: excerpt,
        content: content,
        coverImage: imageUrl,
        published: forcedPublished,
        publishedAt: forcedPublished ? new Date() : null,
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
  revalidatePath("/blog");
  redirect("/admin/blog");
}
