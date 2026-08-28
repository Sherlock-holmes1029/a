import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/context/SoundContext';
import { Heart, X } from 'lucide-react';

export const Campfire: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { playTap } = useSound();

  const handleCampfireClick = () => {
    setIsOpen(true);
    playTap();
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center my-6 select-none">
        <motion.button
          type="button"
          onClick={handleCampfireClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label="نار الشاطئ الهادئة"
          className="group relative flex flex-col items-center cursor-pointer focus:outline-none min-h-[44px]"
        >
          {/* Flame Glow Aura */}
          <div className="absolute -top-4 w-28 h-28 rounded-full bg-gradient-to-t from-orange-600/30 via-amber-500/20 to-transparent blur-xl group-hover:scale-125 transition-transform" />

          {/* Campfire SVG */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Crossed Wood Logs */}
              <line x1="20" y1="85" x2="80" y2="75" stroke="#451a03" strokeWidth="8" strokeLinecap="round" />
              <line x1="22" y1="75" x2="78" y2="85" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
              <line x1="35" y1="88" x2="65" y2="72" stroke="#290e02" strokeWidth="6" strokeLinecap="round" />

              {/* Back Flame (Deep Red) */}
              <motion.path
                d="M 50 80 Q 25 50 45 25 Q 55 45 75 55 Q 60 75 50 80 Z"
                fill="#dc2626"
                animate={{
                  d: [
                    'M 50 80 Q 25 50 45 25 Q 55 45 75 55 Q 60 75 50 80 Z',
                    'M 50 80 Q 30 45 52 20 Q 58 40 70 60 Q 55 78 50 80 Z',
                    'M 50 80 Q 25 50 45 25 Q 55 45 75 55 Q 60 75 50 80 Z',
                  ],
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Mid Flame (Bright Orange) */}
              <motion.path
                d="M 50 80 Q 32 55 48 35 Q 58 50 68 62 Q 58 76 50 80 Z"
                fill="#f97316"
                animate={{
                  d: [
                    'M 50 80 Q 32 55 48 35 Q 58 50 68 62 Q 58 76 50 80 Z',
                    'M 50 80 Q 38 48 52 30 Q 62 48 64 66 Q 54 78 50 80 Z',
                    'M 50 80 Q 32 55 48 35 Q 58 50 68 62 Q 58 76 50 80 Z',
                  ],
                }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Inner Flame Core (Golden Yellow) */}
              <motion.path
                d="M 50 80 Q 40 60 50 45 Q 56 60 60 70 Q 54 78 50 80 Z"
                fill="#fde047"
                animate={{
                  d: [
                    'M 50 80 Q 40 60 50 45 Q 56 60 60 70 Q 54 78 50 80 Z',
                    'M 50 80 Q 44 58 50 42 Q 54 58 56 72 Q 52 79 50 80 Z',
                    'M 50 80 Q 40 60 50 45 Q 56 60 60 70 Q 54 78 50 80 Z',
                  ],
                }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Embers Floating Up */}
              <circle cx="48" cy="20" r="1.5" fill="#fef08a" className="animate-ping" />
              <circle cx="56" cy="14" r="1.2" fill="#fb923c" className="animate-pulse" />
            </svg>
          </div>

          <span className="text-[11px] font-cairo text-amber-300/90 bg-stone-950/80 px-3 py-1 rounded-full border border-amber-500/30 group-hover:border-amber-400 mt-1 shadow-md">
            🔥 نار الشاطئ الدافئة (انقري)
          </span>
        </motion.button>
      </div>

      {/* Campfire Message Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#3a1a08] via-[#1a0f05] to-[#0d0702] border-2 border-amber-500/60 p-6 text-center text-amber-100 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 left-3 p-1.5 text-amber-400 hover:text-white rounded-full bg-stone-900"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-4xl mb-2 block">🔥✨🌊</span>
              <h3 className="text-lg font-bold font-changa text-amber-300 mb-2">
                دفء اللحظات الصادقة
              </h3>
              <p className="text-xs font-mada text-amber-200/90 leading-relaxed mb-4">
                "كل اللحظات الجميلة تبدأ بشرارة دافئة تجمع القلوب على المحبة والضحك الصادق تحت ضوء القمر."
              </p>

              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300 font-cairo">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
                <span>دفء وسلام دائم</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
