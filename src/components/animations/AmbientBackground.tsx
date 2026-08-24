"use client";

import React, { useEffect, useRef } from "react";
import { content } from "@/data/content";

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only bind mousemove listener on desktop/fine-pointer devices
    if (typeof window === "undefined") return;
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex flex-col justify-between items-center"
      style={{
        backgroundColor: content.theme.background,
        // Default cursor coordinates center-screen until mouse moves
        // @ts-expect-error CSS Custom Properties
        "--mouse-x": "50vw",
        "--mouse-y": "50vh",
      }}
      aria-hidden="true"
    >
      {/* 1. Fine Line Grid Texture Overlay (5% Opacity, 48px Cell Size) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200, 153, 104, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 153, 104, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* 2. Desktop Cursor-Reactive Grid Glow Spotlight (rAF Optimized, 180px Radius) */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), rgba(200, 153, 104, 0.16), transparent 80%)`,
        }}
      />

      {/* 3. Soft Ambient Corner Glow Blurs */}
      <div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full"
        style={{
          backgroundColor: content.theme.sage,
          opacity: 0.1,
          filter: "blur(75px)",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
        style={{
          backgroundColor: content.theme.oak,
          opacity: 0.1,
          filter: "blur(75px)",
        }}
      />

      {/* 4. Upper Canvas Pattern: Balanced Radiant Dharma Mandala Wheel (28% Opacity) */}
      <div className="absolute top-2 sm:top-5 md:top-8 left-1/2 -translate-x-1/2 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 animate-spin-slow opacity-28">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          stroke={content.theme.oak}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outer Ornamental Ring */}
          <circle cx="100" cy="100" r="92" strokeDasharray="3 4" opacity="0.8" />
          <circle cx="100" cy="100" r="82" strokeWidth="1.4" />
          <circle cx="100" cy="100" r="68" strokeDasharray="2 3" opacity="0.7" />

          {/* 8-Spoke Dharma Wheel Axis */}
          <line x1="100" y1="18" x2="100" y2="182" strokeWidth="1.3" />
          <line x1="18" y1="100" x2="182" y2="100" strokeWidth="1.3" />
          <line x1="42" y1="42" x2="158" y2="158" strokeWidth="1.1" strokeDasharray="4 2" />
          <line x1="42" y1="158" x2="158" y2="42" strokeWidth="1.1" strokeDasharray="4 2" />

          {/* Inner Sacred Geometry Petals */}
          <circle cx="100" cy="100" r="44" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="22" strokeWidth="1.3" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="6" fill={content.theme.oak} fillOpacity="0.4" />
        </svg>
      </div>

      {/* 5. Lower Canvas Pattern: Balanced Sacred Lotus Flower Motif (28% Opacity) */}
      <div className="absolute bottom-2 sm:bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 animate-pulse-lotus opacity-28">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          stroke={content.theme.sage}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Central Petal */}
          <path d="M50 18 C43 34 45 66 50 78 C55 66 57 34 50 18 Z" strokeWidth="1.5" />
          {/* Inner Tier Petals */}
          <path d="M50 78 C41 66 28 48 34 32 C42 42 47 62 50 78 Z" />
          <path d="M50 78 C59 66 72 48 66 32 C58 42 53 62 50 78 Z" />
          {/* Outer Tier Petals */}
          <path d="M50 78 C32 74 14 60 18 44 C30 52 43 68 50 78 Z" />
          <path d="M50 78 C68 74 86 60 82 44 C70 52 57 68 50 78 Z" />
          {/* Lotus Base Floating Pad */}
          <path d="M22 80 Q50 88 78 80" strokeDasharray="3 3" strokeWidth="1.4" />
        </svg>
      </div>
    </div>
  );
}
