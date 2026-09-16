/**
 * Utility for preloading critical initial viewport assets (Hero images & fonts)
 * to ensure smooth rendering without layout shifts or broken image loading.
 */

export const preloadImage = (src: string): Promise<void> => {
  if (typeof window === 'undefined') return Promise.resolve();

  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (img.complete) {
      resolve();
    } else {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve on error to prevent blocking
    }
  });
};

export const preloadHeroAssets = (): Promise<void[]> => {
  const heroAssets = ['/bunga.webp', '/burung.webp'];
  return Promise.all(heroAssets.map(preloadImage));
};

export const waitForFonts = (): Promise<void> => {
  if (typeof window === 'undefined' || !('fonts' in document)) {
    return Promise.resolve();
  }

  return Promise.race([
    document.fonts.ready.then(() => {}),
    new Promise<void>((resolve) => setTimeout(resolve, 1000)),
  ]);
};

/**
 * Preloads hero assets with a strict timeout fallback to guarantee execution.
 */
export const prepareMainContentAssets = async (maxTimeoutMs = 2500, minDisplayMs = 700): Promise<void> => {
  const minDelay = new Promise<void>((resolve) => setTimeout(resolve, minDisplayMs));

  const loadAssets = Promise.allSettled([
    preloadHeroAssets(),
    waitForFonts(),
    minDelay,
  ]);

  const timeoutFallback = new Promise<void>((resolve) => setTimeout(resolve, maxTimeoutMs));

  await Promise.race([loadAssets, timeoutFallback]);
};
