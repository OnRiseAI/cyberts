"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { brand } from "@/lib/brand";
import { fadeUp, fadeUpSmall, stagger, inView, ease } from "@/lib/motion";

export function Pillars() {
  return (
    <section className="relative py-24 md:py-36 px-6 sm:px-8 md:px-14 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src="/bg/angel-of-the-north.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.12] md:opacity-[0.07] grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/80 via-transparent to-base/80" />
      </div>
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={stagger(0, 0.12)}
      >
        <motion.div variants={fadeUpSmall} className="flex items-center gap-4 mb-16">
          <span className="eyebrow">Section 04 · Rule of Three</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-0 border-y border-gold/20">
          {brand.pillars.map((p, i) => (
            <motion.div
              key={p.label}
              variants={fadeUp}
              className={`p-8 sm:p-10 md:p-14 relative group overflow-hidden ${i < 2 ? "md:border-r border-gold/20" : ""} ${i < 2 ? "border-b md:border-b-0 border-gold/20" : ""}`}
              whileHover="hover"
            >
              <motion.div
                className="absolute inset-0 bg-lime/5"
                initial={{ opacity: 0 }}
                variants={{ hover: { opacity: 1 } }}
                transition={{ duration: 0.5 }}
              />
              <div className="display-wide text-[10px] text-gold mb-6 relative">0{i + 1}</div>
              <motion.h3
                className="display text-3xl md:text-4xl lg:text-5xl text-lime mb-6 leading-none relative"
                variants={{ hover: { x: 8 } }}
                transition={{ duration: 0.4, ease }}
              >
                {p.label}
              </motion.h3>
              <motion.div
                className="h-px bg-gold/60 mb-6 relative"
                initial={{ width: "2.5rem" }}
                variants={{ hover: { width: "6rem" } }}
                transition={{ duration: 0.5, ease }}
              />
              <p style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-sm md:text-base leading-relaxed relative">
                {p.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
