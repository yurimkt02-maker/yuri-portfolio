"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { publishedProjects, ProjectItem } from "@/data/projects";
import { ProprietaryCore } from "./ProprietaryCore";
import { ArrowLeft, ArrowUpRight, Layers, X } from "lucide-react";

export const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);
  const imageWrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedCase, setSelectedCase] = useState<ProjectItem | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      projectRefs.current.forEach((projEl, idx) => {
        const imgWrap = imageWrapRefs.current[idx];

        if (!projEl || !imgWrap) return;

        gsap.fromTo(
          imgWrap,
          { y: 18, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: projEl,
              start: "top 88%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedCase) return;

    lastFocusedElementRef.current =
      document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCase(null);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedElementRef.current?.focus();
    };
  }, [selectedCase]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-transparent border-b border-[#F4EFE8]/10 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Back to Home Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase text-[#9B9894] hover:text-[#D3A96B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para início</span>
          </Link>
        </div>

        {/* Dedicated /work Hero Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 md:pb-20 border-b border-[#F4EFE8]/10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#D3A96B]">
                WORK ARCHIVE // 03
              </span>
              <ProprietaryCore variant="work-frame" className="hidden sm:flex" />
            </div>

            <h1 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.6rem,6.2vw,5.8rem)] leading-[0.95] tracking-[-0.02em]">
              Projetos construídos para existir{" "}
              <em className="italic text-[#E6C487] font-normal">
                além da tela.
              </em>
            </h1>

            <p className="mt-5 text-base md:text-lg text-[#9B9894] max-w-2xl leading-relaxed">
              Uma seleção de sites e experiências digitais desenvolvidos para
              marcas, negócios e contextos reais.
            </p>
          </div>

          <div className="text-left lg:text-right font-mono text-[11px] tracking-[0.18em] uppercase text-[#9B9894]">
            <span className="text-[#D3A96B] block">PUBLISHED ARCHIVE</span>
            <span className="text-[#F4EFE8] mt-1 block">
              0{publishedProjects.length} PROJETOS SELECIONADOS
            </span>
          </div>
        </div>

        {/* Real Projects Showcase — Project First, Interface Second */}
        <div className="divide-y divide-[#F4EFE8]/10">
          {publishedProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <article
                id={project.id}
                key={project.id}
                ref={(el) => {
                  projectRefs.current[idx] = el;
                }}
                className="py-16 md:py-24 relative scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Giant Screenshot Stage (8 cols) */}
                  <div
                    className={`lg:col-span-8 w-full min-w-0 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div
                      ref={(el) => {
                        imageWrapRefs.current[idx] = el;
                      }}
                      className="group relative w-full border border-[#F4EFE8]/15 bg-[#141414] overflow-hidden"
                    >
                      {/* Clean, Subtle Frame Header */}
                      <div className="h-9 px-3 sm:px-4 bg-[#070708]/95 border-b border-[#F4EFE8]/10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-[#D3A96B]/80 flex-shrink-0" />
                          <span className="w-2 h-2 rounded-full bg-[#F4EFE8]/20 flex-shrink-0" />
                          <span className="ml-1 sm:ml-2 text-[9px] sm:text-[10px] font-mono tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#9B9894] truncate">
                            {project.aspectNote}
                          </span>
                        </div>

                        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#D3A96B] flex-shrink-0">
                          PROJECT {project.index}
                        </span>
                      </div>

                      {/* Project Screenshot */}
                      {project.desktopScreenshot && (
                        <Link
                          href={`/work/${project.id}`}
                          data-cursor="VIEW"
                          className="block relative w-full aspect-[16/10] overflow-hidden bg-[#0B0B0D]"
                        >
                          <Image
                            src={project.desktopScreenshot}
                            alt={`Screenshot do projeto ${project.name}`}
                            fill
                            unoptimized
                            sizes="(max-width: 1024px) 100vw, 68vw"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                            priority={idx === 0}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070708]/50 via-transparent to-transparent opacity-40 group-hover:opacity-15 transition-opacity duration-500" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Clean Project Editorial Information (4 cols) */}
                  <div
                    className={`lg:col-span-4 w-full min-w-0 flex flex-col justify-between ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3">
                        <span className="text-xs font-mono tracking-[0.22em] uppercase text-[#D3A96B] font-semibold">
                          PROJECT {project.index}
                        </span>
                        <span className="w-6 h-px bg-[#F4EFE8]/20" />
                        <span className="text-xs text-[#9B9894]">
                          {project.segment}
                        </span>
                      </div>

                      <h2 className="font-sans font-bold text-[#F4EFE8] text-[clamp(1.75rem,3.4vw,3.2rem)] leading-[1.04] tracking-[-0.03em]">
                        {project.name}
                      </h2>

                      <p className="mt-4 text-sm sm:text-base text-[#F4EFE8]/85 leading-relaxed">
                        {project.shortSummary}
                      </p>

                      {/* Stack Tags */}
                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-[10px] font-mono tracking-[0.18em] uppercase border border-[#F4EFE8]/12 bg-[#141414]/80 text-[#F4EFE8]/85"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 pt-6 border-t border-[#F4EFE8]/10 flex flex-wrap items-center justify-between gap-4">
                      <Link
                        href={`/work/${project.id}`}
                        data-cursor="VIEW"
                        className="group inline-flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-[#F4EFE8] hover:text-[#D3A96B] transition-colors"
                      >
                        <span className="border-b border-[#D3A96B] pb-1">
                          Explorar projeto
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#D3A96B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setSelectedCase(project)}
                        className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#9B9894] hover:text-[#E6C487] transition-colors"
                      >
                        Resumo rápido
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Internal Quick-Inspect Modal (Accessible Focus Trap Preserved) */}
      {selectedCase && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
          className="fixed inset-0 z-[100] bg-[#070708]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
          onClick={() => setSelectedCase(null)}
        >
          <div
            ref={dialogRef}
            className="relative w-full max-w-4xl bg-[#141414] border border-[#D3A96B]/40 p-5 sm:p-8 md:p-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#F4EFE8]/10 pb-5 mb-6">
              <div className="min-w-0">
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#D3A96B] block">
                  PROJECT {selectedCase.index} — {selectedCase.segment}
                </span>
                <h3
                  id="case-modal-title"
                  className="text-xl sm:text-3xl font-bold text-[#F4EFE8] mt-1 tracking-[-0.02em]"
                >
                  {selectedCase.name}
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedCase(null)}
                aria-label="Fechar detalhes do projeto"
                className="flex-shrink-0 p-2 border border-[#F4EFE8]/15 hover:border-[#D3A96B] text-[#F4EFE8] hover:text-[#D3A96B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedCase.desktopScreenshot && (
              <div className="relative aspect-[16/10] w-full mb-6 border border-[#F4EFE8]/15 overflow-hidden bg-[#070708]">
                <Image
                  src={selectedCase.desktopScreenshot}
                  alt={selectedCase.name}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 850px"
                  className="object-cover object-top"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              <div className="p-4 bg-[#070708] border border-[#F4EFE8]/10">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D3A96B] block mb-1.5">
                  CONTEXTO
                </span>
                <p className="text-sm text-[#F4EFE8]/90 leading-relaxed">
                  {selectedCase.description}
                </p>
              </div>

              <div className="p-4 bg-[#070708] border border-[#F4EFE8]/10">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D3A96B] block mb-1.5">
                  DESAFIO
                </span>
                <p className="text-sm text-[#9B9894] leading-relaxed">
                  {selectedCase.challenge}
                </p>
              </div>

              <div className="p-4 bg-[#070708] border border-[#F4EFE8]/10">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D3A96B] block mb-1.5">
                  SOLUÇÃO
                </span>
                <p className="text-sm text-[#F4EFE8]/90 leading-relaxed">
                  {selectedCase.solution}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#F4EFE8]/10">
              <div className="flex flex-wrap items-center gap-2">
                <Layers className="w-4 h-4 text-[#D3A96B] mr-1" />
                {selectedCase.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-[10px] font-mono tracking-[0.18em] uppercase bg-[#070708] border border-[#F4EFE8]/15 text-[#F4EFE8]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href={`/work/${selectedCase.id}`}
                onClick={() => setSelectedCase(null)}
                className="px-5 py-2.5 bg-[#D3A96B] text-[#070708] text-xs font-mono font-semibold tracking-[0.18em] uppercase hover:bg-[#E6C487] transition-colors inline-flex items-center gap-2"
              >
                <span>Ver página do projeto</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
