/**
 * Owner-editable content, read from the on-disk store (src/lib/store.ts) and
 * managed through /admin. Seeds itself from the bundled seed data the first
 * time, so the site works before any edits are made.
 *
 * SERVER ONLY.
 */
import type { Bull } from "@/lib/types";
import { bulls as seedBulls, sortBulls } from "@/data/bulls";
import { cows as seedCows } from "@/data/cows";
import { resolveSlotSrc } from "@/lib/imageSlots";
import { readJSON, writeJSON } from "@/lib/store";

const BULLS_FILE = "bulls.json";
const COWS_FILE = "cows.json";
const IMAGES_FILE = "images.json";

/* ── Bulls ──────────────────────────────────────────────────────────────── */

export function getBulls(): Promise<Bull[]> {
  return readJSON<Bull[]>(BULLS_FILE, seedBulls as unknown as Bull[]);
}

export function saveBulls(list: Bull[]): Promise<void> {
  return writeJSON(BULLS_FILE, list);
}

export async function getBullsSorted(): Promise<Bull[]> {
  return sortBulls(await getBulls());
}

export async function getBull(slug: string): Promise<Bull | undefined> {
  return (await getBulls()).find((b) => b.slug === slug);
}

export async function getFeaturedBulls(): Promise<Bull[]> {
  const all = await getBulls();
  const featured = all.filter((b) => b.featured && b.status !== "sold");
  return (featured.length ? featured : sortBulls(all)).slice(0, 3);
}

export async function getAllBullSlugs(): Promise<string[]> {
  return (await getBulls()).map((b) => b.slug);
}

/* ── Cows ───────────────────────────────────────────────────────────────── */

export function getCows(): Promise<Bull[]> {
  return readJSON<Bull[]>(COWS_FILE, seedCows as unknown as Bull[]);
}

export function saveCows(list: Bull[]): Promise<void> {
  return writeJSON(COWS_FILE, list);
}

/* ── Site image overrides ───────────────────────────────────────────────── */

export function getImageOverrides(): Promise<Record<string, string>> {
  return readJSON<Record<string, string>>(IMAGES_FILE, {});
}

export function saveImageOverrides(map: Record<string, string>): Promise<void> {
  return writeJSON(IMAGES_FILE, map);
}

/** Resolve a single image slot to its current src (override or default). */
export async function resolveImage(slotId: string): Promise<string> {
  return resolveSlotSrc(slotId, await getImageOverrides());
}
