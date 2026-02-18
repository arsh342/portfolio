"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork, Star, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { profile } from "@/data/profile";

const techColors: Record<string, string> = {
  TypeScript: "#c97e3a",
  JavaScript: "#e5a84b",
  Java: "#8b5e34",
  HTML: "#7a5028",
  Python: "#d4943e",
};

export function Projects() {
  return (
    <section>
      <SectionHeader title="Featured Projects" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profile.projects.map((project, i) => (
          <motion.a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group block border border-[#2a2a2a] rounded-lg p-5 hover:border-[#3a3a3a] bg-[#111111] transition-all duration-200 cursor-pointer"
          >
            {/* Header row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {project.forked && (
                  <GitFork size={12} className="text-[#555]" />
                )}
                <h3 className="text-[14px] font-mono font-semibold text-[#e5e5e5] group-hover:text-[#c97e3a] transition-colors">
                  {project.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {project.stars > 0 && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-[#555]">
                    <Star size={10} />
                    {project.stars}
                  </span>
                )}
                <ArrowUpRight
                  size={14}
                  className="text-[#444] group-hover:text-[#c97e3a] transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-[11px] font-mono text-[#888] leading-relaxed mb-3 line-clamp-3">
              {project.description}
            </p>

            {/* Tags */}
            {project.tags && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono text-[#666] bg-[#1a1a1a] border border-[#222] px-2 py-0.5 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer: tech badge + live link */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: techColors[project.tech] || "#c97e3a",
                  }}
                />
                <span className="text-[10px] font-mono text-[#666]">
                  {project.tech}
                </span>
              </div>
              {project.live && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-[#c97e3a]/70 group-hover:text-[#c97e3a] transition-colors">
                  <ExternalLink size={10} />
                  Live
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
