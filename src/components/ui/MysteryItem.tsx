import React from 'react';
import { useMysteries } from '@/context/MysteriesContext';
import { useSound } from '@/context/SoundContext';
import { motion } from 'framer-motion';

interface MysteryItemProps {
  id: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MysteryItem: React.FC<MysteryItemProps> = ({ id, className = '', size = 'md' }) => {
  const { mysteries, isFound, findMystery } = useMysteries();
  const { playChime } = useSound();

  const mystery = mysteries.find((m) => m.id === id);
  if (!mystery) return null;

  const found = isFound(id);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (!found) {
      findMystery(id);
      playChime();
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-base',
    md: 'w-12 h-12 text-xl',
    lg: 'w-14 h-14 text-2xl',
  };

  return (
    <div
      style={{
        left: `${mystery.position.x}%`,
        top: `${mystery.position.y}%`,
      }}
      className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 ${className}`}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.25 }}
        whileTap={{ scale: 0.85 }}
        aria-label={found ? `سر مكتشف: ${mystery.nameAr}` : 'سر مخبأ — انقري لاكتشافه'}
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] ${sizeClasses[size]} ${
          found
            ? 'bg-amber-400/20 border-2 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.6)] cursor-default'
            : 'bg-emerald-950/40 border border-emerald-400/30 hover:border-amber-300/80 shadow-[0_0_8px_rgba(16,185,129,0.3)] animate-pulse cursor-pointer'
        }`}
      >
        {/* Shimmering background glow */}
        {!found && (
          <span className="absolute inset-0 rounded-full bg-emerald-400/15 animate-ping" />
        )}

        <span className={`transform transition-transform duration-300 ${found ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}>
          {mystery.icon}
        </span>

        {found && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 text-stone-950 rounded-full flex items-center justify-center text-[9px] font-bold shadow"
          >
            ✓
          </motion.span>
        )}
      </motion.button>
    </div>
  );
};
