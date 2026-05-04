import { useState, useEffect } from 'react';
import api from '../core/api/client';

const fmt = (dateStr) => {
  if (!dateStr) return {};
  const d = new Date(dateStr);
  return {
    day:   d.toLocaleDateString('es-AR', { day: '2-digit' }),
    month: d.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase(),
    full:  d.toLocaleDateString('es-AR', { weekday:'short', day:'2-digit', month:'short' }).toUpperCase(),
  };
};

const STATUS_MAP = {
  FINALIZADO: { label:'Final', color:'rgba(255,255,255,0.3)' },
  EN_JUEGO:   { label:'En juego', color:'#4ade80' },
  PROGRAMADO: { label:'Programado', color:'var(--color-accent)' },
  SUSPENDIDO: { label:'Suspendido', color:'#F87171' },
};

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

const fallbackMatches = [
  { _id: 'm1', date: new Date('2026-05-06T21:30:00'), time: '21:30', homeTeam: { name: 'Gimnasia y Tiro' }, awayTeam: { name: 'Belgrano' }, venue: 'Salta', status: 'PROGRAMADO' },
  { _id: 'm2', date: new Date('2026-05-10T21:00:00'), time: '21:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Jujuy Básquet' }, venue: 'Augusto Machado', status: 'PROGRAMADO' },
  { _id: 'm_last', date: new Date('2026-04-24T22:00:00'), time: '22:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Talleres de Tafí Viejo' }, venue: 'Augusto Machado', status: 'FINALIZADO', score: { home: 76, away: 71 } },
  { _id: 'm_p1', date: new Date('2026-04-18T21:00:00'), time: '21:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Nicolás Avellaneda' }, venue: 'Augusto Machado', status: 'FINALIZADO', score: { home: 68, away: 56 } },
  { _id: 'm_p2', date: new Date('2026-04-12T22:00:00'), time: '22:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Asociación Mitre' }, venue: 'Augusto Machado', status: 'FINALIZADO', score: { home: 82, away: 74 } },
  { _id: 'm_p3', date: new Date('2026-04-08T21:30:00'), time: '21:30', homeTeam: { name: 'San Martín' }, awayTeam: { name: 'Belgrano' }, venue: 'Complejo Natalio Mirkin', status: 'FINALIZADO', score: { home: 83, away: 74 } }
];

const FixturePage = () => {
  const [matches, setMatches] = useState(fallbackMatches);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState('ALL');

  useEffect(() => {
    api.get('/matches?sort=-date&limit=30')
      .then(r => {
        if (r.data.data && r.data.data.length > 0) {
          setMatches(r.data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL' ? matches
    : filter === 'DONE' ? matches.filter(m => m.status === 'FINALIZADO')
    : matches.filter(m => m.status === 'PROGRAMADO');

  const FILTERS = [{ k:'ALL', l:'Todos' }, { k:'PENDING', l:'Próximos' }, { k:'DONE', l:'Resultados' }];

  return (
    <div style={{ background:'var(--color-dark)', paddingTop:'68px', minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '40vh', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="/fans-crowd.png" alt="Fixture" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,28,28,0.2) 0%, var(--color-dark) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: '0 20px' }}>
          <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '10px' }}>
            Temporada 2026
          </p>
          <h1 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: 'clamp(4rem, 15vw, 8rem)', textTransform: 'uppercase', color: 'white', lineHeight: 0.8, margin: 0 }}>
            FIXTURE
          </h1>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[68px] z-30" style={{ background:'rgba(28,28,28,0.95)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div className="app-container flex justify-center py-4">
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <button key={f.k} onClick={() => setFilter(f.k)}
                className="font-oswald font-bold text-[12px] uppercase tracking-widest px-4 py-2 transition-all duration-200"
                style={{ borderRadius: '10px', background: filter === f.k ? 'var(--color-accent)' : 'transparent', color: filter === f.k ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                {f.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Match list */}
      <section style={{ padding:'80px 0' }}>
        <div className="app-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              {Array(6).fill(0).map((_,i) => (
                <div key={i} style={{ height:'100px', background:'var(--color-surface-2)', borderRadius: '24px', opacity:0.4 }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 0', background: 'var(--color-surface-2)', borderRadius: '24px' }}>
              <p style={{ fontFamily:'var(--font-oswald)', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
                No hay partidos disponibles
              </p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              {filtered.map((m, i) => {
                const { day, month } = fmt(m.date);
                const fin = m.status === 'FINALIZADO';
                const belHome = (m.homeTeam?.name||'').toLowerCase().includes('belgrano');
                const belScore = belHome ? m.score?.home : m.score?.away;
                const rivScore = belHome ? m.score?.away : m.score?.home;
                const rival    = belHome ? m.awayTeam?.name : m.homeTeam?.name;
                const won      = fin && belScore > rivScore;
                const st       = STATUS_MAP[m.status] || STATUS_MAP.PROGRAMADO;
                
                // Color alternates
                const cardColors = ['#1D4ED8', '#B91C1C', '#047857', '#C2410C'];
                const bgColor = cardColors[i % cardColors.length];

                return (
                  <div key={m._id}
                    style={{ 
                      display:'flex', 
                      alignItems:'center', 
                      gap:'20px', 
                      padding:'20px 24px', 
                      background: fin ? 'var(--color-surface-2)' : bgColor,
                      borderRadius: '24px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {/* Date Block */}
                    <div style={{ 
                      minWidth:'60px', 
                      textAlign:'center', 
                      flexShrink:0,
                      background: 'rgba(255,255,255,0.95)',
                      color: 'var(--color-dark)',
                      padding: '10px',
                      borderRadius: '16px'
                    }}>
                      <span style={{ display:'block', fontFamily:'var(--font-condensed)', fontWeight:900, fontSize:'1.8rem', lineHeight:1 }}>{day || '—'}</span>
                      <span style={{ fontFamily:'var(--font-oswald)', fontSize:'10px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}>{month || '—'}</span>
                    </div>

                    {/* Teams */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontFamily:'var(--font-condensed)', fontWeight:900, fontSize:'1.5rem', textTransform:'uppercase', color:'white', lineHeight:1, marginBottom:'4px' }}>
                        BELGRANO <span style={{ color: fin ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.7)', fontSize: '1rem', margin: '0 8px' }}>VS</span> {rival || 'RIVAL'}
                      </p>
                      <p style={{ fontFamily:'var(--font-oswald)', fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)' }}>
                        {m.venue || 'Estadio Local'} · {m.time || '18:00'}hs
                        {m.competition?.name && ` · ${m.competition.name}`}
                      </p>
                    </div>

                    {/* Score / Status */}
                    {fin ? (
                      <div style={{ textAlign:'right', flexShrink:0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontFamily:'var(--font-condensed)', fontWeight:900, fontSize:'2rem', color: won ? 'var(--color-accent)' : 'white', lineHeight:1 }}>
                          {belScore} - {rivScore}
                        </span>
                        <span style={{ fontFamily:'var(--font-oswald)', fontSize:'9px', letterSpacing:'0.12em', textTransform:'uppercase', color: won ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px', marginTop: '4px' }}>
                          {won ? 'Victoria' : 'Derrota'}
                        </span>
                      </div>
                    ) : (
                      <button className="btn-secondary" style={{ flexShrink: 0, padding: '8px 16px', fontSize: '11px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}>
                        Ver Detalles
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FixturePage;
