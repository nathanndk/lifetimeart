"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { services } from "@/lib/content";

type IconType = ComponentType<{ className?: string }>;
type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  icon?: IconType;
};

const FALLBACK_SLUG = "kitchens";
const GLOBAL_FALLBACK = "/images/services-kitchens.jpg";

const IMAGES: Record<string, string> = {
  kitchens: "/images/works/Kitchen.png",
  loft: "/images/works/LoftConversions.png",
  bathrooms: "/images/works/Bathroom.png",
  extensions: "/images/works/Extension.png",
  restorations: "/images/works/Restoration.png",
  external: "/images/works/ExternalWorks.png",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Ikon toggle: plus → X (rotasi 45°)
function PlusX({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="text-neutral-900"
      initial={false}
      animate={{ rotate: open ? 45 : 0 }}
      transition={{ duration: 0.22, ease: EASE }}
      aria-hidden
    >
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export default function Services() {
  const items = services as ServiceItem[];

  // Jika user menutup semua accordion, tampilan tetap pakai "kitchens"
  const [open, setOpen] = useState<string>(FALLBACK_SLUG);
  const selected = open || FALLBACK_SLUG;

  const current = useMemo(
    () => items.find((s) => s.slug === selected),
    [items, selected]
  );

  // Fallback berantai untuk gambar (png → jpg → global)
  const [imgSrc, setImgSrc] = useState<string>(
    IMAGES[selected] ?? GLOBAL_FALLBACK
  );
  useEffect(() => {
    setImgSrc(IMAGES[selected] ?? GLOBAL_FALLBACK);
  }, [selected]);

  const onImgError = () => {
    const primary = IMAGES[selected] ?? "";
    if (!primary) return setImgSrc(GLOBAL_FALLBACK);
    if (/\.png$/i.test(primary))
      return setImgSrc(primary.replace(/\.png$/i, ".jpg"));
    if (/\.jpe?g$/i.test(primary))
      return setImgSrc(primary.replace(/\.jpe?g$/i, ".png"));
    return setImgSrc(GLOBAL_FALLBACK);
  };

  const dur = 0.28;

  // Variants untuk gambar: fade + scale-up ringan saat berganti layanan
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.985 },
    show: { opacity: 1, scale: 1, transition: { duration: dur, ease: EASE } },
    exit: {
      opacity: 0,
      scale: 1.01,
      transition: { duration: dur, ease: EASE },
    },
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-[1160px] px-6 py-16 md:py-20 min-[1440px]:max-w-[1360px] min-[1960px]:max-w-[1860px] min-[1960px]:px-12">
        {/* Heading: fade-in + sedikit naik */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.26, ease: EASE }}
          className="text-center"
        >
          <span className="inline-flex rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
            Services
          </span>
          <h2
            id="services-heading"
            className="mt-3 text-[28px] sm:text-[34px] md:text-[40px] font-semibold tracking-[-0.01em]"
          >
            What we do
          </h2>
          <p className="mx-auto mt-3 max-w-[56ch] text-[15px] leading-[1.8] text-neutral-600">
            Find out which one of our services fit the needs of your project
          </p>
        </motion.div>

        {/* Gambar selalu tampil di semua breakpoint */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12">
          <div className="relative overflow-hidden rounded-[18px] sm:rounded-[22px] md:rounded-[24px] bg-neutral-100">
            <div
              className="relative w-full"
              style={{ aspectRatio: "4 / 3", minHeight: 260 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={imgSrc}
                  variants={imageVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={imgSrc}
                    alt={current?.title ?? "Kitchens"}
                    fill
                    className="object-cover"
                    sizes="(max-width:1023px) 100vw, 48vw"
                    priority
                    onError={onImgError}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Accordion */}
          <div className="divide-y divide-neutral-200/80 border-y border-neutral-200/80">
            {items.map((s) => {
              const Icon = s.icon as IconType | undefined;
              const isOpen = open === s.slug;

              return (
                <div key={s.slug} className="select-none">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`svc-${s.slug}`}
                    onClick={() => setOpen(isOpen ? "" : s.slug)}
                    className={`flex w-full items-center gap-3 py-4 text-left transition-colors ${
                      isOpen
                        ? "text-neutral-900"
                        : "text-neutral-700 hover:text-neutral-900"
                    }`}
                  >
                    <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-md ring-1 ring-neutral-200">
                      {Icon ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          className="fill-none stroke-current"
                          aria-hidden
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            strokeWidth="1.5"
                          />
                          <path d="M7 3v18M3 8h18" strokeWidth="1.5" />
                        </svg>
                      )}
                    </span>

                    <span className="mr-auto text-[15px] md:text-[16px] font-semibold">
                      {s.title}
                    </span>
                    <PlusX open={isOpen} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`svc-${s.slug}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: dur, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.24, ease: EASE }}
                          className="pb-5 pl-[3.75rem] text-[14.5px] leading-[1.8] text-neutral-600"
                        >
                          {s.description}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
