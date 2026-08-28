import { usePerformance } from '@/context/PerformanceContext';

export function useReducedMotion(): boolean {
  const { prefersReducedMotion, isEffectiveLowPower } = usePerformance();
  return prefersReducedMotion || isEffectiveLowPower;
}

export function useLowPowerMode(): {
  isLowPower: boolean;
  toggleLowPower: () => void;
} {
  const { isEffectiveLowPower, toggleLowPowerMode } = usePerformance();
  return {
    isLowPower: isEffectiveLowPower,
    toggleLowPower: toggleLowPowerMode,
  };
}
