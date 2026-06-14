import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useImagePreloader } from '../hooks/useImagePreloader';
import PageImageLoader from '../components/PageImageLoader';

const PHOTOS = [
  'class-01', 'class-02', 'class-03', 'class-04', 'class-05',
  'class-06', 'class-07', 'class-08', 'class-09', 'class-10',
  'class-11', 'class-12', 'class-13',
];

const IMAGE_URLS = PHOTOS.map(id => `./images/class/${id}.png`);

export default function ClassMemories() {
  const { loaded, progress } = useImagePreloader(IMAGE_URLS);
  return (
    <div
      className="w-full h-full overflow-y-auto relative"
      style={{
        background: 'linear-gradient(160deg,#0a0f1e 0%,#0d1b3e 50%,#080c18 100%)',
        minHeight: '100%',
      }}
    >
    <PageImageLoader loaded={loaded} progress={progress}>
      {/* Header */}
      <div className="pt-6 px-6 pb-4 flex items-center gap-3">
        <Camera size={20} color="#93c5fd" />
        <div>
          <h2
            style={{
              fontFamily: '"Playfair Display",serif',
              fontSize: 'clamp(1.3rem,3.5vw,2rem)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.1,
            }}
          >
            Class Memories
          </h2>
          <p style={{ fontFamily: '"Caveat",cursive', fontSize: '0.9rem', color: '#93c5fd' }}>
            Every photo tells a story. These are ours.
          </p>
        </div>
      </div>

      {/* Masonry — CSS columns preserves every photo's natural ratio, zero cropping */}
      <div
        style={{
          columns: 'var(--cols, 3)',
          columnGap: '5px',
          padding: '0 6px 16px',
          /* 2 cols on narrow screens */
          ['--cols' as string]: '3',
        }}
        className="masonry-gallery"
      >
        {PHOTOS.map((id, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35, ease: 'easeOut' }}
            style={{
              breakInside: 'avoid',
              marginBottom: '5px',
              borderRadius: 6,
              overflow: 'hidden',
              background: '#1e293b',
              position: 'relative',
              display: 'block',
            }}
          >
            <img
              src={`./images/class/${id}.png`}
              alt={`Class memory ${i + 1}`}
              style={{
                width: '100%',
                height: 'auto',       /* natural ratio — no cropping */
                display: 'block',
                transition: 'transform 0.4s ease, filter 0.4s ease',
              }}
              onMouseEnter={e => {
                (e.target as HTMLImageElement).style.transform = 'scale(1.03)';
                (e.target as HTMLImageElement).style.filter = 'brightness(1.08)';
              }}
              onMouseLeave={e => {
                (e.target as HTMLImageElement).style.transform = 'scale(1)';
                (e.target as HTMLImageElement).style.filter = 'brightness(1)';
              }}
              onError={e => {
                const img = e.target as HTMLImageElement;
                if (img.src.endsWith('.png')) {
                  img.src = `./images/class/${id}.jpg`;
                } else {
                  img.style.display = 'none';
                }
              }}
            />
          </motion.div>
        ))}
      </div>

      <p
        className="text-center pb-5"
        style={{ fontFamily: '"Caveat",cursive', fontSize: '0.85rem', color: '#334155', fontStyle: 'italic' }}
      >
        IT Class of 2026 · Уlaanbaatar
      </p>

      {/* Responsive column count */}
      <style>{`
        .masonry-gallery { --cols: 3; }
        @media (max-width: 640px) { .masonry-gallery { --cols: 2; } }
      `}</style>
    </PageImageLoader>
    </div>
  );
}
