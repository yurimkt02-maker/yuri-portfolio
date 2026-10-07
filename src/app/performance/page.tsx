import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CustomCursor } from "@/components/CustomCursor";
import { LivingBackground } from "@/components/LivingBackground";
import { Header } from "@/components/Header";
import { PerformanceLab } from "@/components/PerformanceLab";
import { ContactCTA } from "@/components/ContactCTA";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Performance",
  description:
    "Conexão entre desenvolvimento web, tráfego pago e rastreamento de dados por Yuri Santos.",
};

export default function PerformancePage() {
  return (
    <div className="relative min-h-screen bg-[#070708] text-[#F4EFE8] overflow-x-hidden">
      <CustomCursor />
      <LivingBackground />
      <Header />

      <main className="relative z-10">
        {/* Performance Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-transparent border-b border-[#F4EFE8]/10 overflow-hidden">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase text-[#9B9894] hover:text-[#D3A96B] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para início</span>
              </Link>
            </div>

            <div className="max-w-4xl">
              <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#D3A96B] block mb-4">
                PERFORMANCE / SYSTEM
              </span>

              <h1 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.8rem,6.5vw,6.2rem)] leading-[0.94] tracking-[-0.025em]">
                Site, tráfego e dados{" "}
                <em className="italic text-[#E6C487] font-normal">
                  conectados.
                </em>
              </h1>

              <p className="mt-6 text-base md:text-lg text-[#9B9894] max-w-2xl leading-relaxed">
                Como experiência digital, mídia paga e mensuração trabalham em
                conjunto para transformar visitas em oportunidade.
              </p>
            </div>
          </div>
        </section>

        <PerformanceLab />
      </main>

      <ContactCTA />
    </div>
  );
}
