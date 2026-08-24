"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";

interface RippleRingProps {
  trigger: boolean;
  origin?: { x: number; y: number } | null;
  className?: string;
  onComplete?: () => void;
}

const RINGS = [
  { id: 1, maxRadius: 180, duration: 1.05, delay: 0, stroke: content.theme.sandBeige, strokeWidth: 1.5 },
  { id: 2, maxRadius: 260, duration: 1.15, delay: 0.1, stroke: content.theme.softSage, strokeWidth: 1.2 },
  { id: 3, maxRadius: 340, duration: 1.25, delay: 0.22, stroke: content.theme.sandBeige, strokeWidth: 1.0 },
  { id: 4, maxRadius: 420, duration: 1.35, delay: 0.34, stroke: content.theme.softSage, strokeWidth: 1.0 },
];

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

export default function RippleRing({
  trigger,
  origin = null,
  className = "",
  onComplete,
}: RippleRingProps) {
  const [active, setActive] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (trigger && !reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(true);
      const timer = setTimeout(() => {
        setActive(false);
        if (onComplete) onComplete();
      }, 1400);
      return () => clearTimeout(timer);
    } else if (trigger && reducedMotion) {
      if (onComplete) onComplete();
    }
  }, [trigger, reducedMotion, onComplete]);

  if (!active || reducedMotion) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          left: origin ? origin.x : "50%",
          top: origin ? origin.y : "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <AnimatePresence>
          {RINGS.map((ring) => (
            <motion.div
              key={ring.id}
              className="absolute rounded-full pointer-events-none will-change-transform"
              style={{
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
                border: `${ring.strokeWidth}px solid ${ring.stroke}`,
                boxShadow: `0 0 16px ${ring.stroke}33`,
              }}
              initial={{
                width: 24,
                height: 24,
                opacity: 0.85,
                scale: 0.3,
              }}
              animate={{
                width: ring.maxRadius * 2,
                height: ring.maxRadius * 2,
                opacity: [0.85, 0.65, 0.3, 0],
                scale: 1,
              }}
              transition={{
                duration: ring.duration,
                delay: ring.delay,
                ease: [0.2, 0.8, 0.3, 1],
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
