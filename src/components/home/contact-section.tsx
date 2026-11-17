"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Copy,
  Check,
  Link2,
  Code2,
  Instagram,
  MapPin,
  ArrowUpRight,
  SendHorizontal,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/data/site-config";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      toast.success("Email address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy email address");
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (formData.name.trim().length < 2) {
      nextErrors.name = "Please enter your name";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email";
    }
    if (formData.subject.trim().length < 2) {
      nextErrors.subject = "Please enter a subject or role";
    }
    if (formData.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success(
        data.message || "Message sent successfully! I'll get back to you soon."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to send message";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-8 pb-20"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#0E0E10] px-5 py-12 sm:px-10 sm:py-14 md:px-14">
        {/* Ambient bottom-right glow matching Home page.jpg */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-96 rounded-full bg-[#3B3F9C]/25 blur-[80px]"
        />

        {/* Section Heading */}
        <div className="mx-auto max-w-[540px] text-center">
          <h2 className="text-3xl sm:text-[40px] font-bold tracking-tight text-white">
            Let&apos;s build together.
          </h2>
          <p className="mt-2.5 text-xs sm:text-[13.5px] leading-relaxed text-zinc-400">
            Have an open junior role, a contract frontend project, or just want
            to chat about React UI craft? Drop a message below.
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Contact Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-5 flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-[#161619] p-5 sm:p-6"
          >
            <div className="flex flex-1 flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs sm:text-[13px] font-semibold text-zinc-200"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/[0.06] bg-[#101012] px-3.5 py-2.5 text-[13px] text-white placeholder:text-zinc-500 focus:border-[#8E8FBB]/60 focus:outline-none"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs sm:text-[13px] font-semibold text-zinc-200"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-white/[0.06] bg-[#101012] px-3.5 py-2.5 text-[13px] text-white placeholder:text-zinc-500 focus:border-[#8E8FBB]/60 focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-xs sm:text-[13px] font-semibold text-zinc-200"
                >
                  Project title or Role Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Your message"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-white/[0.06] bg-[#101012] px-3.5 py-2.5 text-[13px] text-white placeholder:text-zinc-500 focus:border-[#8E8FBB]/60 focus:outline-none"
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="flex flex-1 flex-col">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs sm:text-[13px] font-semibold text-zinc-200"
                >
                  Project Details &amp; Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full flex-1 min-h-[160px] resize-none rounded-xl border border-white/[0.06] bg-[#101012] px-3.5 py-3 text-[13px] text-white placeholder:text-zinc-500 focus:border-[#8E8FBB]/60 focus:outline-none"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs sm:text-[13px] font-semibold text-zinc-950 transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <SendHorizontal className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Right: Direct Contact Cards + Location Map */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3">
            {/* 1. Direct Mail */}
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#161619] px-4 py-3.5 transition-colors hover:border-white/[0.14]">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1F1F24] text-zinc-300">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-zinc-500">Direct Mail</p>
                  <p className="truncate text-xs sm:text-[13px] font-semibold text-white">
                    {siteConfig.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-[#1F1F24] text-zinc-400 transition-colors hover:text-white"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* 2. LinkedIn */}
            <a
              href="https://www.linkedin.com/in/al-zahra-ramadhani/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#161619] px-4 py-3.5 transition-colors hover:border-white/[0.15]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1F1F24] text-zinc-300">
                  <Link2 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-zinc-500">LinkedIn</p>
                  <p className="truncate text-xs sm:text-[13px] font-semibold text-white">
                    linkedin.com/in/al-zahra-ramadhani
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>

            {/* 3. GitHub */}
            <a
              href="https://github.com/alzahraramadhani/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#161619] px-4 py-3.5 transition-colors hover:border-white/[0.15]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1F1F24] text-zinc-300">
                  <Code2 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-zinc-500">GitHub</p>
                  <p className="truncate text-xs sm:text-[13px] font-semibold text-white">
                    github.com/alzahraramadhani
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>

            {/* 4. Instagram */}
            <a
              href="https://www.instagram.com/jjahrav/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#161619] px-4 py-3.5 transition-colors hover:border-white/[0.15]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1F1F24] text-zinc-300">
                  <Instagram className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-zinc-500">Instagram</p>
                  <p className="truncate text-xs sm:text-[13px] font-semibold text-white">
                    @jjahrav
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>

            {/* 5. Primary Base Card (Malang Map) */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#161619] p-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1F1F24] text-zinc-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] text-zinc-500">Primary Base</p>
                  <p className="text-xs sm:text-[13px] font-semibold text-white">
                    {siteConfig.location}
                  </p>
                </div>
              </div>

              <div className="relative mt-3.5 h-28 w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#141A17]">
                <Image
                  src={siteConfig.malangMapImage}
                  alt="Malang, Jawa Timur, Indonesia Map"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />

                {/* Status Indicator Pill matching FR-HOME-12 & Home page.jpg */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#141417]/95 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.65)] backdrop-blur-md">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-[#C1C1FF] shadow-[0_0_8px_#C1C1FF]"
                    />
                    <span>{siteConfig.timezoneStatus}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
