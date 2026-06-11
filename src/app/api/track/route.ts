import { NextResponse } from "next/server";
import { recordView } from "@/lib/analytics";

/**
 * Records an anonymous page view for the self-hosted marketing dashboard.
 * No cookies, no IP — just the path and the referring site's hostname.
 */
export async function POST(req: Request) {
  let body: { path?: string; ref?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const path = String(body.path ?? "").trim();
  if (!path.startsWith("/")) return NextResponse.json({ ok: false }, { status: 400 });
  // Don't track the admin area itself.
  if (path.startsWith("/admin")) return NextResponse.json({ ok: true });

  let refHost = "";
  const ref = String(body.ref ?? "").trim();
  if (ref) {
    try {
      refHost = new URL(ref).hostname.replace(/^www\./, "");
    } catch {
      refHost = "";
    }
  }
  // Ignore self-referrals (internal navigation).
  try {
    const selfHost = new URL(req.url).hostname.replace(/^www\./, "");
    if (refHost === selfHost) refHost = "";
  } catch {
    /* ignore */
  }

  await recordView(path, refHost);
  return NextResponse.json({ ok: true });
}
