"use client";

import React, { useEffect, useRef, useState } from "react";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mediaQuery.matches || reducedMotion.matches) {
      setIsFinePointer(false);
      return;
    }
    setIsFinePointer(true);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const targetEl = (e.target as HTMLElement | null)?.closest("[data-cursor]");
      if (targetEl) {
        const label = targetEl.getAttribute("data-cursor") || "";
        setCursorLabel(label);
      } else {
        setCursorLabel("");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isFinePointer) return null;

  const hasLabel = Boolean(cursorLabel);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform hidden lg:block"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out rounded-full ${
          !isVisible ? "opacity-0 scale-50" : "opacity-100"
        } ${
          hasLabel
            ? "w-20 h-20 bg-[#070708]/90 border border-[#D3A96B] shadow-[0_0_25px_rgba(211,169,107,0.22)] backdrop-blur-sm"
            : "w-7 h-7 border border-[#D3A96B]/45 bg-transparent"
        }`}
      >
        {hasLabel ? (
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#E6C487] font-semibold">
            {cursorLabel}
          </span>
        ) : (
          <span className="w-1 h-1 rounded-full bg-[#D3A96B]" />
        )}
      </div>
    </div>
  );
};
