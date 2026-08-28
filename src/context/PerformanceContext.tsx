import React, { createContext, useContext, useState, useEffect } from 'react';

interface PerformanceContextType {
  isLowPowerMode: boolean;
  prefersReducedMotion: boolean;
  isEffectiveLowPower: boolean;
  toggleLowPowerMode: () => void;
  setLowPowerMode: (value: boolean) => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLowPowerMode, setIsLowPowerMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('for_amani_low_power') === 'true';
    } catch {
      return false;
    }
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleLowPowerMode = () => {
    setIsLowPowerMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('for_amani_low_power', String(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const setLowPowerMode = (value: boolean) => {
    setIsLowPowerMode(value);
    try {
      localStorage.setItem('for_amani_low_power', String(value));
    } catch (e) {
      console.warn(e);
    }
  };

  const isEffectiveLowPower = isLowPowerMode || prefersReducedMotion;

  return (
    <PerformanceContext.Provider
      value={{
        isLowPowerMode,
        prefersReducedMotion,
        isEffectiveLowPower,
        toggleLowPowerMode,
        setLowPowerMode,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};
