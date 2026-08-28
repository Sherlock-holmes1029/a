import React, { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const AnimatedFoliage: React.FC = () => {
  const isReduced = useReducedMotion();

  // Precompute random parameters for drifting leaves
  const leaves = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${10 + (i * 16) + (Math.sin(i) * 5)}%`,
      delay: `${i * 1.8}s`,
      duration: `${10 + (i % 3) * 3}s`,
      scale: 0.7 + (i % 3) * 0.25,
      color: i % 2 === 0 ? '#10b981' : '#34d399',
    }));
  }, []);

  if (isReduced) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        {/* Static silhouette */}
        <svg className="absolute bottom-0 left-0 w-64 h-80 text-emerald-950/60" viewBox="0 0 100 100" fill="currentColor">
          <path d="M10 100 Q 30 50 15 10 Q 50 40 50 100 Z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Left Palm Tree Fronds */}
      <div
        className="absolute -left-10 bottom-0 w-64 sm:w-80 h-[480px] text-emerald-950/80 animate-tree-sway origin-bottom-left"
        style={{ animationDuration: '9s' }}
      >
        <svg viewBox="0 0 200 400" className="w-full h-full fill-current" preserveAspectRatio="none">
          {/* Palm trunk */}
          <path d="M 40 400 Q 55 200 80 80 Q 95 200 110 400 Z" fill="#061f12" />
          {/* Left Fronds */}
          <path d="M 80 80 Q 20 50 0 120 Q 40 100 80 90 Z" fill="#092f1b" />
          <path d="M 80 80 Q 10 90 10 170 Q 50 130 80 100 Z" fill="#0c3b22" />
          <path d="M 80 80 Q 120 20 180 50 Q 130 70 80 90 Z" fill="#0d4427" />
          <path d="M 80 80 Q 150 70 190 150 Q 130 120 80 100 Z" fill="#082b18" />
        </svg>
      </div>

      {/* 2. Right Canopy Silhouette */}
      <div
        className="absolute -right-12 bottom-0 w-72 sm:w-96 h-[420px] text-emerald-950/70 animate-tree-sway origin-bottom-right"
        style={{ animationDuration: '11s', animationDelay: '1.5s' }}
      >
        <svg viewBox="0 0 200 400" className="w-full h-full fill-current" preserveAspectRatio="none">
          <path d="M 120 400 Q 110 220 90 90 Q 80 220 70 400 Z" fill="#051a0f" />
          {/* Canopy blobs */}
          <circle cx="90" cy="90" r="70" fill="#082917" />
          <circle cx="50" cy="110" r="50" fill="#0b3820" />
          <circle cx="130" cy="115" r="55" fill="#092e1a" />
          <circle cx="90" cy="45" r="45" fill="#0d4427" />
        </svg>
      </div>

      {/* 3. Mid Fern Cluster Silhouette */}
      <div
        className="absolute left-1/3 bottom-0 w-48 h-56 text-emerald-900/40 animate-tree-sway origin-bottom"
        style={{ animationDuration: '7s', animationDelay: '3s' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <path d="M 50 100 Q 20 60 10 40 Q 35 55 50 100 Z" />
          <path d="M 50 100 Q 50 40 45 20 Q 55 45 50 100 Z" />
          <path d="M 50 100 Q 80 60 90 40 Q 65 55 50 100 Z" />
        </svg>
      </div>

      {/* 4. Drifting Leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute top-0 opacity-0"
          style={{
            left: leaf.left,
            animation: `leafDrift ${leaf.duration} ease-in-out infinite`,
            animationDelay: leaf.delay,
            transform: `scale(${leaf.scale})`,
          }}
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path
              d="M 10 0 C 18 6 18 18 10 24 C 2 18 2 6 10 0 Z"
              fill={leaf.color}
              opacity="0.75"
            />
            {/* Center leaf vein */}
            <path d="M 10 2 L 10 22" stroke="#042f1a" strokeWidth="1" opacity="0.6" />
          </svg>
        </div>
      ))}
    </div>
  );
};
