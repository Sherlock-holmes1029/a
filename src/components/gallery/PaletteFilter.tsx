'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PALETTE_MOODS } from '@/data/galleryData';
import type { PaletteMoodColor } from '@/types/gallery';

interface PaletteFilterProps {
  selectedMood: PaletteMoodColor;
  onSelectMood: (mood: PaletteMoodColor) => void;
}

export const PaletteFilter: React.FC<PaletteFilterProps> = ({
  selectedMood,
  onSelectMood,
}) => {
  const activeMood = PALETTE_MOODS.find((m) => m.id === selectedMood) || PALETTE_MOODS[0];

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center select-none">
      {/* Mood indicator pill */}
      <motion.div
        key={activeMood.id}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-2.5 px-3.5 py-1 rounded-full text-xs font-cairo flex items-center gap-2 border shadow-lg backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(26, 17, 12, 0.85)',
          borderColor: activeMood.hex,
          color: '#f9f6ee',
        }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: activeMood.hex }}
        />
        <span className="font-semibold">{activeMood.nameAr}</span>
        <span className="text-[10px] text-amber-300/70 font-amiri">
          {activeMood.id === 'all' ? '• ألوان المرسم' : '• مزاج الزيت والضوء'}
        </span>
      </motion.div>

      {/* Wooden Painter's Palette Dock */}
      <div 
        className="relative w-full px-5 py-3 rounded-full sm:rounded-[36px] flex items-center justify-between shadow-2xl border border-amber-950/70"
        style={{
          background: 'linear-gradient(135deg, #3d2516 0%, #2a180e 45%, #1e1008 100%)',
          boxShadow: '0 12px 35px -5px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(255, 220, 160, 0.15), inset 0 -3px 6px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Subtle wood grain texture highlight */}
        <div 
          className="absolute inset-0 rounded-full opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'repeating-radial-gradient(circle at 15% 40%, transparent 0, transparent 15px, rgba(0,0,0,0.4) 16px, rgba(255,255,255,0.05) 18px)',
          }}
        />

        {/* Thumb hole of the palette (carved wood look) */}
        <div 
          className="w-8 h-8 rounded-full border border-amber-950/90 shadow-[inset_0_3px_6px_rgba(0,0,0,0.95)] shrink-0 hidden xs:block"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #150b05 0%, #0c0603 100%)',
          }}
          title="مقبض البالتة الخشبية"
        />

        {/* Paint Dollops Row */}
        <div className="flex-1 flex items-center justify-around gap-1.5 sm:gap-3 px-1">
          {PALETTE_MOODS.map((mood) => {
            const isSelected = selectedMood === mood.id;

            return (
              <button
                key={mood.id}
                type="button"
                onClick={() => onSelectMood(mood.id)}
                className="relative group p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full transition-transform"
                title={`${mood.nameAr} (${mood.nameEn})`}
                aria-label={mood.nameAr}
                aria-pressed={isSelected}
              >
                {/* Active Selection Halo */}
                {isSelected && (
                  <motion.div
                    layoutId="palette-glow"
                    className="absolute inset-0 rounded-full -m-1 border-2 border-amber-300/80 shadow-[0_0_12px_rgba(255,215,0,0.5)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 25 }}
                  />
                )}

                {/* 3D Glossy Wet Paint Dollop */}
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  whileHover={{ scale: 1.12 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full relative shadow-md cursor-pointer transition-shadow"
                  style={{
                    backgroundColor: mood.hex,
                    backgroundImage: `
                      radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.25) 25%, transparent 55%),
                      linear-gradient(145deg, ${mood.hex} 0%, ${mood.secondaryHex} 100%)
                    `,
                    boxShadow: isSelected
                      ? `0 6px 16px ${mood.glowColor}, inset 0 2px 3px rgba(255,255,255,0.7), inset 0 -3px 5px rgba(0,0,0,0.5)`
                      : '0 4px 10px rgba(0,0,0,0.6), inset 0 2px 2px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Wet paint specular highlight reflection */}
                  <span 
                    className="absolute top-1.5 left-2 w-2.5 h-1.5 rounded-full bg-white/75 blur-[0.4px] pointer-events-none transform -rotate-12"
                  />

                  {/* Tiny paint swirl crest in center */}
                  <span 
                    className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-black/25 pointer-events-none"
                  />
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* Small brass plaque on palette rim */}
        <div className="hidden sm:flex flex-col items-center text-[9px] font-cairo text-amber-400/70 border-r border-amber-800/40 pr-3 mr-1">
          <span className="font-bold tracking-widest text-amber-200/90">مرسم الزيت</span>
          <span className="text-[8px] text-stone-400">Atelier Oil</span>
        </div>
      </div>
    </div>
  );
};
