"use server";

import { db } from "@/lib/prisma";
import { adminsSchema } from "@/lib/validators/admins";
import { mapErrors } from "@/utils/formatErrors";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { createSession } from "@/app/actions/sessions";

export type ActionState = {
  success?: boolean;
  errors?: any;
};

export async function createAdmin(prevState: ActionState, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = adminsSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: mapErrors(result.error),
    };
  }

  try {
    const foundUser = await db.user.findUnique({
      where: { email: result.data.email },
    });

    if (foundUser) {
      return {
        success: false,
        errors: { general: ["Konto z podanym adresem email już istnieje"] },
      };
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
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

  redirect("/admin/admini");
}
