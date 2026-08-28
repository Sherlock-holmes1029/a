import { PerformanceProvider } from '@/context/PerformanceContext';
import { SoundProvider } from '@/context/SoundContext';
import { MysteriesProvider } from '@/context/MysteriesContext';

import { LandingSection } from '@/components/sections/LandingSection';
import { JungleSection } from '@/components/sections/JungleSection';
import { DesertSection } from '@/components/sections/DesertSection';
import { BeachSection } from '@/components/sections/BeachSection';
import { MountainRoadSection } from '@/components/sections/MountainRoadSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { ClosingSection } from '@/components/sections/ClosingSection';

import { SectionFooter } from '@/components/ui/SectionFooter';
import { MysteryProgress } from '@/components/ui/MysteryProgress';

export function App() {
  return (
    <PerformanceProvider>
      <SoundProvider>
        <MysteriesProvider>
          <div className="relative min-h-screen w-full bg-[#060d09] text-emerald-50 selection:bg-emerald-500/30 selection:text-emerald-200">
            {/* Main Single Page Scroll Journey with Inter-Section Footers */}
            <main className="w-full flex flex-col">
              <LandingSection />
              <SectionFooter transition="landing-jungle" />

              <JungleSection />
              <SectionFooter transition="jungle-desert" />

              <DesertSection />
              <SectionFooter transition="desert-beach" />

              <BeachSection />
              <SectionFooter transition="beach-mountain" />

              <MountainRoadSection />
              <SectionFooter transition="mountain-timeline" />

              <TimelineSection />
              <SectionFooter transition="timeline-closing" />

              <ClosingSection />
            </main>

            {/* Compact Global Mysteries Tracker Badge */}
            <MysteryProgress />
          </div>
        </MysteriesProvider>
      </SoundProvider>
    </PerformanceProvider>
  );
}

export default App;
