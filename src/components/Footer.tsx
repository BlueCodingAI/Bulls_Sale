import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SocialLinks } from "@/components/SocialLinks";
import { site, nav } from "@/data/site";
import { MapPin, MailIcon, PhoneIcon, ArrowRight } from "@/components/icons";
import { OrnateDivider } from "@/components/motifs";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="grain pointer-events-none absolute inset-0 opacity-20" />
      {/* CTA band */}
      <div className="relative border-b border-cream/10">
        <div className="container-edge flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl">
              Looking for your next herd sire?
            </h2>
            <p className="mt-3 text-cream/70">
              We&apos;d love to talk genetics and help you find the right bull for your
              cows. Reach out — there&apos;s never any pressure.
            </p>
          </div>
          <Link
            href="/contact"
            className="shine-hover group inline-flex items-center gap-3 rounded-md border border-cream/30 bg-rust px-8 py-4 font-condensed text-sm font-semibold uppercase tracking-[0.13em] text-cream transition-all duration-300 hover:bg-rust-soft hover:-translate-y-0.5"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* main */}
      <div className="container-edge relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-cream/65">
            {site.description}
          </p>
          <SocialLinks variant="light" className="mt-7" />
        </div>

        <div>
          <h3 className="eyebrow text-gold-soft">Explore</h3>
          <ul className="mt-5 space-y-3">
            <li>
              <Link href="/" className="link-underline text-sm text-cream/75 hover:text-cream">
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-sm text-cream/75 hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-gold-soft">Get In Touch</h3>
          <ul className="mt-5 space-y-4 text-sm text-cream/75">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" />
              <span>{site.location}</span>
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" />
              <a href={`mailto:${site.email}`} className="link-underline hover:text-cream">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft" />
              <a href={site.phoneHref} className="link-underline hover:text-cream">
                {site.phone}
              </a>
            </li>
          </ul>
          <a
            href={site.nalf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-xs font-medium text-cream/80 transition-colors hover:border-gold-soft hover:text-gold-soft"
          >
            Proud member · {site.nalf.abbr}
          </a>
        </div>
      </div>

      <div className="relative flex justify-center pb-2">
        <OrnateDivider light className="h-5 w-72 opacity-70" />
      </div>
      <div className="container-edge relative flex flex-col items-center justify-between gap-3 border-t border-cream/10 py-7 font-condensed text-xs uppercase tracking-[0.12em] text-cream/50 sm:flex-row">
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        <p className="flex items-center gap-2">
          <span>{site.location}</span>
          <span aria-hidden>·</span>
          <span>Registered Limousin &amp; Lim-Flex</span>
        </p>
      </div>
    </footer>
  );
}
