"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaImage, MediaVideo } from "@/lib/types";
import { PlayIcon, CloseIcon, ChevronLeft, ChevronRight } from "@/components/icons";

type Item =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

export function BullMedia({
  name,
  photos,
  videos = [],
  sold = false,
}: {
  name: string;
  photos: MediaImage[];
  videos?: MediaVideo[];
  sold?: boolean;
}) {
  const items: Item[] = [
    ...photos.map((p) => ({ type: "image" as const, src: p.src, alt: p.alt })),
    ...videos.map((v) => ({
      type: "video" as const,
      src: v.src,
      poster: v.poster,
      alt: v.label ?? `${name} video`,
    })),
  ];

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const current = items[active];

  const imageIndexes = items
    .map((it, i) => (it.type === "image" ? i : -1))
    .filter((i) => i >= 0);

  const step = useCallback(
    (dir: 1 | -1) => {
      // Navigate only among images while in the lightbox.
      const pos = imageIndexes.indexOf(active);
      const next = (pos + dir + imageIndexes.length) % imageIndexes.length;
      setActive(imageIndexes[next]);
    },
    [active, imageIndexes],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, step]);

  return (
    <div>
      {/* Main viewer */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink-2 shadow-card ring-1 ring-ink/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {current.type === "image" ? (
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="group h-full w-full cursor-zoom-in"
                aria-label="Open full-size photo"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </button>
            ) : (
              <video
                key={current.src}
                controls
                playsInline
                poster={current.poster}
                className="h-full w-full object-cover"
              >
                <source src={current.src} type="video/mp4" />
              </video>
            )}
          </motion.div>
        </AnimatePresence>

        {sold && current.type === "image" && (
          <div className="pointer-events-none absolute right-4 top-4 z-10 -rotate-6 rounded-md border-2 border-cream/85 bg-ink/40 px-4 py-1.5 font-display text-lg font-bold uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
            Sold
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {items.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View ${it.type} ${i + 1}`}
              className={`relative h-20 w-24 overflow-hidden rounded-xl ring-2 transition-all duration-300 ${
                active === i
                  ? "ring-rust"
                  : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={it.type === "image" ? it.src : it.poster ?? "/video/hero-poster.jpg"}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
              {it.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/40">
                  <PlayIcon className="h-5 w-5 text-cream" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && current.type === "image" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            {imageIndexes.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous photo"
                  className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 sm:left-8"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next photo"
                  className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 sm:right-8"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[82vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
