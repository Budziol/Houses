"use server";

import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export type ActionState = {
  success?: boolean;
  errors?: any;
};

export async function editOffer(prevState: ActionState, formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie");
  }

  return {
    success: false,
    errors: { general: ["Coś poszło nie tak"] },
  };
}
