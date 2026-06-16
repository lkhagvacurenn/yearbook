import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap, Heart, X, CheckCircle2 } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animations/variants';

interface Props { onClose?: () => void; }

const NODES = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 5 + Math.random() * 90,
  r: 1.5 + Math.random() * 3,
  dur: 3 + Math.random() * 4,
  delay: Math.random() * 3,
  color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#60a5fa' : '#a78bfa',
}));

const EDGES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x1: Math.random() * 100, y1: Math.random() * 100,
  x2: Math.random() * 100, y2: Math.random() * 100,
  delay: Math.random() * 4,
  color: i % 2 === 0 ? '#22d3ee' : '#a78bfa',
}));

const TERMINAL_LINES = [
  { sym: '$',  text: 'git log --oneline --all',       color: '#22d3ee', out: false },
  { sym: '›',  text: '4 years of commits — pushed',   color: '',        out: true  },
  { sym: '›',  text: 'thesis.pdf — PASSED ✓',         color: '',        out: true  },
  { sym: '›',  text: 'exams.exe — terminated ✓',      color: '',        out: true  },
  { sym: '$',  text: 'npm run graduate --class=2026', color: '#22d3ee', out: false },
  { sym: '✓',  text: 'Build successful. 🎓',          color: '#a78bfa', out: false },
];

const DELAYS = [0, 500, 850, 1200, 1700, 2200];
const YEARS  = ['22','23','24','25','26'];

