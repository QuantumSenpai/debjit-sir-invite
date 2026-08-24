"use client";

import React, { useSyncExternalStore } from "react";
import { motion, type Transition } from "framer-motion";

interface RippleRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerMs?: number;
  style?: React.CSSProperties;
}

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

export default function RippleReveal({
  text,
  className = "",
  delay = 0.1,
  staggerMs = 120,
  style,
}: RippleRevealProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const words = text.split(" ");

  if (reducedMotion) {
    return (
      <span className={`inline-block ${className}`} style={style}>
        {text}
      </span>
    );
  }

  const rippleTransition = (wordIndex: number): Transition => ({
    duration: 0.9,
    delay: delay + (wordIndex * staggerMs) / 1000,
    times: [0, 0.55, 1],
    ease: [0.25, 1, 0.35, 1],
  });

  return (
    <span
      className={`inline-flex flex-wrap justify-center items-baseline ${className}`}
      style={style}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block whitespace-nowrap will-change-transform"
          style={{ marginRight: i < words.length - 1 ? "0.28em" : 0 }}
          initial={{
            opacity: 0,
            scale: 0.94,
            filter: "blur(4px)",
          }}
          animate={{
            opacity: [0, 0.95, 1],
            scale: [0.94, 1.02, 1.0],
            filter: ["blur(4px)", "blur(1px)", "blur(0px)"],
          }}
          transition={rippleTransition(i)}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
