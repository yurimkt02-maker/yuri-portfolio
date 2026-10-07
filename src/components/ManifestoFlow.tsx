"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FlowStage {
  id: string;
  step: string;
  techLabel: string;
  humanTitle: string;
  humanSummary: string;
  detail: string;
}

const FLOW_STAGES: FlowStage[] = [
  {
    id: "attract",
    step: "01",
    techLabel: "ATTRACT",
    humanTitle: "Atrair",
    humanSummary: "Trazer as pessoas certas.",
    detail:
      "Campanhas no Google Ads e Meta Ads criadas para alcançar quem já procura pelo seu serviço ou tem perfil real de compra.",
  },
  {
    id: "experience",
    step: "02",
    techLabel: "EXPERIENCE",
    humanTitle: "Experiência",
    humanSummary: "Apresentar uma página clara e bem construída.",
    detail:
      "Ao clicar no anúncio, a pessoa encontra um site rápido, bem adaptado ao celular e que transmite confiança nos primeiros segundos.",
  },
  {
    id: "convert",
    step: "03",
    techLabel: "CONVERT",
    humanTitle: "Converter",
    humanSummary: "Transformar atenção em ação.",
    detail:
      "Informações organizadas e botões de contato diretos para facilitar o pedido de orçamento, agendamento ou conversa comercial.",
  },
  {
    id: "measure",
    step: "04",
    techLabel: "MEASURE",
    humanTitle: "Mensurar",
    humanSummary: "Entender o que está funcionando.",
    detail:
      "Rastreamento configurado para medir cliques, leitura da página e origem de cada oportunidade gerada.",
  },
  {
    id: "optimize",
    step: "05",
    techLabel: "OPTIMIZE",
    humanTitle: "Otimizar",
    humanSummary: "Melhorar continuamente.",
    detail:
      "Com os dados em mãos, ajustamos tanto os anúncios quanto a página para atrair melhor e converter mais ao longo do tempo.",
  },
];

export const ManifestoFlow: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".flow-spine-container",
              start: "top 68%",
              end: "bottom 55%",
              scrub: 0.4,
            },
          }
        );
      }

      stageRefs.current.forEach((el, index) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 64%",
          end: "bottom 45%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Manifesto e Fluxo de Trabalho"
      className="relative py-20 md:py-28 bg-[#070708] border-b border-[#F4EFE8]/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Layer 01 — Technical Label */}
        <div className="flex items-center justify-between border-b border-[#F4EFE8]/10 pb-4 mb-12 md:mb-16">
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#D3A96B]">
            SYSTEM LOGIC // 01
          </span>
          <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#9B9894]">
            ATTRACT → EXPERIENCE → CONVERT → MEASURE → OPTIMIZE
          </span>
        </div>

        {/* Core Manifesto Statement + Simple Human Translation */}
        <div className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 border-l-2 border-[#D3A96B] pl-6 md:pl-8">
              <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.3rem,4.6vw,4.6rem)] leading-[1.02] tracking-[-0.02em]">
                Tráfego sem estrutura{" "}
                <span className="italic text-[#9B9894]">
                  desperdiça atenção.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-6 border-l-2 border-[#F4EFE8]/25 pl-6 md:pl-8 lg:mt-10">
              <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.3rem,4.6vw,4.6rem)] leading-[1.02] tracking-[-0.02em]">
                Estrutura sem tráfego{" "}
                <span className="italic text-[#E6C487]">depende da sorte.</span>
              </h2>
            </div>
          </div>

          {/* Direct Human Translation Bridge */}
          <div className="mt-12 md:mt-16 p-6 sm:p-8 md:p-10 border border-[#F4EFE8]/12 bg-[#141414]/55 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D3A96B] block mb-2">
                NA PRÁTICA
              </span>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F4EFE8] leading-tight">
                Eu construo a estrutura.{" "}
                <em className="italic text-[#E6C487] font-normal">
                  Depois levo as pessoas certas até ela.
                </em>
              </p>
            </div>

            <p className="text-sm md:text-base text-[#9B9894] max-w-md leading-relaxed">
              Um site bem construído apresenta sua marca com clareza; o tráfego
              pago coloca as pessoas certas diante dele e os dados mostram como
              evoluir.
            </p>
          </div>
        </div>

        {/* Scroll-Reactive 5-Stage Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="p-6 md:p-7 border border-[#F4EFE8]/10 bg-[#141414]/60">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D3A96B]">
                  COMO TUDO SE CONECTA
                </span>
                <span className="text-[11px] font-mono text-[#9B9894]">
                  {FLOW_STAGES[activeIndex]?.step} / 05
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-[#F4EFE8] leading-snug mb-3">
                Do primeiro clique até a melhoria contínua.
              </h3>

              <p className="text-sm text-[#9B9894] leading-relaxed mb-6">
                Cada etapa cumpre um papel claro para que o visitante entenda a
                proposta e dê o próximo passo.
              </p>

              <div className="space-y-1.5 border-t border-[#F4EFE8]/10 pt-4">
                {FLOW_STAGES.map((stage, i) => {
                  const isActive = i === activeIndex;
                  const isPassed = i <= activeIndex;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => {
                        setActiveIndex(i);
                        stageRefs.current[i]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className="w-full flex items-center justify-between py-1.5 text-left group focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-[#D3A96B] scale-125"
                              : isPassed
                              ? "bg-[#D3A96B]/50"
                              : "bg-[#9B9894]/30"
                          }`}
                        />
                        <span
                          className={`text-xs tracking-[0.06em] transition-colors ${
                            isActive
                              ? "text-[#F4EFE8] font-semibold"
                              : "text-[#9B9894] group-hover:text-[#F4EFE8]"
                          }`}
                        >
                          {stage.humanTitle}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-mono tracking-[0.16em] ${
                          isActive ? "text-[#D3A96B]" : "text-[#9B9894]/60"
                        }`}
                      >
                        {stage.techLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Scroll-Driven Spine */}
          <div className="lg:col-span-8 relative flow-spine-container pl-6 sm:pl-12">
            <div
              className="absolute top-3 bottom-3 left-2 sm:left-4 w-[1px] bg-[#F4EFE8]/12"
              aria-hidden="true"
            />
            <div
              ref={progressLineRef}
              className="absolute top-3 bottom-3 left-2 sm:left-4 w-[1.5px] bg-[#D3A96B] origin-top"
              aria-hidden="true"
            />

            <div className="space-y-6 md:space-y-8">
              {FLOW_STAGES.map((stage, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={stage.id}
                    ref={(el) => {
                      stageRefs.current[idx] = el;
                    }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`relative transition-all duration-400 border ${
                      isActive
                        ? "border-[#D3A96B]/60 bg-[#141414]/90"
                        : "border-[#F4EFE8]/10 bg-[#141414]/30 opacity-75 hover:opacity-100"
                    } p-6 sm:p-7`}
                  >
                    {/* Spine Node */}
                    <div
                      className={`absolute -left-[21px] sm:-left-[37px] top-8 w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                        isActive
                          ? "bg-[#D3A96B] border-[#E6C487] scale-110"
                          : "bg-[#070708] border-[#9B9894]/50"
                      }`}
                      aria-hidden="true"
                    />

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D3A96B]">
                        {stage.step} // {stage.techLabel}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
                      <h4 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#F4EFE8]">
                        {stage.humanTitle}
                      </h4>
                      <span className="font-serif italic text-lg sm:text-xl text-[#E6C487]">
                        {stage.humanSummary}
                      </span>
                    </div>

                    <p className="text-sm text-[#9B9894] leading-relaxed max-w-2xl">
                      {stage.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
