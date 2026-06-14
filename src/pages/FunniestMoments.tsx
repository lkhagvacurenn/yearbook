import { motion } from 'framer-motion';
import { staggerContainer, scaleIn } from '../animations/variants';
import { Trophy, Clock, Users, Coffee, Search, Monitor, Moon, Mic, Star, Zap } from 'lucide-react';

const memes = [
  { Icon: Clock,   title:'Professional Deadline Sprinter',    text:'Submitted at 11:59:47 PM.\nCharacter development.',                                           color:'#fef3c7', accent:'#d97706', tag:'CERTIFIED'    },
  { Icon: Moon,    title:'Attendance Warrior',                 text:'Present. Technically.\n(sleeping in the back row counts)',                                    color:'#ede9fe', accent:'#7c3aed', tag:'LEGEND'       },
  { Icon: Users,   title:'Group Project Survivor',             text:'Did 90% of the work.\nGot the same grade.\nRespectfully.',                                    color:'#dcfce7', accent:'#16a34a', tag:'UNSUNG HERO'  },
  { Icon: Coffee,  title:'Coffee-Powered Developer',           text:'Blood type: Caffeine.\nOperating system: Sleep-deprived.',                                    color:'#fce7f3', accent:'#be185d', tag:'FUELED'       },
  { Icon: Search,  title:'Stack Overflow Valedictorian',       text:'Copied & pasted his way to a degree.\n(We all did. Be honest.)',                              color:'#dbeafe', accent:'#1d4ed8', tag:'HONOR ROLL'   },
  { Icon: Monitor, title:'It Works on My Machine',             text:'His machine: NASA-grade.\nThe lab PC: Windows Vista.',                                        color:'#ffedd5', accent:'#c2410c', tag:'ICONIC'       },
  { Icon: Star,    title:'Lecture Nap Champion',               text:'Absorbed 4 years of knowledge\nthrough osmosis while sleeping.',                              color:'#f0fdf4', accent:'#15803d', tag:'GIFTED'       },
  { Icon: Mic,     title:'Presentation Day Panic',             text:'"I got this."\n— 5 minutes before presenting\n— Has not got this.',                           color:'#fef2f2', accent:'#dc2626', tag:'BRAVE'        },
];

const bgIcons = [Trophy, Clock, Users, Coffee, Search, Monitor, Star, Zap, Mic, Trophy];

export default function FunniestMoments() {
  return (
    <div className="w-full h-full overflow-y-auto relative"
      style={{ background:'#fffbf0', minHeight:'100%',
        backgroundImage:`radial-gradient(circle at 15% 15%,rgba(253,224,71,0.3) 0%,transparent 40%),
          radial-gradient(circle at 85% 85%,rgba(167,243,208,0.3) 0%,transparent 40%)` }}>

      {bgIcons.map((Icon, i) => (
        <div key={i} className="absolute pointer-events-none select-none"
          style={{ top:`${5+(i*9.3)%90}%`, left:`${2+(i*13)%96}%`,
            opacity:0.05, transform:`rotate(${(i*19)%40-20}deg)`, zIndex:0 }}>
          <Icon size={40} />
        </div>
      ))}

      <div className="relative z-10 pt-6 px-8 pb-3 flex items-center gap-3">
        <Trophy size={24} color="#1e3a8a" />
        <div>
          <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.5rem,4vw,2.2rem)', fontWeight:900, color:'#1e3a8a' }}>
            The IT Awards
          </h2>
          <p style={{ fontFamily:'"Caveat",cursive', fontSize:'1rem', color:'#6b7280' }}>
            Because some achievements deserve special recognition.
          </p>
        </div>
      </div>

      <motion.div className="relative z-10 grid grid-cols-2 gap-4 px-6 pb-8"
        style={{ gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))' }}
        variants={staggerContainer} initial="hidden" animate="visible">
        {memes.map((m, i) => (
          <motion.div key={i} variants={scaleIn}
            whileHover={{ scale:1.06, rotate:(i%2===0?1:-1), zIndex:20 }}
            className="relative rounded-2xl p-4 cursor-pointer overflow-hidden"
            style={{ background:m.color, border:`2px solid ${m.accent}30`, boxShadow:`0 4px 20px ${m.accent}20` }}>

            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-white"
              style={{ fontSize:'0.55rem', fontFamily:'"Inter",sans-serif', fontWeight:700, letterSpacing:'0.12em', background:m.accent }}>
              {m.tag}
            </div>

            <motion.div className="mb-3"
              animate={{ rotate:[0,5,-5,0] }} transition={{ duration:3, delay:i*0.3, repeat:Infinity, ease:'easeInOut' }}>
              <m.Icon size={32} color={m.accent} strokeWidth={1.5} />
            </motion.div>

            <p style={{ fontFamily:'"Playfair Display",serif', fontWeight:700, fontSize:'0.9rem', color:'#111827', marginBottom:6 }}>
              {m.title}
            </p>
            <p style={{ fontFamily:'"Caveat",cursive', fontSize:'0.9rem', color:'#374151', lineHeight:1.5, whiteSpace:'pre-line' }}>
              {m.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 px-8 pb-6 text-center"
        style={{ fontFamily:'"Caveat",cursive', fontSize:'1rem', color:'#9ca3af', fontStyle:'italic' }}>
        "No students were harmed in the making of these awards. Mostly."
      </div>
    </div>
  );
}
