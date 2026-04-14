import type { Metadata, Viewport } from "next";
import { Exo_2, Inter_Tight } from "next/font/google";
import "./globals.css";

const exo = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const inter = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyberTS — Proactive Data Defence",
  description:
    "Elite, proactive cyber defence for high-risk sectors. Audit. Secure. Certify. Insure. Monitor.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050608",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${exo.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-base text-soft">
        {children}
      </body>
    </html>
  );
}
