import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/context/SoundContext';
import { useMysteries } from '@/context/MysteriesContext';
import confetti from 'canvas-confetti';
import { Sparkles, Check } from 'lucide-react';

interface Firefly {
  id: number;
  x: number; // percentage
  y: number; // percentage
  speed: number;
  color: string;
}

const INITIAL_FIREFLIES: Firefly[] = [
  { id: 1, x: 18, y: 22, speed: 4.5, color: '#fde047' },
  { id: 2, x: 78, y: 35, speed: 5.2, color: '#34d399' },
  { id: 3, x: 32, y: 58, speed: 4.8, color: '#fbbf24' },
  { id: 4, x: 82, y: 72, speed: 5.6, color: '#a7f3d0' },
  { id: 5, x: 45, y: 85, speed: 4.2, color: '#facc15' },
];

export const FireflyCatcher: React.FC = () => {
  const [caughtIds, setCaughtIds] = useState<number[]>([]);
  const [isRoseOpen, setIsRoseOpen] = useState(false);
  const { playTap, playChime } = useSound();
  const { findMystery } = useMysteries();

  const handleCatch = (id: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (caughtIds.includes(id)) return;

    const next = [...caughtIds, id];
    setCaughtIds(next);
    playTap();

    if (next.length === INITIAL_FIREFLIES.length) {
      playChime();
      findMystery('jungle-golden-firefly');
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#34d399', '#fde047', '#10b981'],
        });
      } catch {
        // safe fallback
      }
    }
  };

  const allCaught = caughtIds.length >= INITIAL_FIREFLIES.length;

  return (
    <div className="relative w-full my-6 select-none">
      {/* 1. Animated Blooming Rose Invite Banner (Note 5) */}
      <div className="flex flex-col items-center justify-center my-4">
        <motion.button
          type="button"
          onClick={() => {
            setIsRoseOpen(!isRoseOpen);
            playTap();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-950/80 border-2 border-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.3)] backdrop-blur-md cursor-pointer focus:outline-none min-h-[44px]"
        >
          {/* Animated SVG Blooming Rose */}
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 100 100"
            animate={{ rotate: isRoseOpen ? [0, 10, -10, 0] : [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="filter drop-shadow"
          >
            {/* Petals */}
            <circle cx="50" cy="50" r="36" fill="#be123c" />
            <path
              d="M 50 16 C 70 16 84 34 84 50 C 84 68 70 84 50 84 C 30 84 16 68 16 50 C 16 34 30 16 50 16 Z"
              fill="#e11d48"
            />
            <ellipse cx="42" cy="46" rx="20" ry="24" fill="#f43f5e" />
            <ellipse cx="58" cy="46" rx="20" ry="24" fill="#fb7185" />
            <circle cx="50" cy="50" r="10" fill="#fde047" />
          </motion.svg>

          <div className="text-right">
            <span className="text-xs font-bold font-cairo text-rose-200 block">
              ✨ انقري على اليراعات المتطايرة
            </span>
            <span className="text-[10px] text-emerald-300/80 font-mada block">
              {allCaught
                ? '🌸 تم الإمساك بجميع اليراعات واكتشاف السر!'
                : `جمعتِ ${caughtIds.length} من ٥ يراعات متوهجة`}
            </span>
          </div>
        </motion.button>
      </div>

      {/* 2. Interactive Fireflies Scattered in Scene */}
      <div className="relative w-full h-44 rounded-3xl bg-emerald-950/30 border border-emerald-500/20 overflow-hidden shadow-inner my-2">
        <div className="absolute top-2 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-emerald-500/30 text-[10px] font-cairo text-amber-300">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>اليراعات: {caughtIds.length} / ٥</span>
        </div>

        {INITIAL_FIREFLIES.map((ff) => {
          const isCaught = caughtIds.includes(ff.id);

          return (
            <motion.div
              key={ff.id}
              style={{
                left: `${ff.x}%`,
                top: `${ff.y}%`,
              }}
              animate={
                isCaught
                  ? { scale: 0.8, opacity: 0.4 }
                  : {
                      x: [0, 8, -6, 0],
                      y: [0, -10, 6, 0],
                    }
              }
              transition={{
                duration: ff.speed,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                type="button"
                onClick={(e) => handleCatch(ff.id, e)}
                disabled={isCaught}
                aria-label={`يراعة رقم ${ff.id}`}
                className="relative flex items-center justify-center p-3 cursor-pointer focus:outline-none min-w-[44px] min-h-[44px]"
              >
                {!isCaught && (
                  <span
                    className="absolute w-8 h-8 rounded-full animate-ping opacity-50"
                    style={{ backgroundColor: ff.color }}
                  />
                )}

                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-125"
                  style={{
                    backgroundColor: ff.color,
                    boxShadow: `0 0 14px ${ff.color}`,
                  }}
                >
                  {isCaught ? (
                    <Check className="w-3 h-3 text-stone-900 font-bold" />
                  ) : (
                    <span className="text-[9px]">✨</span>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
