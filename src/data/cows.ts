import type { Bull } from "@/lib/types";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  THE COW / HEIFER CATALOG
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  This list is EMPTY on purpose — we don't have cows or heifers offered right
 *  now. The Cows page automatically shows a friendly "nothing available right
 *  now" message while this list is empty, and switches to a gallery the moment
 *  you add one.
 *
 *  TO LIST A COW OR HEIFER
 *  -----------------------
 *  1. Put her photos in   public/cows/<her-name>/   (1.jpg, 2.jpg …)
 *  2. Add a block below (same shape as a bull in src/data/bulls.ts). Keep her
 *     status as "available". Example:
 *
 *       {
 *         slug: "ruby",
 *         name: "Ruby",
 *         registeredName: "RCC Ruby 12D",
 *         status: "available",
 *         breed: "Limousin",
 *         color: "Red",
 *         tagline: "Old-world red Limousin female.",
 *         description: "…",
 *         photos: [{ src: "/cows/ruby/1.jpg", alt: "Ruby in the pasture" }],
 *       },
 *
 *  NOTE FOR THE DEVELOPER: cow cards reuse the bull card layout. When the first
 *  cow is added, wire up a /cows/[slug] detail route (mirroring the bulls one)
 *  so the cards link somewhere — until then this stays empty by design.
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const cows: Bull[] = [];
