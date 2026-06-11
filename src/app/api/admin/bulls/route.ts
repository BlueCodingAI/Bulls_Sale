import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminGuard";
import { getBulls, getCows, saveBulls, saveCows } from "@/lib/content";
import { sanitizeBulls, ValidationError } from "@/lib/sanitize";

/** GET the current bulls + cows lists for the admin editor. */
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const [bulls, cows] = await Promise.all([getBulls(), getCows()]);
  return NextResponse.json({ ok: true, bulls, cows });
}

/** Save the full bulls OR cows list. Body: { kind: "bulls"|"cows", items: [...] } */
export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: { kind?: string; items?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  const kind = body.kind === "cows" ? "cows" : "bulls";
  try {
    const items = sanitizeBulls(body.items);
    if (kind === "cows") {
      await saveCows(items);
      revalidatePath("/cows");
    } else {
      await saveBulls(items);
    }
    // Bulls and cows both surface across the site.
    revalidatePath("/");
    revalidatePath("/bulls");
    revalidatePath("/bulls/[slug]", "page");
    return NextResponse.json({ ok: true, count: items.length });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
    }
    console.error("Save bulls failed:", err);
    return NextResponse.json({ ok: false, error: "Could not save." }, { status: 500 });
  }
}
