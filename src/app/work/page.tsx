import React from "react";
import type { Metadata } from "next";
import { CustomCursor } from "@/components/CustomCursor";
import { LivingBackground } from "@/components/LivingBackground";
import { Header } from "@/components/Header";
import { SelectedWork } from "@/components/SelectedWork";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Projetos Selecionados",
  description:
    "Uma seleção de sites e experiências digitais desenvolvidos por Yuri Santos para marcas, negócios e contextos reais.",
};

export default function WorkPage() {
  return (
    <div className="relative min-h-screen bg-[#070708] text-[#F4EFE8] overflow-x-hidden">
      <CustomCursor />
      <LivingBackground />
      <Header />
      <main className="relative z-10">
        <SelectedWork />
      </main>
      <ContactCTA />
    </div>
  );
}
