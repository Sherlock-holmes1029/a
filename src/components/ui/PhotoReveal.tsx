import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { JunglePhoto } from '@/data/junglePhotos';
import { useSound } from '@/context/SoundContext';
import { X, Sparkles, Image as ImageIcon } from 'lucide-react';

interface PhotoRevealProps {
  photo: JunglePhoto;
}

export const PhotoReveal: React.FC<PhotoRevealProps> = ({ photo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playTap } = useSound();

  const handleOpen = () => {
    setIsOpen(true);
    playTap();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Interactive Firefly / Glowing Orb in Scene */}
      <div
        style={{
          left: `${photo.position.x}%`,
          top: `${photo.position.y}%`,
        }}
        className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
      >
        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`عرض الصورة: ${photo.title}`}
          className="group relative flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer focus:outline-none"
        >
          {/* Outer Pulsing Aura */}
          <span className="absolute w-8 h-8 rounded-full bg-emerald-400/20 group-hover:bg-emerald-400/40 animate-ping" />
          <span className="absolute w-10 h-10 rounded-full bg-amber-400/15 group-hover:bg-amber-400/30 blur-sm" />

          {/* Core Firefly Glow Orb */}
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-300 to-teal-200 shadow-[0_0_16px_rgba(52,211,153,0.8)] border border-white/60 flex items-center justify-center text-xs">
            <span className="opacity-90 group-hover:rotate-12 transition-transform">
              {photo.symbol}
            </span>
          </div>

          {/* Mini floating label tooltip on hover/idle */}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-cairo px-2 py-0.5 rounded-full bg-stone-950/80 border border-emerald-500/30 text-emerald-200 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            {photo.title}
          </span>
        </motion.button>
      </div>

      {/* Expanded Modal Card */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={handleClose} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-950 border-2 border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.3)] z-10 text-emerald-50"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="إغلاق الصورة"
                className="absolute top-4 left-4 z-20 p-2 text-stone-300 hover:text-white bg-stone-950/60 hover:bg-stone-900 rounded-full border border-stone-700/50 backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Display / Placeholder Area */}
              <div className="relative w-full h-64 sm:h-72 bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 flex flex-col items-center justify-center p-6 border-b border-emerald-500/20 text-center overflow-hidden">
                {/* Background artistic pattern */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />

                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[280px]">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-3xl mb-3 shadow-inner text-emerald-300">
                      {photo.symbol || <ImageIcon className="w-8 h-8" />}
                    </div>
                    <span className="text-xs font-bold font-cairo text-emerald-300 mb-1">
                      {photo.title}
                    </span>
                    <p className="text-[11px] text-stone-400 font-mada leading-relaxed">
                      {photo.captionSub || '[يمكن استبدال هذا المكان بصورة تذكارية حقيقية]'}
                    </p>
                  </div>
                )}
              </div>

              {/* Caption & Story Body */}
              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-cairo mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ذكرى من الغابة المسحورة</span>
                </div>

                <h3 className="text-lg font-bold font-cairo text-emerald-100 mb-2">
                  {photo.title}
                </h3>

                <p className="text-sm font-mada text-emerald-200/90 leading-relaxed">
                  {photo.caption}
                </p>

                <div className="mt-5 pt-3 border-t border-emerald-900/50 flex items-center justify-end">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 rounded-xl bg-emerald-700/60 hover:bg-emerald-600 border border-emerald-500/40 text-xs font-bold font-cairo text-emerald-100 transition-colors"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
