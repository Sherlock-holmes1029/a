import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMysteries } from '@/context/MysteriesContext';
import { useSound } from '@/context/SoundContext';
import { Play, Lock, Gift, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SecretReveal: React.FC = () => {
  const { allFound, foundCount, totalCount, setIsModalOpen } = useMysteries();
  const [isPlaying, setIsPlaying] = useState(false);
  const { playTap } = useSound();

  const handlePlayVideo = () => {
    setIsPlaying(true);
    playTap();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#34d399', '#f43f5e', '#38bdf8'],
      });
    } catch {
      // safe fallback
    }
  };

  if (!allFound) {
    return (
      <div className="relative w-full p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-amber-500/30 text-center backdrop-blur-md">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-3 text-amber-400">
          <Lock className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold font-cairo text-amber-200 mb-1">
          مفاجأة الفيديو الخاصة (مقفلة)
        </h3>

        <p className="text-xs font-mada text-stone-300 max-w-sm mx-auto leading-relaxed mb-4">
          اجمعي كل أسرار الرحلة الـ {totalCount} من الغابة والصحراء والبحر والجبال لفتح رسالة الفيديو السرية!
        </p>

        <div className="flex items-center justify-center gap-3">
          <span className="text-xs font-cairo text-amber-400 font-bold">
            تم إيجاد {foundCount} من {totalCount} أسرار
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-xs font-cairo text-amber-200 transition-colors"
          >
            خريطة الأسرار 🧭
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="relative w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-950/60 via-stone-900/80 to-emerald-950/60 border-2 border-amber-400/70 shadow-[0_0_40px_rgba(251,191,36,0.3)] text-center backdrop-blur-md"
    >
      {/* Celebration Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-stone-950 text-xs font-bold font-cairo mb-3 shadow-lg">
        <Gift className="w-4 h-4" />
        <span>🎉 تم فتح الهدية السرية بنجاح!</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold font-lemonada text-amber-200 mb-2">
        رسالة فيديو خاصة لأماني 🎬
      </h3>

      <p className="text-xs sm:text-sm font-mada text-stone-200 max-w-sm mx-auto mb-5 leading-relaxed">
        لأنكِ شخص مميز وتستحقين كل الفرح، هذه رسالة مصورة مليئة بالحب والأمنيات الصادقة.
      </p>

      {/* Video Container / Player Slot */}
      <div className="relative w-full aspect-video max-w-md mx-auto rounded-2xl overflow-hidden bg-stone-950 border border-amber-400/40 shadow-inner flex flex-col items-center justify-center p-4">
        {isPlaying ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <span className="text-4xl mb-2 animate-bounce">🎂✨</span>
            <h4 className="text-base font-bold font-cairo text-amber-300 mb-1">
              "كل عام وأنتِ الخير لكل من حولكِ"
            </h4>
            <p className="text-xs font-mada text-stone-300 max-w-xs leading-relaxed">
              [مكان مخصص لتشغيل مقطع الفيديو الشخصي — اسحبي ملف mystery-unlock.mp4 إلى مجلد public/videos]
            </p>
          </div>
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-950 via-amber-950/40 to-stone-900 opacity-80" />
            
            <motion.button
              type="button"
              onClick={handlePlayVideo}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="تشغيل رسالة الفيديو الخاصة"
              className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-950 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.8)] cursor-pointer focus:outline-none min-w-[44px] min-h-[44px]"
            >
              <Play className="w-7 h-7 fill-current ml-0.5" />
            </motion.button>

            <span className="relative z-10 text-xs font-cairo text-amber-200 mt-3 font-bold">
              انقري لتشغيل الرسالة المصورة
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-rose-300 font-cairo">
        <Heart className="w-4 h-4 text-rose-400 fill-current" />
        <span>هدية بمناسبة عيد الميلاد</span>
      </div>
    </motion.div>
  );
};
