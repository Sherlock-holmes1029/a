import React from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CSSWavesProps {
  className?: string;
}

export const CSSWaves: React.FC<CSSWavesProps> = ({ className = '' }) => {
  const isReduced = useReducedMotion();

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Wave Container */}
      <div className="relative w-full h-36 sm:h-48">
        {/* Layer 1 - Deep Background Wave */}
        <div
          className="absolute bottom-0 left-0 w-[200%] h-32 opacity-40 bg-gradient-to-t from-cyan-900 to-transparent"
          style={{
            borderRadius: '45% 55% 60% 40% / 50% 60% 40% 50%',
            animation: isReduced ? 'none' : 'waveRoll 12s infinite linear',
          }}
        />

        {/* Layer 2 - Mid Ocean Wave */}
        <div
          className="absolute bottom-0 left-[-20%] w-[200%] h-28 opacity-60 bg-gradient-to-t from-sky-800 to-teal-500/20"
          style={{
            borderRadius: '50% 50% 45% 55% / 45% 55% 45% 55%',
            animation: isReduced ? 'none' : 'waveRoll 8s infinite linear reverse',
          }}
        />

        {/* Layer 3 - Foreground Crest & Foam */}
        <div
          className="absolute bottom-0 left-[-40%] w-[200%] h-20 opacity-80 bg-gradient-to-t from-[#051a24] via-sky-700/60 to-cyan-200/30"
          style={{
            borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%',
            animation: isReduced ? 'none' : 'waveRoll 5s infinite linear',
          }}
        />

        {/* Foam highlight line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent blur-xs" />
      </div>
    </div>
  );
};
