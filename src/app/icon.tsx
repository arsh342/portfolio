import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const GRID = 8;
const CELL = size.width / GRID;

const ACCENT_PALETTE = [
  "rgb(10,10,10)",
  "rgb(58,40,20)",
  "rgb(90,61,26)",
  "rgb(139,94,42)",
  "rgb(166,107,47)",
  "rgb(201,126,58)",
  "rgb(212,148,62)",
  "rgb(229,168,75)",
];

export default async function Icon() {
  // Fetch avatar at tiny resolution
  const avatarUrl = "https://avatars.githubusercontent.com/u/135307874?v=4&s=8";

  let pixels: string[] = [];

  try {
    const res = await fetch(avatarUrl);
    const buffer = await res.arrayBuffer();
    const { decodePng } = await getPngDecoder();
    const decoded = decodePng(new Uint8Array(buffer));

    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const srcX = Math.floor((x / GRID) * decoded.width);
        const srcY = Math.floor((y / GRID) * decoded.height);
        const idx = (srcY * decoded.width + srcX) * 4;
        const r = decoded.data[idx];
        const g = decoded.data[idx + 1];
        const b = decoded.data[idx + 2];
        const a = decoded.data[idx + 3];

        if (a < 30) {
          pixels.push("transparent");
        } else {
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const palIdx = Math.min(
            Math.floor(brightness * ACCENT_PALETTE.length),
            ACCENT_PALETTE.length - 1,
          );
          pixels.push(ACCENT_PALETTE[palIdx]);
        }
      }
    }
  } catch {
    // Fallback: simple amber grid
    for (let i = 0; i < GRID * GRID; i++) {
      pixels.push(ACCENT_PALETTE[3 + (i % 4)]);
    }
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: size.width,
        height: size.height,
        borderRadius: 6,
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {pixels.map((color, i) => (
        <div
          key={i}
          style={{
            width: CELL,
            height: CELL,
            backgroundColor: color,
          }}
        />
      ))}
    </div>,
    { ...size },
  );
}

// Minimal PNG decoder — parses raw RGBA from an uncompressed/deflated PNG
async function getPngDecoder() {
  return {
    decodePng: (data: Uint8Array) => {
      // Find IHDR
      let pos = 8; // skip PNG signature
      let width = 0;
      let height = 0;
      const idatChunks: Uint8Array[] = [];

      while (pos < data.length) {
        const len =
          (data[pos] << 24) |
          (data[pos + 1] << 16) |
          (data[pos + 2] << 8) |
          data[pos + 3];
        const type = String.fromCharCode(
          data[pos + 4],
          data[pos + 5],
          data[pos + 6],
          data[pos + 7],
        );

        if (type === "IHDR") {
          width =
            (data[pos + 8] << 24) |
            (data[pos + 9] << 16) |
            (data[pos + 10] << 8) |
            data[pos + 11];
          height =
            (data[pos + 12] << 24) |
            (data[pos + 13] << 16) |
            (data[pos + 14] << 8) |
            data[pos + 15];
        } else if (type === "IDAT") {
          idatChunks.push(data.slice(pos + 8, pos + 8 + len));
        } else if (type === "IEND") {
          break;
        }
        pos += 12 + len; // 4 len + 4 type + data + 4 crc
      }

      // Decompress IDAT
      const compressed = concatUint8Arrays(idatChunks);
      const decompressed = inflateSync(compressed);

      // Unfilter — assume 8-bit RGBA (color type 6)
      const bpp = 4;
      const stride = width * bpp;
      const pixels = new Uint8Array(width * height * 4);

      for (let y = 0; y < height; y++) {
        const filterByte = decompressed[y * (stride + 1)];
        const rowStart = y * (stride + 1) + 1;
        const outStart = y * stride;

        for (let x = 0; x < stride; x++) {
          const raw = decompressed[rowStart + x];
          let a = 0,
            b2 = 0,
            c = 0;

          if (x >= bpp) a = pixels[outStart + x - bpp];
          if (y > 0) b2 = pixels[(y - 1) * stride + x];
          if (x >= bpp && y > 0) c = pixels[(y - 1) * stride + x - bpp];

          switch (filterByte) {
            case 0:
              pixels[outStart + x] = raw;
              break;
            case 1:
              pixels[outStart + x] = (raw + a) & 0xff;
              break;
            case 2:
              pixels[outStart + x] = (raw + b2) & 0xff;
              break;
            case 3:
              pixels[outStart + x] = (raw + ((a + b2) >> 1)) & 0xff;
              break;
            case 4:
              pixels[outStart + x] = (raw + paethPredictor(a, b2, c)) & 0xff;
              break;
          }
        }
      }

      return { width, height, data: pixels };
    },
  };
}

function concatUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

function paethPredictor(a: number, b: number, c: number): number {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function inflateSync(data: Uint8Array): Uint8Array {
  // Use DecompressionStream (available in Node 18+)
  // But since this is sync context, use zlib
  const { inflateSync: zlibInflate } = require("zlib");
  return new Uint8Array(zlibInflate(Buffer.from(data)));
}
