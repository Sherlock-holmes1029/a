import React from 'react';
import { motion } from 'framer-motion';

interface SecretArcadeLinkProps {
  className?: string;
}

export const SecretArcadeLink: React.FC<SecretArcadeLinkProps> = ({ className = '' }) => {
  return (
    <motion.a
      href="https://sherlock-holmes1029.github.io/bunny-vs-zombies/"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
      whileTap={{ scale: 0.92 }}
      className={`group relative inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-stone-950/70 hover:bg-purple-950/60 border border-purple-500/30 hover:border-purple-400/80 shadow-md shadow-black/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.45)] backdrop-blur-md transition-all duration-300 cursor-pointer select-none ${className}`}
      title="Bunny vs. Zombies 🐰👾"
      aria-label="Bunny vs Zombies Game"
    >
      {/* 👾 Emoji with glowing drop shadow on hover */}
      <span className="text-xl filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_0_10px_rgba(192,132,252,0.8)] transition-all duration-300">
        👾
      </span>

      {/* Retro Arcade Blinking Indicator Dot */}
      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-500/70 border border-purple-300/80 animate-ping pointer-events-none" />
      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-400 border border-purple-200 pointer-events-none shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
    </motion.a>
  );
};

export default SecretArcadeLink;
