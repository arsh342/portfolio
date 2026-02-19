// Generate a favicon from GitHub avatar tinted with accent colors
// Run: node scripts/generate-favicon.mjs

import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SIZE = 32;

// Accent palette for brightness mapping (dark → light amber)
const ACCENT_PALETTE = [
  [10, 10, 10],
  [58, 40, 20],
  [90, 61, 26],
  [139, 94, 42],
  [166, 107, 47],
  [201, 126, 58],
  [212, 148, 62],
  [229, 168, 75],
];

async function main() {
  // Fetch avatar at good resolution
  const res = await fetch(
    "https://avatars.githubusercontent.com/u/135307874?v=4&s=128",
  );
  const buffer = Buffer.from(await res.arrayBuffer());

  // Resize to 32×32 (clear, not pixelated) and get raw RGBA pixels
  const { data, info } = await sharp(buffer)
    .resize(SIZE, SIZE, { fit: "cover" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Map each pixel's brightness to the accent palette
  const pixels = new Uint8Array(SIZE * SIZE * 4);

  for (let i = 0; i < SIZE * SIZE; i++) {
    const srcIdx = i * 4;
    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];
    const a = data[srcIdx + 3];

    if (a < 30) {
      pixels[srcIdx] = 10;
      pixels[srcIdx + 1] = 10;
      pixels[srcIdx + 2] = 10;
      pixels[srcIdx + 3] = 0;
    } else {
      const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      const palIdx = Math.min(
        Math.floor(brightness * ACCENT_PALETTE.length),
        ACCENT_PALETTE.length - 1,
      );
      const [pr, pg, pb] = ACCENT_PALETTE[palIdx];
      pixels[srcIdx] = pr;
      pixels[srcIdx + 1] = pg;
      pixels[srcIdx + 2] = pb;
      pixels[srcIdx + 3] = 255;
    }
  }

  // Round corners
  const radius = 6;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const corners = [
        [0, 0],
        [SIZE - 1, 0],
        [0, SIZE - 1],
        [SIZE - 1, SIZE - 1],
      ];
      for (const [cx, cy] of corners) {
        const dx = Math.abs(x - cx);
        const dy = Math.abs(y - cy);
        if (dx < radius && dy < radius) {
          const d = Math.sqrt(
            (dx - radius + 0.5) ** 2 + (dy - radius + 0.5) ** 2,
          );
          if (d > radius) {
            const idx = (y * SIZE + x) * 4;
            pixels[idx + 3] = 0;
          }
        }
      }
    }
  }

  // Write as 32×32 PNG
  const output = await sharp(Buffer.from(pixels.buffer), {
    raw: { width: SIZE, height: SIZE, channels: 4 },
  })
    .png()
    .toBuffer();

  const faviconPath = join(__dirname, "..", "src", "app", "icon.png");
  writeFileSync(faviconPath, output);
  console.log(
    `✅ Generated ${SIZE}×${SIZE} accent-tinted icon → ${faviconPath}`,
  );

  // Also generate a 16×16 version for ICO
  const output16 = await sharp(Buffer.from(pixels.buffer), {
    raw: { width: SIZE, height: SIZE, channels: 4 },
  })
    .resize(16, 16, { fit: "cover" })
    .png()
    .toBuffer();

  const favicon16Path = join(__dirname, "..", "src", "app", "favicon.ico");
  writeFileSync(favicon16Path, output16);
  console.log(`✅ Generated 16×16 favicon → ${favicon16Path}`);
}

main().catch(console.error);
