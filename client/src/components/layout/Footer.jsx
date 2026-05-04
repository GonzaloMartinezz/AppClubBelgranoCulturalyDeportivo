import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>

    {/* ── Sponsors strip ── */}
    <div style={{ background: 'var(--color-surface-2)', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '28px 0' }}>
      <div className="app-container text-center mb-4">
        <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          Club Belgrano Cultural y Deportivo se sostiene gracias al apoyo de nuestros socios y patrocinadores
        </p>
      </div>
      {/* Marquee logos placeholder */}
      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', padding: '0 40px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Liga Federal', 'Asociación Tucumana', 'Municipalidad SMT', 'Sport Club', 'BasketTuc'].map((s) => (
            <span
              key={s}
              style={{
                fontFamily: 'var(--font-condensed)',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* ── Info strip ── */}
    <div
      style={{
        background: 'var(--color-accent)',
        padding: '10px 0',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="app-container flex items-center justify-between flex-wrap gap-2">
        <a
          href="mailto:info@clubbelgrano.com"
          style={{ fontFamily: 'var(--font-oswald)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}
        >
          MAIL → INFO@CLUBBELGRANO.COM
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          style={{ fontFamily: 'var(--font-oswald)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}
        >
          INSTAGRAM → @CLUBBELGRANOTUC
        </a>
      </div>
    </div>

    {/* ── MEGA NAME block ── */}
    <div
      style={{
        background: 'var(--color-accent)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ padding: '20px 0 16px', overflow: 'hidden' }}>
        <p
          style={{
            fontFamily: 'var(--font-condensed)',
            fontWeight: 900,
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.18)',
            whiteSpace: 'nowrap',
            paddingLeft: '28px',
            paddingRight: '28px',
          }}
        >
          CLUB BELGRANO CULTURAL Y DEPORTIVO
        </p>
      </div>

      {/* Bottom row: privacy + nav logo + copyright */}
      <div
        className="app-container flex items-center justify-between flex-wrap gap-4"
        style={{ paddingTop: '0', paddingBottom: '20px' }}
      >
        <Link
          to="/"
          style={{ fontFamily: 'var(--font-oswald)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}
        >
          Política de Privacidad
        </Link>

        {/* Center shield */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <img src="/club-logo.png" alt="CB" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px', filter: 'brightness(0) invert(1)' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          <div style={{
            width: '44px', height: '44px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <rect width="20" height="2" rx="1" fill="rgba(255,255,255,0.6)"/>
              <rect y="6" width="20" height="2" rx="1" fill="rgba(255,255,255,0.6)"/>
              <rect y="12" width="20" height="2" rx="1" fill="rgba(255,255,255,0.6)"/>
            </svg>
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
          © 2026 Club Belgrano · SMT
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
