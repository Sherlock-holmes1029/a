import React, { createContext, useContext, useState } from 'react';
import { TARGET_DATE, DEV_AUTO_UNLOCK, type WorldId } from '@/data/config';
import { useCountdown } from '@/hooks/useCountdown';

export type AppPhase = 'countdown' | 'login' | 'unlocked';
export type ActiveView = 'hub' | WorldId;

interface AppContextType {
  phase: AppPhase;
  activeWorld: ActiveView;
  isUnlocked: boolean;
  countdown: ReturnType<typeof useCountdown>;
  unlock: () => void;
  advanceToLogin: () => void;
  navigateToWorld: (world: ActiveView) => void;
  returnToHub: () => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_AUTH = 'for_amani_authenticated_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const countdown = useCountdown(TARGET_DATE);

  // Determine initial phase state
  const [phaseOverride, setPhaseOverride] = useState<AppPhase | null>(null);
  const [activeWorld, setActiveWorld] = useState<ActiveView>('hub');

  // Compute effective phase
  let effectivePhase: AppPhase = 'countdown';
  if (phaseOverride) {
    effectivePhase = phaseOverride;
  } else if (DEV_AUTO_UNLOCK) {
    effectivePhase = 'unlocked';
  } else {
    try {
      if (localStorage.getItem(STORAGE_KEY_AUTH) === 'true') {
        effectivePhase = 'unlocked';
      } else if (countdown.isExpired) {
        effectivePhase = 'login';
      }
    } catch {
      if (countdown.isExpired) {
        effectivePhase = 'login';
      }
    }
  }

  const unlock = () => {
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    } catch (e) {
      console.warn('localStorage error', e);
    }
    setPhaseOverride('unlocked');
  };

  const advanceToLogin = () => {
    setPhaseOverride('login');
  };

  const navigateToWorld = (world: ActiveView) => {
    setActiveWorld(world);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const returnToHub = () => {
    setActiveWorld('hub');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    } catch (e) {
      console.warn(e);
    }
    setPhaseOverride(countdown.isExpired ? 'login' : 'countdown');
    setActiveWorld('hub');
  };

  return (
    <AppContext.Provider
      value={{
        phase: effectivePhase,
        activeWorld,
        isUnlocked: effectivePhase === 'unlocked',
        countdown,
        unlock,
        advanceToLogin,
        navigateToWorld,
        returnToHub,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
