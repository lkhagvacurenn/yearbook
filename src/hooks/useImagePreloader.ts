import { useState, useEffect, useRef } from 'react';

export function useImagePreloader(urls: string[]) {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  // Dedupe and ignore empty strings
  const key = urls.filter(Boolean).join('|');
  const prevKey = useRef('');

  useEffect(() => {
    if (!key) { setLoaded(true); return; }
    // Don't re-run if URL list hasn't changed
    if (key === prevKey.current) return;
    prevKey.current = key;

    const list = urls.filter(Boolean);
    if (list.length === 0) { setLoaded(true); return; }

    setLoaded(false);
    setProgress(0);
    let done = 0;

    list.forEach((src) => {
      const img = new window.Image();
      const finish = () => {
        done++;
        setProgress(Math.round((done / list.length) * 100));
        if (done === list.length) setLoaded(true);
      };
      // Try PNG, fall back to JPG
      img.onload = finish;
      img.onerror = () => {
        if (src.endsWith('.png')) {
          const fallback = new window.Image();
          fallback.onload = finish;
          fallback.onerror = finish; // count as done even if missing
          fallback.src = src.replace('.png', '.jpg');
        } else {
          finish(); // missing — count as done so we don't hang forever
        }
      };
      img.src = src;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { loaded, progress };
}
