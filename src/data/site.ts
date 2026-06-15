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
  location: "Gary, TX",
  established: 2022,
  description:
    "A family-owned East Texas ranch raising registered Lim-Flex and Limousin herd sires — bred for calving ease, carcass quality, and exceptional docility.",

  // ── Contact ───────────────────────────────────────────────────────────
  email: "victoria@rockingccattle.com",
  // Two contact numbers — Bruce and Victoria. Shown together in the footer
  // and on the contact page.
  phones: [
    { name: "Bruce", number: "(903) 263-7155", href: "tel:+19032637155" },
    { name: "Victoria", number: "(903) 631-9363", href: "tel:+19036319363" },
  ],
  // Primary number — used where a single number is needed (e.g. SEO schema).
  phone: "(903) 263-7155",
  phoneHref: "tel:+19032637155",

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
    name: "Bruce & Victoria Caylor, and Kimber",
    blurb:
      "Bruce and Victoria have spent countless hours studying genetics and how they impact performance and EPDs. They crunch the numbers and hand select every sire for each dam to maximize the genetic traits of the calf.",
  },
  {
    name: "Bruce & Sherry Caylor",
    blurb:
      "Bruce and Sherry provide wisdom as a generation that have lived and breathed cattle their whole lives. Bruce spurred the idea to life with a simple comment: “I know Angus sell, but the best money I ever made with cattle was when I ran those Limousin bulls.”",
  },
] as const;

/** Primary navigation. Contact lives in its own button in the header. */
export const nav = [
  { label: "Our Bulls", href: "/bulls" },
  { label: "Cows", href: "/cows" },
  { label: "Why Lim-Flex", href: "/why-limousin" },
  { label: "About Us", href: "/about" },
] as const;
