import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';

interface Props {
  loaded: boolean;
  progress: number;
  children: React.ReactNode;
}

export default function PageImageLoader({ loaded, progress, children }: Props) {
  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="page-loader"
            className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4"
            style={{ background: 'rgba(8,12,24,0.92)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Camera size={40} color="#60a5fa" strokeWidth={1.5} />
            </motion.div>

            <p style={{ fontFamily: '"Caveat",cursive', fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)' }}>
              Loading photos…
            </p>

            {/* Progress bar */}
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 200, height: 5, background: 'rgba(255,255,255,0.1)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            <p style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
              {progress}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always mount children so images can start loading */}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease', height: '100%' }}>
        {children}
      </div>
    </>
  );
}
