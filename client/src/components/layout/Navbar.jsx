import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const ShieldLogo = () => (
  <svg width="32" height="36" viewBox="0 0 80 90" fill="none">
    <path d="M40 2L6 16V48C6 67 21 82 40 88C59 82 74 67 74 48V16L40 2Z" fill="#003087" stroke="white" strokeWidth="2" />
    <path d="M40 12L14 24V48C14 63 25 75 40 80C55 75 66 63 66 48V24L40 12Z" fill="white" />
    <path d="M40 22L22 32V48C22 59 29 68 40 72C51 68 58 59 58 48V32L40 22Z" fill="#003087" />
    <text x="40" y="56" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="white" letterSpacing="0.5">CyD</text>
  </svg>
);

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Plantel', path: '/plantel' },
  { label: 'Fixture', path: '/fixture' },
  { label: 'Posiciones', path: '/posiciones' },
  { label: 'Stats', path: '/estadisticas' },
  { label: 'Galería', path: '/galeria' },
  { label: 'Tienda', path: '/tienda' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <>
      {/* Desktop nav — fixed top */}
      <nav
        className="hidden md:flex"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
          transition: 'all 0.3s',
          padding: '0 32px',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <ShieldLogo />
          <span style={{ fontFamily: "var(--font-display)", fontSize: '20px', letterSpacing: '0.1em', color: 'white' }}>
            BELGRANO CyD
          </span>
        </NavLink>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                fontFamily: "var(--font-display)",
                fontSize: '15px',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                color: isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.8)',
                borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.2s',
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/socios"
            style={{
              background: 'var(--color-accent)',
              color: 'white',
              padding: '8px 18px',
              fontFamily: "var(--font-display)",
              fontSize: '14px',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            SOCIOS
          </NavLink>
        </div>
      </nav>

      {/* Mobile nav — hamburger + overlay menu */}
      <div className="md:hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        {/* Hamburger Button Container */}
        <div
          className="nav-mobile-wrap"
          style={{
            position: 'relative',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '20px',
            background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.7)',
            backdropFilter: 'blur(20px)',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
            transition: 'all 0.3s',
          }}
        >
          <div className="nav_contain">
            {/* Hamburger Button */}
            <button
              onClick={() => setOpen(!open)}
              className="nav_hamburger_wrap"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                padding: '8px',
                position: 'relative',
                zIndex: 51,
              }}
            >
              <div
                className="nav_hamburger_line"
                style={{
                  width: '24px',
                  height: '2px',
                  background: 'white',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                  transform: open ? 'rotate(45deg) translateY(10px)' : 'rotate(0)',
                }}
              />
              <div
                className="nav_hamburger_line"
                style={{
                  width: '24px',
                  height: '2px',
                  background: 'white',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                  opacity: open ? 0 : 1,
                }}
              />
              <div
                className="nav_hamburger_base"
                style={{
                  width: '24px',
                  height: '2px',
                  background: 'white',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                  transform: open ? 'rotate(-45deg) translateY(-10px)' : 'rotate(0)',
                }}
              />
            </button>
          </div>
        </div>

        {/* Menu Overlay */}
        <div
          className="menu_wrap"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 49,
            display: open ? 'flex' : 'none',
            flexDirection: 'column',
          }}
        >
          {/* Dark Backdrop */}
          <div
            className="menu_base"
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              opacity: open ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: 0,
            }}
          />

          {/* Menu Content */}
          <div
            className="menu_contain"
            style={{
              position: 'relative',
              zIndex: 1,
              paddingTop: '68px',
              paddingBottom: '40px',
              paddingLeft: '20px',
              paddingRight: '20px',
              overflowY: 'auto',
            }}
          >
            {/* Logo */}
            <NavLink
              to="/"
              className="menu_link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                marginBottom: '30px',
                transform: open ? 'translateY(0)' : 'translateY(50%)',
                opacity: open ? 1 : 0,
                transition: 'all 0.5s ease 0.1s',
              }}
            >
              <ShieldLogo />
              <span style={{ color: 'white', fontFamily: "var(--font-display)", fontSize: '16px', letterSpacing: '0.1em' }}>
                BELGRANO CyD
              </span>
            </NavLink>

            {/* Menu Links */}
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="menu_link"
                style={({ isActive }) => ({
                  display: 'block',
                  fontFamily: "var(--font-display)",
                  fontSize: '24px',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  color: isActive ? 'var(--color-accent)' : 'white',
                  padding: '12px 0',
                  textTransform: 'capitalize',
                  transform: open ? 'translateY(0)' : 'translateY(50%)',
                  opacity: open ? 1 : 0,
                  transition: `all 0.5s ease ${0.15 + idx * 0.05}s`,
                })}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Shop / Socios Link */}
            <NavLink
              to="/socios"
              className="menu_link"
              style={({ isActive }) => ({
                display: 'block',
                fontFamily: "var(--font-display)",
                fontSize: '24px',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                color: isActive ? 'var(--color-accent)' : 'white',
                padding: '12px 0',
                marginTop: '20px',
                transform: open ? 'translateY(0)' : 'translateY(50%)',
                opacity: open ? 1 : 0,
                transition: `all 0.5s ease ${0.15 + navLinks.length * 0.05}s`,
              })}
            >
              SOCIOS
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
