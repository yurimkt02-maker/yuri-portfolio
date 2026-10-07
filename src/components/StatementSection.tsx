"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const StatementSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const serifAccentOneRef = useRef<HTMLElement | null>(null);
  const serifAccentTwoRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Full Sticky Editorial Bridge -> Next Section rises & masks over it
      mm.add("(min-width: 768px)", () => {
        // Phase 1: Entrance reveal into Estado 01
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0.25 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              end: "top 25%",
              scrub: 0.35,
            },
          }
        );

        gsap.fromTo(
          lineRef.current,
          { scaleX: 0.12, opacity: 0.35 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 20%",
              scrub: 0.35,
            },
          }
        );

        // Phase 2 (Estados 02 -> 05): As next section invades from bottom,
        // Statement recedes in scale/Y, Instrument Serif words drift at a distinct rhythm,
        // and clip-path masks the lower edge naturally.
        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.35,
            onUpdate: (self) => {
              if (sectionRef.current) {
                sectionRef.current.dataset.transitionProgress =
                  self.progress.toFixed(2);
              }
            },
          },
        });

        exitTl.to(
          stageRef.current,
          {
            y: -54,
            scale: 0.935,
            opacity: 0.12,
            clipPath: "inset(0% 0% 22% 0%)",
            ease: "none",
          },
          0
        );

        exitTl.to(
          serifAccentOneRef.current,
          {
            yPercent: -22,
            x: 6,
            ease: "none",
          },
          0
        );

        exitTl.to(
          serifAccentTwoRef.current,
          {
            yPercent: -14,
            x: -4,
            ease: "none",
          },
          0
        );
      });

      // Mobile: Lightweight fluid editorial transition without heavy pinning
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          textRef.current,
          { y: 24, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 0.3,
            },
          }
        );

        gsap.to(stageRef.current, {
          y: -24,
          scale: 0.96,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center 40%",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="statement"
      ref={sectionRef}
      aria-label="Statement"
      className="relative z-10 min-h-[72vh] md:min-h-[118vh] bg-transparent overflow-visible"
    >
      {/* Sticky Viewport Stage on Desktop, Fluid Stage on Mobile */}
      <div className="md:sticky md:top-0 min-h-[68vh] md:min-h-screen flex items-center py-24 md:py-32">
        <div
          ref={stageRef}
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          className="max-w-[1320px] w-full mx-auto px-5 sm:px-8 lg:px-12 will-change-transform"
        >
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[#D3A96B]"
              />
              <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B]">
                II. // STATEMENT
              </span>
            </div>

            <h2
              ref={textRef}
              className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.55rem,6.3vw,6.35rem)] leading-[0.98] tracking-[-0.025em] will-change-transform"
            >
              Eu crio{" "}
              <em
                ref={serifAccentOneRef}
                className="inline-block italic text-[#E6C487] font-normal will-change-transform"
              >
                experiências digitais
              </em>{" "}
              e os{" "}
              <em
                ref={serifAccentTwoRef}
                className="inline-block italic text-[#D3A96B] font-normal will-change-transform"
              >
                sistemas
              </em>{" "}
              que levam pessoas até elas.
            </h2>

            <div className="mt-12 md:mt-16 flex items-center gap-4">
              <div
                ref={lineRef}
                className="h-px w-full max-w-md bg-gradient-to-r from-[#D3A96B] via-[#D3A96B]/50 to-transparent origin-left"
                aria-hidden="true"
              />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#9B9894]/70 whitespace-nowrap">
                WEB × PERFORMANCE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
