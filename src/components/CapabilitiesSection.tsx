"use client";

import React, { useState } from "react";

const WEB_ITEMS = [
  "Design",
  "Development",
  "Motion",
  "Responsive",
  "Performance",
  "Tracking",
] as const;

const PERFORMANCE_ITEMS = [
  "Meta Ads",
  "Google Ads",
  "Analytics",
  "Remarketing",
  "Optimization",
  "Conversion",
] as const;

export const CapabilitiesSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section
      id="skills"
      aria-label="Capabilities and Skills"
      className="relative z-20 -mt-8 md:-mt-[22vh] py-24 md:py-32 bg-[#070708]/78 rounded-t-[28px] md:rounded-t-[40px] border-t border-[#D3A96B]/30 border-b border-b-[#F4EFE8]/10 shadow-[0_-28px_80px_rgba(0,0,0,0.92)] overflow-hidden"
    >
      {/* Top Specular Golden Edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#E6C487]/60 to-transparent"
      />

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Minimal Portfolio Label */}
        <div className="flex items-center justify-between pb-10 md:pb-12 border-b border-[#F4EFE8]/10">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B]">
            III. // SKILLS & CAPABILITIES
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#9B9894]">
            WEB × PERFORMANCE
          </span>
        </div>

        {/* Two-Pole Editorial Composition */}
        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Pole 01: WEB */}
          <div>
            <div className="flex items-baseline justify-between pb-4 mb-4 border-b border-[#F4EFE8]/15">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EFE8] tracking-[-0.02em]">
                WEB
              </h2>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D3A96B]">
                01
              </span>
            </div>

            <ul className="divide-y divide-[#F4EFE8]/10">
              {WEB_ITEMS.map((item, idx) => {
                const isActive = hoveredItem === `web-${item}`;
                return (
                  <li
                    key={item}
                    onMouseEnter={() => setHoveredItem(`web-${item}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="py-3.5 flex items-center justify-between group cursor-default"
                  >
                    <span
                      className={`text-xl sm:text-2xl font-medium tracking-[-0.02em] transition-transform duration-300 ${
                        isActive
                          ? "translate-x-2 text-[#E6C487]"
                          : "text-[#F4EFE8]/90 group-hover:text-[#F4EFE8]"
                      }`}
                    >
                      {item}
                    </span>
                    <span className="text-[10px] font-mono text-[#9B9894]/60 group-hover:text-[#D3A96B] transition-colors">
                      0{idx + 1}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Pole 02: PERFORMANCE */}
          <div>
            <div className="flex items-baseline justify-between pb-4 mb-4 border-b border-[#F4EFE8]/15">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EFE8] tracking-[-0.02em]">
                PERFORMANCE
              </h2>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D3A96B]">
                02
              </span>
            </div>

            <ul className="divide-y divide-[#F4EFE8]/10">
              {PERFORMANCE_ITEMS.map((item, idx) => {
                const isActive = hoveredItem === `perf-${item}`;
                return (
                  <li
                    key={item}
                    onMouseEnter={() => setHoveredItem(`perf-${item}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="py-3.5 flex items-center justify-between group cursor-default"
                  >
                    <span
                      className={`text-xl sm:text-2xl font-medium tracking-[-0.02em] transition-transform duration-300 ${
                        isActive
                          ? "translate-x-2 text-[#E6C487]"
                          : "text-[#F4EFE8]/90 group-hover:text-[#F4EFE8]"
                      }`}
                    >
                      {item}
                    </span>
                    <span className="text-[10px] font-mono text-[#9B9894]/60 group-hover:text-[#D3A96B] transition-colors">
                      0{idx + 1}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
