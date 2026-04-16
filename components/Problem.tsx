"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, fadeUpSmall, stagger, inView } from "@/lib/motion";

const threats = [
  {
    n: "01",
    title: "Undetected Breaches",
    copy: "Intrusions operate silently for weeks before detection. By the time a breach surfaces, the attacker has mapped your network, staged data for exfiltration, and planted persistence deep enough to survive the first round of remediation. Visibility is not the end of the problem — it is the beginning of the real one.",
  },
  {
    n: "02",
    title: "Compliance Exposure",
    copy: "UK and EU regulators now impose penalties that exceed a decade of prevention spend. NIS2, DORA, PCI DSS 4.0 and UK GDPR carry personal liability for directors. Cyber insurers reject applicants who cannot evidence MFA, EDR and tested incident response. Non-compliance is no longer a line item — it is an existential condition.",
  },
  {
    n: "03",
    title: "Reputational Collapse",
    copy: "Trust, once broken, does not return. A single incident rewrites how clients, insurers, boards and regulators see you. Enterprise contracts built over a decade of relationship can be lost in a single ICO notification. The public record of a breach outlasts every press release written to contain it.",
  },
];

export function Problem() {
  return (
    <section className="relative py-24 md:py-40 px-6 sm:px-8 md:px-14 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src="/bg/big-ben.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.07] grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base" />
      </div>
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={stagger(0, 0.12)}
      >
        <motion.div variants={fadeUpSmall} className="flex items-center gap-4 mb-14">
          <span className="eyebrow">Section 02</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </motion.div>

        <motion.h2 variants={fadeUp} className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-12 max-w-4xl">
          Cyber threats no longer
          <br />
          <span className="text-lime">announce their presence.</span>
        </motion.h2>

        <motion.p variants={fadeUp} style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-lg md:text-xl max-w-2xl leading-relaxed mb-20">
          They lurk within systems, quietly siphoning value — rerouting payments, cloning credentials, reading board papers over your shoulder. You don&apos;t lose data first.
          <span className="text-soft"> You lose control.</span> And by the time control is what you&apos;re trying to reclaim, the attacker has already decided what leaves the building and what stays behind as leverage.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-px bg-gold/20"
          variants={stagger(0.1, 0.16)}
        >
          {threats.map((t) => (
            <motion.div
              key={t.n}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className="bg-ink/80 backdrop-blur-sm p-8 md:p-10 relative group"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="display-wide text-xs text-gold">{t.n}</span>
                <motion.div
                  className="w-8 h-8 border border-gold/40 flex items-center justify-center"
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-1.5 h-1.5 bg-lime group-hover:bg-gold transition-colors" />
                </motion.div>
              </div>
              <h3 className="display text-xl md:text-2xl text-soft mb-4 leading-tight">{t.title}</h3>
              <p style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-sm md:text-base leading-relaxed">{t.copy}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
