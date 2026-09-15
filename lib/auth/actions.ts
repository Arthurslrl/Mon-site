"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS, createSessionToken } from "./session";

export interface LoginState {
  error?: string;
}

function isSafeNext(next: string): boolean {
  return next.startsWith("/") && !next.startsWith("//");
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/commandes");

  if (!email || !password) {
    return { error: "Merci de renseigner ton email et ton mot de passe." };
  }

  const db = getDb();
  const admin = db.prepare("SELECT * FROM admin_users WHERE email = ?").get(email) as
    | { id: number; email: string; password_hash: string }
    | undefined;

  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return { error: "Identifiants incorrects." };
  }

  const token = createSessionToken(admin.email);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect(isSafeNext(next) ? next : "/commandes");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/commandes/login");
}
