import React, { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FireflyParticlesProps {
  count?: number;
}

export const FireflyParticles: React.FC<FireflyParticlesProps> = ({ count = 10 }) => {
  const isReduced = useReducedMotion();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${10 + Math.random() * 80}%`,
      size: 3 + Math.random() * 4,
      duration: `${4 + Math.random() * 6}s`,
      delay: `${Math.random() * 4}s`,
      color: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#34d399' : '#a7f3d0',
    }));
  }, [count]);

  if (isReduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color}`,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};
