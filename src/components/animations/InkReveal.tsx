"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";

interface InkRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function InkReveal({
  text,
  className = "",
  delay = 0.2,
}: InkRevealProps) {
  const maskId = useId();

  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      {/* SVG Mask Definition for Brush Stroke Reveal */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id={`ink-clip-${maskId}`} clipPathUnits="objectBoundingBox">
            <motion.rect
              x="0"
              y="0"
              height="1"
              initial={{ width: 0 }}
              animate={{ width: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.65, 0, 0.35, 1] as const,
                delay,
              }}
            />
          </clipPath>
        </defs>
      </svg>

      {/* Animated Text Container with Ink Spread effect */}
      <motion.div
        style={{
          clipPath: `url(#ink-clip-${maskId})`,
          WebkitClipPath: `url(#ink-clip-${maskId})`,
          color: content.theme.deepAnchor,
        }}
        initial={{ opacity: 0.85, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 1.2,
          ease: [0.65, 0, 0.35, 1] as const,
          delay,
        }}
        className="relative z-10 select-none"
      >
        {text}
      </motion.div>
    </div>
  );
}
