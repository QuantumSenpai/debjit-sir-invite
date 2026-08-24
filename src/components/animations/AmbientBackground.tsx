"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { content } from "@/data/content";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isFinePointer || !containerRef.current) return;

    const el = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty("--mouse-x", `${e.clientX}px`);
        el.style.setProperty("--mouse-y", `${e.clientY}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center linen-texture"
      style={{
        backgroundColor: content.theme.oatMilk,
        // @ts-expect-error CSS Custom Properties for cursor spotlight
        "--mouse-x": "50vw",
        "--mouse-y": "50vh",
      }}
      aria-hidden="true"
    >
      {/* 1. Large, Very Slow Radial Color Washes (90s-120s) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Wash 1: Sand Beige */}
        <div
          className={`absolute -top-[25%] -left-[15%] w-[130vw] h-[130vh] rounded-full filter blur-[90px] md:blur-[140px] opacity-40 ${
            reducedMotion ? "" : "animate-wash-1"
          }`}
          style={{
            background: `radial-gradient(ellipse at center, ${content.theme.sandBeige} 0%, transparent 65%)`,
          }}
        />

        {/* Wash 2: Soft Sage */}
        <div
          className={`absolute -bottom-[20%] -right-[15%] w-[120vw] h-[120vh] rounded-full filter blur-[90px] md:blur-[130px] opacity-35 ${
            reducedMotion ? "" : "animate-wash-2"
          }`}
          style={{
            background: `radial-gradient(ellipse at center, ${content.theme.softSage} 0%, transparent 60%)`,
          }}
        />

        {/* Wash 3: Light Oak Wood (Center subtle warm aura) */}
        <div
          className={`absolute top-[20%] left-[10%] w-[100vw] h-[100vh] rounded-full filter blur-[100px] md:blur-[150px] opacity-25 ${
            reducedMotion ? "" : "animate-wash-3"
          }`}
          style={{
            background: `radial-gradient(ellipse at center, ${content.theme.lightOakWood} 0%, transparent 55%)`,
          }}
        />
      </div>

      {/* 2. Desktop-Only Cursor-Reactive Soft Sage Glow (~180px radius, rAF-throttled) */}
      {!reducedMotion && (
        <div
          className="hidden md:block absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), ${content.theme.softSage}28 0%, transparent 100%)`,
          }}
        />
      )}

      {/* 3A. Primary Outer Mandala (200s slow clockwise rotation, 5% opacity) */}
      <div
        className={`absolute top-1/2 left-1/2 w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] md:w-[780px] md:h-[780px] opacity-[0.048] pointer-events-none ${
          reducedMotion ? "-translate-x-1/2 -translate-y-1/2" : "animate-mandala-slow"
        }`}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          fill="none"
          stroke={content.theme.deepBark}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Concentric Geometric Rings */}
          <circle cx="200" cy="200" r="190" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="200" cy="200" r="172" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="150" strokeWidth="0.8" strokeDasharray="3 4" />
          <circle cx="200" cy="200" r="126" strokeWidth="1" />
          <circle cx="200" cy="200" r="98" strokeWidth="0.9" strokeDasharray="2 3" />
          <circle cx="200" cy="200" r="70" strokeWidth="1.1" />
          <circle cx="200" cy="200" r="42" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="14" strokeWidth="1.2" />

          {/* 12-Fold Sacred Radial Axis Spokes */}
          <line x1="200" y1="10" x2="200" y2="390" strokeWidth="0.8" />
          <line x1="10" y1="200" x2="390" y2="200" strokeWidth="0.8" />
          <line x1="65" y1="65" x2="335" y2="335" strokeWidth="0.7" strokeDasharray="3 3" />
          <line x1="65" y1="335" x2="335" y2="65" strokeWidth="0.7" strokeDasharray="3 3" />

          {/* Harmonious Lotus Petal Ripples */}
          <path d="M200 70 C185 110 185 150 200 170 C215 150 215 110 200 70 Z" strokeWidth="0.8" />
          <path d="M200 330 C185 290 185 250 200 230 C215 250 215 290 200 330 Z" strokeWidth="0.8" />
          <path d="M70 200 C110 185 150 185 170 200 C150 215 110 215 70 200 Z" strokeWidth="0.8" />
          <path d="M330 200 C290 185 250 185 230 200 C250 215 290 215 330 200 Z" strokeWidth="0.8" />
        </svg>
      </div>

      {/* 3B. Secondary Concentric Mandala Ring (72s counter-rotation, 5.5% opacity, near-subliminal) */}
      <div
        className={`absolute top-1/2 left-1/2 w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[560px] md:h-[560px] opacity-[0.055] pointer-events-none ${
          reducedMotion ? "-translate-x-1/2 -translate-y-1/2" : "animate-mandala-ring-2"
        }`}
      >
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          fill="none"
          stroke={content.theme.lightOakWood}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Inner Concentric Fine Rings */}
          <circle cx="150" cy="150" r="140" strokeWidth="1.2" strokeDasharray="3 5" />
          <circle cx="150" cy="150" r="118" strokeWidth="1" />
          <circle cx="150" cy="150" r="88" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="150" cy="150" r="58" strokeWidth="1.1" />
          <circle cx="150" cy="150" r="28" strokeWidth="0.9" />

          {/* 8-Point Dharma Radiant Lines */}
          <line x1="150" y1="32" x2="150" y2="268" strokeWidth="0.75" />
          <line x1="32" y1="150" x2="268" y2="150" strokeWidth="0.75" />
          <line x1="67" y1="67" x2="233" y2="233" strokeWidth="0.65" strokeDasharray="2 2" />
          <line x1="67" y1="233" x2="233" y2="67" strokeWidth="0.65" strokeDasharray="2 2" />

          {/* Radial Lotus Seed Pod Nodules */}
          <circle cx="150" cy="92" r="3" fill={content.theme.lightOakWood} />
          <circle cx="150" cy="208" r="3" fill={content.theme.lightOakWood} />
          <circle cx="92" cy="150" r="3" fill={content.theme.lightOakWood} />
          <circle cx="208" cy="150" r="3" fill={content.theme.lightOakWood} />
          <circle cx="109" cy="109" r="2.5" fill={content.theme.softSage} />
          <circle cx="191" cy="191" r="2.5" fill={content.theme.softSage} />
          <circle cx="109" cy="191" r="2.5" fill={content.theme.softSage} />
          <circle cx="191" cy="109" r="2.5" fill={content.theme.softSage} />
        </svg>
      </div>

      {/* 4. 5-6 Faint Dust-Mote Circles Drifting in 12-18s Loops */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Mote 1 */}
          <div
            className="absolute top-[18%] left-[14%] w-2 h-2 rounded-full animate-mote-1"
            style={{
              backgroundColor: content.theme.lightOakWood,
              boxShadow: `0 0 8px ${content.theme.lightOakWood}`,
            }}
          />
          {/* Mote 2 */}
          <div
            className="absolute top-[32%] right-[18%] w-2.5 h-2.5 rounded-full animate-mote-2"
            style={{
              backgroundColor: content.theme.softSage,
              boxShadow: `0 0 10px ${content.theme.softSage}`,
            }}
          />
          {/* Mote 3 */}
          <div
            className="absolute bottom-[24%] left-[22%] w-1.5 h-1.5 rounded-full animate-mote-3"
            style={{
              backgroundColor: content.theme.sandBeige,
              boxShadow: `0 0 6px ${content.theme.sandBeige}`,
            }}
          />
          {/* Mote 4 */}
          <div
            className="absolute bottom-[36%] right-[25%] w-2 h-2 rounded-full animate-mote-1"
            style={{
              backgroundColor: content.theme.cream,
              boxShadow: `0 0 8px ${content.theme.cream}`,
              animationDelay: "3.5s",
            }}
          />
          {/* Mote 5 */}
          <div
            className="absolute top-[68%] left-[48%] w-1.5 h-1.5 rounded-full animate-mote-2"
            style={{
              backgroundColor: content.theme.softSage,
              boxShadow: `0 0 6px ${content.theme.softSage}`,
              animationDelay: "6s",
            }}
          />
          {/* Mote 6 */}
          <div
            className="absolute top-[12%] right-[38%] w-2 h-2 rounded-full animate-mote-3"
            style={{
              backgroundColor: content.theme.lightOakWood,
              boxShadow: `0 0 8px ${content.theme.lightOakWood}`,
              animationDelay: "2s",
            }}
          />
        </div>
      )}

      {/* 5. Fine Grain Overlay 3-4% */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
