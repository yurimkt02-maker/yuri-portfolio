"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FolderOpen } from "lucide-react";

type CardRole = "left" | "center" | "right";

interface ArchiveProjectCard {
  id: string;
  code: string;
  index: string;
  shortName: string;
  fullName: string;
  image: string;
  role: CardRole;
}

const ARCHIVE_CARDS: ArchiveProjectCard[] = [
  {
    id: "casa-da-sopa",
    code: "03 / WEB",
    index: "03",
    shortName: "Casa da Sopa",
    fullName: "Casa da Sopa — Iguape",
    image: "/cases/case-casadasopa.webp",
    role: "left",
  },
  {
    id: "meira-odontologia",
    code: "01 / WEB",
    index: "01",
    shortName: "Meira Odontologia",
    fullName: "Meira Odontologia Especializada",
    image: "/cases/case-meiraodontologia.webp",
    role: "center",
  },
  {
    id: "r-corretora",
    code: "02 / WEB",
    index: "02",
    shortName: "R Corretora",
    fullName: "R Corretora de Consórcio",
    image: "/cases/case-rcorretora.webp",
    role: "right",
  },
];

export const ProjectsDeckTeaser: React.FC = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const archiveStageRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<CardRole>("center");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!archiveStageRef.current) return;

      gsap.fromTo(
        archiveStageRef.current,
        { y: 24, opacity: 0.45 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Close archive when tapping outside on mobile
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsidePointer = (e: PointerEvent) => {
      if (
        archiveStageRef.current &&
        !archiveStageRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setActiveRole("center");
      }
    };
    document.addEventListener("pointerdown", handleOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", handleOutsidePointer);
  }, [isOpen]);

  const activeCardData =
    ARCHIVE_CARDS.find((c) => c.role === activeRole) ?? ARCHIVE_CARDS[1];

  const handleCardClick = (
    e: React.MouseEvent<HTMLElement>,
    role: CardRole
  ) => {
    e.stopPropagation();

    // If archive is closed (e.g. first tap on mobile), open it first
    if (!isOpen) {
      setIsOpen(true);
      setActiveRole("center");
      return;
    }

    // If tapping a non-focused side card, bring it to focus first
    if (activeRole !== role) {
      setActiveRole(role);
      return;
    }

    // If clicking the already-focused card, navigate to /work
    router.push("/work");
  };

  const handlePocketClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setActiveRole("center");
    } else {
      router.push("/work");
    }
  };

  const getCardStyleClasses = (role: CardRole): string => {
    // CLOSED STATE: Strictly tucked inside the folder pocket; only the top tab peeks out
    if (!isOpen) {
      if (role === "center") {
        return "z-30 translate-y-[160px] sm:translate-y-[194px] translate-x-0 rotate-0 scale-[0.92] border-[#D3A96B]/45 opacity-100";
      }
      if (role === "left") {
        return "z-20 translate-y-[174px] sm:translate-y-[210px] -translate-x-[20px] sm:-translate-x-[32px] -rotate-[1.8deg] scale-[0.87] border-[#F4EFE8]/20 opacity-90";
      }
      return "z-10 translate-y-[174px] sm:translate-y-[210px] translate-x-[20px] sm:translate-x-[32px] rotate-[1.8deg] scale-[0.87] border-[#F4EFE8]/20 opacity-90";
    }

    // OPEN STATE — Focused on CENTER card
    if (activeRole === "center") {
      if (role === "center") {
        return "z-30 translate-y-[14px] sm:translate-y-[16px] translate-x-0 rotate-0 scale-100 border-[#D3A96B] shadow-[0_24px_55px_rgba(0,0,0,0.95)] opacity-100";
      }
      if (role === "left") {
        return "z-20 translate-y-[48px] sm:translate-y-[54px] -translate-x-[44px] sm:-translate-x-[76px] -rotate-[6deg] scale-[0.9] border-[#F4EFE8]/25 hover:border-[#D3A96B]/60 opacity-90";
      }
      return "z-20 translate-y-[48px] sm:translate-y-[54px] translate-x-[44px] sm:translate-x-[76px] rotate-[6deg] scale-[0.9] border-[#F4EFE8]/25 hover:border-[#D3A96B]/60 opacity-90";
    }

    // OPEN STATE — Focused on LEFT card (Casa da Sopa)
    if (activeRole === "left") {
      if (role === "left") {
        return "z-30 translate-y-[12px] sm:translate-y-[14px] -translate-x-[16px] sm:-translate-x-[32px] -rotate-[1.5deg] scale-[1.01] border-[#D3A96B] shadow-[0_24px_55px_rgba(0,0,0,0.95)] opacity-100";
      }
      if (role === "center") {
        return "z-20 translate-y-[46px] sm:translate-y-[52px] translate-x-[16px] sm:translate-x-[26px] rotate-[2deg] scale-[0.92] border-[#F4EFE8]/20 opacity-85";
      }
      return "z-10 translate-y-[62px] sm:translate-y-[68px] translate-x-[48px] sm:translate-x-[82px] rotate-[7deg] scale-[0.87] border-[#F4EFE8]/15 opacity-75";
    }

    // OPEN STATE — Focused on RIGHT card (R Corretora)
    if (role === "right") {
      return "z-30 translate-y-[12px] sm:translate-y-[14px] translate-x-[16px] sm:translate-x-[32px] rotate-[1.5deg] scale-[1.01] border-[#D3A96B] shadow-[0_24px_55px_rgba(0,0,0,0.95)] opacity-100";
    }
    if (role === "center") {
      return "z-20 translate-y-[46px] sm:translate-y-[52px] -translate-x-[16px] sm:-translate-x-[26px] -rotate-[2deg] scale-[0.92] border-[#F4EFE8]/20 opacity-85";
    }
    return "z-10 translate-y-[62px] sm:translate-y-[68px] -translate-x-[48px] sm:-translate-x-[82px] -rotate-[7deg] scale-[0.87] border-[#F4EFE8]/15 opacity-75";
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="Project Archive Preview"
      className="relative z-20 py-24 md:py-32 bg-transparent border-b border-[#F4EFE8]/10 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Text + Primary CTA */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 bg-[#D3A96B]"
              />
              <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B]">
                VI. // PROJECT ARCHIVE
              </span>
            </div>

            <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.4rem,4.8vw,4.6rem)] leading-[0.96] tracking-[-0.02em] max-w-[16ch]">
              Projetos que saíram da ideia e viraram{" "}
              <em className="italic text-[#E6C487] font-normal">
                experiência.
              </em>
            </h2>

            <p className="mt-4 text-base text-[#9B9894] max-w-md leading-relaxed">
              Alguns trabalhos reais construídos unindo design, desenvolvimento
              web e estrutura pensada para resultado.
            </p>

            {/* Desktop Primary CTA */}
            <div className="hidden lg:block mt-9">
              <Link
                href="/work"
                data-cursor="VIEW"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#F4EFE8] hover:bg-[#E6C487] text-[#070708] text-xs sm:text-sm font-semibold tracking-[0.05em] transition-all duration-300 shadow-[0_8px_28px_rgba(244,239,232,0.12)]"
              >
                <span>Ver projetos</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Digital Dossier / Work Archive */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div
              ref={archiveStageRef}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => {
                setIsOpen(false);
                setActiveRole("center");
              }}
              className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[500px] mx-auto select-none"
            >
              {/* ========================================================= */}
              {/* SELF-CONTAINED ARCHIVE VIEWPORT (overflow-hidden bottom)  */}
              {/* Prevents any card from ever leaking below the folder base */}
              {/* ========================================================= */}
              <div className="relative w-full h-[335px] sm:h-[400px] overflow-hidden">
                {/* ------------------------------------------------------- */}
                {/* LAYER 01: DOSSIER BACKPLATE & TOP TAB (z-0)             */}
                {/* ------------------------------------------------------- */}
                <div
                  aria-hidden="true"
                  style={{
                    clipPath:
                      "polygon(0 0, 42% 0, 47% 24px, 100% 24px, 100% 100%, 0 100%)",
                  }}
                  className={`
                    absolute inset-x-2 sm:inset-x-4 bottom-0 h-[185px] sm:h-[220px] z-0
                    bg-[#0C0C11] border transition-colors duration-500
                    ${isOpen ? "border-[#D3A96B]/40" : "border-[#F4EFE8]/15"}
                  `}
                >
                  {/* Top-left Archive Tab Header */}
                  <div className="h-6 px-3.5 flex items-center gap-2 border-b border-[#F4EFE8]/10 bg-[#121218]">
                    <span className="grid grid-cols-2 gap-0.5">
                      <span className="w-1 h-1 bg-[#D3A96B]" />
                      <span className="w-1 h-1 bg-[#D3A96B]/35" />
                      <span className="w-1 h-1 bg-[#D3A96B]/35" />
                      <span className="w-1 h-1 bg-[#D3A96B]" />
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-[#E6C487]">
                      ARCHIVE // 03 FILES
                    </span>
                  </div>

                  {/* Subtle Inner Technical Grid */}
                  <div
                    className="w-full h-full opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #F4EFE8 1px, transparent 1px), linear-gradient(to bottom, #F4EFE8 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                </div>

                {/* ------------------------------------------------------- */}
                {/* LAYER 02: EXPLORABLE PROJECT CARDS (z-10 to z-30)       */}
                {/* ------------------------------------------------------- */}
                <div className="absolute inset-x-0 top-0 bottom-0">
                  {ARCHIVE_CARDS.map((card) => {
                    const isFocused = isOpen && activeRole === card.role;
                    const styleClasses = getCardStyleClasses(card.role);

                    return (
                      <article
                        key={card.id}
                        data-cursor={isOpen ? "VIEW" : "OPEN"}
                        onMouseEnter={() => {
                          if (isOpen) setActiveRole(card.role);
                        }}
                        onClick={(e) => handleCardClick(e, card.role)}
                        className={`
                          absolute left-1/2 -ml-[128px] sm:-ml-[165px]
                          w-[256px] sm:w-[330px]
                          bg-[#0E0E13] border p-2 sm:p-2.5
                          cursor-pointer
                          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                          will-change-transform
                          ${styleClasses}
                        `}
                      >
                        {/* Pixelated Corner Notches */}
                        <span
                          className={`absolute -top-px -left-px w-1.5 h-1.5 transition-colors ${
                            isFocused ? "bg-[#E6C487]" : "bg-[#D3A96B]/70"
                          }`}
                        />
                        <span
                          className={`absolute -top-px -right-px w-1.5 h-1.5 transition-colors ${
                            isFocused ? "bg-[#E6C487]" : "bg-[#D3A96B]/70"
                          }`}
                        />

                        {/* Card Top Tab Bar (Visible even when tucked inside folder) */}
                        <div className="flex items-center justify-between px-1 pb-2">
                          <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.18em] uppercase text-[#D3A96B]">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isFocused ? "bg-[#E6C487]" : "bg-[#D3A96B]/50"
                              }`}
                            />
                            {card.code}
                          </span>
                          <span className="text-[10px] sm:text-xs font-medium text-[#F4EFE8] truncate max-w-[155px]">
                            {card.shortName}
                          </span>
                        </div>

                        {/* Real .webp Project Screenshot */}
                        <div className="relative w-full aspect-[16/10] bg-[#15151B] overflow-hidden border border-[#F4EFE8]/10">
                          <Image
                            src={card.image}
                            alt={card.fullName}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 260px, 330px"
                            className="object-cover object-top"
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* ------------------------------------------------------- */}
                {/* LAYER 03: SOLID FRONT DOSSIER POCKET SLEEVE (z-40)      */}
                {/* Completely masks the bottom of stored cards             */}
                {/* ------------------------------------------------------- */}
                <div
                  data-cursor={isOpen ? "VIEW" : "OPEN"}
                  onClick={handlePocketClick}
                  className="absolute inset-x-2 sm:inset-x-4 bottom-0 h-[136px] sm:h-[156px] z-40 cursor-pointer flex flex-col justify-end"
                >
                  {/* Top Chamfered Golden Lip */}
                  <svg
                    viewBox="0 0 400 18"
                    preserveAspectRatio="none"
                    className="w-full h-3.5 block overflow-visible pointer-events-none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 0 1 L 136 1 L 150 13 L 250 13 L 264 1 L 400 1"
                      fill="none"
                      stroke={isOpen ? "#E6C487" : "#D3A96B"}
                      strokeOpacity={isOpen ? "0.8" : "0.45"}
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* 100% Opaque Solid Pocket Body — Zero Card Bleed-Through */}
                  <div
                    style={{
                      clipPath:
                        "polygon(0 0, 34% 0, 37.5% 12px, 62.5% 12px, 66% 0, 100% 0, 100% 100%, 0 100%)",
                    }}
                    className={`
                      -mt-3.5 w-full h-full bg-[#09090D]
                      border-x border-b transition-colors duration-500
                      flex flex-col justify-between p-4 sm:p-5
                      shadow-[0_-18px_40px_rgba(0,0,0,0.92)]
                      ${isOpen ? "border-[#D3A96B]/50" : "border-[#F4EFE8]/15"}
                    `}
                  >
                    {/* Top Row: Pixel Indicators + Interactive File Switcher */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        {ARCHIVE_CARDS.map((c) => {
                          const isCurrent = isOpen && activeRole === c.role;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(true);
                                setActiveRole(c.role);
                              }}
                              aria-label={`Destacar projeto ${c.shortName}`}
                              className={`px-1.5 py-0.5 text-[9px] font-mono tracking-[0.14em] border transition-colors ${
                                isCurrent
                                  ? "border-[#D3A96B] bg-[#D3A96B]/15 text-[#E6C487]"
                                  : "border-[#F4EFE8]/12 bg-[#121217] text-[#9B9894] hover:text-[#F4EFE8]"
                              }`}
                            >
                              {c.index}
                            </button>
                          );
                        })}
                      </div>

                      <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-[#9B9894]">
                        {isOpen
                          ? `FILE // ${activeCardData.shortName.toUpperCase()}`
                          : "DOSSIER // 03 CASES"}
                      </span>
                    </div>

                    {/* Center Mechanical Line */}
                    <div className="my-auto flex items-center gap-3 pointer-events-none">
                      <div className="h-px flex-1 bg-gradient-to-r from-[#D3A96B]/30 via-[#F4EFE8]/10 to-transparent" />
                      <span className="w-1.5 h-1.5 bg-[#D3A96B]/70" />
                      <div className="h-px flex-1 bg-gradient-to-l from-[#D3A96B]/30 via-[#F4EFE8]/10 to-transparent" />
                    </div>

                    {/* Bottom Row: Dossier Label & Action Status */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#F4EFE8]/10">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="w-3.5 h-3.5 text-[#D3A96B]" />
                        <span className="text-[10px] sm:text-xs font-mono tracking-[0.16em] uppercase text-[#F4EFE8]">
                          WORK ARCHIVE
                        </span>
                      </div>

                      <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-[#E6C487] flex items-center gap-1">
                        <span>
                          {isOpen ? "EXPLORAR /WORK" : "PASSE O MOUSE"}
                        </span>
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isOpen ? "translate-x-0.5 -translate-y-0.5" : ""
                          }`}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Primary CTA */}
            <div className="lg:hidden mt-7">
              <Link
                href="/work"
                data-cursor="VIEW"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#F4EFE8] hover:bg-[#E6C487] text-[#070708] text-xs sm:text-sm font-semibold tracking-[0.05em] transition-all duration-300 shadow-[0_8px_28px_rgba(244,239,232,0.12)]"
              >
                <span>Ver projetos</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
