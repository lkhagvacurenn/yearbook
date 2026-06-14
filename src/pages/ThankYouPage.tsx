import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, scaleIn } from '../animations/variants';
import { Users, Heart, Star, GraduationCap, Building, Coffee } from 'lucide-react';

const sections = [
  {
    Icon: GraduationCap, color:'#fbbf24',
    title:'To Our Professors',
    text:'Thank you for your patience, your knowledge, and the occasional extension on deadlines. You shaped how we think, how we code, and how we debug at 2 AM. We were not always easy students, but you stuck with us.',
  },
  {
    Icon: Users, color:'#60a5fa',
    title:'To Our Classmates',
    text:'You were our competition, our teammates, our support system, and our biggest distractions. We shared notes, pulled all-nighters together, and survived group projects without (too many) friendships ending. That\'s a real achievement.',
  },
  {
    Icon: Heart, color:'#f472b6',
    title:'To Our Families',
    text:'For every meal brought to our room, every "how\'s the thesis going?" question, every moment of quiet support — thank you. You believed in us even when we weren\'t sure we believed in ourselves.',
  },
  {
    Icon: Building, color:'#34d399',
    title:'To Our University',
    text:'NUM — you gave us more than a degree. You gave us a community, a story, and four years we\'ll spend the rest of our lives telling stories about.',
  },
  {
    Icon: Coffee, color:'#fb923c',
    title:'To Caffeine',
    text:'Honestly. Without you, this class would not have graduated. You were there for every deadline, every exam week, every pre-presentation panic. A true unsung hero of this journey.',
  },
];

export default function ThankYouPage() {
  return (
    <div className="w-full h-full overflow-y-auto"
      style={{ background:'linear-gradient(160deg,#0a0f1e 0%,#0d1b3e 60%,#080d1a 100%)', minHeight:'100%' }}>

      <div className="pt-8 px-6 pb-4 text-center">
        <motion.div className="flex justify-center mb-3"
          animate={{ scale:[1,1.1,1] }} transition={{ duration:2, repeat:Infinity }}>
          <Heart size={36} color="#f472b6" fill="#f472b680" />
        </motion.div>
        <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.6rem,4vw,2.2rem)', fontWeight:900, color:'white' }}>
          Thank You
        </h2>
        <p style={{ fontFamily:'"Caveat",cursive', fontSize:'1rem', color:'#93c5fd', marginTop:4 }}>
          None of this happened alone.
        </p>
      </div>

      <motion.div className="px-6 pb-8 flex flex-col gap-5"
        variants={staggerContainer} initial="hidden" animate="visible">
        {sections.map((s, i) => (
          <motion.div key={i} variants={i % 2 === 0 ? fadeInUp : scaleIn}
            className="rounded-2xl p-5 flex gap-4"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
            whileHover={{ scale:1.01 }}>
            <div className="flex-shrink-0 mt-1">
              <div className="p-2.5 rounded-xl" style={{ background:`${s.color}15` }}>
                <s.Icon size={22} color={s.color} />
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.05rem', fontWeight:700,
                color:'white', marginBottom:6 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily:'"Caveat",cursive', fontSize:'1rem', color:'rgba(255,255,255,0.7)',
                lineHeight:1.65 }}>
                {s.text}
              </p>
            </div>
          </motion.div>
        ))}

        <motion.div variants={scaleIn}
          className="text-center py-6 rounded-2xl"
          style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(212,175,55,0.2)' }}>
          <Star size={20} color="#d4af37" className="mx-auto mb-2" />
          <p style={{ fontFamily:'"Playfair Display",serif', fontStyle:'italic',
            fontSize:'clamp(0.9rem,2.5vw,1.1rem)', color:'rgba(255,255,255,0.6)', padding:'0 1.5rem', lineHeight:1.7 }}>
            "The best part of any journey is the people you travel with."
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
