"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className = "" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-6 my-12 ${className}`}
    >
      <div className="flex-1 h-px bg-[#2a2a2a]" />
      <h2 className="text-xs font-mono tracking-[0.2em] text-[#888] uppercase">
        {title}
      </h2>
      <div className="flex-1 h-px bg-[#2a2a2a]" />
    </motion.div>
  );
}
