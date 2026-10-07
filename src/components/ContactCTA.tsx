"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ProprietaryCore } from "./ProprietaryCore";
import {
  ArrowUpRight,
  Check,
  Copy,
  FolderGit2,
  Activity,
  Mail,
  MessageCircle,
} from "lucide-react";

export const ContactCTA: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  const currentYear = new Date().getFullYear();
  const hasInstagram = Boolean(siteConfig.socialLinks.instagram?.trim());
  const hasGithub = Boolean(siteConfig.socialLinks.github?.trim());

  return (
    <footer
      id="contact"
      className="relative z-20 w-full max-w-full bg-transparent text-[#F4EFE8] overflow-x-hidden"
    >
      {/* Subtle Top Divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#D3A96B]/25"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-[max(5rem,calc(env(safe-area-inset-bottom)+4rem))] sm:pt-24 md:pt-36 md:pb-24">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 pb-9 sm:pb-12 md:pb-14 border-b border-[#D3A96B]/20">
          <div className="max-w-xl min-w-0">
            <span className="block text-[11px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#D3A96B] mb-2.5 sm:mb-4">
              VII.
            </span>
            <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.55rem,11vw,3.4rem)] md:text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.94] md:leading-[0.92] tracking-[-0.025em]">
              Contato
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#9B9894] leading-relaxed">
              Tem um projeto em mente? Vamos construir algo com clareza e
              performance.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-end opacity-85">
            <ProprietaryCore
              variant="footer-seal"
              className="scale-95 origin-bottom-right"
            />
          </div>
        </div>

        {/* 4 Low-Profile Contact Blocks (2 cols Desktop, 1 col 100% width Mobile) */}
        <div className="mt-8 sm:mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 w-full">
          {/* Block 01: WHATSAPP (Primary Direct Channel) */}
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="START"
            className="group w-full min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-4 p-4 sm:px-6 sm:py-5 bg-[#121216]/95 border border-[#D3A96B]/35 hover:border-[#D3A96B] hover:bg-[#17171C] transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#D3A96B] text-[#070708] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <MessageCircle className="w-4 h-4" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-mono tracking-[0.22em] uppercase text-[#D3A96B]">
                  WHATSAPP
                </span>
                <span className="block text-base sm:text-lg font-semibold text-[#F4EFE8] group-hover:text-[#E6C487] transition-colors leading-tight mt-0.5">
                  {siteConfig.whatsappDisplay}
                </span>
              </div>
            </div>

            <span className="w-full sm:w-auto pt-2.5 sm:pt-0 border-t border-[#D3A96B]/15 sm:border-t-0 flex-shrink-0 inline-flex items-center justify-between sm:justify-end gap-1.5 text-[11px] sm:text-xs font-mono tracking-[0.14em] uppercase text-[#E6C487] group-hover:text-[#F4EFE8] transition-colors">
              <span>Iniciar conversa</span>
              <ArrowUpRight className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>

          {/* Block 02: EMAIL */}
          <div className="group relative w-full min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-4 p-4 sm:px-6 sm:py-5 bg-[#0B0B0E]/85 backdrop-blur-sm border border-[#D3A96B]/20 hover:border-[#D3A96B]/65 transition-all duration-300">
            <a
              href={`mailto:${siteConfig.email}`}
              data-cursor="COPY"
              className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#141418] border border-[#D3A96B]/25 flex items-center justify-center text-[#D3A96B] group-hover:bg-[#D3A96B] group-hover:text-[#070708] transition-colors duration-300">
                <Mail className="w-4 h-4" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-mono tracking-[0.22em] uppercase text-[#9B9894]">
                  EMAIL
                </span>
                <span className="block text-[13px] sm:text-sm lg:text-base font-medium text-[#F4EFE8] group-hover:text-[#E6C487] leading-snug break-all [overflow-wrap:anywhere] transition-colors mt-0.5">
                  {siteConfig.email}
                </span>
              </div>
            </a>

            <div className="w-full sm:w-auto pt-2.5 sm:pt-0 border-t border-[#F4EFE8]/10 sm:border-t-0 flex items-center justify-end flex-shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copiar e-mail"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-[#F4EFE8]/12 hover:border-[#D3A96B] text-[10px] font-mono tracking-[0.16em] uppercase text-[#D3A96B] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 flex-shrink-0" />
                    <span>COPIADO</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 flex-shrink-0" />
                    <span>COPIAR</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Block 03: PROJETOS */}
          <Link
            href="/work"
            data-cursor="VIEW"
            className="group w-full min-w-0 flex items-center justify-between gap-3.5 sm:gap-4 p-4 sm:px-6 sm:py-5 bg-[#0B0B0E]/85 backdrop-blur-sm border border-[#D3A96B]/20 hover:border-[#D3A96B]/65 transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#141418] border border-[#D3A96B]/25 flex items-center justify-center text-[#D3A96B] group-hover:bg-[#D3A96B] group-hover:text-[#070708] transition-colors duration-300">
                <FolderGit2 className="w-4 h-4" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-mono tracking-[0.22em] uppercase text-[#9B9894]">
                  PROJETOS
                </span>
                <span className="block text-[15px] sm:text-lg font-medium text-[#F4EFE8] group-hover:text-[#E6C487] transition-colors leading-tight mt-0.5">
                  Ver projetos
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-[#D3A96B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Block 04: PERFORMANCE */}
          <Link
            href="/performance"
            data-cursor="EXPLORE"
            className="group w-full min-w-0 flex items-center justify-between gap-3.5 sm:gap-4 p-4 sm:px-6 sm:py-5 bg-[#0B0B0E]/85 backdrop-blur-sm border border-[#D3A96B]/20 hover:border-[#D3A96B]/65 transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#141418] border border-[#D3A96B]/25 flex items-center justify-center text-[#D3A96B] group-hover:bg-[#D3A96B] group-hover:text-[#070708] transition-colors duration-300">
                <Activity className="w-4 h-4" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-mono tracking-[0.22em] uppercase text-[#9B9894]">
                  PERFORMANCE
                </span>
                <span className="block text-[15px] sm:text-lg font-medium text-[#F4EFE8] group-hover:text-[#E6C487] transition-colors leading-tight mt-0.5">
                  Explorar performance
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-[#D3A96B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Optional Social Blocks — Automatically rendered only when configured */}
          {hasInstagram && (
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full min-w-0 flex items-center justify-between gap-4 p-4 sm:px-6 sm:py-5 bg-[#0B0B0E]/85 border border-[#D3A96B]/20 hover:border-[#D3A96B]/65 transition-all duration-300"
            >
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-mono tracking-[0.22em] uppercase text-[#9B9894]">
                  INSTAGRAM
                </span>
                <span className="block text-base font-medium text-[#F4EFE8]">
                  Instagram
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-[#D3A96B]" />
            </a>
          )}

          {hasGithub && (
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full min-w-0 flex items-center justify-between gap-4 p-4 sm:px-6 sm:py-5 bg-[#0B0B0E]/85 border border-[#D3A96B]/20 hover:border-[#D3A96B]/65 transition-all duration-300"
            >
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-mono tracking-[0.22em] uppercase text-[#9B9894]">
                  GITHUB
                </span>
                <span className="block text-base font-medium text-[#F4EFE8]">
                  GitHub
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-[#D3A96B]" />
            </a>
          )}
        </div>

        {/* Bottom Copyright Line */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#F4EFE8]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-4 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D3A96B] flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#F4EFE8]">
              {siteConfig.name}
            </span>
            <span className="text-[#F4EFE8]/20">•</span>
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.12em] sm:tracking-[0.14em] uppercase text-[#9B9894]">
              {siteConfig.role}
            </span>
          </div>

          <p className="text-[11px] sm:text-xs font-mono tracking-[0.06em] sm:tracking-[0.08em] text-[#9B9894] leading-relaxed break-words">
            © {currentYear} Yuri Santos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
