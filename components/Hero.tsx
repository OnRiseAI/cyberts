"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { brand } from "@/lib/brand";
import { ease, stagger, fadeUp, fadeUpSmall } from "@/lib/motion";

export function Hero({ onCta }: { onCta: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const tx = useTransform(sx, (v) => v * 12);
  const ty = useTransform(sy, (v) => v * 12);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="scanline-sweep" />

      <motion.div
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
        className="absolute left-0 top-0 bottom-0 w-px vbar opacity-60"
      />

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.8 }}
        className="absolute left-6 sm:left-10 top-6 sm:top-10 flex items-center gap-3 z-10"
      >
        <div className="w-2 h-2 bg-lime rounded-full animate-pulse" />
        <span className="eyebrow">AOF Group · UK</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.9 }}
        className="absolute right-6 sm:right-10 top-6 sm:top-10 flex items-center gap-3 z-10"
      >
        <span className="eyebrow">CTS / 01</span>
        <div className="w-10 h-px bg-gold/60" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-14 grid md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-center pt-28 md:pt-20 pb-24">
        <motion.div variants={stagger(0.15, 0.14)} initial="hidden" animate="show">
          <motion.p variants={fadeUpSmall} className="eyebrow mb-8">
            — Proactive Data Defence
          </motion.p>

          <h1 className="display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-soft overflow-hidden">
            <motion.span variants={fadeUp} className="block">
              How visible
            </motion.span>
            <motion.span variants={fadeUp} className="block text-lime">
              is your
            </motion.span>
            <motion.span variants={fadeUp} className="block">
              business<span className="text-gold">?</span>
            </motion.span>
          </h1>

          <motion.div
            variants={fadeUpSmall}
            className="hairline my-10 max-w-md origin-left"
          />

          <motion.p
            variants={fadeUpSmall}
            style={{ color: "#ffffff" }}
            className="font-[family-name:var(--font-inter)] text-base md:text-lg max-w-lg leading-relaxed"
          >
            End-to-end cyber security for high-risk sectors. From the first audit to the alert at 3am, a UK-based SOC defends the systems your business cannot afford to lose.
            <span className="text-soft"> You won&apos;t see the breach.</span>{" "}
            <span className="text-lime">We will.</span>
          </motion.p>

          <motion.div
            variants={fadeUpSmall}
            className="mt-8 flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-3 max-w-lg"
          >
            {brand.credentials.map((c, i) => (
              <span key={c} className="flex items-center gap-x-4 sm:gap-x-5">
                <span className="display-wide text-[10px] tracking-[0.18em] sm:tracking-[0.2em] text-gold/90 uppercase whitespace-nowrap">
                  {c}
                </span>
                {i < brand.credentials.length - 1 && (
                  <span className="text-gold/40 text-[10px] hidden sm:inline">·</span>
                )}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUpSmall} className="mt-10 flex items-center gap-6 flex-wrap">
            <motion.button
              onClick={onCta}
              className="cta-primary"
              whileHover={{ y: -2, x: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Your Cyber Risk Review
              <motion.span
                className="text-lg leading-none inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.button>
            <div style={{ color: "#ffffff" }} className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase">
              <div className="w-8 h-px bg-gold/60" />
              Protect · Prevent · Assure
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.5 }}
          className="relative flex items-center justify-center"
          style={{ x: tx, y: ty }}
        >
          <motion.div
            className="absolute inset-0 bg-lime/10 blur-3xl rounded-full"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative w-[240px] sm:w-[280px] md:w-[314px]">
            <Image
              src="/shield-hero-v4.png"
              alt="CyberTS shield"
              width={314}
              height={380}
              priority
              sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 314px"
              className="w-full h-auto drop-shadow-[0_0_40px_rgba(190,255,90,0.25)]"
            />
            {([
              "top-left", "top-right", "bottom-left", "bottom-right",
            ] as const).map((corner, i) => {
              const positions: Record<string, string> = {
                "top-left": "-top-4 -left-4 border-t border-l",
                "top-right": "-top-4 -right-4 border-t border-r",
                "bottom-left": "-bottom-4 -left-4 border-b border-l",
                "bottom-right": "-bottom-4 -right-4 border-b border-r",
              };
              return (
                <motion.div
                  key={corner}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease, delay: 1.2 + i * 0.08 }}
                  className={`absolute w-6 h-6 border-gold ${positions[corner]}`}
                />
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 right-6 sm:right-10 flex items-center justify-between z-10"
      >
        <span className="eyebrow">Scroll</span>
        <div className="flex-1 h-px mx-6 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <span className="eyebrow">Defence-Grade</span>
      </motion.div>
    </section>
  );
}
