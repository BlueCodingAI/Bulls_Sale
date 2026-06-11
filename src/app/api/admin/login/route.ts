import { NextResponse } from "next/server";
import { verifyPassword, setSession, isConfigured } from "@/lib/auth";

export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin isn't configured yet. Set ADMIN_PASSWORD in the environment." },
      { status: 503 },
    );
  }
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
  if (!verifyPassword(String(body.password ?? ""))) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }
  await setSession();
  return NextResponse.json({ ok: true });
}
