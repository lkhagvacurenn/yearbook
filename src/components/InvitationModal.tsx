import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Calendar, Clock, MapPin, Check, X, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onAccept: () => void;
}

const bgParticles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 5,
  dur: 4 + Math.random() * 6,
}));

const DODGE_OFFSETS = [
  { x: -220, y: -130 }, { x: 220, y: -130 },
  { x: -220, y: 130  }, { x: 220, y: 130  },
  { x: 0,   y: -180  }, { x: 0,   y: 180  },
  { x: -280, y: 0    }, { x: 280, y: 0    },
  { x: -180, y: -90  }, { x: 180, y: 90   },
  { x: -150, y: 160  }, { x: 150, y: -160 },
];

export default function InvitationModal({ onAccept }: Props) {
  const [declineOffset, setDeclineOffset] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const lastDodgeRef = useRef(0);
  const lastIdxRef = useRef(-1);

  const dodge = useCallback(() => {
    const now = Date.now();
    if (now - lastDodgeRef.current < 120) return;
    lastDodgeRef.current = now;
    let idx;
    do { idx = Math.floor(Math.random() * DODGE_OFFSETS.length); }
    while (idx === lastIdxRef.current);
    lastIdxRef.current = idx;
    setDeclineOffset(DODGE_OFFSETS[idx]);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    setShowCelebration(true);

    const fire = (ratio: number, opts: confetti.Options) =>
      confetti({ origin: { y: 0.6 }, particleCount: Math.floor(200 * ratio), ...opts });
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2,  { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1,  { spread: 120, startVelocity: 45 });

    let count = 0;
    const iv = setInterval(() => {
      confetti({ angle: 60 + Math.random() * 60, spread: 55, particleCount: 50,
        origin: { x: Math.random(), y: 0.3 },
        colors: ['#60a5fa','#818cf8','#fbbf24','#34d399','#f472b6'] });
      if (++count >= 6) clearInterval(iv);
    }, 300);

    setTimeout(() => onAccept(), 2800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at center, #0d1b3e 0%, #060b1a 100%)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {bgParticles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full pointer-events-none"
          style={{ left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size,
            background:'radial-gradient(circle, rgba(99,102,241,0.8), rgba(59,130,246,0.3))' }}
          animate={{ opacity:[0.1,0.7,0.1], scale:[1,1.5,1] }}
          transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, ease:'easeInOut' }} />
      ))}

      <AnimatePresence>
        {showCelebration && (
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center z-10"
            initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
            transition={{ type:'spring', stiffness:200, damping:15 }}>
            <motion.div animate={{ rotate:[0,-10,10,-10,0], scale:[1,1.2,1] }} transition={{ duration:0.6, repeat:2 }}>
              <PartyPopper size={80} color="#fbbf24" />
            </motion.div>
            <motion.h2 className="text-white font-bold text-center mt-6"
              style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.5rem,5vw,3rem)' }}
              initial={{ y:30, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.3 }}>
              See you there, graduate!
            </motion.h2>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
              <GraduationCap size={32} color="#60a5fa" style={{ marginTop:12 }} />
            </motion.div>
            <motion.p className="text-blue-300 mt-2 text-lg" style={{ fontFamily:'"Caveat",cursive' }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}>
              Opening your yearbook...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!accepted && (
          <motion.div className="relative z-10 rounded-3xl overflow-hidden max-w-lg w-full"
            style={{ background:'rgba(255,255,255,0.05)', backdropFilter:'blur(20px)',
              border:'1px solid rgba(99,102,241,0.3)',
              boxShadow:'0 0 60px rgba(99,102,241,0.2), 0 0 120px rgba(59,130,246,0.1)' }}
            initial={{ scale:0.7, opacity:0, y:50 }} animate={{ scale:1, opacity:1, y:0 }}
            exit={{ scale:0.8, opacity:0, y:-40 }}
            transition={{ type:'spring', stiffness:180, damping:18 }}>

            <div className="h-1 w-full" style={{ background:'linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4)' }} />

            <div className="p-8 md:p-10 text-center">
              <motion.div className="flex justify-center mb-4"
                animate={{ y:[0,-8,0] }} transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}>
                <GraduationCap size={56} color="#60a5fa" strokeWidth={1.5} />
              </motion.div>

              <h1 className="text-white mt-2 mb-1"
                style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.4rem,4vw,2rem)', fontWeight:900 }}>
                Graduation Party
              </h1>
              <p className="text-blue-400 tracking-[0.3em] uppercase text-xs mb-6" style={{ fontFamily:'"Inter",sans-serif' }}>
                You Are Cordially Invited
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-3">
                  <Calendar size={16} color="#60a5fa" />
                  <span className="text-white font-semibold">June 19, 2026</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Clock size={16} color="#60a5fa" />
                  <span className="text-white font-semibold">7:00 PM</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin size={16} color="#60a5fa" />
                  <span className="text-blue-200 italic" style={{ fontFamily:'"Caveat",cursive', fontSize:'1.05rem' }}>
                    If you know, you know
                  </span>
                </div>
              </div>

              <div className="my-5 h-px w-3/4 mx-auto"
                style={{ background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)' }} />

              <p className="text-blue-100 leading-relaxed mb-8 italic"
                style={{ fontFamily:'"Caveat",cursive', fontSize:'1.1rem' }}>
                "We survived exams, deadlines, presentations, group projects,
                internships, thesis panic, and SISI.<br />
                Now it's finally time to celebrate."
              </p>

              {/* Both buttons in one row — decline translates via x/y, never resizes */}
              <div className="relative flex items-center justify-center gap-5">
                <motion.button onClick={handleAccept}
                  className="flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold cursor-pointer"
                  style={{ background:'linear-gradient(135deg,#3b82f6 0%,#8b5cf6 100%)',
                    fontFamily:'"Inter",sans-serif', letterSpacing:'0.08em', fontSize:'0.95rem',
                    boxShadow:'0 0 30px rgba(99,102,241,0.5)', position:'relative', zIndex:10 }}
                  whileHover={{ scale:1.07, boxShadow:'0 0 50px rgba(99,102,241,0.8)' }}
                  whileTap={{ scale:0.97 }}
                  animate={{ boxShadow:['0 0 20px rgba(99,102,241,0.4)','0 0 40px rgba(99,102,241,0.7)','0 0 20px rgba(99,102,241,0.4)'] }}
                  transition={{ duration:2, repeat:Infinity }}>
                  <Check size={16} /> ACCEPT
                </motion.button>

                <motion.button
                  className="flex items-center gap-2 px-8 py-3 rounded-full font-bold cursor-pointer"
                  style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.18)',
                    color:'rgba(255,255,255,0.45)', fontFamily:'"Inter",sans-serif',
                    letterSpacing:'0.08em', fontSize:'0.95rem', position:'relative', zIndex:5 }}
                  animate={{ x:declineOffset.x, y:declineOffset.y }}
                  transition={{ type:'spring', stiffness:280, damping:18 }}
                  onMouseEnter={dodge} onFocus={dodge} onTouchStart={dodge} tabIndex={-1}>
                  <X size={16} /> DECLINE
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
