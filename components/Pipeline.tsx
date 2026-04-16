"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { brand } from "@/lib/brand";
import { fadeUp, fadeUpSmall, stagger, scaleIn, inView, ease } from "@/lib/motion";

const icons: Record<string, React.ReactNode> = {
  audit: (
    <g>
      <circle cx="22" cy="22" r="11" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <line x1="30" y1="30" x2="40" y2="40" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  ),
  secure: (
    <g>
      <path d="M 24 8 L 40 14 L 40 26 Q 40 36 24 42 Q 8 36 8 26 L 8 14 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </g>
  ),
  certify: (
    <g>
      <circle cx="24" cy="22" r="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M 18 22 L 22 26 L 30 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 14 32 L 18 42 L 24 38 L 30 42 L 34 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  ),
  insure: (
    <g>
      <path d="M 24 8 L 40 14 L 40 26 Q 40 36 24 42 Q 8 36 8 26 L 8 14 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="18" y="22" width="12" height="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M 20 22 L 20 18 Q 20 14 24 14 Q 28 14 28 18 L 28 22" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </g>
  ),
  monitor: (
    <g>
      <path d="M 4 24 Q 24 6 44 24 Q 24 42 4 24 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </g>
  ),
};

export function Pipeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.5 });

  return (
    <section className="relative py-24 md:py-40 px-6 sm:px-8 md:px-14">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/60 to-transparent pointer-events-none" />
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={inView}
        variants={stagger(0, 0.1)}
      >
        <motion.div variants={fadeUpSmall} className="flex items-center gap-4 mb-14">
          <span className="eyebrow">Section 03 · The System</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </motion.div>

        <motion.h2 variants={fadeUp} className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-6 max-w-4xl">
          A closed loop of
          <br />
          <span className="text-lime">continuous defence.</span>
        </motion.h2>

        <motion.p variants={fadeUp} style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-base md:text-lg max-w-2xl leading-relaxed mb-20">
          Five stages, one continuous loop. Each phase feeds the next — the audit shapes the hardening, the hardening shapes the certification, the certification shapes the insurability, and the monitoring feeds back into the next audit. No gaps, no hand-offs, no blind spots between the first assessment and the 3am incident response three years later.
        </motion.p>

        <div className="relative hidden md:block" ref={lineRef}>
          <svg className="absolute top-[38px] left-0 w-full h-4 z-0" viewBox="0 0 1200 20" preserveAspectRatio="none">
            <motion.line
              x1="60" y1="10" x2="1140" y2="10"
              stroke="#bf8900" strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={lineInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2.2, ease, delay: 0.3 }}
            />
          </svg>

          <motion.div
            className="grid grid-cols-5 gap-6 relative z-10"
            variants={stagger(0.4, 0.18)}
          >
            {brand.pipeline.map((step, i) => (
              <motion.div
                key={step.id}
                variants={scaleIn}
                className="flex flex-col items-center text-center group cursor-pointer"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="w-[76px] h-[76px] rounded-full border border-gold/60 bg-base/80 backdrop-blur-sm flex items-center justify-center relative"
                  whileHover={{ borderColor: "#e6c230", boxShadow: "0 0 32px rgba(232,215,156,0.35)" }}
                  transition={{ duration: 0.4 }}
                >
                  <svg width="44" height="44" viewBox="0 0 48 48" className="text-lime">
                    {icons[step.id]}
                  </svg>
                  <span className="absolute -top-2 -right-2 display-wide text-[9px] text-gold bg-base px-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
                <h3 className="display text-base mt-6 text-soft group-hover:text-lime transition-colors">{step.label}</h3>
                <p style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-xs mt-2 max-w-[180px] leading-relaxed">
                  {step.detail}
                </p>
                <div className="mt-4 pt-3 border-t border-gold/20 max-w-[180px] w-full">
                  <p className="display-wide text-[9px] text-gold/80 mb-1">Deliverables</p>
                  <p style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-[11px] leading-snug mb-2">{step.deliverables}</p>
                  <p className="display-wide text-[9px] text-gold/80">{step.timeline}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="md:hidden space-y-8 relative"
          variants={stagger(0.1, 0.14)}
        >
          <div className="absolute left-[32px] sm:left-[38px] top-0 bottom-0 w-px bg-gradient-to-b from-lime via-gold/40 to-lime" />
          {brand.pipeline.map((step, i) => (
            <motion.div key={step.id} variants={fadeUp} className="flex items-start gap-5 relative">
              <div className="w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] rounded-full border border-gold/60 bg-base/80 backdrop-blur-sm flex items-center justify-center shrink-0">
                <svg width="36" height="36" viewBox="0 0 48 48" className="text-lime sm:w-10 sm:h-10">{icons[step.id]}</svg>
              </div>
              <div className="flex-1">
                <span className="display-wide text-[9px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-lg text-soft">{step.label}</h3>
                <p style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-xs leading-relaxed mt-1">{step.detail}</p>
                <div className="mt-3 pt-2 border-t border-gold/20">
                  <p className="display-wide text-[9px] text-gold/80">Deliverables</p>
                  <p style={{ color: "#ffffff" }} className="font-[family-name:var(--font-inter)] text-[11px] leading-snug mb-1">{step.deliverables}</p>
                  <p className="display-wide text-[9px] text-gold/80">{step.timeline}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
