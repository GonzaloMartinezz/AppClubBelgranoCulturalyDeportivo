import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api/client';

const STATUS_COLORS = {
  SCHEDULED: { bg: 'rgba(107,114,128,0.15)', color: '#9CA3AF', label: 'Programado' },
  LIVE: { bg: 'rgba(16,185,129,0.15)', color: '#10B981', label: 'EN VIVO' },
  FINAL: { bg: 'rgba(0,48,135,0.2)', color: '#60A5FA', label: 'Final' },
  SUSPENDED: { bg: 'rgba(239,68,68,0.1)', color: '#F87171', label: 'Suspendido' },
  CANCELLED: { bg: 'rgba(239,68,68,0.1)', color: '#F87171', label: 'Cancelado' },
};

const MatchCard = ({ match }) => {
  const st = STATUS_COLORS[match.status] || STATUS_COLORS.SCHEDULED;
  const isFinal = match.status === 'FINAL';
  const isLive = match.status === 'LIVE';
  const belgranoScore = match.isHome ? match.score?.home : match.score?.away;
  const rivalScore = match.isHome ? match.score?.away : match.score?.home;
  const rival = match.isHome ? match.awayTeamName : match.homeTeamName;
  const won = isFinal && belgranoScore > rivalScore;

  return (
    <div style={{
      background: '#111827', border: `1px solid ${isLive ? '#10B981' : 'rgba(255,255,255,0.06)'}`,
      borderRadius: '12px', padding: '24px', transition: 'all 0.25s',
      ...(isLive && { boxShadow: '0 0 20px rgba(16,185,129,0.2)' })
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {new Date(match.date).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}
            {match.time && ` · ${match.time}`}
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>
            {match.round || match.competitionName || 'Liga Federal 2025'} · {match.venue}
          </p>
        </div>
        <span style={{ background: st.bg, color: st.color, fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.15em', padding: '4px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {isLive && <span style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s ease-in-out infinite' }} />}
          {st.label}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', color: isFinal ? (won ? '#FFD700' : 'rgba(255,255,255,0.7)') : 'white', lineHeight: 1 }}>
            BELGRANO CyD
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>
            {match.isHome ? 'LOCAL' : 'VISITANTE'}
          </p>
        </div>

        {(isFinal || isLive) ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', color: won ? '#FFD700' : 'white', lineHeight: 0.9 }}>
                {belgranoScore ?? 0}
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>—</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', color: !won && isFinal ? '#60A5FA' : 'rgba(255,255,255,0.6)', lineHeight: 0.9 }}>
                {rivalScore ?? 0}
              </span>
            </div>
            {isLive && match.score?.quarter > 0 && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#10B981', marginTop: '4px' }}>
                Q{match.score.quarter} {match.score.quarterTime || ''}
              </p>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>VS</p>
          </div>
        )}

        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', color: 'rgba(255,255,255,0.7)', lineHeight: 1 }}>{rival}</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>
            {match.isHome ? 'VISITANTE' : 'LOCAL'}
          </p>
        </div>
      </div>

      {isLive && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to={`/live/${match._id}`} style={{ display: 'block', textAlign: 'center', background: '#10B981', color: 'white', padding: '10px', borderRadius: '8px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.1em', textDecoration: 'none' }}>
            VER EN VIVO
          </Link>
        </div>
      )}

      {isFinal && match.mvp?.playerName && (
        <p style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}>
          MVP: <strong style={{ color: '#FFD700' }}>{match.mvp.playerName}</strong>
          {match.mvp.reason && ` — ${match.mvp.reason}`}
        </p>
      )}
    </div>
  );
};

const FixturePage = () => {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/matches').then(r => setMatches(r.data?.data || [])).catch(() => setMatches([])).finally(() => setLoading(false));
  }, []);

  const filtered = matches.filter(m => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return m.status === 'SCHEDULED';
    if (filter === 'live') return m.status === 'LIVE';
    if (filter === 'results') return m.status === 'FINAL';
    return true;
  });

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.3em', color: '#FFD700', marginBottom: '12px' }}>LIGA FEDERAL 2025</p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'white', lineHeight: 0.85, marginBottom: '40px' }}>
          CALENDARIO
        </h1>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {[['all', 'Todos'], ['live', 'En Vivo'], ['upcoming', 'Próximos'], ['results', 'Resultados']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '0.1em',
                padding: '8px 18px', borderRadius: '8px', cursor: 'pointer',
                background: filter === key ? '#003087' : 'rgba(255,255,255,0.04)',
                color: filter === key ? 'white' : 'rgba(255,255,255,0.5)',
                border: `1px solid ${filter === key ? '#003087' : 'rgba(255,255,255,0.08)'}`,
                transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...Array(5)].map((_, i) => <div key={i} style={{ background: '#111827', borderRadius: '12px', height: '120px' }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '80px', fontFamily: 'Inter, sans-serif' }}>
            No hay partidos en esta categoría
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map((m, i) => <MatchCard key={m._id || i} match={m} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default FixturePage;
