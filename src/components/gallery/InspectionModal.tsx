'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryItem } from '@/types/gallery';
import { Sparkles, Calendar, Brush, Quote, X } from 'lucide-react';

interface InspectionModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  item,
  onClose,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with Heavy Studio Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0d0704]/85 backdrop-blur-xl -z-10 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl bg-[#1c120b] border-2 border-amber-900/60 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col my-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Vintage Brass Pin Close Button (Top Corner) */}
            <div className="absolute top-4 left-4 z-30">
              <button
                type="button"
                onClick={onClose}
                className="group relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
                title="إغلاق والتراجع للمرسم"
                aria-label="إغلاق"
              >
                {/* Brass Pin Head (Solid Polished Antique Brass Button) */}
                <div
                  className="w-9 h-9 rounded-full relative flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-45 group-active:scale-95"
                  style={{
                    background: 'radial-gradient(circle at 35% 30%, #ffd778 0%, #d4af37 40%, #997a15 75%, #594406 100%)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Pin center screw / indentation */}
                  <div className="w-4 h-4 rounded-full border border-[#80640d] flex items-center justify-center bg-black/20">
                    <X className="w-3 h-3 text-[#3d2703] stroke-[3]" />
                  </div>
                </div>

                {/* Brass Pin Drop Shadow */}
                <span className="absolute -bottom-1 -left-1 w-8 h-3 rounded-full bg-black/50 blur-[2px] -z-10 pointer-events-none" />
              </button>
            </div>

            {/* Top Studio Lighting Ambient Accent */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none" />

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto max-h-[92vh] p-4 sm:p-6 space-y-5">
              {/* High-Res Canvas Presentation Box */}
              <div className="relative w-full rounded-2xl overflow-hidden border-4 border-[#2d1e13] shadow-2xl bg-[#120a05] flex items-center justify-center min-h-[260px] sm:min-h-[360px] max-h-[55vh]">
                {/* High-Resolution Artwork Image */}
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-contain max-h-[55vh] select-none"
                  loading="eager"
                />

                {/* Linen Canvas Texture Weave Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px),
                      repeating-linear-gradient(90deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 1px, transparent 1px, transparent 3px)
                    `,
                  }}
                />

                {/* Subtle Canvas Edge Vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] pointer-events-none" />
              </div>

              {/* Artwork Metadata & Handwritten Arabic Story */}
              <div className="space-y-4 px-1">
                {/* Category & Medium Tags */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-cairo">
                  <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-200 flex items-center gap-1.5">
                    <Brush className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.medium}</span>
                  </span>

                  {item.date && (
                    <span className="px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700/50 text-stone-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{item.date}</span>
                    </span>
                  )}

                  {item.category === 'pixel-pubg' && (
                    <span className="px-3 py-1 rounded-full bg-teal-950/80 border border-teal-600/40 text-teal-200 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>سجل المعارك والمغامرة</span>
                    </span>
                  )}
                </div>

                {/* Title in Elegant Arabic Calligraphy */}
                <h3 className="text-2xl sm:text-3xl font-bold font-aref text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-300 leading-snug">
                  {item.title}
                </h3>

                {/* Poetic Quote Banner (if present) */}
                {item.quote && (
                  <div className="p-3.5 rounded-xl bg-amber-950/40 border-r-4 border-amber-500/80 flex items-start gap-2.5">
                    <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <p className="text-sm font-aref text-amber-200/90 leading-relaxed italic">
                      {item.quote}
                    </p>
                  </div>
                )}

                {/* Handwritten Story Snippet */}
                <div className="p-4 rounded-2xl bg-[#24160e]/80 border border-amber-900/40 shadow-inner">
                  <h4 className="text-xs font-bold font-cairo text-amber-400/80 mb-2 flex items-center gap-1.5">
                    <span>نبذة الرسام وحكاية اللوحة:</span>
                  </h4>
                  <p className="text-sm sm:text-base font-amiri text-[#f5ecd8] leading-relaxed tracking-wide">
                    {item.description}
                  </p>
                </div>

                {/* Gaming & Pixel Stats Table (if present) */}
                {item.stats && item.stats.length > 0 && (
                  <div className="pt-1">
                    <h5 className="text-xs font-bold font-cairo text-teal-300 mb-2.5">
                      إحصائيات الجولة وبطاقة المغامرة:
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {item.stats.map((st, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-800/40 flex flex-col items-center text-center"
                        >
                          <span className="text-[11px] text-teal-300/70 font-cairo">
                            {st.label}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-teal-100 font-cairo mt-0.5">
                            {st.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Bar Close Prompt */}
            <div className="px-6 py-3.5 bg-[#140c07] border-t border-amber-950/60 flex items-center justify-between">
              <span className="text-xs text-amber-300/60 font-amiri">
                اضغط على الدبوس الذهبي أو في أي مكان خارج اللوحة للإغلاق
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-cairo font-bold text-amber-300 hover:text-amber-100 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/50 transition-colors cursor-pointer"
              >
                الرجوع للمعرض
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
