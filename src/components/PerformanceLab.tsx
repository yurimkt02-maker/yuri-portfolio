"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface JourneyStage {
  id: string;
  code: string;
  label: string;
  ptLabel: string;
  summary: string;
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "ad",
    code: "01",
    label: "AD",
    ptLabel: "Anúncio",
    summary:
      "Atrai a atenção da pessoa certa no Google Ads ou Meta Ads com uma mensagem alinhada ao objetivo.",
  },
  {
    id: "landing-page",
    code: "02",
    label: "LANDING PAGE",
    ptLabel: "Página",
    summary:
      "Recebe o clique com carregamento rápido, clareza visual e estrutura pensada para converter.",
  },
  {
    id: "event",
    code: "03",
    label: "EVENT",
    ptLabel: "Ação",
    summary:
      "Rastreia cliques, leitura e interações importantes para entender o comportamento na página.",
  },
  {
    id: "lead",
    code: "04",
    label: "LEAD",
    ptLabel: "Contato",
    summary:
      "Transforma a visita em oportunidade real por WhatsApp ou formulário, registrando a origem.",
  },
  {
    id: "crm",
    code: "05",
    label: "CRM",
    ptLabel: "Relacionamento",
    summary:
      "Organiza o atendimento comercial conectando o anúncio de origem ao fechamento.",
  },
  {
    id: "optimization",
    code: "06",
    label: "OPTIMIZATION",
    ptLabel: "Melhoria",
    summary:
      "Usa os dados coletados para ajustar continuamente tanto as campanhas quanto a página.",
  },
];

const PAID_MEDIA_PILLARS = [
  {
    code: "01",
    title: "Meta Ads",
    note: "Geração de demanda, atenção qualificada e alcance segmentado.",
  },
  {
    code: "02",
    title: "Google Ads",
    note: "Captura de intenção ativa no momento exato da pesquisa.",
  },
  {
    code: "03",
    title: "Tracking",
    note: "Mensuração precisa de eventos, conversões e origem de cada contato.",
  },
  {
    code: "04",
    title: "Remarketing",
    note: "Reconexão estratégica com quem já visitou e demonstrou interesse.",
  },
  {
    code: "05",
    title: "Optimization",
    note: "Refinamento contínuo de verba, criativos e experiência de destino.",
  },
];

