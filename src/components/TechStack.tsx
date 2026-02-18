"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";
import { profile } from "@/data/profile";
import { Code2, Server, Layout, Database, Cloud, Cpu } from "lucide-react";

const categories = [
  {
    icon: Code2,
    label: "Languages",
    items: profile.technicalSkills.languages,
  },
  {
    icon: Server,
    label: "Backend",
    items: profile.technicalSkills.backend,
  },
  {
    icon: Layout,
    label: "Frontend",
    items: profile.technicalSkills.frontend,
  },
  {
    icon: Database,
    label: "Databases",
    items: profile.technicalSkills.databases,
  },
  {
    icon: Cloud,
    label: "Cloud & DevOps",
    items: profile.technicalSkills.cloud,
  },
  {
    icon: Cpu,
    label: "Concepts",
    items: profile.technicalSkills.concepts,
  },
];

export function TechStack() {
  return (
    <section>
      <SectionHeader title="Technical Skills" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border border-[#2a2a2a] rounded-lg p-5 bg-[#111111] hover:border-[#3a3a3a] transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon size={13} className="text-[#c97e3a]" />
                <h3 className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#c97e3a]">
                  {cat.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-mono text-[#999] bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded-md hover:text-[#e5e5e5] hover:border-[#3a3a3a] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
