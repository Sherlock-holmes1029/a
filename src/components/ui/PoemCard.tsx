import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Poem } from '@/data/poems';
import { BlackIrisMotif } from '@/components/ui/BlackIrisMotif';
import { useSound } from '@/context/SoundContext';
import { ChevronDown, ChevronUp, Feather, Copy, Check } from 'lucide-react';

interface PoemCardProps {
  poem: Poem;
  index: number;
}

export const PoemCard: React.FC<PoemCardProps> = ({ poem, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const [copied, setCopied] = useState(false);
  const { playTap } = useSound();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    playTap();
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = poem.rawText || poem.verses.join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    playTap();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="w-full my-5"
    >
      {/* Ancient Weathered Parchment Card Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border-2 border-[#bfa175]/60 bg-[#f4ecd8] text-[#3d2110] transition-all duration-300">
        {/* Parchment Aged Vignette & Grain Overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#d8c39d]/30 to-[#b89c6d]/50 pointer-events-none" />

        {/* Card Header */}
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={isExpanded}
          className="relative w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 cursor-pointer focus:outline-none min-h-[44px]"
        >
          <div className="flex items-center gap-3">
            {/* Wax Seal Badge */}
            <div className="w-11 h-11 rounded-full bg-[#8c2b18] border-2 border-[#d97706] shadow-md flex items-center justify-center text-amber-100 text-lg shrink-0">
              {poem.theme === 'black-iris' ? (
                <BlackIrisMotif size="sm" variant="bookmark" />
              ) : poem.type === 'prose' ? (
                <span>🪶</span>
              ) : (
                <span>📜</span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold font-cairo text-[#8c2b18] block">
                  {poem.badge}
                </span>
                {poem.category && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e8dcbf] text-[#664228] font-cairo">
                    {poem.category}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-aref text-[#3d2110]">
                {poem.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-cairo text-[#664228] hidden sm:inline">
              {isExpanded ? 'طيّ المخطوطة' : 'قراءة النص'}
            </span>
            <div className="p-1.5 rounded-full bg-[#e8dcbf] border border-[#bfa175] text-[#3d2110]">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>
        </button>

        {/* Expanded Ancient Paper Body */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="relative px-6 sm:px-10 pb-7 pt-2 border-t border-[#d8c39d]"
            >
              {/* Top Details & Copy Action */}
              <div className="flex items-center justify-between mt-2 mb-4 text-xs font-cairo text-[#664228]">
                <div className="flex items-center gap-1.5 opacity-90">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#e8dcbf] border border-[#bfa175] text-[#8c2b18] font-bold">
                    {poem.sender || 'Soulmate🧸🤍.'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e8dcbf] hover:bg-[#d8c39d] border border-[#bfa175] text-[#3d2110] transition-colors cursor-pointer text-xs"
                  title="نسخ النص"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-emerald-800 font-bold">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8c2b18]" />
                      <span>نسخ الرسالة</span>
                    </>
                  )}
                </button>
              </div>

              {/* Decorative Corner Filigrees */}
              <div className="my-2 opacity-60">
                <BlackIrisMotif size="sm" variant="border-pair" />
              </div>

              {/* Calligraphic Content (Poetry verses vs Prose paragraphs) */}
              {poem.type === 'prose' ? (
                <div className="my-6 space-y-4 font-aref text-[#2c1810] text-lg sm:text-xl leading-relaxed text-justify px-2">
                  {poem.verses.map((paragraph, pIdx) => (
                    <p key={pIdx} className="drop-shadow-xs indent-6 leading-loose">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-center my-6 space-y-4 font-aref text-[#2c1810] text-xl sm:text-2xl leading-loose tracking-wide">
                  {poem.verses.map((verse, vIdx) => (
                    <p key={vIdx} className="drop-shadow-xs hover:text-[#8c2b18] transition-colors">
                      {verse}
                    </p>
                  ))}
                </div>
              )}

              {/* Parchment Footer Notes */}
              <div className="mt-6 pt-4 border-t border-[#d8c39d] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mada text-[#664228]">
                <div className="flex items-center gap-1.5">
                  <Feather className="w-4 h-4 text-[#8c2b18]" />
                  <span>{poem.subtitle}</span>
                </div>
                <span className="text-[11px] text-[#8c2b18]/80 font-bold">{poem.note}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

