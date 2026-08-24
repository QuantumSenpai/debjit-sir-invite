"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { content } from "@/data/content";
import RippleReveal from "@/components/animations/RippleReveal";
import { BuddhaMotifDivider, BuddhaLotusGlyph } from "@/components/animations/BuddhaMotif";

export default function Letter() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 18 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemFade = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center p-3 sm:p-6 md:p-10 lg:p-12 overflow-x-hidden">
      {/* Floating Card Container with Ambient Depth Glow */}
      <div className="relative w-full max-w-[420px] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[640px] mx-auto my-auto flex items-center justify-center">
        
        {/* Soft Ambient Radial Aura behind card for visible elevation & separation */}
        <div
          className="absolute -inset-4 sm:-inset-8 md:-inset-12 rounded-[44px] pointer-events-none opacity-70 filter blur-2xl sm:blur-3xl transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at center, rgba(250, 246, 239, 0.9) 0%, rgba(185, 143, 98, 0.22) 50%, rgba(138, 154, 130, 0.1) 75%, transparent 90%)`,
          }}
          aria-hidden="true"
        />

        {/* Elevated Glassmorphism Card */}
        <motion.main
          className="relative z-10 w-full rounded-[30px] sm:rounded-[36px] md:rounded-[40px] box-border overflow-hidden transition-all duration-300"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{
            backgroundColor: "rgba(241, 233, 221, 0.74)",
            backdropFilter: "blur(24px) saturate(140%)",
            WebkitBackdropFilter: "blur(24px) saturate(140%)",
            border: `1px solid ${content.theme.sandBeige}95`,
            boxShadow: `
              0 30px 80px -15px rgba(74, 63, 51, 0.22),
              0 16px 40px -8px rgba(185, 143, 98, 0.22),
              0 4px 16px rgba(74, 63, 51, 0.08),
              inset 0 1.5px 2.5px 0 rgba(250, 246, 239, 0.95)
            `,
          }}
        >
          {/* Subtle Top Inner Highlight Gradient Stroke Rim */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[30px] sm:rounded-[36px] md:rounded-[40px]"
            style={{
              background: `linear-gradient(135deg, rgba(201, 184, 168, 0.5) 0%, rgba(250, 246, 239, 0.7) 30%, rgba(138, 154, 130, 0.45) 100%)`,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
          />

          {/* Inner Content Wrapper: max-height 100svh (100dvh fallback), overflow-y auto, hidden scrollbar, spacious padding */}
          <div className="w-full max-h-[calc(100svh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] md:max-h-[calc(100dvh-3.5rem)] overflow-y-auto no-scrollbar px-7 py-9 sm:px-11 sm:py-13 md:px-14 md:py-16 flex flex-col items-center text-center box-border">
            
            {/* 1. Pill-Shaped Eyebrow Badge */}
            <motion.div
              variants={itemFade(0.08)}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-1.5 rounded-full mb-3 sm:mb-3.5 max-w-full"
              style={{
                backgroundColor: "rgba(168, 162, 154, 0.18)",
                border: `1px solid ${content.theme.sandBeige}90`,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 2px 6px rgba(74, 63, 51, 0.04), inset 0 1px 1px rgba(250, 246, 239, 0.7)",
              }}
            >
              <span
                className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase"
                style={{ color: content.theme.softSage }}
              >
                {content.eyebrowLabel}
              </span>
            </motion.div>

            {/* 2. Buddha Element Lotus / Mandala Connected Pill Divider */}
            <motion.div
              variants={itemFade(0.14)}
              initial="hidden"
              animate="visible"
              className="mb-5 sm:mb-6 md:mb-7 flex justify-center"
            >
              <BuddhaMotifDivider />
            </motion.div>

            {/* 3. Heading: Happy Teacher's Day (Balanced, harmonized proportions) */}
            <div className="mb-6 sm:mb-7 md:mb-8 flex flex-col items-center w-full max-w-full">
              <div className="w-full flex justify-center max-w-full">
                <RippleReveal
                  text={content.headlineHappy}
                  delay={0.18}
                  className="font-serif-heading text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-semibold leading-tight tracking-tight"
                  style={{ color: content.theme.deepBark }}
                />
              </div>
              <div className="w-full flex justify-center mt-1 sm:mt-1.5 max-w-full">
                <RippleReveal
                  text={content.headlineTeachersDay}
                  delay={0.36}
                  className="font-serif-heading italic text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-normal leading-tight tracking-normal"
                  style={{ color: content.theme.lightOakWood }}
                />
              </div>
            </div>

            {/* 4. Thicker / Longer Horizontal Divider */}
            <motion.div
              variants={itemFade(0.48)}
              initial="hidden"
              animate="visible"
              className="w-16 sm:w-20 md:w-24 h-px mb-6 sm:mb-8 md:mb-9 rounded-full"
              style={{
                backgroundColor: content.theme.lightOakWood,
                opacity: 0.5,
              }}
            />

            {/* 5. Letter Body Message with Natural, Unhurried Line-Height */}
            <motion.p
              variants={itemFade(0.55)}
              initial="hidden"
              animate="visible"
              className="font-sans-body text-[14.5px] sm:text-[15.5px] md:text-[16.5px] lg:text-[17px] leading-[1.72] sm:leading-[1.78] md:leading-[1.82] font-normal mb-8 sm:mb-10 md:mb-11 max-w-xl text-center"
              style={{ color: content.theme.deepBark, opacity: 0.94 }}
            >
              {content.letterBody}
            </motion.p>

            {/* 6. Section Separation Divider above Mentor Block */}
            <motion.div
              variants={itemFade(0.58)}
              initial="hidden"
              animate="visible"
              className="w-16 sm:w-20 md:w-24 h-px mb-5 sm:mb-6 rounded-full"
              style={{
                backgroundColor: content.theme.stoneGray,
                opacity: 0.45,
              }}
            />

            {/* 7. Structural Eyebrow: HONOURING OUR MENTOR */}
            <motion.p
              variants={itemFade(0.62)}
              initial="hidden"
              animate="visible"
              className="text-[9.5px] sm:text-[10.5px] font-semibold tracking-[0.24em] uppercase mb-1.5 sm:mb-2 text-center"
              style={{ color: content.theme.stoneGray }}
            >
              {content.mentorEyebrowLabel}
            </motion.p>

            {/* 8. Teacher Name via RippleReveal */}
            <div className="relative mb-1 sm:mb-1.5 w-full flex justify-center items-center max-w-full">
              <RippleReveal
                text={content.teacherName}
                delay={0.68}
                className="font-serif-heading text-2xl sm:text-3xl md:text-[36px] font-semibold tracking-normal leading-tight"
                style={{ color: content.theme.deepBark }}
              />
            </div>

            {/* 9. Subtitle */}
            <motion.p
              variants={itemFade(0.74)}
              initial="hidden"
              animate="visible"
              className="text-xs sm:text-[13px] font-medium tracking-[0.2em] uppercase mb-6 sm:mb-8 md:mb-9 max-w-full"
              style={{ color: content.theme.softSage }}
            >
              {content.subtitle}
            </motion.p>

            {/* 10. Thin Full-Width Divider */}
            <motion.div
              variants={itemFade(0.78)}
              initial="hidden"
              animate="visible"
              className="w-full h-px mb-5 sm:mb-7 md:mb-8 rounded-full"
              style={{
                backgroundColor: content.theme.sandBeige,
                opacity: 0.55,
              }}
            />

            {/* 11. Two-Column Row: DATE | VENUE with Roomy Spacing */}
            <motion.div
              variants={itemFade(0.84)}
              initial="hidden"
              animate="visible"
              className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6 md:gap-8 mb-5 sm:mb-7 md:mb-8 px-2 max-w-full"
            >
              {/* Column 1: Date */}
              <div className="flex flex-col items-center">
                <span
                  className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase mb-1"
                  style={{ color: content.theme.softSage }}
                >
                  {content.dateLabel}
                </span>
                <span
                  className="text-sm sm:text-base md:text-lg font-semibold"
                  style={{ color: content.theme.deepBark }}
                >
                  {content.date}
                </span>
              </div>

              {/* Vertical Divider */}
              <div
                className="h-10 sm:h-12 w-px rounded-full"
                style={{
                  backgroundColor: content.theme.sandBeige,
                  opacity: 0.65,
                }}
              />

              {/* Column 2: Venue */}
              <div className="flex flex-col items-center">
                <span
                  className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase mb-1"
                  style={{ color: content.theme.softSage }}
                >
                  {content.venueLabel}
                </span>
                <span
                  className="text-sm sm:text-base md:text-lg font-semibold leading-snug text-center break-words max-w-full"
                  style={{ color: content.theme.deepBark }}
                >
                  {content.venue}
                </span>
              </div>
            </motion.div>

            {/* 12. Thin Divider */}
            <motion.div
              variants={itemFade(0.9)}
              initial="hidden"
              animate="visible"
              className="w-full h-px mb-4 sm:mb-6 md:mb-7 rounded-full"
              style={{
                backgroundColor: content.theme.sandBeige,
                opacity: 0.55,
              }}
            />

            {/* 13. Small Italic Footer with Floating Buddha Lotus Glyph */}
            <motion.div
              variants={itemFade(0.95)}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center gap-2 sm:gap-2.5 max-w-full"
            >
              <BuddhaLotusGlyph />
              <span
                className="font-serif-heading italic text-xs sm:text-sm md:text-[15px] tracking-wide"
                style={{ color: content.theme.softSage }}
              >
                {content.footerText}
              </span>
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
