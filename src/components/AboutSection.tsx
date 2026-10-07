"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="Sobre Yuri Santos"
      className="relative z-20 py-24 md:py-32 bg-transparent border-b border-[#F4EFE8]/10 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B] block mb-3">
              VI. // ABOUT
            </span>
            <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[0.96] tracking-[-0.02em]">
              {siteConfig.name}
            </h2>
            <p className="mt-2 text-xs font-mono tracking-[0.18em] uppercase text-[#9B9894]">
              {siteConfig.role}
            </p>
          </div>

          <div className="lg:col-span-8">
            <p className="font-serif text-[clamp(1.65rem,2.8vw,2.55rem)] text-[#F4EFE8]/90 leading-[1.22] max-w-3xl">
              {siteConfig.aboutShort}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
