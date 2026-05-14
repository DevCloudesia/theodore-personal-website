import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Bios } from './components/Bios';
import { Projects } from './components/Projects';
import { System } from './components/System';
import { System3D } from './components/System3D';

// Maps URL paths ↔ tab ids. Keep paths short and friendly.
const TAB_TO_PATH: Record<string, string> = {
  home: '/',
  bios: '/bios',
  system: '/system',
  system3d: '/3d',
  projects: '/projects',
};

const PATH_TO_TAB: Record<string, string> = Object.fromEntries(
  Object.entries(TAB_TO_PATH).map(([tab, path]) => [path, tab])
);

const getTabFromPath = (pathname: string): string => {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return PATH_TO_TAB[normalized] ?? 'home';
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(() =>
    typeof window !== 'undefined' ? getTabFromPath(window.location.pathname) : 'home'
  );

  // Keep URL in sync when the active tab changes via the nav buttons.
  const navigate = useCallback((tab: string) => {
    const path = TAB_TO_PATH[tab] ?? '/';
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({ tab }, '', path);
    }
    setActiveTab(tab);
  }, []);

  // Sync state when user uses browser back/forward.
  useEffect(() => {
    const onPopState = () => {
      setActiveTab(getTabFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <Layout activeTab={activeTab} setActiveTab={navigate}>
      {activeTab === 'home' && <Home />}
      {activeTab === 'bios' && <Bios />}
      {activeTab === 'system' && <System />}
      {/* System3D stays mounted so its Three.js scene + loaded STL models are never destroyed */}
      <div style={{ display: activeTab === 'system3d' ? 'block' : 'none' }}>
        <System3D isActive={activeTab === 'system3d'} />
      </div>
      {activeTab === 'projects' && <Projects />}
    </Layout>
  );
};

export default App;
