import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import AEONPage from './pages/AEONPage';
import JournalPage from './pages/JournalPage';
import MissionHubPage from './pages/MissionHubPage';
import SkillsGrowthPage from './pages/SkillsGrowthPage';
import KnowledgePage from './pages/KnowledgePage';
import SolarExchangePage from './pages/SolarExchangePage';
import NotFoundPage from './pages/NotFoundPage';

const pages = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/aeon', label: 'AEON' },
  { path: '/journal', label: 'Journal' },
  { path: '/mission-hub', label: 'Mission Hub' },
  { path: '/skills-growth', label: 'Skills & Growth' },
  { path: '/knowledge', label: 'Knowledge' },
  { path: '/solar-exchange', label: 'Solar Exchange' },
];

function App() {
  const navPages = useMemo(() => pages, []);

  return (
    <div className="app-shell">
      <Sidebar pages={navPages} />
      <main className="main-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/aeon" element={<AEONPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/mission-hub" element={<MissionHubPage />} />
          <Route path="/skills-growth" element={<SkillsGrowthPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/solar-exchange" element={<SolarExchangePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
