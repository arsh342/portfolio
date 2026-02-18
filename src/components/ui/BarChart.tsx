"use client";

import { motion } from "framer-motion";

interface BarChartItem {
  label: string;
  value: number;
  maxValue?: number;
}

interface BarChartProps {
  items: BarChartItem[];
  showValue?: boolean;
  accentColor?: string;
}

export function BarChart({
  items,
  showValue = true,
  accentColor = "#c97e3a",
}: BarChartProps) {
  const max = Math.max(...items.map((i) => i.maxValue ?? i.value));

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const width = max > 0 ? (item.value / max) * 100 : 0;
        return (
          <div key={index} className="flex items-center gap-3">
            <span className="text-[12px] font-mono text-[#888] w-28 shrink-0 truncate">
              {item.label}
            </span>
            <div className="flex-1 h-5 bg-[#1a1a1a] rounded-sm overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${width}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="h-full rounded-sm"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            {showValue && (
              <span className="text-[12px] font-mono text-[#666] w-8 text-right shrink-0">
                {item.value}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
