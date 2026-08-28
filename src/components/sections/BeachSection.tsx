import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';
import { useSectionSound } from '@/hooks/useSectionSound';
import { OceanCanvas } from '@/components/ui/OceanCanvas';
import { Campfire } from '@/components/ui/Campfire';
import { MysteryItem } from '@/components/ui/MysteryItem';
import { useSound } from '@/context/SoundContext';
import { Waves, X, Heart } from 'lucide-react';

export const BeachSection: React.FC = () => {
  const [sectionRef, isInView] = useInViewport<HTMLElement>({ threshold: 0.1 });
  useSectionSound('beach', isInView);

  const [isMoonOpen, setIsMoonOpen] = useState(false);
  const [isBottleOpen, setIsBottleOpen] = useState(false);
  const { playTap, playChime } = useSound();

  const handleMoonClick = () => {
    setIsMoonOpen(true);
    playChime();
  };

  const handleBottleClick = () => {
    setIsBottleOpen(true);
    playTap();
  };

  return (
    <section
      id="beach"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#021824] overflow-visible py-16 px-4 sm:px-8 flex flex-col justify-between"
    >
      {/* 1. Full Canvas 2D Generative Ocean & Touch Ripples */}
      <OceanCanvas />

      {/* 2. Interactive Glowing Full Moon in Night Sky (Note 10) */}
      <div className="relative z-20 max-w-xl mx-auto flex flex-col items-center mt-2 mb-4">
        <motion.button
          type="button"
          onClick={handleMoonClick}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="قمر الشاطئ الساطع"
          className="group relative cursor-pointer focus:outline-none flex flex-col items-center min-h-[44px]"
        >
          {/* Luminous Full Moon Circle */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-100 via-sky-50 to-white shadow-[0_0_40px_rgba(224,242,254,0.9),0_0_80px_rgba(56,189,248,0.4)] border border-white flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
            <span className="opacity-90">🌕</span>
          </div>

          <span className="text-[10px] font-cairo text-sky-200/80 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-400/30 mt-2">
            رسالة من القمر ✨ (انقري)
          </span>
        </motion.button>
      </div>

      {/* 3. Section Header */}
      <div className="relative z-20 max-w-xl mx-auto text-center my-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-400/40 text-sky-300 text-xs font-cairo mb-3 backdrop-blur-md"
        >
          <Waves className="w-3.5 h-3.5 text-sky-300" />
          <span>العالم الثالث • شاطئ الأمواج ونار الليل</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold font-changa text-sky-100 mb-3 tracking-wide"
        >
          ليلة هادئة بين البحر والنار
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base font-mada text-sky-200/90 leading-relaxed max-w-md mx-auto"
        >
          المسي سطح الماء لصنع تموجات ناعمة، واستمتعي بدفء نار الشاطئ تحت ضوء القمر الساحر.
        </motion.p>
      </div>

      {/* 4. Interactive Campfire on the Beach Shore (Note 10) */}
      <div className="relative z-20 max-w-md mx-auto w-full my-4">
        <Campfire />
      </div>

      {/* 5. Message in a Bottle & Mystery Shell on Sand */}
      <div className="relative z-20 max-w-lg mx-auto w-full flex items-center justify-between px-4 pt-4 border-t border-sky-900/40">
        {/* Floating Bottle */}
        <motion.button
          type="button"
          onClick={handleBottleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="رسالة القارورة"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-400/40 text-xs font-cairo text-sky-200 shadow-md cursor-pointer focus:outline-none min-h-[44px]"
        >
          <span className="text-lg">🍾</span>
          <span>رسالة البحر</span>
        </motion.button>

        {/* Hidden Mystery Pearl Shell on Shore */}
        <div className="relative w-12 h-12">
          <MysteryItem id="beach-shell" size="sm" />
        </div>
      </div>

      {/* Moon Message Modal */}
      <AnimatePresence>
        {isMoonOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setIsMoonOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#0c2f4d] to-[#021824] border-2 border-sky-300 p-6 text-center text-sky-100 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsMoonOpen(false)}
                className="absolute top-3 left-3 p-1.5 text-sky-300 hover:text-white rounded-full bg-sky-950"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-4xl mb-2 block">🌕✨🌊</span>
              <h3 className="text-lg font-bold font-changa text-sky-200 mb-2">
                رسالة من صفاء القمر
              </h3>
              <p className="text-xs font-mada text-sky-100 leading-relaxed mb-4">
                "كما ينير البدر عتمة الليل ويزيد البحر بهاءً، ينير حضوركِ حياة من حولكِ بكل النقاء والجمال."
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300 font-cairo">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
                <span>كل عام وأنتِ النور والخير</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottle Message Modal */}
      <AnimatePresence>
        {isBottleOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setIsBottleOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#082f49] via-[#0c4a6e] to-[#022c43] border-2 border-cyan-400/60 p-6 text-center text-sky-50 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsBottleOpen(false)}
                className="absolute top-3 left-3 p-1.5 text-sky-300 hover:text-white rounded-full bg-sky-950"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-4xl mb-2 block">🍾📜</span>
              <h3 className="text-lg font-bold font-changa text-sky-100 mb-2">
                رسالة القارورة المنجرفة
              </h3>
              <p className="text-xs font-mada text-sky-100 leading-relaxed mb-4">
                "مثل البحر الهادئ الذي يعكس زرقة السماء، يبعث حضوركِ دائماً راحة وأماناً في كل مكان."
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300 font-cairo">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
                <span>بكل المحبة والتقدير</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
