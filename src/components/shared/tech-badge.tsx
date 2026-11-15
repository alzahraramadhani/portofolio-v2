import React from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiDart,
  SiFlutter,
  SiPhp,
  SiLaravel,
  SiPostgresql,
  SiSupabase,
  SiVite,
  SiShadcnui,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostman,
} from "react-icons/si";
import { Database, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  nodejs: SiNodedotjs,
  expressjs: SiExpress,
  dart: SiDart,
  flutter: SiFlutter,
  php: SiPhp,
  laravel: SiLaravel,
  sql: Database,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  vite: SiVite,
  shadcnui: SiShadcnui,
  git: SiGit,
  github: SiGithub,
  figma: SiFigma,
  postman: SiPostman,
};

interface TechBadgeProps {
  name: string;
  iconKey?: string;
  size?: "sm" | "md";
  className?: string;
}

export function TechBadge({
  name,
  iconKey,
  size = "sm",
  className,
}: TechBadgeProps) {
  const normalizedKey = (iconKey || name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const IconComponent = ICON_MAP[normalizedKey] || Code2;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg bg-[#232329]/90 border border-white/[0.07] font-medium text-zinc-200 transition-all duration-200 hover:border-[#8E8FBB]/40 hover:bg-[#2A2A32] hover:text-white",
        size === "sm" ? "px-2.5 py-1 text-[12px]" : "px-3 py-1.5 text-[13px]",
        className
      )}
    >
      <IconComponent className="h-3.5 w-3.5 shrink-0 text-[#8E9DF5]" />
      <span>{name}</span>
    </span>
  );
}
