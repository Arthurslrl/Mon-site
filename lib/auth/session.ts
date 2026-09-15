import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE_NAME = "commandes_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 jours
export const SESSION_MAX_AGE_SECONDS = SESSION_DURATION_MS / 1000;

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET n'est pas défini. Ajoute-le dans .env.local (voir .env.example)."
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createSessionToken(email: string): string {
  const expires = Date.now() + SESSION_DURATION_MS;
  const payload = Buffer.from(JSON.stringify({ email, expires })).toString("base64url");
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export interface Session {
  email: string;
}

export function verifySessionToken(token: string | undefined | null): Session | null {
  if (!token) return null;
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return null;

  const payload = token.slice(0, dotIndex);
  const signature = token.slice(dotIndex + 1);
  const expected = sign(payload);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const { email, expires } = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      email: string;
      expires: number;
    };
    if (typeof email !== "string" || typeof expires !== "number") return null;
    if (Date.now() > expires) return null;
    return { email };
  } catch {
    return null;
  }
}
