"use client";

import React from "react";

interface TechIconProps {
  id: string;
  active: boolean;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ id, active, className = "w-7 h-7" }) => {
  const monoStroke = "#D5D0C8";
  const monoFill = "#D5D0C8";
  const monoMuted = "#787571";

  switch (id) {
    case "html5":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M4 2L5.5 19L12 21L18.5 19L20 2H4Z"
            fill={active ? "#E34F26" : "transparent"}
            stroke={active ? "#E34F26" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M12 4V19.3L17.2 17.7L18.4 4H12Z"
            fill={active ? "#EF652A" : "transparent"}
            className="transition-all duration-500"
          />
          <path
            d="M7.5 7H16.5L16.2 10H9.8L10 12.5H16L15.5 16.5L12 17.5L8.5 16.5L8.3 14"
            stroke={active ? "#FFFFFF" : monoStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "css3":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M4 2L5.5 19L12 21L18.5 19L20 2H4Z"
            fill={active ? "#1572B6" : "transparent"}
            stroke={active ? "#1572B6" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M12 4V19.3L17.2 17.7L18.4 4H12Z"
            fill={active ? "#33A9DC" : "transparent"}
            className="transition-all duration-500"
          />
          <path
            d="M7.5 7H16.5L16 11.5H8.5L8.8 14.5L12 15.5L15.2 14.5L15.5 11.5"
            stroke={active ? "#FFFFFF" : monoStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <rect
            x="2.5"
            y="2.5"
            width="19"
            height="19"
            rx="2.5"
            fill={active ? "#F7DF1E" : "transparent"}
            stroke={active ? "#F7DF1E" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M11 11.5V16.8C11 18.1 10.1 18.8 8.9 18.8C7.9 18.8 7.3 18.2 7 17.5"
            stroke={active ? "#070708" : monoStroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          <path
            d="M17.8 12.6C17.4 11.9 16.7 11.5 15.8 11.5C14.7 11.5 13.9 12.1 13.9 13C13.9 13.9 14.5 14.3 15.9 14.8C17.3 15.4 18.1 16 18.1 17.2C18.1 18.4 17 19.1 15.6 19.1C14.3 19.1 13.5 18.5 13 17.6"
            stroke={active ? "#070708" : monoStroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <rect
            x="2.5"
            y="2.5"
            width="19"
            height="19"
            rx="2.5"
            fill={active ? "#3178C6" : "transparent"}
            stroke={active ? "#3178C6" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M7 11.5H12.5M9.75 11.5V18.8"
            stroke={active ? "#FFFFFF" : monoStroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          <path
            d="M18.3 12.5C17.9 11.9 17.2 11.5 16.3 11.5C15.2 11.5 14.4 12.1 14.4 13C14.4 13.9 15 14.3 16.4 14.8C17.8 15.4 18.6 16 18.6 17.2C18.6 18.4 17.5 19.1 16.1 19.1C14.8 19.1 14 18.5 13.5 17.6"
            stroke={active ? "#FFFFFF" : monoStroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "react":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <circle
            cx="12"
            cy="12"
            r="2.1"
            fill={active ? "#61DAFB" : monoFill}
            className="transition-all duration-500"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="3.8"
            stroke={active ? "#61DAFB" : monoStroke}
            strokeWidth="1.4"
            className="transition-all duration-500"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="3.8"
            transform="rotate(60 12 12)"
            stroke={active ? "#61DAFB" : monoStroke}
            strokeWidth="1.4"
            className="transition-all duration-500"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="3.8"
            transform="rotate(120 12 12)"
            stroke={active ? "#61DAFB" : monoStroke}
            strokeWidth="1.4"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill={active ? "#070708" : "transparent"}
            stroke={active ? "#FFFFFF" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M8.5 16V8L17.5 18.8"
            stroke={active ? "#FFFFFF" : monoStroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
          <path
            d="M15.5 8V13.5"
            stroke={active ? "#D3A96B" : monoMuted}
            strokeWidth="1.8"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "vite":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M21 4L12 21L3 4L12 6.5L21 4Z"
            fill={active ? "#646CFF" : "transparent"}
            fillOpacity={active ? "0.25" : "0"}
            stroke={active ? "#646CFF" : monoStroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
          <path
            d="M14.5 3L10 11.5H14L11 18L17 9.5H13L14.5 3Z"
            fill={active ? "#FFD62E" : "transparent"}
            stroke={active ? "#FFD62E" : monoStroke}
            strokeWidth="1.4"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "tailwindcss":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.69 11.8 9.24 12.41 9.85C13.4 10.85 14.55 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.31 17.2 8.76 16.59 8.15C15.6 7.15 14.45 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.69 6.8 15.24 7.41 15.85C8.4 16.85 9.55 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.31 12.2 14.76 11.59 14.15C10.6 13.15 9.45 12 7 12Z"
            fill={active ? "#38BDF8" : "transparent"}
            stroke={active ? "#38BDF8" : monoStroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "shadcn":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            stroke={active ? "#F4EFE8" : monoMuted}
            strokeWidth="1.4"
            className="transition-all duration-500"
          />
          <line
            x1="17"
            y1="7"
            x2="7"
            y2="17"
            stroke={active ? "#FFFFFF" : monoStroke}
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          <line
            x1="18"
            y1="12.5"
            x2="12.5"
            y2="18"
            stroke={active ? "#D3A96B" : monoStroke}
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "radix":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M11 4H6V12H11C13.2 12 15 10.2 15 8C15 5.8 13.2 4 11 4Z"
            fill={active ? "#00C7B7" : "transparent"}
            fillOpacity={active ? "0.25" : "0"}
            stroke={active ? "#00C7B7" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M6 12V20H11M11 12L17.5 20"
            stroke={active ? "#00C7B7" : monoStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
          <circle
            cx="17.5"
            cy="7.5"
            r="2.5"
            fill={active ? "#00C7B7" : "transparent"}
            stroke={active ? "#00C7B7" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "gsap":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M12 2.5L20 7V17L12 21.5L4 17V7L12 2.5Z"
            fill={active ? "#88CE02" : "transparent"}
            fillOpacity={active ? "0.2" : "0"}
            stroke={active ? "#88CE02" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M15.5 9.5C14.7 8.4 13.5 7.8 12 7.8C9.5 7.8 7.6 9.7 7.6 12C7.6 14.3 9.5 16.2 12 16.2C14.3 16.2 16 14.6 16.2 12.4H12"
            stroke={active ? "#88CE02" : monoStroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "scrolltrigger":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <rect
            x="6.5"
            y="2.5"
            width="11"
            height="19"
            rx="5.5"
            stroke={active ? "#88CE02" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <circle
            cx="12"
            cy="8.5"
            r="2"
            fill={active ? "#88CE02" : monoFill}
            className="transition-all duration-500"
          />
          <path
            d="M12 12.5V17M9.8 15L12 17.2L14.2 15"
            stroke={active ? "#00E5FF" : monoStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "css-animations":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <circle
            cx="6"
            cy="12"
            r="3.2"
            stroke={active ? "#A855F7" : monoMuted}
            strokeWidth="1.3"
            strokeDasharray="2 2"
            className="transition-all duration-500"
          />
          <circle
            cx="11.5"
            cy="12"
            r="4.2"
            stroke={active ? "#C084FC" : monoStroke}
            strokeWidth="1.4"
            className="transition-all duration-500"
          />
          <circle
            cx="17.5"
            cy="12"
            r="4.5"
            fill={active ? "#A855F7" : "transparent"}
            fillOpacity={active ? "0.28" : "0"}
            stroke={active ? "#A855F7" : monoStroke}
            strokeWidth="1.6"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "supabase":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M13.2 2.8C13.7 2.1 14.8 2.5 14.8 3.3V11H20C20.8 11 21.2 11.9 20.7 12.5L10.8 21.2C10.3 21.9 9.2 21.5 9.2 20.7V13H4C3.2 13 2.8 12.1 3.3 11.5L13.2 2.8Z"
            fill={active ? "#3ECF8E" : "transparent"}
            fillOpacity={active ? "0.28" : "0"}
            stroke={active ? "#3ECF8E" : monoStroke}
            strokeWidth="1.6"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <ellipse
            cx="12"
            cy="6"
            rx="7.5"
            ry="3.2"
            fill={active ? "#336791" : "transparent"}
            stroke={active ? "#5A9BD5" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M4.5 6V12C4.5 13.8 7.86 15.2 12 15.2C16.14 15.2 19.5 13.8 19.5 12V6"
            stroke={active ? "#5A9BD5" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M4.5 12V18C4.5 19.8 7.86 21.2 12 21.2C16.14 21.2 19.5 19.8 19.5 18V12"
            stroke={active ? "#336791" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "rest-apis":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <circle cx="5.5" cy="7" r="2.2" stroke={active ? "#00D8FF" : monoStroke} strokeWidth="1.5" />
          <circle cx="18.5" cy="7" r="2.2" stroke={active ? "#00D8FF" : monoStroke} strokeWidth="1.5" />
          <circle cx="12" cy="18" r="2.5" fill={active ? "#00D8FF" : "transparent"} stroke={active ? "#00D8FF" : monoStroke} strokeWidth="1.5" />
          <path
            d="M7.7 7H16.3M6.8 8.9L10.7 16M17.2 8.9L13.3 16"
            stroke={active ? "#00D8FF" : monoStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "json":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M8.5 4C6.5 4 5.5 5 5.5 7V9.5C5.5 11 4.5 12 3 12C4.5 12 5.5 13 5.5 14.5V17C5.5 19 6.5 20 8.5 20"
            stroke={active ? "#F59E0B" : monoStroke}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
          <path
            d="M15.5 4C17.5 4 18.5 5 18.5 7V9.5C18.5 11 19.5 12 21 12C19.5 12 18.5 13 18.5 14.5V17C18.5 19 17.5 20 15.5 20"
            stroke={active ? "#F59E0B" : monoStroke}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
          <circle cx="10" cy="12" r="1.2" fill={active ? "#F59E0B" : monoFill} />
          <circle cx="14" cy="12" r="1.2" fill={active ? "#F59E0B" : monoFill} />
        </svg>
      );

    case "git":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M12 2.2L21.8 12L12 21.8L2.2 12L12 2.2Z"
            fill={active ? "#F05032" : "transparent"}
            fillOpacity={active ? "0.22" : "0"}
            stroke={active ? "#F05032" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M9.5 5.8L15.5 11.8M12 8.3V15.5"
            stroke={active ? "#F05032" : monoStroke}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="8.3" r="1.6" fill={active ? "#FFFFFF" : monoFill} />
          <circle cx="15.5" cy="11.8" r="1.6" fill={active ? "#FFFFFF" : monoFill} />
          <circle cx="12" cy="15.5" r="1.6" fill={active ? "#FFFFFF" : monoFill} />
        </svg>
      );

    case "github":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12C2.5 16.2 5.22 19.76 9 21.02C9.47 21.1 9.65 20.82 9.65 20.56V18.8C6.98 19.38 6.42 17.52 6.42 17.52C5.98 16.4 5.35 16.1 5.35 16.1C4.48 15.5 5.42 15.52 5.42 15.52C6.38 15.59 6.89 16.51 6.89 16.51C7.74 17.97 9.13 17.55 9.68 17.3C9.77 16.68 10.02 16.26 10.29 16.02C8.16 15.78 5.92 14.96 5.92 11.3C5.92 10.25 6.3 9.4 6.91 8.73C6.81 8.49 6.48 7.5 7.01 6.18C7.01 6.18 7.82 5.92 9.65 7.16C10.42 6.95 11.24 6.84 12.06 6.84C12.88 6.84 13.7 6.95 14.47 7.16C16.3 5.92 17.11 6.18 17.11 6.18C17.64 7.5 17.31 8.49 17.21 8.73C17.82 9.4 18.2 10.25 18.2 11.3C18.2 14.97 15.96 15.77 13.82 16.01C14.17 16.31 14.47 16.9 14.47 17.81V20.56C14.47 20.82 14.65 21.11 15.13 21.02C18.89 19.75 21.5 16.2 21.5 12C21.5 6.75 17.25 2.5 12 2.5Z"
            stroke={active ? "#FFFFFF" : monoStroke}
            fill={active ? "#6E5494" : "transparent"}
            fillOpacity={active ? "0.35" : "0"}
            strokeWidth="1.4"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "npm":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <rect
            x="2.5"
            y="6.5"
            width="19"
            height="11"
            rx="1.5"
            fill={active ? "#CB3837" : "transparent"}
            stroke={active ? "#CB3837" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <path
            d="M6.5 15V9.5H11.5V15M9 9.5V15M14 9.5V15M14 9.5H17.5V13.5H14"
            stroke={active ? "#FFFFFF" : monoStroke}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "vercel":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M12 4L21.5 20H2.5L12 4Z"
            fill={active ? "#FFFFFF" : "transparent"}
            stroke={active ? "#FFFFFF" : monoStroke}
            strokeWidth="1.6"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M17 2.5L21 4.5V19.5L17 21.5L7.5 13.8L4 16.5L2.5 15.5V8.5L4 7.5L7.5 10.2L17 2.5Z"
            fill={active ? "#007ACC" : "transparent"}
            fillOpacity={active ? "0.28" : "0"}
            stroke={active ? "#007ACC" : monoStroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
          <path
            d="M17 6.5V17.5L10.5 12L17 6.5Z"
            fill={active ? "#007ACC" : "transparent"}
            className="transition-all duration-500"
          />
        </svg>
      );

    case "devtools":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <rect
            x="2.5"
            y="4"
            width="19"
            height="16"
            rx="2"
            stroke={active ? "#4285F4" : monoStroke}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          <line x1="2.5" y1="8" x2="21.5" y2="8" stroke={active ? "#4285F4" : monoStroke} strokeWidth="1.4" />
          <path
            d="M7 12L9.5 14L7 16M11.5 16H16.5"
            stroke={active ? "#34A853" : monoStroke}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      );

    case "figma":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          {/* Top Left - Red/Orange */}
          <path
            d="M8.5 3H12V9H8.5C6.84 9 5.5 7.66 5.5 6C5.5 4.34 6.84 3 8.5 3Z"
            fill={active ? "#F24E1E" : "transparent"}
            stroke={active ? "#F24E1E" : monoStroke}
            strokeWidth="1.5"
          />
          {/* Top Right - Coral */}
          <path
            d="M12 3H15.5C17.16 3 18.5 4.34 18.5 6C18.5 7.66 17.16 9 15.5 9H12V3Z"
            fill={active ? "#FF7262" : "transparent"}
            stroke={active ? "#FF7262" : monoStroke}
            strokeWidth="1.5"
          />
          {/* Middle Left - Purple */}
          <path
            d="M8.5 9H12V15H8.5C6.84 15 5.5 13.66 5.5 12C5.5 10.34 6.84 9 8.5 9Z"
            fill={active ? "#A259FF" : "transparent"}
            stroke={active ? "#A259FF" : monoStroke}
            strokeWidth="1.5"
          />
          {/* Middle Right - Blue */}
          <circle
            cx="15.2"
            cy="12"
            r="3"
            fill={active ? "#1ABCFE" : "transparent"}
            stroke={active ? "#1ABCFE" : monoStroke}
            strokeWidth="1.5"
          />
          {/* Bottom Left - Green */}
          <path
            d="M8.5 15H12V18C12 19.66 10.66 21 9 21C7.07 21 5.5 19.43 5.5 17.5C5.5 16.12 6.84 15 8.5 15Z"
            fill={active ? "#0ACF83" : "transparent"}
            stroke={active ? "#0ACF83" : monoStroke}
            strokeWidth="1.5"
          />
        </svg>
      );

    case "ga4":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <rect
            x="15.5"
            y="4"
            width="4"
            height="16"
            rx="2"
            fill={active ? "#F9AB00" : "transparent"}
            stroke={active ? "#F9AB00" : monoStroke}
            strokeWidth="1.5"
          />
          <rect
            x="10"
            y="10"
            width="4"
            height="10"
            rx="2"
            fill={active ? "#E37400" : "transparent"}
            stroke={active ? "#E37400" : monoStroke}
            strokeWidth="1.5"
          />
          <circle
            cx="6"
            cy="18"
            r="2"
            fill={active ? "#E37400" : monoFill}
            stroke={active ? "#E37400" : monoStroke}
            strokeWidth="1.2"
          />
        </svg>
      );

    case "gtm":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M12 3L20.5 11.5L16.5 15.5L8 7L12 3Z"
            fill={active ? "#8AB4F8" : "transparent"}
            stroke={active ? "#8AB4F8" : monoStroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 21L3.5 12.5L7.5 8.5L16 17L12 21Z"
            fill={active ? "#246FDB" : "transparent"}
            stroke={active ? "#246FDB" : monoStroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="19" r="1.8" fill={active ? "#4285F4" : monoFill} />
        </svg>
      );

    case "meta-pixel":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="3"
            stroke={active ? "#0668E1" : monoStroke}
            strokeWidth="1.5"
          />
          <circle
            cx="12"
            cy="12"
            r="3.2"
            fill={active ? "#00C6FF" : "transparent"}
            stroke={active ? "#00C6FF" : monoStroke}
            strokeWidth="1.5"
          />
          <path
            d="M12 2V5M12 19V22M2 12H5M19 12H22"
            stroke={active ? "#0668E1" : monoMuted}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "meta-ads":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M4.2 15.2C3 13.7 2.5 11.9 3.1 9.8C3.9 7.2 6.5 6.4 8.7 8.2C10.2 9.4 11.4 11.4 12.6 13.2C13.9 15.1 15.3 16.8 17.2 16.8C19.3 16.8 21 15.1 21 12.4C21 9.4 18.8 7.2 16.5 7.2C14.7 7.2 13.3 8.5 11.6 11.2C9.9 13.9 8.5 16.8 6.2 16.8C5.4 16.8 4.7 16.2 4.2 15.2Z"
            stroke={active ? "#0668E1" : monoStroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "google-ads":
      return (
        <svg viewBox="0 0 24 24" className={`${className} transition-all duration-500`} fill="none">
          <path
            d="M9.5 4.5L3.5 15.5C2.8 16.8 3.4 18.4 4.7 19.1C6 19.8 7.6 19.2 8.3 17.9L14.3 6.9C15 5.6 14.4 4 13.1 3.3C11.8 2.6 10.2 3.2 9.5 4.5Z"
            fill={active ? "#FBBC04" : "transparent"}
            stroke={active ? "#FBBC04" : monoStroke}
            strokeWidth="1.5"
          />
          <path
            d="M14.3 6.9L19.8 17C20.5 18.3 19.9 19.9 18.6 20.6C17.3 21.3 15.7 20.7 15 19.4L11.8 13.5"
            fill={active ? "#4285F4" : "transparent"}
            stroke={active ? "#4285F4" : monoStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="6"
            cy="17"
            r="2.4"
            fill={active ? "#34A853" : monoFill}
          />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="8" stroke={active ? "#D3A96B" : monoStroke} strokeWidth="1.5" />
        </svg>
      );
  }
};
