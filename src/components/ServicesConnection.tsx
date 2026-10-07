"use client";

import React, { useState } from "react";

interface CapabilityItem {
  id: string;
  label: string;
  spec: string;
  pairedWith: string;
  connectionReason: string;
}

const WEB_DEV_CAPABILITIES: CapabilityItem[] = [
  {
    id: "sites-institucionais",
    label: "Sites Institucionais",
    spec: "Apresentação profissional da marca, serviços e diferenciais com estrutura clara.",
    pairedWith: "Campaign Strategy",
    connectionReason:
      "Gera confiança imediata para quem descobre a empresa por anúncios ou pesquisa.",
  },
  {
    id: "landing-pages",
    label: "Landing Pages",
    spec: "Páginas focadas em um único objetivo: transformar visitantes de campanhas em contatos.",
    pairedWith: "Meta Ads & Google Ads",
    connectionReason:
      "Dá continuidade direta à promessa do anúncio sem distrações no caminho.",
  },
  {
    id: "ui-ux",
    label: "UI/UX & Experiência",
    spec: "Design autoral e leitura intuitiva para que o visitante entenda rapidamente o valor do serviço.",
    pairedWith: "Creative Testing",
    connectionReason:
      "Alinha a identidade visual dos anúncios com a experiência encontrada na página.",
  },
  {
    id: "responsividade",
    label: "Responsividade",
    spec: "Navegação fluida e botões bem posicionados no celular, onde acontece a maioria dos acessos.",
    pairedWith: "Meta Ads",
    connectionReason:
      "Grande parte dos cliques vindos de redes sociais acontece pelo smartphone.",
  },
  {
    id: "motion",
    label: "Motion & Interação",
    spec: "Movimento controlado que guia a leitura e destaca o que é mais importante.",
    pairedWith: "Remarketing",
    connectionReason:
      "Aumenta o tempo de atenção na página e identifica visitantes mais engajados.",
  },
  {
    id: "performance",
    label: "Performance & Velocidade",
    spec: "Carregamento rápido para não perder visitantes antes mesmo da página abrir.",
    pairedWith: "Optimization",
    connectionReason:
      "Aproveita melhor cada clique pago, evitando desperdício de verba com páginas lentas.",
  },
  {
    id: "integracoes",
    label: "Integrações",
    spec: "Conexão direta com WhatsApp, formulários, CRM e ferramentas comerciais.",
    pairedWith: "Conversion Analysis",
    connectionReason:
      "Garante que o contato gerado chegue rápido ao atendimento com a origem identificada.",
  },
  {
    id: "seo-tecnico",
    label: "SEO Técnico & Estrutura",
    spec: "Código limpo e bem estruturado para mecanismos de busca e melhor índice de qualidade.",
    pairedWith: "Google Ads",
    connectionReason:
      "Páginas relevantes e bem construídas ajudam a reduzir o custo por clique no Google.",
  },
  {
    id: "tracking-web",
    label: "Tracking",
    spec: "Configuração técnica na página para registrar cliques, envios e interações importantes.",
    pairedWith: "Tracking (Paid Media)",
    connectionReason:
      "É o elo central que conecta o comportamento dentro do site às plataformas de anúncio.",
  },
];

