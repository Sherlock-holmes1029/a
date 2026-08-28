import { usePerformance } from '@/context/PerformanceContext';

export function useReducedMotion(): boolean {
  const { prefersReducedMotion, isEffectiveLowPower } = usePerformance();
  return prefersReducedMotion || isEffectiveLowPower;
}
