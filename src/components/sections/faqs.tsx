"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { faqs } from "@/lib/content";

type FAQ = { q: string; a: string };

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

export default function FAQs() {
  const items = useMemo(() => faqs as FAQ[], []);
  const [open, setOpen] = useState<string | null>(items[0]?.q ?? null);
  const dur = 0.28;

  return (
    <section id="faqs" aria-labelledby="faqs-heading" className="bg-white">
      <div className="mx-auto max-w-[1160px] px-6 py-16 md:py-20 min-[1440px]:max-w-[1360px] min-[1960px]:max-w-[1860px] min-[1960px]:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[420px_1fr] md:gap-14">
          {/* kiri */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.26, ease: EASE }}
            className="md:pr-4"
          >
            <div className="mx-auto max-w-[560px] text-center md:max-w-none md:text-left">
              <span className="inline-flex rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
                FAQs
              </span>
              <h2
                id="faqs-heading"
                className="mt-3 text-[40px] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[46px] md:text-[44px] md:leading-[1.08]"
              >
                Answering Your
                <br />
                Questions
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                Got more questions? Send us your enquiry below
              </p>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.26, ease: EASE, delay: 0.06 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-6 inline-flex h-12 items-center rounded-full bg-neutral-100 px-4 text-neutral-900 ring-1 ring-black/10 transition-colors hover:bg-neutral-200"
              >
                Get in touch
                <span className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* kanan */}
          <div className="mx-auto w-full max-w-[560px] md:mx-0 md:max-w-none">
            <div className="space-y-4">
              {items.map((f) => {
                const isOpen = open === f.q;
                return (
                  <div
                    key={f.q}
                    className="overflow-hidden rounded-[16px] border border-neutral-200 bg-neutral-50"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${encodeURIComponent(f.q)}`}
                      onClick={() => setOpen(isOpen ? null : f.q)}
                      className="w-full px-6 py-4 text-left"
                    >
                      <div className="flex w-full items-start justify-between gap-4">
                        <span className="text-[16px] text-neutral-900 md:text-[17px]">
                          {f.q}
                        </span>
                        <PlusX open={isOpen} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-${encodeURIComponent(f.q)}`}
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: dur, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.24, ease: EASE }}
                            className="px-6 pb-5 text-[15px] leading-relaxed text-neutral-600"
                          >
                            {f.a}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
