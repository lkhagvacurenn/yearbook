import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight, Zap } from 'lucide-react';

interface Props { onOpen: () => void; }

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  dur: 3 + Math.random() * 5,
  delay: Math.random() * 4,
  size: 1.5 + Math.random() * 3,
  color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#60a5fa' : '#a78bfa',
}));

const CORNERS = [
  { cls: 'top-3 left-3',     d: 'M0,22 L0,0 L22,0' },
  { cls: 'top-3 right-3',    d: 'M22,22 L22,0 L0,0' },
  { cls: 'bottom-3 left-3',  d: 'M0,0 L0,22 L22,22' },
  { cls: 'bottom-3 right-3', d: 'M22,0 L22,22 L0,22' },
];

export default function YearbookCover({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);
  const handleOpen = () => { if (opening) return; setOpening(true); setTimeout(onOpen, 1400); };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#040f24 0%,#060d1f 50%,#07101e 100%)' }}>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          'linear-gradient(rgba(34,211,238,0.09) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(34,211,238,0.09) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '44px 44px',
      }} />

      {/* Ambient corner glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          'radial-gradient(ellipse 50% 40% at 15% 20%, rgba(34,211,238,0.14) 0%, transparent 60%)',
          'radial-gradient(ellipse 45% 35% at 85% 80%, rgba(167,139,250,0.14) 0%, transparent 60%)',
          'radial-gradient(ellipse 40% 35% at 50% 50%, rgba(96,165,250,0.1) 0%, transparent 70%)',
        ].join(','),
      }} />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <motion.div key={p.id} className="absolute rounded-full pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}` }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [1, 2.2, 1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}

      <div style={{ perspective: '1200px' }}>
        <motion.div
          className="relative cursor-pointer select-none"
          style={{ width: 'min(360px,85vw)', height: 'min(500px,80vh)', transformStyle: 'preserve-3d' }}
          animate={opening ? { rotateY: -35, x: '-15%', scale: 0.95 } : { rotateY: 0, x: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
          whileHover={!opening ? { rotateY: -8, scale: 1.02 } : {}}
          onClick={handleOpen}>

          {/* Spine */}
          <div className="absolute inset-y-0 left-0"
            style={{ background: 'linear-gradient(90deg,#030a18,#0a2040)',
              transform: 'translateX(-22px) rotateY(90deg)', transformOrigin: 'right center', width: 24 }} />

          {/* Cover face */}
          <div className="absolute inset-0 rounded-r-lg flex flex-col items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(160deg,#0b1d3a 0%,#0e2244 55%,#091830 100%)',
              boxShadow: [
                '8px 8px 40px rgba(0,0,0,0.85)',
                '0 0 0 1px rgba(34,211,238,0.45)',
                '0 0 50px rgba(34,211,238,0.2)',
                '0 0 100px rgba(96,165,250,0.1)',
              ].join(','),
            }}>

            {/* Subtle inner grid on the cover itself */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: [
                'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px)',
                'linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
              ].join(','),
              backgroundSize: '28px 28px',
            }} />

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-r-lg pointer-events-none" style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(34,211,238,0.07) 0%, transparent 65%)',
            }} />

            {/* Corner brackets */}
            {CORNERS.map(({ cls, d }, i) => (
              <svg key={i} className={`absolute ${cls}`} width="26" height="26" fill="none">
                <path d={d} stroke="rgba(34,211,238,0.85)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ))}

            {/* Scan line */}
            <motion.div className="absolute left-0 right-0 h-[1.5px] pointer-events-none"
              style={{ background: 'linear-gradient(90deg,transparent 5%,rgba(34,211,238,0.65) 50%,transparent 95%)' }}
              animate={{ top: ['-2%', '102%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }} />

            {/* Icon */}
            <motion.div className="relative mb-5"
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
              <motion.div className="absolute inset-0 rounded-full"
                style={{ border: '1px solid rgba(34,211,238,0.7)' }}
                animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2.8, repeat: Infinity }} />
              <div className="w-[76px] h-[76px] rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg,rgba(34,211,238,0.18),rgba(96,165,250,0.12))',
                  border: '1.5px solid rgba(34,211,238,0.6)',
                  boxShadow: '0 0 32px rgba(34,211,238,0.35), inset 0 0 20px rgba(34,211,238,0.08)',
                }}>
                <Terminal size={34} color="#22d3ee" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Sub-label */}
            <p style={{
              fontFamily: '"Inter",monospace', fontWeight: 600, letterSpacing: '0.22em',
              fontSize: 'clamp(0.48rem,1.3vw,0.62rem)', color: 'rgba(34,211,238,0.9)',
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              &lt; Information Technology /&gt;
            </p>

            {/* Title */}
            <h1 style={{
              fontFamily: '"Playfair Display",serif', fontWeight: 900,
              fontSize: 'clamp(1.7rem,6vw,2.8rem)', color: '#f0f9ff',
              textAlign: 'center', padding: '0 16px', lineHeight: 1.1,
              textShadow: '0 0 40px rgba(34,211,238,0.15)',
            }}>
              Class of<br />
              <motion.span
                style={{
                  background: 'linear-gradient(135deg,#22d3ee 0%,#60a5fa 50%,#a78bfa 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', display: 'inline-block',
                }}
                animate={{ filter: [
                  'drop-shadow(0 0 10px rgba(34,211,238,0.5))',
                  'drop-shadow(0 0 30px rgba(34,211,238,1))',
                  'drop-shadow(0 0 10px rgba(34,211,238,0.5))',
                ]}}
                transition={{ duration: 2.5, repeat: Infinity }}>
                2026
              </motion.span>
            </h1>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4 px-8 w-full">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(34,211,238,0.55))' }} />
              <Zap size={12} color="#22d3ee" fill="rgba(34,211,238,0.25)" />
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,rgba(34,211,238,0.55),transparent)' }} />
            </div>

            <p style={{
              fontFamily: '"Inter",sans-serif', fontWeight: 400, letterSpacing: '0.25em',
              fontSize: 'clamp(0.55rem,1.5vw,0.7rem)', color: 'rgba(186,230,253,0.75)',
              textTransform: 'uppercase',
            }}>
              Digital Yearbook
            </p>

            {/* CTA */}
            <motion.div className="absolute bottom-6 flex items-center gap-1.5"
              animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronRight size={12} color="#22d3ee" />
              <p style={{
                fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
                color: '#22d3ee', textTransform: 'uppercase',
              }}>
                click to initialize
              </p>
              <ChevronRight size={12} color="#22d3ee" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
