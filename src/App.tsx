import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import InvitationModal from './components/InvitationModal';
import YearbookCover from './components/YearbookCover';
import BookViewer from './components/BookViewer';
import type { AppPhase } from './types';

const ACCEPTED_KEY = 'it-yearbook-2026-accepted';

export default function App() {
  const alreadyAccepted = localStorage.getItem(ACCEPTED_KEY) === 'true';
  const [phase, setPhase] = useState<AppPhase>(alreadyAccepted ? 'cover' : 'invitation');

  const handleAccept = useCallback(() => {
    localStorage.setItem(ACCEPTED_KEY, 'true');
    setPhase('cover');
  }, []);
  const handleCoverOpen = useCallback(() => setPhase('book'), []);
  const handleClose = useCallback(() => setPhase('cover'), []);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#0a0f1e' }}>
      {/* ── Invitation Modal ── */}
      <AnimatePresence>
        {phase === 'invitation' && (
          <motion.div
            key="invitation"
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <InvitationModal onAccept={handleAccept} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Yearbook Cover ── */}
      <AnimatePresence>
        {phase === 'cover' && (
          <motion.div
            key="cover"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.5 } }}
          >
            <YearbookCover onOpen={handleCoverOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Book Viewer ── */}
      <AnimatePresence>
        {phase === 'book' && (
          <motion.div
            key="book"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.5 } }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <BookViewer onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
