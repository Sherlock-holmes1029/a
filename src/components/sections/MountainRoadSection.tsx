import React from 'react';
import { motion } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';
import { useSectionSound } from '@/hooks/useSectionSound';
import { PerspectiveRoad } from '@/components/ui/PerspectiveRoad';
import { MysteryItem } from '@/components/ui/MysteryItem';
import { Navigation, MessageCircle } from 'lucide-react';

export const MountainRoadSection: React.FC = () => {
  const [sectionRef, isInView] = useInViewport<HTMLElement>({ threshold: 0.1 });
  useSectionSound('mountain', isInView);

  return (
    <section
      id="mountain"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#0b0f19] via-[#111728] to-[#080d17] overflow-visible py-16 px-4 sm:px-8 flex flex-col justify-between"
    >
      {/* 1. Starry Sky Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Section Header */}
      <div className="relative z-20 max-w-xl mx-auto text-center mt-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/40 text-indigo-300 text-xs font-cairo mb-3 backdrop-blur-md"
        >
          <Navigation className="w-3.5 h-3.5 text-indigo-400" />
          <span>العالم الرابع • طريق الجبال والذكريات</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold font-cairo text-sky-100 mb-3 tracking-wide"
        >
          مشوار الليل وضحكات الطريق
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base font-mada text-sky-200/85 leading-relaxed max-w-md mx-auto"
        >
          شخصان على الطريق… يتحدثان ويضحكان والطريق يمتد أمامهما بكل طمأنينة وسرور.
        </motion.p>
      </div>

      {/* 3. 3D Perspective Road & Vintage Driving Car */}
      <div className="relative z-20 max-w-lg mx-auto w-full my-6">
        <PerspectiveRoad />
        {/* Hidden Mystery Star in Mountain Sky */}
        <MysteryItem id="mountain-star" size="sm" />
      </div>

      {/* 4. Keepsake Memory Caption Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-20 max-w-lg mx-auto w-full p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-md text-sky-50 shadow-xl"
      >
        <div className="flex items-center gap-2 text-xs font-cairo text-amber-400 mb-2">
          <MessageCircle className="w-4 h-4 text-amber-300" />
          <span>لحظة من المشوار</span>
        </div>

        <p className="text-base font-cairo text-sky-100 font-bold leading-relaxed mb-2">
          "أجمل المشاوير ليست تلك التي تُقاس بالمسافات، بل بالضحكات التي لا نريد لها أن تنتهي."
        </p>

        <p className="text-xs font-mada text-slate-300 leading-relaxed">
          عفوية الحديث، نسمات الهواء الباردة، وأضواء الطريق الممتدة في سكون الليل تشهد على أجمل الأوقات.
        </p>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-cairo">
          <span>🚗 سيارة تواصل السير</span>
          <span>🌌 سماء مليئة بالنجوم والأمنيات</span>
        </div>
      </motion.div>
    </section>
  );
};
