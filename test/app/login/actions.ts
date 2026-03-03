// app/login/actions.ts
'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin() {
  const cookieStore = await cookies();

  // Set the token for the middleware to see
  cookieStore.set("auth-token", "active-session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  // Now redirect from the server side
  redirect("/admin");
}