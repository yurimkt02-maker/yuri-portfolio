import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedProjects } from "@/data/projects";
import { CustomCursor } from "@/components/CustomCursor";
import { LivingBackground } from "@/components/LivingBackground";
import { Header } from "@/components/Header";
import { ContactCTA } from "@/components/ContactCTA";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface WorkDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publishedProjects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: WorkDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = publishedProjects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Projeto não encontrado",
    };
  }

  return {
    title: project.name,
    description: project.shortSummary,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailProps) {
  const { slug } = await params;
  const projectIndex = publishedProjects.findIndex((p) => p.id === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = publishedProjects[projectIndex];
  const nextProject =
    publishedProjects[(projectIndex + 1) % publishedProjects.length];

  return (
    <div className="relative min-h-screen bg-[#070708] text-[#F4EFE8] overflow-x-hidden">
      <CustomCursor />
      <LivingBackground />
      <Header />

      <main className="relative z-10 pt-28 pb-24 md:pt-36 md:pb-32 border-b border-[#F4EFE8]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase text-[#9B9894] hover:text-[#D3A96B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para projetos</span>
            </Link>
          </div>

          {/* Project Header */}
          <div className="pb-10 md:pb-14 border-b border-[#F4EFE8]/10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono tracking-[0.22em] uppercase text-[#D3A96B] font-semibold">
                PROJECT {project.index}
              </span>
              <span className="w-6 h-px bg-[#F4EFE8]/20" />
              <span className="text-xs text-[#9B9894]">{project.segment}</span>
            </div>

            <h1 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.5rem,5.8vw,5.4rem)] leading-[0.96] tracking-[-0.02em]">
              {project.name}
            </h1>

            <p className="mt-5 text-base md:text-lg text-[#F4EFE8]/85 max-w-3xl leading-relaxed">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-[10px] font-mono tracking-[0.18em] uppercase border border-[#F4EFE8]/12 bg-[#141414] text-[#F4EFE8]/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Main Project Screenshot */}
          {project.desktopScreenshot && (
            <div className="my-10 sm:my-12 md:my-16 w-full border border-[#F4EFE8]/15 bg-[#141414] overflow-hidden">
              <div className="h-9 px-3 sm:px-4 bg-[#070708] border-b border-[#F4EFE8]/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#D3A96B] flex-shrink-0" />
                  <span className="w-2 h-2 rounded-full bg-[#F4EFE8]/20 flex-shrink-0" />
                  <span className="ml-1 sm:ml-2 text-[9px] sm:text-[10px] font-mono tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#9B9894] truncate">
                    {project.aspectNote}
                  </span>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.18em] uppercase text-[#D3A96B] hover:text-[#E6C487]"
                  >
                    <span>Visitar site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0B0D]">
                <Image
                  src={project.desktopScreenshot}
                  alt={`Screenshot do projeto ${project.name}`}
                  fill
                  unoptimized
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          )}

          {/* Challenge & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="p-7 sm:p-8 border border-[#F4EFE8]/10 bg-[#141414]/45">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D3A96B] block mb-2">
                01 // CONTEXTO & DESAFIO
              </span>
              <h2 className="text-xl font-bold text-[#F4EFE8] mb-3">
                O que precisava ser resolvido
              </h2>
              <p className="text-sm md:text-base text-[#9B9894] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-7 sm:p-8 border border-[#F4EFE8]/10 bg-[#141414]/45">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#E6C487] block mb-2">
                02 // SOLUÇÃO & ESTRUTURA
              </span>
              <h2 className="text-xl font-bold text-[#F4EFE8] mb-3">
                Como o projeto foi construído
              </h2>
              <p className="text-sm md:text-base text-[#F4EFE8]/85 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Next Project Navigation */}
          {nextProject && (
            <div className="mt-16 pt-10 border-t border-[#F4EFE8]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#9B9894] block">
                  PRÓXIMO PROJETO
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#F4EFE8] mt-1 block">
                  {nextProject.name}
                </span>
              </div>

              <Link
                href={`/work/${nextProject.id}`}
                data-cursor="VIEW"
                className="group inline-flex items-center gap-3 px-6 py-3.5 border border-[#D3A96B]/50 hover:border-[#D3A96B] bg-[#141414] text-xs font-mono tracking-[0.2em] uppercase text-[#F4EFE8] transition-colors self-start sm:self-auto"
              >
                <span>Ver próximo projeto</span>
                <ArrowUpRight className="w-4 h-4 text-[#D3A96B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          )}
        </div>
      </main>

      <ContactCTA />
    </div>
  );
}
