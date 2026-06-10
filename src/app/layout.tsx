import type { Metadata, Viewport } from "next";
import { Rye, EB_Garamond, Oswald } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollTop } from "@/components/ScrollTop";
import { site } from "@/data/site";

// Woodtype display face for headlines (the "WANTED poster" look)
const rye = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rye",
  display: "swap",
});

// Old letterpress serif for body copy
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

// Condensed gothic for signage, labels & buttons
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Limousin bulls",
    "Lim-Flex bulls",
    "registered bulls for sale",
    "East Texas cattle",
    "herd sire",
    "calving ease bulls",
    "registered Limousin",
    site.name,
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
    images: [{ url: "/gallery/herd-1.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/gallery/herd-1.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#211404",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    areaServed: site.location,
    sameAs: [site.social.facebook, site.social.tiktok],
  };

  return (
    <html lang="en" className={`${rye.variable} ${garamond.variable} ${oswald.variable}`}>
      <body className="min-h-screen bg-bone antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
