import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import { saveUpload } from "@/lib/store";

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

/**
 * Upload one image. multipart/form-data with a "file" field.
 * Returns { ok, src } where src is the public path to use.
 */
export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file received." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "That image is over 25 MB — please use a smaller one." },
      { status: 413 },
    );
  }
  if (!ALLOWED.has(file.type)) {
    const isHeic = /heic|heif/i.test(file.type) || /\.heic$|\.heif$/i.test(file.name);
    return NextResponse.json(
      {
        ok: false,
        error: isHeic
          ? "iPhone HEIC photos can't be shown on the web. On your phone: Settings → Camera → Formats → “Most Compatible”, or save/export the photo as JPG first."
          : "Please upload a JPG, PNG, WEBP, AVIF, or GIF image.",
      },
      { status: 415 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const src = await saveUpload(file.name || "photo.jpg", bytes);
  return NextResponse.json({ ok: true, src });
}
