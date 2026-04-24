import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Scoreboard from './components/Scoreboard';

function App() {
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000');
        const data = await response.text();
        console.log('Respuesta del Backend:', data);
      } catch (error) {
        console.error('Error conectando al Backend:', error);
      }
    };

    checkBackendConnection();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-brand selection:text-white">
      <Navbar />
      
      <main className="container mx-auto px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-block px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-sm font-bold tracking-widest uppercase">
              Pasión Decana
            </div>
            <h1 className="text-6xl md:text-8xl font-oswald font-bold leading-[0.9] tracking-tighter uppercase">
              CLUB BELGRANO <br />
              <span className="text-brand">TUCUMÁN</span>
            </h1>
            <p className="text-lg text-white/60 max-w-lg leading-relaxed">
              Más que un club, una familia. Formando talentos y compartiendo la pasión por el deporte en el corazón de Tucumán desde 1920.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-brand hover:bg-brand/80 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-brand/20 uppercase tracking-widest text-sm">
                Asóciate
              </button>
              <button className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-bold rounded-lg transition-all uppercase tracking-widest text-sm">
                Ver Galería
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-right duration-1000">
            <Scoreboard />
          </div>
        </div>
      </main>

      {/* Decorative background element */}
      <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
    </div>
  );
}

export default App;
