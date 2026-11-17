import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.fullName} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.hero.subtitle,
  openGraph: {
    title: `${siteConfig.fullName} — ${siteConfig.role}`,
    description: siteConfig.hero.subtitle,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-[#131315] font-sans text-white selection:bg-[#8E8FBB]/30 selection:text-white">
        {/* Global Ambient Background Accents (Figma Overlay+Blur & Cosmic Blue Orbital) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          {/* Top Cosmic Blue / Indigo Orbital Glow */}
          <div className="absolute inset-x-0 -top-24 mx-auto h-[520px] w-full max-w-[1280px] bg-[radial-gradient(ellipse_62%_48%_at_50%_0%,rgba(52,58,158,0.34),transparent_75%)]" />

          {/* Left Overlay+Blur (Figma: W 600, H 500, Radius 9999, Fill #C4E7FF 10%, Layer Blur) */}
          <div className="absolute left-1/2 top-[220px] h-[500px] w-[600px] -translate-x-[910px] rounded-full bg-[#C4E7FF]/[0.10] blur-[130px]" />

          {/* Right Overlay+Blur (Figma: W 600, H 500, Radius 9999, Fill #C4E7FF 10%, Spacing 623px, Layer Blur) */}
          <div className="absolute left-1/2 top-[170px] h-[500px] w-[600px] translate-x-[310px] rounded-full bg-[#C4E7FF]/[0.10] blur-[130px]" />
        </div>

        <Navbar />
        <main className="relative">{children}</main>
        <Footer />

        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#18181C",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#FFFFFF",
            },
          }}
        />
      </body>
    </html>
  );
}
