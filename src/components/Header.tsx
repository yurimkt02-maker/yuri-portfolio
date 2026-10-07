"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { Home, Menu, X, ArrowUpRight } from "lucide-react";

const PILL_NAV_ITEMS = [
  { label: "Skills", href: "/#skills", key: "skills" },
  { label: "Projetos", href: "/work", key: "work" },
  { label: "Contato", href: "#contact", key: "contact" },
] as const;

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [activeKey, setActiveKey] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Subtle magnetic offset for the floating WhatsApp button on desktop
  const waBtnRef = useRef<HTMLAnchorElement | null>(null);
  const [waOffset, setWaOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 24);

      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          setActiveKey("contact");
          return;
        }
      }

      if (pathname.startsWith("/work")) {
        setActiveKey("work");
        return;
      }

      if (pathname.startsWith("/performance")) {
        setActiveKey("");
        return;
      }

      const skillsEl = document.getElementById("skills");
      const toolsEl = document.getElementById("ecosystem");
      if (skillsEl) {
        const skillsRect = skillsEl.getBoundingClientRect();
        const toolsRect = toolsEl?.getBoundingClientRect();
        const bottomEdge = toolsRect ? toolsRect.bottom : skillsRect.bottom;
        if (skillsRect.top <= window.innerHeight * 0.45 && bottomEdge >= 120) {
          setActiveKey("skills");
          return;
        }
      }

      if (isHome) {
        setActiveKey("home");
      } else {
        setActiveKey("");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMobileMenuOpen(false);

    if (href === "/" && isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href === "#contact" || href === "/#contact") {
      const el = document.getElementById("contact");
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    if (href.startsWith("/#") && isHome) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleWaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!waBtnRef.current || window.innerWidth < 768) return;
    const rect = waBtnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.16;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.16;
    setWaOffset({ x, y });
  };

  const handleWaMouseLeave = () => {
    setWaOffset({ x: 0, y: 0 });
  };

  const isHomeActive = isHome && activeKey === "home";

  return (
    <>
      <header className="fixed top-4 md:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none flex flex-col items-center">
        <div className="w-fit max-w-full mx-auto pointer-events-auto">
          {/* Symmetrical Floating Navigation Capsule — Custom-Fitted to Items Only */}
          <div
            className={`relative inline-flex items-center justify-center p-1.5 rounded-full transition-all duration-300 border ${
              isScrolled
                ? "bg-[#0B0B0E]/92 backdrop-blur-md border-[#F4EFE8]/15 shadow-[0_14px_44px_rgba(0,0,0,0.75)]"
                : "bg-[#0D0D11]/88 backdrop-blur-md border-[#F4EFE8]/12 shadow-[0_10px_32px_rgba(0,0,0,0.55)]"
            }`}
          >
            {/* Subtle top specular line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#D3A96B]/35 to-transparent"
            />

            {/* Desktop Navigation: [Home Icon] + Skills + Projetos + Contato */}
            <nav
              aria-label="Navegação principal"
              className="hidden md:flex items-center gap-1"
            >
              {/* Home Icon Button */}
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
                aria-label="Voltar para o início"
                className={`group relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D3A96B] ${
                  isHomeActive
                    ? "bg-[#F4EFE8]/14 border border-[#D3A96B]/45 text-[#E6C487] shadow-[0_0_12px_rgba(211,169,107,0.2)]"
                    : "bg-[#1A1A20]/70 border border-[#F4EFE8]/10 text-[#F4EFE8]/85 hover:border-[#D3A96B]/45 hover:bg-[#F4EFE8]/10 hover:text-[#E6C487]"
                }`}
              >
                <Home className="w-3.5 h-3.5 transition-colors duration-300" />
              </Link>

              {PILL_NAV_ITEMS.map((item) => {
                const active = activeKey === item.key;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-3 py-1 rounded-full text-xs font-medium tracking-[0.04em] transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D3A96B] ${
                      active
                        ? "bg-[#F4EFE8]/10 text-[#F4EFE8] shadow-[inset_0_1px_0_rgba(244,239,232,0.12)]"
                        : "text-[#9B9894] hover:text-[#F4EFE8]"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {active && (
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-[#D3A96B]"
                        />
                      )}
                      <span>{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Compact Capsule Controls: [Home Icon] + Menu Trigger */}
            <div className="flex md:hidden items-center gap-1.5">
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
                aria-label="Voltar para o início"
                className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                  isHomeActive
                    ? "bg-[#F4EFE8]/14 border-[#D3A96B]/50 text-[#E6C487] shadow-[0_0_12px_rgba(211,169,107,0.18)]"
                    : "bg-[#141418] border-[#F4EFE8]/15 text-[#F4EFE8] hover:border-[#D3A96B]"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-label={
                  mobileMenuOpen
                    ? "Fechar menu de navegação"
                    : "Abrir menu de navegação"
                }
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#141418] border border-[#F4EFE8]/15 text-[#F4EFE8] hover:border-[#D3A96B] transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-3.5 h-3.5 text-[#D3A96B]" />
                ) : (
                  <Menu className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Floating Capsule Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 w-[230px] mx-auto rounded-2xl bg-[#0B0B0E]/95 backdrop-blur-xl border border-[#F4EFE8]/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-2.5">
              <nav
                aria-label="Navegação mobile"
                className="flex flex-col gap-1"
              >
                <Link
                  href="/"
                  onClick={(e) => handleNavClick(e, "/")}
                  aria-label="Voltar para o início"
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    isHomeActive
                      ? "bg-[#141418] text-[#E6C487] border border-[#D3A96B]/30"
                      : "text-[#F4EFE8] hover:bg-[#141418]/60"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-[#D3A96B]" />
                    <span className="sr-only">Voltar para o início</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#9B9894]" />
                </Link>

                {PILL_NAV_ITEMS.map((item) => {
                  const active = activeKey === item.key;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                        active
                          ? "bg-[#141418] text-[#E6C487] border border-[#D3A96B]/30"
                          : "text-[#F4EFE8] hover:bg-[#141418]/60"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            active ? "bg-[#D3A96B]" : "bg-[#9B9894]/40"
                          }`}
                        />
                        <span>{item.label}</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#9B9894]" />
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Persistent Floating WhatsApp Button */}
      <a
        ref={waBtnRef}
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com Yuri pelo WhatsApp"
        data-cursor="START"
        onMouseMove={handleWaMouseMove}
        onMouseLeave={handleWaMouseLeave}
        style={{
          transform: `translate3d(${waOffset.x}px, ${waOffset.y}px, 0)`,
        }}
        className="group fixed z-50 right-5 bottom-5 md:right-7 md:bottom-7 flex items-center justify-center h-12 md:h-[52px] rounded-full bg-[#0B0B0E]/92 backdrop-blur-md border border-[#F4EFE8]/15 hover:border-[#25D366]/55 px-3.5 md:px-4 shadow-[0_14px_38px_rgba(0,0,0,0.82)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.9),0_0_22px_rgba(37,211,102,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D3A96B] will-change-transform"
      >
        {/* Official WhatsApp Vector Icon with Subtle Status Dot */}
        <span className="relative flex items-center justify-center w-5 h-5 md:w-[22px] md:h-[22px] flex-shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="w-full h-full text-[#25D366] transition-transform duration-300 group-hover:scale-105"
          >
            <path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.007c0 1.766.461 3.49 1.337 5.01L2 22l5.122-1.343a9.967 9.967 0 0 0 4.909 1.298h.004c5.522 0 10.006-4.485 10.006-10.007C22.041 6.485 17.553 2 12.031 2Zm5.824 14.129c-.246.693-1.432 1.326-1.995 1.411-.513.077-1.163.11-1.878-.117-.434-.138-.991-.322-1.704-.63-2.999-1.295-4.957-4.316-5.107-4.516-.15-.2-1.22-1.624-1.22-3.097 0-1.474.772-2.198 1.046-2.498.274-.3.598-.375.798-.375.199 0 .399.002.573.01.184.009.43-.07.673.514.249.599.847 2.072.922 2.222.075.15.125.325.025.524-.1.2-.15.325-.299.499-.15.175-.314.391-.449.525-.15.15-.305.312-.131.612.174.3.774 1.277 1.662 2.069 1.142 1.018 2.104 1.334 2.403 1.484.3.15.474.125.649-.075.174-.2.748-.873.947-1.173.2-.3.399-.25.673-.15.274.1 1.745.823 2.044.973.3.15.499.225.573.35.075.125.075.724-.171 1.418Z" />
          </svg>
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#D3A96B]"
          />
        </span>

        {/* Desktop Subtle Hover Label Expansion */}
        <span className="hidden md:inline-block max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:ml-2.5 transition-all duration-300 ease-out text-xs font-medium tracking-[0.04em] text-[#F4EFE8]">
          Vamos conversar
        </span>
      </a>
    </>
  );
};
