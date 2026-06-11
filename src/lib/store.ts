/**
 * Low-level on-disk store for owner-editable content + analytics.
 * ─────────────────────────────────────────────────────────────────────────
 * This site runs as a Node server with a writable disk, so the admin saves
 * changes straight to JSON files here. Pages read from these files at build /
 * request time and are revalidated after each admin save.
 *
 * Data lives under CONTENT_DIR (default ./content). Uploaded images live under
 * public/uploads so Next can serve them. On a host with ephemeral storage,
 * point CONTENT_DIR (and mount public/uploads) at a PERSISTENT volume so edits
 * survive restarts/redeploys.
 *
 * SERVER ONLY — never import from a "use client" component.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

export const CONTENT_DIR =
  process.env.CONTENT_DIR && process.env.CONTENT_DIR.trim()
    ? path.resolve(process.env.CONTENT_DIR)
    : path.join(process.cwd(), "content");

export const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
export const UPLOADS_PUBLIC = "/uploads";

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

/** Read a JSON file, returning `fallback` if it doesn't exist yet. */
export async function readJSON<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return fallback;
    throw err;
  }
}

/** Write a JSON file atomically (write temp, then rename). */
export async function writeJSON(file: string, data: unknown): Promise<void> {
  await ensureDir(CONTENT_DIR);
  const dest = path.join(CONTENT_DIR, file);
  const tmp = `${dest}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, dest);
}

/** Append one record as a line of JSON (JSONL) — used for analytics events. */
export async function appendJSONL(file: string, record: unknown): Promise<void> {
  await ensureDir(CONTENT_DIR);
  await fs.appendFile(
    path.join(CONTENT_DIR, file),
    JSON.stringify(record) + "\n",
    "utf8",
  );
}

/** Read a JSONL file into an array, skipping malformed lines. */
export async function readJSONL<T>(file: string): Promise<T[]> {
  let raw = "";
  try {
    raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return [];
    throw err;
  }
  const out: T[] = [];
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    try {
      out.push(JSON.parse(t) as T);
    } catch {
      /* skip corrupt line */
    }
  }
  return out;
}

/** Save an uploaded file to public/uploads and return its public path. */
export async function saveUpload(
  filename: string,
  bytes: Buffer,
): Promise<string> {
  await ensureDir(UPLOADS_DIR);
  const safe = safeFilename(filename);
  const unique = `${Date.now().toString(36)}-${safe}`;
  await fs.writeFile(path.join(UPLOADS_DIR, unique), bytes);
  return `${UPLOADS_PUBLIC}/${unique}`;
}

/** Strip a filename down to a safe, lowercase slug + extension. */
export function safeFilename(name: string): string {
  const ext = (path.extname(name) || "").toLowerCase().replace(/[^.a-z0-9]/g, "");
  const base = path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "image";
  return `${base}${ext || ".jpg"}`;
}
