"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { nav } from "@/data/site";
import { ButtonLink } from "@/components/ui";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Home page has a full-bleed video hero, so the bar starts transparent there.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !overHero;
  const light = overHero && !scrolled; // light text over the dark hero

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b-2 border-gold/30 bg-bone/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-edge flex h-[4.6rem] items-center justify-between">
        <Link href="/" aria-label={`${"Rocking C Cattle"} home`} className="shrink-0">
          <Logo variant={light ? "light" : "dark"} markClassName="h-9 w-9" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline font-condensed text-[0.82rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                  light
                    ? "text-cream/85 hover:text-cream"
                    : "text-ink/75 hover:text-ink"
                } ${active ? "!opacity-100" : ""}`}
              >
                <span className={active ? "text-rust" : ""}>{item.label}</span>
              </Link>
            );
          })}
          <ButtonLink href="/contact" variant={light ? "light" : "primary"} className="!px-6 !py-2.5">
            Inquire
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`relative z-50 flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
            light && !open ? "text-cream" : "text-ink"
          }`}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col items-center justify-center gap-[5px]">
            <span
              className={`h-[2px] w-6 rounded bg-current transition-all duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 rounded bg-current transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 rounded bg-current transition-all duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bone lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-10 pt-28">
              <div className="flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-ink/10 py-5 font-display text-3xl text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto"
              >
                <ButtonLink href="/contact" withArrow className="w-full">
                  Inquire about a bull
                </ButtonLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
