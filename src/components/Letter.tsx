"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { content } from "@/data/content";
import InkReveal from "@/components/animations/InkReveal";
import SparkleBurst from "@/components/animations/SparkleBurst";

export default function Letter() {
  const [nameSparkles, setNameSparkles] = useState(false);

  // Subtle GPU-accelerated scroll parallax for the atmospheric background (capped at 24px)
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 400], [0, -24], {
    clamp: true,
  });

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.97, y: 12 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemFade = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 10 },
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
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-4 py-5 sm:py-8 md:py-12 overflow-x-hidden">
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
              opacity: 0.38,
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

      {/* 2. Main Letter Card - Centered in 100dvh with Enhanced Mobile Legibility */}
      <motion.main
        className="relative z-10 w-full max-w-[390px] sm:max-w-xl md:max-w-2xl mx-auto my-auto transition-transform duration-300 ease-out hover:scale-[1.008]"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => {
          // Trigger a subtle 4-particle sparkle burst around the name after card settles
          setTimeout(() => setNameSparkles(true), 350);
        }}
      >
        {/* Outer Frame Container with Soft Drop Shadow & Sage Outline */}
        <div
          className="w-full rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-3.5"
          style={{
            backgroundColor: "rgba(242, 234, 224, 0.97)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${content.theme.sage}75`,
            boxShadow: `0 16px 40px -8px rgba(30, 51, 44, 0.18), 0 4px 14px rgba(30, 51, 44, 0.08)`,
          }}
        >
          {/* Inset Inner Frame Container */}
          <div
            className="w-full rounded-xl md:rounded-2xl p-5 sm:p-7 md:p-10 flex flex-col items-center text-center"
            style={{
              border: `1px solid ${content.theme.sage}45`,
              backgroundColor: "rgba(242, 234, 224, 0.75)",
            }}
          >
            {/* 1. Eyebrow: Bolder & High-Contrast 100% theme.oak */}
            <motion.p
              variants={itemFade(0.05)}
              initial="hidden"
              animate="visible"
              className="text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase mb-2"
              style={{ color: content.theme.oak }}
            >
              {content.letterEyebrow}
            </motion.p>

            {/* 2. Sparkle Star Icon Divider */}
            <motion.div
              variants={itemFade(0.1)}
              initial="hidden"
              animate="visible"
              className="mb-3 flex justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill={content.theme.oak}
              >
                <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
              </svg>
            </motion.div>

            {/* 3. Headline: Happy Teacher's Day (text-4xl / text-3xl mobile) */}
            <motion.div
              variants={itemFade(0.16)}
              initial="hidden"
              animate="visible"
              className="mb-3.5 sm:mb-4 flex flex-col items-center"
            >
              <h1
                className="font-serif-heading text-4xl sm:text-5xl font-semibold leading-none tracking-tight"
                style={{ color: content.theme.ink }}
              >
                {content.headlineHappy}
              </h1>
              <span
                className="font-serif-heading italic text-3xl sm:text-4xl font-normal leading-tight mt-1"
                style={{ color: content.theme.oak }}
              >
                {content.headlineTeachersDay}
              </span>
            </motion.div>

            {/* 4. Short Horizontal Divider */}
            <motion.div
              variants={itemFade(0.22)}
              initial="hidden"
              animate="visible"
              className="w-12 sm:w-16 h-px mb-3.5 sm:mb-5"
              style={{ backgroundColor: content.theme.oak, opacity: 0.45 }}
            />

            {/* 5. Body Message Paragraph (16px base mobile minimum) */}
            <motion.p
              variants={itemFade(0.28)}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-[17px] leading-relaxed md:leading-[1.75] font-normal mb-4 sm:mb-6 max-w-[330px] sm:max-w-md md:max-w-lg"
              style={{ color: content.theme.ink, opacity: 0.88 }}
            >
              {content.letterBody}
            </motion.p>

            {/* 6. Teacher Name via InkReveal with Subtle Sparkle Burst */}
            <div className="relative mb-1 sm:mb-1.5 w-full flex justify-center items-center">
              <InkReveal
                text={content.teacherName}
                delay={0.35}
                className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight"
              />
              <SparkleBurst trigger={nameSparkles} count={4} minRadius={20} maxRadius={50} />
            </div>

            {/* 7. Subtitle */}
            <motion.p
              variants={itemFade(0.42)}
              initial="hidden"
              animate="visible"
              className="text-xs sm:text-sm font-medium tracking-[0.18em] uppercase mb-4 sm:mb-6"
              style={{ color: content.theme.sage }}
            >
              {content.subtitle}
            </motion.p>

            {/* 8. Thin Full-Width Divider */}
            <motion.div
              variants={itemFade(0.48)}
              initial="hidden"
              animate="visible"
              className="w-full h-px mb-3.5 sm:mb-5"
              style={{ backgroundColor: content.theme.sage, opacity: 0.3 }}
            />

            {/* 9. Two-Column Row: DATE | VENUE */}
            <motion.div
              variants={itemFade(0.54)}
              initial="hidden"
              animate="visible"
              className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6 mb-3.5 sm:mb-5"
            >
              {/* Column 1: Date */}
              <div className="flex flex-col items-center">
                <span
                  className="text-[10.5px] sm:text-xs font-semibold tracking-[0.16em] uppercase mb-1"
                  style={{ color: content.theme.sage }}
                >
                  {content.dateLabel}
                </span>
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={{ color: content.theme.ink }}
                >
                  {content.date}
                </span>
              </div>

              {/* Vertical Divider */}
              <div
                className="h-8 sm:h-9 w-px"
                style={{ backgroundColor: content.theme.sage, opacity: 0.35 }}
              />

              {/* Column 2: Venue */}
              <div className="flex flex-col items-center">
                <span
                  className="text-[10.5px] sm:text-xs font-semibold tracking-[0.16em] uppercase mb-1"
                  style={{ color: content.theme.sage }}
                >
                  {content.venueLabel}
                </span>
                <span
                  className="text-sm sm:text-base font-semibold leading-tight text-center"
                  style={{ color: content.theme.ink }}
                >
                  {content.venue}
                </span>
              </div>
            </motion.div>

            {/* 10. Thin Divider */}
            <motion.div
              variants={itemFade(0.6)}
              initial="hidden"
              animate="visible"
              className="w-full h-px mb-3 sm:mb-4"
              style={{ backgroundColor: content.theme.sage, opacity: 0.3 }}
            />

            {/* 11. Small Italic Footer */}
            <motion.div
              variants={itemFade(0.66)}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center gap-1.5"
            >
              <span
                className="font-serif-heading italic text-xs sm:text-sm tracking-wide"
                style={{ color: content.theme.sage }}
              >
                {content.footerText}
              </span>
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
