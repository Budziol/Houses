"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

export async function deletePost(id: string) {
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
    const post = await db.post.findUnique({
      where: { id },
      select: { coverImage: true },
    });

    if (!post) {
      return { success: false, errors: { general: ["Post nie istnieje."] } };
    }

    if (post.coverImage && post.coverImage.startsWith("/uploads/")) {
      try {
        const filePath = join(process.cwd(), "public", post.coverImage);
        await unlink(filePath);
      } catch (err) {
        console.error("Nie udało się usunąć pliku z dysku:", err);
      }
    }

    await db.post.delete({
      where: { id },
    });

    revalidatePath("/admin/blog");

    redirect("/admin/blog");
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
