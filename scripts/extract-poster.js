import sharp from 'sharp';
import fs from 'fs';

async function extractPosters() {
  console.log('Extracting desktop hero poster (1280x720)...');
  await sharp('public/sprites/desktop/sheet_0.webp')
    .extract({ left: 0, top: 0, width: 1280, height: 720 })
    .webp({ quality: 85, effort: 6 })
    .toFile('public/images/hero-poster-desktop.webp');

  console.log('Extracting mobile hero poster (540x960)...');
  await sharp('public/sprites/mobile/sheet_0.webp')
    .extract({ left: 0, top: 0, width: 540, height: 960 })
    .webp({ quality: 85, effort: 6 })
    .toFile('public/images/hero-poster-mobile.webp');

  const deskStats = fs.statSync('public/images/hero-poster-desktop.webp');
  const mobStats = fs.statSync('public/images/hero-poster-mobile.webp');
  console.log(`Desktop poster generated: ${(deskStats.size / 1024).toFixed(1)} KB`);
  console.log(`Mobile poster generated: ${(mobStats.size / 1024).toFixed(1)} KB`);
}

extractPosters().catch(console.error);
