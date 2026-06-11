import type { Bull } from "@/lib/types";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  THE BULL CATALOG  —  this is the only file you edit to manage your herd.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  TO ADD A NEW BULL
 *  -----------------
 *  1. Put his photos in   public/bulls/<his-name>/   (1.jpg, 2.jpg, 3.jpg …)
 *  2. Copy one block below, paste it at the TOP of the list, and fill it in.
 *  3. Save. The website updates automatically.
 *
 *  TO MARK A BULL AS SOLD
 *  ----------------------
 *  Change his   status: "available"   to   status: "sold"
 *  and add      soldDateISO: "2026-04-22"   (the date he sold).
 *  He stays in the gallery with a SOLD ribbon — newest sales first.
 *
 *  STATUS OPTIONS:  "available" | "coming-soon" | "sold"
 *  (Available bulls show first, then coming-soon, then sold — newest on top.)
 *
 *  The EPD numbers, weights, sire/dam, and registration numbers below are
 *  SAMPLE values to show the layout. Replace them with each bull's real data.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const bulls: Bull[] = [
  {
    slug: "lebron",
    name: "Lebron",
    registeredName: "RCC Lebron 24K",
    status: "available",
    featured: true,
    breed: "Lim-Flex",
    color: "Black",
    polled: true,
    bornISO: "2023-02-18",
    sire: "RCC Foundation Sire",
    dam: "RCC Pasture Queen 19F",
    registrationNumber: "NXF000000001",
    birthWeightLbs: 64,
    weaningWeightLbs: 780,
    currentWeightLbs: 1560,
    tagline: "A complete, eye-catching herd sire with the look and the numbers.",
    description:
      "Lebron is the kind of bull that stops you at the fence line. Long-bodied, deep-ribbed, and heavily muscled through the hip, he carries himself with the easy disposition we breed for. A Lim-Flex out of handpicked AI genetics, he pairs a low birth weight with the growth and high yield that make Limousin-influenced bulls so valuable as terminal sires. He takes cubes from your hand and loads like a gentleman.",
    highlights: [
      "Calving-ease birth weight with explosive growth",
      "Thick, sound, and structurally correct",
      "Gentle, hand-fed disposition",
    ],
    epds: [
      { label: "CE", value: "12" },
      { label: "BW", value: "-2.1" },
      { label: "WW", value: "78" },
      { label: "YW", value: "121" },
      { label: "MILK", value: "26" },
      { label: "CW", value: "41" },
      { label: "REA", value: "0.92" },
      { label: "MARB", value: "0.31" },
    ],
    photos: [
      { src: "/bulls/lebron/1.jpg", alt: "Lebron, a black Lim-Flex bull, standing broadside in a green East Texas pasture" },
      { src: "/bulls/lebron/2.jpg", alt: "Lebron grazing, showing his depth of body and muscle" },
    ],
    videos: [
      { src: "/video/hero.mp4", poster: "/video/hero-poster.jpg", label: "Lebron moving out in the pasture" },
    ],
  },
  {
    slug: "marvin",
    name: "Marvin",
    registeredName: "RCC Marvin 27K",
    status: "available",
    featured: true,
    breed: "Limousin",
    color: "Red",
    polled: true,
    bornISO: "2023-03-09",
    sire: "Old-World Red Limousin",
    dam: "RCC Ruby 12D",
    registrationNumber: "NXF000000002",
    birthWeightLbs: 62,
    weaningWeightLbs: 745,
    currentWeightLbs: 1485,
    tagline: "Old-world red Limousin power with a kind eye.",
    description:
      "Marvin represents the old-world red Limousin side of our program — big-framed, deep-flanked, and built to add pounds. If you want to stamp your calf crop with size, length, and that classic red Limousin muscle expression, Marvin is your bull. He's as docile as they come and a favorite around the barn.",
    highlights: [
      "Old-world red Limousin genetics",
      "Big-framed with tremendous length",
      "Adds growth and high yield to any cow herd",
    ],
    epds: [
      { label: "CE", value: "9" },
      { label: "BW", value: "-1.4" },
      { label: "WW", value: "82" },
      { label: "YW", value: "128" },
      { label: "MILK", value: "24" },
      { label: "CW", value: "45" },
      { label: "REA", value: "1.04" },
      { label: "MARB", value: "0.18" },
    ],
    photos: [
      { src: "/bulls/marvin/1.jpg", alt: "Marvin, a red Limousin bull, standing in the pasture" },
    ],
  },
  {
    slug: "mouse",
    name: "Mouse",
    registeredName: "RCC Mouse 31L",
    status: "coming-soon",
    breed: "Lim-Flex",
    color: "Black",
    polled: true,
    bornISO: "2024-04-02",
    sire: "RCC Foundation Sire",
    dam: "RCC Pasture Queen 19F",
    registrationNumber: "NXF000000003",
    birthWeightLbs: 61,
    weaningWeightLbs: 720,
    tagline: "A young prospect maturing toward his two-year debut.",
    description:
      "Mouse is one to watch. We start documenting our bulls at a year old and follow them as they mature toward selling age at two. Already showing the muscle shape and quiet temperament of our best Lim-Flex genetics, Mouse will be available soon — follow along on Facebook and TikTok as he develops.",
    highlights: [
      "Promising young Lim-Flex prospect",
      "Low birth weight, strong weaning numbers",
      "Available as a two-year-old",
    ],
    photos: [
      { src: "/bulls/mouse/1.jpg", alt: "Mouse, a young black Lim-Flex bull prospect" },
    ],
  },
  {
    slug: "levi",
    name: "Levi",
    registeredName: "RCC Levi 18J",
    status: "sold",
    soldDateISO: "2026-03-15",
    breed: "Lim-Flex",
    color: "Black",
    polled: true,
    bornISO: "2022-02-27",
    sire: "RCC Foundation Sire",
    dam: "RCC Bonnie 07B",
    registrationNumber: "NXF000000004",
    birthWeightLbs: 63,
    weaningWeightLbs: 765,
    currentWeightLbs: 1520,
    tagline: "Sold to a commercial herd as a low-birth-weight calving-ease sire.",
    description:
      "Levi went home with a commercial cattleman looking to add calving ease without giving up growth. A stout, square-made Lim-Flex with a great foot and a quiet disposition, he's exactly the kind of bull that improves a cow herd in a single generation. Congratulations to his new owners.",
    highlights: [
      "Calving-ease specialist",
      "Square-made with excellent feet and legs",
      "Proven, gentle disposition",
    ],
    epds: [
      { label: "CE", value: "14" },
      { label: "BW", value: "-2.6" },
      { label: "WW", value: "74" },
      { label: "YW", value: "116" },
      { label: "MILK", value: "27" },
      { label: "CW", value: "38" },
      { label: "REA", value: "0.88" },
      { label: "MARB", value: "0.29" },
    ],
    photos: [
      { src: "/bulls/levi/1.jpg", alt: "Levi, a black Lim-Flex bull standing in the pasture" },
      { src: "/bulls/levi/2.jpg", alt: "Levi showing his structure and muscling" },
    ],
  },
  {
    slug: "leroy",
    name: "Leroy",
    registeredName: "RCC Leroy 21J",
    status: "sold",
    soldDateISO: "2026-02-01",
    breed: "Lim-Flex",
    color: "Black",
    polled: true,
    bornISO: "2022-03-21",
    sire: "RCC Foundation Sire",
    dam: "RCC Daisy 03A",
    registrationNumber: "NXF000000005",
    birthWeightLbs: 65,
    weaningWeightLbs: 800,
    currentWeightLbs: 1590,
    tagline: "Big-topped growth bull sold as a terminal sire.",
    description:
      "Leroy was our heavy-hitter for growth — a big-topped, expressive-muscled Lim-Flex that weaned off near the top of his class. He sold as a terminal sire to add pounds and high yield. A great example of the kind of performance Lim-Flex brings to the feed yard.",
    highlights: [
      "Top-end weaning and yearling weights",
      "Heavy muscle expression and high yield",
      "Efficient, easy-keeping",
    ],
    epds: [
      { label: "CE", value: "8" },
      { label: "BW", value: "-0.9" },
      { label: "WW", value: "85" },
      { label: "YW", value: "132" },
      { label: "MILK", value: "23" },
      { label: "CW", value: "48" },
      { label: "REA", value: "1.10" },
      { label: "MARB", value: "0.21" },
    ],
    photos: [
      { src: "/bulls/leroy/1.jpg", alt: "Leroy, a black Lim-Flex bull, head-on in the pasture" },
    ],
  },
  {
    slug: "jagger",
    name: "Jagger",
    registeredName: "RCC Jagger 15H",
    status: "sold",
    soldDateISO: "2025-11-10",
    breed: "Limousin",
    color: "Red",
    polled: true,
    bornISO: "2021-03-05",
    sire: "Old-World Red Limousin",
    dam: "RCC Ruby 12D",
    registrationNumber: "NXF000000006",
    birthWeightLbs: 64,
    weaningWeightLbs: 758,
    currentWeightLbs: 1545,
    tagline: "Old-world red Limousin sold as a seedstock herd sire.",
    description:
      "Jagger was a standout red Limousin we were proud to send to a seedstock operation. Long, level, and powerfully built, he carries the old-world Limousin look that's getting harder to find. His new owners are using him to anchor their red program.",
    highlights: [
      "Old-world red Limousin look",
      "Long, level top with power",
      "Selected for a seedstock program",
    ],
    epds: [
      { label: "CE", value: "10" },
      { label: "BW", value: "-1.6" },
      { label: "WW", value: "80" },
      { label: "YW", value: "124" },
      { label: "MILK", value: "25" },
      { label: "CW", value: "43" },
      { label: "REA", value: "1.01" },
      { label: "MARB", value: "0.19" },
    ],
    photos: [
      { src: "/bulls/jagger/1.jpg", alt: "Jagger, a red Limousin bull standing in the pasture" },
    ],
  },
];

/* ─────────────────────────── helpers (no need to edit) ─────────────────── */

const statusRank: Record<Bull["status"], number> = {
  available: 0,
  "coming-soon": 1,
  sold: 2,
};

/** Gallery order: available → coming-soon → sold, newest sales first. */
export function getBullsSorted(): Bull[] {
  return [...bulls].sort((a, b) => {
    if (statusRank[a.status] !== statusRank[b.status]) {
      return statusRank[a.status] - statusRank[b.status];
    }
    if (a.status === "sold") {
      return (b.soldDateISO ?? "").localeCompare(a.soldDateISO ?? "");
    }
    return (b.bornISO ?? "").localeCompare(a.bornISO ?? "");
  });
}

export function getBull(slug: string): Bull | undefined {
  return bulls.find((b) => b.slug === slug);
}

export function getFeaturedBulls(): Bull[] {
  const featured = bulls.filter((b) => b.featured && b.status !== "sold");
  return (featured.length ? featured : getBullsSorted()).slice(0, 3);
}

export function getAllBullSlugs(): string[] {
  return bulls.map((b) => b.slug);
}
