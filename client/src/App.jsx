import React from 'react';
import MatchCalendar from './components/MatchCalendar';
import PlayerFaceOff from './components/PlayerFaceOff';
import ContactSection from './components/ContactSection';


function App() {
  return (
    // Contenedor principal: Dark mode estricto
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-blue-600">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* Aquí iría el logo (Escudo) - Usamos un div como placeholder */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full border border-blue-500/30 flex items-center justify-center">
            <span className="font-bold text-xs">CBCD</span>
          </div>
          <span className="text-xl font-bold tracking-widest text-white">
            BELGRANO
          </span>
        </div>
        <ul className="hidden md:flex gap-8 text-xs font-bold tracking-[0.2em] text-gray-400">
          <li className="hover:text-white cursor-pointer transition-colors">HOME</li>
          <li className="hover:text-white cursor-pointer transition-colors">NUESTRA FAMILIA</li>
          <li className="hover:text-white cursor-pointer transition-colors">GALERÍA</li>
          <li className="hover:text-white cursor-pointer transition-colors">SHOP</li>
          <li className="hover:text-white cursor-pointer transition-colors">CONTACTO</li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <main className="px-6 py-20 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Columna Izquierda: Copy y Call to Actions */}
          <div className="flex-1 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] text-gray-300 text-xs font-bold tracking-widest rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              LIGA FEDERAL 
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
              El Gigante <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
                Tucumano
              </span>
            </h1>
            
            <p className="text-gray-400 max-w-md text-lg leading-relaxed font-light">
              Club Belgrano Cultural y Deportivo. Entidad histórica de San Miguel de Tucumán. Acompañá al equipo en su camino a lo más alto.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-none font-bold text-xs tracking-[0.15em] transition-all">
                PRÓXIMO PARTIDO
              </button>
              <button className="bg-transparent border border-white/20 hover:border-white/60 text-white px-8 py-4 rounded-none font-bold text-xs tracking-[0.15em] transition-all">
                VER ROSTER
              </button>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Marcador (Estilo Minimalista) */}
          <div className="flex-1 w-full max-w-xl">
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500">
              
              {/* Glow effect sutil */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all duration-500"></div>
              
              <div className="text-center mb-8">
                <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase">Final Score • Liga Federal</p>
              </div>
              
              <div className="flex justify-between items-center px-4">
                {/* Local */}
                <div className="text-center flex-1">
                  <h3 className="text-sm font-bold text-gray-400 mb-4 tracking-wider">CONCEPCIÓN BB</h3>
                  {/* Tipografía monoespaciada para los números */}
                  <span className="text-6xl md:text-7xl font-black font-mono text-gray-600 tracking-tighter">72</span>
                </div>
                
                {/* Divisor */}
                <div className="flex flex-col items-center justify-center px-4">
                  <div className="h-16 w-px bg-white/10"></div>
                </div>
                
                {/* Visitante (Belgrano - Ganador) */}
                <div className="text-center flex-1">
                  <h3 className="text-sm font-bold text-white mb-4 tracking-wider">BELGRANO</h3>
                  <span className="text-6xl md:text-7xl font-black font-mono text-blue-500 tracking-tighter">89</span>
                </div>
              </div>

              {/* MVP Section Footer */}
              <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2">MVP del Partido</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-full overflow-hidden">
                       {/* Aquí irá la foto del MVP */}
                       <div className="w-full h-full bg-blue-900/50"></div>
                    </div>
                    <p className="text-sm font-bold text-gray-200">G. Martinez <span className="text-gray-600 font-normal ml-1">#10</span></p>
                  </div>
                </div>
                <a href="#" className="text-[10px] text-gray-400 hover:text-white border-b border-gray-400 hover:border-white pb-1 transition-all uppercase tracking-wider">
                  Ver estadísticas
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* NUEVAS SECCIONES */}
      <MatchCalendar />
      <PlayerFaceOff />
      <ContactSection />
    </div>
  );
}

export default App;
