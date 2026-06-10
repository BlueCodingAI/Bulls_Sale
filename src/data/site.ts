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
  tagline: "Registered Limousin & Lim-Flex Herd Sires",
  location: "East Texas",
  established: 2022,
  description:
    "A family-owned East Texas ranch raising registered Limousin and Lim-Flex herd sires — bred for calving ease, carcass quality, and exceptional docility.",

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
    role: "Papa & Gooey — The OG Ranchers",
    blurb:
      "Three generations of cattle knowledge run through Papa and Gooey. They set the standard for how we raise, handle, and care for every animal on the place.",
  },
  {
    name: "Bruce & Victoria Caylor",
    role: "Owners & Herd Managers",
    blurb:
      "Bruce and Victoria handle the day-to-day — genetics planning, AI breeding, and getting to know each bull personally so we can match him to the right herd.",
  },
  {
    name: "Kimber Caylor",
    role: "CEO & BRO (Buggy Riding Officer)",
    blurb:
      "Every great operation needs a leader. Kimber supervises pasture checks from the front seat of the buggy and keeps morale sky-high.",
  },
] as const;

/** Primary navigation. */
export const nav = [
  { label: "Our Bulls", href: "/bulls" },
  { label: "Why Limousin", href: "/why-limousin" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
