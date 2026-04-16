"use client";
import { useEffect, useState } from "react";

export function StickyNav({ onCta }: { onCta: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        background: "rgba(4, 7, 15, 0.88)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(191, 137, 0, 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-lime rounded-full animate-pulse" />
          <span className="display-wide text-xs text-soft">CyberTS</span>
          <span className="text-gold/60 hidden md:inline">·</span>
          <span className="eyebrow hidden md:inline">Proactive Data Defence</span>
        </div>
        <button
          onClick={onCta}
          className="display-wide text-[10px] md:text-xs text-base bg-lime px-4 py-3 md:py-2.5 hover:bg-gold transition-colors min-h-[44px]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
        >
          Risk Review →
        </button>
      </div>
    </nav>
  );
}
