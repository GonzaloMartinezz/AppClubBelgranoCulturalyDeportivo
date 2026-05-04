import { useState, useEffect } from 'react';
import api from '../core/api/client';

const positions = { BASE: 'Base', ESCOLTA: 'Escolta', ALERO: 'Alero', 'ALA-PIVOT': 'Ala-Pívot', PIVOT: 'Pívot' };

const SectionTitle = ({ title, subtitle, align = 'center' }) => (
  <div style={{ marginBottom: '40px', textAlign: align }}>
    <h2 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,4.5rem)', textTransform: 'uppercase', lineHeight: 0.9, color: 'white', letterSpacing: '-0.02em' }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)', marginTop: '8px' }}>
        {subtitle}
      </p>
    )}
  </div>
);

const fallbackPlayers = [
  { _id: 'p1', name: 'Bautista', lastName: 'Casares', number: 1, position: 'BASE' },
  { _id: 'p2', name: 'Máximo', lastName: 'Araujo', number: 2, position: 'ESCOLTA' },
  { _id: 'p3', name: 'Mario', lastName: 'González', number: 4, position: 'BASE' },
  { _id: 'p4', name: 'José Simón', lastName: 'Armando', number: 5, position: 'ALERO' },
  { _id: 'p5', name: 'Mauro', lastName: 'Ponce Moyano', number: 6, position: 'BASE' },
  { _id: 'p6', name: 'Nicolás', lastName: 'García', number: 8, position: 'ESCOLTA' },
  { _id: 'p7', name: 'Nataniel', lastName: 'Rodríguez', number: 11, position: 'ALERO' },
  { _id: 'p8', name: 'Sebastián', lastName: 'Bieschke', number: 12, position: 'PIVOT' },
  { _id: 'p9', name: 'Cristian', lastName: 'Ortiz', number: 13, position: 'ALA-PIVOT' },
  { _id: 'p10', name: 'Ulises', lastName: 'Amaya', number: 20, position: 'ESCOLTA' },
  { _id: 'p11', name: 'Sergio', lastName: 'Rojas', number: 21, position: 'PIVOT' },
  { _id: 'p12', name: 'Juan Pablo', lastName: 'Nieva', number: 22, position: 'PIVOT' }
];

