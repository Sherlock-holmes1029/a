import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';
import { useSectionSound } from '@/hooks/useSectionSound';
import { poems } from '@/data/poems';
import { PoemCard } from '@/components/ui/PoemCard';
import { LandmarkSilhouette } from '@/components/ui/LandmarkSilhouette';
import { BlackIrisMotif } from '@/components/ui/BlackIrisMotif';
import { CamelSilhouette } from '@/components/ui/CamelSilhouette';
import { MysteryItem } from '@/components/ui/MysteryItem';
import { SandParticles } from '@/components/effects/SandParticles';
import { useSound } from '@/context/SoundContext';
import { SunMedium, BookOpen, Sparkles, X } from 'lucide-react';

export const DesertSection: React.FC = () => {
  const [sectionRef, isInView] = useInViewport<HTMLElement>({ threshold: 0.1 });
  useSectionSound('desert', isInView);

  const [oasisDiscovered, setOasisDiscovered] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'poetry' | 'prose'>('all');
  const { playChime, playTap } = useSound();

  const filteredPoems = poems.filter((poem) => {
    if (activeFilter === 'poetry') return poem.type === 'poetry' || !poem.type;
    if (activeFilter === 'prose') return poem.type === 'prose';
    return true;
  });

  const handleOasisClick = () => {
    setOasisDiscovered(true);
    playChime();
  };

  return (
    <section
      id="desert"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#120a05] via-[#241208] to-[#1a0c06] overflow-visible py-16 px-4 sm:px-8 flex flex-col justify-between"
    >
      {/* 1. Atmospheric Ambient Sun & Drifting Sand Dust */}
      <div className="absolute top-10 right-10 w-52 h-52 rounded-full bg-gradient-to-br from-amber-500/25 via-orange-600/15 to-transparent blur-3xl pointer-events-none" />
      <SandParticles count={8} />

      {/* 2. Petra Al-Khazneh Backdrop Silhouette */}
      <div className="absolute inset-x-0 bottom-0 z-0 opacity-20 pointer-events-none flex items-end justify-center">
        <LandmarkSilhouette variant="khazneh" className="max-w-2xl" />
      </div>

      {/* 3. Section Header */}
      <div className="relative z-20 max-w-xl mx-auto text-center mt-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-cairo mb-3 backdrop-blur-md"
        >
          <SunMedium className="w-3.5 h-3.5 text-amber-400" />
          <span>العالم الثاني • واحة الكثبان والقصائد</span>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <BlackIrisMotif size="sm" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold font-aref text-amber-100 tracking-wide"
          >
            مخطوطات Soulmate🧸🤍.
          </motion.h2>
          <div className="transform scale-x-[-1]">
            <BlackIrisMotif size="sm" />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base font-mada text-amber-200/85 leading-relaxed max-w-md mx-auto"
        >
          ١٠ رسائل ومخطوطات منقوشة استلهمت سحرها من الهيام وعيون البن المعتق وجمال تراب الجنوب.
        </motion.p>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mt-4 font-cairo text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              playTap();
            }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-amber-950 font-bold shadow-md'
                : 'bg-amber-950/60 text-amber-300 border border-amber-800/40 hover:bg-amber-900/60'
            }`}
          >
            الكل ({poems.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('poetry');
              playTap();
            }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeFilter === 'poetry'
                ? 'bg-amber-500 text-amber-950 font-bold shadow-md'
                : 'bg-amber-950/60 text-amber-300 border border-amber-800/40 hover:bg-amber-900/60'
            }`}
          >
            📜 القصائد (٧)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('prose');
              playTap();
            }}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeFilter === 'prose'
                ? 'bg-amber-500 text-amber-950 font-bold shadow-md'
                : 'bg-amber-950/60 text-amber-300 border border-amber-800/40 hover:bg-amber-900/60'
            }`}
          >
            🪶 الخواطر النثرية (٣)
          </button>
        </div>
      </div>

      {/* 4. Roaming Camel Caravan (Note 8) */}
      <CamelSilhouette />

      {/* 5. Ancient Paper Poetry Scrolls Column (Note 9) */}
      <div className="relative z-20 max-w-lg mx-auto w-full my-6">
        {filteredPoems.map((poem, idx) => (
          <PoemCard key={poem.id} poem={poem} index={idx} />
        ))}
      </div>

      {/* 6. Interactive Secrets: Hidden Oasis & Scarab (Note 8) */}
      <div className="relative z-20 max-w-lg mx-auto w-full flex items-center justify-between mt-6 px-4 pt-4 border-t border-amber-900/40">
        {/* Hidden Scarab Mystery */}
        <div className="relative w-12 h-12">
          <MysteryItem id="desert-scarab" size="sm" />
        </div>

        {/* Clear Tappable Hidden Oasis Secret */}
        <div className="relative">
          <motion.button
            type="button"
            onClick={handleOasisClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-400/40 text-amber-300 text-xs font-cairo shadow-lg cursor-pointer focus:outline-none min-h-[44px]"
          >
            <span className="text-base">🌴</span>
            <span>سر الواحة المخبأة</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          </motion.button>

          {/* Oasis Discovery Modal */}
          <AnimatePresence>
            {oasisDiscovered && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="absolute inset-0" onClick={() => setOasisDiscovered(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#2a170b] to-[#120a05] border-2 border-amber-400 p-6 text-center text-amber-100 shadow-2xl z-10"
                >
                  <button
                    onClick={() => setOasisDiscovered(false)}
                    className="absolute top-3 left-3 p-1.5 text-amber-400 hover:text-white rounded-full bg-amber-950"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <span className="text-4xl mb-2 block">🌴✨🏛️</span>
                  <h3 className="text-lg font-bold font-aref text-amber-200 mb-2">
                    كشفتِ سر الواحة الأثرية!
                  </h3>
                  <p className="text-xs font-mada text-amber-300/90 leading-relaxed">
                    وسط الرمال الممتدة، هناك دائماً واحة خضراء وجمال أصيل لا يبهت مع مر الزمان.
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-amber-400/70 font-cairo">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{poems.length} رسائل ومخطوطات</span>
        </div>
      </div>
    </section>
  );
};
