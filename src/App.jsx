import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/NavbarNew';
import Footer from './components/layout/FooterNew';
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
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-brand selection:text-white overflow-x-hidden flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-0">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
