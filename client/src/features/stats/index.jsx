import { useState, useEffect } from 'react';
import api from '../../core/api/client';
import { POSITIONS } from '../../app/constants';

const STAT_TABS = [
  { key: 'top-scorers', label: 'Anotadores', stat: 'PTS' },
  { key: 'top-rebounds', label: 'Rebotes', stat: 'REB' },
  { key: 'top-assists', label: 'Asistencias', stat: 'AST' },
];

const StatsPage = () => {
  const [tab, setTab] = useState('top-scorers');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/stats/${tab}`)
      .then(r => setData(r.data?.data || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [tab]);

  const currentStat = STAT_TABS.find(t => t.key === tab);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.3em', color: '#FFD700', marginBottom: '12px' }}>LIGA FEDERAL 2025</p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'white', lineHeight: 0.85, marginBottom: '40px' }}>
          ESTADÍSTICAS
        </h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0' }}>
          {STAT_TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '15px', letterSpacing: '0.1em',
                color: tab === t.key ? 'white' : 'rgba(255,255,255,0.3)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 20px',
                borderBottom: tab === t.key ? '2px solid #FFD700' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[...Array(5)].map((_, i) => <div key={i} style={{ background: '#111827', borderRadius: '12px', height: '72px' }} />)}
          </div>
        ) : data.length === 0 ? (
          <div style={{ background: '#111827', borderRadius: '16px', padding: '80px', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', color: 'rgba(255,255,255,0.3)' }}>
              SIN DATOS DISPONIBLES
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.2)', marginTop: '8px' }}>
              Ejecutá el seeder para cargar los datos del plantel
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.map((player, i) => {
              const statValue = tab === 'top-scorers' ? player.careerStats?.points
                : tab === 'top-rebounds' ? player.careerStats?.rebounds
                : player.careerStats?.assists;
              return (
                <div key={player._id || i} style={{
                  background: '#111827', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px', padding: '16px 24px',
                  display: 'flex', alignItems: 'center', gap: '20px',
                  ...(i === 0 && { borderColor: '#FFD700', background: 'rgba(255,215,0,0.05)' }),
                }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: i === 0 ? '#FFD700' : 'rgba(255,255,255,0.2)', width: '40px', textAlign: 'center' }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: 'white', lineHeight: 1 }}>
                      {player.name} {player.lastName}
                      {player.isCaptain && <span style={{ marginLeft: '8px', fontSize: '11px', background: '#003087', color: '#FFD700', padding: '2px 6px', borderRadius: '4px' }}>C</span>}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>
                      {POSITIONS[player.position]} · #{player.number}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: i === 0 ? '#FFD700' : 'white', lineHeight: 0.9 }}>
                      {statValue || 0}
                    </p>
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                      {currentStat?.stat}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsPage;
