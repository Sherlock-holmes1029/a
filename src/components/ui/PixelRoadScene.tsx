import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/context/SoundContext';

export const PixelRoadScene: React.FC = () => {
  const [isHonked, setIsHonked] = useState(false);
  const { playTap } = useSound();

  const handleCarClick = () => {
    setIsHonked(true);
    playTap();
    setTimeout(() => setIsHonked(false), 2000);
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b0f19] via-[#1a233a] to-[#252836] border-2 border-sky-500/30 shadow-2xl select-none">
      {/* 1. Starry Night Sky & Moon */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glowing crescent moon */}
        <div className="absolute top-6 left-8 w-10 h-10 rounded-full bg-amber-200/90 shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
        <div className="absolute top-5 left-10 w-9 h-9 rounded-full bg-[#0d1322]" />

        {/* Twinkling stars */}
        {[
          { top: '15%', left: '25%', delay: '0s' },
          { top: '22%', left: '45%', delay: '1s' },
          { top: '10%', left: '70%', delay: '1.5s' },
          { top: '28%', left: '85%', delay: '0.5s' },
          { top: '8%', left: '38%', delay: '2s' },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-sky-200 rounded-full animate-star-twinkle"
            style={{ top: star.top, left: star.left, animationDelay: star.delay }}
          />
        ))}
      </div>

      {/* 2. Parallax Distant Mountain Peaks (Layer 1 - Slowest) */}
      <div className="absolute inset-x-0 bottom-24 h-44 opacity-40 pointer-events-none">
        <svg viewBox="0 0 600 200" className="w-full h-full fill-indigo-950" preserveAspectRatio="none">
          <polygon points="0,200 80,60 160,200 280,40 380,200 480,70 600,200" />
        </svg>
      </div>

      {/* 3. Midground Mountains (Layer 2) */}
      <div className="absolute inset-x-0 bottom-16 h-36 opacity-70 pointer-events-none">
        <svg viewBox="0 0 600 200" className="w-full h-full fill-[#111c33]" preserveAspectRatio="none">
          <polygon points="0,200 120,80 220,200 340,90 460,200 560,110 600,200" />
        </svg>
      </div>

      {/* 4. Near Pine Trees & Hills (Layer 3) */}
      <div className="absolute inset-x-0 bottom-10 h-24 opacity-90 pointer-events-none">
        <svg viewBox="0 0 600 150" className="w-full h-full fill-[#0a1120]" preserveAspectRatio="none">
          <polygon points="0,150 40,60 70,150 140,50 180,150 290,40 330,150 440,70 480,150 560,50 600,150" />
        </svg>
      </div>

      {/* 5. Asphalt Road with Scrolling Dashes */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[#131722] border-t-2 border-slate-700 flex flex-col justify-center">
        {/* Moving White Road Dashes */}
        <div className="relative w-full h-2 overflow-hidden flex items-center">
          <div className="w-[200%] flex items-center justify-around animate-[mistDrift_3s_linear_infinite]">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="w-8 h-1.5 bg-amber-400/90 rounded-sm inline-block shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
            ))}
          </div>
        </div>
      </div>

      {/* 6. Animated Driving Car Sprite */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <motion.button
          type="button"
          onClick={handleCarClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label="السيارة على طريق الجبل"
          className="relative cursor-pointer focus:outline-none flex flex-col items-center"
        >
          {/* Exhaust Smoke Puffs */}
          <div className="absolute -left-6 bottom-1 flex gap-1 pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400/40 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-slate-300/30 animate-pulse" />
          </div>

          {/* Car SVG Pixel Structure */}
          <div className="relative animate-car-bounce">
            <svg width="110" height="54" viewBox="0 0 120 60" className="drop-shadow-xl">
              {/* Headlight Beam Cone (projecting forward to the right) */}
              <polygon
                points="110,38 180,25 180,55 110,46"
                fill="url(#headlightBeam)"
                opacity={isHonked ? "0.9" : "0.55"}
              />
              <defs>
                <linearGradient id="headlightBeam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Lower Car Chassis (Ruby / Vintage Red) */}
              <rect x="15" y="26" width="95" height="20" rx="6" fill="#be123c" />
              <rect x="18" y="29" width="90" height="3" fill="#f43f5e" opacity="0.6" />

              {/* Upper Cabin */}
              <path d="M 35 26 L 48 10 L 82 10 L 95 26 Z" fill="#9f1239" />

              {/* Windows */}
              <polygon points="50,13 62,13 62,24 40,24" fill="#38bdf8" opacity="0.85" />
              <polygon points="66,13 80,13 90,24 66,24" fill="#38bdf8" opacity="0.85" />

              {/* Two Silhouettes in the Car (Driver & Passenger) */}
              <circle cx="56" cy="18" r="4.5" fill="#0f172a" />
              <circle cx="74" cy="18" r="4.5" fill="#0f172a" />

              {/* Headlight Bulb */}
              <circle cx="108" cy="38" r="4" fill="#fde047" />

              {/* Wheels */}
              <g className="animate-spin-slow" style={{ transformOrigin: '35px 46px' }}>
                <circle cx="35" cy="46" r="10" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
                <circle cx="35" cy="46" r="3.5" fill="#94a3b8" />
              </g>
              <g className="animate-spin-slow" style={{ transformOrigin: '90px 46px' }}>
                <circle cx="90" cy="46" r="10" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
                <circle cx="90" cy="46" r="3.5" fill="#94a3b8" />
              </g>
            </svg>
          </div>

          {/* Honk Speech Bubble */}
          {isHonked && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: -20 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-12 whitespace-nowrap bg-amber-400 text-stone-950 font-bold font-cairo text-xs px-3 py-1 rounded-xl shadow-lg border border-amber-300"
            >
              🎵 رحلة سعيدة ومحادثات لا تنتهي!
            </motion.div>
          )}
        </motion.button>
      </div>
    </div>
  );
};
