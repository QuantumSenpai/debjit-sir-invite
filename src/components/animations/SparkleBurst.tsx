"use client";

import React, { useEffect, useState, useMemo, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
  color: string;
}

interface SparkleBurstProps {
  trigger: boolean;
  count?: number;
  minRadius?: number;
  maxRadius?: number;
  origin?: { x: number; y: number } | null;
  className?: string;
  onComplete?: () => void;
}

const SPARKLE_COLORS = [
  content.theme.oak, // #C89968
  "#E8B872", // Bright amber gold
  "#F5D7A1", // Luminous light gold
  "#FFF5E4", // Warm white gold
  content.theme.background, // Parchment white
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

export default function SparkleBurst({
  trigger,
  count = 16,
  minRadius = 60,
  maxRadius = 120,
  origin = null,
  className = "",
  onComplete,
}: SparkleBurstProps) {
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
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [trigger, reducedMotion, onComplete]);

  const particles: SparkleParticle[] = useMemo(() => {
    if (!active) return [];
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * (Math.PI * 2) + ((i * 19) % 11) * 0.08;
      const distance =
        minRadius + (((i * 23) % 13) / 13) * (maxRadius - minRadius);
      const size = 9 + ((i * 17) % 12); // 9px to 20px
      const rotate = (((i * 71) % 360) - 180) * 1.5; // -270deg to +270deg
      const delay = (((i * 31) % 10) / 10) * 0.1; // 0 to 0.1s stagger
      const duration = 0.85 + (((i * 13) % 5) / 5) * 0.25; // 0.85s to 1.1s
      const color = SPARKLE_COLORS[i % SPARKLE_COLORS.length];

      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size,
        rotate,
        delay,
        duration,
        color,
      };
    });
  }, [active, count, minRadius, maxRadius]);

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
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
              }}
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: p.x,
                y: p.y,
                scale: [0, 1.25, 1, 0],
                opacity: [0, 1, 1, 0.9, 0],
                rotate: p.rotate,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                times: [0, 0.15, 0.7, 0.88, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: p.size, height: p.size }}
                fill={p.color}
                className="drop-shadow-[0_2px_8px_rgba(232,184,114,0.65)]"
              >
                <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
