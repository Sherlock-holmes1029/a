import React from 'react';
import { useSound } from '@/context/SoundContext';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export const SoundToggle: React.FC = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleMute}
      aria-label={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم الصوت'}
      className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 backdrop-blur-md shadow-lg shadow-emerald-950/40 hover:bg-emerald-900/80 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 min-w-[44px] min-h-[44px] justify-center"
    >
      {isMuted ? (
        <>
          <VolumeX className="w-4 h-4 text-emerald-400/70" />
          <span className="text-xs font-cairo hidden sm:inline text-emerald-300/80">صوت هادئ</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse" />
          <span className="text-xs font-cairo hidden sm:inline text-emerald-200">صوت يعمل</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
        </>
      )}
    </motion.button>
  );
};
