import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../core/api/client';
import { useLiveMatch } from './hooks/useLiveMatch';

const LiveDot = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
    <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s ease-in-out infinite' }} />
    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '0.2em', color: '#10B981' }}>EN VIVO</span>
  </span>
);

const LiveMatchPage = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const { score, boxScore, setBoxScore, isConnected } = useLiveMatch(id);

  useEffect(() => {
    api.get(`/matches/${id}`)
      .then(r => {
        const m = r.data?.data;
        setMatch(m);
        if (m?.boxScore) setBoxScore(m.boxScore);
        if (m?.score) {
          // initial score from DB
        }
      })
      .catch(() => setMatch(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif' }}>Cargando partido...</p>
    </div>
  );

  if (!match) return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px' }}>PARTIDO NO ENCONTRADO</p>
      <Link to="/fixture" style={{ color: '#003087', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>← Volver al fixture</Link>
    </div>
  );

  const liveScore = score.home || score.away ? score : match.score;
  const homeScore = match.isHome ? liveScore?.home : liveScore?.away;
  const awayScore = match.isHome ? liveScore?.away : liveScore?.home;

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {match.status === 'LIVE' ? <LiveDot /> : (
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                {match.status === 'FINAL' ? 'FINAL' : 'PROGRAMADO'}
              </span>
            )}
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
              {match.competitionName} · {match.round || ''}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isConnected ? '#10B981' : '#F87171', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
              {isConnected ? 'Conectado' : 'Sin conexión'}
            </span>
          </div>
        </div>

        {/* Scoreboard */}
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '48px 32px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.15em', color: '#FFD700', marginBottom: '8px' }}>
                {match.isHome ? 'LOCAL' : 'VISITANTE'}
              </p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'white' }}>BELGRANO CyD</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(5rem, 12vw, 9rem)', color: 'white', lineHeight: 0.85, marginTop: '8px' }}>
                {homeScore ?? 0}
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>
                Q{liveScore?.quarter || 0}
              </p>
              {liveScore?.quarterTime && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px', color: '#10B981', fontWeight: 700 }}>
                  {liveScore.quarterTime}
                </p>
              )}
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                {match.isHome ? 'VISITANTE' : 'LOCAL'}
              </p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.8)' }}>
                {match.isHome ? match.awayTeamName : match.homeTeamName}
              </p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(5rem, 12vw, 9rem)', color: 'rgba(255,255,255,0.7)', lineHeight: 0.85, marginTop: '8px' }}>
                {awayScore ?? 0}
              </p>
            </div>
          </div>

          {/* Parciales */}
          {liveScore?.quarterScores?.length > 0 && (
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}>PARCIALES</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {liveScore.quarterScores.map((q, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px 16px', textAlign: 'center' }}>
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>Q{q.quarter}</p>
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: 'white' }}>{q.home}–{q.away}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Box Score */}
        {boxScore.length > 0 && (
          <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.12em', color: 'white' }}>BOX SCORE</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                    {['#', 'Jugador', 'PTS', 'REB', 'AST', 'ROB', 'TAP', 'F'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: h === 'Jugador' ? 'left' : 'center', color: 'rgba(255,255,255,0.35)', fontWeight: 600, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {boxScore.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '10px 12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>{row.playerNumber || '—'}</td>
                      <td style={{ padding: '10px 12px', color: 'white', fontWeight: 500 }}>{row.playerName || '—'}</td>
                      {[row.points, row.rebounds, row.assists, row.steals, row.blocks, row.fouls].map((v, j) => (
                        <td key={j} style={{ padding: '10px 12px', textAlign: 'center', color: j === 0 ? '#FFD700' : 'rgba(255,255,255,0.6)', fontWeight: j === 0 ? 700 : 400 }}>{v ?? 0}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {match.status !== 'LIVE' && (
          <p style={{ textAlign: 'center', marginTop: '40px', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
            El Match Center en vivo se activa cuando el partido tiene estado "LIVE"
          </p>
        )}
      </div>
    </div>
  );
};

export default LiveMatchPage;
