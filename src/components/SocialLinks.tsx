import { site } from "@/data/site";
import { FacebookIcon, TikTokIcon } from "@/components/icons";

export function SocialLinks({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const ring =
    variant === "light"
      ? "border-cream/25 text-cream/80 hover:border-gold-soft hover:text-gold-soft"
      : "border-ink/15 text-ink/70 hover:border-rust hover:text-rust";
  const items = [
    { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
    { label: "TikTok", href: site.social.tiktok, Icon: TikTokIcon },
  ];
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${site.name} on ${label}`}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${ring}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}
