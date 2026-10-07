"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProcessStep {
  num: string;
  title: string;
  ptSubtitle: string;
  summary: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "UNDERSTAND",
    ptSubtitle: "Entender negócio, público e objetivo.",
    summary:
      "Alinhamento sobre o serviço, quem é o cliente ideal e qual ação principal o site precisa gerar.",
  },
  {
    num: "02",
    title: "STRUCTURE",
    ptSubtitle: "Organizar a estrutura e a mensagem da página.",
    summary:
      "Definição das seções, argumentos e caminho de navegação para que o visitante compreenda tudo sem esforço.",
  },
  {
    num: "03",
    title: "DESIGN",
    ptSubtitle: "Criar uma interface clara, autoral e com identidade.",
    summary:
      "Direção visual, tipografia e layout desenhados sob medida para transmitir valor e profissionalismo.",
  },
  {
    num: "04",
    title: "BUILD",
    ptSubtitle: "Desenvolver com velocidade, responsividade e precisão.",
    summary:
      "Código moderno pensado para abrir rápido, funcionar perfeitamente no celular e ter animações fluidas.",
  },
  {
    num: "05",
    title: "MEASURE",
    ptSubtitle: "Configurar o rastreamento de cliques e conversões.",
    summary:
      "Instalação de Google Analytics, Tag Manager e Pixel para registrar cada contato e interação.",
  },
  {
    num: "06",
    title: "ACQUIRE",
    ptSubtitle: "Ativar campanhas para atrair as pessoas certas.",
    summary:
      "Criação e gestão de anúncios no Google Ads e Meta Ads levando público qualificado até a página.",
  },
  {
    num: "07",
    title: "OPTIMIZE",
    ptSubtitle: "Usar os dados para melhorar continuamente.",
    summary:
      "Acompanhamento dos resultados para refinar anúncios, público e página de forma constante.",
  },
];

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineFillRef = useRef<HTMLDivElement | null>(null);
  const travelerRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".process-narrative-track",
              start: "top 65%",
              end: "bottom 55%",
              scrub: 0.35,
            },
          }
        );
      }

      if (travelerRef.current) {
        gsap.fromTo(
          travelerRef.current,
          { top: "0%" },
          {
            top: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: ".process-narrative-track",
              start: "top 65%",
              end: "bottom 55%",
              scrub: 0.35,
            },
          }
        );
      }

      rowRefs.current.forEach((row, idx) => {
        if (!row) return;
        ScrollTrigger.create({
          trigger: row,
          start: "top 62%",
          end: "bottom 45%",
          onEnter: () => setActiveStep(idx),
          onEnterBack: () => setActiveStep(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Processo de Trabalho"
      className="relative py-20 md:py-28 bg-[#070708] border-b border-[#F4EFE8]/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* 3-Layer Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 md:pb-16 border-b border-[#F4EFE8]/10">
          <div>
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#D3A96B] block mb-3">
              PROCESS // 05
            </span>
            <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.4rem,5.4vw,5rem)] leading-[0.96] tracking-[-0.02em]">
              Como cada projeto sai do papel e{" "}
              <em className="italic text-[#E6C487] font-normal">
                gera resultado.
              </em>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#9B9894] max-w-md leading-relaxed">
            Sete etapas conectadas para construir a presença digital, atrair
            visitantes e evoluir com base em dados.
          </p>
        </div>

        {/* Continuous Narrative Spine */}
        <div className="process-narrative-track relative mt-10 md:mt-16">
          <div
            className="absolute top-0 bottom-0 left-4 lg:left-1/2 -translate-x-1/2 w-px bg-[#F4EFE8]/12"
            aria-hidden="true"
          />
          <div
            ref={lineFillRef}
            className="absolute top-0 bottom-0 left-4 lg:left-1/2 -translate-x-1/2 w-[1.5px] bg-[#D3A96B] origin-top"
            aria-hidden="true"
          />

          {/* Travelling Geometric Core Object */}
          <div
            ref={travelerRef}
            className="absolute left-4 lg:left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-7 h-7 rounded-full bg-[#070708] border border-[#D3A96B] flex items-center justify-center shadow-[0_0_20px_rgba(211,169,107,0.65)]">
              <div className="w-2 h-2 rotate-45 bg-[#E6C487]" />
            </div>
          </div>

          {/* 01 to 07 Narrative Rows */}
          <div className="space-y-8 md:space-y-0">
            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isCurrent = idx === activeStep;

              return (
                <div
                  key={step.num}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="relative pl-12 lg:pl-0 py-5 lg:py-9 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-baseline border-b border-[#F4EFE8]/[0.06] last:border-b-0"
                >
                  {/* Title + Portuguese Subtitle */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven
                        ? "lg:text-right lg:pr-12"
                        : "lg:order-3 lg:pl-12 lg:text-left"
                    }`}
                  >
                    <h3
                      className={`font-sans font-bold text-[clamp(1.75rem,3.3vw,3rem)] leading-none tracking-[-0.03em] transition-colors duration-300 ${
                        isCurrent ? "text-[#F4EFE8]" : "text-[#F4EFE8]/45"
                      }`}
                    >
                      <span className="font-serif italic font-normal text-[#D3A96B] mr-2.5">
                        {step.num} —
                      </span>
                      {step.title}
                    </h3>

                    <p
                      className={`mt-2 text-sm sm:text-base font-medium transition-colors duration-300 ${
                        isCurrent ? "text-[#E6C487]" : "text-[#9B9894]/75"
                      }`}
                    >
                      {step.ptSubtitle}
                    </p>
                  </div>

                  {/* Center Axis Node Marker */}
                  <div className="hidden lg:flex lg:col-span-2 lg:order-2 justify-center items-center">
                    <div
                      className={`w-3 h-3 rotate-45 border transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#D3A96B] border-[#E6C487] scale-125"
                          : "bg-[#070708] border-[#9B9894]/40"
                      }`}
                    />
                  </div>

                  {/* Concise Summary */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven
                        ? "lg:order-3 lg:pl-12"
                        : "lg:order-1 lg:pr-12 lg:text-right"
                    }`}
                  >
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isCurrent ? "text-[#F4EFE8]/85" : "text-[#9B9894]/65"
                      }`}
                    >
                      {step.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
