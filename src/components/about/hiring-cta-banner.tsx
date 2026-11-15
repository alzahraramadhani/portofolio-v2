import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export function HiringCtaBanner() {
  return (
    <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-6 pb-20">
      <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/[0.07] bg-[#18181C] px-6 py-7 sm:flex-row sm:items-center sm:px-9 sm:py-8">
        <div>
          <h2 className="text-lg sm:text-[20px] font-bold tracking-tight text-white">
            Interested in collaborating or hiring?
          </h2>
          <p className="mt-1 text-xs sm:text-[13px] text-zinc-400">
            Let&apos;s discuss full-time software engineering roles, contracts,
            or UI design consultations.
          </p>
        </div>

        <Link
          href="/#contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-[13px] font-semibold text-zinc-950 transition-all hover:bg-zinc-200"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Start Conversation</span>
        </Link>
      </div>
    </section>
  );
}
