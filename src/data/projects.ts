export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  segment: string;
  category: string;
  shortSummary: string;
  desktopScreenshot?: string;
  mobileScreenshot?: string;
  video?: string;
  url?: string;
  stack: string[];
  description: string;
  challenge: string;
  solution: string;
  isPlaceholder?: boolean;
  aspectNote?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "meira-odontologia",
    index: "01",
    name: "Meira Odontologia Especializada",
    segment: "Saúde & Odontologia Especializada",
    category: "WEB DEVELOPMENT • UI/UX • CONVERSÃO",
    shortSummary:
      "Site institucional desenvolvido para transmitir confiança clínica, apresentar especialidades com clareza e facilitar o agendamento de avaliações.",
    desktopScreenshot: "/cases/case-meiraodontologia.webp",
    mobileScreenshot: undefined,
    video: undefined,
    url: undefined,
    stack: ["NEXT.JS", "UI/UX", "RESPONSIVE", "MOTION", "TRACKING"],
    description:
      "Site institucional desenvolvido para clínica de odontologia especializada em Serra/ES, unindo apresentação acolhedora, leitura rápida no celular e caminho direto para agendamento.",
    challenge:
      "Apresentar o cuidado e a precisão técnica da clínica sem parecer um template médico frio, facilitando o contato rápido de pacientes vindos de campanhas.",
    solution:
      "Estrutura clara por especialidades, tipografia editorial de fácil leitura, botões de agendamento estratégicos e rastreamento de cliques preparado para campanhas.",
    isPlaceholder: false,
    aspectNote: "VIEWPORT 16:10 // SERRA, ES",
  },
  {
    id: "r-corretora",
    index: "02",
    name: "R Corretora de Consórcio",
    segment: "Consultoria Financeira & Consórcios",
    category: "WEB DEVELOPMENT • LANDING PAGE • TRACKING",
    shortSummary:
      "Site institucional desenvolvido para fortalecer presença digital, explicar modalidades de consórcio e qualificar o contato comercial.",
    desktopScreenshot: "/cases/case-rcorretora.webp",
    mobileScreenshot: undefined,
    video: undefined,
    url: undefined,
    stack: ["NEXT.JS", "RESPONSIVE", "SEO TÉCNICO", "GA4", "GTM"],
    description:
      "Presença digital para corretora especializada em consórcios de automóvel, imóvel, negócios e máquinas, estruturada para orientar o cliente antes do atendimento consultivo.",
    challenge:
      "Explicar diferentes categorias de consórcio com clareza e credibilidade, conduzindo o visitante até a conversa com um consultor.",
    solution:
      "Interface sóbria em preto e dourado, organização por objetivos financeiros, navegação mobile fluida e mensuração de eventos de contato.",
    isPlaceholder: false,
    aspectNote: "VIEWPORT 16:10 // CONSÓRCIOS",
  },
  {
    id: "casa-da-sopa",
    index: "03",
    name: "Casa da Sopa — Iguape",
    segment: "Organização Social • Portal de Transparência",
    category: "WEB DEVELOPMENT • ARQUITETURA DE INFORMAÇÃO",
    shortSummary:
      "Portal institucional e sistema de busca desenvolvido para facilitar o acesso público a documentos, projetos e prestação de contas.",
    desktopScreenshot: "/cases/case-casadasopa.webp",
    mobileScreenshot: undefined,
    video: undefined,
    url: undefined,
    stack: ["REACT", "TYPESCRIPT", "UI/UX", "SEARCH SYSTEM", "ACCESSIBILITY"],
    description:
      "Portal institucional e área de transparência para a Ação e Promoção Social de Iguape, permitindo consultar documentos, relatórios e projetos de forma simples e segura.",
    challenge:
      "Organizar um grande volume de documentos, convênios e prestações de contas em uma interface que qualquer cidadão consiga navegar sem dificuldade.",
    solution:
      "Busca direta por palavra-chave, ano ou categoria, divisão clara de seções institucionais e visual limpo com foco total em acessibilidade.",
    isPlaceholder: false,
    aspectNote: "VIEWPORT 16:10 // IGUAPE, SP",
  },
  // Slots futuros mantidos apenas internamente no código (não exibidos publicamente)
  {
    id: "slot-04",
    index: "04",
    name: "Reserved Case Slot // 04",
    segment: "Arquitetura Preparada para Próximo Case",
    category: "WEB DEVELOPMENT • PAID MEDIA",
    shortSummary: "Estrutura preparada no código para inserção de futuro projeto.",
    desktopScreenshot: undefined,
    mobileScreenshot: undefined,
    video: undefined,
    url: undefined,
    stack: ["NEXT.JS", "TYPESCRIPT", "GSAP", "GA4", "META & GOOGLE ADS"],
    description:
      "Slot estrutural mantido internamente para futura publicação de estudo de caso.",
    challenge: "Estrutura modular pronta para novos assets.",
    solution: "Suporte a screenshots desktop, mobile, vídeo e link ao vivo.",
    isPlaceholder: true,
    aspectNote: "INTERNAL SLOT",
  },
  {
    id: "slot-05",
    index: "05",
    name: "Reserved Case Slot // 05",
    segment: "Arquitetura Preparada para Próximo Case",
    category: "DIGITAL EXPERIENCE • ACQUISITION",
    shortSummary: "Estrutura preparada no código para inserção de futuro projeto.",
    desktopScreenshot: undefined,
    mobileScreenshot: undefined,
    video: undefined,
    url: undefined,
    stack: ["REACT", "TAILWIND CSS", "SUPABASE", "PERFORMANCE"],
    description:
      "Slot estrutural mantido internamente para futura publicação de estudo de caso.",
    challenge: "Estrutura modular pronta para novos assets.",
    solution: "Suporte a screenshots desktop, mobile, vídeo e link ao vivo.",
    isPlaceholder: true,
    aspectNote: "INTERNAL SLOT",
  },
];

// Apenas projetos reais publicados para exibição nas páginas públicas
export const publishedProjects: ProjectItem[] = projectsData.filter(
  (project) => !project.isPlaceholder
);
