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

// Strict palette adherence: oak, background, sage
const SPARKLE_COLORS = [
  content.theme.oak,
  content.theme.background,
  content.theme.sage,
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
  count = 14,
  minRadius = 50,
  maxRadius = 110,
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
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, reducedMotion, onComplete]);

  const particles: SparkleParticle[] = useMemo(() => {
    if (!active) return [];
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * (Math.PI * 2) + ((i * 19) % 11) * 0.08;
      const distance =
        minRadius + (((i * 23) % 13) / 13) * (maxRadius - minRadius);
      const size = 8 + ((i * 17) % 10); // 8px to 17px
      const rotate = (((i * 71) % 360) - 180) * 1.5;
      const delay = (((i * 31) % 10) / 10) * 0.08; // 0 to 0.08s stagger
      const duration = 0.75 + (((i * 13) % 5) / 5) * 0.2; // 0.75s to 0.95s
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
                scale: [0, 1.2, 1, 0],
                opacity: [0, 1, 1, 0.85, 0],
                rotate: p.rotate,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                times: [0, 0.15, 0.7, 0.85, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: p.size, height: p.size }}
                fill={p.color}
                className="drop-shadow-[0_1px_4px_rgba(200,153,104,0.4)]"
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