export const PerformanceLab: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const svgPathRef = useRef<SVGLineElement | null>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (svgPathRef.current) {
        gsap.fromTo(
          svgPathRef.current,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".journey-flow-box",
              start: "top 78%",
              end: "bottom 55%",
              scrub: 0.4,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentStage = JOURNEY_STAGES[activeStage];

  return (
    <div ref={sectionRef} className="bg-transparent text-[#F4EFE8]">
      {/* 1. Ideia Central: Site + Tráfego + Tracking */}
      <section className="py-20 md:py-28 border-b border-[#F4EFE8]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <span className="block text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B] mb-6">
            01 // CORE LOGIC
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.3rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.02em]">
                Tráfego sem estrutura desperdiça atenção.{" "}
                <em className="italic text-[#E6C487] font-normal">
                  Estrutura sem tráfego depende da sorte.
                </em>
              </h2>
            </div>

            <div className="lg:col-span-4">
              <p className="text-base text-[#9B9894] leading-relaxed">
                Site, tráfego pago e tracking construídos como um único sistema:
                atrair as pessoas certas, apresentar uma página clara e medir o
                que gera oportunidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Fluxo Principal: AD -> LANDING PAGE -> EVENT -> LEAD -> CRM -> OPTIMIZATION */}
      <section className="journey-flow-box py-20 md:py-28 border-b border-[#F4EFE8]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B] block mb-3">
                02 // SYSTEM FLOW
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4EFE8] tracking-[-0.02em]">
                Do anúncio até a oportunidade.
              </h2>
            </div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#9B9894]">
              AD → LANDING PAGE → EVENT → LEAD → CRM → OPTIMIZATION
            </span>
          </div>

          <div className="p-6 sm:p-8 border border-[#F4EFE8]/12 bg-[#141414]/50">
            {/* Desktop Animated Golden Line + Pulses */}
            <div className="hidden lg:block relative mb-8 pt-2">
              <svg
                viewBox="0 0 1200 36"
                className="w-full h-9 overflow-visible"
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
                  ref={svgPathRef}
                  x1="60"
                  y1="18"
                  x2="1140"
                  y2="18"
                  stroke="#D3A96B"
                  strokeWidth="2"
                  strokeDasharray="1000"
                  strokeDashoffset="0"
                />
                <circle r="4" cy="18" fill="#E6C487">
                  <animate
                    attributeName="cx"
                    from="60"
                    to="1140"
                    dur="5.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="3" cy="18" fill="#D3A96B">
                  <animate
                    attributeName="cx"
                    from="60"
                    to="1140"
                    dur="5.5s"
                    begin="2.75s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>

            {/* 6 Stages */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {JOURNEY_STAGES.map((stage, i) => {
                const isSelected = i === activeStage;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStage(i)}
                    onMouseEnter={() => setActiveStage(i)}
                    className={`text-left p-4 sm:p-5 border transition-all duration-300 focus:outline-none ${
                      isSelected
                        ? "border-[#D3A96B] bg-[#070708]"
                        : "border-[#F4EFE8]/10 bg-[#070708]/50 hover:border-[#F4EFE8]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-mono tracking-[0.2em] ${
                          isSelected ? "text-[#D3A96B]" : "text-[#9B9894]"
                        }`}
                      >
                        {stage.code}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-[#D3A96B]" : "bg-[#9B9894]/30"
                        }`}
                      />
                    </div>

                    <div className="text-sm sm:text-base font-bold tracking-[0.05em] text-[#F4EFE8]">
                      {stage.label}
                    </div>
                    <div className="text-xs text-[#E6C487] mt-1">
                      {stage.ptLabel}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Concise Active Stage Readout */}
            <div className="mt-6 pt-6 border-t border-[#F4EFE8]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-mono text-[#D3A96B]">
                  {currentStage.code} // {currentStage.label}
                </span>
                <span className="text-sm font-semibold text-[#F4EFE8]">
                  ({currentStage.ptLabel})
                </span>
              </div>
              <p className="text-sm text-[#9B9894] max-w-2xl">
                {currentStage.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Paid Media + Conexão Web & Performance */}
      <section className="py-20 md:py-28 border-b border-[#F4EFE8]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Paid Media Pillars (7 cols) */}
            <div className="lg:col-span-7">
              <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B] block mb-4">
                03 // PAID MEDIA
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EFE8] mb-8">
                Frentes de aquisição e mensuração.
              </h2>

              <div className="divide-y divide-[#F4EFE8]/10 border-t border-b border-[#F4EFE8]/10">
                {PAID_MEDIA_PILLARS.map((item) => (
                  <div
                    key={item.code}
                    className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10px] font-mono text-[#D3A96B]">
                        {item.code}
                      </span>
                      <span className="text-lg font-semibold text-[#F4EFE8]">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-[#9B9894]">
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conexão Web + Performance (5 cols) */}
            <div className="lg:col-span-5 lg:mt-10 p-7 sm:p-8 border border-[#F4EFE8]/12 bg-[#141414]/45">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#D3A96B] block mb-3">
                WEB × PERFORMANCE
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EFE8] leading-snug">
                O site recebe. O tráfego leva.{" "}
                <em className="italic text-[#E6C487] font-normal">
                  Os dados mostram o que melhorar.
                </em>
              </h3>

              <p className="mt-4 text-sm text-[#9B9894] leading-relaxed">
                Unir desenvolvimento web e mídia paga evita o desalinhamento
                entre o anúncio e a página de destino — garantindo velocidade no
                carregamento, clareza na mensagem e rastreamento confiável de
                ponta a ponta.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
