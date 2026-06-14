import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, GraduationCap, BookOpen, Users } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../animations/variants';
import { placeholderUrl } from '../utils/imageLoader';
import studentsData from '../data/students.json';
import type { Student } from '../types';
import { useImagePreloader } from '../hooks/useImagePreloader';
import PageImageLoader from '../components/PageImageLoader';

const students = studentsData as Student[];

// Preload portrait images (primary only — child photos load on hover)
const PORTRAIT_URLS = students.map(s => `./images/students/${s.id}.png`);

const decorations = [
  { Icon: Star,          x: 3,  y: 4,  size: 14, rotate: 15,  opacity: 0.35 },
  { Icon: Sparkles,      x: 90, y: 3,  size: 16, rotate: -10, opacity: 0.3  },
  { Icon: Star,          x: 95, y: 20, size: 10, rotate: 30,  opacity: 0.25 },
  { Icon: Star,          x: 1,  y: 35, size: 12, rotate: -20, opacity: 0.3  },
  { Icon: Sparkles,      x: 92, y: 50, size: 14, rotate: 5,   opacity: 0.28 },
  { Icon: Star,          x: 4,  y: 60, size: 10, rotate: 45,  opacity: 0.22 },
  { Icon: Star,          x: 88, y: 72, size: 16, rotate: -15, opacity: 0.3  },
  { Icon: Sparkles,      x: 2,  y: 80, size: 12, rotate: 20,  opacity: 0.25 },
  { Icon: Star,          x: 93, y: 88, size: 10, rotate: 0,   opacity: 0.2  },
  { Icon: GraduationCap, x: 6,  y: 90, size: 18, rotate: -5,  opacity: 0.2  },
];

function tryFallback(e: React.SyntheticEvent<HTMLImageElement>, fallbackSrc: string, placeholder: string) {
  const img = e.target as HTMLImageElement;
  if (img.src.endsWith('.png')) {
    img.src = fallbackSrc.replace('.png', '.jpg');
  } else if (img.src.endsWith('.jpg')) {
    img.src = placeholder;
  } else {
    img.src = placeholder;
  }
}

function StudentCard({ student, index }: { student: Student; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const portraitSrc = `./images/students/${student.id}.png`;
  const childSrc    = `./images/students/${student.id}-child.png`;

  return (
    <motion.div variants={fadeInUp} className="flex flex-col items-center" style={{ perspective:'600px' }}>
      <div
        className="relative cursor-pointer select-none"
        style={{
          width:'100%', maxWidth:150, aspectRatio:'3/4',
          transformStyle:'preserve-3d',
          transition:'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onTouchStart={() => setFlipped(f => !f)}
      >
        {/* Front — portrait */}
        <div className="absolute inset-0 overflow-hidden rounded-sm"
          style={{ backfaceVisibility:'hidden', border:'3px solid rgba(255,255,255,0.15)',
            boxShadow:'0 6px 24px rgba(0,0,0,0.5)', background:'#1a2744' }}>
          <img src={portraitSrc} alt={student.name}
            className="w-full h-full object-cover"
            onError={(e) => tryFallback(e, portraitSrc, placeholderUrl(index))} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background:'radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.4))' }} />
        </div>

        {/* Back — childhood */}
        <div className="absolute inset-0 overflow-hidden rounded-sm flex flex-col items-center justify-center"
          style={{ backfaceVisibility:'hidden', transform:'rotateY(180deg)',
            border:'3px solid rgba(255,255,255,0.2)', boxShadow:'0 6px 24px rgba(0,0,0,0.5)',
            background:'#0d1b3e' }}>
          <img src={childSrc} alt={`${student.name} childhood`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              if (img.src.endsWith('.png')) {
                img.src = childSrc.replace('.png', '.jpg');
              } else {
                img.style.display = 'none';
                (img.parentElement as HTMLElement).innerHTML =
                  `<div style="text-align:center;padding:1rem;color:rgba(255,255,255,0.6)">
                    <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' style='margin:0 auto 8px'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/><circle cx='12' cy='7' r='4'/></svg>
                    <span style='font-family:Caveat,cursive;font-size:0.75rem'>Baby photo<br/>coming soon</span>
                  </div>`;
              }
            }} />
          <div className="absolute bottom-0 left-0 right-0 text-center py-1"
            style={{ fontFamily:'"Caveat",cursive', fontSize:'0.7rem',
              color:'rgba(255,255,255,0.7)', background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}>
            Then
          </div>
        </div>
      </div>

      <div className="mt-2 text-center px-1 w-full max-w-[150px]">
        <p style={{ fontFamily:'"Playfair Display",serif', fontWeight:700,
          fontSize:'clamp(0.75rem,2vw,0.88rem)', color:'white', lineHeight:1.2, marginBottom:3 }}>
          {student.name}
        </p>
        <p style={{ fontFamily:'"Caveat",cursive', fontSize:'clamp(0.65rem,1.8vw,0.78rem)',
          color:'rgba(148,163,184,0.9)', lineHeight:1.35, fontStyle:'italic' }}>
          "{student.quote}"
        </p>
      </div>
    </motion.div>
  );
}

export default function StudentDirectory() {
  const { loaded, progress } = useImagePreloader(PORTRAIT_URLS);
  return (
    <div className="w-full h-full overflow-y-auto relative"
      style={{ background:'linear-gradient(180deg,#0b0f1a 0%,#0d1b3e 40%,#080d1a 100%)', minHeight:'100%' }}>

      {/* Scattered star decorations */}
      {decorations.map(({ Icon, x, y, size, rotate, opacity }, i) => (
        <div key={i} className="absolute pointer-events-none select-none"
          style={{ left:`${x}%`, top:`${y}%`, opacity, transform:`rotate(${rotate}deg)`, zIndex:1 }}>
          <Icon size={size} color="white" strokeWidth={1.5} />
        </div>
      ))}

      {/* Center glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 70% 50% at 50% 30%,rgba(30,64,175,0.18) 0%,transparent 70%)', zIndex:0 }} />

      <PageImageLoader loaded={loaded} progress={progress}>
        {/* Header */}
        <div className="relative z-10 pt-7 pb-4 px-6">
          <div className="flex items-center gap-3 mb-1">
            <GraduationCap size={24} color="#60a5fa" strokeWidth={1.5} />
            <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.3rem,3.5vw,2rem)', fontWeight:900, color:'white' }}>
              Class of 2026
            </h2>
          </div>
          <div className="flex items-center gap-2 ml-1">
            <Users size={13} color="#64748b" />
            <span style={{ fontFamily:'"Caveat",cursive', fontSize:'0.95rem', color:'#64748b' }}>
              Information Technology
            </span>
          </div>
        </div>

        {/* Grid: 2 cols mobile → 3 cols sm → 4 cols md+ */}
        <motion.div
          className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-7 px-6 pb-10"
          variants={staggerContainer} initial="hidden" animate="visible">
          {students.map((s, i) => (
            <StudentCard key={s.id} student={s} index={i} />
          ))}
        </motion.div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-3 px-6 pb-6">
          <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,rgba(30,64,175,0.4),transparent)' }} />
          <BookOpen size={14} color="#1e3a8a" />
          <span style={{ fontFamily:'"Caveat",cursive', fontSize:'0.85rem', color:'#334155' }}>
            IT Class of 2026 Yearbook
          </span>
          <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(30,64,175,0.4))' }} />
        </div>
      </PageImageLoader>
    </div>
  );
}
