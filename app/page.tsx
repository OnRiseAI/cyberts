"use client";
import { useState } from "react";
import { CircuitBackground } from "@/components/CircuitBackground";
import { StickyNav } from "@/components/StickyNav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Pipeline } from "@/components/Pipeline";
import { Pillars } from "@/components/Pillars";
import { Sectors } from "@/components/Sectors";
import { CommercialValue } from "@/components/CommercialValue";
import { TrustClose } from "@/components/TrustClose";
import { RiskReviewModal } from "@/components/RiskReviewModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className="relative">
      <CircuitBackground />
      <div className="grain" />
      <StickyNav onCta={openModal} />

      <Hero onCta={openModal} />
      <Problem />
      <Pipeline />
      <Pillars />
      <Sectors />
      <CommercialValue />
      <TrustClose onCta={openModal} />

      <footer className="relative z-10 py-10 px-8 md:px-14 border-t border-gold/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="display-wide text-sm text-soft">CyberTS Ltd</div>
            <div className="eyebrow mt-1">AOF Group · United Kingdom</div>
          </div>
          <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase text-soft-dim">
            <span>Trust</span>
            <span className="text-gold/50">·</span>
            <span>Compliance</span>
            <span className="text-gold/50">·</span>
            <span>Resilience</span>
            <span className="text-gold/50">·</span>
            <span>Control</span>
          </div>
          <div className="eyebrow">© 2026</div>
        </div>
      </footer>

      <RiskReviewModal open={modalOpen} onClose={closeModal} />
    </main>
  );
}
