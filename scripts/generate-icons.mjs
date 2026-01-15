import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');

const svgContent = readFileSync(resolve(publicDir, 'favicon.svg'), 'utf-8');

async function generateIcons() {
  // Generate 192x192 icon
  await sharp(Buffer.from(svgContent))
    .resize(192, 192)
    .png()
    .toFile(resolve(publicDir, 'pwa-192x192.png'));
  console.log('Generated pwa-192x192.png');

  // Generate 512x512 icon
  await sharp(Buffer.from(svgContent))
    .resize(512, 512)
    .png()
    .toFile(resolve(publicDir, 'pwa-512x512.png'));
  console.log('Generated pwa-512x512.png');

  // Generate Apple touch icon (180x180)
  await sharp(Buffer.from(svgContent))
    .resize(180, 180)
    .png()
    .toFile(resolve(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
