/**
 * Site-wide settings for Rocking C Cattle.
 * ─────────────────────────────────────────────────────────────────────────
 * OWNER: update the contact details and social links below with your real
 * information. Everything here flows into the header, footer, and contact page.
 */

export const site = {
  name: "Rocking C Cattle",
  shortName: "Rocking C",
  legalName: "Rocking C Cattle, LLC",
  domain: "rockingccattle.com",
  url: "https://rockingccattle.com",
  tagline: "Registered Lim-Flex & Limousin Herd Sires",
  location: "East Texas",
  established: 2022,
  description:
    "A family-owned East Texas ranch raising registered Lim-Flex and Limousin herd sires — bred for calving ease, carcass quality, and exceptional docility.",

  // ── Contact ───────────────────────────────────────────────────────────
  // Replace these placeholders with your real email and phone.
  email: "info@rockingccattle.com",
  phone: "(903) 555-0147",
  phoneHref: "tel:+19035550147",

  // ── Social & partners ─────────────────────────────────────────────────
  social: {
    facebook: "https://www.facebook.com/rockingccattle",
    tiktok: "https://www.tiktok.com/@vacaylor",
  },

  // North American Limousin Foundation
  nalf: {
    name: "North American Limousin Foundation",
    abbr: "NALF",
    url: "https://www.nalf.org",
    limflexUrl: "https://www.nalf.org/limflex/",
    researchUrl: "https://www.nalf.org/education-research/",
  },
} as const;

/** People behind the ranch — used on the About page. */
export const team = [
  {
    name: "Bruce & Sherry Caylor",
    role: "The original ranchers",
    blurb:
      "Bruce and Sherry provide wisdom as a generation that have lived and breathed cattle their whole lives. Bruce comes from a long line of cattlemen and cowboys. He was a Ranch Manager for many years and a part-time cowboy his whole life. Bruce spurred the idea to life with a simple comment: “I know Angus sell, but the best money I ever made with cattle was when I ran those Limousin bulls.”",
  },
  {
    name: "Bruce & Victoria Caylor, and Kimber",
    role: "Owners, herd managers & one very good dog",
    blurb:
      "Bruce and Victoria handle the day-to-day — genetics planning, AI breeding, and getting to know each bull personally so we can match him to the right herd. And every good operation needs a leader: Kimber supervises pasture checks from the front seat of the buggy and keeps morale sky-high.",
  },
] as const;

/** Primary navigation. Contact lives in its own button in the header. */
export const nav = [
  { label: "Our Bulls", href: "/bulls" },
  { label: "Cows", href: "/cows" },
  { label: "Why Lim-Flex", href: "/why-limousin" },
  { label: "About Us", href: "/about" },
] as const;
