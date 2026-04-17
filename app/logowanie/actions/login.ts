"use server";

import { db } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators/login";
import { mapErrors } from "@/utils/formatErrors";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { createSession } from "@/app/actions/sessions";

export type ActionState = {
  success?: boolean;
  errors?: any;
};

export async function login(prevState: ActionState, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: mapErrors(result.error),
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (!user) {
      return {
        success: false,
        errors: { general: ["Błędny email lub hasło"] },
      };
    }

    const isMatch = await bcrypt.compare(result.data.password, user.password);

    if (!isMatch) {
      return {
        success: false,
        errors: { general: ["Błędny email lub hasło"] },
      };
    }

    await createSession(user.id);
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

  redirect("/admin");
}
