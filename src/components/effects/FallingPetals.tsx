import React from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FallingPetalsProps {
  count?: number;
  className?: string;
  variant?: 'rose' | 'iris' | 'gold';
}

export const FallingPetals: React.FC<FallingPetalsProps> = ({
  count = 14,
  className = '',
  variant = 'rose',
}) => {
  const isReduced = useReducedMotion();

  if (isReduced) return null;

  const petals = Array.from({ length: count }, (_, i) => {
    const left = (i * (100 / count) + (i % 3) * 5) % 96;
    const delay = (i * 0.7) % 7;
    const duration = 6 + (i % 5) * 1.5;
    const size = 16 + (i % 4) * 6;
    const rotation = (i * 45) % 360;

    let fill = '#e11d48'; // Rose
    let opacity = 0.65;
    if (variant === 'iris') {
      fill = i % 2 === 0 ? '#4c1d95' : '#312e81';
      opacity = 0.55;
    } else if (variant === 'gold') {
      fill = '#f59e0b';
      opacity = 0.6;
    }

    return { id: i, left, delay, duration, size, rotation, fill, opacity };
  });

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none overflow-hidden z-10 ${className}`}
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-40px]"
          style={{
            left: `${petal.left}%`,
            animation: `fallingPetal ${petal.duration}s linear ${petal.delay}s infinite`,
            transform: `rotate(${petal.rotation}deg)`,
            willChange: 'transform, opacity',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 30 30"
            style={{ opacity: petal.opacity }}
          >
            <path
              d="M15 0 C25 8 30 20 15 30 C0 20 5 8 15 0 Z"
              fill={petal.fill}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
