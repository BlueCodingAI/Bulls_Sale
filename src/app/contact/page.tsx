import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { Reveal } from "@/components/Reveal";
import { MapPin, MailIcon, PhoneIcon, ArrowRight, FacebookIcon, TikTokIcon } from "@/components/icons";
import { ConchoStar } from "@/components/motifs";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rocking C Cattle about our registered Lim-Flex and Limousin herd sires. Nothing is sold online — we're here to talk genetics and answer questions.",
};

const partners = [
  {
    Icon: ConchoStar,
    name: site.nalf.name,
    desc: "Registration, Lim-Flex info, research & studies.",
    href: site.nalf.url,
  },
  {
    Icon: FacebookIcon,
    name: "Find us on Facebook",
    desc: "Day-to-day updates from the ranch.",
    href: site.social.facebook,
  },
  {
    Icon: TikTokIcon,
    name: "Follow on TikTok",
    desc: "Watch our bulls grow up.",
    href: site.social.tiktok,
  },
];

export default function ContactPage() {
  const contactItems = [
    { Icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { Icon: PhoneIcon, label: "Phone", value: site.phone, href: site.phoneHref },
    { Icon: MapPin, label: "Location", value: site.location, href: undefined },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's talk genetics."
        intro="Nothing is sold through this website — it's here so you can get to know our cattle. When you're ready, reach out and we'll help you find the right bull. No pressure, ever."
        image="/gallery/herd-4.jpg"
        imageAlt="Rocking C Cattle pasture"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="bg-bone py-20 sm:py-28">
        <div className="container-edge grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* Info column */}
          <Reveal direction="right">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Reach out any time
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-ink/70">
              Questions about a bull, our genetics, or just want to talk cattle?
              We&apos;d love to hear from you.
            </p>

            <ul className="mt-9 space-y-4">
              {contactItems.map(({ Icon, label, value, href }) => {
                const inner = (
                  <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-cream px-5 py-4 transition-colors duration-300 hover:border-rust/30">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rust/10 text-rust">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-ink/45">
                        {label}
                      </p>
                      <p className="font-medium text-ink">{value}</p>
                    </div>
                  </div>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="block">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <p className="text-sm font-semibold text-ink/70">Follow along</p>
              <SocialLinks className="mt-3" />
            </div>

            {/* Partner / registration links */}
            <div className="mt-10">
              <h3 className="eyebrow text-rust">Registration &amp; Partners</h3>
              <div className="mt-4 space-y-3">
                {partners.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-sm border border-ink/15 bg-cream px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-soft"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-rust/25 bg-rust/10 text-rust">
                        <p.Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-medium text-ink">{p.name}</span>
                        <span className="block text-sm text-ink/55">{p.desc}</span>
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-ink/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-rust" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal direction="left" delay={0.1}>
            <Suspense fallback={<div className="h-96 rounded-[1.5rem] border border-ink/10 bg-bone" />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
