"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";

export function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 600);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {visible && (
        <motion.div
          key="brand-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
        >
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-center px-6"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-semibold tracking-[0.28em] text-[#e5e5e5]">
              {profile.name}
            </div>
            <div className="mt-3 h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#c97e3a]/70 to-transparent" />
            <div className="mt-3 text-[9px] sm:text-[10px] font-mono tracking-[0.35em] uppercase text-[#c97e3a]">
              full-stack • ai • cloud
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
