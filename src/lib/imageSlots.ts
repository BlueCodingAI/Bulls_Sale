/**
 * Registry of editable site image "slots".
 * ─────────────────────────────────────────────────────────────────────────
 * Each slot is a named spot in the layout (e.g. the About story photo). The
 * owner can replace the PHOTO in any slot from the admin without touching code
 * or layout. Pages render <SiteImage slot="about-story" …/>, which shows the
 * uploaded override if there is one, otherwise the default below.
 *
 * Pure data — safe to import anywhere (server or client).
 */

export interface ImageSlot {
  id: string;
  /** Friendly name shown in the admin. */
  label: string;
  /** Which page it appears on (for grouping in the admin). */
  group: string;
  /** Default image shipped with the site. */
  defaultSrc: string;
  /** Hint shown to the owner about the best shape to upload. */
  ratioHint: string;
}

export const imageSlots: ImageSlot[] = [
  // Home
  { id: "home-feature", label: "Home — “half your herd” photo", group: "Home", defaultSrc: "/bulls/lebron/1.jpg", ratioHint: "Tall / portrait (4:5)" },
  { id: "home-about", label: "Home — family teaser photo", group: "Home", defaultSrc: "/gallery/herd-1.jpg", ratioHint: "Landscape (5:4)" },
  // About
  { id: "about-header", label: "About — page banner", group: "About", defaultSrc: "/gallery/herd-3.jpg", ratioHint: "Wide banner (16:9)" },
  { id: "about-story", label: "About — story / family photo", group: "About", defaultSrc: "/gallery/herd-4.jpg", ratioHint: "Tall / portrait (4:5)" },
  // Why Lim-Flex
  { id: "why-header", label: "Why Lim-Flex — page banner", group: "Why Lim-Flex", defaultSrc: "/gallery/herd-2.jpg", ratioHint: "Wide banner (16:9)" },
  { id: "why-limflex", label: "Why Lim-Flex — Lim-Flex photo", group: "Why Lim-Flex", defaultSrc: "/bulls/lebron/1.jpg", ratioHint: "Tall / portrait (4:5)" },
  { id: "why-limousin", label: "Why Lim-Flex — Limousin photo (red cow)", group: "Why Lim-Flex", defaultSrc: "/bulls/marvin/1.jpg", ratioHint: "Landscape (5:4)" },
  // Bulls / Cows / Contact
  { id: "bulls-header", label: "Bulls — page banner", group: "Other pages", defaultSrc: "/gallery/herd-2.jpg", ratioHint: "Wide banner (16:9)" },
  { id: "cows-header", label: "Cows — page banner", group: "Other pages", defaultSrc: "/gallery/herd-1.jpg", ratioHint: "Wide banner (16:9)" },
  { id: "contact-header", label: "Contact — page banner", group: "Other pages", defaultSrc: "/gallery/herd-4.jpg", ratioHint: "Wide banner (16:9)" },
];

export const imageSlotIds = imageSlots.map((s) => s.id);

export function getSlot(id: string): ImageSlot | undefined {
  return imageSlots.find((s) => s.id === id);
}

/** Resolve a slot to its current src given the saved overrides map. */
export function resolveSlotSrc(
  id: string,
  overrides: Record<string, string>,
): string {
  const slot = getSlot(id);
  return overrides[id] || slot?.defaultSrc || "";
}
