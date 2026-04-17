"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { rm, unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

export async function deleteoffer(id: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie");
  }

  if (user.role !== "SUPERADMIN") {
    return {
      success: false,
      errors: { general: ["Brak uprawnień"] },
    };
  }

  try {
    const offer = await db.offer.findUnique({
      where: { id },
      select: {
        coverImage: true,
        images: true,
        model: true,
      },
    });

    if (!offer) {
      return { success: false, errors: { general: ["Post nie istnieje."] } };
    }

    const filesToDelete: string[] = [];

    if (offer.coverImage) filesToDelete.push(offer.coverImage);
    if (offer.model) filesToDelete.push(offer.model);

    // 3. TUTAJ ZMIANA:
    // Jeśli post.images to już string[], po prostu dodaj go do listy
    if (offer.images && Array.isArray(offer.images)) {
      filesToDelete.push(...offer.images);
    }

    // 3. Usuwanie plików z dysku
    for (const fileUrl of filesToDelete) {
      if (fileUrl.startsWith("/uploads/")) {
        try {
          const filePath = join(process.cwd(), "public", fileUrl);
          await unlink(filePath);
        } catch (err) {
          console.error(`Nie udało się usunąć pliku: ${fileUrl}`, err);
        }
      }
    }

    // 4. Opcjonalne: Usuwanie folderu oferty (jeśli chcesz posprzątać puste foldery)
    // UWAGA: zadziała tylko jeśli ścieżka zawiera tytuł tak jak w Twoim zapisie
    if (offer.coverImage) {
      try {
        // Wyciągamy ścieżkę do folderu nadrzędnego (np. public/uploads/offer/Tytul)
        const folderPath = join(
          process.cwd(),
          "public",
          offer.coverImage,
          "..",
        );
        // rm z recursive usunie też podfolder /models
        await rm(folderPath, { recursive: true, force: true });
      } catch (err) {
        console.error("Nie udało się usunąć folderu oferty:", err);
      }
    }

    await db.offer.delete({
      where: { id },
    });

    revalidatePath("/admin/oferta");

    redirect("/admin/oferta");
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
}