const EquipoPage = () => {
  const [players, setPlayers] = useState(fallbackPlayers);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [tab, setTab] = useState('PLAYERS'); // PLAYERS | STAFF

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/players');
        if (res.data.data && res.data.data.length > 0) {
          setPlayers(res.data.data);
        }
      } catch {}
      try {
        const res2 = await api.get('/staff');
        if (res2.data.data && res2.data.data.length > 0) {
          setStaff(res2.data.data);
        }
      } catch {}
      setLoading(false);
    };
    load();

  }, []);

  const filtered = filter === 'ALL' ? players : players.filter(p => p.position === filter);
  const filters = ['ALL', 'BASE', 'ESCOLTA', 'ALERO', 'ALA-PIVOT', 'PIVOT'];

  return (
    <div style={{ background: 'var(--color-dark)', paddingTop: '68px', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '40vh', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="/hero-bg.png" alt="Equipo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,28,28,0.2) 0%, var(--color-dark) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: '0 20px' }}>
          <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '10px' }}>
            Temporada 2026
          </p>
          <h1 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: 'clamp(4rem, 15vw, 8rem)', textTransform: 'uppercase', color: 'white', lineHeight: 0.8, margin: 0 }}>
            NUESTRA FAMILIA
          </h1>
        </div>
      </section>

      {/* ── Tabs: Players / Staff ── */}
      <div className="sticky top-[68px] z-30 border-b" style={{ background: 'rgba(28,28,28,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          <div className="flex gap-2">
            {[ { key: 'PLAYERS', label: 'Jugadores' }, { key: 'STAFF', label: 'Cuerpo Técnico' } ].map((t) => (
              <button key={t.key} onClick={() => { setTab(t.key); setFilter('ALL'); }}
                className="font-oswald font-bold text-[12px] uppercase tracking-widest px-4 py-2 transition-all duration-200"
                style={{ borderRadius: '10px', background: tab === t.key ? 'var(--color-accent)' : 'transparent', color: tab === t.key ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'PLAYERS' && (
            <div className="flex gap-1.5 overflow-x-auto max-w-full scrollbar-hide pb-2 md:pb-0">
              {filters.map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className="font-oswald font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 transition-all duration-200"
                  style={{ borderRadius: '8px', background: filter === f ? 'rgba(255,255,255,0.1)' : 'transparent', color: filter === f ? '#fff' : 'rgba(255,255,255,0.35)' }}>
                  {f === 'ALL' ? 'Todos' : positions[f] || f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="app-container">
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ height: '200px', background: 'var(--color-surface-2)', borderRadius: '24px', opacity: 0.5 }} />
              ))}
            </div>
          ) : (
            <>
              <SectionTitle title={tab === 'PLAYERS' ? 'El Plantel' : 'Staff'} subtitle={`${tab === 'PLAYERS' ? filtered.length : staff.length} Miembros`} align="left" />
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridAutoRows: '200px', gap: '16px' }}>
                {(tab === 'PLAYERS' ? filtered : staff).map((p, i) => {
                  const isLarge = i % 5 === 0;
                  const isTall = i % 4 === 0 && !isLarge;
                  
                  return (
                    <div key={p._id || i} style={{ 
                      background: 'var(--color-surface-2)', 
                      borderRadius: '24px', 
                      gridColumn: isLarge ? 'span 2' : 'span 1',
                      gridRow: isTall ? 'span 2' : 'span 1',
                      position: 'relative',
                      overflow: 'hidden',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      border: '1px solid rgba(255,255,255,0.02)'
                    }}>
                      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                      
                      {/* Watermark Number */}
                      {tab === 'PLAYERS' && (
                        <div style={{ position: 'absolute', top: '10%', right: '10%', fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: isLarge ? '8rem' : '6rem', color: 'rgba(255,255,255,0.03)', lineHeight: 0.85, zIndex: 1 }}>
                          {p.number ?? '—'}
                        </div>
                      )}

                      <div style={{ position: 'relative', zIndex: 2 }}>
                        {tab === 'PLAYERS' ? (
                          <span style={{ background: 'var(--color-accent)', color: 'white', fontFamily: 'var(--font-oswald)', fontSize: '10px', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px', display: 'inline-block' }}>
                            #{p.number} {positions[p.position]}
                          </span>
                        ) : (
                          <span style={{ background: 'var(--color-surface-3)', color: 'white', fontFamily: 'var(--font-oswald)', fontSize: '10px', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px', display: 'inline-block' }}>
                            {p.role}
                          </span>
                        )}
                        <h3 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: isLarge || isTall ? '2.5rem' : '1.8rem', color: 'white', textTransform: 'uppercase', lineHeight: 0.9 }}>
                          {p.name}<br/>{p.lastName}
                        </h3>
                        
                        {/* Stats for players, Experience for Staff */}
                        {tab === 'PLAYERS' && isLarge && (
                          <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                            <div>
                              <span style={{ display: 'block', fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--color-accent)' }}>{p.careerStats?.points ?? '—'}</span>
                              <span style={{ fontFamily: 'var(--font-oswald)', fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Pts</span>
                            </div>
                            <div>
                              <span style={{ display: 'block', fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '1.2rem', color: 'white' }}>{p.careerStats?.games ?? '—'}</span>
                              <span style={{ fontFamily: 'var(--font-oswald)', fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>PJ</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {(tab === 'PLAYERS' ? filtered : staff).length === 0 && (
                <div style={{ padding: '60px', textAlign: 'center', background: 'var(--color-surface-2)', borderRadius: '24px' }}>
                  <p style={{ fontFamily: 'var(--font-oswald)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>No hay integrantes en esta sección</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default EquipoPage;
