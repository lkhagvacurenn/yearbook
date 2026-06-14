import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, ChevronDown } from 'lucide-react';

interface Props { onOpen: () => void; }

export default function YearbookCover({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);
  const handleOpen = () => { if (opening) return; setOpening(true); setTimeout(onOpen, 1400); };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background:'linear-gradient(135deg,#0a0f1e 0%,#0d1b3e 100%)' }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(30,64,175,0.3) 0%,transparent 70%)' }} />

      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width:3+(i%4), height:3+(i%4), left:`${10+(i*7.3)%80}%`, top:`${10+(i*11)%80}%`,
            background: i%2===0 ? '#d4af37' : '#60a5fa', opacity:0.45 }}
          animate={{ y:[0,-30,0], opacity:[0.2,0.7,0.2] }}
          transition={{ duration:3+(i%4), delay:(i*0.4)%3, repeat:Infinity, ease:'easeInOut' }} />
      ))}

      <div style={{ perspective:'1200px' }}>
        <motion.div className="relative cursor-pointer select-none"
          style={{ width:'min(380px,85vw)', height:'min(520px,80vh)', transformStyle:'preserve-3d' }}
          animate={opening ? { rotateY:-35, x:'-15%', scale:0.95 } : { rotateY:0, x:0, scale:1 }}
          transition={{ duration:1.4, ease:[0.43,0.13,0.23,0.96] }}
          whileHover={!opening ? { rotateY:-8, scale:1.02 } : {}}
          onClick={handleOpen}>

          <div className="absolute inset-y-0 left-0 rounded-l-sm"
            style={{ background:'linear-gradient(90deg,#0a1628,#1e3a8a)',
              transform:'translateX(-22px) rotateY(90deg)', transformOrigin:'right center', width:24 }} />

          <div className="absolute inset-0 rounded-r-lg flex flex-col items-center justify-center overflow-hidden"
            style={{ background:'linear-gradient(160deg,#0f2057 0%,#1e3a8a 40%,#0a1628 100%)',
              boxShadow:'8px 8px 40px rgba(0,0,0,0.7),-2px 0 15px rgba(0,0,0,0.3)',
              border:'2px solid rgba(212,175,55,0.3)' }}>

            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.05) 2px,rgba(255,255,255,0.05) 4px)' }} />
            <div className="absolute inset-3 rounded-sm pointer-events-none" style={{ border:'2px solid rgba(212,175,55,0.5)' }} />
            <div className="absolute rounded-sm pointer-events-none" style={{ inset:14, border:'1px solid rgba(212,175,55,0.25)' }} />

            <motion.div className="mb-3"
              animate={{ y:[0,-8,0], rotate:[-3,3,-3] }}
              transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}>
              <GraduationCap size={72} strokeWidth={1.2} color="#d4af37" />
            </motion.div>

            <p style={{ fontFamily:'"Inter",sans-serif', fontWeight:300, letterSpacing:'0.3em',
              fontSize:'clamp(0.55rem,1.5vw,0.75rem)', color:'rgba(212,175,55,0.8)',
              textTransform:'uppercase', textAlign:'center', padding:'0 24px', marginBottom:4 }}>
              Information Technology
            </p>

            <h1 style={{ fontFamily:'"Playfair Display",serif', fontWeight:900,
              fontSize:'clamp(1.8rem,7vw,3rem)', color:'#ffffff', textAlign:'center',
              padding:'0 16px', lineHeight:1.1, textShadow:'0 0 40px rgba(212,175,55,0.4)' }}>
              Class of<br />
              <span style={{ color:'#d4af37', textShadow:'0 0 30px rgba(212,175,55,0.8)' }}>2026</span>
            </h1>

            <div className="flex items-center gap-3 my-4 px-8 w-full">
              <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.6))' }} />
              <BookOpen size={14} color="rgba(212,175,55,0.8)" />
              <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,rgba(212,175,55,0.6),transparent)' }} />
            </div>

            <p style={{ fontFamily:'"Playfair Display",serif', fontStyle:'italic',
              fontSize:'clamp(0.75rem,2vw,1rem)', color:'rgba(192,192,192,0.8)',
              letterSpacing:'0.15em', textAlign:'center' }}>
              Digital Yearbook
            </p>

            <motion.div className="absolute bottom-8 flex flex-col items-center gap-1"
              animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:2, repeat:Infinity }}>
              <p style={{ fontFamily:'"Inter",sans-serif', fontSize:'0.65rem',
                letterSpacing:'0.2em', color:'rgba(212,175,55,0.6)', textTransform:'uppercase' }}>
                Click to open
              </p>
              <ChevronDown size={14} color="rgba(212,175,55,0.5)" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
