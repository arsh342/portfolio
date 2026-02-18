"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string;
  stars: number;
  url: string;
  delay?: number;
}

export function ProjectCard({
  name,
  description,
  tech,
  stars,
  url,
  delay = 0,
}: ProjectCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group block bg-[#111] border border-[#2a2a2a] rounded-lg p-5 hover:border-[#3a3a3a] transition-colors duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-[15px] font-mono font-semibold text-[#e5e5e5] group-hover:text-[#c97e3a] transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-3 shrink-0 ml-3">
          <span className="text-[11px] font-mono text-[#666] border border-[#2a2a2a] px-2 py-0.5 rounded-sm">
            {tech}
          </span>
          {stars > 0 && (
            <span className="flex items-center gap-1 text-[12px] font-mono text-[#666]">
              <Star size={12} />
              {stars}
            </span>
          )}
        </div>
      </div>
      <p className="text-[13px] text-[#777] leading-relaxed line-clamp-2">
        {description}
      </p>
      <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-[#555] group-hover:text-[#c97e3a]/70 transition-colors">
        <ExternalLink size={11} />
        <span>View on GitHub</span>
      </div>
    </motion.a>
  );
}
