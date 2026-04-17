"use server";

import { contactSchema } from "@/lib/validators/contact";
import { mapErrors } from "@/utils/formatErrors";
import z from "zod";

export async function submitContact(formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: mapErrors(result.error),
    };
  }

  // 👉 tutaj np. wysyłka maila / zapis do DB
  console.log("VALID DATA:", result.data);

  return { success: true };
}
