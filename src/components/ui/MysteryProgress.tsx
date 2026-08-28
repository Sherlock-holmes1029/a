import React from 'react';
import { useMysteries } from '@/context/MysteriesContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Compass, RotateCcw } from 'lucide-react';

export const MysteryProgress: React.FC = () => {
  const {
    mysteries,
    foundCount,
    totalCount,
    allFound,
    isFound,
    recentFound,
    dismissRecentFound,
    isModalOpen,
    setIsModalOpen,
    resetProgress,
  } = useMysteries();

  const progressPercent = Math.round((foundCount / totalCount) * 100);

  return (
    <>
      {/* Compact Floating Pill — Minimal 🔮 X/6 badge */}
      <div className="fixed bottom-4 left-4 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
          aria-label="عرض أسرار الرحلة"
          title={`الأسرار المكتشفة: ${foundCount} من ${totalCount}`}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-stone-900/90 border border-amber-400/50 text-amber-200 backdrop-blur-md shadow-2xl shadow-stone-950/80 hover:bg-stone-850 hover:border-amber-300 transition-all min-h-[44px] min-w-[44px]"
        >
          <span className="text-base leading-none">🔮</span>
          <span className="text-xs font-bold font-cairo text-amber-300">
            {foundCount}/{totalCount}
          </span>
          {allFound && (
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping -mr-0.5" />
          )}
        </motion.button>
      </div>

      {/* Discovery Celebration Toast Banner */}
      <AnimatePresence>
        {recentFound && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-sm"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/95 via-stone-900/95 to-amber-950/95 border-2 border-amber-400/60 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl text-center relative">
              <button
                onClick={dismissRecentFound}
                aria-label="إغلاق التنبيه"
                className="absolute top-2 left-2 p-1 text-stone-400 hover:text-white rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-3xl mb-1">{recentFound.icon}</div>
              <h4 className="font-cairo font-bold text-amber-300 text-sm mb-1">
                {recentFound.foundMessage}
              </h4>
              <p className="text-xs text-stone-300 font-mada">
                قسم: {recentFound.sectionNameAr} ({foundCount}/{totalCount})
              </p>

              {allFound && (
                <div className="mt-2 pt-2 border-t border-amber-500/30 text-xs font-bold text-emerald-300 animate-pulse">
                  🎉 اكتملت كل الأسرار! تم فتح المفاجأة في نهاية الصفحة!
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Modal Map of Mysteries */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-stone-950 border border-amber-500/40 rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto text-stone-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold font-cairo text-amber-300">
                    أسرار الرحلة المخبأة
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="إغلاق النافذة"
                  className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Summary */}
              <div className="my-4 p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
                <div className="flex justify-between text-xs font-cairo mb-2">
                  <span className="text-stone-300">نسبة الاكتشاف</span>
                  <span className="font-bold text-amber-400">
                    {foundCount} من {totalCount} أسرار ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-teal-300 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-400 font-mada mt-2">
                  {allFound
                    ? '✨ أحسنتِ! تم فتح رسالة الفيديو الخاصة في قسم الختام أسفل الصفحة.'
                    : '💡 ابحثي عن رموز ووميض صغير قابل للنقر في كل عالم أثناء التمرير.'}
                </p>
              </div>

              {/* List of Mysteries */}
              <div className="space-y-3 my-4">
                {mysteries.map((m) => {
                  const found = isFound(m.id);
                  return (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        found
                          ? 'bg-amber-950/25 border-amber-500/40 text-amber-100'
                          : 'bg-stone-900/50 border-stone-800 text-stone-400'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl mt-0.5">{found ? m.icon : '❓'}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4
                              className={`font-cairo text-sm font-bold ${
                                found ? 'text-amber-300' : 'text-stone-300'
                              }`}
                            >
                              {found ? m.nameAr : 'سر مخبأ'}
                            </h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-stone-300 font-cairo">
                              {m.sectionNameAr}
                            </span>
                          </div>
                          <p className="text-xs font-mada mt-1 leading-relaxed text-stone-400">
                            {found ? m.foundMessage : m.hint}
                          </p>
                        </div>
                        {found && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                <button
                  onClick={resetProgress}
                  className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-rose-400 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  إعادة ضبط
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-cairo transition-colors"
                >
                  متابعة الرحلة
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
