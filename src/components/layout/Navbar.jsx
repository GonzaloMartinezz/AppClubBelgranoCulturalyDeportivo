import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
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

  const links = [
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Stats', href: '#stats' },
    { label: 'Categorías', href: '#categories' },
    { label: 'Transacciones', href: '#transactions' }
  ];

  return (
    <>
      {/* Desktop Navbar - Estilo Creatix */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block fixed top-4 left-4 right-4 z-50"
      >
        <nav className={`max-w-6xl mx-auto bg-white rounded-full px-8 py-3 flex items-center justify-between transition-all ${
          scrolled ? 'shadow-2xl' : 'shadow-lg'
        }`}>
          {/* Left Links */}
          <div className="flex items-center gap-8">
            <a href="#dashboard" className="text-dark font-semibold text-sm hover:text-brand-dark transition-colors">
              Dashboard
            </a>
            <a href="#stats" className="text-dark font-semibold text-sm hover:text-brand-dark transition-colors">
              Stats
            </a>
          </div>

          {/* Center Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="text-brand" size={24} fill="currentColor" />
            <span className="text-2xl font-teko font-black text-dark tracking-tight">DevStats</span>
          </motion.div>

          {/* Right Links */}
          <div className="flex items-center gap-8">
            <a href="#categories" className="text-dark font-semibold text-sm hover:text-brand-dark transition-colors">
              Categorías
            </a>
            <a href="#transactions" className="text-dark font-semibold text-sm hover:text-brand-dark transition-colors">
              Historial
            </a>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden fixed top-3 left-3 right-3 z-50 bg-white rounded-full px-5 h-14 flex items-center justify-between shadow-lg"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="text-brand" size={20} fill="currentColor" />
          <span className="font-teko font-black text-dark text-lg">DevStats</span>
        </div>

        <motion.button
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-dark"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-20 left-3 right-3 z-40 bg-white rounded-2xl shadow-2xl p-5"
          >
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-dark font-semibold rounded-lg hover:bg-brand/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
