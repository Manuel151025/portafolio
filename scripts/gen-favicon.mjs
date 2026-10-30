/**
 * gen-favicon.mjs — Genera los favicons rasterizados a partir de
 * public/favicon.svg (fuente única): favicon.ico (16, 32 y 48 px) para
 * navegadores sin soporte SVG y apple-touch-icon.png (180 px) para iOS.
 *
 * Ejecutar cuando cambie el SVG:  node scripts/gen-favicon.mjs
 * Requiere sharp (devDependency). Las salidas se commitean en public/.
 */
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile("public/favicon.svg");
const render = (size) =>
  sharp(svg, { density: (72 * size) / 32 }).resize(size, size).png().toBuffer();

// ICO con PNG embebidos: cabecera (6 B) + una entrada de 16 B por tamaño.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(render));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0); // reservado
header.writeUInt16LE(1, 2); // tipo: icono
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(size, entry); // ancho
  header.writeUInt8(size, entry + 1); // alto
  header.writeUInt16LE(1, entry + 4); // planos
  header.writeUInt16LE(32, entry + 6); // bits por píxel
  header.writeUInt32LE(pngs[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += pngs[i].length;
});
await writeFile("public/favicon.ico", Buffer.concat([header, ...pngs]));

// iOS recorta sus propias esquinas: se aplana sobre el fondo base.
await sharp(svg, { density: (72 * 180) / 32 })
  .resize(180, 180)
  .flatten({ background: "#0A0A0B" })
  .png()
  .toFile("public/apple-touch-icon.png");

console.log("✓ public/favicon.ico (16/32/48) y public/apple-touch-icon.png (180)");
