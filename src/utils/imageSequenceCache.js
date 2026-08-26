// High-Performance Sprite Sheet + WebP Hybrid Cache
// Collapses 160 HTTP requests to 5-10 WebP sheets with Tier 1 instant anchor loading

export const TOTAL_FRAMES = 160;

export function getSequenceMode() {
  if (typeof window === 'undefined') return 'desktop';
  return window.innerWidth < 768 ? 'mobile' : 'desktop';
}

const manifests = {
  desktop: null,
  mobile: null,
};

const sheetImages = {
  desktop: {},
  mobile: {},
};

const loadedSheets = {
  desktop: new Set(),
  mobile: new Set(),
};

const loadedFrames = {
  desktop: new Set(),
  mobile: new Set(),
};

const loadPromises = {
  desktop: null,
  mobile: null,
};

let isTier1Complete = {
  desktop: false,
  mobile: false,
};

const listeners = new Set();

function notifyListeners(mode) {
  listeners.forEach((fn) =>
    fn(loadedFrames[mode].size, isTier1Complete[mode], mode)
  );
}

export function subscribeSequenceLoad(callback) {
  listeners.add(callback);
  const currentMode = getSequenceMode();
  callback(loadedFrames[currentMode].size, isTier1Complete[currentMode], currentMode);
  return () => listeners.delete(callback);
}

async function fetchManifest(mode) {
  if (manifests[mode]) return manifests[mode];
  try {
    const res = await fetch(`/sprites/${mode}/manifest.json`);
    const data = await res.json();
    manifests[mode] = data;
    return data;
  } catch (err) {
    console.error(`Failed to load ${mode} sprite manifest`, err);
    return null;
  }
}

function loadSheetImage(mode, sheetIndex) {
  if (sheetImages[mode][sheetIndex]) {
    return Promise.resolve(sheetImages[mode][sheetIndex]);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = `/sprites/${mode}/sheet_${sheetIndex}.webp`;
    img.decoding = 'async';

    img.onload = async () => {
      try {
        if ('decode' in img) {
          await img.decode().catch(() => {});
        }
      } catch (_) {}

      sheetImages[mode][sheetIndex] = img;
      loadedSheets[mode].add(sheetIndex);

      // Register all frames that belong to this sheet
      const manifest = manifests[mode];
      if (manifest && manifest.frames) {
        Object.entries(manifest.frames).forEach(([fIdx, info]) => {
          if (info.sheet === sheetIndex) {
            loadedFrames[mode].add(parseInt(fIdx, 10));
          }
        });
      }

      notifyListeners(mode);
      resolve(img);
    };

    img.onerror = (e) => {
      console.error(`Failed to load sheet_${sheetIndex}.webp for ${mode}`, e);
      reject(e);
    };
  });
}

export async function preloadImageSequence(mode) {
  const targetMode = mode || getSequenceMode();

  if (loadPromises[targetMode]) {
    return loadPromises[targetMode];
  }

  loadPromises[targetMode] = (async () => {
    // 1. Fetch manifest for target mode
    const manifest = await fetchManifest(targetMode);
    if (!manifest) return false;

    // 2. Tier 1: Preload Anchor Sheet 0 (~800KB desktop / ~500KB mobile)
    try {
      await loadSheetImage(targetMode, 0);
      isTier1Complete[targetMode] = true;
      notifyListeners(targetMode);
    } catch (e) {
      console.warn(`Sheet 0 load warning for ${targetMode}`, e);
      isTier1Complete[targetMode] = true;
    }

    // 3. Tier 2 & 3: Background fetch remaining detail sheets (1..N)
    const remainingSheets = [];
    for (let s = 1; s < manifest.numSheets; s++) {
      remainingSheets.push(s);
    }

    // Fetch detail sheets in parallel without blocking main thread
    remainingSheets.forEach((s) => {
      loadSheetImage(targetMode, s).catch(() => {});
    });

    return true;
  })();

  return loadPromises[targetMode];
}

/**
 * Returns the source sheet image and sub-rectangle coordinates for rendering targetFrame
 * If targetFrame sheet is not loaded yet, falls back to the nearest loaded anchor frame.
 */
export function getFrameSource(targetFrameIndex, mode) {
  const selectedMode = mode || getSequenceMode();
  const manifest = manifests[selectedMode];
  if (!manifest || !manifest.frames) return null;

  const total = manifest.totalFrames || TOTAL_FRAMES;
  const clampedIndex = Math.max(0, Math.min(total - 1, targetFrameIndex));

  // Find nearest loaded frame index
  let actualIndex = clampedIndex;
  const currentLoaded = loadedFrames[selectedMode];

  if (!currentLoaded.has(actualIndex)) {
    let found = false;
    for (let offset = 1; offset < total; offset++) {
      if (clampedIndex - offset >= 0 && currentLoaded.has(clampedIndex - offset)) {
        actualIndex = clampedIndex - offset;
        found = true;
        break;
      }
      if (clampedIndex + offset < total && currentLoaded.has(clampedIndex + offset)) {
        actualIndex = clampedIndex + offset;
        found = true;
        break;
      }
    }
    if (!found) {
      // If no exact match, try frame 0 if sheet 0 is ready
      if (currentLoaded.has(0)) {
        actualIndex = 0;
      } else {
        return null;
      }
    }
  }

  const frameInfo = manifest.frames[actualIndex];
  if (!frameInfo) return null;

  const sheetImg = sheetImages[selectedMode][frameInfo.sheet];
  if (!sheetImg || !sheetImg.complete || sheetImg.naturalWidth === 0) {
    return null;
  }

  return {
    img: sheetImg,
    sx: frameInfo.x,
    sy: frameInfo.y,
    sWidth: frameInfo.w,
    sHeight: frameInfo.h,
    actualIndex,
  };
}

export function getLoadedFrameCount(mode) {
  const selectedMode = mode || getSequenceMode();
  return loadedFrames[selectedMode].size;
}
