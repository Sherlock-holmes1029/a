import { AnimatePresence } from 'framer-motion';
import { PerformanceProvider } from '@/context/PerformanceContext';
import { AppProvider, useApp } from '@/context/AppContext';
import { CountdownScreen } from '@/components/gatekeeper/CountdownScreen';
import { LoginScreen } from '@/components/gatekeeper/LoginScreen';
import { WorldNavigator } from '@/components/hub/WorldNavigator';

function AppShell() {
  const { phase } = useApp();

  return (
    <div className="relative min-h-screen w-full bg-[#050d09] text-emerald-50 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden font-cairo">
      <AnimatePresence mode="wait">
        {phase === 'countdown' && <CountdownScreen key="countdown-screen" />}
        {phase === 'login' && <LoginScreen key="login-screen" />}
        {phase === 'unlocked' && <WorldNavigator key="world-navigator" />}
      </AnimatePresence>
    </div>
  );
}

export function App() {
  return (
    <PerformanceProvider>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </PerformanceProvider>
  );
}

export default App;