export default function FinalPage({ onClose }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = DELAYS.map((d, i) => setTimeout(() => setVisibleCount(i + 1), d + 600));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto relative flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg,#040f24 0%,#060d1f 50%,#07101e 100%)', minHeight: '100%' }}>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          'linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '44px 44px',
      }} />

      {/* Ambient corner glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          'radial-gradient(ellipse 50% 40% at 10% 15%, rgba(34,211,238,0.13) 0%, transparent 60%)',
          'radial-gradient(ellipse 45% 35% at 90% 85%, rgba(167,139,250,0.13) 0%, transparent 60%)',
          'radial-gradient(ellipse 40% 35% at 50% 50%, rgba(96,165,250,0.08) 0%, transparent 70%)',
        ].join(','),
      }} />

      {/* Network SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
        {EDGES.map(e => (
          <motion.line key={e.id}
            x1={`${e.x1}%`} y1={`${e.y1}%`} x2={`${e.x2}%`} y2={`${e.y2}%`}
            stroke={e.color} strokeWidth="0.7"
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 4 + Math.random() * 3, delay: e.delay, repeat: Infinity, ease: 'easeInOut' }} />
        ))}
        {NODES.map(n => (
          <motion.circle key={n.id}
            cx={`${n.x}%`} cy={`${n.y}%`} r={n.r} fill={n.color}
            animate={{ opacity: [0.2, 1, 0.2], r: [n.r, n.r * 2, n.r] }}
            transition={{ duration: n.dur, delay: n.delay, repeat: Infinity, ease: 'easeInOut' }} />
        ))}
      </svg>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 py-10 w-full max-w-lg"
        variants={staggerContainer} initial="hidden" animate="visible">

        {/* Icon */}
        <motion.div variants={fadeInUp} className="relative mb-5">
          <motion.div className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(34,211,238,0.6)' }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }} />
          <div className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg,rgba(34,211,238,0.18),rgba(96,165,250,0.15))',
              border: '1.5px solid rgba(34,211,238,0.6)',
              boxShadow: '0 0 50px rgba(34,211,238,0.3), inset 0 0 24px rgba(34,211,238,0.08)',
            }}>
            <Terminal size={44} color="#22d3ee" strokeWidth={1.3} />
          </div>
        </motion.div>

        {/* Tech label */}
        <motion.p variants={fadeInUp} style={{
          fontFamily: 'monospace', fontSize: '0.6rem', fontWeight: 600,
          letterSpacing: '0.3em', color: 'rgba(34,211,238,0.9)',
          textTransform: 'uppercase', marginBottom: 6,
        }}>
          &lt; Information Technology /&gt;
        </motion.p>

        {/* Title */}
        <motion.h1 variants={fadeInUp} style={{
          fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.9rem,6vw,3rem)',
          fontWeight: 900, color: '#f0f9ff', lineHeight: 1.1, marginBottom: 4,
          textShadow: '0 0 40px rgba(34,211,238,0.15)',
        }}>
          Class of{' '}
          <motion.span
            style={{
              background: 'linear-gradient(135deg,#22d3ee,#60a5fa,#a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
            animate={{ filter: [
              'drop-shadow(0 0 10px rgba(34,211,238,0.5))',
              'drop-shadow(0 0 28px rgba(34,211,238,1))',
              'drop-shadow(0 0 10px rgba(34,211,238,0.5))',
            ]}}
            transition={{ duration: 2.5, repeat: Infinity }}>
            2026
          </motion.span>
        </motion.h1>

        {/* Divider */}
        <motion.div variants={fadeInUp} className="flex items-center gap-3 my-4 w-full max-w-xs">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(34,211,238,0.5))' }} />
          <Zap size={13} color="#22d3ee" fill="rgba(34,211,238,0.25)" />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,rgba(34,211,238,0.5),transparent)' }} />
        </motion.div>

        {/* Terminal card */}
        <motion.div variants={fadeInUp} className="w-full mb-6 text-left rounded-lg overflow-hidden"
          style={{
            background: 'rgba(4,14,36,0.75)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(34,211,238,0.3)',
            boxShadow: '0 0 50px rgba(34,211,238,0.08), inset 0 0 30px rgba(34,211,238,0.03)',
          }}>
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-3 py-2"
            style={{ borderBottom: '1px solid rgba(34,211,238,0.15)', background: 'rgba(34,211,238,0.06)' }}>
            {['#ef4444','#f59e0b','#a78bfa'].map((c, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.85 }} />
            ))}
            <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(34,211,238,0.5)', marginLeft: 6 }}>
              bash — IT Yearbook 2026
            </span>
          </div>

          {/* Lines */}
          <div className="p-4 space-y-2">
            <AnimatePresence>
              {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
                <motion.div key={i} className="flex items-start gap-2.5"
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.73rem', minWidth: 14, marginTop: 1, lineHeight: 1,
                    color: line.color || 'rgba(34,211,238,0.5)' }}>
                    {line.sym}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.73rem', lineHeight: 1.5,
                    color: line.out ? 'rgba(148,163,184,0.55)'
                         : line.color === '#a78bfa' ? '#a78bfa'
                         : 'rgba(224,242,254,0.9)' }}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {visibleCount < TERMINAL_LINES.length && (
              <motion.span style={{ fontFamily: 'monospace', fontSize: '0.73rem', color: '#22d3ee', display: 'inline-block' }}
                animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>
                ▊
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p variants={fadeInUp} style={{
          fontFamily: '"Caveat",cursive', fontSize: 'clamp(1rem,2.5vw,1.2rem)',
          color: 'rgba(224,242,254,0.7)', lineHeight: 1.9, maxWidth: 420, marginBottom: 20,
        }}>
          "We came as students.<br />
          We leave as engineers, creators, and problem-solvers.<br />
          Whatever comes next — we are ready."
        </motion.p>

        {/* Made with love */}
        <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-5">
          <Heart size={13} color="#f472b6" fill="#f472b680" />
          <span style={{ fontFamily: '"Caveat",cursive', fontSize: '0.95rem', color: 'rgba(224,242,254,0.5)' }}>
            Made with love by IT Class of 2026
          </span>
          <Heart size={13} color="#f472b6" fill="#f472b680" />
        </motion.div>

        {/* Version timeline */}
        <motion.div variants={fadeInUp} className="flex gap-2 flex-wrap justify-center mb-5">
          {YEARS.map((yr, i) => (
            <motion.div key={yr}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: i === 4 ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${i === 4 ? 'rgba(34,211,238,0.55)' : 'rgba(255,255,255,0.1)'}`,
              }}
              animate={i === 4 ? { boxShadow: ['0 0 0px rgba(34,211,238,0)','0 0 20px rgba(34,211,238,0.5)','0 0 0px rgba(34,211,238,0)'] } : {}}
              transition={{ duration: 2.5, repeat: Infinity }}>
              {i === 4 && <CheckCircle2 size={10} color="#22d3ee" />}
              <span style={{
                fontFamily: 'monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.05em',
                color: i === 4 ? '#22d3ee' : 'rgba(255,255,255,0.3)',
              }}>
                v20{yr}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Close */}
        {onClose && (
          <motion.button variants={fadeInUp} onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full"
            style={{
              background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.3)',
              color: 'rgba(34,211,238,0.65)', fontFamily: 'monospace',
              fontSize: '0.78rem', cursor: 'pointer', letterSpacing: '0.1em',
            }}
            whileHover={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee', borderColor: 'rgba(34,211,238,0.65)' }}>
            <X size={13} /> ./close_yearbook
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
