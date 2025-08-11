"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const SOCIALS = [
  { name: "Instagram", icon: "/images/contact/instagram.svg", href: "#" },
  { name: "TikTok", icon: "/images/contact/tiktok.svg", href: "#" },
  { name: "X", icon: "/images/contact/x.svg", href: "#" },
] as const;

// shared fade-in + slide-up
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.26, ease: EASE },
};

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="text-white"
    >
      <div className="mx-auto max-w-[1160px] px-6 pt-16 pb-6 md:pt-20 md:pb-6 min-[1440px]:max-w-[1360px] min-[1960px]:max-w-[1860px] min-[1960px]:px-12">
        <div className="rounded-[24px] bg-[#121113] p-6 ring-1 ring-white/8 md:p-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_560px] md:gap-12">
            {/* left column */}
            <motion.div {...fadeUp}>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-white ring-1 ring-white/15">
                Contact
              </span>

              <h2
                id="contact-heading"
                className="mt-3 text-[32px] font-semibold leading-[1.06] tracking-[-0.02em] md:text-[40px] min-[1440px]:text-[48px]"
              >
                Get in touch
              </h2>

              <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.8] text-white/80">
                For any inquiries or to explore your vision further, we invite
                you to contact our professional team using the details provided
                below.
              </p>

              <dl className="mt-8 space-y-5 text-[15px]">
                <div className="flex gap-4">
                  <dt className="w-[92px] shrink-0 text-white/70">Office</dt>
                  <dd className="text-white/90">
                    150 Old Park Ln, London W1K 1QZ
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-[92px] shrink-0 text-white/70">Email</dt>
                  <dd className="text-white/90">hello@refit.com</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-[92px] shrink-0 text-white/70">Telephone</dt>
                  <dd className="text-white/90">07716 534984</dd>
                </div>
              </dl>

              <hr className="my-8 border-white/10" />

              <div>
                <div className="text-[15px] font-semibold text-white/90">
                  Follow us
                </div>
                <div className="mt-3 flex items-center gap-5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.name}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md ring-1 ring-white/20 transition hover:bg-white/5"
                    >
                      <Image
                        src={s.icon}
                        alt={s.name}
                        width={16}
                        height={16}
                        className="pointer-events-none"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* right column (form) */}
            <motion.form
              {...fadeUp}
              className="rounded-2xl bg-white p-6 text-neutral-900 shadow-lg ring-1 ring-black/5 md:p-8"
            >
              <label htmlFor="name" className="block text-sm font-medium">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                placeholder="John Smith"
                required
                className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[15px] outline-none placeholder:text-neutral-400"
              />

              <label htmlFor="email" className="mt-4 block text-sm font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="johnsmith@gmail.com"
                required
                className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[15px] outline-none placeholder:text-neutral-400"
              />

              <label htmlFor="phone" className="mt-4 block text-sm font-medium">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+44789 123456"
                className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[15px] outline-none placeholder:text-neutral-400"
              />

              <label
                htmlFor="message"
                className="mt-4 block text-sm font-medium"
              >
                Message<span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Hello, I'd like to enquire about..."
                required
                className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[15px] outline-none placeholder:text-neutral-400"
              />

              <div className="mt-5">
                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-neutral-700 text-white hover:bg-neutral-800"
                >
                  Send message
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
