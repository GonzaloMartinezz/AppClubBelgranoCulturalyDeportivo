import { useState, useEffect } from 'react';
import api from '../../core/api/client';

const StandingsPage = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/competitions/active')
      .then(r => {
        const id = r.data?.data?._id;
        if (id) return api.get(`/competitions/${id}/standings`);
        return null;
      })
      .then(r => setStandings(r?.data?.data || []))
      .catch(() => setStandings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.3em', color: '#FFD700', marginBottom: '12px' }}>LIGA FEDERAL 2025 — CONFERENCIA NORTE, GRUPO A</p>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'white', lineHeight: 0.85, marginBottom: '40px' }}>
          TABLA DE POSICIONES
        </h1>

        {loading ? (
          <div style={{ background: '#111827', borderRadius: '12px', height: '300px', animation: 'pulse 1.5s ease-in-out infinite' }} />
        ) : standings.length === 0 ? (
          <div style={{ background: '#111827', borderRadius: '16px', padding: '80px', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', color: 'rgba(255,255,255,0.3)' }}>
              TABLA NO DISPONIBLE
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.2)', marginTop: '8px' }}>
              Los datos de posiciones se cargan desde el panel de administración
            </p>
          </div>
        ) : (
          <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {['Pos', 'Equipo', 'PJ', 'G', 'P', 'PF', 'PC', 'Dif', 'Pts'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: h === 'Equipo' ? 'left' : 'center', color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {standings.sort((a, b) => a.position - b.position).map((row, i) => {
                  const isBelgrano = row.teamName?.toLowerCase().includes('belgrano');
                  return (
                    <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: isBelgrano ? 'rgba(0,48,135,0.15)' : 'transparent' }}>
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{row.position}</td>
                      <td style={{ padding: '14px 16px', color: isBelgrano ? '#FFD700' : 'white', fontWeight: isBelgrano ? 700 : 400 }}>
                        {row.teamName}
                        {isBelgrano && <span style={{ marginLeft: '8px', fontSize: '10px', background: '#003087', color: '#FFD700', padding: '2px 6px', borderRadius: '4px' }}>EL PATRIOTA</span>}
                      </td>
                      {[row.played, row.won, row.lost, row.pointsFor, row.pointsAgainst, row.difference, row.points].map((v, j) => (
                        <td key={j} style={{ padding: '14px 16px', textAlign: 'center', color: j === 6 ? '#FFD700' : 'rgba(255,255,255,0.6)', fontWeight: j === 6 ? 700 : 400 }}>{v ?? 0}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StandingsPage;
