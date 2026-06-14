/**
 * Preloads an array of image URLs.
 * Resolves when all images have loaded (or failed).
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // resolve even on error so we don't block
          img.src = url;
        })
    )
  );
}

/**
 * Build the list of student portrait / childhood URLs to preload.
 * We preload the first N students for fast initial render.
 */
export function buildStudentImageUrls(ids: string[], basePath = './images/students'): string[] {
  return ids.flatMap((id) => [
    `${basePath}/${id}.jpg`,
    `${basePath}/${id}-child.jpg`,
  ]);
}

/** Returns a placeholder gradient data-URL (used when real images are missing). */
export function placeholderUrl(seed: number): string {
  const hues = [220, 260, 200, 240, 280];
  const h = hues[seed % hues.length];
  // A tiny SVG placeholder with a silhouette tint
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='240'>
    <defs>
      <linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' style='stop-color:hsl(${h},40%,70%)'/>
        <stop offset='100%' style='stop-color:hsl(${h},60%,40%)'/>
      </linearGradient>
    </defs>
    <rect width='200' height='240' fill='url(#g)'/>
    <text x='100' y='130' font-size='64' text-anchor='middle' fill='rgba(255,255,255,0.5)'>👤</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
