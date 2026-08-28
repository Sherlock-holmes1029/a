import React from 'react';
import { motion } from 'framer-motion';
import { WORLDS, type WorldDef } from '@/data/config';
import { useApp } from '@/context/AppContext';
import { FloatingFlowers3D } from '@/components/effects/FloatingFlowers3D';
import { Sparkles, ArrowLeft, Heart, RefreshCw } from 'lucide-react';

export const WorldHub: React.FC = () => {
  const { navigateToWorld, resetProgress } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#040e08] via-[#091f13] to-[#040c07] text-emerald-50 px-4 sm:px-8 py-8 flex flex-col justify-between"
    >
      {/* 3D Perspective Floating Flowers Background from CodePen 2 */}
      <FloatingFlowers3D count={40} className="opacity-35" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-20 w-full max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <div>
            <h2 className="text-xs sm:text-sm font-bold font-cairo text-emerald-300 tracking-wider">
              FOR AMANI • لأماني
            </h2>
            <span className="text-[10px] text-emerald-400/70 font-cairo">
              عوالم الشعر والذكريات
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={resetProgress}
          title="قفل العوالم والعودة للبوابة"
          className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-200 px-3 py-1.5 rounded-full bg-stone-900/60 border border-stone-700/50 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline font-cairo">قفل البوابة</span>
        </button>
      </header>

      {/* Main Hub Welcome & World Selection Grid */}
      <main className="relative z-20 w-full max-w-4xl mx-auto my-auto py-8">
        {/* Intro */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-cairo mb-4 shadow-md backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>اخترِ عالمكِ اليوم</span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold font-aref text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-teal-200 to-amber-200 mb-3"
          >
            بوابة العوالم الأربعة 🌿
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base font-amiri text-emerald-200/90 max-w-lg mx-auto leading-relaxed"
          >
            أربعة عوالم منسوجة من أعذب أشعار عنترة بن شداد، درر تميم البرغوثي، وأصدق رسائل الفؤاد. انقري على أي عالم للبدء:
          </motion.p>
        </div>

        {/* 2x2 World Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {WORLDS.map((world: WorldDef, index: number) => (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateToWorld(world.id)}
              className="group relative rounded-3xl overflow-hidden p-6 sm:p-7 bg-[#0b1c12]/80 border-2 border-emerald-500/30 hover:border-emerald-400/70 backdrop-blur-md shadow-2xl shadow-black/50 cursor-pointer transition-all duration-300 text-right flex flex-col justify-between min-h-[170px]"
            >
              {/* Subtle dynamic background gradient on card hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${world.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10 flex items-start justify-between">
                <span className="text-4xl sm:text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                  {world.icon}
                </span>

                <div className="p-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-stone-950 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10 mt-4">
                <span className="text-[11px] font-bold font-cairo text-emerald-400/80 block mb-0.5">
                  {world.nameEn}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-aref text-emerald-100 group-hover:text-amber-200 transition-colors mb-1">
                  {world.nameAr}
                </h3>
                <p className="text-xs font-cairo text-emerald-300/80 leading-relaxed">
                  {world.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full max-w-4xl mx-auto pt-6 text-center text-xs font-cairo text-emerald-400/60 flex items-center justify-center gap-1.5">
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-current opacity-75" />
        <span>صُنعت خصيصاً لأماني — كل عام وأنتِ الأجمل</span>
      </footer>
    </motion.div>
  );
};
