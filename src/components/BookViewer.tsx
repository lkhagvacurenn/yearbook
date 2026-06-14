import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';
import { useKeyboard } from '../hooks/useKeyboard';

// Pages — import all yearbook page components
import StudentDirectory from '../pages/StudentDirectory';
import MemoriesPage from '../pages/MemoriesPage';
import UniversityLife from '../pages/UniversityLife';
import ClassMemories from '../pages/ClassMemories';
import ThankYouPage from '../pages/ThankYouPage';
import FinalPage from '../pages/FinalPage';

interface Props {
  onClose: () => void;
}

// Each entry is one full "spread" shown in the viewer
// On mobile we show one page at a time (left first, then right)
const SPREADS = [
  { label: 'Student Directory',  left: <StudentDirectory />,  right: null },
  { label: 'Memories',           left: <MemoriesPage />,      right: null },
  { label: 'University Life',    left: <UniversityLife />,    right: null },
  { label: 'Class Memories',     left: <ClassMemories />,     right: null },
  { label: 'Thank You',          left: <ThankYouPage />,      right: null },
  { label: 'Final Page',         left: <FinalPage onClose={() => {}} />, right: null },
];

export default function BookViewer({ onClose }: Props) {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const totalSpreads = SPREADS.length;

  const goNext = useCallback(() => {
    if (isFlipping || currentSpread >= totalSpreads - 1) return;
    setIsFlipping(true);
    setDirection(1);
    setTimeout(() => {
      setCurrentSpread((p) => p + 1);
      setIsFlipping(false);
    }, 400);
  }, [isFlipping, currentSpread, totalSpreads]);

  const goPrev = useCallback(() => {
    if (isFlipping || currentSpread <= 0) return;
    setIsFlipping(true);
    setDirection(-1);
    setTimeout(() => {
      setCurrentSpread((p) => p - 1);
      setIsFlipping(false);
    }, 400);
  }, [isFlipping, currentSpread]);

  useKeyboard({ ArrowRight: goNext, ArrowLeft: goPrev });

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -60) goNext();
    else if (dx > 60) goPrev();
    touchStartX.current = null;
  };

  const spread = SPREADS[currentSpread];

  // Rebuild FinalPage with real onClose
  const pageContent =
    currentSpread === totalSpreads - 1 ? (
      <FinalPage onClose={onClose} />
    ) : (
      spread.left
    );

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #0f0a1e 50%, #001020 100%)' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between w-full px-4 py-2 z-10 max-w-7xl">
        <div className="flex items-center gap-1.5 text-white/50 tracking-widest uppercase"
          style={{ fontFamily:'"Inter",sans-serif', fontSize:'0.65rem' }}>
          <BookOpen size={13} /> IT Class of 2026
        </div>
        <div
          className="text-white/40 text-sm"
          style={{ fontFamily: '"Caveat", cursive', fontSize: '1rem' }}
        >
          {spread.label} — {currentSpread + 1} / {totalSpreads}
        </div>
        <button onClick={onClose}
          className="flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors"
          style={{ fontFamily:'"Inter",sans-serif', fontSize:'0.8rem' }}>
          <X size={14} /> Close
        </button>
      </div>

      {/* Book page */}
      <div className="flex-1 w-full flex items-center justify-center px-2 pb-2 max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSpread}
            className="w-full h-full rounded-lg overflow-hidden relative"
            style={{
              maxHeight: 'calc(100vh - 110px)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
            initial={{
              opacity: 0,
              x: direction * 80,
              rotateY: direction * 15,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              x: direction * -80,
              rotateY: direction * -15,
            }}
            transition={{ duration: 0.45, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {pageContent}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation bar */}
      <div className="flex items-center gap-6 pb-3 z-10">
        <motion.button
          onClick={goPrev}
          disabled={currentSpread === 0 || isFlipping}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'white',
            fontFamily: '"Inter", sans-serif',
            backdropFilter: 'blur(10px)',
          }}
          whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.15)' }}
          whileTap={{ scale: 0.97 }}
        >
          <ChevronLeft size={16} /> Prev
        </motion.button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {SPREADS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (isFlipping) return;
                setDirection(i > currentSpread ? 1 : -1);
                setIsFlipping(true);
                setTimeout(() => { setCurrentSpread(i); setIsFlipping(false); }, 400);
              }}
              className="rounded-full transition-all"
              style={{
                width: i === currentSpread ? 24 : 8,
                height: 8,
                background: i === currentSpread
                  ? 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                  : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={goNext}
          disabled={currentSpread === totalSpreads - 1 || isFlipping}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'white',
            fontFamily: '"Inter", sans-serif',
            backdropFilter: 'blur(10px)',
          }}
          whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.15)' }}
          whileTap={{ scale: 0.97 }}
        >
          Next <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}
