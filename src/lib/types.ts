/**
 * Shared content types for Rocking C Cattle.
 * The bull catalog (see `src/data/bulls.ts`) is the single source of truth
 * the owner edits to add, update, or sell a bull.
 */

export type BullStatus = "available" | "coming-soon" | "sold";

export type BullBreed = "Lim-Flex" | "Limousin";

export interface MediaImage {
  /** Path under /public, e.g. "/bulls/lebron/1.jpg" */
  src: string;
  /** Describe the photo for accessibility & SEO. */
  alt: string;
}

export interface MediaVideo {
  /** Path under /public, e.g. "/video/hero.mp4" */
  src: string;
  /** Poster image shown before play. */
  poster?: string;
  label?: string;
}

export interface Epd {
  label: string;
  value: string;
}

export interface Bull {
  /** URL slug — lowercase, dashes only. Must be unique. */
  slug: string;
  name: string;
  /** Full registered / papered name. */
  registeredName?: string;
  status: BullStatus;
  breed: BullBreed;
  /** "Black" or "Red". */
  color: "Black" | "Red";
  polled?: boolean;
  /** ISO date of birth, e.g. "2023-03-14". */
  bornISO?: string;
  sire?: string;
  dam?: string;
  /** NALF registration number. */
  registrationNumber?: string;
  birthWeightLbs?: number;
  weaningWeightLbs?: number;
  currentWeightLbs?: number;
  /** One-line hook shown on cards & detail hero. */
  tagline: string;
  /** Full prose description. */
  description: string;
  /** Short bullet highlights. */
  highlights?: string[];
  /** Expected Progeny Differences table. */
  epds?: Epd[];
  photos: MediaImage[];
  videos?: MediaVideo[];
  /** Scans of registration papers (optional). */
  registrationImages?: MediaImage[];
  /** Show on the home page featured row. */
  featured?: boolean;
  /** ISO date marked sold (sorts sold bulls newest-first). */
  soldDateISO?: string;
}
