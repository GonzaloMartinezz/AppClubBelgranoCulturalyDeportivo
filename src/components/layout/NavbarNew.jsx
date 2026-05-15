import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShieldLogo = () => (
  <svg width="32" height="36" viewBox="0 0 80 90" fill="none">
    <path d="M40 2L6 16V48C6 67 21 82 40 88C59 82 74 67 74 48V16L40 2Z" fill="#FFD700" stroke="white" strokeWidth="2" />
    <path d="M40 12L14 24V48C14 63 25 75 40 80C55 75 66 63 66 48V24L40 12Z" fill="white" />
    <path d="M40 22L22 32V48C22 59 29 68 40 72C51 68 58 59 58 48V32L40 22Z" fill="#FFD700" />
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

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 px-8 h-20 items-center justify-between
          ${scrolled
            ? 'bg-dark/98 border-b border-white/10 shadow-xl'
            : 'bg-dark/70'
          }
          backdrop-blur-md transition-all duration-300`}
      >
        {/* Logo with hover effect */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ShieldLogo />
          </motion.div>
          <motion.span
            className="font-teko text-xl tracking-widest text-white font-bold hidden lg:inline"
            whileHover={{ letterSpacing: '0.2em' }}
            transition={{ duration: 0.3 }}
          >
            BELGRANO CyD
          </motion.span>
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map(({ label, path }, idx) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `font-oswald uppercase text-sm tracking-wider font-bold transition-all duration-200 relative
                  ${isActive ? 'text-accent' : 'text-white/70 hover:text-white'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <NavLink
              to="/socios"
              className="px-6 py-3 bg-gradient-to-r from-accent to-yellow-500 text-black font-oswald
                uppercase text-sm tracking-wider font-bold rounded-lg transition-all duration-300
                hover:shadow-xl hover:shadow-accent/50 hover:scale-105"
            >
              Únete
            </NavLink>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`md:hidden fixed top-0 left-0 right-0 z-50 px-4 h-16 flex items-center justify-between
          bg-dark/98 border-b border-white/10 backdrop-blur-md shadow-lg`}
      >
        <NavLink to="/" className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.1 }}>
            <ShieldLogo />
          </motion.div>
        </NavLink>

        <motion.button
          onClick={() => setOpen(!open)}
          className="p-2 text-white hover:text-accent transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-16 z-40 bg-dark/95 backdrop-blur-md overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map(({ label, path }, idx) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `block px-4 py-3 font-oswald uppercase tracking-wider font-bold rounded-lg transition
                      ${isActive
                        ? 'bg-gradient-to-r from-accent to-yellow-500 text-black'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 border-t border-white/10"
              >
                <NavLink
                  to="/socios"
                  className="block w-full px-4 py-3 bg-gradient-to-r from-accent to-yellow-500
                    text-black font-oswald uppercase text-center font-bold rounded-lg transition
                    hover:shadow-lg hover:shadow-accent/50"
                >
                  Únete al Club
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
