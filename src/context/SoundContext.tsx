import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from '@/lib/soundManager';

interface SoundContextType {
  isMuted: boolean;
  activeSection: string;
  toggleMute: () => void;
  setActiveSection: (section: string) => void;
  playChime: () => void;
  playTap: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeSection, setActiveSectionState] = useState<string>('landing');

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      soundManager.setMuted(next);
      return next;
    });
  };

  const setActiveSection = (section: string) => {
    setActiveSectionState(section);
    soundManager.setSection(section);
  };

  const playChime = () => soundManager.playChime();
  const playTap = () => soundManager.playTap();

  useEffect(() => {
    soundManager.setMuted(isMuted);
  }, []);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        activeSection,
        toggleMute,
        setActiveSection,
        playChime,
        playTap,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
