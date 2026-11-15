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
        {/* Top Ambient Indigo Glow across all pages */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_60%_45%_at_50%_-10%,rgba(52,55,145,0.32),transparent_75%)]"
        />

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
