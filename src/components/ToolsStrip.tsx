"use client";

import React, { useState } from "react";
import { technologiesData, TechItem } from "@/data/technologies";
import { TechIcon } from "./TechIcons";

const SELECTED_TOOL_IDS = [
  "html5",
  "css3",
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "vite",
  "tailwindcss",
  "gsap",
  "supabase",
  "postgresql",
  "git",
  "github",
  "vercel",
  "figma",
  "ga4",
  "gtm",
  "meta-ads",
  "google-ads",
];

const representativeTools: TechItem[] = SELECTED_TOOL_IDS.map((id) =>
  technologiesData.find((t) => t.id === id)
).filter((t): t is TechItem => Boolean(t));

export const ToolsStrip: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeTool = representativeTools.find((t) => t.id === activeId);

  return (
    <section
      id="ecosystem"
      aria-label="Tools and Systems"
      className="relative z-20 py-16 md:py-20 bg-transparent border-b border-[#F4EFE8]/10"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Compact Header Line */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B]">
            V. // TOOLS & STACK
          </span>

          <div className="h-4 flex items-center">
            {activeTool ? (
              <span className="text-xs font-mono tracking-[0.16em] uppercase text-[#F4EFE8] transition-opacity duration-150">
                {activeTool.name}
              </span>
            ) : (
              <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#9B9894]/60">
                WEB × PERFORMANCE
              </span>
            )}
          </div>
        </div>

        {/* Single Horizontal Technical Signature Strip */}
        <div
          onMouseLeave={() => setActiveId(null)}
          className="py-6 px-4 sm:px-6 bg-[#0B0B0E]/65 backdrop-blur-sm border-t border-b border-[#F4EFE8]/10 flex flex-wrap items-center justify-between gap-x-7 gap-y-6 sm:gap-x-9"
        >
          {representativeTools.map((tool) => {
            const isActive = activeId === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                aria-label={tool.name}
                data-cursor="EXPLORE"
                onMouseEnter={() => setActiveId(tool.id)}
                onFocus={() => setActiveId(tool.id)}
                onClick={() =>
                  setActiveId((prev) => (prev === tool.id ? null : tool.id))
                }
                style={{
                  filter: isActive
                    ? `drop-shadow(0 0 10px ${tool.brandColor}55)`
                    : "none",
                }}
                className="group relative flex flex-col items-center justify-center transition-transform duration-200 ease-out hover:scale-110 focus:outline-none"
              >
                <TechIcon
                  id={tool.id}
                  active={isActive}
                  className="w-6 h-6 md:w-7 md:h-7"
                />

                {/* Lightweight Micro-Label on Hover/Tap */}
                <span
                  className={`pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono tracking-[0.12em] text-[#F4EFE8] transition-opacity duration-150 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
