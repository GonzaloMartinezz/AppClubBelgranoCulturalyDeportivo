import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../core/api/client';

const ArrowDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
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

  const galleryItems = [
    { src: '/gallery-stadium.png', label: 'Photo Gallery' },
    { src: '/fans-crowd.png',      label: 'La Hinchada' },
  ];

  return (
    <div className="pt-16" style={{ background: 'var(--color-dark)' }}>

      {/* ════════════════════════════════════
          HERO — full width image
      ════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: '70vh', minHeight: '480px' }}>
        <img
          src="/hero-bg.png"
          alt="Belgrano Basketball"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(18,18,18,0.3) 0%, rgba(18,18,18,0.8) 70%, var(--color-dark) 100%)' }}
        />

        <div className="app-container relative z-10 flex flex-col justify-end h-full pb-12">
          <p className="section-label mb-4">Liga Federal · Temporada 2026</p>
          <h1
            className="font-teko font-bold uppercase leading-[0.88] tracking-tight text-white mb-6"
            style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
          >
            El Gigante<br />Tucumano
          </h1>
          <p className="font-oswald text-sm uppercase tracking-[0.12em] mb-8 max-w-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Identidad. Garra. Historia. Acompañá al equipo en su camino a lo más alto.
          </p>
          <div className="flex gap-3">
            <Link to="/equipo" className="btn-primary">Nuestra Familia</Link>
            <Link to="/galeria" className="btn-secondary">Galería</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TWO-COLUMN: Gallery + Contact preview
      ════════════════════════════════════ */}
      <section className="py-10">
        <div className="app-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Gallery card */}
            <Link to="/galeria" className="relative overflow-hidden group" style={{ borderRadius: '16px', height: '260px' }}>
              <img
                src="/gallery-stadium.png"
                alt="Photo Gallery"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)' }}
              />
              <div className="absolute bottom-5 left-5 z-10">
                <h3 className="font-teko font-bold text-3xl text-white uppercase">Photo Gallery</h3>
              </div>
              <div
                className="absolute bottom-5 right-5 w-10 h-10 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}
              >
                <ArrowDown />
              </div>
            </Link>

            {/* Contact mini form preview */}
            <div className="card p-6 flex flex-col justify-between" style={{ borderRadius: '16px' }}>
              <div>
                <h3 className="font-teko font-bold text-2xl text-white uppercase mb-4">Contacto</h3>
                <div className="space-y-3">
                  <input type="text" placeholder="Nombre" className="input-base" readOnly />
                  <input type="email" placeholder="Email" className="input-base" readOnly />
                </div>
              </div>
              <Link to="/contacto" className="btn-primary w-full mt-4">
                Enviar Mensaje
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          NEXT GAME + LAST SCORE
      ════════════════════════════════════ */}
      <section className="py-10">
        <div className="app-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Next game */}
            <div
              className="relative overflow-hidden p-6 flex flex-col justify-between"
              style={{
                background: 'var(--color-accent)',
                borderRadius: '16px',
                minHeight: '200px',
              }}
            >
              <div>
                <p className="font-oswald font-bold text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Next Game
                </p>
                <p className="font-oswald text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  04 Mayo 2026 — Ore 21:00
                </p>
                <p className="font-oswald text-[10px] uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  @Palacio de los Deportes, Tucumán
                </p>
              </div>

              <h3 className="font-teko font-bold text-5xl text-white uppercase leading-none mt-6">
                VS Gimnasia
              </h3>

              <div
                className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}
              >
                <ArrowDown />
              </div>
            </div>

            {/* Last score card — like the reference */}
            <div
              className="p-8 flex flex-col justify-center items-center text-center"
              style={{
                background: '#F5F5F0',
                borderRadius: '16px',
                color: '#121212',
              }}
            >
              <p className="font-oswald font-bold text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: '#666' }}>
                {loading ? '...' : latestMatch?.date ? new Date(latestMatch.date + 'T00:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() : '27 ABRIL 2026'}
              </p>

              <div className="flex items-center gap-6">
                <span className="font-teko font-bold leading-none" style={{ fontSize: '5rem', color: '#999' }}>
                  {loading ? '--' : latestMatch?.awayScore ?? '--'}
                </span>
                <div className="text-center">
                  <p className="font-teko font-bold text-lg uppercase tracking-wider" style={{ color: '#333', borderLeft: '3px solid var(--color-brand)', borderRight: '3px solid var(--color-brand)', padding: '4px 12px' }}>
                    Final Score
                  </p>
                  <p className="font-oswald text-[9px] uppercase tracking-[0.15em] mt-2" style={{ color: '#888' }}>
                    {loading ? '...' : `${latestMatch?.awayTeam?.name} vs ${latestMatch?.homeTeam?.name}`}
                  </p>
                </div>
                <span className="font-teko font-bold leading-none" style={{ fontSize: '5rem', color: '#121212' }}>
                  {loading ? '--' : latestMatch?.homeScore ?? '--'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BOTTOM NAV AREA — mini stats
      ════════════════════════════════════ */}
      <section className="py-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { val: '106+', label: 'Años' },
              { val: '5K+',  label: 'Socios' },
              { val: '3',    label: 'Títulos' },
              { val: '18',   label: 'Jugadores' },
            ].map((s, i) => (
              <div key={i}>
                <span className="block font-teko font-bold text-4xl text-white">{s.val}</span>
                <span className="block font-oswald text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SHOP PREVIEW
      ════════════════════════════════════ */}
      <section className="py-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-teko font-bold text-4xl text-white uppercase">Shop</h2>
            <Link to="/tienda" className="btn-ghost">Ver Todo →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Camiseta Titular', price: '$45.000' },
              { name: 'Buzo Entrenamiento', price: '$55.000' },
              { name: 'Kit Completo', price: '$85.000' },
            ].map((p, i) => (
              <Link to="/tienda" key={i} className="card group" style={{ borderRadius: '12px' }}>
                <div className="relative overflow-hidden" style={{ height: '180px' }}>
                  <img
                    src="/shop-jerseys.png"
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ opacity: 0.8 }}
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="font-oswald font-bold text-sm text-white uppercase">{p.name}</span>
                  <span className="font-teko font-bold text-xl" style={{ color: 'var(--color-accent)' }}>{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
