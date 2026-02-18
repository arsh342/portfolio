"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useEffect, useRef, useState } from "react";
import { useGitHubData } from "@/hooks/useGitHubData";

const GRID = 10; // 10x10 pixel grid
const CELL = 4; // each cell is 4px
const GAP = 1;

const ACCENT_PALETTE = [
  [10, 10, 10], // bg - darkest
  [58, 40, 20], // #3a2814
  [90, 61, 26], // #5a3d1a
  [139, 94, 42], // #8b5e2a
  [166, 107, 47], // #a66b2f
  [201, 126, 58], // #c97e3a
  [212, 148, 62], // #d4943e
  [229, 168, 75], // #e5a84b
];

function PixelAvatar({ avatarUrl }: { avatarUrl: string }) {
  const [pixels, setPixels] = useState<string[][]>([]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `${avatarUrl}&s=${GRID}`;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = GRID;
      canvas.height = GRID;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, GRID, GRID);
      const data = ctx.getImageData(0, 0, GRID, GRID).data;

      const grid: string[][] = [];
      for (let y = 0; y < GRID; y++) {
        const row: string[] = [];
        for (let x = 0; x < GRID; x++) {
          const i = (y * GRID + x) * 4;
          const r = data[i],
            g = data[i + 1],
            b = data[i + 2],
            a = data[i + 3];
          if (a < 30) {
            row.push("transparent");
          } else {
            // Map brightness to accent palette
            const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
            const idx = Math.min(
              Math.floor(brightness * ACCENT_PALETTE.length),
              ACCENT_PALETTE.length - 1,
            );
            const [pr, pg, pb] = ACCENT_PALETTE[idx];
            row.push(`rgb(${pr},${pg},${pb})`);
          }
        }
        grid.push(row);
      }
      setPixels(grid);
    };
  }, [avatarUrl]);

  if (pixels.length === 0) {
    return (
      <div
        style={{ width: GRID * (CELL + GAP), height: GRID * (CELL + GAP) }}
      />
    );
  }

  return (
    <div
      className="opacity-50 hover:opacity-80 transition-opacity duration-300"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID}, ${CELL}px)`,
        gap: `${GAP}px`,
      }}
    >
      {pixels.flat().map((color, i) => (
        <div
          key={i}
          className="rounded-[1px]"
          style={{
            width: CELL,
            height: CELL,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}

export function Footer() {
  const { data } = useGitHubData();
  const avatarUrl = data?.avatarUrl || profile.avatar;

  const links = [
    {
      icon: <Twitter size={14} />,
      label: "twitter",
      value: "https://twitter.com/Thearshsran",
      url: profile.links.twitter,
    },
    {
      icon: <Mail size={14} />,
      label: "website",
      value: profile.links.email,
      url: `mailto:${profile.links.email}`,
    },
    {
      icon: <Linkedin size={14} />,
      label: "linkedin",
      value: "linkedin.com/in/arsh342",
      url: profile.links.linkedin,
    },
    {
      icon: <Github size={14} />,
      label: "github",
      value: "github.com/arsh342",
      url: profile.links.github,
    },
  ];

  return (
    <section className="pb-16">
      <SectionHeader title="Links" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16"
      >
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-[12px] font-mono text-[#888] border border-[#2a2a2a] rounded-lg hover:border-[#3a3a3a] hover:text-[#c97e3a] transition-colors duration-200 cursor-pointer"
          >
            {link.icon}
            <span className="text-[#555]">{link.label}</span>
            <span className="text-[#999] hidden sm:inline">·</span>
            <span className="truncate max-w-[140px] sm:max-w-[200px] hidden sm:inline">
              {link.value}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <PixelAvatar avatarUrl={avatarUrl} />
        </div>
      </motion.div>
    </section>
  );
}
