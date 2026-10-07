export interface SocialLinks {
  instagram?: string;
  github?: string;
}

const WHATSAPP_NUMBER_RAW = "5527992768081";
const WHATSAPP_INITIAL_MESSAGE =
  "Olá, Yuri! Vi seu portfólio e gostaria de conversar sobre um projeto.";

export const siteConfig = {
  name: "Yuri Santos",
  monogram: "YP",
  logoPath: "/assets/logo-yp.png",
  role: "Web Development & Performance",
  roleSignature: "WEB DEVELOPMENT × PERFORMANCE",
  positioningPillars: ["BUILD", "ACQUIRE", "MEASURE", "OPTIMIZE"] as const,
  email: "comercial@yuripresencadigital.com.br",
  whatsappDisplay: "27 99276-8081",
  whatsappBaseUrl: `https://wa.me/${WHATSAPP_NUMBER_RAW}`,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(
    WHATSAPP_INITIAL_MESSAGE
  )}`,
  bioPrimary:
    "Sites que convertem. Campanhas que levam pessoas até eles.",
  statementPt:
    "Eu crio experiências digitais e os sistemas que levam pessoas até elas.",
  aboutShort:
    "Trabalho entre desenvolvimento, design e performance para criar experiências digitais que não terminam quando o site entra no ar.",
  // Mantidos vazios e ocultos na interface até que sejam definidos oficialmente
  socialLinks: {
    instagram: "",
    github: "",
  } as SocialLinks,
  navigation: [
    { index: "01", label: "Skills", href: "/#skills" },
    { index: "02", label: "Projetos", href: "/work" },
    { index: "03", label: "Contato", href: "#contact" },
  ],
};
