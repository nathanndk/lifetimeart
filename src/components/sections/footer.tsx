"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#about", label: "About us" },
  { href: "#work", label: "Our work" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faqs", label: "FAQs" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-transparent">
      <div className="mx-auto max-w-[1160px] px-6 pt-0 pb-0 min-[1440px]:max-w-[1360px] min-[1960px]:max-w-[1860px] min-[1960px]:px-12">
        {/* small fade on reveal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="mt-4 rounded-t-[24px] bg-[#121113] p-6 text-white ring-1 ring-white/8 md:p-10"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_360px]">
            {/* brand */}
            <div className="flex items-start">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo.svg"
                  alt="LifetimeArt logo"
                  width={22}
                  height={22}
                />
                <span className="text-lg font-semibold tracking-[-0.01em]">
                  LifetimeArt
                </span>
              </div>
            </div>

            {/* quick links */}
            <nav aria-label="Footer navigation">
              <div className="text-sm font-semibold tracking-[-0.005em]">
                Quick links
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-white/70">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <hr className="my-8 border-white/10" />

          {/* legal */}
          <p className="text-xs text-white/60">
            © {year} LifetimeArt. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
