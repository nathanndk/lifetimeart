"use client";

import Image from "next/image";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const images = [
  "/images/about/image1.png",
  "/images/about/image2.png",
  "/images/about/image3.png",
  "/images/about/image4.png",
  "/images/about/image5.png",
] as const;

const stats = [
  {
    value: "8",
    label: "Years experience",
    sub: "Improving homes with expert craftsmanship for years",
  },
  {
    value: "26",
    label: "Projects completed",
    sub: "Over 250 successful projects delivered with quality and care",
  },
  {
    value: "30",
    label: "Skilled Tradespeople",
    sub: "Our team of 30 experts ensures top-quality results",
  },
  {
    value: "100%",
    label: "Client satisfaction",
    sub: "All of our clients are satisfied with our work and service",
  },
] as const;

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const EASE = "easeOut";
  const dur = (ms: number) => (prefersReducedMotion ? 0 : ms / 1000);

  // desktop marquee
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const marqueeInView = useInView(marqueeRef, { once: true, amount: 0.25 });
  const loopImgs = useMemo(() => [...images, ...images], []);

  // mobile carousel
  const railRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const setItemRef = (idx: number) => (el: HTMLDivElement | null) => {
    itemRefs.current[idx] = el;
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!vis) return;
        const idx = itemRefs.current.findIndex((n) => n === vis.target);
        if (idx >= 0) setActive(idx);
      },
      { root: rail, threshold: [0.4, 0.6, 0.8] }
    );

    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToIndex = (i: number) => {
    const rail = railRef.current;
    const el = itemRefs.current[i];
    if (!rail || !el) return;
    rail.scrollTo({
      left: el.offsetLeft - rail.offsetLeft,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white text-neutral-900"
    >
      <div className="mx-auto max-w-[1160px] px-6 py-16 md:py-20 min-[1440px]:max-w-[1360px] min-[1960px]:max-w-[1860px] min-[1960px]:px-12">
        {/* title + copy */}
        <div className="grid grid-cols-1 gap-8 md:gap-12 min-[1024px]:grid-cols-[360px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: dur(260), ease: EASE }}
          >
            <span className="inline-flex items-center rounded-full bg-neutral-900 px-3 py-1 text-xs text-white ring-1 ring-black/10">
              About us
            </span>
            <h2
              id="about-heading"
              className="mt-4 font-semibold tracking-[-0.01em] leading-[1.02]
                         text-[28px] sm:text-[36px] min-[1024px]:text-[44px]
                         min-[1280px]:text-[48px] min-[1440px]:text-[56px]"
            >
              Home
              <br />
              Improvement
              <br />
              Specialists
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: dur(300), ease: EASE, delay: dur(80) }}
            className="text-[15px] leading-[1.8] text-neutral-700 max-w-[70ch]"
          >
            Welcome to <strong>LifetimeArt</strong>, your trusted home
            improvement experts, dedicated to transforming homes with precision
            and care. With years of experience in building kitchens, bathrooms,
            garages, and more, we deliver top-quality craftsmanship and a
            seamless customer experience. Our mission is to bring your vision to
            life while ensuring clear communication and expert guidance at every
            step.
          </motion.p>
        </div>

        {/* images */}
        <div
          className="mt-12 hidden min-[1024px]:block overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          aria-hidden
        >
          <motion.div
            ref={marqueeRef}
            className="flex gap-5 min-[1440px]:gap-6"
            animate={
              !prefersReducedMotion && marqueeInView
                ? { x: ["0%", "-50%"] }
                : { x: "0%" }
            }
            transition={
              !prefersReducedMotion && marqueeInView
                ? { duration: 28, ease: "linear", repeat: Infinity }
                : undefined
            }
          >
            {loopImgs.map((src, i) => {
              const isFirstSet = i < images.length;
              const delay = (i % images.length) * 0.08;

              return (
                <motion.figure
                  key={`${src}-${i}`}
                  initial={isFirstSet ? { opacity: 0, y: 10 } : undefined}
                  whileInView={isFirstSet ? { opacity: 1, y: 0 } : undefined}
                  viewport={
                    isFirstSet ? { once: true, amount: 0.3 } : undefined
                  }
                  transition={
                    isFirstSet
                      ? { duration: dur(240), ease: EASE, delay }
                      : undefined
                  }
                  className="relative shrink-0 overflow-hidden rounded-[16px] md:rounded-[20px] ring-1 ring-black/5"
                >
                  <div className="relative h-[280px] w-[320px] min-[1280px]:h-[320px] min-[1280px]:w-[360px] min-[1440px]:h-[360px] min-[1440px]:w-[400px]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="400px"
                      className="object-cover"
                      priority={i < 2}
                    />
                  </div>
                </motion.figure>
              );
            })}
          </motion.div>
        </div>

        {/* carousel (mobile/tablet) */}
        <div className="mt-10 min-[1024px]:hidden">
          <div
            ref={railRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-1"
          >
            {images.map((src, i) => (
              <motion.div
                key={src}
                ref={setItemRef(i)}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: dur(260), ease: EASE, delay: i * 0.06 }}
                className="snap-start shrink-0"
                style={{ scrollMarginLeft: "16px" }}
              >
                <div className="relative h-[220px] w-[78vw] sm:h-[260px] sm:w-[70vw] overflow-hidden rounded-[16px] ring-1 ring-black/5">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="80vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-[8px] w-[8px] rounded-full transition-opacity ${
                  active === i
                    ? "bg-neutral-900 opacity-90"
                    : "bg-neutral-300 opacity-70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* stats */}
        <div className="mt-14 grid grid-cols-1 gap-y-16 min-[1024px]:hidden">
          {stats.map((s, i) => (
            <motion.div
              key={`m-${s.label}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: dur(260), ease: EASE, delay: i * 0.1 }}
            >
              <div className="text-[56px] font-extrabold tracking-[-0.02em]">
                {s.value}
              </div>
              <div className="mt-2 text-[15px] font-semibold">{s.label}</div>
              <p className="mt-1 text-[13.5px] leading-[1.7] text-neutral-600 max-w-[40ch]">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 hidden min-[1024px]:grid grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={`d-${s.label}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: dur(260), ease: EASE, delay: i * 0.1 }}
            >
              <div className="text-[40px] min-[1280px]:text-[44px] min-[1440px]:text-[48px] font-extrabold tracking-[-0.02em]">
                {s.value}
              </div>
              <div className="mt-2 text-[15px] font-semibold">{s.label}</div>
              <p className="mt-1 text-[13.5px] leading-[1.7] text-neutral-600 max-w-[40ch]">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
