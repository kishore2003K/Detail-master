import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const CONFIG = {
  desktop: {
    srcDir: 'public/DesktopFrames',
    outDir: 'public/sprites/desktop',
    totalFrames: 160,
    stride: 1, // all 160 frames
    frameWidth: 1280,
    frameHeight: 720,
    cols: 4,
    rows: 4,
    framesPerSheet: 16,
    quality: 85,
  },
  mobile: {
    srcDir: 'public/MobileFrames',
    outDir: 'public/sprites/mobile',
    totalFrames: 160,
    stride: 2, // 80 frames
    frameWidth: 540,
    frameHeight: 960,
    cols: 4,
    rows: 4,
    framesPerSheet: 16,
    quality: 85,
  },
};

async function buildSpriteSheets(type) {
  const cfg = CONFIG[type];
  console.log(`\n=== Building ${type.toUpperCase()} Sprite Sheets ===`);

  if (!fs.existsSync(cfg.outDir)) {
    fs.mkdirSync(cfg.outDir, { recursive: true });
  }

  // 1. Gather source frame indices
  const allFrameIndices = [];
  for (let i = 0; i < cfg.totalFrames; i += cfg.stride) {
    allFrameIndices.push(i);
  }
  const totalCount = allFrameIndices.length;
  const numSheets = Math.ceil(totalCount / cfg.framesPerSheet);

  console.log(`Total target frames: ${totalCount} across ${numSheets} sheets`);

  // 2. Select Tier 1 Anchor Frames (16 evenly distributed keyframes for Sheet 0)
  const anchorIndices = [];
  const anchorStep = totalCount / cfg.framesPerSheet;
  for (let i = 0; i < cfg.framesPerSheet; i++) {
    const pickIndex = Math.min(totalCount - 1, Math.floor(i * anchorStep));
    anchorIndices.push(allFrameIndices[pickIndex]);
  }
  const anchorSet = new Set(anchorIndices);

  // 3. Remaining detail frames for Sheets 1..N
  const detailIndices = allFrameIndices.filter((idx) => !anchorSet.has(idx));

  // Organize sheets: Sheet 0 is anchors, Sheet 1..N are details
  const sheets = [];
  sheets.push({ sheetIndex: 0, frameIndices: anchorIndices, isAnchor: true });

  for (let s = 1; s < numSheets; s++) {
    const start = (s - 1) * cfg.framesPerSheet;
    const end = Math.min(detailIndices.length, start + cfg.framesPerSheet);
    const chunk = detailIndices.slice(start, end);
    sheets.push({ sheetIndex: s, frameIndices: chunk, isAnchor: false });
  }

  // Manifest mapping: virtualFrameIndex (0..total-1) -> { sheet, x, y, width, height }
  const manifest = {
    type,
    totalFrames: cfg.totalFrames,
    effectiveFrameCount: totalCount,
    frameWidth: cfg.frameWidth,
    frameHeight: cfg.frameHeight,
    numSheets,
    frames: {}, // targetFrame (0..159) -> { sheetIndex, sx, sy, sWidth, sHeight }
  };

  // 4. Generate each sprite sheet texture
  for (const sheet of sheets) {
    const { sheetIndex, frameIndices } = sheet;
    const sheetCanvasWidth = cfg.frameWidth * cfg.cols;
    const sheetCanvasHeight = cfg.frameHeight * cfg.rows;

    console.log(
      `Processing Sheet ${sheetIndex} (${frameIndices.length} frames)...`
    );

    const composites = [];

    for (let slot = 0; slot < frameIndices.length; slot++) {
      const frameIdx = frameIndices[slot];
      const col = slot % cfg.cols;
      const row = Math.floor(slot / cfg.cols);
      const sx = col * cfg.frameWidth;
      const sy = row * cfg.frameHeight;

      // Source filename is 1-indexed (frame_000001.png .. frame_000160.png)
      const srcFileName = `frame_${(frameIdx + 1)
        .toString()
        .padStart(6, '0')}.png`;
      const srcFilePath = path.join(cfg.srcDir, srcFileName);

      if (!fs.existsSync(srcFilePath)) {
        console.error(`Missing source frame: ${srcFilePath}`);
        continue;
      }

      // Resize frame to target dimensions
      const frameBuffer = await sharp(srcFilePath)
        .resize(cfg.frameWidth, cfg.frameHeight, { fit: 'fill' })
        .toBuffer();

      composites.push({
        input: frameBuffer,
        left: sx,
        top: sy,
      });

      // Record in manifest
      manifest.frames[frameIdx] = {
        sheet: sheetIndex,
        x: sx,
        y: sy,
        w: cfg.frameWidth,
        h: cfg.frameHeight,
      };
    }

    // Compose blank sheet background and overlay frames
    const sheetFileName = `sheet_${sheetIndex}.webp`;
    const sheetFilePath = path.join(cfg.outDir, sheetFileName);

    await sharp({
      create: {
        width: sheetCanvasWidth,
        height: sheetCanvasHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      },
    })
      .composite(composites)
      .webp({ quality: cfg.quality, effort: 4 })
      .toFile(sheetFilePath);

    const stat = fs.statSync(sheetFilePath);
    console.log(
      `✓ Saved ${sheetFileName} (${(stat.size / 1024).toFixed(1)} KB)`
    );
  }

  // Save manifest
  const manifestPath = path.join(cfg.outDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✓ Saved manifest to ${manifestPath}`);
}

async function main() {
  const start = Date.now();
  await buildSpriteSheets('desktop');
  await buildSpriteSheets('mobile');
  console.log(
    `\n✨ All sprite sheets generated successfully in ${(
      (Date.now() - start) /
      1000
    ).toFixed(2)}s!`
  );
}

main().catch(console.error);

