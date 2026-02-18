"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  value: number | string;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
}

export function StatCard({ value, label, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3"
    >
      {icon && <span className="text-[#c97e3a]">{icon}</span>}
      <div>
        <div className="text-2xl font-mono font-bold text-[#e5e5e5]">
          {value}
        </div>
        <div className="text-[11px] font-mono tracking-wider uppercase text-[#666]">
          {label}
        </div>
      </div>
    </motion.div>
  );
}
