'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { GalleryItem } from '@/types/gallery';
import { Maximize2, Sparkles, Brush, Gamepad2 } from 'lucide-react';

interface EaselCardProps {
  item: GalleryItem;
  isActive: boolean;
  onInspect: (item: GalleryItem) => void;
}

export const EaselCard: React.FC<EaselCardProps> = ({
  item,
  isActive,
  onInspect,
}) => {
  // Category-specific aesthetic framing styles
  const getFrameStyles = () => {
    switch (item.category) {
      case 'future':
        return {
          frameBorder: 'border-[#5a3a22] shadow-[0_15px_35px_rgba(224,109,83,0.25)]',
          frameBg: 'bg-gradient-to-b from-[#2f1b0f] via-[#1f120a] to-[#140b06]',
          glow: 'after:absolute after:inset-0 after:rounded-2xl after:shadow-[0_0_30px_rgba(224,109,83,0.3)] after:pointer-events-none',
          tagColor: 'bg-amber-950/80 text-amber-200 border-amber-600/40',
          lampBeam: (
            <div className="absolute -top-10 inset-x-1/4 h-16 bg-gradient-to-b from-amber-400/20 via-orange-400/10 to-transparent blur-md pointer-events-none" />
          ),
        };
      case 'her-art':
        return {
          frameBorder: 'border-[#422a18] shadow-[0_15px_40px_rgba(212,175,55,0.3)]',
          frameBg: 'bg-gradient-to-b from-[#382314] via-[#22140a] to-[#160c06]',
          glow: 'after:absolute after:inset-0 after:rounded-2xl after:shadow-[0_0_35px_rgba(212,175,55,0.35)] after:pointer-events-none',
          tagColor: 'bg-yellow-950/80 text-yellow-200 border-yellow-600/40',
          lampBeam: (
            <>
              {/* Studio clip-on spotlight lamp fixture */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
                <div className="w-12 h-3.5 bg-gradient-to-r from-[#594406] via-[#ffd778] to-[#997a15] rounded-full shadow-md border border-amber-900/60" />
                <div className="w-1.5 h-3 bg-[#4a3505]" />
              </div>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-48 h-36 bg-gradient-to-b from-amber-200/35 via-amber-300/10 to-transparent blur-lg pointer-events-none" />
            </>
          ),
        };
      case 'pixel-pubg':
        return {
          frameBorder: 'border-[#1b3a36] shadow-[0_15px_40px_rgba(44,82,130,0.35)]',
          frameBg: 'bg-gradient-to-b from-[#112423] via-[#0c1817] to-[#071010]',
          glow: 'after:absolute after:inset-0 after:rounded-2xl after:shadow-[0_0_30px_rgba(20,184,166,0.25)] after:pointer-events-none',
          tagColor: 'bg-teal-950/80 text-teal-200 border-teal-600/40',
          lampBeam: (
            <div className="absolute -top-10 inset-x-1/4 h-20 bg-gradient-to-b from-teal-400/20 via-cyan-400/10 to-transparent blur-md pointer-events-none" />
          ),
        };
    }
  };

  const frame = getFrameStyles();

  return (
    <div 
      className="relative flex flex-col items-center w-[290px] sm:w-[330px] select-none shrink-0"
      style={{
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
      }}
    >
      {/* ==================================================== */}
      {/* Realistic Wooden Easel Stand Assembly                */}
      {/* ==================================================== */}
      
      {/* Easel Top Mast & Clamp */}
      <div className="relative flex flex-col items-center z-0 -mb-2">
        <div 
          className="w-4 h-12 rounded-t-sm shadow-md border-x border-[#1a0e07]"
          style={{
            background: 'linear-gradient(90deg, #442918 0%, #633e24 45%, #382112 100%)',
          }}
        />
        {/* Top Wooden Screw Clamp */}
        <div 
          className="w-10 h-3 -mt-2 rounded shadow-sm border border-[#25150a]"
          style={{
            background: 'linear-gradient(180deg, #7c4f2f 0%, #442918 100%)',
          }}
        />
      </div>

      {/* Clip-on Studio Lamp Beam for Category */}
      {frame.lampBeam}

      {/* ==================================================== */}
      {/* Main Artwork Canvas on the Easel                     */}
      {/* ==================================================== */}
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onInspect(item)}
        className={`relative z-10 w-full rounded-2xl p-3 sm:p-3.5 border-4 ${frame.frameBorder} ${frame.frameBg} shadow-2xl cursor-pointer group transition-all duration-300`}
        style={{
          boxShadow: isActive
            ? '0 20px 45px -8px rgba(0, 0, 0, 0.85), 0 0 25px rgba(212, 175, 55, 0.25)'
            : '0 12px 30px -8px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Canvas Image Container */}
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#0d0704] shadow-inner flex items-center justify-center">
          <img
            src={item.imageSrc}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Linen Canvas Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(255,255,255,0.08), rgba(255,255,255,0.08) 1px, transparent 1px, transparent 4px),
                repeating-linear-gradient(90deg, rgba(0,0,0,0.12), rgba(0,0,0,0.12) 1px, transparent 1px, transparent 4px)
              `,
            }}
          />

          {/* Vignette Shadow around canvas edges */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.85)] pointer-events-none" />

          {/* Tap-to-Inspect Floating Chip */}
          <div className="absolute top-2.5 right-2.5 opacity-80 group-hover:opacity-100 transition-opacity">
            <span className="inline-flex items-center gap-1 text-[10px] font-cairo px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-200 border border-amber-500/30 shadow-md">
              <Maximize2 className="w-3 h-3 text-amber-400" />
              <span>تأمل</span>
            </span>
          </div>

          {/* Category Mini Watermark Badge */}
          <div className="absolute bottom-2.5 left-2.5">
            {item.category === 'future' && (
              <span className="p-1 rounded-full bg-amber-950/80 text-amber-300 backdrop-blur-sm border border-amber-500/40 inline-block">
                <Sparkles className="w-3 h-3" />
              </span>
            )}
            {item.category === 'her-art' && (
              <span className="p-1 rounded-full bg-yellow-950/80 text-yellow-300 backdrop-blur-sm border border-yellow-500/40 inline-block">
                <Brush className="w-3 h-3" />
              </span>
            )}
            {item.category === 'pixel-pubg' && (
              <span className="p-1 rounded-full bg-teal-950/80 text-teal-300 backdrop-blur-sm border border-teal-500/40 inline-block">
                <Gamepad2 className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>

        {/* Artwork Info Plaque under Canvas */}
        <div className="mt-3 text-right" dir="rtl">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className={`text-[10px] font-cairo px-2 py-0.5 rounded-full border ${frame.tagColor}`}>
              {item.medium}
            </span>
            {item.date && (
              <span className="text-[10px] font-cairo text-amber-400/60">
                {item.date}
              </span>
            )}
          </div>

          <h4 className="text-base sm:text-lg font-bold font-aref text-[#fbf7ee] line-clamp-1 group-hover:text-amber-300 transition-colors">
            {item.title}
          </h4>

          <p className="text-xs font-amiri text-amber-200/75 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* ==================================================== */}
      {/* Easel Crossbar Shelf (Holding the canvas)           */}
      {/* ==================================================== */}
      <div 
        className="relative z-20 w-[104%] h-5 -mt-1 rounded-sm shadow-xl border-y border-[#1e1008] flex items-center justify-between px-3"
        style={{
          background: 'linear-gradient(180deg, #6e462b 0%, #4a2e1c 60%, #2b180d 100%)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,225,180,0.3)',
        }}
      >
        {/* Brass knobs on the shelf ends */}
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-sm" />
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-sm" />
      </div>

      {/* Easel Legs extending to floor */}
      <div className="relative w-full flex justify-between px-6 z-0 h-10 overflow-hidden pointer-events-none">
        {/* Left Leg */}
        <div 
          className="w-3.5 h-24 transform -rotate-12 origin-top shadow-lg"
          style={{
            background: 'linear-gradient(90deg, #3d2314 0%, #5e371f 50%, #2f190d 100%)',
          }}
        />
        {/* Center Mast Leg */}
        <div 
          className="w-4 h-24 shadow-lg"
          style={{
            background: 'linear-gradient(90deg, #382012 0%, #54311c 50%, #28160b 100%)',
          }}
        />
        {/* Right Leg */}
        <div 
          className="w-3.5 h-24 transform rotate-12 origin-top shadow-lg"
          style={{
            background: 'linear-gradient(90deg, #3d2314 0%, #5e371f 50%, #2f190d 100%)',
          }}
        />
      </div>

      {/* Studio Floor Shadow */}
      <div className="w-48 h-3.5 bg-black/60 rounded-full blur-md -mt-2 pointer-events-none" />
    </div>
  );
};
