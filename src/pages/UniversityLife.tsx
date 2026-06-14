import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../animations/variants';
import { Zap, Briefcase, Mic, Trees, BarChart2, GraduationCap, BookOpen, FlaskConical, BookMarked } from 'lucide-react';

const chapters = [
  {
    Icon: BookOpen, color:'#60a5fa', bg:'#1e3a8a20', border:'#3b82f650',
    year:'1st Year', title:'The Wide-Eyed Freshmen',
    text:'We arrived with laptops, dreams, and absolutely zero idea what "Object-Oriented Programming" meant. We Googled "what is a variable" and pretended we\'d always known. The library became our second home — mostly because we kept getting lost on the way to class.',
  },
  {
    Icon: FlaskConical, color:'#34d399', bg:'#06402020', border:'#10b98150',
    year:'2nd Year', title:'Deep in the Algorithms',
    text:'Data structures hit different. Some of us discovered Stack Overflow for the first time and felt like we\'d unlocked a cheat code for life. The night before every deadline, the lab was at 100% capacity. Coffee was a food group. Sleep was optional.',
  },
  {
    Icon: BarChart2, color:'#f472b6', bg:'#83193920', border:'#ec489950',
    year:'3rd Year', title:'Internships & Identity Crises',
    text:'We got our first internships and realized "real work" is just university projects with higher stakes and actual pay. Some of us thrived. Some of us stared at production code and felt a deep spiritual dread. Both experiences were equally educational.',
  },
  {
    Icon: GraduationCap, color:'#fbbf24', bg:'#92400e20', border:'#f59e0b50',
    year:'4th Year', title:'The Thesis Era',
    text:'Thesis season separated the legends from the mortals. Group chats went silent. Everyone was either writing at 3 AM or pretending they were. The defense day came, and somehow — SOMEHOW — we all made it through.',
  },
];

const highlights = [
  { Icon: Briefcase, label:'Internships survived' },
  { Icon: Mic,       label:'Presentations nailed' },
  { Icon: Trees,     label:'Campus walks taken'   },
  { Icon: Zap,       label:'All-nighters pulled'  },
  { Icon: BookMarked,label:'Exams passed (barely)'},
];

export default function UniversityLife() {
  return (
    <div className="w-full h-full overflow-y-auto"
      style={{ background:'linear-gradient(160deg,#0f1e3d 0%,#172554 50%,#0a1628 100%)', minHeight:'100%' }}>

      <div className="pt-6 px-6 pb-3 flex items-center gap-3">
        <GraduationCap size={22} color="#60a5fa" />
        <div>
          <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.4rem,3.5vw,2rem)', fontWeight:900, color:'white' }}>
            Our University Journey
          </h2>
          <p style={{ fontFamily:'"Caveat",cursive', fontSize:'0.9rem', color:'#93c5fd' }}>
            4 years in 4 chapters
          </p>
        </div>
      </div>

      <div className="flex gap-3 px-6 mb-6 flex-wrap">
        {highlights.map(({ Icon, label }, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
            <Icon size={13} color="#60a5fa" />
            <span style={{ fontFamily:'"Caveat",cursive', fontSize:'0.82rem', color:'rgba(255,255,255,0.7)' }}>{label}</span>
          </div>
        ))}
      </div>

      <motion.div className="px-6 pb-8 flex flex-col gap-5"
        variants={staggerContainer} initial="hidden" animate="visible">
        {chapters.map((c, i) => (
          <motion.div key={i} variants={fadeInUp}
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background:c.bg, border:`1px solid ${c.border}` }}
            whileHover={{ scale:1.01 }}>
            <div className="absolute top-4 right-4 opacity-10">
              <c.Icon size={64} color={c.color} />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl" style={{ background:`${c.color}20` }}>
                <c.Icon size={20} color={c.color} />
              </div>
              <div>
                <p style={{ fontFamily:'"Inter",sans-serif', fontSize:'0.7rem', fontWeight:600,
                  letterSpacing:'0.15em', color:c.color, textTransform:'uppercase' }}>{c.year}</p>
                <h3 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.05rem', fontWeight:700, color:'white' }}>
                  {c.title}
                </h3>
              </div>
            </div>
            <p style={{ fontFamily:'"Caveat",cursive', fontSize:'1rem', color:'rgba(255,255,255,0.75)', lineHeight:1.6 }}>
              {c.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
