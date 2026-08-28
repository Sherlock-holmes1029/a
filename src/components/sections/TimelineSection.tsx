import React from 'react';
import { motion } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';
import { useSectionSound } from '@/hooks/useSectionSound';
import { timelineEvents } from '@/data/timelineEvents';
import { TimelineCard } from '@/components/ui/TimelineCard';
import { MysteryItem } from '@/components/ui/MysteryItem';
import { Sprout, Heart } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [sectionRef, isInView] = useInViewport<HTMLElement>({ threshold: 0.1 });
  useSectionSound('timeline', isInView);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#080d17] via-[#09180f] to-[#04120a] overflow-hidden py-16 px-4 sm:px-8 flex flex-col justify-between"
    >
      {/* 1. Subtle Ambient Green Glow */}
      <div className="absolute top-1/3 right-4 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Section Header */}
      <div className="relative z-20 max-w-xl mx-auto text-center mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-cairo mb-3 backdrop-blur-md"
        >
          <Sprout className="w-3.5 h-3.5 text-emerald-400" />
          <span>العالم الخامس • شجرة الذكريات والمسار</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold font-lemonada text-emerald-100 mb-3 tracking-wide"
        >
          غصن الذكريات المتنامي
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base font-mada text-emerald-200/80 leading-relaxed max-w-md mx-auto"
        >
          يمتد هذا الغصن من البدايات الأولى ليكتب فصولاً من اللحظات الصادقة والضحكات التي تُزهِر كل عام.
        </motion.p>
      </div>

      {/* 3. Central Vine & Timeline Cards Path */}
      <div className="relative z-20 max-w-lg mx-auto w-full my-8">
        {/* SVG Decorative Vine Running Down the Side / Center */}
        <div className="absolute top-0 right-4 sm:right-6 bottom-0 w-8 pointer-events-none z-0">
          <svg className="w-full h-full stroke-emerald-600/40 fill-none" strokeWidth="2.5" strokeLinecap="round">
            <line x1="16" y1="0" x2="16" y2="100%" strokeDasharray="6 6" />
          </svg>
        </div>

        {/* Timeline Events List */}
        <div className="space-y-4">
          {timelineEvents.map((event, idx) => (
            <TimelineCard key={event.id} event={event} index={idx} />
          ))}
        </div>

        {/* Hidden Mystery Heart Leaf on the Vine */}
        <div className="relative w-full h-12 flex items-center justify-center my-4">
          <MysteryItem id="timeline-heart-leaf" size="sm" />
        </div>
      </div>

      {/* 4. Section Footer */}
      <div className="relative z-20 max-w-lg mx-auto text-center mt-4">
        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400/80 font-cairo">
          <Heart className="w-4 h-4 text-rose-400 fill-current" />
          <span>رحلة مستمرة نحو الختام والمفاجأة</span>
        </div>
      </div>
    </section>
  );
};
