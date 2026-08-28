import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/context/SoundContext';

interface DeerSilhouetteProps {
  className?: string;
}

export const DeerSilhouette: React.FC<DeerSilhouetteProps> = ({ className = '' }) => {
  const [isAlert, setIsAlert] = useState(false);
  const { playTap } = useSound();

  const handleTap = () => {
    setIsAlert(true);
    playTap();
    setTimeout(() => setIsAlert(false), 2400);
  };

  return (
    <div className={`select-none pointer-events-auto ${className}`}>
      <motion.button
        type="button"
        onClick={handleTap}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="غزال الغابة الهادئ"
        className="relative cursor-pointer focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 120 120"
          className="text-emerald-950/90 fill-current drop-shadow-[0_0_15px_rgba(4,47,26,0.8)]"
        >
          {/* Antlers / Horns */}
          <motion.g
            animate={isAlert ? { rotate: [-2, 4, -1, 0] } : { rotate: [0, 1.5, 0] }}
            transition={{ duration: isAlert ? 0.6 : 4, repeat: isAlert ? 0 : Infinity }}
            style={{ transformOrigin: '48px 38px' }}
          >
            <path
              d="M 48 38 Q 42 20 32 10 Q 30 18 36 28 Q 28 22 22 18 Q 26 28 36 34"
              stroke="#062e19"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 52 38 Q 58 20 68 10 Q 70 18 64 28 Q 72 22 78 18 Q 74 28 64 34"
              stroke="#062e19"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Head & Ears */}
          <motion.g
            animate={isAlert ? { y: -4, rotate: -3 } : { y: [0, 1.5, 0] }}
            transition={{ duration: isAlert ? 0.4 : 3, repeat: isAlert ? 0 : Infinity }}
            style={{ transformOrigin: '50px 50px' }}
          >
            {/* Left ear */}
            <ellipse cx="38" cy="38" rx="5" ry="11" transform="rotate(-35 38 38)" fill="#07331c" />
            {/* Right ear */}
            <ellipse cx="62" cy="38" rx="5" ry="11" transform="rotate(35 62 38)" fill="#07331c" />
            {/* Head */}
            <path d="M 42 38 Q 50 32 58 38 Q 62 50 56 60 Q 50 64 44 60 Q 38 50 42 38 Z" fill="#08381f" />
            {/* Muzzle */}
            <ellipse cx="50" cy="58" rx="6" ry="4" fill="#052414" />
            {/* Gentle Eyes */}
            <circle cx="45" cy="45" r="1.8" fill="#fbbf24" opacity={isAlert ? "1" : "0.7"} />
            <circle cx="55" cy="45" r="1.8" fill="#fbbf24" opacity={isAlert ? "1" : "0.7"} />
          </motion.g>

          {/* Neck & Body */}
          <path
            d="M 44 58 Q 42 75 35 90 Q 65 95 85 90 Q 75 75 56 58 Z"
            fill="#093f23"
          />

          {/* Legs resting silhouette */}
          <path
            d="M 35 90 Q 28 105 25 115 Q 38 115 45 105 Q 65 115 85 115 Q 92 105 85 90 Z"
            fill="#052414"
          />

          {/* Gentle white tail spot */}
          <circle cx="84" cy="88" r="3.5" fill="#34d399" opacity="0.4" />
        </svg>

        {isAlert && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-amber-300 font-cairo whitespace-nowrap bg-stone-950/80 px-2 py-0.5 rounded-full border border-amber-400/40"
          >
            🦌 ترحيب لطيف!
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};
