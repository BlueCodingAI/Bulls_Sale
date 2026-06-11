import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminGuard";
import { getImageOverrides, saveImageOverrides } from "@/lib/content";
import { imageSlotIds } from "@/lib/imageSlots";

/** GET the current image-slot overrides. */
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json({ ok: true, overrides: await getImageOverrides() });
}

/**
 * Save image-slot overrides. Body: { overrides: { [slotId]: "/uploads/x.jpg" } }
 * Only known slot ids and /uploads or site-relative paths are accepted; an
 * empty/absent value resets a slot back to its default.
 */
export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: { overrides?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  const clean: Record<string, string> = {};
  for (const id of imageSlotIds) {
    const v = body.overrides?.[id];
    if (typeof v === "string" && v.startsWith("/")) {
      clean[id] = v.slice(0, 300);
    }
  }

  await saveImageOverrides(clean);
  for (const p of ["/", "/bulls", "/cows", "/about", "/why-limousin", "/contact"]) {
    revalidatePath(p);
  }
  return NextResponse.json({ ok: true });
}
