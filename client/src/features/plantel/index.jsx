import { useState, useEffect } from 'react';
import api from '../../core/api/client';
import { POSITIONS } from '../../app/constants';

const CATEGORIES = [
  { key: 'all', label: 'Plantel Principal' },
  { key: 'juvenil', label: 'Juveniles' },
  { key: 'staff', label: 'Cuerpo Técnico' },
];

const PlayerCard = ({ player, onClick }) => (
  <button
    onClick={() => onClick(player)}
    style={{
      background: '#111827', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px', overflow: 'hidden', cursor: 'pointer',
      transition: 'all 0.25s', textAlign: 'left', padding: 0, width: '100%',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#003087'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
  >
    <div style={{ background: '#003087', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '56px', color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>
        {player.number ?? '—'}
      </span>
      {player.isCaptain && (
        <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#FFD700', color: '#000', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', padding: '2px 8px', borderRadius: '4px' }}>
          CAPITÁN
        </div>
      )}
    </div>
    <div style={{ padding: '16px' }}>
      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: 'white', lineHeight: 1.1 }}>
        {player.name} {player.lastName}
      </p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#FFD700', marginTop: '4px', letterSpacing: '0.05em' }}>
        {POSITIONS[player.position] || player.position}
      </p>
      {player.origin && (
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>📍 {player.origin}</p>
      )}
    </div>
  </button>
);

const PlayerModal = ({ player, onClose }) => {
  if (!player) return null;
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#111827', borderRadius: '16px', padding: '48px', maxWidth: '480px', width: '100%', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#FFD700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {POSITIONS[player.position] || player.position}
            </p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', color: 'white', lineHeight: 1, marginTop: '4px' }}>
              {player.name} {player.lastName}
            </h2>
          </div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '64px', color: 'rgba(255,255,255,0.1)', lineHeight: 0.8 }}>
            #{player.number ?? '—'}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            ['Posición', POSITIONS[player.position] || player.position],
            ['Número', player.number ?? 'N/A'],
            ['Procedencia', player.origin || 'Tucumán'],
            ['Estado', player.status || 'Activo'],
            ['PJ', player.careerStats?.matchesPlayed || 0],
            ['PTS', player.careerStats?.points || 0],
            ['REB', player.careerStats?.rebounds || 0],
            ['AST', player.careerStats?.assists || 0],
          ].map(([label, val]) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '12px 16px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', color: 'white', marginTop: '2px' }}>{val}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{ marginTop: '24px', width: '100%', background: '#003087', color: 'white', padding: '12px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.1em', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          CERRAR
        </button>
      </div>
    </div>
  );
};

const PlantelPage = () => {
  const [players, setPlayers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [tab, setTab] = useState('all');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/players').catch(() => null),
      api.get('/staff').catch(() => null),
    ]).then(([pRes, sRes]) => {
      setPlayers(pRes?.data?.data || []);
      setStaff(sRes?.data?.data || []);
    }).finally(() => setLoading(false));
  }, []);

  const principal = players.filter(p => !p.isJuvenil && !p.isU21);
  const juveniles = players.filter(p => p.isJuvenil || p.isU21);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div style={{ padding: '60px 24px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.3em', color: '#FFD700', marginBottom: '12px' }}>TEMPORADA 2025</p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'white', lineHeight: 0.85, letterSpacing: '-0.01em' }}>
          NUESTRA<br />FAMILIA
        </h1>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: '4px', marginTop: '32px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setTab(cat.key)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '15px', letterSpacing: '0.1em',
                color: tab === cat.key ? 'white' : 'rgba(255,255,255,0.3)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 20px',
                borderBottom: tab === cat.key ? '2px solid #FFD700' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ background: '#111827', borderRadius: '12px', height: '200px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : tab === 'staff' ? (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {staff.map((s, i) => (
                <div key={s._id || i} style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px' }}>
                  <div style={{ width: '56px', height: '56px', background: '#003087', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', color: 'white' }}>
                      {s.name[0]}{s.lastName[0]}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: 'white', lineHeight: 1.1 }}>{s.name} {s.lastName}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#FFD700', marginTop: '6px' }}>{s.roleDisplay}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
              {(tab === 'all' ? principal : juveniles).map((p, i) => (
                <PlayerCard key={p._id || i} player={p} onClick={setSelected} />
              ))}
            </div>
            {tab === 'all' && principal.length === 0 && !loading && (
              <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '60px', fontFamily: 'Inter, sans-serif' }}>
                No hay jugadores cargados. Ejecutá <code>npm run seed</code> en el servidor.
              </p>
            )}
          </div>
        )}
      </div>

      <PlayerModal player={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default PlantelPage;
