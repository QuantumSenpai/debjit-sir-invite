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

      {/* 2. Bottom-Left Corner: Minimal Lotus Flower Outline (Single Thin Line Art) */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-16 h-16 md:w-20 md:h-20 animate-pulse-lotus opacity-12">
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

      {/* 3. Bottom-Right Corner: Minimal Dharma Wheel with Slow 85s Rotation */}
      <div className="absolute -bottom-6 -right-6 md:bottom-6 md:right-8 w-32 h-32 md:w-40 md:h-40 animate-spin-slow opacity-10">
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
    </div>
  );
}
