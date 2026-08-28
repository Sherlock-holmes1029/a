import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { getPoemsByWorld } from '@/data/poems';
import { PoemCard } from '@/components/ui/PoemCard';
import { WaterfallCanvas } from '@/components/ui/WaterfallCanvas';
import { WatercolourPlant } from '@/components/effects/WatercolourPlant';
import { ArrowRight, Sparkles, Droplets } from 'lucide-react';

export const WaterfallWorld: React.FC = () => {
  const { returnToHub } = useApp();
  const poems = getPoemsByWorld('waterfall');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#03131c] via-[#052230] to-[#021017] text-cyan-50 px-4 sm:px-8 py-8 flex flex-col"
    >
      {/* Background Animated Waterfall (30fps capped Canvas) */}
      <div className="fixed inset-0 pointer-events-none opacity-45 z-0">
        <WaterfallCanvas className="w-full h-full" />
      </div>

      {/* Floating Misty Glows */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Top Floating Navigation Bar */}
      <header className="relative z-20 w-full max-w-3xl mx-auto flex items-center justify-between pb-6 border-b border-cyan-800/40">
        <button
          type="button"
          onClick={returnToHub}
          className="flex items-center gap-2 text-xs sm:text-sm font-cairo text-cyan-300 hover:text-cyan-100 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-700/50 backdrop-blur-md transition-all shadow-md cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى بوابة العوالم</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-cairo text-cyan-300/80">
          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
          <span>عالم الشلالات</span>
        </div>
      </header>

      {/* Main Content & Poetry Feed */}
      <main className="relative z-10 w-full max-w-3xl mx-auto my-6 flex flex-col items-center">
        {/* World Header */}
        <div className="text-center my-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-cairo mb-4 shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>شلالات الشوق والوجد</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-aref text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-sky-200 to-teal-200 mb-3">
            عالم الشلالات 💧
          </h1>

          <p className="text-sm sm:text-base font-amiri text-cyan-200/80 max-w-lg mx-auto leading-relaxed">
            حيث تتدفق المشاعر عذبة رقراقة كشلال ماء لا ينضب، ممتزجة بأعذب أبيات عنترة وتميم ورسائل القلب.
          </p>
        </div>

        {/* Poems Feed */}
        <div className="w-full space-y-2 mt-4">
          {poems.map((poem, index) => (
            <PoemCard
              key={poem.id}
              poem={poem}
              index={index}
              variant="glass"
            />
          ))}
        </div>

        {/* Hand-drawn Watercolour Botanical Illustration from CodePen 5 */}
        <div className="my-8 opacity-70">
          <WatercolourPlant />
        </div>
      </main>

      {/* Bottom Back Button */}
      <footer className="relative z-10 w-full max-w-3xl mx-auto pt-8 pb-4 text-center">
        <button
          type="button"
          onClick={returnToHub}
          className="inline-flex items-center gap-2 text-xs font-cairo text-cyan-300/80 hover:text-cyan-100 px-5 py-2.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>استكشاف العوالم الأخرى</span>
        </button>
      </footer>
    </motion.div>
  );
};
