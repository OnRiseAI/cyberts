import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const alt = "CyberTS — Proactive Data Defence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: brand.gradients.page,
          color: brand.colors.soft,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: brand.colors.lime,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              background: brand.gradients.shield,
              clipPath: "polygon(50% 0%, 100% 25%, 100% 70%, 50% 100%, 0% 70%, 0% 25%)",
              display: "flex",
            }}
          />
          <span style={{ display: "flex", fontWeight: 800 }}>{brand.name}</span>
        </div>

        {/* TODO: center hero block (headline + supporting line). Deferred — card currently
            ships with brand mark + credentials only, blank middle. Use inline flex styles only. */}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "14px 20px",
            fontSize: 22,
            color: brand.colors.soft,
            opacity: 0.85,
          }}
        >
          {brand.credentials.map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                padding: "8px 16px",
                border: `1px solid ${brand.colors.lime}40`,
                borderRadius: 999,
                background: "#ffffff08",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
