/**
 * gen-og.mjs — Genera la imagen Open Graph (1200x630) para compartir en
 * redes (WhatsApp, LinkedIn…). Compone la foto de perfil + nombre + rol
 * sobre un lienzo oscuro con la grilla del sitio.
 *
 * Ejecutar una vez (o cuando cambie la foto):  node scripts/gen-og.mjs
 * Requiere sharp (devDependency). La salida se commitea: public/img/og-image.png
 */
import sharp from "sharp";

const W = 1200;
const H = 630;
const PHOTO_W = 330;
const PHOTO_H = 430;

// Foto recortada (cover, mostrando la parte superior) y con esquinas redondeadas.
const mask = Buffer.from(
  `<svg width="${PHOTO_W}" height="${PHOTO_H}"><rect width="${PHOTO_W}" height="${PHOTO_H}" rx="26" ry="26" fill="#fff"/></svg>`,
);
const photo = await sharp("public/img/perfil.webp")
  .resize(PHOTO_W, PHOTO_H, { fit: "cover", position: "top" })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

// Lienzo oscuro con grilla + textos.
const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="28%" cy="35%" r="85%">
      <stop offset="0%" stop-color="#15151a"/>
      <stop offset="100%" stop-color="#0A0A0B"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 H0 V48" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect x="${W - PHOTO_W - 78}" y="${(H - PHOTO_H) / 2 - 8}" width="${PHOTO_W + 16}" height="${PHOTO_H + 16}" rx="34" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <g fill="#F5F5F7" font-family="'Segoe UI', 'Space Grotesk', system-ui, sans-serif">
    <circle cx="92" cy="150" r="7" fill="#4ade80"/>
    <text x="112" y="157" font-family="'Consolas','JetBrains Mono',monospace" font-size="21" fill="#a1a1aa" letter-spacing="2">DISPONIBLE PARA TRABAJAR</text>
    <text x="88" y="272" font-size="68" font-weight="700">Manuel Andrés</text>
    <text x="88" y="348" font-size="68" font-weight="700" fill="#a1a1aa">Cárdenas Suárez</text>
    <text x="90" y="424" font-family="'Consolas','JetBrains Mono',monospace" font-size="25" fill="#f5f5f7">Analista y Desarrollador de Software</text>
    <text x="90" y="470" font-family="'Consolas','JetBrains Mono',monospace" font-size="21" fill="#a1a1aa">manuelcardenas.online</text>
  </g>
</svg>`;

await sharp(Buffer.from(bg))
  .composite([
    {
      input: photo,
      left: W - PHOTO_W - 70,
      top: Math.round((H - PHOTO_H) / 2),
    },
  ])
  .png()
  .toFile("public/img/og-image.png");

console.log("✓ public/img/og-image.png generado (1200x630)");
