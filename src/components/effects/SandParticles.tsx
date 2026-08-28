import React, { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SandParticlesProps {
  count?: number;
}

export const SandParticles: React.FC<SandParticlesProps> = ({ count = 8 }) => {
  const isReduced = useReducedMotion();

  const grains = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${15 + (i * 10) + Math.random() * 8}%`,
      left: `${Math.random() * 90}%`,
      size: 2 + (i % 3),
      duration: `${6 + (i % 4) * 2}s`,
      delay: `${i * 0.9}s`,
      opacity: 0.3 + (i % 3) * 0.2,
    }));
  }, [count]);

  if (isReduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {grains.map((g) => (
        <div
          key={g.id}
          className="absolute rounded-full bg-amber-400/80 animate-float"
          style={{
            top: g.top,
            left: g.left,
            width: `${g.size}px`,
            height: `${g.size}px`,
            boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)',
            animationDuration: g.duration,
            animationDelay: g.delay,
            opacity: g.opacity,
          }}
        />
      ))}
    </div>
  );
};
