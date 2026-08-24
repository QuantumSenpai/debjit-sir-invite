"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import SparkleBurst from "@/components/animations/SparkleBurst";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [tapOrigin, setTapOrigin] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleTap = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (isOpening) return;
    setIsOpening(true);

    if ("clientX" in e && e.clientX > 0 && e.clientY > 0) {
      setTapOrigin({ x: e.clientX, y: e.clientY });
    } else if ("touches" in e && e.touches.length > 0) {
      setTapOrigin({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else {
      setTapOrigin(null);
    }

    setShowSparkles(true);

    // Smooth fade and scale handoff to reveal Letter after energetic sparkle burst
    setTimeout(() => {
      onOpen();
    }, 480);
  };

  return (
    <motion.main
      className="absolute inset-0 w-full min-h-screen flex flex-col items-center justify-center px-5 z-20 select-none cursor-pointer overflow-hidden"
      style={{
        background: `radial-gradient(circle at 15% 15%, rgba(138, 150, 131, 0.15) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(200, 153, 104, 0.12) 0%, transparent 55%), ${content.theme.background}`,
      }}
      initial={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.96,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
      }}
      onClick={handleTap}
      role="button"
      tabIndex={0}
      aria-label={content.envelopeInstruction}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleTap(e);
        }
      }}
    >
      {/* High-Impact Click Sparkle Burst from Tap Coordinates */}
      <SparkleBurst
        trigger={showSparkles}
        count={18}
        minRadius={60}
        maxRadius={130}
        origin={tapOrigin}
      />

      <div className="w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center">
        {/* Eyebrow Label Above Envelope */}
        <motion.p
          className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-5 text-center"
          style={{ color: content.theme.sage }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {content.envelopeEyebrow}
        </motion.p>

        {/* Minimal Solid Flat-Color Envelope */}
        <div className="relative w-full aspect-[16/11] flex items-center justify-center">
          {/* Envelope Card Structure with Soft Lift Shadow */}
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden"
            style={{
              backgroundColor: content.theme.sage,
              boxShadow: `0 16px 36px -8px rgba(30, 51, 44, 0.22), 0 4px 12px rgba(30, 51, 44, 0.08)`,
            }}
          >
            {/* Flat Envelope Body Folds */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 380 260"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Lower Body Polygons */}
              <polygon
                points="0,260 380,260 190,130"
                fill={content.theme.sage}
                opacity="0.94"
              />
              <polygon
                points="0,0 0,260 190,130"
                fill={content.theme.sage}
                opacity="0.88"
              />
              <polygon
                points="380,0 380,260 190,130"
                fill={content.theme.sage}
                opacity="0.91"
              />

              {/* Clean Geometric Triangle Flap Meeting at Center */}
              <polygon
                points="0,0 380,0 190,132"
                fill={content.theme.sage}
              />

              {/* Delicate Fold Seam Accent Lines */}
              <line
                x1="0"
                y1="0"
                x2="190"
                y2="132"
                stroke={content.theme.background}
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />
              <line
                x1="380"
                y1="0"
                x2="190"
                y2="132"
                stroke={content.theme.background}
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />
            </svg>

            {/* Center Circle Button with 4-Pointed Sparkle Star */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <motion.div
                className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: content.theme.oak,
                  border: `2px solid ${content.theme.background}`,
                  boxShadow: `0 4px 18px rgba(200, 153, 104, 0.45)`,
                }}
                animate={
                  isOpening
                    ? { scale: 0.75, opacity: 0 }
                    : {
                        scale: [0.97, 1.03, 0.97],
                        opacity: [0.92, 1, 0.92],
                      }
                }
                transition={
                  isOpening
                    ? { duration: 0.25, ease: "easeOut" }
                    : {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                {/* 4-Pointed Sparkle Icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-6.5 sm:h-6.5"
                  fill={content.theme.background}
                >
                  <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Small Instruction Below Envelope */}
        <motion.p
          className="mt-6 text-xs sm:text-[13px] text-center font-normal tracking-wide"
          style={{ color: content.theme.ink, opacity: 0.75 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content.envelopeInstruction}
        </motion.p>
      </div>
    </motion.main>
  );
}
