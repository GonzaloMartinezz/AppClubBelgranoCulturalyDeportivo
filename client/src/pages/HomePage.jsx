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
  const [heroIndex, setHeroIndex] = useState(0);

  const heroImages = [
    '/hero-bg.png',
    '/fans-crowd.png',
  ];

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(heroTimer);
  }, []);

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
          HERO — Carrusel de imágenes con mobile padding
      ════════════════════════════════════ */}
      <section id="hero" className="relative w-full" style={{ height: 'clamp(500px, 100vh, 100vh)', overflow: 'hidden', paddingTop: '68px' }}>
        {heroImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Belgrano Basketball"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: idx === heroIndex ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)' }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
          <p className="font-oswald text-[10px] md:text-xs uppercase tracking-[0.2em] text-white mb-2 md:mb-4 flex items-center gap-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            LIGA FEDERAL · TEMPORADA 2026
          </p>
          <h1
            className="font-teko font-bold uppercase text-white text-center"
            style={{
              fontSize: 'clamp(48px, 22vw, 280px)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              textShadow: '0 20px 50px rgba(0,0,0,0.6)',
              marginBottom: '12px',
            }}
          >
            CLUB<br/>BELGRANO
          </h1>
          <p className="font-oswald text-xs md:text-sm uppercase tracking-[0.15em] text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Juntos. Únete a nosotros.
          </p>
        </div>

        {/* Carrusel dots */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className="rounded-full transition-all duration-300"
              style={{
                background: idx === heroIndex ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)',
                width: idx === heroIndex ? '24px' : '10px',
                height: '10px',
                cursor: 'pointer',
                border: 'none',
              }}
            />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          INTRO TEXT — responsive
      ════════════════════════════════════ */}
      <section className="py-12 md:py-24 px-4 md:px-20 text-center" style={{ background: '#111111' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-oswald font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6" style={{ color: 'var(--color-accent)' }}>
            Club Belgrano Cultural y Deportivo
          </p>
          <p className="font-sans text-lg md:text-2xl leading-relaxed text-white" style={{ opacity: 0.85 }}>
            Desde 1920 somos una verdadera familia. Llevamos a cada cancha en Tucumán el compromiso, el sudor, la disciplina y la pasión por el juego.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════
          STAGGERED ORANGE BLOCKS — responsive
      ════════════════════════════════════ */}
      <section id="equipo" className="py-6 md:py-10 px-4 md:px-0" style={{ background: '#111111' }}>
        <div className="flex flex-col gap-6 md:gap-10">
          
          {/* Bloque Izquierdo */}
          <div className="w-[90%] md:w-[60%] lg:w-[45%] mx-auto md:ml-0" style={{ background: 'var(--color-accent)', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
            <div className="p-8 md:p-12 lg:p-16 flex flex-col items-start">
              <h2 className="font-teko font-bold text-4xl md:text-5xl lg:text-6xl text-white uppercase mb-4 leading-tight">Nuestra<br/>Familia</h2>
              <a href="/plantel" className="inline-flex items-center gap-2 text-black font-oswald uppercase text-[11px] md:text-xs tracking-widest font-bold mt-6 hover:gap-3 transition-all" style={{ transition: 'gap 0.2s' }}>
                Conocer Equipo <ArrowRight />
              </a>
            </div>
          </div>

          {/* Bloque Derecho */}
          <div className="w-[90%] md:w-[60%] lg:w-[45%] self-center md:self-end mr-auto md:mr-0" style={{ background: 'var(--color-accent)', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
            <div className="p-8 md:p-12 lg:p-16 flex flex-col items-start">
              <h2 className="font-teko font-bold text-4xl md:text-5xl lg:text-6xl text-white uppercase mb-4 leading-tight">Photo<br/>Gallery</h2>
              <a href="/galeria" className="inline-flex items-center gap-2 text-black font-oswald uppercase text-[11px] md:text-xs tracking-widest font-bold mt-6 hover:gap-3 transition-all" style={{ transition: 'gap 0.2s' }}>
                Ver Galería <ArrowRight />
              </a>
            </div>
          </div>

          {/* Bloque Izquierdo */}
          <div className="w-[90%] md:w-[60%] lg:w-[45%] mx-auto md:ml-0" style={{ background: 'var(--color-accent)', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
            <div className="p-8 md:p-12 lg:p-16 flex flex-col items-start">
              <h2 className="font-teko font-bold text-4xl md:text-5xl lg:text-6xl text-white uppercase mb-4 leading-tight">Tienda<br/>Oficial</h2>
              <a href="/tienda" className="inline-flex items-center gap-2 text-black font-oswald uppercase text-[11px] md:text-xs tracking-widest font-bold mt-6 hover:gap-3 transition-all" style={{ transition: 'gap 0.2s' }}>
                Comprar <ArrowRight />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          IMAGE BREAK (Players) — responsive
      ════════════════════════════════════ */}
      <section className="w-full py-6 md:py-10 px-4 md:px-0" style={{ background: '#111111' }}>
        <div className="w-[95%] md:w-[90%] mx-auto overflow-hidden" style={{ borderRadius: '12px', height: 'clamp(300px, 60vh, 70vh)' }}>
          <img 
            src="/fans-crowd.png" 
            alt="Jugadores celebrando" 
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = '/hero-bg.png'; }}
          />
        </div>
      </section>

      {/* ════════════════════════════════════
          SCOREBOARD + FIXTURE — responsive
      ════════════════════════════════════ */}
      <section id="fixture" className="py-12 md:py-20 px-4 md:px-10" style={{ background: '#111111' }}>
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-6">

          {/* Marcador Blanco (Left) */}
          <div
            className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center relative overflow-hidden"
            style={{ background: '#F0F0F0', borderRadius: '12px' }}
          >
            <p className="font-oswald font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 md:mb-6">
              {loading ? '...' : latestMatch?.date ? new Date(latestMatch.date + 'T00:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() : '27 ABRIL 2026'}
            </p>

            <div className="flex items-center justify-center gap-3 md:gap-8 w-full">
              <span className="font-teko font-bold text-black" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.8 }}>
                {loading ? '--' : latestMatch?.awayScore ?? '--'}
              </span>

              <div className="flex flex-col items-center">
                <div className="font-teko font-bold text-base md:text-xl uppercase tracking-widest text-black border-l-4 border-r-4 px-2 md:px-4" style={{ borderColor: 'var(--color-accent)' }}>
                  FINAL
                </div>
                <p className="font-oswald text-[9px] md:text-xs uppercase tracking-[0.1em] text-gray-500 mt-2">
                  {loading ? '...' : `${latestMatch?.awayTeam?.name} vs ${latestMatch?.homeTeam?.name}`}
                </p>
              </div>

              <span className="font-teko font-bold text-black" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.8 }}>
                {loading ? '--' : latestMatch?.homeScore ?? '--'}
              </span>
            </div>
          </div>

          {/* Proximo Partido Naranja (Right) */}
          <div
            className="w-full lg:w-[380px] flex flex-col justify-between p-6 md:p-10 relative overflow-hidden"
            style={{ background: 'var(--color-accent)', borderRadius: '12px' }}
          >
            <div>
              <p className="font-oswald font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white opacity-80 mb-1 md:mb-2">
                Próximo Partido
              </p>
              <p className="font-oswald text-[10px] md:text-xs uppercase tracking-wider text-white opacity-90">
                04 MAYO 2026 — 21:00
              </p>
              <p className="font-oswald text-[9px] uppercase tracking-wider text-white opacity-60 mt-1">
                @Palacio de los Deportes
              </p>
            </div>

            <h3 className="font-teko font-bold text-4xl md:text-5xl text-white uppercase leading-none mt-6 md:mt-8">
              VS<br/>GIMNASIA
            </h3>

            <div className="mt-6 md:mt-8 self-end text-black">
              <ArrowRight />
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          SPONSORS/PARTNERS SECTION
      ════════════════════════════════════ */}
      <section id="sponsors" className="py-12 md:py-20 px-4 md:px-10" style={{ background: '#1a1a1a', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-teko font-bold text-4xl md:text-5xl lg:text-6xl uppercase text-white mb-4">
              Nuestros <span style={{ color: 'var(--color-accent)' }}>Partners</span>
            </h2>
            <p className="font-oswald text-gray-400 uppercase text-[10px] md:text-xs tracking-[0.2em]">
              Empresas que creen en nosotros
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-6 md:p-8 rounded-lg hover:scale-105 transition-transform duration-300"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="text-center">
                  <div className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-3 md:mb-4 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,140,0,0.1)' }}>
                    <span className="font-bold text-xs md:text-sm text-gray-500">Logo</span>
                  </div>
                  <p className="font-oswald text-[9px] md:text-xs text-gray-400 uppercase tracking-wide">Partner {idx}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CALL TO ACTION — responsive
      ════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4 md:px-10" style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-teko font-bold text-3xl md:text-5xl lg:text-7xl uppercase text-white mb-4 md:mb-6">
            ¿Quieres unirte<br/>a nosotros?
          </h2>
          <p className="font-oswald text-gray-400 uppercase text-[10px] md:text-sm tracking-[0.15em] mb-8 md:mb-12">
            Accede a contenido exclusivo y sé parte de la familia Belgrano
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button
              className="px-8 md:px-12 py-3 md:py-4 font-oswald font-bold uppercase text-xs md:text-xs tracking-[0.2em] rounded-lg transition-all duration-300"
              style={{ background: 'var(--color-accent)', color: 'white', border: 'none', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Hazte Socio
            </button>
            <button
              className="px-8 md:px-12 py-3 md:py-4 font-oswall font-bold uppercase text-xs md:text-xs tracking-[0.2em] rounded-lg transition-all duration-300 border"
              style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)', background: 'transparent', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,48,135,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Más Información
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
