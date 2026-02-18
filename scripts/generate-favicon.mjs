// Generate a pixelated favicon from GitHub avatar using accent palette
// Run: node scripts/generate-favicon.mjs

import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

const GRID = 8; // 8×8 pixel art
const CELL = 4; // each pixel = 4×4 in output → 32×32 favicon
const SIZE = GRID * CELL;

async function main() {
  // Fetch avatar at tiny size
  const res = await fetch(
    "https://avatars.githubusercontent.com/u/135307874?v=4&s=8",
  );
  const buffer = Buffer.from(await res.arrayBuffer());

  // Resize to 8×8 and get raw RGBA pixels
  const { data, info } = await sharp(buffer)
    .resize(GRID, GRID, { fit: "cover" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Map each pixel to accent palette based on brightness
  const pixels = new Uint8Array(SIZE * SIZE * 4);

  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const srcIdx = (y * info.width + x) * 4;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];
      const a = data[srcIdx + 3];

      let pr, pg, pb, pa;
      if (a < 30) {
        [pr, pg, pb, pa] = [10, 10, 10, 255];
      } else {
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        const palIdx = Math.min(
          Math.floor(brightness * ACCENT_PALETTE.length),
          ACCENT_PALETTE.length - 1,
        );
        [pr, pg, pb] = ACCENT_PALETTE[palIdx];
        pa = 255;
      }

      // Fill the CELL×CELL block
      for (let dy = 0; dy < CELL; dy++) {
        for (let dx = 0; dx < CELL; dx++) {
          const outX = x * CELL + dx;
          const outY = y * CELL + dy;
          const outIdx = (outY * SIZE + outX) * 4;
          pixels[outIdx] = pr;
          pixels[outIdx + 1] = pg;
          pixels[outIdx + 2] = pb;
          pixels[outIdx + 3] = pa;
        }
      }
    }
  }

  // Create rounded mask (round corners by ~3px)
  const radius = 6;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let dist = SIZE; // large default
      // Check all four corners
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
            pixels[idx + 3] = 0; // make transparent
          }
        }
      }
    }
  }

  // Write as PNG
  const output = await sharp(Buffer.from(pixels.buffer), {
    raw: { width: SIZE, height: SIZE, channels: 4 },
  })
    .png()
    .toBuffer();

  const faviconPath = join(__dirname, "..", "src", "app", "icon.png");
  writeFileSync(faviconPath, output);
  console.log(`✅ Generated ${SIZE}×${SIZE} pixelated icon → ${faviconPath}`);

  // Also generate a 16×16 version for ICO
  const output16 = await sharp(Buffer.from(pixels.buffer), {
    raw: { width: SIZE, height: SIZE, channels: 4 },
  })
    .resize(16, 16, { fit: "cover" })
    .png()
    .toBuffer();

  const favicon16Path = join(__dirname, "..", "src", "app", "favicon.ico");
  // Write as PNG with .ico extension (browsers accept PNG favicons)
  writeFileSync(favicon16Path, output16);
  console.log(`✅ Generated 16×16 favicon → ${favicon16Path}`);
}

main().catch(console.error);
