import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { getPoemsByWorld } from '@/data/poems';
import { PoemCard } from '@/components/ui/PoemCard';
import { CSSWaves } from '@/components/effects/CSSWaves';
import { ArrowRight, Sun, Waves } from 'lucide-react';

export const BeachWorld: React.FC = () => {
  const { returnToHub } = useApp();
  const poems = getPoemsByWorld('beach');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#1f0b04] via-[#1a0f18] to-[#04121d] text-amber-50 px-4 sm:px-8 py-8 flex flex-col justify-between"
    >
      {/* Ambient Sunset Glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-1/3 left-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full max-w-3xl mx-auto flex items-center justify-between pb-6 border-b border-amber-800/40">
        <button
          type="button"
          onClick={returnToHub}
          className="flex items-center gap-2 text-xs sm:text-sm font-cairo text-amber-300 hover:text-amber-100 px-4 py-2 rounded-full bg-amber-950/80 border border-amber-700/50 backdrop-blur-md transition-all shadow-md cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى بوابة العوالم</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-cairo text-amber-300/80">
          <Waves className="w-3.5 h-3.5 text-amber-400" />
          <span>عالم الشاطئ</span>
        </div>
      </header>

      {/* Main Content & Poetry Feed */}
      <main className="relative z-10 w-full max-w-3xl mx-auto my-6 flex flex-col items-center">
        {/* World Header */}
        <div className="text-center my-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-cairo mb-4 shadow-md backdrop-blur-md">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>غروب الشاطئ وسكون الأمواج</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-aref text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-orange-200 to-sky-200 mb-3">
            عالم الشاطئ الجميل 🌊
          </h1>

          <p className="text-sm sm:text-base font-amiri text-amber-200/80 max-w-lg mx-auto leading-relaxed">
            نسيم البحر الهادئ ومناجاة الأفق.. حيث تلتقي أمواج الشوق بقصائد عنترة وتميم "سائل الأمواجا" ورسائل العهد الصادق.
          </p>
        </div>

        {/* Poems Feed */}
        <div className="w-full space-y-2 mt-4">
          {poems.map((poem, index) => (
            <PoemCard
              key={poem.id}
              poem={poem}
              index={index}
              variant="sunset"
            />
          ))}
        </div>
      </main>

      {/* Decorative Wave Footer */}
      <div className="relative z-10 w-full max-w-3xl mx-auto mt-6">
        <CSSWaves />
      </div>

      {/* Bottom Back Button */}
      <footer className="relative z-20 w-full max-w-3xl mx-auto pt-4 pb-4 text-center">
        <button
          type="button"
          onClick={returnToHub}
          className="inline-flex items-center gap-2 text-xs font-cairo text-amber-300/80 hover:text-amber-100 px-5 py-2.5 rounded-full bg-amber-950/70 border border-amber-800/40 transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>استكشاف العوالم الأخرى</span>
        </button>
      </footer>
    </motion.div>
  );
};
