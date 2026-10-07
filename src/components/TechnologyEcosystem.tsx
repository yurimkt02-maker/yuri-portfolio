"use client";

import React, { useState } from "react";
import {
  technologiesData,
  TECH_CATEGORIES,
  TechCategory,
  TechItem,
} from "@/data/technologies";
import { TechIcon } from "./TechIcons";

export const TechnologyEcosystem: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lastInspected, setLastInspected] = useState<TechItem>(
    technologiesData.find((t) => t.id === "react") || technologiesData[0]
  );
  const [filterCategory, setFilterCategory] = useState<TechCategory | "ALL">(
    "ALL"
  );

  const handleActivate = (tech: TechItem) => {
    setActiveId(tech.id);
    setLastInspected(tech);
  };

  const handleTouchToggle = (tech: TechItem) => {
    if (activeId === tech.id) {
      setActiveId(null);
    } else {
      setActiveId(tech.id);
      setLastInspected(tech);
    }
  };

  const activeTech =
    technologiesData.find((t) => t.id === activeId) || lastInspected;

  const rails: { title: string; code: string; categories: TechCategory[] }[] = [
    {
      title: "INTERFACE & CORE RUNTIME",
      code: "01 // FRONT-END",
      categories: ["FRONT-END"],
    },
    {
      title: "CHOREOGRAPHY, DATA & INFRASTRUCTURE",
      code: "02 // MOTION + BACKEND / DATA",
      categories: ["MOTION", "BACKEND / DATA"],
    },
    {
      title: "ENGINEERING WORKFLOW & DESIGN",
      code: "03 // WORKFLOW + DESIGN",
      categories: ["WORKFLOW", "DESIGN"],
    },
    {
      title: "TELEMETRY, ATTRIBUTION & ACQUISITION",
      code: "04 // ANALYTICS + PAID MEDIA",
      categories: ["ANALYTICS", "PAID MEDIA"],
    },
  ];

  return (
    <section
      id="ecosystem"
      aria-label="Ecossistema de Tecnologias"
      className="relative py-20 md:py-32 bg-[#070708] border-b border-[#F4EFE8]/10 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#F4EFE8 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* 3-Layer Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 md:pb-16 border-b border-[#F4EFE8]/10">
          <div>
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#D3A96B] block mb-3">
              TECHNOLOGY ECOSYSTEM // 06
            </span>
            <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.4rem,5.6vw,5.2rem)] leading-[0.96] tracking-[-0.02em]">
              Ferramentas que sustentam{" "}
              <em className="italic text-[#E6C487] font-normal">
                código, dados e mídia.
              </em>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm md:text-base text-[#9B9894] leading-relaxed">
              Do desenvolvimento front-end ao rastreamento e gestão de anúncios.
              Passe o cursor ou toque em cada ícone para inspecionar sua função.
            </p>
          </div>
        </div>

        {/* Subsystem Filter Bar */}
        <div className="py-5 border-b border-[#F4EFE8]/10 flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterCategory("ALL")}
              className={`px-3 py-1.5 text-[10px] font-mono tracking-[0.2em] uppercase transition-colors ${
                filterCategory === "ALL"
                  ? "bg-[#D3A96B] text-[#070708] font-bold"
                  : "border border-[#F4EFE8]/12 text-[#9B9894] hover:text-[#F4EFE8]"
              }`}
            >
              TODAS (27)
            </button>
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 text-[10px] font-mono tracking-[0.18em] uppercase transition-colors ${
                  filterCategory === cat
                    ? "bg-[#D3A96B] text-[#070708] font-bold"
                    : "border border-[#F4EFE8]/12 text-[#9B9894] hover:text-[#F4EFE8]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#9B9894]">
            {activeId ? "ACTIVE SIGNAL" : "STANDBY"}
          </span>
        </div>

        {/* Live Custom Inspection HUD */}
        <div className="mt-8 p-5 sm:p-6 border border-[#D3A96B]/40 bg-[#141414]/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center bg-[#070708] transition-all duration-300 shrink-0"
              style={{
                borderColor: activeTech.brandColor,
                boxShadow: `0 0 18px ${activeTech.brandColor}25`,
              }}
            >
              <TechIcon id={activeTech.id} active={true} className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-lg sm:text-xl font-bold text-[#F4EFE8] tracking-[-0.02em]">
                  {activeTech.name}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono tracking-[0.18em] uppercase border border-[#F4EFE8]/15 text-[#D3A96B]">
                  {activeTech.category}
                </span>
                {activeTech.isPrimary && (
                  <span className="hidden md:inline-block px-2 py-0.5 text-[9px] font-mono tracking-[0.2em] uppercase bg-[#D3A96B]/15 text-[#E6C487]">
                    STACK PRINCIPAL
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#9B9894] mt-0.5">
                {activeTech.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center text-[10px] font-mono tracking-[0.2em] uppercase text-[#9B9894]">
            <span
              className="px-2.5 py-1 border border-[#F4EFE8]/15 text-[#F4EFE8]"
              style={{
                borderLeftColor: activeTech.brandColor,
                borderLeftWidth: 3,
              }}
            >
              {activeTech.brandColor}
            </span>
          </div>
        </div>

        {/* Non-Card Node Constellation / System Rails */}
        <div
          className="mt-10 space-y-10"
          onMouseLeave={() => setActiveId(null)}
        >
          {rails.map((rail) => {
            const items = technologiesData.filter((t) =>
              rail.categories.includes(t.category)
            );

            return (
              <div key={rail.code} className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#D3A96B]">
                    {rail.code}
                  </span>
                  <div className="flex-1 h-px bg-[#F4EFE8]/10" />
                  <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#9B9894] hidden sm:inline">
                    {rail.title}
                  </span>
                </div>

                <div className="relative py-6 px-4 sm:px-8 border border-[#F4EFE8]/10 bg-[#141414]/25">
                  <div
                    className="hidden md:block absolute top-1/2 left-8 right-8 h-px bg-[#F4EFE8]/[0.08] -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-wrap items-center justify-around md:justify-between gap-6 sm:gap-8">
                    {items.map((tech) => {
                      const isActive = activeId === tech.id;
                      const isDimmed =
                        filterCategory !== "ALL" &&
                        tech.category !== filterCategory;

                      const nodeSizeClass = tech.isPrimary
                        ? "w-16 h-16 sm:w-20 sm:h-20"
                        : "w-13 h-13 sm:w-15 sm:h-15";
                      const iconSizeClass = tech.isPrimary
                        ? "w-8 h-8 sm:w-9 sm:h-9"
                        : "w-6 h-6 sm:w-7 sm:h-7";

                      return (
                        <div
                          key={tech.id}
                          className={`relative flex flex-col items-center transition-opacity duration-300 ${
                            isDimmed ? "opacity-20" : "opacity-100"
                          }`}
                        >
                          <button
                            type="button"
                            aria-label={`${tech.name} — ${tech.role}`}
                            data-cursor="EXPLORE"
                            onMouseEnter={() => handleActivate(tech)}
                            onFocus={() => handleActivate(tech)}
                            onClick={() => handleTouchToggle(tech)}
                            style={{
                              transform: isActive
                                ? "translateY(-4px) scale(1.08)"
                                : "translateY(0px) scale(1)",
                              boxShadow: isActive
                                ? `0 8px 28px -4px ${tech.brandColor}35`
                                : "none",
                              borderColor: isActive
                                ? tech.brandColor
                                : tech.isPrimary
                                ? "rgba(211, 169, 107, 0.35)"
                                : "rgba(244, 239, 232, 0.14)",
                            }}
                            className={`group relative rounded-full bg-[#070708] border flex items-center justify-center transition-all duration-300 ease-out focus:outline-none ${nodeSizeClass}`}
                          >
                            {tech.isPrimary && (
                              <span
                                className="absolute -top-1 -right-1 w-2 h-2 rounded-full transition-colors duration-300"
                                style={{
                                  backgroundColor: isActive
                                    ? tech.brandColor
                                    : "#D3A96B",
                                }}
                              />
                            )}

                            <TechIcon
                              id={tech.id}
                              active={isActive}
                              className={iconSizeClass}
                            />
                          </button>

                          <div
                            className={`pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap px-3 py-1.5 bg-[#070708] border border-[#D3A96B]/60 shadow-lg transition-all duration-200 ${
                              isActive
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-1"
                            }`}
                          >
                            <div className="text-[11px] font-bold text-[#F4EFE8] text-center leading-none">
                              {tech.name}
                            </div>
                            <div className="text-[9px] font-mono text-[#E6C487] text-center mt-1">
                              {tech.role}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
