import React from 'react';
import { motion } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';
import { useSectionSound } from '@/hooks/useSectionSound';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { Sparkles, ChevronDown } from 'lucide-react';

export const LandingSection: React.FC = () => {
  const [sectionRef, isInView] = useInViewport<HTMLElement>({ threshold: 0.2 });
  useSectionSound('landing', isInView);

  const handleScrollToJungle = () => {
    const jungle = document.getElementById('jungle');
    if (jungle) {
      jungle.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="landing"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#030d07] via-[#061a10] to-[#04120a] overflow-hidden flex flex-col justify-between items-center py-8 px-4 sm:px-8 text-center"
    >
      {/* 1. Floating Top Navigation Bar */}
      <header className="relative z-30 w-full max-w-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌸</span>
          <span className="text-xs sm:text-sm font-bold font-reem text-emerald-300 tracking-wider">
            FOR AMANI • لأماني
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <SoundToggle />
        </div>
      </header>

      {/* 2. Soft Ambient Background Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* 3. Main Center Title Card */}
      <main className="relative z-20 max-w-xl mx-auto my-auto py-10 flex flex-col items-center">
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-cairo mb-6 shadow-lg shadow-emerald-950/50 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
          <span>رحلة استكشافية خاصة بمناسبة عيد الميلاد</span>
        </motion.div>

        {/* Hero Recipient Name in Reem Kufi Font */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold font-reem text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-teal-200 to-amber-200 mb-4 tracking-wide drop-shadow-lg"
        >
          لأماني الغالية 🌿
        </motion.h1>

        {/* Heartfelt Poetic Opening */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-base sm:text-lg font-mada text-emerald-200/90 max-w-md leading-relaxed mb-8"
        >
          رحلة عبر خمسة عوالم سحرية نسجت من أروع الذكريات والقصائد والأسرار المخبأة خصيصاً لكِ.
        </motion.p>

        {/* Action Button */}
        <motion.button
          type="button"
          onClick={handleScrollToJungle}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-stone-950 font-bold font-cairo text-sm sm:text-base shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2 cursor-pointer focus:outline-none min-h-[44px]"
        >
          <span>ابدأي الرحلة</span>
          <ChevronDown className="w-4 h-4 text-stone-950 animate-bounce" />
        </motion.button>
      </main>

      {/* 4. Bottom Scroll Prompt & Orbiting Firefly */}
      <footer className="relative z-20 flex flex-col items-center gap-2 pb-4">
        {/* Animated Firefly Dot */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-ping" />
          <span className="absolute w-2 h-2 rounded-full bg-emerald-300" />
        </div>

        <span className="text-xs font-cairo text-emerald-400/80 tracking-wider">
          مرّري للأسفل لاستكشاف العوالم
        </span>
      </footer>
    </section>
  );
};
