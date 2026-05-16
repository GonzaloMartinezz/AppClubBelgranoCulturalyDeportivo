import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 px-8 h-20 items-center justify-between
          ${scrolled
            ? 'bg-dark/98 border-b border-white/10 shadow-lg'
            : 'bg-dark/70'
          }
          backdrop-blur-md transition-all duration-300`}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-light rounded-lg flex items-center justify-center">
            <span className="text-white font-teko font-black text-lg">D</span>
          </div>
          <div>
            <p className="font-teko text-lg font-black text-white tracking-wider">DevAnalytics</p>
            <p className="text-xs text-muted">Web Development</p>
          </div>
        </motion.div>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-oswald uppercase text-sm tracking-wider font-bold transition-all duration-200 relative
              ${isActive ? 'text-brand' : 'text-white/70 hover:text-white'}`
            }
          >
            {({ isActive }) => (
              <>
                Dashboard
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </>
            )}
          </NavLink>

          {/* CTA Button */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-brand to-brand-light text-white font-oswald
              uppercase text-sm tracking-wider font-bold rounded-lg transition-all duration-300
              hover:shadow-lg hover:shadow-brand/50"
          >
            Exportar
          </motion.a>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`md:hidden fixed top-0 left-0 right-0 z-50 px-4 h-16 flex items-center justify-between
          bg-dark/98 border-b border-white/10 backdrop-blur-md`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-light rounded-lg flex items-center justify-center">
            <span className="text-white font-teko font-black text-sm">D</span>
          </div>
          <span className="font-teko font-black text-white text-sm">DevAnalytics</span>
        </div>

        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-white hover:text-brand transition"
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
            <div className="px-4 py-8 space-y-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-3 font-oswald uppercase tracking-wider font-bold rounded-lg transition
                  ${isActive
                    ? 'bg-brand text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                Dashboard
              </NavLink>

              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full px-4 py-3 bg-gradient-to-r from-brand to-brand-light
                  text-white font-oswald uppercase text-center font-bold rounded-lg transition-all"
              >
                Exportar
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
