import React from 'react';

interface BlackIrisMotifProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'single' | 'border-pair' | 'bookmark';
  className?: string;
}

const sizeMap = {
  sm: 'w-5 h-6',
  md: 'w-8 h-10',
  lg: 'w-12 h-16',
};

const IrisSvg: React.FC<{ size: 'sm' | 'md' | 'lg' }> = ({ size }) => (
  <svg
    viewBox="0 0 60 80"
    className={`${sizeMap[size]} drop-shadow-[0_0_8px_rgba(74,26,107,0.6)]`}
    fill="none"
  >
    <defs>
      <linearGradient id="irisGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2e1065" />
        <stop offset="50%" stopColor="#1e1b4b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>

    {/* Stem & Leaves */}
    <line x1="30" y1="45" x2="30" y2="78" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 30 65 Q 20 55 18 45" stroke="#166534" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 30 60 Q 40 50 42 40" stroke="#166534" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* 3 Lower Drooping Falls Petals */}
    <path
      d="M 30 35 C 10 40 5 60 25 65 C 30 65 30 45 30 35 Z"
      fill="url(#irisGrad)"
      stroke="#cbd5e1"
      strokeWidth="0.8"
    />
    <path
      d="M 30 35 C 50 40 55 60 35 65 C 30 65 30 45 30 35 Z"
      fill="url(#irisGrad)"
      stroke="#cbd5e1"
      strokeWidth="0.8"
    />
    <path
      d="M 22 35 C 18 48 42 48 38 35 C 30 45 22 35 22 35 Z"
      fill="#1e1b4b"
      stroke="#e2e8f0"
      strokeWidth="0.6"
    />

    {/* 3 Upper Upright Standards Petals */}
    <path
      d="M 30 35 C 15 25 15 5 30 2 C 45 5 45 25 30 35 Z"
      fill="url(#irisGrad)"
      stroke="#e2e8f0"
      strokeWidth="1"
    />
    <path
      d="M 30 35 C 22 25 18 10 26 5 C 32 15 30 35 30 35 Z"
      fill="#3b0764"
      opacity="0.8"
    />
    <path
      d="M 30 35 C 38 25 42 10 34 5 C 28 15 30 35 30 35 Z"
      fill="#3b0764"
      opacity="0.8"
    />

    {/* Golden Fuzzy Beard Center */}
    <line x1="30" y1="28" x2="30" y2="42" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
    <circle cx="30" cy="35" r="2" fill="#fef08a" />
  </svg>
);

export const BlackIrisMotif: React.FC<BlackIrisMotifProps> = ({
  size = 'md',
  variant = 'single',
  className = '',
}) => {
  if (variant === 'bookmark') {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <IrisSvg size={size} />
      </span>
    );
  }

  if (variant === 'border-pair') {
    return (
      <div className={`flex items-center justify-between w-full px-2 ${className}`}>
        <IrisSvg size={size} />
        <div className="h-px flex-1 mx-3 bg-gradient-to-r from-purple-900/40 via-amber-500/30 to-purple-900/40" />
        <div className="transform scale-x-[-1]">
          <IrisSvg size={size} />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-block ${className}`}>
      <IrisSvg size={size} />
    </div>
  );
};