const PAID_MEDIA_CAPABILITIES: CapabilityItem[] = [
  {
    id: "meta-ads",
    label: "Meta Ads",
    spec: "Campanhas no Instagram e Facebook para gerar atenção, interesse e novas oportunidades.",
    pairedWith: "Landing Pages & Responsividade",
    connectionReason:
      "Leva um público segmentado direto para páginas preparadas para converter no celular.",
  },
  {
    id: "google-ads",
    label: "Google Ads",
    spec: "Anúncios na rede de pesquisa para aparecer exatamente quando alguém procura pelo seu serviço.",
    pairedWith: "SEO Técnico & Landing Pages",
    connectionReason:
      "Conecta a busca ativa do cliente a uma página que responde exatamente ao que ele procura.",
  },
  {
    id: "campaign-strategy",
    label: "Campaign Strategy",
    spec: "Planejamento de canais, verba e mensagens de acordo com o momento do negócio.",
    pairedWith: "Sites Institucionais",
    connectionReason:
      "Direciona cada público para o ambiente digital mais adequado para fechar negócio.",
  },
  {
    id: "remarketing",
    label: "Remarketing",
    spec: "Novos pontos de contato para quem já visitou o site mas ainda não tomou decisão.",
    pairedWith: "Motion & UI/UX",
    connectionReason:
      "Usa as interações feitas no site para reaparecer com a mensagem certa.",
  },
  {
    id: "creative-testing",
    label: "Creative Testing",
    spec: "Testes de diferentes chamadas, vídeos e imagens para descobrir o que atrai mais clientes.",
    pairedWith: "UI/UX & Experiência",
    connectionReason:
      "O que funciona melhor nos anúncios ajuda a aprimorar também a comunicação do site.",
  },
  {
    id: "tracking-media",
    label: "Tracking",
    spec: "Pixel da Meta, tags do Google e eventos de conversão alimentando as campanhas.",
    pairedWith: "Tracking (Web Development)",
    connectionReason:
      "Mostra às plataformas quais anúncios estão gerando resultados reais.",
  },
  {
    id: "conversion-analysis",
    label: "Conversion Analysis",
    spec: "Leitura clara do caminho entre anúncio, visita na página e pedido de orçamento.",
    pairedWith: "Integrações",
    connectionReason:
      "Permite enxergar quais campanhas trazem contatos realmente qualificados.",
  },
  {
    id: "optimization",
    label: "Optimization",
    spec: "Ajustes constantes de público, orçamento e anúncios para melhorar o retorno.",
    pairedWith: "Performance & Velocidade",
    connectionReason:
      "Une campanhas ajustadas e páginas rápidas para reduzir o custo por oportunidade.",
  },
];

