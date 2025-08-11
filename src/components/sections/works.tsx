"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

type Project = {
  slug: string;
  title: string;
  image: string;
  dark?: boolean;
  tags: [string, string];
  desc: string;
  quote: string;
  author: string;
  avatarUrl?: string; // path di /public
};

const PROJECTS: Project[] = [
  {
    slug: "modern-kitchen",
    title: "Modern kitchen refit",
    image: "/images/works/works1.png",
    dark: false,
    tags: ["Kitchen", "4 weeks"],
    desc: "This kitchen transformation brought sleek, modern design and enhanced functionality to our client's home. We installed custom cabinetry, high-quality worktops, and state-of-the-art appliances, creating a stylish yet practical space perfect for cooking and entertaining. With attention to every detail, we delivered a kitchen that balances aesthetics and usability.",
    quote:
      "LifetimeArt completely transformed our kitchen, making it both beautiful and highly functional. The craftsmanship was outstanding, and the team was professional and communicative throughout. We couldn't be happier with the result!",
    author: "Rachel Morgan",
    avatarUrl: "/images/works/avatar1.png",
  },
  {
    slug: "garden-path",
    title: "External garden path build",
    image: "/images/works/works2.png",
    dark: true,
    tags: ["External Works", "6 weeks"],
    desc: "Our team designed and built a durable, visually appealing garden path to enhance the outdoor space. Using premium materials, we created a seamless walkway that blends naturally with the landscape, providing both functionality and aesthetic charm. The result is a stylish, well-crafted path that elevates the overall garden design.",
    quote:
      "The team at LifetimeArt did an amazing job on our garden path. It’s sturdy, looks fantastic, and has completely transformed our outdoor space. They listened to our vision and delivered exactly what we wanted—highly recommended!",
    author: "Michael Turner",
    avatarUrl: "/images/works/avatar2.png",
  },
  {
    slug: "bathroom-renovation",
    title: "Bathroom renovation",
    image: "/images/works/works3.png",
    dark: false,
    tags: ["Kitchen", "4 weeks"],
    desc: "We revitalized this bathroom with a fresh, modern design, incorporating high-end tiling, sleek fixtures, and efficient lighting. The layout was optimized to maximize space, creating a luxurious and relaxing atmosphere. The final result is a beautifully crafted bathroom that enhances both comfort and functionality.",
    quote:
      "LifetimeArt delivered a stunning bathroom that feels luxurious and practical. The finish is exceptional, and the process was smooth from start to finish.",
    author: "Laura Davies",
    avatarUrl: "/images/works/avatar3.png",
  },
] as const;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASE },
  },
};

const Pill = ({
  children,
  variant = "dark",
}: {
  children: string;
  variant?: "dark" | "light";
}) => (
  <span
    className={
      variant === "dark"
        ? "inline-flex items-center rounded-full bg-neutral-900/90 px-3 py-1 text-xs text-white"
        : "inline-flex items-center rounded-full bg-white/12 px-3 py-1 text-xs text-white ring-1 ring-white/20"
    }
  >
    {children}
  </span>
);

