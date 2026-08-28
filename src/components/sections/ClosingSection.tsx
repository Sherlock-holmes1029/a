import React from 'react';
import { motion } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';
import { useSectionSound } from '@/hooks/useSectionSound';
import { SecretReveal } from '@/components/ui/SecretReveal';
import { ArrowUp, Heart, Cake } from 'lucide-react';

export const ClosingSection: React.FC = () => {
  const [sectionRef, isInView] = useInViewport<HTMLElement>({ threshold: 0.15 });
  useSectionSound('closing', isInView);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="closing"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#04120a] via-[#091f13] to-[#020905] overflow-hidden py-16 px-4 sm:px-8 flex flex-col justify-between items-center text-center"
    >
      {/* 1. Background Celebration Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Top Header Badge */}
      <div className="relative z-20 max-w-xl mx-auto mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-400/40 text-amber-300 text-xs font-cairo mb-4 shadow-lg backdrop-blur-md"
        >
          <Cake className="w-4 h-4 text-amber-400" />
          <span>محطة الختام والمفاجأة</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold font-lemonada text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-100 to-teal-200 mb-4 leading-relaxed tracking-wide"
        >
          كل عام وأنتِ أماني الخير والبهجة 🌸
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base font-mada text-emerald-200/90 leading-relaxed max-w-md mx-auto mb-8"
        >
          عسى أن تكون أيامكِ القادمة خضراء كأشجار الغابة، دافئة كرمال الصحراء، ونقية كأمواج البحر.
        </motion.p>
      </div>

      {/* 3. Gated Secret Video Message Container */}
      <div className="relative z-20 max-w-md mx-auto w-full my-4">
        <SecretReveal />
      </div>

      {/* 4. Replay & Signature Footer */}
      <div className="relative z-20 max-w-md mx-auto w-full mt-10 pt-6 border-t border-emerald-900/40 flex flex-col items-center gap-4">
        <motion.button
          type="button"
          onClick={handleScrollToTop}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 hover:bg-emerald-900 text-xs font-cairo font-bold text-emerald-200 shadow-lg backdrop-blur-md transition-all cursor-pointer focus:outline-none min-h-[44px]"
        >
          <ArrowUp className="w-4 h-4 text-emerald-400" />
          <span>ابدأي الرحلة من جديد 🌿</span>
        </motion.button>

        <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mada">
          <span>صُنع بكل حب وتقدير لأماني</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
        </div>
      </div>
    </section>
  );
};
