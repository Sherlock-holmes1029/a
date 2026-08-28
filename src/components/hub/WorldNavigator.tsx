import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { WorldHub } from '@/components/hub/WorldHub';
import { WaterfallWorld } from '@/components/worlds/WaterfallWorld';
import { BlackIrisWorld } from '@/components/worlds/BlackIrisWorld';
import { BeachWorld } from '@/components/worlds/BeachWorld';
import { MemoriesWorld } from '@/components/worlds/MemoriesWorld';

export const WorldNavigator: React.FC = () => {
  const { activeWorld } = useApp();

  return (
    <AnimatePresence mode="wait">
      {activeWorld === 'hub' && <WorldHub key="hub" />}
      {activeWorld === 'waterfall' && <WaterfallWorld key="waterfall" />}
      {activeWorld === 'black-iris' && <BlackIrisWorld key="black-iris" />}
      {activeWorld === 'beach' && <BeachWorld key="beach" />}
      {activeWorld === 'memories' && <MemoriesWorld key="memories" />}
    </AnimatePresence>
  );
};
