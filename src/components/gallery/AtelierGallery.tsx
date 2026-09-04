'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import type { GalleryItem, GalleryCategory, PaletteMoodColor } from '@/types/gallery';
import { GALLERY_ITEMS, PALETTE_MOODS, CATEGORY_LABELS } from '@/data/galleryData';
import { StudioDustMotes } from './StudioDustMotes';
import { EaselCard } from './EaselCard';
import { PaletteFilter } from './PaletteFilter';
import { InspectionModal } from './InspectionModal';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface AtelierGalleryProps {
  onBack?: () => void;
  onNavigateToWorld?: (world: 'memories' | 'hub') => void;
}

export const AtelierGallery: React.FC<AtelierGalleryProps> = ({ onBack, onNavigateToWorld }) => {
  const { navigateToWorld } = useApp();

  const handleNavigateToMemories = () => {
    if (onNavigateToWorld) {
      onNavigateToWorld('memories');
    } else {
      navigateToWorld('memories');
    }
  };
  // Navigation Wings / Category Filter
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all');

  // Bottom Palette Mood Filter
  const [selectedMood, setSelectedMood] = useState<PaletteMoodColor>('all');

  // Currently inspected item for the full-screen modal
  const [inspectedItem, setInspectedItem] = useState<GalleryItem | null>(null);

  // Active easel index for carousel scroll/snap tracking
  const [activeIndex, setActiveIndex] = useState(0);

  // Carousel container ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter items according to active wing and palette mood
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      if (!matchesCategory) return false;

      if (selectedMood === 'all') return true;

      // Match palette mood color or category association
      const currentMoodDef = PALETTE_MOODS.find((m) => m.id === selectedMood);
      if (item.paletteColor === selectedMood) return true;
      if (currentMoodDef?.categoryMatch && item.category === currentMoodDef.categoryMatch) {
        return true;
      }
      return false;
    });
  }, [activeCategory, selectedMood]);

  // When active category or mood changes, scroll back to first item smoothly
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      setActiveIndex(0);
    }
  }, [activeCategory, selectedMood]);

  // Current mood definition for studio lighting
  const activeMoodDef = PALETTE_MOODS.find((m) => m.id === selectedMood) || PALETTE_MOODS[0];

  // Handle scroll position to update active centered item
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft } = carouselRef.current;
    // Account for RTL scroll metrics in various browsers
    const scrollPos = Math.abs(scrollLeft);
    const cardWidth = 310; // Approx card + gap
    const index = Math.round(scrollPos / cardWidth);
    setActiveIndex(Math.min(index, Math.max(0, filteredItems.length - 1)));
  };

  const scrollCarousel = (direction: 'next' | 'prev') => {
    if (!carouselRef.current) return;
    const scrollAmount = 320;
    const isRtl = document.dir === 'rtl' || true;
    const sign = direction === 'next' ? (isRtl ? -1 : 1) : (isRtl ? 1 : -1);
    carouselRef.current.scrollBy({ left: sign * scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      dir="rtl"
      className="relative min-h-[100dvh] w-full bg-[#170e08] text-[#f9f6ee] overflow-x-hidden flex flex-col justify-between select-none"
      style={{
        background: `
          radial-gradient(ellipse 90% 70% at 50% 10%, ${activeMoodDef.glowColor} 0%, transparent 65%),
          radial-gradient(circle at 10% 85%, rgba(62, 39, 26, 0.4) 0%, transparent 50%),
          linear-gradient(180deg, #1f130c 0%, #160d07 45%, #0f0804 100%)
        `,
        transform: 'translate3d(0,0,0)',
      }}
    >
      {/* ==================================================== */}
      {/* Studio Sanctuary Environmental Elements              */}
      {/* ==================================================== */}
      
      {/* Linen Canvas Subtle Background Texture Weave */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0 mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px),
            radial-gradient(circle at 0% 0%, #fff 1px, transparent 1px)
          `,
          backgroundSize: '12px 12px',
        }}
      />

      {/* Warm Floating Studio Dust Motes & Overhead Lantern Glow */}
      <StudioDustMotes 
        count={28} 
        lanternGlow={activeMoodDef.glowColor} 
        className="z-10" 
      />

      {/* Ceiling Vintage Studio Wooden Beam Accent */}
      <div 
        className="absolute top-0 inset-x-0 h-3 z-30 shadow-xl border-b border-[#0f0703]"
        style={{
          background: 'linear-gradient(180deg, #382012 0%, #201107 100%)',
        }}
      />

      {/* ==================================================== */}
      {/* Top Header & Vintage Wooden Studio Tags              */}
      {/* ==================================================== */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-4 pt-5 sm:pt-7 pb-2 flex flex-col items-center">
        {/* Top App / Navigation Bar */}
        <div className="w-full flex items-center justify-between mb-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-cairo text-amber-300/90 hover:text-amber-100 px-3.5 py-1.5 rounded-full bg-[#2a1a11]/80 border border-amber-800/40 shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة للرئيسية</span>
            </button>
          )}

          <div className="flex items-center gap-2 mr-auto">
            <span className="text-xl">🕯️</span>
            <div>
              <h2 className="text-xs sm:text-sm font-bold font-cairo text-amber-200 tracking-wider">
                أتيليه الذكريات • ATELIER AMANI
              </h2>
              <span className="text-[10px] text-amber-400/60 font-amiri block">
                مرسم الفن، إبداعات ريشة أماني، ولوحات الغد
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-cairo text-amber-300/70 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/40">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>{filteredItems.length} لوحة</span>
          </div>
        </div>

        {/* Vintage Carved Wooden Studio Tags (Wings Filter) */}
        <div className="w-full overflow-x-auto no-scrollbar py-2 px-1 flex items-center justify-center gap-2 sm:gap-3">
          {/* Tag: All Artworks */}
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`relative px-4 py-2 rounded-xl text-xs font-cairo transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border shadow-md ${
              activeCategory === 'all'
                ? 'bg-gradient-to-b from-[#4a2e1c] to-[#2b170c] text-amber-100 border-amber-500/80 shadow-[0_4px_15px_rgba(212,175,55,0.25)]'
                : 'bg-[#221309]/80 text-stone-400 border-amber-950/70 hover:text-stone-200'
            }`}
          >
            {/* Wooden Pin Dot */}
            <span className="w-2 h-2 rounded-full bg-amber-300/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]" />
            <span className="font-bold">كافة اللوحات</span>
          </button>

          {/* Tag 1: "أعمالها الفنية" (Her Artworks) */}
          <button
            type="button"
            onClick={() => setActiveCategory('her-art')}
            className={`relative px-4 py-2 rounded-xl text-xs font-cairo transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border shadow-md ${
              activeCategory === 'her-art'
                ? 'bg-gradient-to-b from-[#473315] to-[#2a1d09] text-yellow-100 border-yellow-500/80 shadow-[0_4px_15px_rgba(212,175,55,0.3)]'
                : 'bg-[#221309]/80 text-stone-400 border-amber-950/70 hover:text-stone-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]" />
            <span className="font-bold">{CATEGORY_LABELS['her-art'].titleAr}</span>
            <span className="text-[10px] text-yellow-400/70 hidden xs:inline font-amiri">
              (ريشة أماني)
            </span>
          </button>

          {/* Tag 2: "لوحات الغد" (Our Envisioned Story) */}
          <button
            type="button"
            onClick={() => setActiveCategory('future')}
            className={`relative px-4 py-2 rounded-xl text-xs font-cairo transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border shadow-md ${
              activeCategory === 'future'
                ? 'bg-gradient-to-b from-[#4d2817] to-[#2c1308] text-amber-100 border-orange-500/80 shadow-[0_4px_15px_rgba(224,109,83,0.3)]'
                : 'bg-[#221309]/80 text-stone-400 border-amber-950/70 hover:text-stone-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]" />
            <span className="font-bold">{CATEGORY_LABELS['future'].titleAr}</span>
            <span className="text-[10px] text-amber-400/70 hidden xs:inline font-amiri">
              (قصتنا القادمة)
            </span>
          </button>

          {/* Bridge Tag to Pixel & PUBG Memories World */}
          <button
            type="button"
            onClick={handleNavigateToMemories}
            className="relative px-3.5 py-2 rounded-xl text-xs font-cairo transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border shadow-md bg-[#122827]/80 text-teal-200 border-teal-700/60 hover:bg-[#1a3837] hover:text-teal-100 hover:scale-105"
            title="الانتقال إلى صور ومعارك بوبجي والبكسل آرت"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]" />
            <span className="font-bold">عالم البكسل وبوبجي</span>
            <span className="text-[11px]">🎮</span>
          </button>
        </div>
      </header>

      {/* ==================================================== */}
      {/* 3D Easel Carousel Stage                              */}
      {/* ==================================================== */}
      <main className="relative z-20 flex-1 flex flex-col justify-center my-auto py-2">
        {/* Desktop Carousel Arrow Controls */}
        <div className="hidden sm:flex absolute inset-x-4 top-1/2 -translate-y-1/2 justify-between z-30 pointer-events-none max-w-6xl mx-auto">
          <button
            type="button"
            onClick={() => scrollCarousel('prev')}
            className="w-10 h-10 rounded-full bg-[#2a170d]/80 border border-amber-700/50 text-amber-200 shadow-xl flex items-center justify-center backdrop-blur-md pointer-events-auto hover:bg-[#3d2214] transition-all"
            aria-label="اللوحة السابقة"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel('next')}
            className="w-10 h-10 rounded-full bg-[#2a170d]/80 border border-amber-700/50 text-amber-200 shadow-xl flex items-center justify-center backdrop-blur-md pointer-events-auto hover:bg-[#3d2214] transition-all"
            aria-label="اللوحة التالية"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Carousel Track with Native Scroll-Snap & 3D Perspective */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="w-full flex items-center gap-6 sm:gap-8 px-8 sm:px-16 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-6"
          style={{
            perspective: '1200px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {filteredItems.length === 0 ? (
            <div className="w-full text-center py-16 flex flex-col items-center">
              <Sparkles className="w-8 h-8 text-amber-400/60 mb-2" />
              <p className="text-base font-aref text-amber-200">
                لا توجد لوحات مطابقة لمزاج هذا اللون حالياً
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedMood('all');
                }}
                className="mt-3 text-xs font-cairo px-4 py-1.5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300"
              >
                إعادة ضبط المرسم لكافة الألوان
              </button>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isCentered = index === activeIndex;
              // Smooth 3D tilt perspective based on distance from active center card
              const offset = index - activeIndex;
              const rotateY = Math.max(-14, Math.min(14, offset * 8));

              return (
                <div
                  key={item.id}
                  className="snap-center shrink-0 transition-transform duration-500 ease-out"
                  style={{
                    transform: `perspective(1200px) rotateY(${rotateY}deg) scale(${
                      isCentered ? 1 : 0.94
                    }) translate3d(0,0,0)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <EaselCard
                    item={item}
                    isActive={isCentered}
                    onInspect={(target) => setInspectedItem(target)}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Carousel Dot Indicators */}
        {filteredItems.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {filteredItems.map((item, idx) => (
              <span
                key={item.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(255,215,0,0.6)]'
                    : 'w-1.5 bg-amber-950 border border-amber-800/40'
                }`}
              />
            ))}
          </div>
        )}
      </main>

      {/* ==================================================== */}
      {/* Bottom Dock: The Oil Palette Filter                  */}
      {/* ==================================================== */}
      <footer className="relative z-20 w-full px-4 pb-5 sm:pb-7 pt-2 flex flex-col items-center">
        <PaletteFilter
          selectedMood={selectedMood}
          onSelectMood={(mood) => setSelectedMood(mood)}
        />
      </footer>

      {/* ==================================================== */}
      {/* Fullscreen Canvas Inspection & Zoom Modal           */}
      {/* ==================================================== */}
      <InspectionModal
        item={inspectedItem}
        onClose={() => setInspectedItem(null)}
      />

      {/* Custom Styles for Hidden Scrollbar & Performance */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default AtelierGallery;
