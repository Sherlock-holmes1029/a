import React from 'react';
import { motion } from 'framer-motion';

export const CamelSilhouette: React.FC = () => {
  return (
    <div className="relative w-full h-16 overflow-hidden pointer-events-none select-none my-2">
      {/* Camel pacing across screen */}
      <motion.div
        animate={{ x: ['110%', '-30%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-1 flex items-end gap-6 opacity-60"
      >
        {/* Adult Camel SVG */}
        <svg width="60" height="50" viewBox="0 0 100 80" className="fill-[#5c2a10]">
          {/* Head & Neck */}
          <path d="M 20 25 Q 18 10 10 12 Q 8 20 18 35 Q 24 45 28 50 Z" />
          {/* Snout */}
          <ellipse cx="8" cy="12" rx="4" ry="2.5" />
          {/* Ears */}
          <polygon points="12,8 14,14 10,12" />
          {/* Two Humps */}
          <path d="M 28 50 Q 38 32 48 50 Q 58 32 68 50 Q 75 52 82 58 Z" />
          {/* Body & Tail */}
          <path d="M 28 50 L 28 62 L 78 62 L 82 58 Q 88 64 85 70" />
          {/* Legs */}
          <line x1="32" y1="62" x2="30" y2="78" stroke="#5c2a10" strokeWidth="3" strokeLinecap="round" />
          <line x1="42" y1="62" x2="44" y2="78" stroke="#5c2a10" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="62" x2="66" y2="78" stroke="#5c2a10" strokeWidth="3" strokeLinecap="round" />
          <line x1="76" y1="62" x2="78" y2="78" stroke="#5c2a10" strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Small Baby Camel Following */}
        <svg width="40" height="35" viewBox="0 0 100 80" className="fill-[#451e0b]">
          <path d="M 20 25 Q 18 10 10 12 Q 8 20 18 35 Q 24 45 28 50 Z" />
          <ellipse cx="8" cy="12" rx="4" ry="2.5" />
          <path d="M 28 50 Q 38 32 48 50 Q 58 32 68 50 Q 75 52 82 58 Z" />
          <line x1="32" y1="62" x2="30" y2="78" stroke="#451e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="42" y1="62" x2="44" y2="78" stroke="#451e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="62" x2="66" y2="78" stroke="#451e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="76" y1="62" x2="78" y2="78" stroke="#451e0b" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
};
