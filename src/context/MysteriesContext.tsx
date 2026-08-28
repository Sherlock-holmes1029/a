import React, { createContext, useContext, useState, useEffect } from 'react';
import { mysteries, type Mystery } from '@/data/mysteries';
import confetti from 'canvas-confetti';

interface MysteriesContextType {
  mysteries: Mystery[];
  foundIds: string[];
  foundCount: number;
  totalCount: number;
  allFound: boolean;
  isFound: (id: string) => boolean;
  findMystery: (id: string) => void;
  recentFound: Mystery | null;
  dismissRecentFound: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'for_amani_mysteries_v1';

const MysteriesContext = createContext<MysteriesContextType | undefined>(undefined);

export const MysteriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foundIds, setFoundIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentFound, setRecentFound] = useState<Mystery | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foundIds));
    } catch (e) {
      console.warn('Could not save mysteries to localStorage', e);
    }
  }, [foundIds]);

  const isFound = (id: string) => foundIds.includes(id);

  const findMystery = (id: string) => {
    if (foundIds.includes(id)) return;

    const item = mysteries.find((m) => m.id === id);
    const updated = [...foundIds, id];
    setFoundIds(updated);

    if (item) {
      setRecentFound(item);
    }

    // Trigger celebration confetti on discovery
    try {
      confetti({
        particleCount: updated.length === mysteries.length ? 100 : 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#f59e0b', '#38bdf8', '#fbbf24', '#ec4899'],
      });
    } catch {
      // safe fallback
    }
  };

  const dismissRecentFound = () => setRecentFound(null);

  const resetProgress = () => {
    setFoundIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // safe fallback
    }
  };

  const allFound = foundIds.length >= mysteries.length && mysteries.length > 0;

  return (
    <MysteriesContext.Provider
      value={{
        mysteries,
        foundIds,
        foundCount: foundIds.length,
        totalCount: mysteries.length,
        allFound,
        isFound,
        findMystery,
        recentFound,
        dismissRecentFound,
        isModalOpen,
        setIsModalOpen,
        resetProgress,
      }}
    >
      {children}
    </MysteriesContext.Provider>
  );
};

export const useMysteries = () => {
  const context = useContext(MysteriesContext);
  if (!context) {
    throw new Error('useMysteries must be used within a MysteriesProvider');
  }
  return context;
};
