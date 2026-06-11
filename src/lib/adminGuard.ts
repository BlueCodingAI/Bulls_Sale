import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";

/**
 * Returns a 401 response if the caller isn't an authenticated admin, otherwise
 * null. Use at the top of every admin API route:
 *
 *   const denied = await requireAdmin();
 *   if (denied) return denied;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isLoggedIn()) return null;
  return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
}
