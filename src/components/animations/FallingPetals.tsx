"use client";

import React, { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";

interface PetalConfig {
  id: number;
  startX: number;
  drift: number;
  size: number;
  duration: number;
  delay: number;
  rotateDirection: number;
  color: string;
}

const PETAL_COLORS = [
  content.theme.sandBeige,
  content.theme.softSage,
  content.theme.lightOakWood,
  content.theme.cream,
];

const PETALS: PetalConfig[] = [
  { id: 1, startX: 8, drift: 35, size: 14, duration: 11, delay: 0, rotateDirection: 1, color: PETAL_COLORS[0] },
  { id: 2, startX: 20, drift: -45, size: 12, duration: 13, delay: 2.5, rotateDirection: -1, color: PETAL_COLORS[1] },
  { id: 3, startX: 35, drift: 50, size: 16, duration: 9.5, delay: 1, rotateDirection: 1, color: PETAL_COLORS[2] },
  { id: 4, startX: 50, drift: -30, size: 11, duration: 14, delay: 4, rotateDirection: -1, color: PETAL_COLORS[3] },
  { id: 5, startX: 62, drift: 40, size: 15, duration: 10.5, delay: 0.5, rotateDirection: 1, color: PETAL_COLORS[0] },
  { id: 6, startX: 75, drift: -55, size: 13, duration: 12.5, delay: 3, rotateDirection: -1, color: PETAL_COLORS[1] },
  { id: 7, startX: 88, drift: 35, size: 17, duration: 11.5, delay: 1.8, rotateDirection: 1, color: PETAL_COLORS[2] },
  { id: 8, startX: 95, drift: -40, size: 12, duration: 13.5, delay: 5, rotateDirection: -1, color: PETAL_COLORS[3] },
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

export default function FallingPetals() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-12 left-10 opacity-30"
          style={{ width: 14, height: 14 }}
        >
          <svg viewBox="0 0 24 24" fill={PETAL_COLORS[0]}>
            <path d="M12 2C8 6 6 12 12 22C18 12 16 6 12 2Z" />
          </svg>
        </div>
        <div
          className="absolute bottom-20 right-12 opacity-30"
          style={{ width: 16, height: 16 }}
        >
          <svg viewBox="0 0 24 24" fill={PETAL_COLORS[2]}>
            <path d="M12 2C8 6 6 12 12 22C18 12 16 6 12 2Z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {PETALS.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.startX}%`,
            top: "-5vh",
            willChange: "transform",
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, p.drift, 0, -p.drift * 0.7, 0],
            rotate: [0, p.rotateDirection * 180, p.rotateDirection * 360],
            opacity: [0, 0.55, 0.55, 0.45, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
            times: [0, 0.15, 0.5, 0.85, 1],
          }}
        >
          <svg
            viewBox="0 0 24 24"
            style={{ width: p.size, height: p.size }}
            fill={p.color}
            className="drop-shadow-sm"
          >
            <path d="M12 2C7.5 5.5 5.5 12 12 22C18.5 12 16.5 5.5 12 2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
