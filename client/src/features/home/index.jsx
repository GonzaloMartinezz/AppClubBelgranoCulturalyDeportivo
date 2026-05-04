import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api/client';

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Countdown = ({ date }) => {
  const [diff, setDiff] = useState(null);
  useEffect(() => {
    const tick = () => {
      const ms = new Date(date) - Date.now();
      if (ms <= 0) { setDiff(null); return; }
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms % 86400000) / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      setDiff({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [date]);
  if (!diff) return null;
  return (
    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
      {[['d', diff.d], ['h', diff.h], ['m', diff.m], ['s', diff.s]].map(([l, v]) => (
        <div key={l} style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#FFD700', lineHeight: 1 }}>{String(v).padStart(2, '0')}</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{l}</div>
        </div>
      ))}
    </div>
  );
};

const SponsorMarquee = () => {
  const sponsors = ['Liga Federal CAB', 'Municipalidad de SMT', 'Asociación Tucumana', 'BasketTuc', 'Sport Club', 'El Patriota 1906'];
  return (
    <div style={{ overflow: 'hidden', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{
        display: 'flex', gap: '80px', whiteSpace: 'nowrap',
        animation: 'marquee 25s linear infinite', width: 'max-content',
      }}>
        {[...sponsors, ...sponsors].map((s, i) => (
          <span key={i} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
          }}>
            {s} ★
          </span>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [latestMatch, setLatestMatch] = useState(null);
  const [nextMatch, setNextMatch] = useState(null);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/matches/latest').catch(() => null),
      api.get('/matches/next').catch(() => null),
      api.get('/matches/upcoming?n=5').catch(() => null),
    ]).then(([latest, next, upcoming]) => {
      setLatestMatch(latest?.data?.data || {
        homeTeamName: 'Belgrano CyD', awayTeamName: 'Bochas Sport Club',
        score: { home: 81, away: 72 }, status: 'FINAL',
        date: '2025-03-15', competitionName: 'Liga Federal 2025',
        mvp: { playerName: 'Iván Albornoz', reason: '18 PTS, 12 REB' }
      });
      setNextMatch(next?.data?.data || {
        homeTeamName: 'Belgrano CyD', awayTeamName: 'Por confirmar',
        date: new Date(Date.now() + 7 * 86400000).toISOString(),
        time: '21:00', venue: 'Estadio Julio César Figueroa',
        competitionName: 'Liga Federal 2025'
      });
      setUpcomingMatches(upcoming?.data?.data || []);
    }).finally(() => setLoading(false));
  }, []);

  const isBelgranoHome = (m) => m?.homeTeamName?.toLowerCase().includes('belgrano');

  return (
    <div style={{ background: '#0A0A0A', paddingTop: '64px' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #001a4d 0%, #0A0A0A 60%, #0A0A0A 100%)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.04, pointerEvents: 'none', lineHeight: 0.8, overflow: 'hidden' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'min(40vw, 400px)', fontWeight: 900, color: 'white' }}>1906</span>
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.35em', color: '#FFD700', marginBottom: '16px' }}>
            LIGA FEDERAL 2025 — CONFERENCIA NORTE
          </p>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'min(22vw, 180px)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            color: 'white',
          }}>
            BELGRANO
          </h1>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'min(8vw, 52px)', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
            EL PATRIOTA ★ 1906
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap' }}>
            <Link to="/fixture" style={{
              background: '#003087', color: 'white', padding: '14px 32px',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.12em',
              textDecoration: 'none', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}>
              VER FIXTURE <ArrowRight />
            </Link>
            <Link to="/plantel" style={{
              background: 'transparent', color: 'white', padding: '14px 32px',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.12em',
              textDecoration: 'none', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}>
              NUESTRO PLANTEL
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }}>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, white, transparent)', margin: '0 auto' }} />
        </div>
      </section>

      {/* ── SCOREBOARD + PRÓXIMO PARTIDO ── */}
      <section style={{ padding: '80px 24px', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

          {/* Último resultado */}
          <div style={{
            background: '#F5F5F0', borderRadius: '16px', padding: '48px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', position: 'relative', overflow: 'hidden', minHeight: '280px',
          }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: '#999', marginBottom: '24px' }}>
              {latestMatch?.date ? new Date(latestMatch.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() : 'ÚLTIMO RESULTADO'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', width: '100%', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#111', lineHeight: 0.9 }}>
                  {loading ? '--' : latestMatch?.score?.home ?? '--'}
                </div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.15em', color: '#888', marginTop: '4px' }}>
                  {latestMatch?.homeTeamName || 'LOCAL'}
                </p>
              </div>
              <div style={{ padding: '0 16px', borderLeft: '3px solid #003087', borderRight: '3px solid #003087' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em', color: '#003087' }}>FINAL</div>
                <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{latestMatch?.competitionName || 'Liga Federal'}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#111', lineHeight: 0.9 }}>
                  {loading ? '--' : latestMatch?.score?.away ?? '--'}
                </div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.15em', color: '#888', marginTop: '4px' }}>
                  {latestMatch?.awayTeamName || 'VISITANTE'}
                </p>
              </div>
            </div>
            {latestMatch?.mvp?.playerName && (
              <p style={{ marginTop: '24px', fontSize: '12px', color: '#666', fontFamily: 'Inter, sans-serif' }}>
                MVP: <strong>{latestMatch.mvp.playerName}</strong> — {latestMatch.mvp.reason}
              </p>
            )}
          </div>

          {/* Próximo partido */}
          <div style={{
            background: '#003087', borderRadius: '16px', padding: '48px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: '280px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.08 }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '160px', lineHeight: 1 }}>🏀</span>
            </div>
            <div>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                PRÓXIMO PARTIDO
              </p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)' }}>
                {nextMatch?.date ? new Date(nextMatch.date).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase() : 'POR CONFIRMAR'}
                {nextMatch?.time && ` — ${nextMatch.time}`}
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                {nextMatch?.venue}
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', lineHeight: 0.9 }}>
                VS {nextMatch?.awayTeamName || 'POR CONFIRMAR'}
              </h3>
              {nextMatch?.date && <Countdown date={nextMatch.date} />}
            </div>
            <Link to="/fixture" style={{ color: '#FFD700', display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.1em', textDecoration: 'none', marginTop: '16px' }}>
              VER FIXTURE COMPLETO <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FIXTURE STRIP ── */}
      {upcomingMatches.length > 0 && (
        <section style={{ padding: '0 0 60px', background: '#0A0A0A' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>
              PRÓXIMAS FECHAS
            </p>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {upcomingMatches.map((m, i) => (
                <div key={m._id || i} style={{
                  flexShrink: 0, background: '#111827', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px', padding: '16px 20px', minWidth: '160px', textAlign: 'center',
                }}>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                    {new Date(m.date).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }).toUpperCase()}
                  </p>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '15px', color: 'white', marginTop: '6px' }}>
                    VS {m.isHome ? m.awayTeamName : m.homeTeamName}
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{m.time}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DESDE 1906 ── */}
      <section style={{ padding: '100px 24px', background: '#111827' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.3em', color: '#FFD700', marginBottom: '24px' }}>
            IDENTIDAD · GARRA · HISTORIA
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: 'white', lineHeight: 0.9, letterSpacing: '-0.01em' }}>
            DESDE 1906,<br />SOMOS EL PATRIOTA
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginTop: '32px', maxWidth: '600px', margin: '32px auto 0' }}>
            Más de un siglo de historia llevando el nombre de Belgrano a cada cancha de Argentina.
            En la Liga Federal 2025, el Patriota sigue escribiendo su legado.
          </p>
          <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '60px', flexWrap: 'wrap' }}>
            {[['1906', 'Año de fundación'], ['Liga Federal', 'Competencia 2025'], ['El Patriota', 'Nuestro apodo'], ['Tucumán', 'Nuestra provincia']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', color: '#FFD700', lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCKS DIAGONAL ── */}
      <section style={{ padding: '40px 0 80px', background: '#0A0A0A' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { label: 'Nuestra Familia', sub: 'Plantel + Cuerpo Técnico 2025', link: '/plantel', align: 'left' },
            { label: 'Photo Gallery', sub: 'Momentos únicos', link: '/galeria', align: 'right' },
            { label: 'Tienda Oficial', sub: 'Indumentaria del club', link: '/tienda', align: 'left' },
          ].map((block, i) => (
            <Link key={i} to={block.link} style={{
              display: 'block', width: block.align === 'right' ? '65%' : '65%',
              marginLeft: block.align === 'right' ? 'auto' : 0,
              background: '#003087', padding: '60px 48px',
              textDecoration: 'none',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {block.sub}
              </p>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', lineHeight: 0.9 }}>
                {block.label}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: '#FFD700', fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.1em' }}>
                VER MÁS <ArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <SponsorMarquee />

    </div>
  );
};

export default HomePage;
