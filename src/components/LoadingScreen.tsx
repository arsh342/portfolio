"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";

const GRID = 10;
const CELL = 6;
const GAP = 2;

const ACCENT_PALETTE: [number, number, number][] = [
  [10, 10, 10],
  [58, 40, 20],
  [90, 61, 26],
  [139, 94, 42],
  [166, 107, 47],
  [201, 126, 58],
  [212, 148, 62],
  [229, 168, 75],
];

export function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [phase, setPhase] = useState<"loading" | "fadeout">("loading");
  const [pixels, setPixels] = useState<string[]>([]);

  // Load the real avatar and pixelate it with accent palette
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `${profile.avatar}&s=${GRID}`;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = GRID;
      canvas.height = GRID;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, GRID, GRID);
      const data = ctx.getImageData(0, 0, GRID, GRID).data;

      const grid: string[] = [];
      for (let i = 0; i < GRID * GRID; i++) {
        const idx = i * 4;
        const r = data[idx],
          g = data[idx + 1],
          b = data[idx + 2],
          a = data[idx + 3];
        if (a < 30) {
          grid.push("transparent");
        } else {
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const palIdx = Math.min(
            Math.floor(brightness * ACCENT_PALETTE.length),
            ACCENT_PALETTE.length - 1,
          );
          const [pr, pg, pb] = ACCENT_PALETTE[palIdx];
          grid.push(`rgb(${pr},${pg},${pb})`);
        }
      }
      setPixels(grid);
    };
  }, []);

  // Random blink indices — pick different cells each cycle
  const [blinkSet, setBlinkSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      const newSet = new Set<number>();
      const count = 8 + Math.floor(Math.random() * 12); // 8-20 cells blink
      for (let i = 0; i < count; i++) {
        newSet.add(Math.floor(Math.random() * GRID * GRID));
      }
      setBlinkSet(newSet);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Auto-finish after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("fadeout");
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {phase === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
          {/* Pixel avatar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${GRID}, ${CELL}px)`,
              gap: `${GAP}px`,
            }}
          >
            {pixels.length > 0
              ? pixels.map((color, i) => (
                  <motion.div
                    key={i}
                    className="rounded-[1px]"
                    animate={{
                      opacity: blinkSet.has(i) ? [0.9, 0.15, 0.9] : 0.8,
                      scale: blinkSet.has(i) ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: CELL,
                      height: CELL,
                      backgroundColor: color,
                    }}
                  />
                ))
              : // Placeholder while image loads
                Array.from({ length: GRID * GRID }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-[1px] bg-[#1a1a1a]"
                    style={{ width: CELL, height: CELL }}
                  />
                ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
