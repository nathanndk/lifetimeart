"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import StatusPill from "@/components/atoms/StatusPill";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { useRef, useState } from "react";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Our work" },
  { href: "#faqs", label: "FAQs" },
  { href: "#contact", label: "Contact" },
] as const;

function LogoMark() {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3.2"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
        />
      </svg>
      <span className="font-semibold">LifetimeArt</span>
    </div>
  );
}

/** Nav kecil di dalam kartu (≥1440px) */
function IncardNav({ className = "" }: { className?: string }) {
  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`pointer-events-auto hidden min-[1440px]:block ${className}`}
    >
      <ul className="flex flex-nowrap items-center justify-center gap-5 xl:gap-6 2xl:gap-8 text-white/90 text-[13.5px] xl:text-[14px] px-2">
        {NAV.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              className="group relative whitespace-nowrap px-1 py-1 transition-colors duration-150 hover:text-white"
            >
              {it.label}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -bottom-[6px] mx-auto h-[1.5px] w-0 bg-current transition-[width] duration-200 group-hover:w-full"
              />
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

/** 1024–1439: top bar ala mobile tapi semua item tampil */
function TabletTopBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute left-0 right-0 top-4 z-20 hidden lg:block min-[1440px]:hidden"
    >
      <div className="mx-auto w-full max-w-[1220px] px-4 md:px-6">
        <div className="flex h-11 items-center justify-between rounded-xl bg-white/10 px-3.5 ring-1 ring-white/15 backdrop-blur shadow-[0_6px_24px_rgba(0,0,0,0.25)]">
          <a href="#" className="text-white">
            <LogoMark />
          </a>
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-5 xl:gap-6 text-[13.5px] text-white/90">
              {NAV.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    className="group relative px-1.5 py-1 transition-colors duration-150 hover:text-white"
                  >
                    {it.label}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 -bottom-[6px] mx-auto h-[1.5px] w-0 bg-current transition-[width] duration-200 group-hover:w-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </motion.div>
  );
}

