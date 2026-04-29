import React, { useState, useEffect } from 'react';
import MatchCalendar from './components/MatchCalendar';
import PlayerFaceOff from './components/PlayerFaceOff';
import ContactSection from './components/ContactSection';
import NuestraFamilia from './components/NuestraFamilia';
import Galeria from './components/Galeria';
import Shop from './components/Shop';

function App() {
  // Estado para guardar los datos del backend
  const [latestMatch, setLatestMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Conexión al Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch último partido
        const latestRes = await fetch('http://localhost:5000/api/matches/latest');
        const latestData = await latestRes.json();
        setLatestMatch(latestData);

        // Fetch todos los partidos (calendario)
        const matchesRes = await fetch('http://localhost:5000/api/matches');
        const matchesData = await matchesRes.json();
        setMatches(matchesData);

        setLoading(false);
      } catch (err) {
        console.error("Error conectando al servidor:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-brand selection:text-white">
      
      {/* NAVBAR BRUTALISTA */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b-4 border-white bg-dark sticky top-0 z-50">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-14 h-14 bg-brand border-2 border-white flex items-center justify-center hover:bg-white hover:text-dark transition-colors duration-300">
            <span className="font-teko font-bold text-2xl tracking-wider">CB</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-3xl font-teko font-bold tracking-widest text-white uppercase">Belgrano</span>
            <span className="text-[10px] font-oswald text-gray-400 uppercase tracking-[0.3em]">Cultural & Deportivo</span>
          </div>
        </div>
        <ul className="hidden lg:flex gap-12 text-sm font-oswald font-bold tracking-[0.2em] text-white uppercase">
          <li onClick={() => scrollToSection('nuestra-familia')} className="hover:text-brand cursor-pointer transition-colors relative group">
            Familia
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </li>
          <li onClick={() => scrollToSection('galeria')} className="hover:text-brand cursor-pointer transition-colors relative group">
            Galería
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </li>
          <li onClick={() => scrollToSection('shop')} className="hover:text-brand cursor-pointer transition-colors relative group">
            Store
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </li>
          <li onClick={() => scrollToSection('contacto')} className="hover:text-brand cursor-pointer transition-colors relative group">
            Contacto
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </li>
        </ul>
        <button className="lg:hidden w-12 h-12 border-2 border-white flex items-center justify-center flex-col gap-1.5">
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </nav>

      {/* 1. HERO SECTION (Brutalist Editorial) */}
      <main className="relative px-6 md:px-12 py-12 lg:py-24 max-w-[100vw] overflow-hidden border-b-2 border-white/10">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <span className="font-teko text-[30vw] leading-none font-bold">1920</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block border-2 border-brand bg-dark text-white px-4 py-2 font-oswald font-bold text-xs uppercase tracking-[0.2em]">
              <span className="w-2 h-2 inline-block bg-brand mr-3 animate-pulse"></span>
              LIGA FEDERAL DE BÁSQUET
            </div>
            
            <h1 className="text-[5rem] sm:text-[7rem] md:text-[9rem] font-teko uppercase leading-[0.8] tracking-normal text-white">
              EL GIGANTE <br /> 
              <span className="text-transparent border-text-brand">TUCUMANO</span>
            </h1>
            
            <p className="font-oswald text-gray-400 max-w-md text-lg leading-relaxed uppercase tracking-widest border-l-4 border-brand pl-6">
              Identidad. Garra. Historia. Acompañá al equipo en su camino a lo más alto de la liga.
            </p>

            <button className="border-2 border-white bg-transparent text-white font-oswald font-bold tracking-[0.2em] px-10 py-5 uppercase hover:bg-white hover:text-dark transition-all duration-300 flex items-center gap-4 group">
              HAZTE SOCIO AHORA
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <div className="lg:col-span-5 w-full">
            {/* MATCH CARD BRUTALISTA */}
            <div className="bg-dark border-4 border-white p-8 relative group hover:-translate-y-2 hover:shadow-[15px_15px_0_0_#0033A0] transition-all duration-300">
              
              <div className="flex justify-between items-center mb-8 border-b-2 border-white/20 pb-4">
                <p className="text-xs text-brand font-oswald font-bold tracking-[0.3em] uppercase">
                  {loading ? 'CARGANDO...' : latestMatch?.tournament || 'LIGA FEDERAL'}
                </p>
                <span className="text-xs text-white bg-brand px-2 py-1 font-oswald font-bold tracking-widest">FINAL</span>
              </div>
              
              <div className="flex justify-between items-center px-2">
                <div className="text-center flex-1">
                  <h3 className="text-sm font-oswald text-gray-400 mb-2 tracking-widest uppercase">
                    {loading ? 'RIVAL' : latestMatch?.homeTeam}
                  </h3>
                  <span className="text-7xl font-teko font-bold text-white tracking-tighter">
                    {loading ? '--' : latestMatch?.homeScore}
                  </span>
                </div>
                
                <div className="flex flex-col items-center justify-center px-4">
                  <span className="text-sm font-oswald font-bold text-brand mb-2">VS</span>
                  <div className="h-16 w-1 bg-white/20"></div>
                </div>
                
                <div className="text-center flex-1">
                  <h3 className="text-sm font-oswald text-brand mb-2 tracking-widest uppercase font-bold">
                    {loading ? 'BELGRANO' : latestMatch?.awayTeam}
                  </h3>
                  <span className="text-7xl font-teko font-bold text-brand tracking-tighter">
                    {loading ? '--' : latestMatch?.awayScore}
                  </span>
                </div>
              </div>

              {!loading && latestMatch?.mvp && (
                <div className="mt-10 pt-6 border-t-2 border-white/20 flex justify-between items-center bg-surface -mx-8 -mb-8 p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white text-dark border-2 border-dark flex items-center justify-center font-teko font-bold text-2xl leading-none">
                      #{latestMatch.mvp?.number || '0'}
                    </div>
                    <div>
                      <p className="text-[10px] text-brand uppercase tracking-[0.2em] mb-1 font-oswald font-bold">MVP DEL PARTIDO</p>
                      <p className="text-xl font-bold text-white font-teko uppercase tracking-wide">
                        {latestMatch.mvp?.name || '---'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .border-text-brand {
            -webkit-text-stroke: 2px #0033A0;
            color: transparent;
          }
        `}} />
      </main>

      {/* 2. NUESTRA FAMILIA */}
      <NuestraFamilia />

      {/* 3. CALENDARIO DE PARTIDOS */}
      <MatchCalendar matches={matches} />

      {/* 4. CARA A CARA (ESTADÍSTICAS) */}
      <PlayerFaceOff />

      {/* 5. GALERIA */}
      <Galeria />

      {/* 6. SHOP */}
      <Shop />

      {/* 7. SECCIÓN DE CONTACTO */}
      <div id="contacto">
        <ContactSection />
      </div>

      {/* FOOTER BRUTALISTA */}
      <footer className="border-t-4 border-brand py-16 px-6 md:px-12 bg-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand flex items-center justify-center border-2 border-white">
              <span className="font-teko font-bold text-3xl tracking-wider text-white">CB</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-4xl font-teko font-bold tracking-widest text-white uppercase">Belgrano</span>
              <span className="text-xs font-oswald text-brand uppercase tracking-[0.3em] font-bold">San Miguel de Tucumán</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 tracking-[0.2em] uppercase font-oswald text-center md:text-right">
            © 2026 Club Belgrano Cultural y Deportivo. <br className="md:hidden" />Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

