import { useEffect } from 'react';
import { useSound } from '@/context/SoundContext';

export function useSectionSound(sectionId: string, isInView: boolean) {
  const { setActiveSection } = useSound();

  useEffect(() => {
    if (isInView) {
      setActiveSection(sectionId);
    }
  }, [isInView, sectionId, setActiveSection]);
}
