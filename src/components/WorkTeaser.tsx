"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { publishedProjects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

export const WorkTeaser: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const maskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metaRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item, idx) => {
        const mask = maskRefs.current[idx];
        const img = imgRefs.current[idx];
        const meta = metaRefs.current[idx];

        if (!item || !mask) return;

        // Editorial Clip-Path Reveal
        gsap.fromTo(
          mask,
          {
            clipPath: "inset(8% 6% 8% 6%)",
            opacity: 0.4,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 25%",
              scrub: 0.45,
            },
          }
        );

        // Inner Image Parallax & Scale
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Moving Editorial Text alongside Image
        if (meta) {
          gsap.fromTo(
            meta,
            { y: 32, opacity: 0.3 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 35%",
                scrub: 0.4,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Selected Work"
      className="relative py-24 md:py-36 bg-[#070708] border-b border-[#F4EFE8]/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Minimal Editorial Header */}
        <div className="flex items-end justify-between gap-6 pb-12 md:pb-20 border-b border-[#F4EFE8]/10">
          <div>
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B] block mb-3">
              02 // SELECTED WORK
            </span>
            <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.94] tracking-[-0.02em]">
              Selected <em className="italic text-[#E6C487] font-normal">Work</em>
            </h2>
          </div>

          <span className="hidden sm:inline-block text-xs font-mono tracking-[0.2em] uppercase text-[#9B9894]">
            01 — 0{publishedProjects.length}
          </span>
        </div>

        {/* 3 Real Projects — Giant Image Protagonist */}
        <div className="divide-y divide-[#F4EFE8]/10">
          {publishedProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <article
                key={project.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className="py-16 md:py-28"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                  {/* Giant Image Viewport (8 or 9 cols) */}
                  <div
                    className={`lg:col-span-8 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Link
                      href={`/work/${project.id}`}
                      data-cursor="VIEW"
                      className="group block"
                    >
                      <div
                        ref={(el) => {
                          maskRefs.current[idx] = el;
                        }}
                        className="relative aspect-[16/10] w-full overflow-hidden bg-[#141414] border border-[#F4EFE8]/12 group-hover:border-[#D3A96B]/50 transition-colors duration-500 will-change-[clip-path]"
                      >
                        {project.desktopScreenshot && (
                          <div
                            ref={(el) => {
                              imgRefs.current[idx] = el;
                            }}
                            className="relative w-full h-full will-change-transform"
                          >
                            <Image
                              src={project.desktopScreenshot}
                              alt={project.name}
                              fill
                              sizes="(max-width: 1024px) 100vw, 70vw"
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                              priority={idx === 0}
                            />
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>

                  {/* Minimal Editorial Meta (4 cols) */}
                  <div
                    ref={(el) => {
                      metaRefs.current[idx] = el;
                    }}
                    className={`lg:col-span-4 flex flex-col justify-between will-change-transform ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-mono tracking-[0.22em] uppercase text-[#D3A96B] block mb-3">
                        {project.index} / WEB
                      </span>

                      <h3 className="font-sans font-bold text-[#F4EFE8] text-[clamp(1.85rem,3.2vw,3rem)] leading-[1.02] tracking-[-0.03em]">
                        <Link
                          href={`/work/${project.id}`}
                          data-cursor="VIEW"
                          className="hover:text-[#E6C487] transition-colors"
                        >
                          {project.name}
                        </Link>
                      </h3>

                      <p className="mt-3 text-xs font-mono tracking-[0.14em] uppercase text-[#9B9894]">
                        {project.segment}
                      </p>

                      {/* Few Clean Tags */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[10px] font-mono tracking-[0.18em] uppercase border border-[#F4EFE8]/12 text-[#F4EFE8]/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-[#F4EFE8]/10">
                      <Link
                        href={`/work/${project.id}`}
                        data-cursor="VIEW"
                        className="group inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.22em] uppercase text-[#F4EFE8] hover:text-[#D3A96B] transition-colors"
                      >
                        <span>VIEW PROJECT</span>
                        <ArrowUpRight className="w-4 h-4 text-[#D3A96B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom VIEW ALL WORK -> /work */}
        <div className="pt-12 border-t border-[#F4EFE8]/10 flex justify-center sm:justify-end">
          <Link
            href="/work"
            data-cursor="VIEW"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#D3A96B]/50 hover:border-[#D3A96B] bg-[#141414]/60 hover:bg-[#D3A96B] text-[#F4EFE8] hover:text-[#070708] transition-all duration-300 text-xs font-mono font-semibold tracking-[0.22em] uppercase"
          >
            <span>VIEW ALL WORK</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
