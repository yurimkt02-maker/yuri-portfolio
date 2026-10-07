export type TechCategory =
  | "FRONT-END"
  | "MOTION"
  | "BACKEND / DATA"
  | "WORKFLOW"
  | "DESIGN"
  | "ANALYTICS"
  | "PAID MEDIA";

export interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
  role: string;
  brandColor: string;
  secondaryColor?: string;
  isPrimary?: boolean;
  coordinates: { x: number; y: number };
}

export const TECH_CATEGORIES: TechCategory[] = [
  "FRONT-END",
  "MOTION",
  "BACKEND / DATA",
  "WORKFLOW",
  "DESIGN",
  "ANALYTICS",
  "PAID MEDIA",
];

export const technologiesData: TechItem[] = [
  // FRONT-END
  {
    id: "html5",
    name: "HTML5",
    category: "FRONT-END",
    role: "Semantic Markup & Document Architecture",
    brandColor: "#E34F26",
    coordinates: { x: 8, y: 18 },
  },
  {
    id: "css3",
    name: "CSS3",
    category: "FRONT-END",
    role: "Visual Layout, Grid Systems & Styling",
    brandColor: "#1572B6",
    coordinates: { x: 18, y: 14 },
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "FRONT-END",
    role: "Core Runtime & Interactive Logic",
    brandColor: "#F7DF1E",
    isPrimary: true,
    coordinates: { x: 30, y: 22 },
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "FRONT-END",
    role: "Static Typing & Scalable Architecture",
    brandColor: "#3178C6",
    isPrimary: true,
    coordinates: { x: 44, y: 16 },
  },
  {
    id: "react",
    name: "React",
    category: "FRONT-END",
    role: "UI / Component Architecture",
    brandColor: "#61DAFB",
    isPrimary: true,
    coordinates: { x: 58, y: 24 },
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "FRONT-END",
    role: "Hybrid Rendering, Routing & Web Performance",
    brandColor: "#FFFFFF",
    secondaryColor: "#D3A96B",
    isPrimary: true,
    coordinates: { x: 72, y: 18 },
  },
  {
    id: "vite",
    name: "Vite",
    category: "FRONT-END",
    role: "Next-Gen Frontend Tooling & Bundling",
    brandColor: "#646CFF",
    secondaryColor: "#FFD62E",
    coordinates: { x: 84, y: 25 },
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "FRONT-END",
    role: "Design Tokens & Utility-First CSS System",
    brandColor: "#38BDF8",
    coordinates: { x: 22, y: 38 },
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    category: "FRONT-END",
    role: "Composable Accessible Interface Primitives",
    brandColor: "#F4EFE8",
    secondaryColor: "#D3A96B",
    coordinates: { x: 36, y: 42 },
  },
  {
    id: "radix",
    name: "Radix UI",
    category: "FRONT-END",
    role: "Unstyled WAI-ARIA Compliant Components",
    brandColor: "#00C7B7",
    coordinates: { x: 50, y: 38 },
  },

  // MOTION
  {
    id: "gsap",
    name: "GSAP",
    category: "MOTION",
    role: "High-Precision Timeline & Choreographed Motion",
    brandColor: "#88CE02",
    isPrimary: true,
    coordinates: { x: 65, y: 44 },
  },
  {
    id: "scrolltrigger",
    name: "ScrollTrigger",
    category: "MOTION",
    role: "Scroll-Driven Narrative & Spatial Control",
    brandColor: "#88CE02",
    secondaryColor: "#00E5FF",
    coordinates: { x: 78, y: 40 },
  },
  {
    id: "css-animations",
    name: "CSS Animations",
    category: "MOTION",
    role: "GPU-Accelerated Transitions & Keyframes",
    brandColor: "#A855F7",
    coordinates: { x: 90, y: 38 },
  },

  // BACKEND / DATA
  {
    id: "supabase",
    name: "Supabase",
    category: "BACKEND / DATA",
    role: "Realtime Database, Auth & Edge Functions",
    brandColor: "#3ECF8E",
    isPrimary: true,
    coordinates: { x: 14, y: 58 },
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "BACKEND / DATA",
    role: "Relational Data Modeling & Query Performance",
    brandColor: "#336791",
    coordinates: { x: 28, y: 62 },
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "BACKEND / DATA",
    role: "Service Integration, Webhooks & Data Pipelines",
    brandColor: "#00D8FF",
    coordinates: { x: 42, y: 58 },
  },
  {
    id: "json",
    name: "JSON",
    category: "BACKEND / DATA",
    role: "Structured Payload & Schema Serialization",
    brandColor: "#F59E0B",
    coordinates: { x: 54, y: 62 },
  },

  // WORKFLOW
  {
    id: "git",
    name: "Git",
    category: "WORKFLOW",
    role: "Distributed Version Control & Branching",
    brandColor: "#F05032",
    coordinates: { x: 68, y: 60 },
  },
  {
    id: "github",
    name: "GitHub",
    category: "WORKFLOW",
    role: "Code Repository & Automated Workflows",
    brandColor: "#F4EFE8",
    secondaryColor: "#6E5494",
    coordinates: { x: 80, y: 58 },
  },
  {
    id: "npm",
    name: "npm",
    category: "WORKFLOW",
    role: "Package Dependency & Script Orchestration",
    brandColor: "#CB3837",
    coordinates: { x: 91, y: 62 },
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "WORKFLOW",
    role: "Edge Network Deployment & Core Web Vitals",
    brandColor: "#FFFFFF",
    coordinates: { x: 12, y: 80 },
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "WORKFLOW",
    role: "Development Environment & Debugging",
    brandColor: "#007ACC",
    coordinates: { x: 24, y: 82 },
  },
  {
    id: "devtools",
    name: "Browser DevTools",
    category: "WORKFLOW",
    role: "Frame-Rate Profiling, Network & DOM Inspection",
    brandColor: "#4285F4",
    secondaryColor: "#34A853",
    coordinates: { x: 36, y: 78 },
  },

  // DESIGN
  {
    id: "figma",
    name: "Figma",
    category: "DESIGN",
    role: "Interface Design, Prototyping & Design Systems",
    brandColor: "#F24E1E",
    secondaryColor: "#A259FF",
    coordinates: { x: 49, y: 82 },
  },

  // ANALYTICS
  {
    id: "ga4",
    name: "Google Analytics 4",
    category: "ANALYTICS",
    role: "Event-Based Behavioral Telemetry & Funnels",
    brandColor: "#E37400",
    secondaryColor: "#F9AB00",
    coordinates: { x: 62, y: 78 },
  },
  {
    id: "gtm",
    name: "Google Tag Manager",
    category: "ANALYTICS",
    role: "DataLayer Instrumentation & Event Triggers",
    brandColor: "#246FDB",
    secondaryColor: "#8AB4F8",
    coordinates: { x: 74, y: 82 },
  },
  {
    id: "meta-pixel",
    name: "Meta Pixel",
    category: "ANALYTICS",
    role: "Conversion Signal Tracking & Event Matching",
    brandColor: "#0668E1",
    secondaryColor: "#00C6FF",
    coordinates: { x: 86, y: 78 },
  },

  // PAID MEDIA
  {
    id: "meta-ads",
    name: "Meta Ads",
    category: "PAID MEDIA",
    role: "Paid Social Acquisition, Creative Testing & Remarketing",
    brandColor: "#0668E1",
    coordinates: { x: 68, y: 92 },
  },
  {
    id: "google-ads",
    name: "Google Ads",
    category: "PAID MEDIA",
    role: "High-Intent Search Capture & Conversion Bidding",
    brandColor: "#4285F4",
    secondaryColor: "#FBBC04",
    coordinates: { x: 84, y: 92 },
  },
];
