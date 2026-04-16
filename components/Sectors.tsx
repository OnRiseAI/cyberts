"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { brand } from "@/lib/brand";
import { fadeUp, fadeUpSmall, stagger, inView } from "@/lib/motion";

const sectorIcons: Record<string, React.ReactNode> = {
  medical: (
    <g>
      <circle cx="24" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M 18 22 Q 24 34 30 22 M 12 30 Q 24 44 36 30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 24 10 Q 16 6 10 12 M 24 10 Q 32 6 38 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  ),
  legal: (
    <g>
      <line x1="24" y1="8" x2="24" y2="42" stroke="currentColor" strokeWidth="1.4" />
      <line x1="12" y1="14" x2="36" y2="14" stroke="currentColor" strokeWidth="1.4" />
      <path d="M 16 14 L 10 30 Q 10 34 16 34 Q 22 34 22 30 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M 32 14 L 26 30 Q 26 34 32 34 Q 38 34 38 30 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="16" y1="42" x2="32" y2="42" stroke="currentColor" strokeWidth="1.4" />
    </g>
  ),
  defence: (
    <g>
      <path d="M 24 6 L 30 18 L 42 20 L 33 28 L 35 40 L 24 34 L 13 40 L 15 28 L 6 20 L 18 18 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  ),
  banking: (
    <g>
      <line x1="6" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="1.4" />
      <line x1="8" y1="36" x2="40" y2="36" stroke="currentColor" strokeWidth="1.4" />
      <path d="M 24 6 L 42 16 L 6 16 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="12" y1="20" x2="12" y2="34" stroke="currentColor" strokeWidth="1.4" />
      <line x1="20" y1="20" x2="20" y2="34" stroke="currentColor" strokeWidth="1.4" />
      <line x1="28" y1="20" x2="28" y2="34" stroke="currentColor" strokeWidth="1.4" />
      <line x1="36" y1="20" x2="36" y2="34" stroke="currentColor" strokeWidth="1.4" />
    </g>
  ),
};

export function Sectors() {
  return (
    <section className="relative py-24 md:py-40 px-6 sm:px-8 md:px-14 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src="/bg/millennium-bridge.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.07] grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/70 to-transparent pointer-events-none" />
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={stagger(0, 0.1)}
      >
        <motion.div variants={fadeUpSmall} className="flex items-center gap-4 mb-14">
          <span className="eyebrow">Section 05 · High-Risk Environments</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 mb-20 items-end">
          <motion.h2 variants={fadeUp} className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] max-w-2xl">
            Where the cost of
            <br />
            <span className="text-lime">a breach is measured</span>
            <br />
            in <span className="text-gold">decades of trust.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-base leading-relaxed max-w-md">
            CyberTS protects the sectors where one incident rewrites a company&apos;s future — where IP theft, patient data loss, or payment compromise is not recoverable with a press release. Each of these environments carries a different regulator, a different attacker profile, and a different definition of catastrophic loss. We build a defence for each one individually — never a template stretched across four industries it was never designed to cover.
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          variants={stagger(0.2, 0.14)}
        >
          {brand.sectors.map((sector, i) => (
            <motion.div
              key={sector.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="frame-gold p-7 md:p-9 h-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-10">
                <motion.svg
                  width="40" height="40" viewBox="0 0 48 48" className="text-gold"
                  whileHover={{ rotate: 4, scale: 1.06 }}
                  transition={{ duration: 0.4 }}
                >
                  {sectorIcons[sector.id]}
                </motion.svg>
                <span className="display-wide text-[9px] text-gold/80 mt-1">0{i + 1}</span>
              </div>

              <h3 className="display text-base md:text-lg text-soft leading-snug mb-4">
                {sector.name}
              </h3>
              <p style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-xs md:text-[13px] leading-relaxed mb-auto">
                {sector.copy}
              </p>

              <div className="mt-6 pt-6 border-t border-gold/20">
                <p className="display-wide text-[9px] text-gold/80 mb-2">Threat Pattern</p>
                <p style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-[11px] md:text-xs leading-relaxed mb-4">
                  {sector.threat}
                </p>
                <p className="display-wide text-[9px] text-gold/80 mb-2">Regulatory Scope</p>
                <p className="font-[family-name:var(--font-inter)] text-[10px] md:text-[11px] text-gold/90 leading-snug tracking-wide">
                  {sector.regulations}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
