"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteSession } from "./sessions";

export const logout = async () => {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    throw new Error("Błąd");
  }

  await deleteSession(sessionId);

  redirect("/");
};
