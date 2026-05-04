import { useState, useEffect } from 'react';
import api from '../core/api/client';

const ArrowDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HomePage = () => {
  const [latestMatch, setLatestMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/matches/latest')
      .then(r => setLatestMatch(r.data.data))
      .catch(() => setLatestMatch({
        homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Ateneo' },
        homeScore: 85, awayScore: 72, status: 'FINAL',
        date: '2026-04-27',
        competition: { name: 'Liga Federal' },
        mvp: { player: { name: 'Mateo Díaz', number: 9 } },
      }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full" style={{ background: '#111111' }}>

      {/* ════════════════════════════════════
          HERO — 100vh con la palabra CLUB gigante
      ════════════════════════════════════ */}
      <section id="hero" className="relative w-full" style={{ height: '100vh', overflow: 'hidden' }}>
        <img
          src="/hero-bg.png"
          alt="Belgrano Basketball"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <p className="font-oswald text-xs uppercase tracking-[0.2em] text-white mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            LIGA FEDERAL · TEMPORADA 2026
          </p>
          <h1
            className="font-teko font-bold uppercase text-white"
            style={{ 
              fontSize: 'min(28vw, 250px)', 
              lineHeight: 0.8, 
              letterSpacing: '-0.02em',
              textShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
          >
            CLUB
          </h1>
        </div>
      </section>

      {/* ════════════════════════════════════
          INTRO TEXT
      ════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-20 text-center" style={{ background: '#111111' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-oswald font-bold text-xs uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--color-accent)' }}>
            Club Belgrano Cultural y Deportivo
          </p>
          <p className="font-sans text-xl md:text-2xl leading-relaxed text-white" style={{ opacity: 0.8 }}>
            Desde 1920 somos una verdadera familia. Llevamos a cada cancha en Tucumán el compromiso, el sudor, la disciplina y la pasión por el juego.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════
          STAGGERED ORANGE BLOCKS
      ════════════════════════════════════ */}
      <section id="equipo" className="py-10" style={{ background: '#111111' }}>
        <div className="flex flex-col gap-10">
          
          {/* Bloque Izquierdo */}
          <div className="w-[80%] md:w-[60%] lg:w-[45%]" style={{ background: 'var(--color-accent)' }}>
            <div className="p-12 md:p-20 flex flex-col items-start">
              <h2 className="font-teko font-bold text-6xl text-white uppercase mb-4">Nuestra<br/>Familia</h2>
              <a href="#hero" className="inline-flex items-center gap-4 text-black font-oswald uppercase text-xs tracking-widest font-bold mt-4" style={{ transition: 'opacity 0.2s' }}>
                Conocer Equipo <ArrowRight />
              </a>
            </div>
          </div>

          {/* Bloque Derecho */}
          <div className="w-[80%] md:w-[60%] lg:w-[45%] self-end" style={{ background: 'var(--color-accent)' }}>
            <div className="p-12 md:p-20 flex flex-col items-start">
              <h2 className="font-teko font-bold text-6xl text-white uppercase mb-4">Photo<br/>Gallery</h2>
              <a href="#hero" className="inline-flex items-center gap-4 text-black font-oswald uppercase text-xs tracking-widest font-bold mt-4" style={{ transition: 'opacity 0.2s' }}>
                Ver Galería <ArrowRight />
              </a>
            </div>
          </div>

          {/* Bloque Izquierdo */}
          <div className="w-[80%] md:w-[60%] lg:w-[45%]" style={{ background: 'var(--color-accent)' }}>
            <div className="p-12 md:p-20 flex flex-col items-start">
              <h2 className="font-teko font-bold text-6xl text-white uppercase mb-4">Tienda<br/>Oficial</h2>
              <a href="#hero" className="inline-flex items-center gap-4 text-black font-oswald uppercase text-xs tracking-widest font-bold mt-4" style={{ transition: 'opacity 0.2s' }}>
                Comprar <ArrowRight />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          IMAGE BREAK (Players)
      ════════════════════════════════════ */}
      <section className="w-full py-10" style={{ background: '#111111' }}>
        <div className="w-[90%] md:w-[80%] mx-auto overflow-hidden" style={{ borderRadius: '16px', height: '60vh' }}>
          <img 
            src="/fans-crowd.png" 
            alt="Jugadores celebrando" 
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = '/hero-bg.png'; }}
          />
        </div>
      </section>

      {/* ════════════════════════════════════
          SCOREBOARD + FIXTURE
      ════════════════════════════════════ */}
      <section id="fixture" className="py-20 px-4 md:px-10" style={{ background: '#111111' }}>
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
          
          {/* Marcador Blanco (Left) */}
          <div 
            className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden"
            style={{ background: '#F0F0F0', borderRadius: '16px' }}
          >
            <p className="font-oswald font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6">
              {loading ? '...' : latestMatch?.date ? new Date(latestMatch.date + 'T00:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() : '27 ABRIL 2026'}
            </p>

            <div className="flex items-center justify-center gap-6 md:gap-12 w-full">
              <span className="font-teko font-bold text-black" style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', lineHeight: 0.8 }}>
                {loading ? '--' : latestMatch?.awayScore ?? '--'}
              </span>
              
              <div className="flex flex-col items-center">
                <div className="font-teko font-bold text-xl md:text-2xl uppercase tracking-widest text-black border-l-4 border-r-4 px-4" style={{ borderColor: 'var(--color-accent)' }}>
                  FINAL
                </div>
                <p className="font-oswald text-[10px] md:text-xs uppercase tracking-[0.1em] text-gray-500 mt-3">
                  {loading ? '...' : `${latestMatch?.awayTeam?.name} vs ${latestMatch?.homeTeam?.name}`}
                </p>
              </div>

              <span className="font-teko font-bold text-black" style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', lineHeight: 0.8 }}>
                {loading ? '--' : latestMatch?.homeScore ?? '--'}
              </span>
            </div>
          </div>

          {/* Proximo Partido Naranja (Right) */}
          <div 
            className="w-full lg:w-[400px] flex flex-col justify-between p-10 relative overflow-hidden"
            style={{ background: 'var(--color-accent)', borderRadius: '16px' }}
          >
            <div>
              <p className="font-oswald font-bold text-[10px] uppercase tracking-[0.2em] text-white opacity-80 mb-2">
                Próximo Partido
              </p>
              <p className="font-oswald text-xs uppercase tracking-wider text-white opacity-90">
                04 MAYO 2026 — 21:00
              </p>
              <p className="font-oswald text-[10px] uppercase tracking-wider text-white opacity-60 mt-1">
                @Palacio de los Deportes
              </p>
            </div>

            <h3 className="font-teko font-bold text-6xl text-white uppercase leading-none mt-10">
              VS GIMNASIA
            </h3>

            <div className="mt-10 self-end text-black">
              <ArrowRight />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
