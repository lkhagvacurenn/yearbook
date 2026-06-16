import { useState, useEffect } from 'react';
import { preloadImages, buildStudentImageUrls } from '../utils/imageLoader';
import studentsData from '../data/students.json';

const FUNNY_MESSAGES = [
  'Bro wait... ',
  'Loading memories...',
  'I am hosted on the cheapest server available.',
  'Before judging me, check your internet. 📡',
  'You survived SISI for 4 years.',
  'So I believe you can wait 5 more seconds. ⏳',
  'Generating graduation nostalgia...',
  'Loading academic trauma... 📚',
  'Finding missing assignments... 🔍',
  'Still loading... just like university WiFi.',
  'Calibrating cap angle... 🎓',
  'Counting late-night coding sessions...',
  'Recovering from thesis panic... 😭',
  'Compiling 4 years of memories...',
  'Almost there. We promise. 🙏',
];

export function usePreloader() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(FUNNY_MESSAGES[0]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let msgIndex = 0;
    const msgInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % FUNNY_MESSAGES.length;
      setMessage(FUNNY_MESSAGES[msgIndex]);
    }, 2200);

    // Simulate smooth progress while actually loading
    const startTime = Date.now();
    const targetDuration = 4500; // ms minimum loading time for the experience

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const natural = Math.min((elapsed / targetDuration) * 90, 90);
      setProgress(Math.floor(natural));
    }, 80);

    // Actually preload critical images
    const ids = (studentsData as { id: string }[]).slice(0, 6).map((s) => s.id);
    const urls = buildStudentImageUrls(ids);

    Promise.all([
      preloadImages(urls),
      new Promise<void>((r) => setTimeout(r, targetDuration)),
    ]).then(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        clearInterval(msgInterval);
        setDone(true);
      }, 600);
    });

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return { progress, message, done };
}
