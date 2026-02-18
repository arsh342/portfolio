"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";
import { Badge } from "./ui/Badge";
import { profile } from "@/data/profile";

export function Topics() {
  return (
    <section>
      <SectionHeader title="Topics" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap gap-2"
      >
        {profile.topics.map((topic, i) => (
          <motion.div
            key={topic}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <Badge variant="muted">{topic}</Badge>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
