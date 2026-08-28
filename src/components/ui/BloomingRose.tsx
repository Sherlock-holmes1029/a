import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';
import { useSound } from '@/context/SoundContext';

interface BloomingRoseProps {
  className?: string;
  label?: string;
}

export const BloomingRose: React.FC<BloomingRoseProps> = ({ className = '', label }) => {
  const [containerRef, isInView] = useInViewport<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [isBloomed, setIsBloomed] = useState(false);
  const { playTap } = useSound();

  const handleRoseTap = () => {
    setIsBloomed(!isBloomed);
    playTap();
  };

  return (
    <div
      ref={containerRef}
      className={`relative my-8 flex flex-col items-center justify-center select-none ${className}`}
    >
      <div className="relative w-64 sm:w-80 h-16 flex items-center justify-center">
        {/* Vine SVG with stroke animation */}
        <svg
          viewBox="0 0 320 60"
          className="w-full h-full stroke-emerald-600/70 fill-none"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <motion.path
            d="M 10 30 Q 80 5 160 30 T 310 30"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          {/* Leaves on vine */}
          <motion.path
            d="M 70 20 Q 85 5 95 18 Q 80 25 70 20 Z"
            fill="#059669"
            stroke="#047857"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.9 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
          <motion.path
            d="M 230 40 Q 245 55 255 42 Q 240 35 230 40 Z"
            fill="#059669"
            stroke="#047857"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.9 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
          />
        </svg>

        {/* Center Rose Blossom */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.button
            type="button"
            onClick={handleRoseTap}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="تفتّح الوردة الجورية"
            className="relative cursor-pointer focus:outline-none p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {/* Rose SVG */}
            <svg
              width="44"
              height="44"
              viewBox="0 0 100 100"
              className="drop-shadow-[0_0_12px_rgba(225,29,72,0.5)]"
            >
              {/* Outer Petals */}
              <motion.g
                initial={{ scale: 0.6, opacity: 0 }}
                animate={isInView ? { scale: isBloomed ? 1.15 : 1, opacity: 1 } : {}}
                transition={{ delay: 1.0, duration: 0.8, type: 'spring' }}
              >
                <circle cx="50" cy="50" r="38" fill="#881337" opacity="0.8" />
                <path d="M 50 15 C 70 15 85 35 85 50 C 85 70 70 85 50 85 C 30 85 15 70 15 50 C 15 35 30 15 50 15 Z" fill="#9f1239" />
                <ellipse cx="40" cy="45" rx="22" ry="26" fill="#be123c" transform="rotate(-25 40 45)" />
                <ellipse cx="60" cy="45" rx="22" ry="26" fill="#be123c" transform="rotate(25 60 45)" />
                <ellipse cx="50" cy="60" rx="24" ry="20" fill="#e11d48" />
              </motion.g>

              {/* Inner Heart Petals & Gold Stamen */}
              <motion.g
                initial={{ scale: 0.3 }}
                animate={isInView ? { scale: isBloomed ? 1.25 : 1 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <ellipse cx="50" cy="48" rx="14" ry="16" fill="#f43f5e" />
                <circle cx="50" cy="48" r="7" fill="#fbbf24" opacity="0.9" />
                <circle cx="50" cy="48" r="4" fill="#fef08a" />
              </motion.g>
            </svg>
          </motion.button>
        </div>
      </div>

      {label && (
        <span className="text-[11px] text-emerald-300/60 font-mada mt-1 tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
};
