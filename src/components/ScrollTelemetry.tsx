"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface TelemetrySection {
  key: string;
  code: string;
  label: string;
  targetId: string;
  matchIds: readonly string[];
}

const HOME_SECTIONS: readonly TelemetrySection[] = [
  {
    key: "home",
    code: "01",
    label: "HOME",
    targetId: "top",
    matchIds: ["top", "statement"],
  },
  {
    key: "skills",
    code: "02",
    label: "SKILLS",
    targetId: "skills",
    matchIds: ["skills", "ecosystem"],
  },
  {
    key: "performance",
    code: "03",
    label: "PERFORMANCE",
    targetId: "performance-system",
    matchIds: ["performance-system"],
  },
  {
    key: "projects",
    code: "04",
    label: "PROJECTS",
    targetId: "about",
    matchIds: ["about", "projects"],
  },
  {
    key: "contact",
    code: "05",
    label: "CONTACT",
    targetId: "contact",
    matchIds: ["contact"],
  },
];

const TRACK_HEIGHT_PX = 112; // h-28 (112px)

export const ScrollTelemetry: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  const labelContainerRef = useRef<HTMLDivElement | null>(null);
  const desktopFillRef = useRef<HTMLDivElement | null>(null);
  const desktopMarkerRef = useRef<HTMLSpanElement | null>(null);
  const mobileFillRef = useRef<HTMLDivElement | null>(null);

  const activeIdxRef = useRef<number>(0);
  const percentRef = useRef<number>(0);

  // Micro-animation when the active section changes
  useEffect(() => {
    if (!labelContainerRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      labelContainerRef.current,
      { y: 5, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.22,
        ease: "power2.out",
        overwrite: true,
      }
    );
  }, [activeIdx]);

  useEffect(() => {
    let rafId = 0;
    let isTicking = false;

    const updateProgressAndBoundarySections = () => {
      isTicking = false;
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );

      // Real scroll progress (0 -> 1), guaranteed 0% at top and 100% at bottom
      let ratio = scrollY / maxScroll;
      if (scrollY <= 2) ratio = 0;
      if (scrollY >= maxScroll - 2) ratio = 1;
      ratio = Math.min(1, Math.max(0, ratio));

      // Direct transform updates for 60fps smoothness without reflow
      if (desktopFillRef.current) {
        desktopFillRef.current.style.transform = `scaleY(${ratio})`;
      }
      if (desktopMarkerRef.current) {
        const yPx = Math.round(ratio * TRACK_HEIGHT_PX);
        desktopMarkerRef.current.style.transform = `translate3d(-50%, ${yPx}px, 0)`;
      }
      if (mobileFillRef.current) {
        mobileFillRef.current.style.transform = `scaleX(${ratio})`;
      }

      const nextPct = Math.round(ratio * 100);
      if (nextPct !== percentRef.current) {
        percentRef.current = nextPct;
        setPercent(nextPct);
      }

      // Guarantee exact section at extreme top (01 / HOME) and bottom (05 / CONTACT)
      if (ratio <= 0.03 && activeIdxRef.current !== 0) {
        activeIdxRef.current = 0;
        setActiveIdx(0);
      } else if (ratio >= 0.96 && activeIdxRef.current !== HOME_SECTIONS.length - 1) {
        const last = HOME_SECTIONS.length - 1;
        activeIdxRef.current = last;
        setActiveIdx(last);
      }
    };

    const requestTick = () => {
      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(updateProgressAndBoundarySections);
      }
    };

    // IntersectionObserver to identify the predominant section in the viewport
    const idToSectionIndex = new Map<string, number>();
    HOME_SECTIONS.forEach((sec, idx) => {
      sec.matchIds.forEach((id) => idToSectionIndex.set(id, idx));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const scrollY = window.scrollY;
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        if (scrollY <= 10 || scrollY >= maxScroll - 10) return;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const matchedIdx = idToSectionIndex.get(entry.target.id);
            if (
              matchedIdx !== undefined &&
              matchedIdx !== activeIdxRef.current
            ) {
              activeIdxRef.current = matchedIdx;
              setActiveIdx(matchedIdx);
              break;
            }
          }
        }
      },
      {
        // Trigger when a section occupies the central horizontal band of the viewport
        rootMargin: "-36% 0px -46% 0px",
        threshold: 0,
      }
    );

    idToSectionIndex.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    updateProgressAndBoundarySections();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  const handleJumpToSection = (sec: TelemetrySection, idx: number) => {
    if (idx === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sec.targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentSection = HOME_SECTIONS[activeIdx] ?? HOME_SECTIONS[0];

  return (
    <>
      {/* ================================================================= */}
      {/* DESKTOP LATERAL TELEMETRY RAIL (Frameless, ultra-thin, right-5)   */}
      {/* ================================================================= */}
      <aside
        aria-label="Progresso de leitura e seção atual"
        className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2 select-none pointer-events-none"
      >
        {/* Discreet Top Label: 04 / PROJECTS */}
        <div className="overflow-hidden h-3.5 flex items-center justify-end">
          <div
            ref={labelContainerRef}
            className="flex items-center gap-1 font-mono text-[9px] font-normal tracking-[0.12em] uppercase whitespace-nowrap"
          >
            <span className="text-[#D3A96B]/90">{currentSection.code}</span>
            <span className="text-[#9B9894]/35">/</span>
            <span className="text-[#9B9894]/75">{currentSection.label}</span>
          </div>
        </div>

        {/* Center Rail: 3px Section Ticks + 1px Vertical Track + 4px Pixel Marker */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          {/* Minimalist 3px section ticks */}
          <div
            role="group"
            aria-label="Atalhos das seções"
            className="flex flex-col justify-between h-28"
          >
            {HOME_SECTIONS.map((sec, idx) => {
              const isCurrent = idx === activeIdx;
              return (
                <button
                  key={sec.key}
                  type="button"
                  onClick={() => handleJumpToSection(sec, idx)}
                  aria-label={`Ir para ${sec.code} ${sec.label}`}
                  aria-current={isCurrent ? "location" : undefined}
                  className="group relative flex items-center justify-center p-1 -m-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D3A96B]"
                >
                  <span
                    className={`block transition-colors duration-200 ${
                      isCurrent
                        ? "w-[3.5px] h-[3.5px] bg-[#D3A96B]"
                        : "w-[3px] h-[3px] bg-[#9B9894]/30 group-hover:bg-[#F4EFE8]/70"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* 1px Vertical Progress Line + 4px Pixel Square Marker */}
          <div
            aria-hidden="true"
            className="relative w-px h-28 bg-[#F4EFE8]/12"
          >
            {/* Growing Progress Fill */}
            <div
              ref={desktopFillRef}
              style={{ transform: "scaleY(0)" }}
              className="w-full h-full bg-[#F4EFE8]/40 origin-top will-change-transform"
            />

            {/* 4px Pixelated Square Progress Marker */}
            <span
              ref={desktopMarkerRef}
              style={{ transform: "translate3d(-50%, 0px, 0)" }}
              className="absolute left-1/2 top-0 -mt-[2px] w-1 h-1 bg-[#D3A96B] will-change-transform"
            />
          </div>
        </div>

        {/* Discreet Bottom Telemetry Percentage: 76% */}
        <div className="font-mono text-[9px] font-normal tracking-[0.08em] tabular-nums text-[#9B9894]/70 flex items-center">
          <span>{percent}</span>
          <span className="text-[#D3A96B]/80">%</span>
        </div>
      </aside>

      {/* ================================================================= */}
      {/* MOBILE TOP HORIZONTAL PROGRESS BAR (Prioritizes screen space)     */}
      {/* ================================================================= */}
      <div
        aria-hidden="true"
        className="lg:hidden fixed top-0 inset-x-0 z-50 pointer-events-none"
      >
        <div className="w-full h-[2px] bg-[#F4EFE8]/10 overflow-hidden">
          <div
            ref={mobileFillRef}
            style={{ transform: "scaleX(0)" }}
            className="w-full h-full bg-[#D3A96B] origin-left will-change-transform"
          />
        </div>
      </div>
    </>
  );
};
