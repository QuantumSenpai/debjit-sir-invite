"use client";

import React from "react";
import { content } from "@/data/content";

export default function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ backgroundColor: content.theme.background }}
      aria-hidden="true"
    >
      {/* 1. Corner Subtle Sage Ambient Blurs */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full"
        style={{
          backgroundColor: content.theme.sage,
          opacity: 0.08,
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full"
        style={{
          backgroundColor: content.theme.sage,
          opacity: 0.08,
          filter: "blur(80px)",
        }}
      />

      {/* 2. Top-Left Corner: Minimal Seated Buddha Silhouette Outline (Desktop Only) */}
      <div className="hidden md:block absolute top-10 left-12 w-20 h-24 animate-float-slow-1 opacity-14">
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full"
          fill="none"
          stroke={content.theme.sage}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Gentle halo */}
          <circle cx="50" cy="35" r="22" strokeDasharray="2 3" opacity="0.6" />
          {/* Head & Ushnisha */}
          <path d="M50 18 C48 18 46 21 46 24 C44 26 42 28 42 33 C42 39 46 44 50 44 C54 44 58 39 58 33 C58 28 56 26 54 24 C54 21 52 18 50 18 Z" />
          {/* Shoulders and Torso */}
          <path d="M46 46 C38 50 30 56 26 66 C23 74 24 84 26 94 C28 97 33 97 38 95 C42 93 45 86 46 80" />
          <path d="M54 46 C62 50 70 56 74 66 C77 74 76 84 74 94 C72 97 67 97 62 95 C58 93 55 86 54 80" />
          {/* Lotus Posture Base */}
          <path d="M22 94 C16 97 12 104 20 108 C32 108 42 104 50 104 C58 104 68 108 80 108 C88 104 84 97 78 94 C72 102 62 106 50 106 C38 106 28 102 22 94 Z" />
        </svg>
      </div>

      {/* 3. Bottom-Left Corner: Lotus Flower Outline (Visible on Mobile & Desktop) */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-14 w-16 h-16 md:w-20 md:h-20 animate-pulse-lotus">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          stroke={content.theme.sage}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Central Petal */}
          <path d="M50 22 C44 36 46 64 50 76 C54 64 56 36 50 22 Z" />
          {/* Inner Petals */}
          <path d="M50 76 C42 66 32 50 36 34 C44 44 48 60 50 76 Z" />
          <path d="M50 76 C58 66 68 50 64 34 C56 44 52 60 50 76 Z" />
          {/* Outer Petals */}
          <path d="M50 76 C34 74 18 62 22 46 C32 54 44 68 50 76 Z" />
          <path d="M50 76 C66 74 82 62 78 46 C68 54 56 68 50 76 Z" />
          {/* Base Calyx */}
          <path d="M28 78 Q50 85 72 78" strokeDasharray="2 3" />
        </svg>
      </div>

      {/* 4. Bottom-Right Corner: Mandala / Dharma Wheel with 85s Slow Rotation (Visible on Mobile & Desktop) */}
      <div className="absolute -bottom-8 -right-8 md:bottom-8 md:right-10 w-36 h-36 md:w-44 md:h-44 animate-spin-slow opacity-12">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          stroke={content.theme.oak}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="100" cy="100" r="88" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="76" />
          <circle cx="100" cy="100" r="44" strokeDasharray="2 3" />
          <circle cx="100" cy="100" r="16" />
          <circle cx="100" cy="100" r="4" fill={content.theme.oak} fillOpacity="0.3" />
          <line x1="100" y1="12" x2="100" y2="188" />
          <line x1="12" y1="100" x2="188" y2="100" />
          <line x1="38" y1="38" x2="162" y2="162" />
          <line x1="38" y1="162" x2="162" y2="38" />
        </svg>
      </div>

      {/* 5. Top-Right Corner: 4-Pointed Sparkle Star Accent with Slow Float */}
      <div className="absolute top-10 right-10 md:top-14 md:right-16 w-8 h-8 md:w-10 md:h-10 animate-float-slow-2 opacity-14">
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
          fill={content.theme.oak}
        >
          <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
        </svg>
      </div>

      {/* 6. Mid-Left Edge: Secondary Sparkle Accent (Desktop Only) */}
      <div className="hidden md:block absolute top-1/2 -translate-y-12 left-10 w-6 h-6 animate-float-slow-2 opacity-12">
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
          fill={content.theme.oak}
        >
          <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
        </svg>
      </div>

      {/* 7. Mid-Right Edge: Endless Knot Motif (Desktop Only) */}
      <div className="hidden md:block absolute top-1/2 -translate-y-12 right-12 w-12 h-12 animate-float-slow-1 opacity-12">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          stroke={content.theme.sage}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M50 16 L74 40 L60 54 L74 68 L50 92 L26 68 L40 54 L26 40 Z" />
          <path d="M50 34 L64 48 L50 62 L36 48 Z" />
          <path d="M36 30 L64 30 L50 44 Z" />
          <path d="M36 66 L64 66 L50 52 Z" />
        </svg>
      </div>
    </div>
  );
}
