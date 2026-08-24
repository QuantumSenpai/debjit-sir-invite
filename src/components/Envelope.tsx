"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import RippleRing from "@/components/animations/RippleRing";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isStriking, setIsStriking] = useState(false);
  const [showRipples, setShowRipples] = useState(false);
  const [strikeOrigin, setStrikeOrigin] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleStrike = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (isStriking) return;
    setIsStriking(true);

    if ("clientX" in e && e.clientX > 0 && e.clientY > 0) {
      setStrikeOrigin({ x: e.clientX, y: e.clientY });
    } else if ("touches" in e && e.touches.length > 0) {
      setStrikeOrigin({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else {
      setStrikeOrigin(null);
    }

    setShowRipples(true);

    // Dissolve into Letter view after acoustic ripple soundwave expands
    setTimeout(() => {
      onOpen();
    }, 750);
  };

  return (
    <motion.main
      className="absolute inset-0 w-full min-h-screen flex flex-col items-center justify-center px-6 z-20 select-none cursor-pointer overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.65, ease: [0.25, 1, 0.35, 1] },
      }}
      onClick={handleStrike}
      role="button"
      tabIndex={0}
      aria-label={content.unlockLabel}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleStrike(e);
        }
      }}
    >
      {/* Soundwave Concentric Ripple Rings on Bowl Strike */}
      <RippleRing trigger={showRipples} origin={strikeOrigin} />

      <div className="w-full max-w-[360px] sm:max-w-[420px] flex flex-col items-center">
        {/* Eyebrow Label Above Singing Bowl in Soft Sage */}
        <motion.p
          className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase mb-8 text-center"
          style={{ color: content.theme.softSage }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {content.eyebrowLabel}
        </motion.p>

        {/* Singing Bowl Circular Glass-Soft Disc */}
        <motion.div
          className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full flex items-center justify-center transition-shadow duration-500 hover:shadow-2xl"
          style={{
            backgroundColor: "rgba(168, 162, 154, 0.60)",
            backdropFilter: "blur(22px) saturate(140%)",
            WebkitBackdropFilter: "blur(22px) saturate(140%)",
            boxShadow: `
              0 24px 64px -12px rgba(185, 143, 98, 0.28),
              0 8px 24px -4px rgba(74, 63, 51, 0.16),
              inset 0 1px 1.5px 0 rgba(250, 246, 239, 0.7)
            `,
          }}
          animate={
            isStriking
              ? {
                  scale: 1.3,
                  opacity: 0,
                  filter: "blur(10px)",
                }
              : {
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }
          }
          transition={
            isStriking
              ? { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.5 }
          }
        >
          {/* Gradient-Stroke Rim: sandBeige to softSage */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 260 260"
            fill="none"
          >
            <defs>
              <linearGradient
                id="singingBowlRimGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={content.theme.sandBeige} stopOpacity="0.9" />
                <stop offset="50%" stopColor={content.theme.cream} stopOpacity="0.6" />
                <stop offset="100%" stopColor={content.theme.softSage} stopOpacity="0.9" />
              </linearGradient>
              <radialGradient
                id="singingBowlInnerAura"
                cx="50%"
                cy="50%"
                r="50%"
              >
                <stop offset="0%" stopColor={content.theme.cream} stopOpacity="0.35" />
                <stop offset="65%" stopColor={content.theme.sandBeige} stopOpacity="0.15" />
                <stop offset="100%" stopColor={content.theme.stoneGray} stopOpacity="0.4" />
              </radialGradient>
            </defs>

            {/* Outer Rim Stroke */}
            <circle
              cx="130"
              cy="130"
              r="128"
              stroke="url(#singingBowlRimGrad)"
              strokeWidth="1.5"
            />

            {/* Inner Concentric Turned Metal Lathe Rings (Bowl Depth) */}
            <circle
              cx="130"
              cy="130"
              r="112"
              stroke={content.theme.cream}
              strokeWidth="0.8"
              strokeOpacity="0.45"
            />
            <circle
              cx="130"
              cy="130"
              r="94"
              stroke={content.theme.sandBeige}
              strokeWidth="0.9"
              strokeOpacity="0.4"
            />
            <circle
              cx="130"
              cy="130"
              r="74"
              stroke={content.theme.softSage}
              strokeWidth="0.8"
              strokeDasharray="2 3"
              strokeOpacity="0.5"
            />
            <circle
              cx="130"
              cy="130"
              r="52"
              fill="url(#singingBowlInnerAura)"
              stroke={content.theme.sandBeige}
              strokeWidth="0.75"
              strokeOpacity="0.3"
            />
          </svg>

          {/* Centered Mallet & Resonance Dot Icon with Slow 4s Breathing Pulse */}
          <motion.div
            className="relative flex flex-col items-center justify-center z-10 pointer-events-none"
            animate={{
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Minimal Zen Mallet / Strikepoint Emblem */}
            <svg
              viewBox="0 0 48 48"
              className="w-10 h-10 sm:w-12 sm:h-12"
              fill="none"
              stroke={content.theme.deepBark}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Outer Zen Ring */}
              <circle
                cx="24"
                cy="24"
                r="20"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                stroke={content.theme.deepBark}
                strokeOpacity="0.45"
              />
              {/* Inner Resonator Core */}
              <circle
                cx="24"
                cy="24"
                r="10"
                strokeWidth="1.4"
                stroke={content.theme.deepBark}
              />
              {/* Center Dot Mallet Strike Point */}
              <circle
                cx="24"
                cy="24"
                r="3.5"
                fill={content.theme.deepBark}
              />
              {/* Vertical Balance Axis */}
              <line
                x1="24"
                y1="6"
                x2="24"
                y2="11"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
              <line
                x1="24"
                y1="37"
                x2="24"
                y2="42"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Unlock Label Below in Light Serif Italic */}
        <motion.p
          className="mt-8 text-sm sm:text-base text-center font-serif-heading italic font-normal tracking-wide"
          style={{ color: content.theme.deepBark, opacity: 0.85 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {content.unlockLabel}
        </motion.p>
      </div>
    </motion.main>
  );
}
