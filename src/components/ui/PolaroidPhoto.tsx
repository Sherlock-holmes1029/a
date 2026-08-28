import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart, Image as ImageIcon } from 'lucide-react';

export interface MemoryPhotoItem {
  id: string | number;
  title: string;
  caption: string;
  category?: 'pubg' | 'pixel-art' | 'special';
  src?: string; // Replace with image path e.g. "/memories/pubg_win.png"
  symbol?: string;
  date?: string;
}

interface PolaroidPhotoProps {
  photo: MemoryPhotoItem;
  index: number;
}

export const PolaroidPhoto: React.FC<PolaroidPhotoProps> = ({ photo, index }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleCardClick = () => {
    setIsZoomed(!isZoomed);
  };

  const rotations = [-2, 2.5, -1.5, 3];
  const rotation = rotations[index % rotations.length];

  return (
    <>
      {/* Polaroid Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
        whileHover={{ scale: 1.03, rotate: 0 }}
        onClick={handleCardClick}
        style={{ transform: `rotate(${rotation}deg)` }}
        className="relative w-full max-w-[320px] mx-auto my-4 p-3.5 bg-[#fefcf8] rounded-2xl shadow-xl shadow-black/50 border border-stone-200/90 text-stone-900 cursor-pointer select-none transition-transform duration-300"
      >
        {/* Decorative Tape Pin on Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/90 border border-amber-300/40 rounded-xs shadow-xs transform -rotate-1 opacity-80 pointer-events-none" />

        {/* Photo Canvas / Image Slot */}
        <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 flex flex-col items-center justify-center p-3 text-center border border-stone-200">
          {photo.src ? (
            /* ACTIVE IMAGE */
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          ) : (
            /* IMAGE PLACEHOLDER: DROP YOUR PUBG / PIXEL ART PHOTO HERE */
            <div className="relative z-10 flex flex-col items-center justify-center text-amber-100/80">
              <span className="text-3xl mb-1.5 drop-shadow">{photo.symbol || '📸'}</span>
              <span className="text-xs font-bold font-cairo text-amber-200 mb-0.5">
                {photo.title}
              </span>
              <span className="text-[10px] text-stone-400 font-cairo leading-tight max-w-[180px]">
                {photo.category === 'pubg'
                  ? '🎮 لقطة شاشة PUBG Mobile'
                  : photo.category === 'pixel-art'
                  ? '🎨 لوحة بكسل آرت تذكارية'
                  : '📷 صورة تذكارية خاصة'}
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <ImageIcon className="w-3 h-3" />
                <span>مكان مخصص للصورة</span>
              </span>
            </div>
          )}

          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
        </div>

        {/* Polaroid Handwritten Caption Area */}
        <div className="pt-3 pb-1 px-1">
          <div className="flex items-center justify-between gap-1 mb-1">
            <h4 className="font-bold font-cairo text-stone-900 text-sm">
              {photo.title}
            </h4>
            <span className="text-xs text-amber-700 font-cairo">
              {photo.symbol}
            </span>
          </div>

          <p className="text-xs font-amiri text-stone-700 leading-relaxed">
            {photo.caption}
          </p>

          <div className="mt-2 pt-1.5 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-400 font-cairo">
            <span>انقري للتكبير 🔍</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current opacity-80" />
          </div>
        </div>
      </motion.div>

      {/* Zoom Modal on Tap */}
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

              <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 flex flex-col items-center justify-center p-6 text-center text-amber-100">
                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <>
                    <span className="text-4xl mb-2">{photo.symbol || '🌸'}</span>
                    <h3 className="text-base font-bold font-cairo mb-1">{photo.title}</h3>
                    <p className="text-xs font-cairo text-stone-300">
                      {photo.category === 'pubg' ? 'PUBG Mobile Memory' : 'Pixel Art Memory'}
                    </p>
                  </>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-cairo mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ذكرى مميزة</span>
                </div>
                <h3 className="text-base font-bold font-cairo text-stone-950 mb-1">
                  {photo.title}
                </h3>
                <p className="text-sm font-amiri text-stone-800 leading-relaxed">
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
