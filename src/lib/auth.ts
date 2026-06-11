/**
 * Minimal admin auth — a single shared password (env ADMIN_PASSWORD) and a
 * signed, httpOnly session cookie. No database, no external library.
 *
 * Set in your env / hosting dashboard:
 *   ADMIN_PASSWORD         the password the owner types to log in
 *   ADMIN_SESSION_SECRET   a long random string used to sign the cookie
 *
 * SERVER ONLY.
 */
import { cookies } from "next/headers";
import crypto from "node:crypto";

export const SESSION_COOKIE = "rcc_admin";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD || // fallback so it still works if only the password is set
    "rocking-c-dev-secret-change-me"
  );
}

/** Is admin login configured at all? */
export function isConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length > 0);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function sign(value: string): string {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

/** Build a signed token: <issuedAt>.<signature>. */
export function makeToken(): string {
  const issued = Date.now().toString();
  return `${issued}.${sign(issued)}`;
}

function tokenValid(token: string | undefined): boolean {
  if (!token) return false;
  const [issued, sig] = token.split(".");
  if (!issued || !sig) return false;
  const expected = sign(issued);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!crypto.timingSafeEqual(a, b)) return false;
  const age = (Date.now() - Number(issued)) / 1000;
  return age >= 0 && age < MAX_AGE;
}

/** Read the session cookie and report whether the visitor is logged in. */
export async function isLoggedIn(): Promise<boolean> {
  const jar = await cookies();
  return tokenValid(jar.get(SESSION_COOKIE)?.value);
}

export async function setSession(): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}
