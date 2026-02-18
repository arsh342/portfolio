"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Badge } from "./Badge";

interface SkillAccordionProps {
  title: string;
  tags: string[];
  indicators: string[];
  evidence: { name: string; url: string }[];
  delay?: number;
}

export function SkillAccordion({
  title,
  tags,
  indicators,
  evidence,
  delay = 0,
}: SkillAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#151515] transition-colors duration-200 cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-mono font-medium text-[#e5e5e5] mb-2">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="muted">+{tags.length - 3}</Badge>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#555] shrink-0 ml-4"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-[#2a2a2a]">
              <div className="mt-4">
                <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555] mb-3">
                  Indicators
                </h4>
                <ul className="space-y-2">
                  {indicators.map((indicator, i) => (
                    <li
                      key={i}
                      className="text-[13px] text-[#999] leading-relaxed flex gap-2"
                    >
                      <span className="text-[#c97e3a] mt-0.5">·</span>
                      {indicator}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#555] mb-3">
                  Evidence
                </h4>
                <div className="flex flex-wrap gap-2">
                  {evidence.map((ev) => (
                    <a
                      key={ev.name}
                      href={ev.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-[#999] bg-[#1a1a1a] border border-[#2a2a2a] rounded-md hover:text-[#c97e3a] hover:border-[#c97e3a]/30 transition-colors cursor-pointer"
                    >
                      <ExternalLink size={10} />
                      {ev.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
