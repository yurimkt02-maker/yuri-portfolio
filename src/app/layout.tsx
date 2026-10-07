import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = configuredSiteUrl ? new URL(configuredSiteUrl) : undefined;

export const viewport: Viewport = {
  themeColor: "#070708",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title: {
    default: "Yuri Santos — Web Development & Performance",
    template: "%s | Yuri Santos",
  },
  description:
    "Crio experiências digitais pensadas para apresentar marcas com clareza, gerar atenção e transformar tráfego em oportunidade. Desenvolvimento web e tráfego pago conectados por estratégia, tecnologia, performance e conversão.",
  keywords: [
    "Yuri Santos",
    "Web Development",
    "Tráfego Pago",
    "Performance Digital",
    "Landing Pages",
    "Next.js",
    "Meta Ads",
    "Google Ads",
    "UI/UX",
    "Tracking",
  ],
  authors: [{ name: "Yuri Santos" }],
  creator: "Yuri Santos",
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    ...(siteUrl ? { url: siteUrl } : {}),
    title: "Yuri Santos — Web Development & Performance",
    description:
      "Estratégia, desenvolvimento web e mídia paga conectados para transformar presença digital em oportunidade.",
    siteName: "Yuri Santos",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yuri Santos",
    jobTitle: "Web Development & Performance",
    email: "mailto:comercial@yuripresencadigital.com.br",
    ...(siteUrl ? { url: siteUrl.toString() } : {}),
    description:
      "Crio experiências digitais pensadas para apresentar marcas com clareza, gerar atenção e transformar tráfego em oportunidade.",
    knowsAbout: [
      "Web Development",
      "Paid Media",
      "UI/UX Design",
      "Next.js",
      "React",
      "TypeScript",
      "Meta Ads",
      "Google Ads",
      "Web Analytics",
    ],
  };

  return (
    <html
      lang="pt-BR"
      className={`${instrumentSerif.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#070708] text-[#F4EFE8] antialiased selection:bg-[#D3A96B] selection:text-[#070708]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
