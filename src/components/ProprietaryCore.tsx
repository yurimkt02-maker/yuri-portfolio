"use client";

import React, { useEffect, useRef, useState } from "react";

interface ProprietaryCoreProps {
  variant?: "hero" | "work-frame" | "performance-node" | "footer-seal";
  activePhase?: number;
  className?: string;
}

export const ProprietaryCore: React.FC<ProprietaryCoreProps> = ({
  variant = "hero",
  activePhase = 0,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const pillars = [
    { code: "SYS.01", label: "BUILD", sub: "INTERFACE & ARCHITECTURE" },
    { code: "SYS.02", label: "ACQUIRE", sub: "PAID MEDIA & INTENT" },
    { code: "SYS.03", label: "MEASURE", sub: "EVENT TELEMETRY & DATA" },
    { code: "SYS.04", label: "OPTIMIZE", sub: "CONVERSION & SCALE" },
  ];

  useEffect(() => {
    if (variant !== "hero") return;
    const interval = setInterval(() => {
      setActivePillarIndex((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(interval);
  }, [variant]);

  useEffect(() => {
    if (variant !== "hero") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let time = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      targetMouseX = (nx - 0.5) * 2;
      targetMouseY = (ny - 0.5) * 2;
      if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
        setCoords({
          x: Math.round(nx * 1000) / 1000,
          y: Math.round(ny * 1000) / 1000,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      if (!canvas || !containerRef.current) return;
      if (!isVisible && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.34;

      ctx.clearRect(0, 0, width, height);

      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      if (!prefersReducedMotion) {
        time += 0.0065;
      }

      // 3D Rotation helper
      const rotX = time * 0.7 + currentMouseY * 0.45;
      const rotY = time * 0.95 + currentMouseX * 0.55;
      const rotZ = time * 0.35;

      const project = (x: number, y: number, z: number) => {
        // Rotate X
        const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
        const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
        // Rotate Y
        const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
        const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);
        // Rotate Z
        const x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
        const y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

        const fov = 420;
        const scale = fov / (fov + z2);
        return {
          px: cx + x3 * scale,
          py: cy + y3 * scale,
          z: z2,
          scale,
        };
      };

      // Draw Deformable Geodesic / Meridian Wireframe Rings
      const rings = 6;
      const segments = 44;

      for (let r = 0; r < rings; r++) {
        const ringAngle = (r / rings) * Math.PI;
        ctx.beginPath();
        for (let s = 0; s <= segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          // Harmonic wave deformation
          const wave =
            1 +
            0.06 *
              Math.sin(theta * 4 + time * 2.2 + r) *
              Math.cos(ringAngle * 2 - time);

          const rad = baseRadius * wave;
          const x = rad * Math.sin(theta) * Math.cos(ringAngle);
          const y = rad * Math.sin(theta) * Math.sin(ringAngle);
          const z = rad * Math.cos(theta);

          const p = project(x, y, z);
          if (s === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }
        ctx.strokeStyle =
          r === 0 || r === 3
            ? "rgba(211, 169, 107, 0.42)"
            : "rgba(244, 239, 232, 0.13)";
        ctx.lineWidth = r === 0 ? 1.25 : 0.85;
        ctx.stroke();
      }

      // Draw Equatorial & Polar Telemetry Orbits
      const orbitAngles = [
        { rx: 1.18, tiltX: 0.4, tiltY: -0.3, gold: true },
        { rx: 1.06, tiltX: -0.6, tiltY: 0.5, gold: false },
      ];

      orbitAngles.forEach((orb, idx) => {
        ctx.beginPath();
        for (let s = 0; s <= 64; s++) {
          const t = (s / 64) * Math.PI * 2;
          const ox = baseRadius * orb.rx * Math.cos(t);
          const oy = baseRadius * orb.rx * Math.sin(t) * Math.cos(orb.tiltX);
          const oz = baseRadius * orb.rx * Math.sin(t) * Math.sin(orb.tiltY);
          const p = project(ox, oy, oz);
          if (s === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }
        ctx.strokeStyle = orb.gold
          ? "rgba(230, 196, 135, 0.34)"
          : "rgba(155, 152, 148, 0.2)";
        ctx.setLineDash(idx === 1 ? [3, 6] : []);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);

        // Travelling signal node along the orbit
        const signalT = time * (idx === 0 ? 1.6 : -1.2) + idx * 2;
        const sx = baseRadius * orb.rx * Math.cos(signalT);
        const sy =
          baseRadius * orb.rx * Math.sin(signalT) * Math.cos(orb.tiltX);
        const sz =
          baseRadius * orb.rx * Math.sin(signalT) * Math.sin(orb.tiltY);
        const sp = project(sx, sy, sz);

        ctx.beginPath();
        ctx.arc(sp.px, sp.py, 3.2 * sp.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#E6C487";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sp.px, sp.py, 8 * sp.scale, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(211, 169, 107, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw 4 Cardinal Nodes representing BUILD / ACQUIRE / MEASURE / OPTIMIZE
      const cardinalCoords = [
        [baseRadius * 0.85, 0, 0],
        [-baseRadius * 0.85, 0, 0],
        [0, baseRadius * 0.85, 0],
        [0, -baseRadius * 0.85, 0],
      ];

      cardinalCoords.forEach(([nx, ny, nz], i) => {
        const np = project(nx, ny, nz);
        // Line from center core to node
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(np.px, np.py);
        ctx.strokeStyle = "rgba(211, 169, 107, 0.22)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Node point
        ctx.beginPath();
        ctx.arc(np.px, np.py, i === 0 ? 3.5 : 2.3, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? "#D3A96B" : "#F4EFE8";
        ctx.fill();
      });

      // Center Precision Core
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#D3A96B";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 14 + Math.sin(time * 3) * 2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(211, 169, 107, 0.45)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [variant]);

  if (variant === "work-frame") {
    return (
      <div
        className={`pointer-events-none select-none flex items-center gap-3 ${className}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64" className="w-10 h-10 text-[#D3A96B]">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="opacity-40"
          />
          <circle
            cx="32"
            cy="32"
            r="18"
            fill="none"
            stroke="#F4EFE8"
            strokeWidth="1"
            className="opacity-25"
          />
          <path
            d="M32 4V14M32 50V60M4 32H14M50 32H60"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="32" cy="32" r="3" fill="currentColor" />
        </svg>
        <div className="text-[11px] tracking-[0.2em] uppercase text-[#9B9894] font-mono">
          <span className="text-[#D3A96B]">CORE // FRAME</span> • VIEWPORT CALIBRATED
        </div>
      </div>
    );
  }

  if (variant === "performance-node") {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`} aria-hidden="true">
        <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-28 md:h-28">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#D3A96B"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="opacity-40 animate-[spin_28s_linear_infinite]"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="46"
            ry="20"
            transform={`rotate(${activePhase * 30 + 25} 60 60)`}
            fill="none"
            stroke="#F4EFE8"
            strokeWidth="1"
            className="opacity-25 transition-transform duration-700"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="46"
            ry="20"
            transform={`rotate(${-activePhase * 30 - 35} 60 60)`}
            fill="none"
            stroke="#D3A96B"
            strokeWidth="1.2"
            className="opacity-60 transition-transform duration-700"
          />
          <circle cx="60" cy="60" r="6" fill="#D3A96B" />
          <circle
            cx="60"
            cy="60"
            r="14"
            fill="none"
            stroke="#E6C487"
            strokeWidth="1"
            className="opacity-50"
          />
        </svg>
      </div>
    );
  }

  if (variant === "footer-seal") {
    return (
      <div className={`relative inline-flex flex-col items-center ${className}`} aria-hidden="true">
        <svg viewBox="0 0 140 140" className="w-28 h-28 md:w-36 md:h-36">
          <circle
            cx="70"
            cy="70"
            r="64"
            fill="none"
            stroke="#F4EFE8"
            strokeWidth="0.75"
            className="opacity-15"
          />
          <circle
            cx="70"
            cy="70"
            r="50"
            fill="none"
            stroke="#D3A96B"
            strokeWidth="1"
            strokeDasharray="2 5"
            className="opacity-45 animate-[spin_40s_linear_infinite]"
          />
          <ellipse
            cx="70"
            cy="70"
            rx="48"
            ry="18"
            transform="rotate(30 70 70)"
            fill="none"
            stroke="#D3A96B"
            strokeWidth="1"
            className="opacity-40"
          />
          <ellipse
            cx="70"
            cy="70"
            rx="48"
            ry="18"
            transform="rotate(-30 70 70)"
            fill="none"
            stroke="#F4EFE8"
            strokeWidth="1"
            className="opacity-25"
          />
          <path
            d="M70 6V22M70 118V134M6 70H22M118 70H134"
            stroke="#D3A96B"
            strokeWidth="1"
            className="opacity-50"
          />
          <circle cx="70" cy="70" r="4.5" fill="#D3A96B" />
        </svg>
      </div>
    );
  }

  // Default: Hero Interactive Core
  const activePillar = pillars[activePillarIndex];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[340px] md:min-h-[480px] flex items-center justify-center select-none ${className}`}
    >
      {/* Outer SVG Calibration Ring & Axis Marks */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <circle
          cx="250"
          cy="250"
          r="215"
          fill="none"
          stroke="rgba(244, 239, 232, 0.07)"
          strokeWidth="1"
        />
        <circle
          cx="250"
          cy="250"
          r="185"
          fill="none"
          stroke="rgba(211, 169, 107, 0.18)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        {/* Crosshair ticks */}
        <line
          x1="250"
          y1="15"
          x2="250"
          y2="45"
          stroke="rgba(211, 169, 107, 0.45)"
          strokeWidth="1"
        />
        <line
          x1="250"
          y1="455"
          x2="250"
          y2="485"
          stroke="rgba(211, 169, 107, 0.45)"
          strokeWidth="1"
        />
        <line
          x1="15"
          y1="250"
          x2="45"
          y2="250"
          stroke="rgba(211, 169, 107, 0.45)"
          strokeWidth="1"
        />
        <line
          x1="455"
          y1="250"
          x2="485"
          y2="250"
          stroke="rgba(211, 169, 107, 0.45)"
          strokeWidth="1"
        />
        {/* Corner brackets */}
        <path
          d="M40 70 V40 H70 M430 40 H460 V70 M460 430 V460 H430 M70 460 H40 V430"
          fill="none"
          stroke="rgba(244, 239, 232, 0.18)"
          strokeWidth="1"
        />
      </svg>

      {/* Interactive 3D Geodesic Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-label="Elemento visual interativo representando o sistema Build, Acquire, Measure, Optimize"
      />

      {/* Corner Telemetry Overlays */}
      <div className="absolute top-3 left-3 md:top-5 md:left-5 pointer-events-none flex flex-col gap-0.5">
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#9B9894] font-mono">
          CORE // VECTOR.SYS
        </span>
        <span className="text-[11px] tracking-[0.16em] uppercase text-[#D3A96B] font-mono">
          X:{coords.x.toFixed(2)} Y:{coords.y.toFixed(2)}
        </span>
      </div>

      <div className="absolute top-3 right-3 md:top-5 md:right-5 pointer-events-none text-right flex flex-col gap-0.5">
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#9B9894] font-mono">
          ACTIVE NODE
        </span>
        <span className="text-[11px] tracking-[0.18em] uppercase text-[#F4EFE8] font-mono flex items-center justify-end gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D3A96B] inline-block animate-pulse" />
          {activePillar.code} — {activePillar.label}
        </span>
      </div>

      {/* Bottom 4-Pillar Status Strip */}
      <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 flex items-center justify-between border-t border-[#F4EFE8]/10 pt-2.5">
        {pillars.map((p, idx) => {
          const isCurrent = idx === activePillarIndex;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => setActivePillarIndex(idx)}
              className={`text-left transition-all duration-300 group focus:outline-none ${
                isCurrent ? "opacity-100" : "opacity-45 hover:opacity-80"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    isCurrent ? "bg-[#D3A96B]" : "bg-[#9B9894]/40"
                  }`}
                />
                <span
                  className={`text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-medium ${
                    isCurrent ? "text-[#D3A96B]" : "text-[#F4EFE8]"
                  }`}
                >
                  {p.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
