import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TimelineEvent } from '@/data/timelineEvents';
import { useSound } from '@/context/SoundContext';
import { X } from 'lucide-react';

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ event, index }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const { playTap } = useSound();

  const handlePhotoClick = () => {
    setIsZoomed(!isZoomed);
    playTap();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="relative w-full my-6 select-none"
    >
      <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#0e2417] via-[#09180f] to-[#040e09] border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/60 backdrop-blur-md">
        {/* Top Tag & Date Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/70 border border-emerald-400/40 text-[11px] font-cairo text-emerald-200 font-bold">
            <span>{event.icon}</span>
            <span>{event.yearOrDate}</span>
          </span>

          <span className="text-[11px] font-cairo text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            {event.tag}
          </span>
        </div>

        {/* Title in Lemonada Typography */}
        <h3 className="text-lg sm:text-xl font-bold font-lemonada text-emerald-100 mb-2 leading-relaxed">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm font-mada text-emerald-200/90 leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Direct In-Flow Photo Display Slot (Note 12) */}
        <div
          onClick={handlePhotoClick}
          className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900/60 via-stone-900 to-teal-950 border border-emerald-500/40 flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:border-emerald-400 transition-all shadow-inner group"
        >
          <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
            {event.icon}
          </span>
          <span className="text-xs font-bold font-cairo text-emerald-200 mb-1">
            {event.title}
          </span>
          <span className="text-[10px] text-stone-400 font-mada max-w-[240px]">
            {event.photoPlaceholder}
          </span>

          <span className="absolute bottom-2 left-2 text-[10px] text-amber-300 font-cairo bg-black/60 px-2 py-0.5 rounded-md">
            انقري للتكبير 🔍
          </span>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setIsZoomed(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm rounded-3xl bg-emerald-950 border-2 border-emerald-400 p-6 text-center text-emerald-100 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-3 left-3 p-1.5 text-stone-400 hover:text-white rounded-full bg-emerald-900"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-4xl mb-2 block">{event.icon}</span>
              <h3 className="text-lg font-bold font-lemonada mb-2">{event.title}</h3>
              <p className="text-xs font-mada text-emerald-200/90 leading-relaxed mb-3">
                {event.description}
              </p>
              <p className="text-[11px] text-stone-400 font-mada">{event.photoPlaceholder}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
