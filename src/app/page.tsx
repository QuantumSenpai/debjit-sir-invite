"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "@/data/content";
import Envelope from "@/components/Envelope";
import Letter from "@/components/Letter";
import AmbientBackground from "@/components/animations/AmbientBackground";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden"
      style={{ backgroundColor: content.theme.background }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Envelope key="envelope-screen" onOpen={() => setIsOpen(true)} />
        ) : (
          <motion.div
            key="letter-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden"
          >
            <AmbientBackground />
            <Letter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
