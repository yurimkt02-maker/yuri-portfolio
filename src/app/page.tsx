import React from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { AmbientSystem } from "@/components/AmbientSystem";
import { ScrollTelemetry } from "@/components/ScrollTelemetry";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatementSection } from "@/components/StatementSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { PerformanceTeaser } from "@/components/PerformanceTeaser";
import { ToolsStrip } from "@/components/ToolsStrip";
import { ProjectsDeckTeaser } from "@/components/ProjectsDeckTeaser";
import { ContactCTA } from "@/components/ContactCTA";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#070708] text-[#F4EFE8] overflow-x-hidden">
      <CustomCursor />
      <AmbientSystem />
      <ScrollTelemetry />
      <Header />
      <main className="relative z-10">
        <Hero />
        <StatementSection />
        <CapabilitiesSection />
        <PerformanceTeaser />
        <ToolsStrip />
        <ProjectsDeckTeaser />
      </main>
      <ContactCTA />
    </div>
  );
}
