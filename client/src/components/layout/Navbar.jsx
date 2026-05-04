import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ─── Shield logo svg inline (Club Belgrano azul/blanco) ─── */
const ShieldLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 2L6 16V48C6 67 21 82 40 88C59 82 74 67 74 48V16L40 2Z" fill="#1A3FA8" stroke="white" strokeWidth="2" />
    <path d="M40 12L14 24V48C14 63 25 75 40 80C55 75 66 63 66 48V24L40 12Z" fill="white" />
    <path d="M40 22L22 32V48C22 59 29 68 40 72C51 68 58 59 58 48V32L40 22Z" fill="#1A3FA8" />
    <text x="40" y="56" textAnchor="middle" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fontSize="14" fill="white" letterSpacing="1">CBCD</text>
  </svg>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const openMenu = () => { clearTimeout(closeTimer.current); setOpen(true); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setOpen(false), 200); };

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Equipo', path: '/equipo' },
    { label: 'Fixture', path: '/fixture' },
    { label: 'Galería', path: '/galeria' },
    { label: 'Contacto', path: '/contacto' },
    { label: 'Shop', path: '/tienda', accent: true },
  ];

  return (
    <nav
      className="fixed z-50 transition-all duration-500"
      style={{
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div
        ref={dropRef}
        className="relative flex items-center"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        style={{
          background: 'rgba(20,20,20,0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '100px',
          padding: '6px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden',
          width: open ? 'auto' : 'auto' // We rely on flex + max-width for the animation
        }}
      >
        {/* Logo Block */}
        <div style={{
          width: '46px', height: '46px',
          background: 'white',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <img src="/club-logo.png" alt="CB" style={{ width: '80%', height: '80%', objectFit: 'contain' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <ShieldLogo size={24} color="#000" />
        </div>

        {/* Hamburger / Links Container */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: open ? '500px' : '40px',
          opacity: open ? 1 : 0.8,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden'
        }}>
          
          {/* Links (only visible when expanded) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            padding: '0 20px 0 10px',
            whiteSpace: 'nowrap',
            opacity: open ? 1 : 0,
            transform: open ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: open ? '0.1s' : '0s'
          }}>
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={`#${link.path.replace('/', '') || 'hero'}`} // Anchor links for single page scroll
                style={{
                  fontFamily: 'var(--font-condensed)',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: link.accent ? '#F05A00' : 'white', // Reverting to orange accent
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#F05A00'}
                onMouseLeave={e => e.currentTarget.style.color = link.accent ? '#F05A00' : 'white'}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger (only visible when collapsed) */}
          {!open && (
            <button
              onClick={() => setOpen(true)}
              aria-label="Menú"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                padding: '10px',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                flexShrink: 0
              }}
            >
              <span style={{ display: 'block', width: '20px', height: '2px', background: 'white', borderRadius: '1px' }} />
              <span style={{ display: 'block', width: '20px', height: '2px', background: 'white', borderRadius: '1px' }} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;