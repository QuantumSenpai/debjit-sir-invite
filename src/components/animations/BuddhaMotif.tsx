"use client";

import React, { useSyncExternalStore } from "react";
import { motion, type Transition } from "framer-motion";
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

/**
 * Three line-art lotus-petal / mandala-dot icons enclosed in a connected pill bar
 * with a serene, staggered breathing scale/opacity pulse.
 */
export function BuddhaMotifDivider({ className = "" }: { className?: string }) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const pulseTransition = (delay: number): Transition => ({
    duration: 3.6,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  });

  const motifs = [
    {
      id: "left",
      delay: 0,
      size: 16,
      svg: (
        <svg
          viewBox="0 0 20 20"
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10"
          fill="none"
          stroke={content.theme.lightOakWood}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 3 C6 7 5 13 10 17 C15 13 14 7 10 3 Z" strokeOpacity="0.8" />
          <circle cx="10" cy="10" r="1.5" fill={content.theme.softSage} />
        </svg>
      ),
    },
    {
      id: "center",
      delay: 0.45,
      size: 20,
      svg: (
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 relative z-10"
          fill="none"
          stroke={content.theme.lightOakWood}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" strokeWidth="1.2" strokeOpacity="0.9" />
          <circle cx="12" cy="12" r="5.5" strokeWidth="0.9" strokeDasharray="2 2" strokeOpacity="0.65" />
          <line x1="12" y1="3" x2="12" y2="21" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="3" y1="12" x2="21" y2="12" strokeWidth="0.8" strokeOpacity="0.5" />
          <circle cx="12" cy="12" r="2.2" fill={content.theme.deepBark} />
        </svg>
      ),
    },
    {
      id: "right",
      delay: 0.9,
      size: 16,
      svg: (
        <svg
          viewBox="0 0 20 20"
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10"
          fill="none"
          stroke={content.theme.lightOakWood}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 3 C6 7 5 13 10 17 C15 13 14 7 10 3 Z" strokeOpacity="0.8" />
          <circle cx="10" cy="10" r="1.5" fill={content.theme.softSage} />
        </svg>
      ),
    },
  ];

  if (reducedMotion) {
    return (
      <div
        className={`relative inline-flex items-center justify-center px-4 py-1 sm:px-5 sm:py-1.5 rounded-full gap-3 sm:gap-4 ${className}`}
        style={{
          backgroundColor: "rgba(241, 233, 221, 0.75)",
          border: `1px solid ${content.theme.sandBeige}80`,
          boxShadow: "inset 0 1px 1.5px rgba(74, 63, 51, 0.05)",
        }}
      >
        <div
          className="absolute left-4 right-4 h-[1px] top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: content.theme.lightOakWood, opacity: 0.4 }}
        />
        {motifs.map((m) => (
          <div key={m.id} className="flex items-center justify-center opacity-85">
            {m.svg}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center px-4 py-1 sm:px-5 sm:py-1.5 rounded-full gap-3 sm:gap-4 ${className}`}
      style={{
        backgroundColor: "rgba(241, 233, 221, 0.75)",
        border: `1px solid ${content.theme.sandBeige}80`,
        boxShadow: "inset 0 1px 1.5px rgba(74, 63, 51, 0.05)",
      }}
    >
      {/* Connecting subtle horizontal hairline bar */}
      <div
        className="absolute left-4 right-4 h-[1px] top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ backgroundColor: content.theme.lightOakWood, opacity: 0.4 }}
      />
      {motifs.map((m) => (
        <motion.div
          key={m.id}
          className="flex items-center justify-center will-change-transform"
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={pulseTransition(m.delay)}
        >
          {m.svg}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Floating line-art lotus glyph for the footer.
 * Renders with a subtle idle vertical drift loop.
 */
export function BuddhaLotusGlyph({ className = "" }: { className?: string }) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const svgContent = (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0"
      fill="none"
      stroke={content.theme.softSage}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4 C10.5 8 11 15 12 18 C13 15 13.5 8 12 4 Z" fill={content.theme.softSage} fillOpacity="0.18" />
      <path d="M12 18 C9.5 15 6 11 8 7 C10 9.5 11 14 12 18 Z" />
      <path d="M12 18 C14.5 15 18 11 16 7 C14 9.5 13 14 12 18 Z" />
      <path d="M6 18.5 Q12 21 18 18.5" strokeWidth="1.2" strokeOpacity="0.75" />
    </svg>
  );

  if (reducedMotion) {
    return <span className={`inline-flex items-center ${className}`}>{svgContent}</span>;
  }

  return (
    <motion.span
      className={`inline-flex items-center will-change-transform ${className}`}
      animate={{
        y: [0, -3, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {svgContent}
    </motion.span>
  );
}

export default BuddhaMotifDivider;