export const ServicesConnection: React.FC = () => {
  const [selectedSide, setSelectedSide] = useState<"web" | "media">("web");
  const [selectedIdx, setSelectedIdx] = useState<number>(8); // Default: Tracking

  const activeItem =
    selectedSide === "web"
      ? WEB_DEV_CAPABILITIES[selectedIdx] || WEB_DEV_CAPABILITIES[0]
      : PAID_MEDIA_CAPABILITIES[selectedIdx] || PAID_MEDIA_CAPABILITIES[0];

  return (
    <section
      aria-label="Conexão entre Desenvolvimento Web e Tráfego Pago"
      className="relative py-20 md:py-28 bg-[#070708] border-b border-[#F4EFE8]/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* 3-Layer Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 md:pb-16 border-b border-[#F4EFE8]/10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#D3A96B] block mb-3">
              INTEGRATED DISCIPLINES // 02
            </span>
            <h2 className="font-serif font-normal text-[#F4EFE8] text-[clamp(2.3rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.02em]">
              O site recebe. O tráfego leva.{" "}
              <em className="italic text-[#E6C487] font-normal">
                Os dados mostram o que melhorar.
              </em>
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#9B9894] max-w-md leading-relaxed">
            Desenvolvimento web e gestão de tráfego pago funcionando juntos: a
            página sustenta a conversão enquanto as campanhas trazem as pessoas
            certas.
          </p>
        </div>

        {/* Connected Pillars Matrix */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Pillar 01: WEB DEVELOPMENT */}
          <div className="lg:col-span-5 border border-[#F4EFE8]/12 bg-[#141414]/45 flex flex-col justify-between">
            <div className="p-6 sm:p-7 border-b border-[#F4EFE8]/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#D3A96B]">
                  WEB DEVELOPMENT
                </span>
                <span className="text-[10px] font-mono text-[#9B9894]">
                  ESTRUTURA & EXPERIÊNCIA
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EFE8] leading-snug">
                Sites construídos para apresentar, funcionar e converter.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#9B9894] leading-relaxed">
                Experiência, responsividade, performance, tracking, integração e
                estrutura pensadas para gerar confiança e ação.
              </p>
            </div>

            <div className="divide-y divide-[#F4EFE8]/10">
              {WEB_DEV_CAPABILITIES.map((item, idx) => {
                const isSelected =
                  selectedSide === "web" && selectedIdx === idx;
                const isSharedTracking = item.label === "Tracking";
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedSide("web");
                      setSelectedIdx(idx);
                    }}
                    onMouseEnter={() => {
                      setSelectedSide("web");
                      setSelectedIdx(idx);
                    }}
                    className={`w-full px-6 sm:px-7 py-3.5 flex items-center justify-between text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-[#D3A96B] text-[#070708] font-semibold"
                        : "hover:bg-[#F4EFE8]/[0.04] text-[#F4EFE8]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? "text-[#070708]/80" : "text-[#D3A96B]"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-sm tracking-[0.02em]">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSharedTracking && (
                        <span
                          className={`px-2 py-0.5 text-[9px] font-mono tracking-[0.18em] uppercase border ${
                            isSelected
                              ? "border-[#070708]/40 text-[#070708]"
                              : "border-[#D3A96B]/40 text-[#E6C487]"
                          }`}
                        >
                          ELO CENTRAL
                        </span>
                      )}
                      <span
                        className={`text-xs font-mono ${
                          isSelected ? "text-[#070708]" : "text-[#9B9894]"
                        }`}
                      >
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Synaptic Bridge */}
          <div className="lg:col-span-2 flex flex-col justify-center items-center relative py-4 lg:py-0">
            <div
              className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[#D3A96B]/50 to-transparent"
              aria-hidden="true"
            />

            <div className="relative z-10 w-full p-5 border border-[#D3A96B]/60 bg-[#070708] text-center shadow-[0_0_30px_rgba(211,169,107,0.12)]">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D3A96B] block mb-2">
                CONEXÃO ATIVA
              </span>
              <div className="text-xs font-semibold text-[#F4EFE8]">
                {activeItem.label}
              </div>
              <div className="my-2 text-[#D3A96B] font-mono text-xs">⇅</div>
              <div className="text-xs text-[#E6C487]">
                {activeItem.pairedWith}
              </div>
            </div>
          </div>

          {/* Pillar 02: PAID MEDIA */}
          <div className="lg:col-span-5 border border-[#F4EFE8]/12 bg-[#141414]/45 flex flex-col justify-between">
            <div className="p-6 sm:p-7 border-b border-[#F4EFE8]/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#E6C487]">
                  PAID MEDIA
                </span>
                <span className="text-[10px] font-mono text-[#9B9894]">
                  AQUISIÇÃO & OTIMIZAÇÃO
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EFE8] leading-snug">
                Campanhas construídas para levar as pessoas certas até a
                experiência certa.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#9B9894] leading-relaxed">
                Meta Ads, Google Ads, tracking e otimização conectados ao
                objetivo real do negócio.
              </p>
            </div>

            <div className="divide-y divide-[#F4EFE8]/10 my-auto">
              {PAID_MEDIA_CAPABILITIES.map((item, idx) => {
                const isSelected =
                  selectedSide === "media" && selectedIdx === idx;
                const isSharedTracking = item.label === "Tracking";
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedSide("media");
                      setSelectedIdx(idx);
                    }}
                    onMouseEnter={() => {
                      setSelectedSide("media");
                      setSelectedIdx(idx);
                    }}
                    className={`w-full px-6 sm:px-7 py-4 flex items-center justify-between text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-[#D3A96B] text-[#070708] font-semibold"
                        : "hover:bg-[#F4EFE8]/[0.04] text-[#F4EFE8]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono ${
                          isSelected ? "text-[#070708]" : "text-[#9B9894]"
                        }`}
                      >
                        ←
                      </span>
                      <span className="text-sm tracking-[0.02em]">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSharedTracking && (
                        <span
                          className={`px-2 py-0.5 text-[9px] font-mono tracking-[0.18em] uppercase border ${
                            isSelected
                              ? "border-[#070708]/40 text-[#070708]"
                              : "border-[#D3A96B]/40 text-[#E6C487]"
                          }`}
                        >
                          ELO CENTRAL
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? "text-[#070708]/80" : "text-[#D3A96B]"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Live Connection Readout Bar */}
        <div className="mt-8 p-6 sm:p-7 border border-[#F4EFE8]/12 bg-[#141414]/80 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D3A96B] block mb-1">
              O QUE É ({activeItem.label})
            </span>
            <p className="text-sm md:text-base text-[#F4EFE8] leading-relaxed">
              {activeItem.spec}
            </p>
          </div>

          <div className="lg:col-span-7 lg:border-l border-[#F4EFE8]/10 lg:pl-8">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#E6C487] block mb-1">
              COMO SE CONECTA ({activeItem.label} ↔ {activeItem.pairedWith})
            </span>
            <p className="text-sm md:text-base text-[#9B9894] leading-relaxed">
              {activeItem.connectionReason}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
