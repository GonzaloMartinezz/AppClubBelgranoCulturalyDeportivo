import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import HomePage from './features/home/index';
import PlantelPage from './features/plantel/index';
import FixturePage from './features/matches/index';
import LiveMatchPage from './features/liveMatch/index';
import StandingsPage from './features/standings/index';
import StatsPage from './features/stats/index';
import GaleriaPage from './features/gallery/index';
import TiendaPage from './features/shop/index';
import SociosPage from './features/membership/index';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-blue-600 selection:text-white">
      {/* New Floating Navbar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plantel" element={<PlantelPage />} />
            <Route path="/fixture" element={<FixturePage />} />
            <Route path="/live/:id" element={<LiveMatchPage />} />
            <Route path="/posiciones" element={<StandingsPage />} />
            <Route path="/estadisticas" element={<StatsPage />} />
            <Route path="/galeria" element={<GaleriaPage />} />
            <Route path="/tienda" element={<TiendaPage />} />
            <Route path="/socios" element={<SociosPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
