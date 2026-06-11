import Image from "next/image";
import { resolveImage } from "@/lib/content";

/**
 * Renders an editable image slot. Shows the owner's uploaded override if there
 * is one (managed in /admin → Images), otherwise the slot's default. Server
 * component so it can read the override map.
 */
export async function SiteImage({
  slot,
  alt,
  className,
  sizes,
  priority = false,
}: {
  slot: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = await resolveImage(slot);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
