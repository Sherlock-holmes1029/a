import React from 'react';
import { motion } from 'framer-motion';

export type TransitionType =
  | 'landing-jungle'
  | 'jungle-desert'
  | 'desert-beach'
  | 'beach-mountain'
  | 'mountain-timeline'
  | 'timeline-closing';

interface SectionFooterProps {
  transition: TransitionType;
}

export const SectionFooter: React.FC<SectionFooterProps> = ({ transition }) => {
  switch (transition) {
    case 'landing-jungle':
      return (
        <div className="relative w-full py-10 bg-gradient-to-b from-[#04120a] to-[#04120a] flex flex-col items-center justify-center overflow-hidden border-y border-emerald-900/30 select-none">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-emerald-500/50" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs font-mada text-emerald-300/80 bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-500/30"
            >
              <span>🌿</span>
              <span>أهلاً بكِ في واحة الغابة المسحورة</span>
              <span>🍃</span>
            </motion.div>
            <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-emerald-500/50" />
          </div>
        </div>
      );

    case 'jungle-desert':
      return (
        <div className="relative w-full py-10 bg-gradient-to-b from-[#0a180e] via-[#110e08] to-[#120a05] flex flex-col items-center justify-center overflow-hidden border-y border-amber-900/30 select-none">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-amber-500/40" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs font-mada text-amber-200/80 bg-amber-950/60 px-4 py-1.5 rounded-full border border-amber-500/30"
            >
              <span>🌴</span>
              <span>والطريق يمتد نحو رمال البتراء ووادي رم</span>
              <span>🏜️</span>
            </motion.div>
            <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-amber-500/40" />
          </div>
        </div>
      );

    case 'desert-beach':
      return (
        <div className="relative w-full py-10 bg-gradient-to-b from-[#1a0c06] via-[#0b171c] to-[#031926] flex flex-col items-center justify-center overflow-hidden border-y border-sky-900/30 select-none">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-sky-500/40" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs font-mada text-sky-200/80 bg-sky-950/60 px-4 py-1.5 rounded-full border border-sky-500/30"
            >
              <span>🏜️</span>
              <span>تنحسر الرمال ليحتضنكِ سكون البحر الهادئ</span>
              <span>🌊</span>
            </motion.div>
            <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-sky-500/40" />
          </div>
        </div>
      );

    case 'beach-mountain':
      return (
        <div className="relative w-full py-10 bg-gradient-to-b from-[#021824] via-[#09101c] to-[#0b0f19] flex flex-col items-center justify-center overflow-hidden border-y border-indigo-900/30 select-none">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-indigo-500/40" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs font-mada text-indigo-200/80 bg-slate-900/60 px-4 py-1.5 rounded-full border border-indigo-500/30"
            >
              <span>🌊</span>
              <span>من ضفاف الشاطئ نحو قمم الجبال والنجوم</span>
              <span>🚗</span>
            </motion.div>
            <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-indigo-500/40" />
          </div>
        </div>
      );

    case 'mountain-timeline':
      return (
        <div className="relative w-full py-10 bg-gradient-to-b from-[#080d17] via-[#081313] to-[#09180f] flex flex-col items-center justify-center overflow-hidden border-y border-emerald-900/30 select-none">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-emerald-500/40" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs font-mada text-emerald-200/80 bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-500/30"
            >
              <span>🚗</span>
              <span>وكل خطوة على الطريق أصبحت ذكرى تزهو</span>
              <span>🌱</span>
            </motion.div>
            <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-emerald-500/40" />
          </div>
        </div>
      );

    case 'timeline-closing':
      return (
        <div className="relative w-full py-10 bg-gradient-to-b from-[#04120a] to-[#04120a] flex flex-col items-center justify-center overflow-hidden border-y border-amber-900/30 select-none">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-amber-500/50" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs font-mada text-amber-200/80 bg-stone-900/80 px-4 py-1.5 rounded-full border border-amber-400/40"
            >
              <span>✨</span>
              <span>محطة الختام وأجمل أمنيات العيد</span>
              <span>🎂</span>
            </motion.div>
            <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
        </div>
      );

    default:
      return null;
  }
};
