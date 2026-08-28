import React from 'react';
import { motion } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';
import { useSectionSound } from '@/hooks/useSectionSound';
import { junglePhotos } from '@/data/junglePhotos';
import { AnimatedFoliage } from '@/components/ui/AnimatedFoliage';
import { WaterfallCanvas } from '@/components/ui/WaterfallCanvas';
import { PolaroidPhoto } from '@/components/ui/PolaroidPhoto';
import { FireflyCatcher } from '@/components/ui/FireflyCatcher';
import { DeerSilhouette } from '@/components/ui/DeerSilhouette';
import { MysteryItem } from '@/components/ui/MysteryItem';
import { Sparkles, Camera } from 'lucide-react';

export const JungleSection: React.FC = () => {
  const [sectionRef, isInView] = useInViewport<HTMLElement>({ threshold: 0.1 });
  useSectionSound('jungle', isInView);

  return (
    <section
      id="jungle"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#04120a] via-[#062013] to-[#0a180e] overflow-visible py-16 px-4 sm:px-8 flex flex-col justify-between"
    >
      {/* 1. Background Foliage & Falling Leaves */}
      <AnimatedFoliage />

      {/* 2. Side Cascading Waterfall */}
      <div className="absolute top-0 left-2 sm:left-6 w-20 sm:w-32 h-full z-0 opacity-75 pointer-events-none">
        <WaterfallCanvas className="w-full h-full" />
      </div>

      {/* 3. Section Header */}
      <div className="relative z-20 max-w-xl mx-auto text-center mt-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-cairo mb-3 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>العالم الأول • الغابة المسحورة</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold font-mada text-emerald-100 mb-3 tracking-wide"
        >
          واحة الذكريات واليراعات
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base font-mada text-emerald-200/85 leading-relaxed max-w-md mx-auto"
        >
          بين خرير الشلال وأوراق الغابة الخضراء، تتفتح الذكريات وتتطاير اليراعات المضيئة.
        </motion.p>
      </div>

      {/* 4. Mini-Game: Catch the Fireflies with Blooming Rose */}
      <div className="relative z-20 max-w-md mx-auto w-full">
        <FireflyCatcher />
      </div>

      {/* 5. In-Flow Direct Photos (Polaroid Keepsake Cards) (Note 12) */}
      <div className="relative z-20 max-w-lg mx-auto w-full my-6 space-y-4">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-cairo">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>ألبوم اللحظات المميزة</span>
          </div>
          <span className="text-[11px] text-stone-400 font-mada">
            {junglePhotos.length} بطاقات تذكارية
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {junglePhotos.map((photo, idx) => (
            <PolaroidPhoto key={photo.id} photo={photo} index={idx} />
          ))}
        </div>
      </div>

      {/* 6. Peaceful Resting Deer & Paw Mystery */}
      <div className="relative z-20 max-w-lg mx-auto w-full flex items-center justify-between mt-8 pt-4 px-4 border-t border-emerald-900/40">
        <div className="relative w-12 h-12">
          <MysteryItem id="jungle-paw-print" size="sm" />
        </div>

        <DeerSilhouette />
      </div>
    </section>
  );
};