function ProjectCard({
  p,
  compact = false,
  delay = 0,
}: {
  p: Project;
  compact?: boolean;
  delay?: number; // untuk stagger manual saat tidak pakai parent variants (mobile)
}) {
  const isDark = !!p.dark;

  const Avatar = () =>
    p.avatarUrl ? (
      <div
        className={
          "h-8 w-8 overflow-hidden rounded-full " +
          (isDark ? "ring-1 ring-white/25" : "ring-1 ring-black/10")
        }
      >
        <Image
          src={p.avatarUrl}
          alt={p.author}
          width={32}
          height={32}
          className="h-full w-full object-cover"
        />
      </div>
    ) : (
      <span
        aria-hidden
        className={
          "h-8 w-8 rounded-full " +
          (isDark
            ? "bg-white/20 ring-1 ring-white/25"
            : "bg-neutral-300 ring-1 ring-black/10")
        }
      />
    );

  return (
    <motion.article
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.28, ease: EASE, delay }}
      className={[
        "overflow-hidden rounded-[22px] md:rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.12)] ring-1",
        isDark
          ? "bg-[#0F0F10] text-white ring-white/10"
          : "bg-[#E9ECEF] text-neutral-900 ring-black/10",
      ].join(" ")}
    >
      {/* gambar untuk mobile */}
      <div className={compact ? "p-4" : ""}>
        <div
          className={[
            "relative overflow-hidden rounded-[16px]",
            compact ? "aspect-[16/11] ring-1" : "hidden",
            isDark ? "ring-white/15" : "ring-black/10",
            "md:hidden",
          ].join(" ")}
        >
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* grid desktop */}
      <div className="hidden md:grid md:grid-cols-2">
        <div className="relative md:h-[380px] lg:h-[430px]">
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(min-width:1024px) 620px, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="flex flex-col justify-center gap-3 p-8">
          <h3 className="text-[28px] md:text-[34px] font-bold tracking-[-0.02em]">
            {p.title}
          </h3>
          <p
            className={
              isDark
                ? "text-white/85 text-[15px] leading-[1.75]"
                : "text-neutral-800 text-[15px] leading-[1.75]"
            }
          >
            {p.desc}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {isDark ? (
              <>
                <Pill variant="light">{p.tags[0]}</Pill>
                <Pill variant="light">{p.tags[1]}</Pill>
              </>
            ) : (
              <>
                <Pill>{p.tags[0]}</Pill>
                <Pill>{p.tags[1]}</Pill>
              </>
            )}
          </div>
          <div
            className={[
              "mt-4 rounded-[14px] p-4",
              isDark
                ? "bg-white/6 ring-1 ring-white/12"
                : "bg-white/70 ring-1 ring-black/10",
            ].join(" ")}
          >
            <div
              className={
                isDark
                  ? "text-[15px] leading-relaxed text-white/90"
                  : "text-[15px] leading-relaxed text-neutral-800"
              }
            >
              <span aria-hidden className="mr-2">
                “
              </span>
              {p.quote}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <Avatar />
              <span className={isDark ? "text-white/80" : "text-neutral-700"}>
                {p.author}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* konten mobile */}
      <div className="md:hidden px-4 pb-5">
        <h3 className="text-[26px] font-bold tracking-[-0.02em]">{p.title}</h3>
        <p
          className={
            isDark
              ? "text-white/85 text-[15px] leading-[1.75]"
              : "text-neutral-800 text-[15px] leading-[1.75]"
          }
        >
          {p.desc}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {isDark ? (
            <>
              <Pill variant="light">{p.tags[0]}</Pill>
              <Pill variant="light">{p.tags[1]}</Pill>
            </>
          ) : (
            <>
              <Pill>{p.tags[0]}</Pill>
              <Pill>{p.tags[1]}</Pill>
            </>
          )}
        </div>
        <div
          className={[
            "mt-4 rounded-[14px] p-4",
            isDark
              ? "bg-white/6 ring-1 ring-white/12"
              : "bg-white/70 ring-1 ring-black/10",
          ].join(" ")}
        >
          <div
            className={
              isDark
                ? "text-[15px] leading-relaxed text-white/90"
                : "text-[15px] leading-relaxed text-neutral-800"
            }
          >
            <span aria-hidden className="mr-2">
              “
            </span>
            {p.quote}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Avatar />
            <span className={isDark ? "text-white/80" : "text-neutral-700"}>
              {p.author}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    const target = child.offsetLeft - (el.clientWidth - child.clientWidth) / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let delta = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const ch = c as HTMLElement;
        const chCenter = ch.offsetLeft + ch.clientWidth / 2;
        const d = Math.abs(chCenter - center);
        if (d < delta) {
          delta = d;
          best = i;
        }
      });
      setActive(best);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="work" aria-labelledby="work-heading" className="bg-white">
      <div className="mx-auto max-w-[1160px] px-6 py-16 md:py-20 min-[1440px]:max-w-[1360px] min-[1960px]:max-w-[1860px] min-[1960px]:px-12">
        {/* header animasi */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.26, ease: EASE }}
          className="text-center"
        >
          <span className="inline-flex rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
            Our work
          </span>
          <motion.h2
            id="work-heading"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.26, ease: EASE, delay: 0.04 }}
            className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[48px]"
          >
            Get inspired by our work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.24, ease: EASE, delay: 0.08 }}
            className="mx-auto mt-3 max-w-[720px] text-[15px] leading-relaxed text-neutral-600"
          >
            Selected renovations and new builds.
          </motion.p>
        </motion.div>

        {/* mobile carousel + stagger ringan */}
        <div className="md:hidden mt-10">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2"
          >
            {PROJECTS.map((p, i) => (
              <div
                key={p.slug}
                className="snap-center shrink-0 w-[86vw] max-w-[520px]"
              >
                <ProjectCard p={p} compact delay={i * 0.1} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={
                  "h-2 w-2 rounded-full transition " +
                  (active === i ? "bg-neutral-900" : "bg-neutral-300")
                }
              />
            ))}
          </div>
        </div>

        {/* desktop sticky stack + parent stagger */}
        <div className="relative mt-10 hidden md:block">
          <motion.ul
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-10"
          >
            {PROJECTS.map((p, i) => (
              <li
                key={p.slug}
                className="sticky top-[96px] lg:top-[110px]"
                style={{ zIndex: 10 + i }}
              >
                <ProjectCard p={p} />
              </li>
            ))}
          </motion.ul>
          <div className="h-16" />
        </div>
      </div>
    </section>
  );
}
