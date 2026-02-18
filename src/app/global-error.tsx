"use client";

import { Inter, JetBrains_Mono } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const DIGIT_BITMAPS: Record<string, number[][]> = {
  "5": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "0": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
};

const CELL = 5;
const GAP = 2;
const PAD_X = 3;
const PAD_Y = 2;
const DIGIT_GAP = 2;
const DIGIT_ROWS = 7;
const DIGIT_W = 5;
const DIGITS = ["5", "0", "0"];
const INNER_COLS = DIGITS.length * DIGIT_W + (DIGITS.length - 1) * DIGIT_GAP;
const COLS = INNER_COLS + PAD_X * 2;
const ROWS = DIGIT_ROWS + PAD_Y * 2;

function buildGrid(): boolean[] {
  // Build digit area
  const digitMap: boolean[][] = [];
  for (let row = 0; row < DIGIT_ROWS; row++) {
    const rowData: boolean[] = [];
    for (let dIdx = 0; dIdx < DIGITS.length; dIdx++) {
      const bitmap = DIGIT_BITMAPS[DIGITS[dIdx]];
      for (let col = 0; col < DIGIT_W; col++) {
        rowData.push(bitmap[row][col] === 1);
      }
      if (dIdx < DIGITS.length - 1) {
        for (let g = 0; g < DIGIT_GAP; g++) rowData.push(false);
      }
    }
    digitMap.push(rowData);
  }
  // Round corners
  const isCorner = (row: number, col: number) => {
    const r = 2;
    if (row === 0 && col < r) return true;
    if (row < r && col === 0) return true;
    if (row === 0 && col >= COLS - r) return true;
    if (row < r && col === COLS - 1) return true;
    if (row === ROWS - 1 && col < r) return true;
    if (row >= ROWS - r && col === 0) return true;
    if (row === ROWS - 1 && col >= COLS - r) return true;
    if (row >= ROWS - r && col === COLS - 1) return true;
    return false;
  };

  // Inverted: digit pixels → dark, background → lit
  const result: boolean[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (isCorner(row, col)) {
        result.push(false);
        continue;
      }
      const inDigitArea =
        row >= PAD_Y &&
        row < PAD_Y + DIGIT_ROWS &&
        col >= PAD_X &&
        col < PAD_X + INNER_COLS;
      if (inDigitArea) {
        result.push(!digitMap[row - PAD_Y][col - PAD_X]);
      } else {
        result.push(true);
      }
    }
  }
  return result;
}

const GRID = buildGrid();

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [blinkSet, setBlinkSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      const newSet = new Set<number>();
      const litCells = GRID.map((on, i) => (on ? i : -1)).filter((i) => i >= 0);
      const count = Math.max(2, Math.floor(litCells.length * 0.08));
      for (let i = 0; i < count; i++) {
        newSet.add(litCells[Math.floor(Math.random() * litCells.length)]);
      }
      setBlinkSet(newSet);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Simple CSS blink animation via inline style tag
  const blinkKeyframes = `
    @keyframes cellBlink {
      0%, 100% { opacity: 0.75; transform: scale(1); }
      50% { opacity: 0.12; transform: scale(1.15); }
    }
  `;

  return (
    <html lang="en" className="dark">
      <head>
        <style dangerouslySetInnerHTML={{ __html: blinkKeyframes }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ background: "#0a0a0a", margin: 0 }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            padding: "1rem",
          }}
        >
          {/* Rectangular matrix with negative 500 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
              gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
              gap: `${GAP}px`,
            }}
          >
            {GRID.map((lit, i) => (
              <div
                key={i}
                style={{
                  width: CELL,
                  height: CELL,
                  borderRadius: 1,
                  backgroundColor: lit ? "#c97e3a" : "#0a0a0a",
                  opacity: lit ? (blinkSet.has(i) ? undefined : 0.75) : 1,
                  animation: blinkSet.has(i)
                    ? "cellBlink 0.4s ease-in-out"
                    : undefined,
                }}
              />
            ))}
          </div>

          <h2
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888",
              marginTop: "2.5rem",
              marginBottom: "0.75rem",
            }}
          >
            Critical Error
          </h2>
          <p
            style={{
              fontSize: "0.7rem",
              color: "#555",
              maxWidth: "320px",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Something went seriously wrong. The entire page failed to render.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.6rem 1.2rem",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#c97e3a",
              border: "1px solid rgba(201,126,58,0.3)",
              borderRadius: "0.5rem",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ↻ Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