/** <1024: mobile bar + drawer */
function MobileTopBar({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="lg:hidden mx-auto w-full max-w-[920px] px-4 pt-3"
    >
      <div className="flex h-11 items-center justify-between rounded-xl bg-white/10 px-3.5 ring-1 ring-white/15 backdrop-blur shadow-[0_6px_24px_rgba(0,0,0,0.25)]">
        <a href="#" className="text-white">
          <LogoMark />
        </a>
        <button
          onClick={onOpen}
          aria-label="Open menu"
          className="inline-flex flex-col justify-center gap-[5px] rounded-md p-1.5"
        >
          <span className="block h-[2px] w-6 bg-white" />
          <span className="block h-[2px] w-6 bg-white" />
          <span className="block h-[2px] w-6 bg-white" />
        </button>
      </div>
    </motion.div>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <motion.div
      className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-lg lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-4">
        <span className="text-white">
          <LogoMark />
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-full p-3 bg-white/10 ring-1 ring-white/20"
        >
          <div className="relative h-4 w-4">
            <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 rotate-45 bg-white" />
            <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 -rotate-45 bg-white" />
          </div>
        </button>
      </div>

      <div className="h-full w-full px-6 pt-20">
        <ul className="flex flex-col gap-6 text-white">
          {NAV.map((it) => (
            <li key={it.label}>
              <a
                href={it.href}
                onClick={onClose}
                className="block text-[22px] leading-6"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

const headlineLines = [
  "Your trusted partner",
  "for quality home",
  "improvement",
] as const;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  // parallax lembut
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -16]
  );

  // presets
  const dur = (ms: number) => (prefersReducedMotion ? 0 : ms / 1000);
  const fadeDown: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: dur(220) } },
  };
  const lineParent: Variants = {
    initial: {},
    animate: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 },
    },
  };
  const lineChild: Variants = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: dur(280) } },
  };
  const fadeUp: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: dur(240) } },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative bg-[#0C0C0C] text-white"
    >
      {/* aksesibilitas heading */}
      <h1 id="hero-heading" className="sr-only">
        LifetimeArt — Home improvement specialists
      </h1>

      <MobileTopBar onOpen={() => setOpen(true)} />
      <MobileDrawer open={open} onClose={() => setOpen(false)} />

      {/* <1440px */}
      <div className="hidden max-[1439px]:block">
        <TabletTopBar />

        <div className="mx-auto max-w-[1220px] px-4 md:px-6 py-10 md:py-14">
          <motion.figure
            style={{ y }}
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: dur(360), ease: "easeOut" }}
            className="relative overflow-hidden rounded-[24px] ring-1 ring-white/10 shadow-[0_16px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="relative h-[560px] sm:h-[620px] lg:h-[720px] xl:h-[760px]">
              <Image
                src="/images/hero-desktop.png"
                alt="Warm modern kitchen with framed palm artwork above a wooden dining table."
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 96vw, (max-width: 1024px) 92vw, 1100px"
              />
            </div>

            <div className="absolute inset-0 flex items-center">
              <div className="px-5 sm:px-8 lg:px-10">
                <motion.div
                  variants={fadeDown}
                  initial="initial"
                  animate="animate"
                >
                  <StatusPill label="Available for work" />
                </motion.div>

                <motion.div
                  variants={lineParent}
                  initial="initial"
                  animate="animate"
                  className="mt-4 sm:mt-5"
                >
                  <motion.p
                    className="block text-[34px] leading-[1.06] tracking-[-0.01em] font-extrabold max-w-[12ch] sm:hidden"
                    variants={lineChild}
                  >
                    Your trusted partner
                  </motion.p>
                  <motion.p
                    className="block text-[34px] leading-[1.06] tracking-[-0.01em] font-extrabold max-w-[12ch] sm:hidden"
                    variants={lineChild}
                  >
                    for quality home
                  </motion.p>
                  <motion.p
                    className="block text-[34px] leading-[1.06] tracking-[-0.01em] font-extrabold max-w-[12ch] sm:hidden"
                    variants={lineChild}
                  >
                    improvement
                  </motion.p>

                  <div className="hidden sm:block">
                    {headlineLines.map((line) => (
                      <motion.p
                        key={line}
                        variants={lineChild}
                        className="text-[46px] md:text-[52px] lg:text-[56px] leading-[1.04] tracking-[-0.01em] font-extrabold max-w-[18ch] lg:max-w-[20ch]"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: dur(80) }}
                  className="mt-3 sm:mt-4 text-neutral-200/90 text-[15px] leading-relaxed max-w-[56ch]"
                >
                  LifetimeArt delivers expert home improvements, creating
                  beautiful and functional spaces with quality craftsmanship.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: dur(160) }}
                  className="mt-6"
                >
                  <Button className="group h-12 rounded-2xl bg-neutral-800 px-6 ring-1 ring-white/10 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-neutral-700">
                    Work with us
                    <span className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.figure>
        </div>
      </div>

      {/* 1440–1959px */}
      <div className="hidden min-[1440px]:block min-[1960px]:hidden">
        <div className="mx-auto max-w-[1360px] px-8 py-20">
          <div className="pointer-events-auto absolute left-8 top-8 z-20 flex h-11 items-center text-white">
            <a href="#" aria-label="LifetimeArt">
              <LogoMark />
            </a>
          </div>

          <div className="grid grid-cols-[680px_1fr] items-center gap-16">
            <div>
              <motion.div
                variants={fadeDown}
                initial="initial"
                animate="animate"
              >
                <StatusPill label="Available for work" />
              </motion.div>

              <motion.div
                aria-hidden
                variants={lineParent}
                initial="initial"
                animate="animate"
                className="mt-6"
              >
                {headlineLines.map((line) => (
                  <motion.p
                    key={line}
                    variants={lineChild}
                    className="text-[60px] leading-[1.04] tracking-[-0.022em] font-extrabold max-w-[12ch]"
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>

              <motion.p
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ delay: dur(80) }}
                className="mt-6 text-[16px] leading-[1.7] text-neutral-300 max-w-[46ch]"
              >
                LifetimeArt delivers expert home improvements, creating
                beautiful and functional spaces with quality craftsmanship.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ delay: dur(160) }}
                className="mt-8"
              >
                <Button className="group h-12 rounded-2xl bg-neutral-800 px-6 ring-1 ring-white/10 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-neutral-700">
                  Work with us
                  <span className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Button>
              </motion.div>
            </div>

            <motion.figure
              style={{ y }}
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: dur(360), ease: "easeOut" }}
              className="relative overflow-hidden rounded-[28px] shadow-[0_24px_120px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
            >
              <div className="relative h-[820px]">
                <Image
                  src="/images/hero-desktop.png"
                  alt="Warm modern kitchen with framed palm artwork above a wooden dining table."
                  fill
                  priority
                  className="object-cover"
                  sizes="820px"
                />
              </div>

              <IncardNav className="absolute inset-x-0 top-4" />

              <motion.figcaption
                initial={{ opacity: 0, x: 16, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: dur(300), delay: dur(180) }}
                className="absolute bottom-6 right-6 hidden max-w-[500px] items-start gap-3 rounded-2xl bg-white/12 p-6 text-white backdrop-blur-md ring-1 ring-white/20 shadow-lg xl:flex"
              >
                <div className="select-none text-lg" aria-hidden>
                  {"★★★★★"}
                </div>
                <blockquote className="text-[14px] leading-[1.7]">
                  “LifetimeArt has been a game-changer for my home. Their
                  ability to blend functionality with exquisite design is
                  unparalleled.”
                </blockquote>
              </motion.figcaption>
            </motion.figure>
          </div>
        </div>
      </div>

      {/* ≥1960px */}
      <div className="hidden min-[1960px]:block">
        <div className="mx-auto max-w-[1860px] px-12 py-24">
          <div className="pointer-events-auto absolute left-12 top-8 z-20 flex h-12 items-center text-white">
            <a href="#" aria-label="LifetimeArt">
              <LogoMark />
            </a>
          </div>

          <motion.figure
            style={{ y }}
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: dur(380), ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] shadow-[0_28px_140px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
          >
            <div className="relative h-[860px]">
              <Image
                src="/images/hero-desktop.png"
                alt="Warm modern kitchen with framed palm artwork above a wooden dining table."
                fill
                priority
                className="object-cover"
                sizes="1860px"
              />
            </div>

            <IncardNav className="absolute inset-x-0 top-4" />

            <div className="absolute inset-0 flex items-center">
              <div className="px-16">
                <motion.div
                  variants={fadeDown}
                  initial="initial"
                  animate="animate"
                >
                  <StatusPill label="Available for work" />
                </motion.div>

                <motion.div
                  variants={lineParent}
                  initial="initial"
                  animate="animate"
                  className="mt-6"
                >
                  {headlineLines.map((line) => (
                    <motion.p
                      key={line}
                      variants={lineChild}
                      className="text-[72px] leading-[1.03] tracking-[-0.022em] font-extrabold max-w-[12ch]"
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: dur(100) }}
                  className="mt-6 max-w-[820px] text-[18px] leading-[1.7] text-white/90"
                >
                  LifetimeArt delivers expert home improvements, creating
                  beautiful and functional spaces with quality craftsmanship.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: dur(180) }}
                  className="mt-8"
                >
                  <Button className="group h-12 rounded-2xl bg-neutral-800 px-6 ring-1 ring-white/10 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-neutral-700">
                    Work with us
                    <span className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
