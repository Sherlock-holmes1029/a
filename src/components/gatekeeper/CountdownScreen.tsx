import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { DEV_BYPASS_COUNTDOWN } from '@/data/config';
import { FallingPetals } from '@/components/effects/FallingPetals';
import { BloomingFlower } from '@/components/effects/BloomingFlower';
import { Sparkles, Heart, Clock, ArrowLeft, Wrench } from 'lucide-react';

export const CountdownScreen: React.FC = () => {
  const { countdown, advanceToLogin } = useApp();

  const timeUnits = [
    { label: 'أيام', value: countdown.days },
    { label: 'ساعات', value: countdown.hours },
    { label: 'دقائق', value: countdown.minutes },
    { label: 'ثواني', value: countdown.seconds },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7 }}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#030d07] via-[#081f14] to-[#04120a] overflow-hidden flex flex-col justify-between items-center py-8 px-4 sm:px-8 text-center select-none"
    >
      {/* Floating Petals Effect */}
      <FallingPetals count={16} variant="rose" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header */}
      <header className="relative z-20 w-full max-w-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="text-xs sm:text-sm font-bold font-cairo text-emerald-300 tracking-wider">
            FOR AMANI • لأماني
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-rose-300/80 font-cairo px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-current animate-pulse" />
          <span>2 أكتوبر</span>
        </div>
      </header>

      {/* 2. Main Countdown Card */}
      <main className="relative z-20 max-w-lg mx-auto my-auto py-8 flex flex-col items-center">
        {/* Ambient blooming geometric flower from CodePen 1 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30 z-0">
          <BloomingFlower size={380} palette="rose" animationSpeed={100} delayMs={400} />
        </div>

        {/* Poetic Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-cairo mb-6 shadow-lg backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>العد التنازلي ليومكِ المميز</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl sm:text-5xl font-bold font-aref text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-rose-200 to-amber-200 mb-3 tracking-wide drop-shadow-md"
        >
          كل عام وأنتِ النور 🌿
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-sm sm:text-base font-amiri text-emerald-200/90 max-w-sm leading-relaxed mb-8"
        >
          نترقّب الثاني من أكتوبر لنفتح لكِ أبواب عوالم الشعر والذكريات المنسوجة بحب.
        </motion.p>

        {/* 4 Countdown Digits Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-md my-2">
          {timeUnits.map((unit, idx) => (
            <motion.div
              key={unit.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 backdrop-blur-md shadow-xl shadow-black/40"
            >
              <span className="text-2xl sm:text-4xl font-bold font-cairo text-amber-200 tabular-nums drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-cairo text-emerald-300/80 mt-1 font-semibold">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Advance / Unlock Button — Only visible when countdown finishes or during DEV bypass */}
        {(countdown.isExpired || DEV_BYPASS_COUNTDOWN) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            {countdown.isExpired ? (
              <button
                type="button"
                onClick={advanceToLogin}
                className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-bold font-cairo text-sm shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2 cursor-pointer focus:outline-none min-h-[44px] animate-pulse"
              >
                <span>حان الوقت! الدخول إلى بوابة العوالم</span>
                <ArrowLeft className="w-4 h-4 text-stone-950 group-hover:-translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={advanceToLogin}
                  className="group px-5 py-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-emerald-500/40 text-emerald-300 hover:text-emerald-100 font-bold font-cairo text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer focus:outline-none min-h-[40px] backdrop-blur-md"
                >
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>وضع المطور: فتح البوابة للمعاينة</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
                </button>
                <span className="text-[10px] text-stone-400/80 font-cairo">
                  (مفعل عبر DEV_BYPASS_COUNTDOWN في config.ts)
                </span>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="relative z-20 flex items-center gap-2 pb-4 text-xs font-cairo text-emerald-400/70">
        <Clock className="w-3.5 h-3.5 text-amber-400" />
        <span>بانتظار لحظة الاكتمال...</span>
      </footer>
    </motion.section>
  );
};
