"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type T = {
  name: string;
  role: string;
  quote: string;
  avatarUrl?: string;
};

const ROW1: T[] = [
  {
    name: "Emily Carter",
    role: "Homeowner",
    quote:
      "Brilliant service from start to finish. The team was professional, communicative, and the results exceeded my expectations. My new bathroom looks amazing!",
    avatarUrl: "/images/works/avatar1.png",
  },
  {
    name: "Emily Carter",
    role: "Homeowner",
    quote:
      "I couldn’t be happier with my loft conversion. The attention to detail and quality of work were outstanding. Refit made the whole process smooth and stress-free!",
    avatarUrl: "/images/works/avatar1.png",
  },
  {
    name: "Emily Carter",
    role: "Homeowner",
    quote:
      "Refit transformed our outdoor space with a beautiful garden path. The work was completed on time, and the finish is excellent. A great team to work with!",
    avatarUrl: "/images/works/avatar1.png",
  },
  {
    name: "Emily Carter",
    role: "Homeowner",
    quote:
      "I couldn’t be happier with my loft conversion. The attention to detail and quality of work were outstanding. Refit made the whole process smooth and stress-free!",
    avatarUrl: "/images/works/avatar1.png",
  },
];

const ROW2: T[] = [...ROW1];

function Card({
  t,
  tinted = false,
  className = "",
}: {
  t: T;
  tinted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl p-6 shadow-sm ring-1",
        tinted ? "bg-[#EFF1F5] ring-neutral-200" : "bg-white ring-neutral-200",
        className,
      ].join(" ")}
    >
      <div className="text-[14px]" aria-hidden>
        {"★★★★★"}
      </div>
      <p className="mt-3 text-[15px] leading-[1.7] text-neutral-700">
        “{t.quote}”
      </p>
      <div className="mt-5 flex items-center gap-3">
        {/* Avatar: dukung PNG/JPG/SVG dari /public */}
        <div
          className={[
            "relative h-9 w-9 overflow-hidden rounded-full",
            tinted ? "ring-1 ring-black/5" : "ring-1 ring-black/5",
          ].join(" ")}
        >
          {t.avatarUrl ? (
            <Image
              src={t.avatarUrl}
              alt={t.name}
              fill
              sizes="36px"
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="block h-full w-full bg-neutral-300/70"
            />
          )}
        </div>

        <div>
          <div className="text-[14px] font-medium text-neutral-900">
            {t.name}
          </div>
          <div className="text-[12px] text-neutral-500">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // marquee rows (tetap seperti semula untuk ≥ md)
  const loop1 = useMemo(() => [...ROW1, ...ROW1], []);
  const loop2 = useMemo(() => [...ROW2, ...ROW2], []);

  // --- Mobile carousel (scroll-snap) ---
  const slides = ROW1;
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      // karena tiap slide = w-full, index simpel:
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if (i !== idx) setIdx(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [idx]);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white"
    >
      {/* container 1160/1360/1860 */}
      <div className="mx-auto max-w-[1160px] px-6 py-16 md:py-20 min-[1440px]:max-w-[1360px] min-[1960px]:max-w-[1860px] min-[1960px]:px-12">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="mt-3 font-semibold tracking-[-0.02em] leading-[1.06]
                       text-[40px] sm:text-[46px] md:text-[52px]"
          >
            Hear from our clients
          </h2>
          <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-relaxed text-neutral-600">
            Hear from our happy clients about their experience working with
            Refit and the quality of our craftsmanship.
          </p>
        </div>

        {/* Mobile: single-card carousel */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            className="mt-8 flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {slides.map((t, i) => (
              <div key={`m-${i}`} className="w-full shrink-0 snap-start px-0">
                <div className="mx-auto w-[92%] max-w-[380px]">
                  <Card t={t} tinted className="min-h-[260px]" />
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {slides.map((_, i) => (
              <span
                key={`dot-${i}`}
                className={[
                  "h-1.5 w-1.5 rounded-full",
                  idx === i ? "bg-neutral-800" : "bg-neutral-300",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        {/* Desktop/Tablet: dua baris marquee (motion dipertahankan) */}
        <div className="hidden md:block">
          <div className="mt-10 overflow-hidden marquee-mask">
            <motion.div className="marquee-rtl flex gap-8">
              {loop1.map((t, i) => (
                <Card
                  key={`r1-${i}`}
                  t={t}
                  tinted={i % 2 === 1}
                  className="min-w-[340px] max-w-[380px]"
                />
              ))}
            </motion.div>
          </div>

          <div className="mt-8 overflow-hidden marquee-mask">
            <motion.div className="marquee-ltr flex gap-8">
              {loop2.map((t, i) => (
                <Card
                  key={`r2-${i}`}
                  t={t}
                  tinted={i % 2 === 0}
                  className="min-w-[340px] max-w-[380px]"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
