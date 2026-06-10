"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Star, Longhorn } from "@/components/motifs";
import { Magnetic } from "@/components/Magnetic";
import { site } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

const chips = ["Limousin & Lim-Flex", "AI-Bred Genetics", "Calving Ease", "Gentle Disposition"];

export function Hero() {
  const reduce = useReducedMotion();

  // Rubber-stamp entrance for each headline word.
  const stamp = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 1.5, rotate: -7, filter: "blur(3px)" },
    animate: { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" },
    transition: { duration: 0.6, delay: 0.15 + i * 0.12, ease },
  });

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      {/* Video background with a slow Ken Burns zoom */}
      <motion.video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/video/hero-poster.jpg"
        aria-hidden
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 18, ease: "easeOut" }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Sepia wash + legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/65 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/45" />
      <div className="absolute inset-0 mix-blend-multiply" style={{ background: "radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(33,20,4,0.6) 100%)" }} />
      <div className="orb drift bg-rust/30 -left-24 top-1/4 h-80 w-80" aria-hidden />
      <div className="orb drift-slow bg-gold/25 right-0 top-8 h-72 w-72" aria-hidden />
      <div className="grain absolute inset-0 opacity-40" />

      {/* Content */}
      <div className="container-edge relative z-10 w-full pb-24 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 font-condensed text-xs font-medium uppercase tracking-[0.3em] text-gold-soft"
        >
          <Star className="h-3 w-3 twinkle" />
          <span>{site.location}</span>
          <span className="text-gold/50">&middot;</span>
          <span>Est. {site.established}</span>
          <span className="text-gold/50">&middot;</span>
          <span>{site.nalf.abbr} Member</span>
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-[2.7rem] leading-[1.05] text-cream text-balance sm:text-6xl lg:text-[4.7rem]">
          {"Bulls built to".split(" ").map((word, i) => (
            <motion.span key={i} {...stamp(i)} className="mr-[0.28em] inline-block">
              {word}
            </motion.span>
          ))}
          <motion.span {...stamp(3)} className="text-gradient-light inline-block italic">
            leave their mark.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-cream/80"
        >
          Registered Limousin &amp; Lim-Flex herd sires — raised by a family in East
          Texas for calving ease, carcass quality, and the kind of calm disposition
          that makes a great bull a pleasure to own.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.72, ease }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Magnetic>
            <Link
              href="/bulls"
              className="shine-hover group inline-flex items-center justify-center gap-2.5 rounded-md border border-cream/30 bg-rust px-8 py-4 font-condensed text-sm font-semibold uppercase tracking-[0.13em] text-cream shadow-soft transition-colors duration-300 hover:bg-rust-deep"
            >
              <Longhorn className="h-6 w-auto text-cream/90" />
              Meet our bulls
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <Link
            href="/why-limousin"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-cream/35 px-8 py-4 font-condensed text-sm font-semibold uppercase tracking-[0.13em] text-cream backdrop-blur-sm transition-all duration-300 hover:bg-cream hover:text-ink"
          >
            Why Limousin?
          </Link>
        </motion.div>

        {/* Feature chips */}
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.95 } } }}
          className="mt-12 flex flex-wrap gap-2.5"
        >
          {chips.map((c) => (
            <motion.li
              key={c}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 rounded-sm border border-cream/15 bg-cream/[0.06] px-4 py-2 font-condensed text-[0.78rem] uppercase tracking-[0.1em] text-cream/85 backdrop-blur-md"
            >
              <Star className="h-2.5 w-2.5 text-gold-soft" />
              {c}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/60 md:flex"
      >
        <span className="font-condensed text-[0.62rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative flex h-9 w-[22px] justify-center rounded-full border border-cream/40 pt-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-cream/80"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
