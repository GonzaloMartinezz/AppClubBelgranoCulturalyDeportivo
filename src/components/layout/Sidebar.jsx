import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Calendar, Table, ShoppingBag, CreditCard, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setIsExpanded(false);
  }, [location, isMobile]);

  const menuItems = [
    { to: '/', label: 'HOME', icon: Home },
    { to: '/plantel', label: 'PLANTEL', icon: Users },
    { to: '/fixture', label: 'FIXTURE', icon: Calendar },
    { to: '/posiciones', label: 'TABLA', icon: Table },
    { to: '/tienda', label: 'SHOP', icon: ShoppingBag },
    { to: '/socios', label: 'SOCIOS', icon: CreditCard },
  ];

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ 
          width: isExpanded ? (isMobile ? '100%' : '1100px') : (isMobile ? '141px' : '161px'),
          x: '-50%'
        }}
        className="fixed top-0 left-1/2 z-[1001] bg-black border-b border-white/20 overflow-hidden"
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
        onClick={() => isMobile && setIsExpanded(!isExpanded)}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex w-full h-[60px] md:h-[80px] items-center justify-between">

          {/* Logo Box */}
          <div className="w-[70px] h-[60px] md:w-[80px] md:h-[80px] bg-white flex items-center justify-center border-r border-white/20 shrink-0 z-50">
            <svg width="45" height="55" viewBox="0 0 100 120" className="md:w-[60px] md:h-[70px]" fill="none">
              <path d="M50 5L10 25V60C10 85 30 105 50 115C70 105 90 85 90 60V25L50 5Z" fill="white" stroke="#003087" strokeWidth="2" />
              <path d="M50 5L10 25V55H90V25L50 5Z" fill="#003087" />
              <text x="50" y="38" textAnchor="middle" fill="#003087" fontSize="12" fontWeight="900" fontFamily="Barlow Condensed">CBCD</text>
            </svg>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex flex-1 items-center justify-evenly">
            <AnimatePresence>
              {isExpanded && menuItems.map((item) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `
                      px-6 h-[80px] flex items-center gap-3 transition-all duration-300 relative group
                      ${isActive ? 'text-[#2962FF]' : 'text-white/60 hover:text-white'}
                    `}
                  >
                    <item.icon size={16} />
                    <span className="text-[11px] font-black tracking-[0.3em] uppercase italic group-hover:scale-105 transition-transform">
                      {item.label}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Hamburger Box */}
          <div className="w-[70px] h-[60px] md:w-[80px] md:h-[80px] bg-black flex items-center justify-center shrink-0 border-l border-white/20 z-50">
             {isExpanded ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobile && isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[1000] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `
                      text-5xl font-black italic uppercase tracking-tighter transition-all
                      ${isActive ? 'text-[#2962FF]' : 'text-white/40'}
                    `}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
              <span className="text-6xl font-black italic uppercase tracking-tighter whitespace-nowrap">CLUB BELGRANO</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
