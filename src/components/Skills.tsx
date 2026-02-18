"use client";

import { useState } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { SkillAccordion } from "./ui/SkillAccordion";
import { profile } from "@/data/profile";
import { motion } from "framer-motion";

export function Skills() {
  const [activeTab, setActiveTab] = useState<"technical" | "domain">(
    "technical",
  );

  return (
    <section>
      <SectionHeader title="Skills" />

      {/* Tabs — matching SkillSync exactly */}
      <div className="flex gap-0 mb-6 border-b border-[#2a2a2a]">
        {[
          {
            key: "technical" as const,
            label: `Technical Expertise (${profile.technicalExpertise.length})`,
          },
          {
            key: "domain" as const,
            label: `Domain Expertise (${profile.domainExpertise.length})`,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3.5 text-[11px] font-mono tracking-[0.15em] uppercase transition-colors duration-200 cursor-pointer relative ${
              activeTab === tab.key
                ? "text-[#c97e3a]"
                : "text-[#555] hover:text-[#888]"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="skillsTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c97e3a]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border border-[#2a2a2a] rounded-lg overflow-hidden divide-y divide-[#2a2a2a]"
      >
        {(activeTab === "technical"
          ? profile.technicalExpertise
          : profile.domainExpertise
        ).map((skill, i) => (
          <SkillAccordion
            key={skill.title}
            title={skill.title}
            tags={skill.tags}
            indicators={skill.indicators}
            evidence={skill.evidence}
            delay={i * 0.05}
          />
        ))}
      </motion.div>
    </section>
  );
}
