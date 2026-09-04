import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { getPoemsByWorld } from '@/data/poems';
import { PoemCard } from '@/components/ui/PoemCard';
import { WaterfallEnvironment } from '@/components/effects/WaterfallEnvironment';
import { WaterfallCanvas } from '@/components/ui/WaterfallCanvas';
import { WatercolourPlant } from '@/components/effects/WatercolourPlant';
import { ArrowRight, Droplets, Sparkles, Gem, X } from 'lucide-react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

const WISDOM_QUOTES = [
  '«كأن الشلال في انهماره دمع المحبين، ينحدر طوعاً شوقاً وتلهفاً.»',
  '«الماء يعلمنا النقاء، والوفاء يعلمنا البقاء، وأنتِ نبع الصفاء.»',
  '«إذا جرى ماء الوداد في عروق القلب، أزهرت في صحراء الروح بساتين الأماني.»',
  '«كما لا يتوقف هدير الشلال، لا ينقطع دعائي لكِ بالبهجة والسرور.»'
];

export const WaterfallWorld: React.FC = () => {
  const { returnToHub } = useApp();
  const poems = getPoemsByWorld('waterfall');

  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Interactive click ripple effect across the world
  const handleBackgroundClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('.poem-card-interactive')) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple: ClickRipple = { id: Date.now() + Math.random(), x, y };

    setRipples((prev) => [...prev.slice(-8), newRipple]);
  }, []);

  const handleOpenCrystalStone = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % WISDOM_QUOTES.length);
    setShowSecretModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      onClick={handleBackgroundClick}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#021017] via-[#051c24] to-[#010b10] text-cyan-50 px-4 sm:px-8 py-8 flex flex-col justify-between overflow-hidden cursor-default"
    >
      {/* 1. Rich Forest, Cliffs, Mountain & Lake Environment */}
      <WaterfallEnvironment />

      {/* 2. Cascading Waterfall Stream Canvas flowing down the center */}
      <div className="fixed inset-0 pointer-events-none opacity-70 z-0">
        <WaterfallCanvas className="w-full h-full" />
      </div>

      {/* 3. Interactive Click Ripples Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/60 bg-cyan-400/10 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '120px',
              height: '120px',
              boxShadow: '0 0 24px rgba(56, 189, 248, 0.4)',
            }}
          />
        ))}
      </div>

      {/* 4. Top Floating Navigation Bar */}
      <header className="relative z-20 w-full max-w-3xl mx-auto flex items-center justify-between pb-6 border-b border-cyan-800/40">
        <button
          type="button"
          onClick={returnToHub}
          className="flex items-center gap-2 text-xs sm:text-sm font-cairo text-cyan-300 hover:text-cyan-100 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-700/50 backdrop-blur-md transition-all shadow-md cursor-pointer hover:border-cyan-400/60 hover:shadow-cyan-900/30"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى بوابة العوالم</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-cairo text-cyan-300/80 bg-cyan-950/60 px-3 py-1.5 rounded-full border border-cyan-800/40 backdrop-blur-sm">
          <Droplets className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>عالم الشلالات والوجد</span>
        </div>
      </header>

      {/* 5. Main Content & Poetry Feed */}
      <main className="relative z-10 w-full max-w-3xl mx-auto my-6 flex flex-col items-center">
        {/* World Header */}
        <div className="text-center my-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-cairo mb-4 shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            <span>جريان الحنين وسكون الروح</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
            <h1 className="text-3xl sm:text-5xl pb-3 font-bold font-aref text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-sky-200 to-teal-200">
              عالم الشلال والوجد 💧
            </h1>
            <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
          </div>

          <p className="text-sm sm:text-base font-amiri text-cyan-200/80 max-w-lg mx-auto leading-relaxed mt-3">
            هدير الشلالات العذبة وصدى المشاعر العميقة.. حيث تلتقي فصاحة عنترة وبلاغة تميم البرغوثي في حبٍ يفيض كنبعٍ لا ينضب.
          </p>

          {/* Interactive Crystal Wish Stone */}
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={handleOpenCrystalStone}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-900/60 to-teal-900/60 hover:from-cyan-800/80 hover:to-teal-800/80 border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 text-xs font-cairo transition-all duration-300 shadow-lg shadow-cyan-950/40 hover:scale-105 cursor-pointer backdrop-blur-sm"
            >
              <Gem className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform duration-300" />
              <span>المس حجر الوجد البلوري 💎</span>
            </button>
          </div>

          {/* Animated Botanical Watercolor Plant */}
          <div className="w-full max-w-lg mx-auto my-4 opacity-95 hover:opacity-100 transition-opacity">
            <WatercolourPlant sizeClassName="max-w-[340px] sm:max-w-[420px]" />
          </div>
        </div>

        {/* Poems Feed */}
        <div className="w-full space-y-3 mt-2 poem-card-interactive">
          {poems.map((poem, index) => (
            <PoemCard
              key={poem.id}
              poem={poem}
              index={index}
              variant="glass"
            />
          ))}
        </div>
      </main>

      {/* 6. Crystal Wish Stone Modal Dialog */}
      <AnimatePresence>
        {showSecretModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#061e29] to-[#031117] border border-cyan-500/50 rounded-2xl p-6 text-center shadow-2xl shadow-cyan-900/40 text-cyan-50"
            >
              <button
                type="button"
                onClick={() => setShowSecretModal(false)}
                className="absolute top-4 left-4 text-cyan-400 hover:text-cyan-200 p-1.5 rounded-full hover:bg-cyan-950/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Gem className="w-7 h-7 text-cyan-300 animate-pulse" />
              </div>

              <h3 className="text-xl font-bold font-aref text-cyan-100 mb-2">
                حجر الوجد والصفاء
              </h3>

              <div className="my-6 p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40">
                <p className="font-amiri text-lg sm:text-xl text-cyan-100 leading-relaxed">
                  {WISDOM_QUOTES[currentQuoteIndex]}
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentQuoteIndex((prev) => (prev + 1) % WISDOM_QUOTES.length)}
                  className="px-4 py-2 rounded-xl bg-cyan-900/60 hover:bg-cyan-800/80 border border-cyan-700/60 text-xs font-cairo text-cyan-200 transition-colors cursor-pointer"
                >
                  حكمة أخرى 🔄
                </button>
                <button
                  type="button"
                  onClick={() => setShowSecretModal(false)}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-cairo font-bold transition-colors cursor-pointer"
                >
                  إغلاق ✨
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Bottom Navigation Button */}
      <footer className="relative z-10 w-full max-w-3xl mx-auto pt-8 pb-4 text-center">
        <button
          type="button"
          onClick={returnToHub}
          className="inline-flex items-center gap-2 text-xs font-cairo text-cyan-300/80 hover:text-cyan-100 px-5 py-2.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 hover:border-cyan-600/60 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>استكشاف العوالم الأخرى</span>
        </button>
      </footer>
    </motion.div>
  );
};
