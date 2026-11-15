"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";

const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    icon: User,
  },
  {
    id: "projects",
    label: "Project",
    href: "/projects",
    icon: Briefcase,
  },
  {
    id: "experiences",
    label: "Experiences",
    href: "/#experiences",
    icon: TrendingUp,
  },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    if (pathname === "/about") {
      setActiveSection("about");
      return;
    }
    if (pathname.startsWith("/projects")) {
      setActiveSection("projects");
      return;
    }

    const handleScroll = () => {
      const expEl = document.getElementById("experiences");
      if (expEl) {
        const rect = expEl.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 220) {
          setActiveSection("experiences");
          return;
        }
      }
      setActiveSection("home");
    };

    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      if (targetId === "experiences") {
        setActiveSection("experiences");
      }
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        requestAnimationFrame(() => {
          targetEl.scrollIntoView({ behavior: "smooth" });
        });
      }
    } else {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isItemActive = (id: string) => {
    if (pathname === "/about") return id === "about";
    if (pathname.startsWith("/projects")) return id === "projects";
    return activeSection === id;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    itemId: string
  ) => {
    setMobileMenuOpen(false);
    if (pathname !== "/") return;

    if (itemId === "home") {
      e.preventDefault();
      setActiveSection("home");
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (itemId === "experiences") {
      e.preventDefault();
      setActiveSection("experiences");
      window.history.pushState(null, "", "/#experiences");
      document
        .getElementById("experiences")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (itemId === "contact") {
      e.preventDefault();
      window.history.pushState(null, "", "/#contact");
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-3 transition-all">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 sm:px-8">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "home")}
          className="text-lg sm:text-[20px] font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          {siteConfig.brandName}
          <span className="text-[#8E8FBB]">.</span>
        </Link>

        {/* Center: Floating Dark Glass Pill Navigation (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#151518]/90 p-1.5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200",
                  active
                    ? "bg-white text-zinc-950 font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5",
                    active ? "text-zinc-950" : "text-zinc-400"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Aesthetic Dark Mode Badge + Let's Talk CTA */}
        <div className="flex items-center gap-2.5">
          <div
            aria-hidden="true"
            title="Pure Dark Mode"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-[#17171B] text-zinc-400"
          >
            <Sun className="h-4 w-4" />
          </div>

          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs sm:text-[13px] font-semibold text-zinc-950 shadow-sm transition-all duration-200 hover:bg-zinc-200"
          >
            <MessageSquare className="h-3.5 w-3.5 fill-zinc-950 text-zinc-950" />
            <span>Let&apos;s Talk</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-[#18181B] text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mx-5 mt-2 rounded-2xl border border-white/[0.08] bg-[#161619]/95 p-3 backdrop-blur-xl shadow-2xl md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item.id);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-white text-zinc-950 font-semibold"
                      : "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
