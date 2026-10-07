"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

const STAGES = [
  { code: "01", label: "AD", pt: "Anúncio" },
  { code: "02", label: "LANDING PAGE", pt: "Página" },
  { code: "03", label: "EVENT", pt: "Ação" },
  { code: "04", label: "LEAD", pt: "Contato" },
  { code: "05", label: "CRM", pt: "Relacionamento" },
  { code: "06", label: "OPTIMIZATION", pt: "Melhoria" },
];

export const PerformanceTeaser: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const svgLineRef = useRef<SVGLineElement | null>(null);
  const stageCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (svgLineRef.current) {
        gsap.fromTo(
          svgLineRef.current,
          { strokeDashoffset: 1080 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              end: "bottom 58%",
              scrub: 0.4,
            },
          }
        );
      }

      gsap.fromTo(
        stageCardsRef.current.filter(Boolean),
        { y: 16 },
        {
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="performance-system"
      ref={sectionRef}
      aria-label="Performance System"
      className="relative z-20 py-24 md:py-32 bg-transparent border-b border-[#F4EFE8]/10 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#F4EFE8]/10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B] block mb-4">
              PERFORMANCE / SYSTEM
            </span>

            <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.4rem,5.2vw,5rem)] leading-[0.96] tracking-[-0.02em]">
              Do anúncio até a{" "}
              <em className="italic text-[#E6C487] font-normal">
                oportunidade.
              </em>
            </h2>

            <p className="mt-4 text-base text-[#9B9894] leading-relaxed">
              Tráfego, página e dados trabalhando como partes do mesmo sistema.
            </p>
          </div>

          <Link
            href="/performance"
            data-cursor="EXPLORE"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase text-[#F4EFE8] hover:text-[#D3A96B] transition-colors border-b border-[#D3A96B] pb-1 self-start lg:self-auto"
          >
            <span>Explore Performance</span>
            <ArrowRight className="w-4 h-4 text-[#D3A96B] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Scroll-Reactive Animated 6-Stage Journey Diagram */}
        <div className="mt-12 relative">
          {/* Desktop Animated Golden Signal Line + Ambient Grid Continuation */}
          <div className="hidden lg:block relative mb-6">
            <svg
              viewBox="0 0 1200 44"
              className="w-full h-11 overflow-visible"
              aria-hidden="true"
            >
              <line
                x1="60"
                y1="18"
                x2="1140"
                y2="18"
                stroke="rgba(244, 239, 232, 0.14)"
                strokeWidth="1.5"
              />
              <line
                ref={svgLineRef}
                x1="60"
                y1="18"
                x2="1140"
                y2="18"
                stroke="#D3A96B"
                strokeWidth="2"
                strokeDasharray="1080"
                strokeDashoffset="0"
              />

              {[60, 276, 492, 708, 924, 1140].map((cx, i) => (
                <g key={cx}>
                  <circle
                    cx={cx}
                    cy={18}
                    r={4.5}
                    fill="#070708"
                    stroke="#D3A96B"
                    strokeWidth="1.5"
                  />
                  {i === 5 && (
                    <>
                      <circle cx={cx} cy={18} r={2} fill="#E6C487" />
                      <circle
                        cx={cx}
                        cy={18}
                        r={9}
                        fill="none"
                        stroke="rgba(211, 169, 107, 0.35)"
                        strokeWidth="1"
                      />
                    </>
                  )}
                </g>
              ))}

              {/* Main signal pulses travelling through the 6 stages and continuing into the ambient grid */}
              <circle r="3.5" cy="18" fill="#E6C487">
                <animate
                  attributeName="cx"
                  from="60"
                  to="1320"
                  dur="5.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.08;0.85;1"
                  dur="5.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="2.5" cy="18" fill="#D3A96B">
                <animate
                  attributeName="cx"
                  from="60"
                  to="1320"
                  dur="5.4s"
                  begin="2.7s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.08;0.85;1"
                  dur="5.4s"
                  begin="2.7s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* 6 Stages Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.label}
                ref={(el) => {
                  stageCardsRef.current[idx] = el;
                }}
                className="p-4 sm:p-5 bg-[#0D0D11]/85 backdrop-blur-sm border border-[#F4EFE8]/10 hover:border-[#D3A96B]/55 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#D3A96B]">
                    {stage.code}
                  </span>
                  <span className="text-xs font-mono text-[#D3A96B]/70">
                    {idx < STAGES.length - 1 ? "→" : "●"}
                  </span>
                </div>
                <div className="text-sm sm:text-[15px] font-bold tracking-[0.04em] text-[#F4EFE8]">
                  {stage.label}
                </div>
                <div className="text-xs text-[#9B9894] mt-1">{stage.pt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
