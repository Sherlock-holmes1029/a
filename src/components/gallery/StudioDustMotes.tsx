'use client';

import React, { useMemo } from 'react';

interface StudioDustMotesProps {
  count?: number;
  className?: string;
  lanternGlow?: string;
}

export const StudioDustMotes: React.FC<StudioDustMotesProps> = ({
  count = 24,
  className = '',
  lanternGlow = 'rgba(212, 175, 55, 0.25)',
}) => {
  // Precompute deterministic random positions to prevent hydration mismatch and layout shifts
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = 1.5 + ((i * 7) % 3.5); // 1.5px to 5px
      const left = ((i * 19.3) % 96) + 2; // 2% to 98%
      const top = ((i * 23.7) % 90) + 5; // 5% to 95%
      const duration = 12 + ((i * 4) % 14); // 12s to 26s
      const delay = -((i * 3.1) % 15); // Staggered start
      const driftX = (((i % 2 === 0 ? 1 : -1) * (15 + (i % 25))));
      const opacity = 0.25 + ((i % 5) * 0.12);

      return {
        id: i,
        size,
        left: `${left}%`,
        top: `${top}%`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        driftX: `${driftX}px`,
        opacity,
      };
    });
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden z-10 ${className}`}
      style={{
        perspective: '1000px',
      }}
    >
      {/* Studio Light Beam Cone from Ceiling */}
      <div 
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[160%] sm:w-[120%] h-[90vh] pointer-events-none opacity-40 transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 70% at 50% 0%, ${lanternGlow} 0%, rgba(30, 19, 12, 0.4) 45%, transparent 75%)`,
        }}
      />

      {/* Floating Dust Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-amber-100/90 shadow-[0_0_6px_rgba(255,223,128,0.8)] will-change-transform"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatDust ${p.duration} infinite ease-in-out ${p.delay}`,
            ['--drift-x' as string]: p.driftX,
          }}
        />
      ))}

      <style>{`
        @keyframes floatDust {
          0% {
            transform: translate3d(0, 0, 0) scale(0.8);
            opacity: 0.15;
          }
          25% {
            opacity: 0.75;
          }
          50% {
            transform: translate3d(var(--drift-x, 20px), -45px, 0) scale(1.15);
            opacity: 0.9;
          }
          75% {
            opacity: 0.5;
          }
          100% {
            transform: translate3d(calc(var(--drift-x, 20px) * -0.5), -90px, 0) scale(0.8);
            opacity: 0.1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
