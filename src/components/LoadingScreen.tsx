import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Loader2 } from 'lucide-react';
import { usePreloader } from '../hooks/usePreloader';

interface Props { onDone: () => void; }

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i, x: Math.random() * 100, delay: Math.random() * 4,
  dur: 3 + Math.random() * 4, size: 4 + Math.random() * 8,
  color: ['#60a5fa','#818cf8','#34d399','#fbbf24','#f472b6'][i % 5],
}));

const confettiDots = Array.from({ length: 30 }, (_, i) => ({
  id: i, left: Math.random() * 100, top: Math.random() * 100,
  color: ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#ec4899'][i % 6],
}));

export default function LoadingScreen({ onDone }: Props) {
  const { progress, message, done } = usePreloader();
  if (done) setTimeout(onDone, 300);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background:'linear-gradient(135deg,#0a0f1e 0%,#0d1b3e 50%,#0a1628 100%)' }}
          exit={{ opacity:0, scale:1.05, transition:{ duration:0.7 } }}>

          {particles.map((p) => (
            <motion.div key={p.id} className="absolute rounded-full pointer-events-none"
              style={{ left:`${p.x}%`, top:'-10px', width:p.size, height:p.size, backgroundColor:p.color, opacity:0.7 }}
              animate={{ y:['0vh','110vh'], opacity:[0,0.8,0], rotate:[0,360] }}
              transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, ease:'linear' }} />
          ))}

          {confettiDots.map((d) => (
            <motion.div key={`c-${d.id}`} className="absolute w-2 h-2 rounded-sm pointer-events-none"
              style={{ left:`${d.left}%`, top:`${d.top}%`, backgroundColor:d.color, opacity:0.4 }}
              animate={{ y:[0,-30,0], x:[0,(Math.random()-0.5)*30,0], rotate:[0,180,360], opacity:[0.2,0.6,0.2] }}
              transition={{ duration:2+Math.random()*3, delay:Math.random()*2, repeat:Infinity, ease:'easeInOut' }} />
          ))}

          <motion.div className="mb-8 text-blue-400"
            animate={{ y:[0,-20,0], rotate:[-5,5,-5] }}
            transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}>
            <GraduationCap size={80} strokeWidth={1.2} />
          </motion.div>

          <motion.h1 className="text-white text-center mb-2"
            style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.5rem,4vw,2.5rem)', fontWeight:900 }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
            IT Class of 2026
          </motion.h1>
          <motion.p className="text-blue-300 mb-10 tracking-widest text-sm uppercase"
            style={{ fontFamily:'"Inter",sans-serif' }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}>
            Digital Yearbook
          </motion.p>

          <div className="mb-8 h-12 flex items-center px-6" style={{ minWidth:300, maxWidth:'80vw' }}>
            <AnimatePresence mode="wait">
              <motion.p key={message} className="text-center text-blue-200"
                style={{ fontFamily:'"Caveat",cursive', fontSize:'1.3rem' }}
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-10 }} transition={{ duration:0.4 }}>
                {message}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative rounded-full overflow-hidden mb-3"
            style={{ width:'min(400px,80vw)', height:8, background:'rgba(255,255,255,0.1)' }}>
            <motion.div className="absolute inset-y-0 left-0 rounded-full"
              style={{ background:'linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4)' }}
              animate={{ width:`${progress}%` }} transition={{ duration:0.3, ease:'easeOut' }} />
            <motion.div className="absolute inset-y-0 w-20 rounded-full"
              style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)' }}
              animate={{ left:['-80px','calc(100% + 80px)'] }}
              transition={{ duration:1.5, repeat:Infinity, ease:'easeInOut' }} />
          </div>

          <div className="flex items-center gap-2 text-blue-300">
            <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}>
              <Loader2 size={14} />
            </motion.div>
            <span className="font-mono text-sm">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
