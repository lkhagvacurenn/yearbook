import { motion } from 'framer-motion';
import { Camera, FolderOpen } from 'lucide-react';
import memoriesData from '../data/memories.json';
import { useImagePreloader } from '../hooks/useImagePreloader';
import PageImageLoader from '../components/PageImageLoader';

interface Memory { id: string; caption: string; rotation: number; size: string; }
const memories = memoriesData as Memory[];

const IMAGE_URLS = memories.map(m => `./images/memories/${m.id}.png`);

const rotations = [-4, 3, -2, 5, -3, 2, -5, 4, -1, 3];
const colors = ['#fff9f0','#f0f9ff','#f0fff4','#fff0f9','#fff9f0','#f0f0ff','#fffbf0','#f5fff0'];

export default function MemoriesPage() {
  const { loaded, progress } = useImagePreloader(IMAGE_URLS);

  return (
    <div className="w-full h-full overflow-y-auto relative"
      style={{ background:'linear-gradient(135deg,#1a0a2e 0%,#2d1654 50%,#1a0a2e 100%)', minHeight:'100%',
        backgroundImage:'radial-gradient(circle at 20% 20%,rgba(139,92,246,0.15) 0%,transparent 40%), radial-gradient(circle at 80% 80%,rgba(99,102,241,0.12) 0%,transparent 40%)' }}>

      <PageImageLoader loaded={loaded} progress={progress}>
        <div className="pt-6 px-6 pb-2 flex items-center gap-3">
          <Camera size={22} color="#a78bfa" />
          <div>
            <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.4rem,3.5vw,2rem)', fontWeight:900, color:'white' }}>
              Class Memories
            </h2>
            <p style={{ fontFamily:'"Caveat",cursive', fontSize:'0.9rem', color:'#a78bfa' }}>
              The moments we'll never forget
            </p>
          </div>
        </div>

        <div className="px-5 pb-8"
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:'1.5rem', paddingTop:'1.5rem' }}>
          {memories.map((m, i) => (
            <motion.div key={m.id}
              initial={{ opacity:0, y:30, rotate:rotations[i % rotations.length] }}
              animate={{ opacity:1, y:0, rotate:rotations[i % rotations.length] }}
              transition={{ delay:i*0.07, type:'spring', stiffness:200, damping:20 }}
              whileHover={{ scale:1.08, rotate:0, zIndex:20 }}
              className="cursor-pointer"
              style={{ background:colors[i % colors.length], borderRadius:4,
                padding:'10px 10px 36px', boxShadow:'0 6px 20px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3)' }}>
              <div className="w-full aspect-square rounded-sm overflow-hidden mb-2"
                style={{ background:'#e2e8f0' }}>
                <img src={`./images/memories/${m.id}.png`} alt={m.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (img.src.endsWith('.png')) {
                      img.src = `./images/memories/${m.id}.jpg`;
                    } else {
                      img.style.display = 'none';
                      (img.parentElement as HTMLElement).style.cssText += ';display:flex;align-items:center;justify-content:center';
                      (img.parentElement as HTMLElement).innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='#94a3b8' stroke-width='1.5'><path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'/><circle cx='12' cy='13' r='3'/></svg>`;
                    }
                  }} />
              </div>
              <p style={{ fontFamily:'"Caveat",cursive', fontSize:'0.8rem', color:'#374151',
                textAlign:'center', lineHeight:1.3 }}>
                {m.caption}
              </p>
            </motion.div>
          ))}

          {memories.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 gap-3">
              <FolderOpen size={40} color="#7c3aed" />
              <p style={{ fontFamily:'"Caveat",cursive', fontSize:'1.2rem', color:'rgba(255,255,255,0.5)' }}>
                Add photos to images/memories/ to fill this page
              </p>
            </div>
          )}
        </div>
      </PageImageLoader>
    </div>
  );
}
