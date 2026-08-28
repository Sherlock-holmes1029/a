import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { getPoemsByWorld } from '@/data/poems';
import { PoemCard } from '@/components/ui/PoemCard';
import { BlackIrisMotif } from '@/components/ui/BlackIrisMotif';
import { BloomingRose } from '@/components/ui/BloomingRose';
import { FallingPetals } from '@/components/effects/FallingPetals';
import { BotanicalFrame } from '@/components/effects/BotanicalFrame';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BlackIrisWorld: React.FC = () => {
  const { returnToHub } = useApp();
  const poems = getPoemsByWorld('black-iris');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#11051c] via-[#1a082b] to-[#0d0317] text-purple-50 px-4 sm:px-8 py-8 flex flex-col"
    >
      {/* Falling Rose/Iris Petals Effect */}
      <FallingPetals count={14} variant="iris" />

      {/* Ambient background glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-1/4 left-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full max-w-3xl mx-auto flex items-center justify-between pb-6 border-b border-purple-800/40">
        <button
          type="button"
          onClick={returnToHub}
          className="flex items-center gap-2 text-xs sm:text-sm font-cairo text-purple-300 hover:text-purple-100 px-4 py-2 rounded-full bg-purple-950/80 border border-purple-700/50 backdrop-blur-md transition-all shadow-md cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى بوابة العوالم</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-cairo text-purple-300/80">
          <BlackIrisMotif size="sm" variant="bookmark" />
          <span>السوسنة السوداء</span>
        </div>
      </header>

      {/* Main Content & Poetry Feed */}
      <main className="relative z-10 w-full max-w-3xl mx-auto my-6 flex flex-col items-center">
        {/* World Header */}
        <div className="text-center my-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-cairo mb-4 shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>جمال الأردن والورد النادر</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <BlackIrisMotif size="md" />
            <h1 className="text-3xl sm:text-5xl font-bold font-aref text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-pink-200 to-amber-200">
              السوسنة السوداء والورود 🖤
            </h1>
            <BlackIrisMotif size="md" />
          </div>

          <p className="text-sm sm:text-base font-amiri text-purple-200/80 max-w-lg mx-auto leading-relaxed mt-3">
            رمز الأصالة والجمال النادر.. حيث تلتقي روائع تميم البرغوثي "في القدس" بفروسية عنترة ونقاء السوسنة البرية.
          </p>

          {/* Animated Botanical Illustration Frame from CodePen 4 */}
          <div className="w-full max-w-md mx-auto my-4 opacity-75">
            <BotanicalFrame />
          </div>
        </div>

        {/* Poems Feed */}
        <div className="w-full space-y-2 mt-2">
          {poems.map((poem, index) => (
            <React.Fragment key={poem.id}>
              <PoemCard
                poem={poem}
                index={index}
                variant="parchment"
              />
              {index === 1 && (
                <BloomingRose label="وردة حب متفتحة بين السطور 🌹" />
              )}
            </React.Fragment>
          ))}
        </div>
      </main>

      {/* Bottom Back Button */}
      <footer className="relative z-10 w-full max-w-3xl mx-auto pt-8 pb-4 text-center">
        <button
          type="button"
          onClick={returnToHub}
          className="inline-flex items-center gap-2 text-xs font-cairo text-purple-300/80 hover:text-purple-100 px-5 py-2.5 rounded-full bg-purple-950/60 border border-purple-800/40 transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>استكشاف العوالم الأخرى</span>
        </button>
      </footer>
    </motion.div>
  );
};
