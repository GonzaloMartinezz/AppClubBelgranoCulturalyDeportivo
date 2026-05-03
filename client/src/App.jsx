import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import EquipoPage from './pages/EquipoPage';
import FixturePage from './pages/FixturePage';
import GaleriaPage from './pages/GaleriaPage';
import TiendaPage from './pages/TiendaPage';
import ContactoPage from './pages/ContactoPage';

function App() {
  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-brand selection:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/equipo" element={<EquipoPage />} />
        <Route path="/fixture" element={<FixturePage />} />
        <Route path="/galeria" element={<GaleriaPage />} />
        <Route path="/tienda" element={<TiendaPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
