import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

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
  return (
    <div style={{ background: '#0A0A0A', color: '#F9FAFB', minHeight: '100vh' }}>
      <Navbar />
      <main>
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
      <Footer />
    </div>
  );
}

export default App;
