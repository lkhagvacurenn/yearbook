import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations/variants';
import { GraduationCap, BookOpen, Heart, Star, X } from 'lucide-react';

interface Props { onClose?: () => void; }

const floatingStars = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 8 + Math.random() * 12,
  delay: Math.random() * 4,
  dur: 3 + Math.random() * 4,
}));

export default function FinalPage({ onClose }: Props) {
  return (
    <div className="w-full h-full overflow-y-auto relative flex flex-col items-center justify-center"
      style={{ background:'linear-gradient(160deg,#060b18 0%,#0d1b3e 50%,#060b18 100%)', minHeight:'100%' }}>

      {floatingStars.map((s) => (
        <motion.div key={s.id} className="absolute pointer-events-none"
          style={{ left:`${s.x}%`, top:`${s.y}%` }}
          animate={{ opacity:[0.1,0.6,0.1], scale:[1,1.3,1] }}
          transition={{ duration:s.dur, delay:s.delay, repeat:Infinity, ease:'easeInOut' }}>
          <Star size={s.size} color="#d4af37" fill="#d4af3730" />
        </motion.div>
      ))}

      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(30,64,175,0.25) 0%,transparent 70%)' }} />

      <motion.div className="relative z-10 flex flex-col items-center text-center px-8 py-12"
        variants={staggerContainer} initial="hidden" animate="visible">

        <motion.div variants={fadeInUp}
          animate={{ y:[0,-15,0], rotate:[-3,3,-3] }}
          transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}>
          <GraduationCap size={80} color="#d4af37" strokeWidth={1.2} />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-6 mb-2">
          <p style={{ fontFamily:'"Inter",sans-serif', fontSize:'0.7rem', fontWeight:600,
            letterSpacing:'0.35em', color:'rgba(212,175,55,0.7)', textTransform:'uppercase' }}>
            Information Technology
          </p>
        </motion.div>

        <motion.h1 variants={fadeInUp}
          style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(2rem,7vw,3.5rem)',
            fontWeight:900, color:'white', lineHeight:1.1, textShadow:'0 0 60px rgba(212,175,55,0.3)' }}>
          Class of{' '}
          <span style={{ color:'#d4af37', textShadow:'0 0 40px rgba(212,175,55,0.8)' }}>2026</span>
        </motion.h1>

        <motion.div variants={fadeInUp} className="flex items-center gap-4 my-5 w-full max-w-xs">
          <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.5))' }} />
          <BookOpen size={16} color="rgba(212,175,55,0.6)" />
          <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,rgba(212,175,55,0.5),transparent)' }} />
        </motion.div>

        <motion.p variants={fadeInUp}
          style={{ fontFamily:'"Playfair Display",serif', fontStyle:'italic',
            fontSize:'clamp(0.95rem,2.5vw,1.2rem)', color:'rgba(255,255,255,0.7)',
            lineHeight:1.8, maxWidth:460, marginBottom:24 }}>
          "We came as students.<br />
          We leave as engineers, creators, and problem-solvers.<br />
          Whatever comes next — we are ready."
        </motion.p>

        <motion.div variants={fadeInUp} className="flex items-center gap-2">
          <Heart size={14} color="#f472b6" fill="#f472b680" />
          <span style={{ fontFamily:'"Caveat",cursive', fontSize:'1rem', color:'rgba(255,255,255,0.45)' }}>
            Made with love by IT Class of 2026
          </span>
          <Heart size={14} color="#f472b6" fill="#f472b680" />
        </motion.div>

        {onClose && (
          <motion.button variants={fadeInUp} onClick={onClose}
            className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-full"
            style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
              color:'rgba(255,255,255,0.5)', fontFamily:'"Inter",sans-serif', fontSize:'0.85rem', cursor:'pointer' }}
            whileHover={{ background:'rgba(255,255,255,0.1)', color:'white' }}>
            <X size={14} /> Close Yearbook
          </motion.button>
        )}

        <motion.div variants={fadeInUp} className="mt-10 flex gap-3 flex-wrap justify-center">
          {['2022','2023','2024','2025','2026'].map((yr, i) => (
            <motion.div key={yr}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: i === 4 ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.04)',
                border:`1px solid ${i === 4 ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.08)'}`,
                fontSize:'0.6rem', fontFamily:'"Inter",sans-serif', fontWeight:700,
                color: i === 4 ? '#d4af37' : 'rgba(255,255,255,0.25)',
                letterSpacing:'0.02em' }}
              animate={i === 4 ? { boxShadow:['0 0 0px rgba(212,175,55,0)','0 0 20px rgba(212,175,55,0.5)','0 0 0px rgba(212,175,55,0)'] } : {}}
              transition={{ duration:2.5, repeat:Infinity }}>
              {yr.slice(2)}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
