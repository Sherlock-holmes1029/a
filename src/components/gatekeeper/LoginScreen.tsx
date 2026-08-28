import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { PASSWORD } from '@/data/config';
import { FallingPetals } from '@/components/effects/FallingPetals';
import { BloomingFlower } from '@/components/effects/BloomingFlower';
import { BloomingRose } from '@/components/ui/BloomingRose';
import { Heart, Lock, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { unlock } = useApp();
  const [inputPassword, setInputPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = inputPassword.trim();
    const expectedPassword = PASSWORD.trim();

    // Verification check: match exact string (including emojis if present)
    if (trimmedInput === expectedPassword || (expectedPassword === 'YOUR_PASSWORD_HERE' && trimmedInput.length > 0)) {
      setIsSuccess(true);
      setHasError(false);
      setTimeout(() => {
        unlock();
      }, 1200);
    } else {
      setHasError(true);
      setErrorMessage('الاسم غير متطابق تماماً.. تأكدي من الحروف والرموز التعبيرية 💕');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7 }}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#0f040d] via-[#1a0815] to-[#0a0208] overflow-hidden flex flex-col justify-between items-center py-8 px-4 sm:px-8 text-center select-none"
    >
      {/* Floating Petals */}
      <FallingPetals count={14} variant="rose" />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 w-full max-w-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="text-xs sm:text-sm font-bold font-cairo text-rose-300 tracking-wider">
            FOR AMANI • لأماني
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-amber-300/80 font-cairo px-3 py-1 rounded-full bg-stone-900/60 border border-amber-500/30">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>بوابة الدخول</span>
        </div>
      </header>

      {/* Main Glass Card */}
      <main className="relative z-20 w-full max-w-md mx-auto my-auto py-6 flex flex-col items-center">
        <motion.div
          animate={hasError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="relative w-full rounded-3xl overflow-hidden bg-[#1f0916]/80 border-2 border-rose-500/30 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-rose-950/60 text-right"
        >
          {/* Top Heart Badge */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-rose-950/80 border-2 border-rose-500/50 shadow-inner flex items-center justify-center text-rose-300 text-2xl">
              {isSuccess ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
              ) : (
                <Heart className="w-7 h-7 text-rose-400 fill-current animate-pulse" />
              )}
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-aref text-rose-100 text-center mb-2">
            مرحباً يا روح الفؤاد 🌸
          </h2>

          <p className="text-sm font-amiri text-rose-200/80 text-center mb-6 leading-relaxed">
            للعبور إلى عوالم الشعر والذكريات، أجيبي عن السؤال السري:
          </p>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-4"
            >
              <div className="relative my-2">
                <BloomingFlower size={160} speedMs={1400} />
              </div>
              <BloomingRose label="أهلاً بكِ في عوالمكِ الخاصة 🌿" />
              <span className="text-xs font-bold font-cairo text-emerald-300 mt-2">
                جارٍ فتح العوالم...
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password-input"
                  className="block text-xs font-bold font-cairo text-rose-300 mb-2 flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>ما هو اسمي عندكِ على إنستغرام؟ 💕</span>
                </label>

                <input
                  id="password-input"
                  type="text"
                  dir="rtl"
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    if (hasError) setHasError(false);
                  }}
                  placeholder="اكتبي الاسم مع الرموز التعبيرية..."
                  className={`w-full px-4 py-3.5 rounded-2xl bg-[#0f040d]/90 border text-rose-100 placeholder-rose-400/40 text-sm sm:text-base font-cairo focus:outline-none transition-all ${
                    hasError
                      ? 'border-rose-500 ring-2 ring-rose-500/40'
                      : 'border-rose-500/40 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/30'
                  }`}
                  autoFocus
                />
              </div>

              {hasError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-cairo text-rose-400 text-center leading-relaxed"
                >
                  {errorMessage}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold font-cairo text-sm sm:text-base shadow-lg shadow-rose-900/50 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>فتح العوالم</span>
              </button>
            </form>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 flex items-center gap-2 pb-4 text-xs font-cairo text-rose-400/60">
        <span>مُهداة بكل نبضة حب</span>
      </footer>
    </motion.section>
  );
};
