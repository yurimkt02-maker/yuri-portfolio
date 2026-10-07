"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUpRight } from "lucide-react";

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textColRef = useRef<HTMLDivElement | null>(null);
  const portraitStageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textColRef.current,
        { y: 14 },
        { y: 0, duration: 0.75, ease: "power3.out" }
      );

      gsap.fromTo(
        portraitStageRef.current,
        { y: 16, scale: 0.985 },
        { y: 0, scale: 1, duration: 0.85, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative z-10 min-h-screen pt-28 pb-12 md:pt-32 md:pb-16 flex flex-col justify-between overflow-hidden bg-transparent border-b border-[#F4EFE8]/10"
    >
      {/* Main Two-Column Authorial Stage */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto px-5 sm:px-8 lg:px-12 my-auto py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column (58%): Personal Headline, Value Proposition & CTAs */}
          <div
            ref={textColRef}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Positioning Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141418]/90 border border-[#F4EFE8]/12 mb-6">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[#D3A96B]"
              />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#E6C487]">
                {siteConfig.roleSignature}
              </span>
            </div>

            {/* Strong Authorial Headline */}
            <h1 className="font-sans font-semibold text-[#F4EFE8] text-[clamp(2.35rem,4.7vw,4.55rem)] leading-[1.04] tracking-[-0.03em] max-w-[18ch]">
              <span className="text-[#F4EFE8]">Yuri Santos</span> cria{" "}
              <span className="font-serif italic font-normal text-[#E6C487]">
                experiências digitais
              </span>{" "}
              e{" "}
              <span className="font-serif italic font-normal text-[#F4EFE8]">
                sistemas
              </span>{" "}
              de{" "}
              <span className="font-serif italic font-normal text-[#D3A96B]">
                performance
              </span>{" "}
              que trabalham juntos.
            </h1>

            {/* Short Human Supporting Text */}
            <p className="mt-6 max-w-xl text-base sm:text-lg md:text-[1.15rem] text-[#9B9894] leading-[1.6] font-normal">
              Desenvolvimento web e tráfego pago conectados para transformar
              presença digital em oportunidade.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                data-cursor="VIEW"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#F4EFE8] hover:bg-[#E6C487] text-[#070708] text-xs sm:text-sm font-semibold tracking-[0.05em] transition-all duration-300 shadow-[0_8px_28px_rgba(244,239,232,0.12)]"
              >
                <span>Ver trabalhos</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="START"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#141418]/85 hover:bg-[#1B1B20] text-[#F4EFE8] border border-[#F4EFE8]/15 hover:border-[#D3A96B]/60 text-xs sm:text-sm font-medium tracking-[0.05em] transition-all duration-300"
              >
                <span>Vamos conversar</span>
                <ArrowUpRight className="w-4 h-4 text-[#D3A96B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column (42%): Yuri's Real Portrait + Secondary Proprietary Core */}
          <div
            ref={portraitStageRef}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[390px] sm:max-w-[420px] mx-auto">
              {/* Clean Portrait Frame Supporting the Image */}
              <figure className="relative z-10 w-full aspect-[4/5] min-h-[360px] sm:min-h-[430px] rounded-[26px] border border-[#F4EFE8]/15 bg-[#111115]/90 p-2 sm:p-2.5 shadow-[0_24px_70px_rgba(0,0,0,0.85)] opacity-100 visible">
                <div className="relative w-full h-full min-h-[340px] sm:min-h-[410px] rounded-[20px] overflow-hidden bg-[#1A1A1E] opacity-100 visible">
                  <Image
                    src="/assets/founder-yuri.webp"
                    alt="Yuri Santos"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 42vw, 420px"
                    className="object-cover object-top opacity-100 visible transition-transform duration-700 hover:scale-[1.015]"
                    onError={(e) => {
                      console.error(
                        "Falha ao carregar /assets/founder-yuri.webp no Hero:",
                        e
                      );
                    }}
                  />

                  {/* Subtle bottom vignette */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070708]/75 to-transparent"
                  />

                  {/* Minimal Technical Micro-Label */}
                  <figcaption className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#070708]/80 backdrop-blur-md border border-[#F4EFE8]/12 flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-[#D3A96B]"
                    />
                    <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-[#F4EFE8]/85">
                      YP // 01
                    </span>
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* Discreet Bottom Line */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-4">
        <div className="flex items-center justify-between pt-4 border-t border-[#F4EFE8]/10 text-[10px] font-mono tracking-[0.2em] uppercase text-[#9B9894]">
          <span>BUILD • ACQUIRE • MEASURE • OPTIMIZE</span>
          <span className="text-[#D3A96B]">SCROLL ↓</span>
        </div>
      </div>
    </section>
  );
};
