"use client";

import React, { useEffect, useRef } from "react";

type SectionZone =
  | "hero"
  | "statement"
  | "skills"
  | "performance"
  | "projects"
  | "contact";

type DepthPlane = "FAR" | "MID" | "NEAR";

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetVx: number;
  targetVy: number;
  wanderTimer: number; // frames until next gentle direction change
  size: number; // FAR: 1-2px, MID: 3-5px, NEAR: 6-10px
  plane: DepthPlane;
  baseAlpha: number; // FAR: 0.08-0.15, MID: 0.18-0.28, NEAR: 0.30-0.45
  orbitPhase: number;
  orbitSpeed: number;
  orbitRadius: number;
  colorRgb: string;
  isSquare: boolean;
  rank: number; // 0..1 — used by zone density (low rank = always visible)
  visibility: number; // smoothed 0..1 presence driven by zone density
}

interface ClusterMember {
  offsetX: number;
  offsetY: number;
  targetOffsetX: number;
  targetOffsetY: number;
  size: number; // 2..5px
  alphaScale: number;
  isGold: boolean;
}

interface ParticleCluster {
  x: number;
  y: number;
  vx: number;
  vy: number;
  curve: number; // slow heading rotation for organic paths
  life: number;
  maxLife: number;
  spreadFactor: number; // approach -> move together -> disperse slowly
  members: ClusterMember[];
}

interface TraversingEvent {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number; // 7..10px
  life: number;
  maxLife: number;
  maxAlpha: number;
  isGold: boolean;
}

interface GatherMember {
  sx: number; // scattered start (relative to center)
  sy: number;
  fx: number; // formation position
  fy: number;
  ex: number; // separated end
  ey: number;
  size: number;
  isGold: boolean;
}

interface GatherEvent {
  cx: number;
  cy: number;
  vy: number;
  rotation: number;
  life: number;
  maxLife: number;
  members: GatherMember[];
}

const GOLD = "211, 169, 107";
const OFFWHITE = "244, 239, 232";
const GRAY = "155, 152, 148";

/**
 * Per-section modulation.
 * - opacityScale: global alpha multiplier (alpha still clamped to the spec ranges)
 * - speedScale: movement multiplier
 * - density: fraction of the particle pool that is visible (0..1)
 * - activity: cluster/event frequency multiplier
 * - clusters: target number of simultaneous clusters (desktop)
 */
const ZONE_MODULATION: Record<
  SectionZone,
  {
    opacityScale: number;
    speedScale: number;
    density: number;
    activity: number;
    clusters: number;
  }
