import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const ShieldLogo = () => (
  <svg width="32" height="36" viewBox="0 0 80 90" fill="none">
    <path d="M40 2L6 16V48C6 67 21 82 40 88C59 82 74 67 74 48V16L40 2Z" fill="#1A4FD4" stroke="white" strokeWidth="2" />
    <path d="M40 12L14 24V48C14 63 25 75 40 80C55 75 66 63 66 48V24L40 12Z" fill="white" />
    <path d="M40 22L22 32V48C22 59 29 68 40 72C51 68 58 59 58 48V32L40 22Z" fill="#1A4FD4" />
  </svg>
);

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Plantel', path: '/plantel' },
  { label: 'Fixture', path: '/fixture' },
  { label: 'Posiciones', path: '/posiciones' },
  { label: 'Galería', path: '/galeria' },
  { label: 'Tienda', path: '/tienda' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  const navItem = ({ isActive }) => ({
    base: 'px-3 py-2 text-sm font-oswald uppercase tracking-wider transition-colors duration-200',
    active: isActive
      ? 'text-accent border-b-2 border-accent'
      : 'text-white/70 hover:text-white border-b-2 border-transparent',
  });

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 px-8 h-16 items-center justify-between
          ${scrolled
            ? 'bg-dark/95 border-b border-white/8'
            : 'bg-dark/70'
          }
          backdrop-blur-xl transition-all duration-300`}
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <ShieldLogo />
          <span className="font-display text-lg tracking-widest text-white hidden sm:inline">
            BELGRANO CyD
          </span>
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${navItem({ isActive }).base} ${navItem({ isActive }).active}`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* CTA Button */}
          <NavLink
            to="/socios"
            className="px-6 py-2 bg-accent text-black font-oswald uppercase text-sm tracking-wider
              rounded-sm transition-all duration-200
              hover:bg-accent-2 hover:shadow-lg"
          >
            Únete
          </NavLink>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 px-4 h-14 flex items-center justify-between
          bg-dark/95 border-b border-white/8 backdrop-blur-xl`}
      >
        <NavLink to="/" className="flex items-center gap-2">
          <ShieldLogo />
        </NavLink>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-white hover:text-accent transition"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed inset-0 top-14 z-40 bg-dark/95 backdrop-blur-xl overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `block px-4 py-3 font-oswald uppercase tracking-wider rounded-sm transition
                  ${isActive
                    ? 'bg-brand text-white'
                    : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            <NavLink
              to="/socios"
              className="block w-full px-4 py-3 bg-accent text-black font-oswald uppercase text-center
                rounded-sm transition hover:bg-accent-2"
            >
              Únete al Club
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
