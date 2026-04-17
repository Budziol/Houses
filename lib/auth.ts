import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "./prisma";

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) return null;

  const session = await db.session.findUnique({
    where: { id: sessionId },
    include: {
      user: true,
    },
  });

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    return null;
  }

  session.user.password = "";

  return session.user;
});