> = {
  hero: { opacityScale: 1.06, speedScale: 1.1, density: 0.9, activity: 1.0, clusters: 5 },
  statement: { opacityScale: 0.76, speedScale: 0.78, density: 0.58, activity: 0.5, clusters: 2 },
  // Skills sits on a translucent dark panel — slightly higher scale compensates
  skills: { opacityScale: 1.22, speedScale: 1.16, density: 1.0, activity: 1.2, clusters: 6 },
  performance: { opacityScale: 1.14, speedScale: 1.26, density: 1.0, activity: 1.45, clusters: 7 },
  projects: { opacityScale: 0.78, speedScale: 0.82, density: 0.62, activity: 0.6, clusters: 3 },
  contact: { opacityScale: 0.68, speedScale: 0.64, density: 0.5, activity: 0.45, clusters: 2 },
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export const AmbientSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isMobile = width < 768;

    let animationFrameId = 0;
    let isDocumentVisible = true;

    let currentZone: SectionZone = "hero";
    let currentOpacityScale = ZONE_MODULATION.hero.opacityScale;
    let currentSpeedScale = ZONE_MODULATION.hero.speedScale;
    let currentDensity = ZONE_MODULATION.hero.density;

    let lastScrollY = window.scrollY;
    let smoothScrollDelta = 0;

    // Pointer parallax (normalized -1..1, smoothed)
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;

    let traverseTimer = 260;
    let gatherTimer = 520;

    const particles: AmbientParticle[] = [];
    const clusters: ParticleCluster[] = [];
    const traversals: TraversingEvent[] = [];
    const gathers: GatherEvent[] = [];
    let clusterSpawnCooldown = 0;

    const setupCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Gold stays punctual: only a handful of points per viewport
    const pickColorRgb = (goldChance: number): string => {
      const r = Math.random();
      if (r < goldChance) return GOLD;
      if (r < 0.7) return OFFWHITE;
      return GRAY;
    };

    // NEAR elements favor lateral open zones on desktop so they never sit on headlines
    const pickSpawnX = (plane: DepthPlane): number => {
      if (plane === "NEAR" && !isMobile) {
        const band = Math.random();
        if (band < 0.42) return Math.random() * (width * 0.28);
        if (band < 0.84) return width * 0.72 + Math.random() * (width * 0.28);
        return width * 0.4 + Math.random() * (width * 0.2);
      }
      return Math.random() * width;
    };

    const pickLateralX = () =>
      isMobile
        ? width * rand(0.1, 0.9)
        : Math.random() < 0.5
        ? width * rand(0.06, 0.3)
        : width * rand(0.7, 0.94);

    const assignWander = (p: AmbientParticle) => {
      if (p.plane === "FAR") {
        p.targetVx = rand(-0.06, 0.06);
        p.targetVy = rand(-0.12, -0.04);
        p.wanderTimer = rand(500, 900);
      } else if (p.plane === "MID") {
        p.targetVx = rand(-0.28, 0.28);
        p.targetVy = rand(-0.46, -0.12);
        p.wanderTimer = rand(260, 560);
      } else {
        p.targetVx = rand(-0.42, 0.42);
        p.targetVy = rand(-0.6, -0.2);
        p.wanderTimer = rand(220, 460);
      }
    };

    const createParticle = (plane: DepthPlane): AmbientParticle => {
      const base: AmbientParticle = {
        x: pickSpawnX(plane),
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        targetVx: 0,
        targetVy: 0,
        wanderTimer: 0,
        size: 1,
        plane,
        baseAlpha: 0.1,
        orbitPhase: Math.random() * Math.PI * 2,
        orbitSpeed: 0.01,
        orbitRadius: 3,
        colorRgb: OFFWHITE,
        isSquare: false,
        rank: Math.random(),
        visibility: 1,
      };

      if (plane === "FAR") {
        base.size = rand(1, 2); // SMALL 1..2px
        base.baseAlpha = rand(0.08, 0.15);
        base.orbitSpeed = rand(0.006, 0.012);
        base.orbitRadius = rand(1.5, 4);
        base.colorRgb = pickColorRgb(0);
        base.isSquare = Math.random() < 0.35;
        base.rank *= 0.85; // background field stays mostly present
      } else if (plane === "MID") {
        base.size = rand(3, 5); // MEDIUM 3..5px
        base.baseAlpha = rand(0.18, 0.28);
        base.orbitSpeed = rand(0.01, 0.022);
        base.orbitRadius = rand(6, 14);
        base.colorRgb = pickColorRgb(0.06);
        base.isSquare = Math.random() < 0.5;
      } else {
        base.size = rand(6, 10); // LARGE RARE 6..10px
        base.baseAlpha = rand(0.3, 0.45);
        base.orbitSpeed = rand(0.012, 0.022);
        base.orbitRadius = rand(10, 22);
        base.colorRgb = pickColorRgb(0.2);
        base.isSquare = true;
      }

      assignWander(base);
      base.vx = base.targetVx;
      base.vy = base.targetVy;
      base.wanderTimer *= Math.random(); // desync direction changes
      base.visibility = base.rank < currentDensity ? 1 : 0;
      return base;
    };

    const createCluster = (randomLife = false): ParticleCluster => {
      const count = isMobile ? 4 + Math.floor(Math.random() * 2) : 4 + Math.floor(Math.random() * 5); // 4..8
      const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 1.4;
      const speed = rand(0.24, 0.5);

      const members: ClusterMember[] = Array.from({ length: count }, (_, idx) => {
        const a = (idx / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const dist = rand(8, 22);
        const ox = Math.cos(a) * dist;
        const oy = Math.sin(a) * dist;
        return {
          offsetX: ox * 2.2,
          offsetY: oy * 2.2,
          targetOffsetX: ox,
          targetOffsetY: oy,
          size: idx === 0 ? rand(4, 5) : rand(2, 3.6),
          alphaScale: idx === 0 ? 1 : rand(0.62, 0.92),
          isGold: idx === 0 && Math.random() < 0.3,
        };
      });

      const maxLife = rand(480, 780);

      return {
        x: pickLateralX(),
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        curve: rand(-0.0025, 0.0025),
        life: randomLife ? Math.random() * maxLife * 0.6 : 0,
        maxLife,
        spreadFactor: 2.0,
        members,
      };
    };

    const spawnTraversal = () => {
      const fromLeft = Math.random() < 0.5;
      traversals.push({
        x: fromLeft ? -12 : width + 12,
        y: height * rand(0.15, 0.85),
        vx: (fromLeft ? 1 : -1) * rand(0.7, 1.05),
        vy: rand(-0.3, 0.12),
        size: rand(7, 10),
        life: 0,
        maxLife: rand(420, 560),
        maxAlpha: rand(0.34, 0.42),
        isGold: Math.random() < 0.35,
      });
    };

    // A small group approaches, organizes into a quiet formation, then separates slowly
    const spawnGather = () => {
      const count = 6 + Math.floor(Math.random() * 3); // 6..8
      const ringR = rand(16, 26);
      const goldIdx = Math.random() < 0.6 ? Math.floor(Math.random() * count) : -1;
      const members: GatherMember[] = Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        const sa = a + rand(-0.9, 0.9);
        const sd = rand(70, 130);
        const ea = a + rand(-0.4, 0.4);
        const ed = rand(90, 160);
        return {
          sx: Math.cos(sa) * sd,
          sy: Math.sin(sa) * sd,
          fx: Math.cos(a) * ringR,
          fy: Math.sin(a) * ringR,
          ex: Math.cos(ea) * ed,
          ey: Math.sin(ea) * ed,
          size: i === goldIdx ? 4 : rand(2.2, 3.6),
          isGold: i === goldIdx,
        };
      });

      gathers.push({
        cx: pickLateralX(),
        cy: height * rand(0.2, 0.8),
        vy: rand(-0.2, -0.08),
        rotation: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: rand(620, 820),
        members,
      });
    };

    const buildScene = () => {
      particles.length = 0;
      clusters.length = 0;

      const farCount = isMobile ? 48 : 110;
      const midCount = isMobile ? 22 : 46;
      const nearCount = isMobile ? 4 : 11;

      for (let i = 0; i < farCount; i++) particles.push(createParticle("FAR"));
      for (let i = 0; i < midCount; i++) particles.push(createParticle("MID"));
      for (let i = 0; i < nearCount; i++) particles.push(createParticle("NEAR"));

      const initialClusters = isMobile ? 2 : 4;
      for (let c = 0; c < initialClusters; c++) clusters.push(createCluster(true));
    };

    // Soft attenuation behind central content — keeps presence, protects reading
    const getSpatialAttenuation = (x: number, y: number, plane: DepthPlane): number => {
      const nx = x / Math.max(1, width);
      const ny = y / Math.max(1, height);

      if (nx < 0.16 || nx > 0.84) return 1.0;

      const inCenter = nx > 0.22 && nx < 0.78 && ny > 0.18 && ny < 0.82;
      if (!inCenter) return 0.95;

      if (currentZone === "projects" || currentZone === "statement") {
        return plane === "NEAR" ? 0.5 : 0.72;
      }
      return plane === "NEAR" ? 0.7 : 0.88;
    };

    setupCanvasSize();
    buildScene();

    // Entering a new section: some trajectories bend, clusters reorganize, sometimes a gather starts
    const onZoneChange = (nextZone: SectionZone) => {
      if (nextZone === currentZone) return;
      currentZone = nextZone;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.plane !== "FAR" && Math.random() < 0.5) {
          assignWander(p);
        }
      }

      for (let c = 0; c < clusters.length; c++) {
        const cl = clusters[c];
        cl.curve = rand(-0.004, 0.004);
        for (let m = 0; m < cl.members.length; m++) {
          const mem = cl.members[m];
          const angle = Math.random() * Math.PI * 2;
          const dist = rand(7, 20);
          mem.targetOffsetX = Math.cos(angle) * dist;
          mem.targetOffsetY = Math.sin(angle) * dist;
        }
      }

      const act = ZONE_MODULATION[nextZone].activity;
      if (!isMobile && gathers.length === 0 && Math.random() < 0.35 * act) {
        spawnGather();
        gatherTimer = rand(720, 1100);
      }
    };

    const sectionIds: { id: string; zone: SectionZone }[] = [
      { id: "top", zone: "hero" },
      { id: "statement", zone: "statement" },
      { id: "skills", zone: "skills" },
      { id: "performance-system", zone: "performance" },
      { id: "ecosystem", zone: "skills" },
      { id: "about", zone: "projects" },
      { id: "projects", zone: "projects" },
      { id: "contact", zone: "contact" },
    ];

    const idToZone = new Map<string, SectionZone>();
    sectionIds.forEach(({ id, zone }) => idToZone.set(id, zone));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const z = idToZone.get(entry.target.id);
            if (z) {
              onZoneChange(z);
              break;
            }
          }
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0,
      }
    );

    idToZone.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const nextY = window.scrollY;
      const dy = nextY - lastScrollY;
      lastScrollY = nextY;
      smoothScrollDelta += dy * 0.12;
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointerTargetX = (e.clientX / Math.max(1, width)) * 2 - 1;
      pointerTargetY = (e.clientY / Math.max(1, height)) * 2 - 1;
    };

    const handleResize = () => {
      const prevW = width;
      const prevH = height;
      setupCanvasSize();
      const sx = width / Math.max(1, prevW);
      const sy = height / Math.max(1, prevH);
      for (let i = 0; i < particles.length; i++) {
        particles[i].x *= sx;
        particles[i].y *= sy;
      }
      for (let c = 0; c < clusters.length; c++) {
        clusters[c].x *= sx;
        clusters[c].y *= sy;
      }
      for (let g = 0; g < gathers.length; g++) {
        gathers[g].cx *= sx;
        gathers[g].cy *= sy;
      }
    };

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };

    const drawParticleShape = (
      x: number,
      y: number,
      size: number,
      colorRgb: string,
      alpha: number,
      plane: DepthPlane,
      isSquare: boolean
    ) => {
      const a = Math.max(0, Math.min(0.46, alpha));
      if (a <= 0.008) return;

      if (plane === "NEAR") {
        // Large rare element: flat translucent frame + crisp inner core (no glow)
        const half = size * 0.5;
        ctx.fillStyle = `rgba(${colorRgb}, ${(a * 0.3).toFixed(3)})`;
        ctx.fillRect(Math.round(x - half), Math.round(y - half), size, size);

        const core = Math.max(2.5, size * 0.42);
        const coreHalf = core * 0.5;
        ctx.fillStyle = `rgba(${colorRgb}, ${a.toFixed(3)})`;
        ctx.fillRect(Math.round(x - coreHalf), Math.round(y - coreHalf), core, core);
        return;
      }

      ctx.fillStyle = `rgba(${colorRgb}, ${a.toFixed(3)})`;
      if (isSquare) {
        const half = size * 0.5;
        ctx.fillRect(Math.round(x - half), Math.round(y - half), size, size);
      } else {
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawStaticScene = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.rank >= currentDensity) continue;
        const atten = getSpatialAttenuation(p.x, p.y, p.plane);
        drawParticleShape(p.x, p.y, p.size, p.colorRgb, p.baseAlpha * atten, p.plane, p.isSquare);
      }
    };

    if (prefersReducedMotion) {
      drawStaticScene();
      const onResizeStatic = () => {
        handleResize();
        drawStaticScene();
      };
      window.addEventListener("resize", onResizeStatic);
      return () => {
        window.removeEventListener("resize", onResizeStatic);
        observer.disconnect();
      };
    }

    const PARALLAX_SCROLL = { FAR: 0.12, MID: 0.36, NEAR: 0.66 } as const;
    const PARALLAX_POINTER = { FAR: 4, MID: 11, NEAR: 24 } as const;

    const render = () => {
      if (!isDocumentVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const mod = ZONE_MODULATION[currentZone];
      currentOpacityScale += (mod.opacityScale - currentOpacityScale) * 0.03;
      currentSpeedScale += (mod.speedScale - currentSpeedScale) * 0.03;
      currentDensity += (mod.density - currentDensity) * 0.02;

      const parallaxStep = smoothScrollDelta * 0.16;
      // Scrolling slightly energizes the field
      const scrollEnergy = Math.min(0.5, Math.abs(smoothScrollDelta) * 0.025);
      smoothScrollDelta *= 0.86;
      if (Math.abs(smoothScrollDelta) < 0.01) smoothScrollDelta = 0;

      const speed = currentSpeedScale * (1 + scrollEnergy);

      pointerX += (pointerTargetX - pointerX) * 0.035;
      pointerY += (pointerTargetY - pointerY) * 0.035;

      ctx.clearRect(0, 0, width, height);

      // =========================================================
      // 1. THREE-LAYER DEPTH FIELD (FAR / MID / NEAR)
      // =========================================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.wanderTimer -= 1;
        if (p.wanderTimer <= 0) assignWander(p);

        // Very soft steering -> gentle, readable changes of direction
        p.vx += (p.targetVx - p.vx) * 0.012;
        p.vy += (p.targetVy - p.vy) * 0.012;

        p.orbitPhase += p.orbitSpeed * speed;
        const breath = 0.82 + 0.18 * Math.sin(p.orbitPhase * 0.7);

        p.x += p.vx * speed;
        p.y += p.vy * speed - parallaxStep * PARALLAX_SCROLL[p.plane];

        const pad = 24;
        if (p.y < -pad) {
          p.y = height + pad;
          p.x = pickSpawnX(p.plane);
        } else if (p.y > height + pad) {
          p.y = -pad;
          p.x = pickSpawnX(p.plane);
        }
        if (p.x < -pad) p.x = width + pad;
        else if (p.x > width + pad) p.x = -pad;

        const targetVis = p.rank < currentDensity ? 1 : 0;
        p.visibility += (targetVis - p.visibility) * 0.02;
        if (p.visibility < 0.01) continue;

        const orbitX = Math.cos(p.orbitPhase) * p.orbitRadius;
        const orbitY = Math.sin(p.orbitPhase * 0.8) * p.orbitRadius;
        const px = -pointerX * PARALLAX_POINTER[p.plane];
        const py = -pointerY * PARALLAX_POINTER[p.plane] * 0.6;

        const drawX = p.x + orbitX + px;
        const drawY = p.y + orbitY + py;

        const spatial = getSpatialAttenuation(drawX, drawY, p.plane);
        const alpha = p.baseAlpha * breath * currentOpacityScale * spatial * p.visibility;

        drawParticleShape(drawX, drawY, p.size, p.colorRgb, alpha, p.plane, p.isSquare);
      }

      // =========================================================
      // 2. COHESIVE CLUSTERS (4..8 particles moving as one, then dispersing)
      // =========================================================
      const targetClusters = isMobile ? Math.min(3, Math.ceil(mod.clusters / 2)) : mod.clusters;
      clusterSpawnCooldown -= mod.activity;
      if (clusters.length < targetClusters && clusterSpawnCooldown <= 0) {
        clusters.push(createCluster(false));
        clusterSpawnCooldown = rand(90, 200);
      }

      for (let c = clusters.length - 1; c >= 0; c--) {
        const cl = clusters[c];
        cl.life += speed * (0.7 + mod.activity * 0.3);

        const ratio = cl.life / cl.maxLife;
        if (ratio >= 1) {
          clusters.splice(c, 1);
          continue;
        }

        // approach/coalesce (0..0.3) -> travel together (0.3..0.7) -> slow dispersal (0.7..1)
        if (ratio < 0.3) {
          cl.spreadFactor = 2.0 - (ratio / 0.3) * 1.0;
        } else if (ratio < 0.7) {
          cl.spreadFactor = 1.0 + Math.sin((ratio - 0.3) * 10) * 0.1;
        } else {
          cl.spreadFactor = 1.0 + ((ratio - 0.7) / 0.3) * 1.8;
        }

        const fade = ratio < 0.15 ? ratio / 0.15 : ratio > 0.8 ? (1 - ratio) / 0.2 : 1;

        // Curved heading
        const cos = Math.cos(cl.curve * speed);
        const sin = Math.sin(cl.curve * speed);
        const nvx = cl.vx * cos - cl.vy * sin;
        const nvy = cl.vx * sin + cl.vy * cos;
        cl.vx = nvx;
        cl.vy = nvy;

        cl.x += cl.vx * speed;
        cl.y += cl.vy * speed - parallaxStep * 0.4;

        if (cl.y < -40) cl.y = height + 40;
        else if (cl.y > height + 40) cl.y = -40;
        if (cl.x < -40) cl.x = width + 40;
        else if (cl.x > width + 40) cl.x = -40;

        const cx = cl.x - pointerX * 13;
        const cy = cl.y - pointerY * 8;

        const spatial = getSpatialAttenuation(cx, cy, "MID");
        const clusterBaseAlpha = 0.36 * fade * currentOpacityScale * spatial;
        if (clusterBaseAlpha <= 0.01) continue;

        for (let m = 0; m < cl.members.length; m++) {
          const mem = cl.members[m];
          mem.offsetX += (mem.targetOffsetX * cl.spreadFactor - mem.offsetX) * 0.04;
          mem.offsetY += (mem.targetOffsetY * cl.spreadFactor - mem.offsetY) * 0.04;

          const mx = cx + mem.offsetX;
          const my = cy + mem.offsetY;
          const mAlpha = Math.min(0.42, clusterBaseAlpha * mem.alphaScale);
          const rgb = mem.isGold ? GOLD : OFFWHITE;

          ctx.fillStyle = `rgba(${rgb}, ${mAlpha.toFixed(3)})`;
          ctx.fillRect(
            Math.round(mx - mem.size * 0.5),
            Math.round(my - mem.size * 0.5),
            mem.size,
            mem.size
          );
        }
      }

      // =========================================================
      // 3. RARE EVENT A — a larger particle crosses an empty area and fades
      // =========================================================
      traverseTimer -= mod.activity;
      if (traverseTimer <= 0 && traversals.length < 1) {
        traverseTimer = rand(420, 760);
        spawnTraversal();
      }

      for (let e = traversals.length - 1; e >= 0; e--) {
        const ev = traversals[e];
        ev.life += 1;
        const ratio = ev.life / ev.maxLife;
        if (ratio >= 1) {
          traversals.splice(e, 1);
          continue;
        }

        ev.x += ev.vx * currentSpeedScale;
        ev.y += ev.vy * currentSpeedScale - parallaxStep * 0.55;

        const env = Math.sin(ratio * Math.PI);
        const dx = ev.x - pointerX * 20;
        const dy = ev.y - pointerY * 12;
        const alpha =
          ev.maxAlpha * env * currentOpacityScale * getSpatialAttenuation(dx, dy, "NEAR");
        drawParticleShape(dx, dy, ev.size, ev.isGold ? GOLD : OFFWHITE, alpha, "NEAR", true);
      }

      // =========================================================
      // 4. RARE EVENT B — small group gathers, organizes, separates slowly
      // =========================================================
      gatherTimer -= mod.activity;
      if (gatherTimer <= 0 && gathers.length < 1) {
        gatherTimer = rand(780, 1260);
        spawnGather();
      }

      for (let g = gathers.length - 1; g >= 0; g--) {
        const ge = gathers[g];
        ge.life += 1;
        const ratio = ge.life / ge.maxLife;
        if (ratio >= 1) {
          gathers.splice(g, 1);
          continue;
        }

        ge.cy += ge.vy * currentSpeedScale - parallaxStep * 0.4;
        ge.rotation += 0.0035 * currentSpeedScale;

        const fade = ratio < 0.14 ? ratio / 0.14 : ratio > 0.82 ? (1 - ratio) / 0.18 : 1;
        const gx = ge.cx - pointerX * 12;
        const gy = ge.cy - pointerY * 7;
        const baseA = 0.34 * fade * currentOpacityScale * getSpatialAttenuation(gx, gy, "MID");
        if (baseA <= 0.01) continue;

        const rc = Math.cos(ge.rotation);
        const rs = Math.sin(ge.rotation);

        for (let m = 0; m < ge.members.length; m++) {
          const mem = ge.members[m];
          let ox: number;
          let oy: number;
          if (ratio < 0.38) {
            const t = easeInOut(ratio / 0.38);
            ox = mem.sx + (mem.fx - mem.sx) * t;
            oy = mem.sy + (mem.fy - mem.sy) * t;
          } else if (ratio < 0.62) {
            ox = mem.fx;
            oy = mem.fy;
          } else {
            const t = easeInOut((ratio - 0.62) / 0.38);
            ox = mem.fx + (mem.ex - mem.fx) * t;
            oy = mem.fy + (mem.ey - mem.fy) * t;
          }
          const rx = ox * rc - oy * rs;
          const ry = ox * rs + oy * rc;

          const a = Math.min(0.42, baseA * (mem.isGold ? 1.1 : 0.85));
          ctx.fillStyle = `rgba(${mem.isGold ? GOLD : OFFWHITE}, ${a.toFixed(3)})`;
          ctx.fillRect(
            Math.round(gx + rx - mem.size * 0.5),
            Math.round(gy + ry - mem.size * 0.5),
            mem.size,
            mem.size
          );
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    if (hasFinePointer) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] w-full h-full bg-transparent"
    />
  );
};
