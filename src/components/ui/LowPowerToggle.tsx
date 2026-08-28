import React from 'react';
import { usePerformance } from '@/context/PerformanceContext';
import { Sparkles, ZapOff } from 'lucide-react';
import { motion } from 'framer-motion';

export const LowPowerToggle: React.FC = () => {
  const { isLowPowerMode, prefersReducedMotion, toggleLowPowerMode } = usePerformance();

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleLowPowerMode}
      aria-label={isLowPowerMode ? 'تعطيل وضع توفير الأداء' : 'تفعيل وضع توفير الأداء للأجهزة المتوسطة'}
      title={
        isLowPowerMode
          ? 'وضع الأداء الخفيف مفعّل (يوفر بطارية الهاتف ويخفف الحركة)'
          : 'تفعيل نمط الأداء الخفيف إذا كان الجهاز بطيئاً'
      }
      className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full border backdrop-blur-md shadow-lg transition-all focus:outline-none focus:ring-2 min-w-[44px] min-h-[44px] justify-center ${
        isLowPowerMode
          ? 'bg-amber-950/80 border-amber-500/50 text-amber-200 focus:ring-amber-400'
          : 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300/80 hover:bg-emerald-900/80 focus:ring-emerald-400'
      }`}
    >
      {isLowPowerMode || prefersReducedMotion ? (
        <>
          <ZapOff className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-cairo hidden sm:inline text-amber-200">وضع التوفير</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span className="text-xs font-cairo hidden sm:inline text-emerald-300/80">أداء كامل</span>
        </>
      )}
    </motion.button>
  );
};
