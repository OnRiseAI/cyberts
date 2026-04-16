"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { brand } from "@/lib/brand";
import { fadeUp, fadeUpSmall, stagger, scaleIn, inView, ease } from "@/lib/motion";

export function TrustClose({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative py-24 md:py-48 px-6 sm:px-8 md:px-14 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src="/bg/tower-bridge.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.12] md:opacity-[0.07] grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/80 via-transparent to-base/80" />
      </div>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(191, 137, 0, 0.22) 0%, rgba(7, 11, 22, 0.85) 45%, #04070f 100%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.8, ease }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0, transparent 40px, rgba(191, 137, 0, 0.08) 40px, rgba(191, 137, 0, 0.08) 41px)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2, ease, delay: 0.3 }}
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={stagger(0.1, 0.14)}
      >
        <motion.div variants={fadeUpSmall} className="flex items-center justify-center gap-4 mb-10">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold" />
          <span className="eyebrow">Section 07 · Trust</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        <motion.div variants={scaleIn} className="flex justify-center mb-10">
          <motion.div
            animate={{ rotate: [0, 1, -1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/shield-hero-v4.png"
              alt="CyberTS shield"
              width={115}
              height={140}
              className="drop-shadow-[0_0_30px_rgba(190,255,90,0.2)]"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUpSmall} className="flex items-center justify-center gap-3 md:gap-6 mb-10 flex-wrap">
          {["Trust", "Compliance", "Resilience", "Control"].map((w, i) => (
            <span key={w} className="flex items-center gap-3 md:gap-6">
              <span className="display-wide text-xs md:text-sm text-gold">{w}</span>
              {i < 3 && <span className="text-gold/60">·</span>}
            </span>
          ))}
        </motion.div>

        <motion.div variants={fadeUpSmall} className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold/40" />
            <span className="display-wide text-[10px] text-gold/80 tracking-[0.25em] uppercase">Accreditation</span>
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <div className="flex items-center justify-center gap-x-6 gap-y-3 flex-wrap max-w-2xl mx-auto">
            {brand.credentials.map((c, i) => (
              <span key={c} className="flex items-center gap-x-6">
                <span className="display-wide text-[10px] md:text-[11px] tracking-[0.2em] text-gold uppercase">
                  {c}
                </span>
                {i < brand.credentials.length - 1 && (
                  <span className="text-gold/40 hidden md:inline">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.h2 variants={fadeUp} className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-4 text-soft">
          Secure today.
        </motion.h2>
        <motion.h2 variants={fadeUp} className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-4 text-lime">
          Prevent tomorrow.
        </motion.h2>
        <motion.h2 variants={fadeUp} className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-12">
          <motion.span
            style={{
              background: "linear-gradient(135deg, #bf8900 0%, #e6c230 50%, #bf8900 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            Assure always.
          </motion.span>
        </motion.h2>

        <motion.div variants={fadeUpSmall} className="hairline my-12 max-w-sm mx-auto" />

        <motion.div variants={fadeUp}>
          <motion.button
            onClick={onCta}
            className="cta-gold"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Your Cyber Risk Review
            <motion.span
              className="text-lg leading-none inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >→</motion.span>
          </motion.button>
        </motion.div>

        <motion.p variants={fadeUpSmall} style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-xs mt-8 tracking-[0.2em] uppercase">
          CyberTS · AOF Group · United Kingdom
        </motion.p>
      </motion.div>
    </section>
  );
}
