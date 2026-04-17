"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { offerSchema } from "@/lib/validators/offer";
import { postSchema } from "@/lib/validators/post";
import { mapErrors } from "@/utils/formatErrors";
import { mkdir, unlink, writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import { join } from "path";

export type ActionState = {
  success?: boolean;
  errors?: any;
};

export async function createOffer(prevState: ActionState, formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie");
  }

  const data = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    coverImage: formData.get("coverImage") as File,
    images: formData.getAll("images") as File[],
    description: formData.get("description"),
    price: formData.get("price"),
    size: formData.get("size"),
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    garage: formData.get("garage"),
    balcony: formData.get("balcony"),
    story: formData.get("story"),
    model: formData.get("model") as File,
    published: formData.get("published"),
    badge: formData.get("badge"),
  };

  const result = offerSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: mapErrors(result.error),
    };
  }

  console.log(user);

  const {
    title,
    slug,
    coverImage,
    images,
    description,
    price,
    size,
    bedrooms,
    bathrooms,
    garage,
    balcony,
    story,
    model,
    published,
    badge,
  } = result.data;

  let imageUrl: string | null = null;
  let galleryUrls: string[] = [];
  let modelUrl: string | null = null;

  let forcedPublished = published;

  if (user.role !== "SUPERADMIN") {
    forcedPublished = false;
  }

  const savedFiles: string[] = [];

  try {
    const foundSlug = await db.offer.findFirst({ where: { slug } });

    if (foundSlug) {
      return {
        success: false,
        errors: { slug: ["Znaleziono oferte o tym samym url"] },
      };
    }

    const uploadDir = join(process.cwd(), `public/uploads/offer/${title}`);
    await mkdir(uploadDir, { recursive: true });

    // 4. Zapis Okładki (Cover Image)
    if (coverImage instanceof File && coverImage.size > 0) {
      const bytes = await coverImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `cover-${Date.now()}-${coverImage.name.replace(/\s+/g, "_")}`;
      const path = join(uploadDir, filename);

      await writeFile(path, buffer);
      savedFiles.push(path);
      imageUrl = `/uploads/offer/${title}/${filename}`;
    }

    // 5. Zapis Galerii (Multiple Images)
    if (images && images.length > 0) {
      for (const file of images) {
        if (file instanceof File && file.size > 0) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const filename = `gallery-${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
          const path = join(uploadDir, filename);

          await writeFile(path, buffer);
          savedFiles.push(path);
          galleryUrls.push(`/uploads/offer/${title}/${filename}`);
        }
      }
    }

    if (model && model.size > 0) {
      const buffer = Buffer.from(await model.arrayBuffer());
      const filename = `model-${Date.now()}-${model.name.replace(/\s+/g, "_")}`;
      const path = join(
        process.cwd(),
        `public/uploads/offer/${title}/models`,
        filename,
      );

      await mkdir(join(process.cwd(), `public/uploads/offer/${title}/models`), {
        recursive: true,
      });
      await writeFile(path, buffer);
      savedFiles.push(path);
      modelUrl = `/uploads/offer/${title}/models/${filename}`;
    }

    await db.offer.create({
      data: {
        title,
        slug,
        coverImage: imageUrl,
        images: galleryUrls,
        description,
        price: price.toString(),
        size,
        bedrooms,
        bathrooms,
        garage,
        balcony,
        story,
        model: modelUrl,
        badge,
        published: forcedPublished,
        publishedAt: forcedPublished ? new Date() : null,
        authorId: user.id,
      },
    });
  } catch (error) {
    for (const filePath of savedFiles) {
      try {
        await unlink(filePath);
      } catch (e) {
        console.error("Błąd przy usuwaniu pliku:", filePath);
      }
    }

    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error(error);
    return {
      success: false,
      errors: { general: ["Coś poszło nie tak"] },
    };
  }
  redirect("/admin/oferta");
}
