"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteAdmin(id: string) {
  try {
    await db.user.delete({
      where: { id },
    });

    // To jest kluczowe! Next.js odświeży dane w AdminsTable
    revalidatePath("/admin/users");

    return { success: true };
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
