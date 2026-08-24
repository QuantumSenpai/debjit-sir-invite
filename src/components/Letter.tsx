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
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const itemFade = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
    },
  });

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center overflow-x-hidden"
      style={{ minHeight: "100svh", padding: "12px" }}
    >
      <div
        className="relative w-full mx-auto flex items-center justify-center"
        style={{ maxWidth: 560 }}
      >
        {/* Glow */}
        <div
          className="absolute pointer-events-none opacity-70"
          style={{
            inset: -32,
            borderRadius: 44,
            filter: "blur(40px)",
            background: `radial-gradient(ellipse at center, rgba(250,246,239,0.9) 0%, rgba(185,143,98,0.22) 50%, rgba(138,154,130,0.1) 75%, transparent 90%)`,
          }}
          aria-hidden="true"
        />

        <motion.main
          className="relative z-10 w-full"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{
            borderRadius: 32,
            overflow: "hidden",
            backgroundColor: "rgba(241, 233, 221, 0.74)",
            backdropFilter: "blur(24px) saturate(140%)",
            WebkitBackdropFilter: "blur(24px) saturate(140%)",
            border: `1px solid ${content.theme.sandBeige}95`,
            boxShadow: `
              0 30px 80px -15px rgba(74,63,51,0.22),
              0 16px 40px -8px rgba(185,143,98,0.22),
              0 4px 16px rgba(74,63,51,0.08),
              inset 0 1.5px 2.5px 0 rgba(250,246,239,0.95)
            `,
          }}
        >
          {/* Glass sheen border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: 32,
              background: `linear-gradient(135deg, rgba(201,184,168,0.5) 0%, rgba(250,246,239,0.7) 30%, rgba(138,154,130,0.45) 100%)`,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: 1,
            }}
          />

          {/* Scrollable inner */}
          <div
            className="w-full no-scrollbar flex flex-col items-center text-center box-border"
            style={{
              overflowY: "auto",
              maxHeight: "calc(100svh - 24px)",
              padding: "36px 24px 36px",
            }}
          >
            {/* 1. Eyebrow Badge */}
            <motion.div
              variants={itemFade(0.08)}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: 16 }}
            >
              <div
                className="inline-flex items-center justify-center rounded-full"
                style={{
                  padding: "6px 18px",
                  backgroundColor: "rgba(168,162,154,0.18)",
                  border: `1px solid ${content.theme.sandBeige}90`,
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  boxShadow: "0 2px 6px rgba(74,63,51,0.04), inset 0 1px 1px rgba(250,246,239,0.7)",
                }}
              >
                <span
                  className="font-semibold uppercase"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    color: content.theme.softSage,
                  }}
                >
                  {content.eyebrowLabel}
                </span>
              </div>
            </motion.div>

            {/* 2. Buddha Divider */}
            <motion.div
              variants={itemFade(0.14)}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: 28 }}
            >
              <BuddhaMotifDivider />
            </motion.div>

            {/* 3. Heading */}
            <div
              className="flex flex-col items-center w-full"
              style={{ marginBottom: 20 }}
            >
              <RippleReveal
                text={content.headlineHappy}
                delay={0.18}
                className="font-serif-heading font-semibold leading-tight tracking-tight"
                style={{ color: content.theme.deepBark, fontSize: "clamp(32px, 8vw, 44px)" }}
              />
              <div style={{ marginTop: 4 }}>
                <RippleReveal
                  text={content.headlineTeachersDay}
                  delay={0.36}
                  className="font-serif-heading italic font-normal leading-tight"
                  style={{ color: content.theme.lightOakWood, fontSize: "clamp(32px, 8vw, 44px)" }}
                />
              </div>
            </div>

            {/* 4. Divider under heading */}
            <motion.div
              variants={itemFade(0.48)}
              initial="hidden"
              animate="visible"
              style={{
                width: 64,
                height: 1,
                borderRadius: 9999,
                backgroundColor: content.theme.lightOakWood,
                opacity: 0.5,
                marginBottom: 32,
              }}
            />

            {/* 5. Letter Body */}
            <motion.p
              variants={itemFade(0.55)}
              initial="hidden"
              animate="visible"
              className="font-sans-body font-normal text-center"
              style={{
                fontSize: 15,
                lineHeight: 1.85,
                color: content.theme.deepBark,
                opacity: 0.94,
                maxWidth: 420,
                marginBottom: 40,
              }}
            >
              {content.letterBody}
            </motion.p>

            {/* 6. Divider above mentor block */}
            <motion.div
              variants={itemFade(0.58)}
              initial="hidden"
              animate="visible"
              style={{
                width: 56,
                height: 1,
                borderRadius: 9999,
                backgroundColor: content.theme.stoneGray,
                opacity: 0.45,
                marginBottom: 24,
              }}
            />

            {/* 7. HONOURING OUR MENTOR */}
            <motion.p
              variants={itemFade(0.62)}
              initial="hidden"
              animate="visible"
              className="font-semibold uppercase text-center"
              style={{
                fontSize: 10,
                letterSpacing: "0.24em",
                color: content.theme.stoneGray,
                marginBottom: 10,
              }}
            >
              {content.mentorEyebrowLabel}
            </motion.p>

            {/* 8. Teacher Name */}
            <div
              className="relative w-full flex justify-center items-center"
              style={{ marginBottom: 8 }}
            >
              <RippleReveal
                text={content.teacherName}
                delay={0.68}
                className="font-serif-heading font-semibold tracking-normal leading-tight"
                style={{ color: content.theme.deepBark, fontSize: "clamp(26px, 6vw, 36px)" }}
              />
            </div>

            {/* 9. Subtitle */}
            <motion.p
              variants={itemFade(0.74)}
              initial="hidden"
              animate="visible"
              className="font-medium uppercase text-center"
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                color: content.theme.softSage,
                marginBottom: 32,
              }}
            >
              {content.subtitle}
            </motion.p>

            {/* 10 & 12 replaced — bordered Date/Venue box (Sandip-style) */}
            <motion.div
              variants={itemFade(0.84)}
              initial="hidden"
              animate="visible"
              className="w-full grid grid-cols-[1fr_auto_1fr] items-center"
              style={{
                border: `1px solid ${content.theme.sandBeige}60`,
                borderRadius: 16,
                padding: "18px 16px",
                marginBottom: 28,
              }}
            >
              <div className="flex flex-col items-center">
                <span
                  className="font-semibold uppercase"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: content.theme.softSage,
                    marginBottom: 6,
                  }}
                >
                  {content.dateLabel}
                </span>
                <span
                  className="font-semibold text-center"
                  style={{ fontSize: 14, color: content.theme.deepBark, lineHeight: 1.3 }}
                >
                  {content.date}
                </span>
              </div>

              <div
                style={{
                  width: 1,
                  height: 40,
                  borderRadius: 9999,
                  backgroundColor: content.theme.sandBeige,
                  opacity: 0.65,
                  margin: "0 12px",
                }}
              />

              <div className="flex flex-col items-center">
                <span
                  className="font-semibold uppercase"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: content.theme.softSage,
                    marginBottom: 6,
                  }}
                >
                  {content.venueLabel}
                </span>
                <span
                  className="font-semibold text-center"
                  style={{ fontSize: 14, color: content.theme.deepBark, lineHeight: 1.3 }}
                >
                  {content.venue}
                </span>
              </div>
            </motion.div>

            {/* 13. Footer */}
            <motion.div
              variants={itemFade(0.95)}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center"
              style={{ gap: 8 }}
            >
              <BuddhaLotusGlyph />
              <span
                className="font-serif-heading italic tracking-wide"
                style={{ fontSize: 13, color: content.theme.softSage }}
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