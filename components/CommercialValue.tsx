"use client";
import { motion } from "framer-motion";
import { brand } from "@/lib/brand";
import { fadeUp, fadeUpSmall, slideRight, stagger, inView } from "@/lib/motion";

export function CommercialValue() {
  return (
    <section className="relative py-24 md:py-40 px-6 sm:px-8 md:px-14">
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={stagger(0, 0.1)}
      >
        <motion.div variants={fadeUpSmall} className="flex items-center gap-4 mb-14">
          <span className="eyebrow">Section 06 · Commercial Value</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-start">
          <motion.div variants={fadeUp} className="md:sticky md:top-24">
            <h2 className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-8">
              Why CyberTS
              <br />
              <span className="text-lime">stands apart.</span>
            </h2>
            <div className="hairline my-8 max-w-xs" />
            <p style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-sm md:text-base leading-relaxed max-w-sm">
              Detect faster. Respond smarter. Defend stronger. Seven commitments that shape every engagement — from the first audit to the alert that wakes us at 3am three years in. Each one is a contractual promise, not a marketing line. Each one is measurable. Each one is the reason a CISO chooses us over a vendor twice our size.
            </p>
          </motion.div>

          <motion.ul
            className="space-y-0 border-t border-gold/20"
            variants={stagger(0.2, 0.1)}
          >
            {brand.value.map((v, i) => (
              <motion.li
                key={v.label}
                variants={slideRight}
                whileHover={{ x: 16 }}
                transition={{ duration: 0.4 }}
                className="group flex items-start gap-3 sm:gap-5 md:gap-6 py-7 md:py-8 border-b border-gold/20 cursor-default"
              >
                <span className="display-wide text-[10px] text-gold w-5 sm:w-6 shrink-0 mt-2 sm:mt-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <motion.div
                  className="h-px bg-lime/60 shrink-0 mt-4 sm:mt-5 hidden sm:block"
                  initial={{ width: "2rem" }}
                  whileHover={{ width: "4rem" }}
                  transition={{ duration: 0.4 }}
                />
                <div className="flex-1">
                  <span className="display text-base sm:text-lg md:text-2xl text-soft group-hover:text-lime transition-colors block mb-2 leading-tight">
                    {v.label}
                  </span>
                  <p style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-sm leading-relaxed">
                    {v.detail}
                  </p>
                </div>
                <motion.span
                  className="text-gold opacity-0 group-hover:opacity-100 transition-opacity mt-3"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >→</motion.span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
