import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/context/SoundContext';
import { Music } from 'lucide-react';

export const PerspectiveRoad: React.FC = () => {
  const [isHonked, setIsHonked] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const { playTap, playChime } = useSound();

  const handleCarClick = () => {
    setIsHonked(true);
    playTap();
    setTimeout(() => setIsHonked(false), 2400);
  };

  const handleRadioClick = () => {
    setIsPlayingMusic(true);
    playChime();
    setTimeout(() => setIsPlayingMusic(false), 3000);
  };

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b0f19] via-[#121a2e] to-[#1e2738] border-2 border-indigo-500/40 shadow-2xl select-none flex flex-col justify-between">
      {/* 1. Distant Mountain Peaks & Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glowing crescent moon & stars */}
        <div className="absolute top-5 left-8 w-9 h-9 rounded-full bg-amber-200/90 shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
        <div className="absolute top-4 left-10 w-8 h-8 rounded-full bg-[#0d1322]" />

        {/* Twinkling stars */}
        {[
          { top: '12%', left: '20%', delay: '0s' },
          { top: '22%', left: '48%', delay: '1s' },
          { top: '15%', left: '72%', delay: '1.5s' },
          { top: '28%', left: '88%', delay: '0.5s' },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-sky-100 rounded-full animate-star-twinkle"
            style={{ top: star.top, left: star.left, animationDelay: star.delay }}
          />
        ))}

        {/* Mountain Silhouettes */}
        <div className="absolute inset-x-0 bottom-28 h-36 opacity-50">
          <svg viewBox="0 0 600 200" className="w-full h-full fill-[#0f172a]" preserveAspectRatio="none">
            <polygon points="0,200 90,50 180,200 300,30 420,200 520,60 600,200" />
          </svg>
        </div>
        <div className="absolute inset-x-0 bottom-20 h-28 opacity-80">
          <svg viewBox="0 0 600 200" className="w-full h-full fill-[#090d16]" preserveAspectRatio="none">
            <polygon points="0,200 130,70 240,200 360,80 480,200 600,90 600,200" />
          </svg>
        </div>
      </div>

      {/* 2. Top Bar with Radio Button */}
      <div className="relative z-20 p-4 flex justify-between items-center">
        <button
          type="button"
          onClick={handleRadioClick}
          aria-label="موسيقى الطريق"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-400/40 text-xs font-cairo text-indigo-200 shadow-md cursor-pointer hover:bg-indigo-900"
        >
          <Music className="w-3.5 h-3.5 text-indigo-300 animate-pulse" />
          <span>موسيقى المشوار 🎵</span>
        </button>

        {isPlayingMusic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1 text-xs text-amber-300 font-cairo bg-black/60 px-3 py-1 rounded-full"
          >
            <span>🎶 أنغام دافئة تملأ الطريق...</span>
          </motion.div>
        )}
      </div>

      {/* 3. 3D Perspective Highway Road & Moving Center Dashes */}
      <div className="relative w-full h-40 bg-[#151a26] border-t-2 border-slate-700 overflow-hidden flex flex-col justify-end">
        {/* Moving Yellow Road Dashes */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
          <div className="w-full flex items-center justify-around animate-[mistDrift_2s_linear_infinite]">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="w-12 h-2 bg-amber-400/90 rounded-sm shadow-[0_0_10px_rgba(251,191,36,0.9)] inline-block"
              />
            ))}
          </div>
        </div>

        {/* Vintage Red Driving Car with Headlight Beams */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
          <motion.button
            type="button"
            onClick={handleCarClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="سيارة الرحلة"
            className="relative cursor-pointer focus:outline-none flex flex-col items-center min-h-[44px]"
          >
            {/* Headlight Beam Cone */}
            <div className="absolute -right-24 bottom-3 w-32 h-16 pointer-events-none">
              <svg viewBox="0 0 100 50" className="w-full h-full opacity-60">
                <polygon points="0,25 100,0 100,50" fill="url(#beamGrad)" />
                <defs>
                  <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Exhaust Smoke Puffs */}
            <div className="absolute -left-6 bottom-2 flex gap-1 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400/50 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-slate-300/40 animate-pulse" />
            </div>

            {/* Car Structure */}
            <div className="animate-car-bounce">
              <svg width="120" height="60" viewBox="0 0 120 60" className="drop-shadow-2xl">
                {/* Chassis */}
                <rect x="15" y="26" width="95" height="20" rx="6" fill="#be123c" />
                <rect x="18" y="29" width="90" height="3" fill="#f43f5e" opacity="0.6" />

                {/* Cabin */}
                <path d="M 35 26 L 48 10 L 82 10 L 95 26 Z" fill="#9f1239" />

                {/* Windows with driver & passenger silhouettes */}
                <polygon points="50,13 62,13 62,24 40,24" fill="#38bdf8" opacity="0.85" />
                <polygon points="66,13 80,13 90,24 66,24" fill="#38bdf8" opacity="0.85" />
                <circle cx="56" cy="18" r="4.5" fill="#0f172a" />
                <circle cx="74" cy="18" r="4.5" fill="#0f172a" />

                {/* Headlight Bulb */}
                <circle cx="108" cy="38" r="4.5" fill="#fde047" />

                {/* Wheels */}
                <circle cx="35" cy="46" r="10" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
                <circle cx="35" cy="46" r="3.5" fill="#94a3b8" />
                <circle cx="90" cy="46" r="10" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
                <circle cx="90" cy="46" r="3.5" fill="#94a3b8" />
              </svg>
            </div>

            {/* Honk Speech Bubble */}
            {isHonked && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: -20 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-12 whitespace-nowrap bg-amber-400 text-stone-950 font-bold font-cairo text-xs px-3.5 py-1.5 rounded-xl shadow-xl border border-amber-300"
              >
                🚗 بييب! رحلة لا تُنسى وسوالف حلوة!
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
