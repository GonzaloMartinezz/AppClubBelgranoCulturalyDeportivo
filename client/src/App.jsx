import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import HomePage from './pages/HomePage';
import PlantelPage from './features/plantel/index';
import FixturePage from './pages/FixturePage';
import LiveMatchPage from './features/liveMatch/index';
import StandingsPage from './pages/PosicionesPage';
import StatsPage from './features/stats/index';
import GaleriaPage from './features/gallery/index';
import TiendaPage from './features/shop/index';
import SociosPage from './features/membership/index';

function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-[#2962FF] selection:text-white overflow-x-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Routes location={location} key={location.pathname}>
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
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
