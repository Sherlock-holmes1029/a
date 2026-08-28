import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Poem } from '@/data/poems';
import { BlackIrisMotif } from '@/components/ui/BlackIrisMotif';
import { ChevronDown, ChevronUp, Feather, Copy, Check, Sparkles } from 'lucide-react';

interface PoemCardProps {
  poem: Poem;
  index: number;
  variant?: 'glass' | 'parchment' | 'sunset' | 'retro';
}

export const PoemCard: React.FC<PoemCardProps> = ({
  poem,
  index,
  variant = 'parchment',
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const [copied, setCopied] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = poem.rawText || `${poem.title}\n${poem.poetAr}\n\n${poem.verses.join('\n')}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Variant-specific styling definitions
  const variantStyles = {
    parchment: {
      card: 'border-2 border-[#bfa175]/60 bg-[#f4ecd8] text-[#3d2110] shadow-2xl shadow-black/60',
      overlay: 'bg-radial from-transparent via-[#d8c39d]/30 to-[#b89c6d]/50',
      badge: 'bg-[#8c2b18] text-amber-100 border-2 border-[#d97706]',
      tagBg: 'bg-[#e8dcbf] text-[#664228] border border-[#bfa175]',
      title: 'text-[#3d2110]',
      verseText: 'text-[#2c1810] hover:text-[#8c2b18]',
      divider: 'border-[#d8c39d]',
      subText: 'text-[#664228]',
      iconBtn: 'bg-[#e8dcbf] text-[#3d2110] border-[#bfa175]',
    },
    glass: {
      card: 'border border-cyan-500/30 bg-[#061822]/80 backdrop-blur-md text-cyan-50 shadow-2xl shadow-cyan-950/60',
      overlay: 'bg-gradient-to-b from-cyan-500/10 via-transparent to-teal-500/10',
      badge: 'bg-cyan-950 text-cyan-300 border-2 border-cyan-400/60',
      tagBg: 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40',
      title: 'text-cyan-100',
      verseText: 'text-cyan-50 hover:text-cyan-300',
      divider: 'border-cyan-800/50',
      subText: 'text-cyan-300/80',
      iconBtn: 'bg-cyan-950/80 text-cyan-200 border-cyan-700/60',
    },
    sunset: {
      card: 'border border-amber-500/40 bg-[#1f1008]/85 backdrop-blur-md text-amber-50 shadow-2xl shadow-black/70',
      overlay: 'bg-gradient-to-b from-amber-500/10 via-transparent to-orange-950/30',
      badge: 'bg-amber-950 text-amber-300 border-2 border-amber-500/60',
      tagBg: 'bg-amber-950/80 text-amber-300 border border-amber-500/40',
      title: 'text-amber-100',
      verseText: 'text-amber-100 hover:text-amber-400',
      divider: 'border-amber-800/40',
      subText: 'text-amber-300/80',
      iconBtn: 'bg-amber-950/80 text-amber-200 border-amber-700/60',
    },
    retro: {
      card: 'border-2 border-amber-400/40 bg-[#16120e]/90 backdrop-blur-md text-stone-100 shadow-2xl shadow-black/80',
      overlay: 'bg-gradient-to-b from-amber-400/5 via-transparent to-stone-900/40',
      badge: 'bg-stone-900 text-amber-400 border-2 border-amber-400/60',
      tagBg: 'bg-stone-900/90 text-amber-300 border border-amber-500/30',
      title: 'text-stone-100',
      verseText: 'text-stone-200 hover:text-amber-300',
      divider: 'border-stone-800',
      subText: 'text-stone-400',
      iconBtn: 'bg-stone-900 text-stone-200 border-stone-700',
    },
  };

  const st = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4) }}
      className="w-full my-5"
    >
      <div className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${st.card}`}>
        {/* Ambient Gradient/Vignette Overlay */}
        <div className={`absolute inset-0 pointer-events-none ${st.overlay}`} />

        {/* Card Header Button */}
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={isExpanded}
          className="relative w-full p-4 sm:p-6 text-right flex items-center justify-between gap-3 cursor-pointer focus:outline-none min-h-[44px]"
        >
          <div className="flex items-center gap-3">
            {/* Wax Seal or Poet Badge */}
            <div className={`w-11 h-11 rounded-full shadow-md flex items-center justify-center text-lg shrink-0 ${st.badge}`}>
              {poem.worldId === 'black-iris' ? (
                <BlackIrisMotif size="sm" variant="bookmark" />
              ) : poem.era === 'classical' ? (
                <span>⚔️</span>
              ) : poem.era === 'modern' ? (
                <span>🪶</span>
              ) : (
                <span>💌</span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                {poem.badge && (
                  <span className="text-[11px] font-bold font-cairo block">
                    {poem.badge}
                  </span>
                )}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-cairo ${st.tagBg}`}>
                  {poem.poetAr}
                </span>
                {poem.category && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-cairo hidden sm:inline ${st.tagBg}`}>
                    {poem.category}
                  </span>
                )}
              </div>
              <h3 className={`text-lg sm:text-2xl font-bold font-aref ${st.title}`}>
                {poem.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-cairo hidden sm:inline ${st.subText}`}>
              {isExpanded ? 'طيّ الأبيات' : 'قراءة القصيدة'}
            </span>
            <div className={`p-1.5 rounded-full border ${st.iconBtn}`}>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>
        </button>

        {/* Expanded Poetry Verses */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className={`relative px-5 sm:px-10 pb-7 pt-2 border-t ${st.divider}`}
            >
              {/* Header Actions */}
              <div className={`flex items-center justify-between mt-2 mb-4 text-xs font-cairo ${st.subText}`}>
                <div className="flex items-center gap-1.5 opacity-90">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${st.tagBg}`}>
                    {poem.poetAr} {poem.era === 'classical' ? '• العصر الجاهلي' : poem.era === 'modern' ? '• أدب حديث' : '• إهداء خاص'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-colors cursor-pointer text-xs ${st.iconBtn}`}
                  title="نسخ الأبيات"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ</span>
                    </>
                  )}
                </button>
              </div>

              {/* Decorative Corner Filigree for Black Iris */}
              {poem.worldId === 'black-iris' && (
                <div className="my-2 opacity-60">
                  <BlackIrisMotif size="sm" variant="border-pair" />
                </div>
              )}

              {/* Calligraphic Content */}
              {poem.type === 'prose' ? (
                <div className={`my-5 space-y-4 font-aref text-lg sm:text-xl leading-relaxed text-justify px-1 sm:px-3 ${st.verseText}`}>
                  {poem.verses.map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-loose indent-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div className={`text-center my-6 space-y-4 font-aref text-lg sm:text-2xl leading-loose tracking-wide ${st.verseText}`}>
                  {poem.verses.map((verse, vIdx) => (
                    <p key={vIdx} className="transition-colors">
                      {verse}
                    </p>
                  ))}
                </div>
              )}

              {/* Footer Note */}
              <div className={`mt-5 pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-amiri ${st.divider} ${st.subText}`}>
                <div className="flex items-center gap-1.5">
                  <Feather className="w-4 h-4 opacity-70" />
                  <span>{poem.subtitle || poem.poetAr}</span>
                </div>
                {poem.note && (
                  <span className="text-[11px] opacity-85 font-cairo flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {poem.note}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
