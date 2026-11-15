"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-white/[0.05] py-8">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <p className="text-xs font-normal text-zinc-500">
          © 2026 Al Zahra Ramadhani.
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-[#18181B] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-[#222227] hover:text-white"
        >
          <span>Back to Top</span>
          <ArrowUp className="h-3 w-3" />
        </button>
      </div>
    </footer>
  );
}
