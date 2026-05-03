import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Inicio',   path: '/' },
  { label: 'Equipo',   path: '/equipo' },
  { label: 'Fixture',  path: '/fixture' },
  { label: 'Galería',  path: '/galeria' },
  { label: 'Contacto', path: '/contacto' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      {/* ── Dark horizontal bar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(18,18,18,0.97)' : 'rgba(24,24,24,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="app-container flex items-center justify-between h-16">

          {/* Logo — rounded square with lighter bg */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div
              className="w-11 h-11 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span className="font-teko font-bold text-lg text-white tracking-wider">CB</span>
            </div>
          </Link>

          {/* Desktop Links — centered */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="relative px-5 py-2 font-oswald font-bold text-[12px] uppercase tracking-[0.12em] transition-all duration-200"
                    style={{
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                      background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                      borderRadius: '10px',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.target.style.color = 'rgba(255,255,255,0.5)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right — accent TIENDA + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/tienda"
              className="font-oswald font-bold text-[12px] uppercase tracking-[0.12em] transition-colors duration-200"
              style={{
                color: location.pathname === '/tienda' ? '#F97316' : '#F97316',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.7'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Shop
            </Link>
          </div>

          {/* Mobile — compact logo + hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10"
            style={{ borderRadius: '10px', background: 'rgba(255,255,255,0.05)' }}
            aria-label="Menú"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className="block w-5 h-[1.5px] bg-white transition-all duration-300"
                style={{
                  transform: mobileOpen ? 'translateY(3.25px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-5 h-[1.5px] bg-white transition-all duration-300"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-[1.5px] bg-white transition-all duration-300"
                style={{
                  transform: mobileOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'none',
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <div
        className={`lg:hidden fixed inset-0 z-40 flex flex-col transition-all duration-400 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(18,18,18,0.98)', backdropFilter: 'blur(20px)' }}
      >
        <div className="absolute inset-0" onClick={() => setMobileOpen(false)} />

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-1 px-6">
          {[...navLinks, { label: 'Shop', path: '/tienda' }].map((link, idx) => {
            const isActive = location.pathname === link.path;
            const isShop = link.path === '/tienda';
            return (
              <Link
                key={link.path}
                to={link.path}
                className="w-full text-center py-4 font-teko font-bold text-4xl uppercase tracking-wider transition-all duration-300"
                style={{
                  color: isShop ? '#F97316' : isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                  transitionDelay: mobileOpen ? `${idx * 50}ms` : '0ms',
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
                  opacity: mobileOpen ? 1 : 0,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;