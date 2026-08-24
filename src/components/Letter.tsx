"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { content } from "@/data/content";
import InkReveal from "@/components/animations/InkReveal";
import SparkleBurst from "@/components/animations/SparkleBurst";
import FallingPetals from "@/components/animations/FallingPetals";

export default function Letter() {
  const [nameSparkles, setNameSparkles] = useState(false);

  // Subtle GPU-accelerated scroll parallax for the atmospheric background (capped at 24px)
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 400], [0, -24], {
    clamp: true,
  });

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.97, y: 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemFade = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14 md:py-20 overflow-x-hidden">
      {/* 1. Atmospheric Buddha Photo Background Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="relative w-full h-full overflow-hidden"
          style={{ y: backgroundY, willChange: "transform" }}
          animate={{ scale: [1.0, 1.03, 1.0] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/buddha-hero.jpg"
            alt={content.appTitle}
            fill
            quality={65}
            sizes="100vw"
            priority
            className="object-cover"
            style={{
              objectPosition: "center 20%",
              filter: "blur(1.5px) saturate(0.8) contrast(1.05)",
              opacity: 0.36,
            }}
          />

          {/* Radial Gradient Overlay: Clear Center, Soft Sage/Anchor Frame at Edges */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 28%, transparent 25%, rgba(30, 51, 44, 0.2) 65%, rgba(30, 51, 44, 0.35) 100%)`,
            }}
          />

          {/* Parchment Edge Blend */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(242, 234, 224, 0.2) 0%, transparent 20%, transparent 80%, rgba(242, 234, 224, 0.8) 100%)`,
            }}
          />
        </motion.div>
      </div>

      {/* 2. Ambient Falling Blossom Petals Layer (Z-1) */}
      <FallingPetals />

      {/* 3. Main Letter Card - Generously Expanded (65-75% Viewport Height Footprint) */}
      <motion.main
        className="relative z-10 w-full max-w-[440px] sm:max-w-xl md:max-w-2xl mx-auto my-auto transition-transform duration-300 ease-out hover:scale-[1.008]"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => {
          // Trigger a subtle 4-particle sparkle burst around the name after card settles
          setTimeout(() => setNameSparkles(true), 400);
        }}
      >
        {/* Outer Frame Container with Soft Drop Shadow & Rounded-3xl Silhouette */}
        <div
          className="w-full rounded-3xl p-3 sm:p-4 md:p-5"
          style={{
            backgroundColor: "rgba(242, 234, 224, 0.97)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: `1px solid ${content.theme.sage}75`,
            boxShadow: `0 24px 56px -12px rgba(30, 51, 44, 0.22), 0 8px 24px rgba(30, 51, 44, 0.08)`,
          }}
        >
          {/* Inset Inner Frame Container with Generous 20-24px Vertical Rhythm (p-8 sm:p-10 md:p-12) */}
          <div
            className="w-full rounded-2xl p-8 sm:p-10 md:p-12 flex flex-col items-center text-center"
            style={{
              border: `1px solid ${content.theme.sage}45`,
              backgroundColor: "rgba(242, 234, 224, 0.75)",
            }}
          >
            {/* 1. Occasion-Specific Eyebrow in 100% theme.oak */}
            <motion.p
              variants={itemFade(0.05)}
              initial="hidden"
              animate="visible"
              className="text-xs sm:text-sm font-semibold tracking-[0.26em] uppercase mb-4 sm:mb-5"
              style={{ color: content.theme.oak }}
            >
              {content.eyebrowLabel}
            </motion.p>

            {/* 2. Sparkle Star Icon Divider */}
            <motion.div
              variants={itemFade(0.1)}
              initial="hidden"
              animate="visible"
              className="mb-5 sm:mb-6 flex justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill={content.theme.oak}
              >
                <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
              </svg>
            </motion.div>

            {/* 3. Headline: Happy Teacher's Day (text-4xl / text-3xl Mobile, Semibold 600) */}
            <div className="mb-6 sm:mb-7 flex flex-col items-center w-full">
              <div className="w-full flex justify-center">
                <InkReveal
                  text={content.headlineHappy}
                  delay={0.15}
                  className="font-serif-heading text-4xl sm:text-5xl md:text-6xl font-semibold leading-none tracking-normal"
                />
              </div>
              <div className="w-full flex justify-center mt-2 sm:mt-2.5">
                <InkReveal
                  text={content.headlineTeachersDay}
                  delay={0.38}
                  className="font-serif-heading italic text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-normal"
                />
              </div>
            </div>

            {/* 4. Short Horizontal Divider */}
            <motion.div
              variants={itemFade(0.48)}
              initial="hidden"
              animate="visible"
              className="w-16 sm:w-20 h-px mb-6 sm:mb-7"
              style={{ backgroundColor: content.theme.oak, opacity: 0.5 }}
            />

            {/* 5. Body Message Paragraph (16px base mobile, leading-[1.8]) */}
            <motion.p
              variants={itemFade(0.55)}
              initial="hidden"
              animate="visible"
              className="font-sans-body text-base sm:text-[17px] md:text-lg leading-[1.8] sm:leading-[1.85] font-normal mb-6 sm:mb-8"
              style={{ color: content.theme.ink, opacity: 0.88 }}
            >
              {content.letterBody}
            </motion.p>

            {/* 6. Teacher Name via InkReveal (text-3xl+ Semibold 600 Calligraphic Serif) */}
            <div className="relative mb-2 sm:mb-2.5 w-full flex justify-center items-center">
              <InkReveal
                text={content.teacherName}
                delay={0.65}
                className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-normal leading-tight"
              />
              <SparkleBurst trigger={nameSparkles} count={4} minRadius={20} maxRadius={50} />
            </div>

            {/* 7. Subtitle */}
            <motion.p
              variants={itemFade(0.72)}
              initial="hidden"
              animate="visible"
              className="text-xs sm:text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6 sm:mb-8"
              style={{ color: content.theme.sage }}
            >
              {content.subtitle}
            </motion.p>

            {/* 8. Thin Full-Width Divider */}
            <motion.div
              variants={itemFade(0.78)}
              initial="hidden"
              animate="visible"
              className="w-full h-px mb-6 sm:mb-7"
              style={{ backgroundColor: content.theme.sage, opacity: 0.35 }}
            />

            {/* 9. Two-Column Row: DATE | VENUE */}
            <motion.div
              variants={itemFade(0.84)}
              initial="hidden"
              animate="visible"
              className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6 mb-6 sm:mb-7"
            >
              {/* Column 1: Date */}
              <div className="flex flex-col items-center">
                <span
                  className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-1.5"
                  style={{ color: content.theme.sage }}
                >
                  {content.dateLabel}
                </span>
                <span
                  className="text-sm sm:text-base md:text-lg font-semibold"
                  style={{ color: content.theme.ink }}
                >
                  {content.date}
                </span>
              </div>

              {/* Vertical Divider */}
              <div
                className="h-10 sm:h-12 w-px"
                style={{ backgroundColor: content.theme.sage, opacity: 0.35 }}
              />

              {/* Column 2: Venue */}
              <div className="flex flex-col items-center">
                <span
                  className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-1.5"
                  style={{ color: content.theme.sage }}
                >
                  {content.venueLabel}
                </span>
                <span
                  className="text-sm sm:text-base md:text-lg font-semibold leading-snug text-center break-words max-w-[68%] sm:max-w-[75%]"
                  style={{ color: content.theme.ink }}
                >
                  {content.venue}
                </span>
              </div>
            </motion.div>

            {/* 10. Thin Divider */}
            <motion.div
              variants={itemFade(0.9)}
              initial="hidden"
              animate="visible"
              className="w-full h-px mb-5 sm:mb-6"
              style={{ backgroundColor: content.theme.sage, opacity: 0.35 }}
            />

            {/* 11. Small Italic Footer */}
            <motion.div
              variants={itemFade(0.95)}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center gap-2"
            >
              <span
                className="font-serif-heading italic text-xs sm:text-sm md:text-base tracking-wide"
                style={{ color: content.theme.sage }}
              >
                {content.footerText}
              </span>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                fill={content.theme.sage}
              >
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C5.9 12.08 8 10 17 8Z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
