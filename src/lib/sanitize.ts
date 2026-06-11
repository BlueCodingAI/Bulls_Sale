import type { Bull, BullStatus, BullBreed } from "@/lib/types";

const STATUSES: BullStatus[] = ["available", "coming-soon", "sold"];
const BREEDS: BullBreed[] = ["Lim-Flex", "Limousin"];

const str = (v: unknown, max = 4000): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const optStr = (v: unknown, max = 400): string | undefined => {
  const s = str(v, max);
  return s || undefined;
};

const num = (v: unknown): number | undefined => {
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : undefined;
};

function notNull<T>(v: T | null): v is T {
  return v !== null;
}

export function slugify(input: string): string {
  return str(input, 80)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export class ValidationError extends Error {}

/** Coerce arbitrary input into a safe Bull, or throw ValidationError. */
export function sanitizeBull(input: unknown): Bull {
  const o = (input ?? {}) as Record<string, unknown>;

  const name = str(o.name, 80);
  if (!name) throw new ValidationError("Name is required.");

  const slug = slugify(str(o.slug) || name);
  if (!slug) throw new ValidationError("A valid name/slug is required.");

  const status = STATUSES.includes(o.status as BullStatus)
    ? (o.status as BullStatus)
    : "available";
  const breed = BREEDS.includes(o.breed as BullBreed)
    ? (o.breed as BullBreed)
    : "Lim-Flex";
  const color = o.color === "Red" ? "Red" : "Black";

  const photosIn = Array.isArray(o.photos) ? o.photos : [];
  const photos = photosIn
    .map((p) => {
      const po = (p ?? {}) as Record<string, unknown>;
      const src = str(po.src, 300);
      return src ? { src, alt: str(po.alt, 240) || name } : null;
    })
    .filter(notNull);
  if (photos.length === 0) {
    throw new ValidationError("Add at least one photo.");
  }

  const videos = (Array.isArray(o.videos) ? o.videos : [])
    .map((v) => {
      const vo = (v ?? {}) as Record<string, unknown>;
      const src = str(vo.src, 300);
      return src ? { src, poster: optStr(vo.poster, 300), label: optStr(vo.label, 160) } : null;
    })
    .filter(notNull);

  const registrationImages = (Array.isArray(o.registrationImages) ? o.registrationImages : [])
    .map((p) => {
      const po = (p ?? {}) as Record<string, unknown>;
      const src = str(po.src, 300);
      return src ? { src, alt: str(po.alt, 240) || `${name} registration` } : null;
    })
    .filter(notNull);

  const highlights = (Array.isArray(o.highlights) ? o.highlights : [])
    .map((h) => str(h, 200))
    .filter(Boolean)
    .slice(0, 8);

  const epds = (Array.isArray(o.epds) ? o.epds : [])
    .map((e) => {
      const eo = (e ?? {}) as Record<string, unknown>;
      const label = str(eo.label, 16);
      const value = str(eo.value, 16);
      return label ? { label, value } : null;
    })
    .filter(notNull)
    .slice(0, 16);

  const bull: Bull = {
    slug,
    name,
    registeredName: optStr(o.registeredName, 120),
    status,
    breed,
    color,
    polled: Boolean(o.polled),
    bornISO: optStr(o.bornISO, 20),
    sire: optStr(o.sire, 120),
    dam: optStr(o.dam, 120),
    registrationNumber: optStr(o.registrationNumber, 60),
    birthWeightLbs: num(o.birthWeightLbs),
    weaningWeightLbs: num(o.weaningWeightLbs),
    currentWeightLbs: num(o.currentWeightLbs),
    tagline: str(o.tagline, 240),
    description: str(o.description, 4000),
    highlights: highlights.length ? highlights : undefined,
    epds: epds.length ? epds : undefined,
    photos,
    videos: videos.length ? videos : undefined,
    registrationImages: registrationImages.length ? registrationImages : undefined,
    featured: Boolean(o.featured),
    soldDateISO: status === "sold" ? optStr(o.soldDateISO, 20) : undefined,
  };
  return bull;
}

/** Sanitize a whole list and guarantee unique slugs. */
export function sanitizeBulls(input: unknown): Bull[] {
  const arr = Array.isArray(input) ? input : [];
  const seen = new Set<string>();
  const out: Bull[] = [];
  for (const item of arr) {
    const bull = sanitizeBull(item);
    let slug = bull.slug;
    let i = 2;
    while (seen.has(slug)) slug = `${bull.slug}-${i++}`;
    seen.add(slug);
    out.push({ ...bull, slug });
  }
  return out;
}
