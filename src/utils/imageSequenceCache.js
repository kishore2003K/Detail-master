// Shared singleton cache for the 240-frame car sequence
// Prevents downloading 28MB twice across Hero and CeramicCoatingShowcase

const TOTAL_FRAMES = 240;
const imagesCache = new Array(TOTAL_FRAMES);
const loadedSet = new Set();
let isPass1Complete = false;
let loadPromise = null;
const listeners = new Set();

function notifyListeners() {
  listeners.forEach((fn) => fn(loadedSet.size, isPass1Complete));
}

export function subscribeSequenceLoad(callback) {
  listeners.add(callback);
  // Initial state call
  callback(loadedSet.size, isPass1Complete);
  return () => listeners.delete(callback);
}

export function getImageSequence() {
  return imagesCache;
}

export function getLoadedSet() {
  return loadedSet;
}

export function preloadImageSequence() {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    let pass1LoadedCount = 0;
    const stride = 4; // Pass 1: Every 4th frame (60 frames total ~ 6MB)
    const pass1Indexes = [];

    for (let i = 0; i < TOTAL_FRAMES; i += stride) {
      pass1Indexes.push(i);
    }

    // Prepare all image instances
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!imagesCache[i]) {
        const img = new Image();
        const frameNum = (i + 1).toString().padStart(4, "0");
        img.src = `/car-sequence/image_${frameNum}.jpg`;
        img.decoding = "async";
        imagesCache[i] = img;
      }
    }

    // Handle Pass 1 loading
    pass1Indexes.forEach((idx) => {
      const img = imagesCache[idx];

      const handlePass1Item = () => {
        loadedSet.add(idx);
        pass1LoadedCount++;
        notifyListeners();

        // Resolve promise as soon as Pass 1 (key frames) are 80% ready or finished
        if (pass1LoadedCount >= Math.floor(pass1Indexes.length * 0.8) && !isPass1Complete) {
          isPass1Complete = true;
          resolve(imagesCache);
          startPass2();
        }
      };

      if (img.complete && img.naturalWidth > 0) {
        handlePass1Item();
      } else {
        img.onload = handlePass1Item;
        img.onerror = handlePass1Item;
      }
    });

    // Safety timeout: resolve within 1.2s max no matter what
    setTimeout(() => {
      if (!isPass1Complete) {
        isPass1Complete = true;
        resolve(imagesCache);
        startPass2();
      }
    }, 1200);
  });

  return loadPromise;
}

// Background loading of remaining frames (Pass 2)
function startPass2() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    if (!loadedSet.has(i)) {
      const img = imagesCache[i];
      if (!img) continue;

      const handlePass2Item = () => {
        loadedSet.add(i);
        notifyListeners();
      };

      if (img.complete && img.naturalWidth > 0) {
        handlePass2Item();
      } else {
        img.onload = handlePass2Item;
        img.onerror = handlePass2Item;
      }
    }
  }
}
