import React from "react";
import { Monitor, Server, Wrench } from "lucide-react";
import { aboutTechCategories } from "@/data/tech-stack";
import { TechBadge } from "@/components/shared/tech-badge";

const CATEGORY_ICONS = {
  frontend: Monitor,
  backend: Server,
  "mobile-tools": Wrench,
} as const;

export function TechStackCategories() {
  return (
    <section className="mx-auto max-w-[1120px] px-5 sm:px-8 py-12">
      <div>
        <h2 className="text-2xl sm:text-[34px] font-bold tracking-tight text-white">
          Tech Stack &amp; Tools
        </h2>
        <p className="mt-1.5 text-xs sm:text-[13.5px] text-zinc-400">
          Technologies and frameworks I engineer and orchestrate daily.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {aboutTechCategories.map((category) => {
          const IconComponent = CATEGORY_ICONS[category.id];
          return (
            <div
              key={category.id}
              className="rounded-2xl border border-white/[0.07] bg-[#18181C] p-6 transition-colors hover:border-white/[0.14]"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-[#23232B] text-[#8E9DF5]">
                  <IconComponent className="h-4 w-4" />
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((tech) => (
                  <TechBadge
                    key={tech.id}
                    name={tech.name}
                    iconKey={tech.iconKey}
                    size="md"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
