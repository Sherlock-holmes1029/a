import React from 'react';

interface LandmarkSilhouetteProps {
  variant: 'khazneh' | 'colosseum';
  className?: string;
  onClick?: () => void;
}

export const LandmarkSilhouette: React.FC<LandmarkSilhouetteProps> = ({
  variant,
  className = '',
  onClick,
}) => {
  if (variant === 'colosseum') {
    return (
      <div onClick={onClick} className={`inline-block ${className}`}>
        <svg
          viewBox="0 0 300 180"
          className="w-full h-auto stroke-amber-600/70 fill-none"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {/* Colosseum Base & Outer Arch Tier 1 */}
          <path d="M 20 160 Q 150 170 280 160" />
          <path d="M 25 125 Q 150 135 275 125" />
          <path d="M 30 90 Q 150 100 240 90" />
          <path d="M 35 55 Q 120 65 190 55" />

          {/* Broken wall decay silhouette on right */}
          <path d="M 190 55 L 200 70 L 220 75 L 240 90 L 255 105 L 275 125 L 280 160" />

          {/* Arches Tier 1 (Bottom) */}
          {[40, 75, 110, 145, 180, 215, 250].map((x, i) => (
            <path key={`arch-1-${i}`} d={`M ${x} 160 L ${x} 140 Q ${x + 12} 128 ${x + 24} 140 L ${x + 24} 160`} />
          ))}

          {/* Arches Tier 2 (Middle) */}
          {[45, 80, 115, 150, 185, 220].map((x, i) => (
            <path key={`arch-2-${i}`} d={`M ${x} 125 L ${x} 108 Q ${x + 10} 98 ${x + 20} 108 L ${x + 20} 125`} />
          ))}

          {/* Arches Tier 3 (Upper) */}
          {[50, 85, 120, 155].map((x, i) => (
            <path key={`arch-3-${i}`} d={`M ${x} 90 L ${x} 75 Q ${x + 9} 68 ${x + 18} 75 L ${x + 18} 90`} />
          ))}
        </svg>
      </div>
    );
  }

  // Al-Khazneh (Petra Treasury) Detailed Silhouette
  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox="0 0 600 480"
        className="w-full h-auto stroke-amber-500/50 fill-none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Canyon Canyon Slit framing rocks */}
        <path d="M 0 0 Q 70 200 40 480" stroke="#78350f" strokeWidth="3" opacity="0.6" />
        <path d="M 600 0 Q 530 200 560 480" stroke="#78350f" strokeWidth="3" opacity="0.6" />

        {/* Lower Level Pediment & Entablature */}
        <path d="M 120 460 L 480 460" />
        <path d="M 130 450 L 470 450" />
        <path d="M 140 440 L 460 440" />

        {/* 6 Corinthian Lower Columns */}
        {[160, 210, 260, 340, 390, 440].map((cx, i) => (
          <g key={`col-${i}`}>
            <line x1={cx - 10} y1="440" x2={cx - 10} y2="280" />
            <line x1={cx + 10} y1="440" x2={cx + 10} y2="280" />
            {/* Capital */}
            <path d={`M ${cx - 14} 280 Q ${cx} 270 ${cx + 14} 280`} />
            <path d={`M ${cx - 12} 440 L ${cx + 12} 440`} />
          </g>
        ))}

        {/* Main Central Portal / Gate */}
        <path d="M 275 440 L 275 320 Q 300 300 325 320 L 325 440" stroke="#b45309" strokeWidth="2.5" />
        {/* Side Portals */}
        <path d="M 180 440 L 180 340 Q 195 325 210 340 L 210 440" />
        <path d="M 390 440 L 390 340 Q 405 325 420 340 L 420 440" />

        {/* Lower Main Triangular Pediment */}
        <path d="M 140 270 L 460 270" strokeWidth="2.5" />
        <path d="M 140 270 L 300 180 L 460 270" strokeWidth="3" />
        <path d="M 160 265 L 300 190 L 440 265" />

        {/* Upper Level Tholos (Circular Temple) & Side Pavilions */}
        <path d="M 150 180 L 450 180" />

        {/* Left Upper Pavilion with broken pediment */}
        <path d="M 160 180 L 160 80 L 230 80 L 230 180" />
        <path d="M 155 80 L 235 40" strokeWidth="2.5" />
        <line x1="180" y1="180" x2="180" y2="80" />
        <line x1="210" y1="180" x2="210" y2="80" />

        {/* Right Upper Pavilion with broken pediment */}
        <path d="M 370 180 L 370 80 L 440 80 L 440 180" />
        <path d="M 445 80 L 365 40" strokeWidth="2.5" />
        <line x1="390" y1="180" x2="390" y2="80" />
        <line x1="420" y1="180" x2="420" y2="80" />

        {/* Central Circular Tholos */}
        <path d="M 260 180 L 260 70 Q 300 60 340 70 L 340 180" strokeWidth="2.2" />
        <line x1="285" y1="180" x2="285" y2="70" />
        <line x1="315" y1="180" x2="315" y2="70" />
        {/* Tholos Conical Roof & The Iconic Urn */}
        <path d="M 255 70 Q 300 30 345 70" strokeWidth="2.5" />
        <path d="M 292 30 Q 300 10 308 30 Z" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="300" cy="8" r="4" fill="#fbbf24" />

        {/* Decorative carved rock lines */}
        <path d="M 80 120 Q 110 140 80 160" opacity="0.4" />
        <path d="M 520 120 Q 490 140 520 160" opacity="0.4" />
      </svg>
    </div>
  );
};
