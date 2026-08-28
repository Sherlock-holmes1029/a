import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { JunglePhoto } from '@/data/junglePhotos';
import { useSound } from '@/context/SoundContext';
import { Sparkles, X, Heart } from 'lucide-react';

interface PolaroidPhotoProps {
  photo: JunglePhoto;
  index: number;
}

export const PolaroidPhoto: React.FC<PolaroidPhotoProps> = ({ photo, index }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const { playTap } = useSound();

  const handleCardClick = () => {
    setIsZoomed(!isZoomed);
    playTap();
  };

  const rotations = [-2, 2.5, -1.5, 3];
  const rotation = rotations[index % rotations.length];

  return (
    <>
      {/* Direct In-Flow Polaroid Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: (index % 2) * 0.15 }}
        whileHover={{ scale: 1.03, rotate: 0 }}
        onClick={handleCardClick}
        style={{ transform: `rotate(${rotation}deg)` }}
        className="relative w-full max-w-[340px] mx-auto my-5 p-3.5 bg-[#fefcf8] rounded-2xl shadow-xl shadow-black/40 border border-stone-200/80 text-stone-900 cursor-pointer select-none transition-transform duration-300"
      >
        {/* Decorative Tape Pin on Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/90 border border-amber-300/40 rounded-xs shadow-sm transform -rotate-1 opacity-80 pointer-events-none" />

        {/* Photo Canvas / Image Slot */}
        <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 flex flex-col items-center justify-center p-4 text-center border border-stone-200">
          {photo.src ? (
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-3xl mb-2 drop-shadow">{photo.symbol || '🌸'}</span>
              <span className="text-xs font-bold font-cairo text-emerald-200 mb-1">
                {photo.title}
              </span>
              <span className="text-[10px] text-stone-400 font-mada leading-tight max-w-[200px]">
                {photo.captionSub || '[مكان مخصص لصورة تذكارية خاصة]'}
              </span>
            </div>
          )}

          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 pointer-events-none" />
        </div>

        {/* Polaroid Handwritten Caption Area */}
        <div className="pt-3 pb-1 px-1">
          <div className="flex items-center justify-between gap-1 mb-1">
            <h4 className="font-bold font-mada text-emerald-950 text-sm">
              {photo.title}
            </h4>
            <span className="text-xs text-amber-600 font-cairo">
              {photo.symbol}
            </span>
          </div>

          <p className="text-xs font-mada text-stone-700 leading-relaxed">
            {photo.caption}
          </p>

          <div className="mt-2 pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-400 font-cairo">
            <span>انقري للتكبير 🔍</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current opacity-80" />
          </div>
        </div>
      </motion.div>

      {/* Full-Screen Zoom Modal on Tap */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setIsZoomed(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden bg-[#faf8f2] p-5 border-2 border-amber-300 shadow-2xl z-10 text-stone-900"
            >
              <button
                onClick={() => setIsZoomed(false)}
                aria-label="إغلاق"
                className="absolute top-3 left-3 p-1.5 text-stone-600 hover:text-stone-950 bg-stone-200/80 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 flex flex-col items-center justify-center p-6 text-center text-emerald-100">
                <span className="text-4xl mb-2">{photo.symbol || '🌿'}</span>
                <h3 className="text-base font-bold font-cairo mb-1">{photo.title}</h3>
                <p className="text-xs font-mada text-stone-300">{photo.captionSub}</p>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-cairo mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ذكرى من الغابة</span>
                </div>
                <h3 className="text-base font-bold font-mada text-emerald-950 mb-1">
                  {photo.title}
                </h3>
                <p className="text-sm font-mada text-stone-800 leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
