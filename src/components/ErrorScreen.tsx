"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Home } from "lucide-react";

// Each digit is a 5×7 pixel bitmap
const DIGIT_BITMAPS: Record<string, number[][]> = {
  "0": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "1": [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  "2": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  "3": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "4": [
    [0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
  "5": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "6": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "7": [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  "8": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "9": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
};

const CELL = 7;
const GAP = 2;
const PAD_X = 3; // padding columns on each side
const PAD_Y = 2; // padding rows on top and bottom
const DIGIT_GAP = 3; // columns of gap between digits
const DIGIT_ROWS = 7;
const DIGIT_W = 5;

// Amber palette — "on" cells glow, "digit" cells are dark cutouts
const AMBER_COLORS = [
  "#c97e3a",
  "#b8712f",
  "#d48a44",
  "#c97e3a",
  "#e09650",
  "#c97e3a",
  "#b8712f",
  "#d48a44",
];

interface ErrorScreenProps {
  code: string;
  title: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorScreen({
  code,
  title,
  message,
  onRetry,
}: ErrorScreenProps) {
  // Build the full rectangular matrix with negative (inverted) digit cutouts
  const { grid, cols, rows } = useMemo(() => {
    const digits = code.split("").filter((ch) => DIGIT_BITMAPS[ch]);
    if (digits.length === 0) return { grid: [], cols: 0, rows: 0 };

    const innerCols = digits.length * DIGIT_W + (digits.length - 1) * DIGIT_GAP;
    const totalCols = innerCols + PAD_X * 2;
    const totalRows = DIGIT_ROWS + PAD_Y * 2;

    // Build the digit area (innerCols × DIGIT_ROWS)
    const digitMap: boolean[][] = [];
    for (let row = 0; row < DIGIT_ROWS; row++) {
      const rowData: boolean[] = [];
      for (let dIdx = 0; dIdx < digits.length; dIdx++) {
        const bitmap = DIGIT_BITMAPS[digits[dIdx]];
        for (let col = 0; col < DIGIT_W; col++) {
          rowData.push(bitmap[row][col] === 1);
        }
        if (dIdx < digits.length - 1) {
          for (let g = 0; g < DIGIT_GAP; g++) rowData.push(false);
        }
      }
      digitMap.push(rowData);
    }

    // Build the full padded grid — INVERTED: digit pixels are OFF, background is ON
    const result: boolean[] = [];
    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalCols; col++) {
        const inDigitArea =
          row >= PAD_Y &&
          row < PAD_Y + DIGIT_ROWS &&
          col >= PAD_X &&
          col < PAD_X + innerCols;

        if (inDigitArea) {
          const dRow = row - PAD_Y;
          const dCol = col - PAD_X;
          // NEGATIVE: digit pixel ON → cell OFF (dark cutout)
          result.push(!digitMap[dRow][dCol]);
        } else {
          // Padding area — always lit
          result.push(true);
        }
      }
    }

    return { grid: result, cols: totalCols, rows: totalRows };
  }, [code]);

  // Blink effect — randomly pick some lit cells to pulse
  const [blinkSet, setBlinkSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      const newSet = new Set<number>();
      const litCells = grid.map((on, i) => (on ? i : -1)).filter((i) => i >= 0);
      const count = Math.max(4, Math.floor(litCells.length * 0.08));
      for (let i = 0; i < count; i++) {
        const pick = litCells[Math.floor(Math.random() * litCells.length)];
        newSet.add(pick);
      }
      setBlinkSet(newSet);
    }, 500);
    return () => clearInterval(interval);
  }, [grid]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
      {/* Rectangular pixel matrix with negative error code */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${CELL}px)`,
            gridTemplateRows: `repeat(${rows}, ${CELL}px)`,
            gap: `${GAP}px`,
          }}
        >
          {grid.map((lit, i) => (
            <motion.div
              key={i}
              className="rounded-[1px]"
              animate={
                lit
                  ? blinkSet.has(i)
                    ? {
                        opacity: [0.85, 0.15, 0.85],
                        scale: [1, 1.15, 1],
                      }
                    : { opacity: 0.75, scale: 1 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                width: CELL,
                height: CELL,
                backgroundColor: lit
                  ? AMBER_COLORS[i % AMBER_COLORS.length]
                  : "#0a0a0a",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Title & message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10 text-center"
      >
        <h2 className="text-[13px] font-mono tracking-[0.2em] uppercase text-[#888] mb-3">
          {title}
        </h2>
        <p className="text-[11px] font-mono text-[#555] max-w-[320px] leading-relaxed">
          {message}
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center gap-3"
      >
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono tracking-[0.1em] uppercase text-[#c97e3a] border border-[#c97e3a]/30 rounded-lg hover:bg-[#c97e3a]/10 hover:border-[#c97e3a]/50 transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
            Retry
          </button>
        )}
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono tracking-[0.1em] uppercase text-[#888] border border-[#2a2a2a] rounded-lg hover:border-[#3a3a3a] hover:text-[#e5e5e5] transition-colors"
        >
          <Home size={12} />
          Home
        </a>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-12 w-32 h-px bg-[#2a2a2a]"
      />
    </div>
  );
}
