import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu on route change for mobile
  useEffect(() => {
    if (isMobile) setIsExpanded(false);
  }, [location, isMobile]);

  const menuItems = [
    { to: '/', label: 'HOME' },
    { to: '/plantel', label: 'PLANTEL' },
    { to: '/fixture', label: 'FIXTURE' },
    { to: '/posiciones', label: 'TABLA' },
    { to: '/tienda', label: 'SHOP' },
    { to: '/socios', label: 'SOCIOS' },
  ];

  return (
    <>
      <nav
        className={`
          fixed top-0 left-1/2 -translate-x-1/2 z-1001 flex bg-black border-b border-white transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) overflow-hidden
          ${isExpanded ? 'w-full md:w-[1100px]' : 'w-[141px] md:w-[161px]'}
        `}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
        onClick={() => isMobile && setIsExpanded(!isExpanded)}
      >
        <div className="flex w-full h-[60px] md:h-[80px] items-center justify-between">

          {/* Logo Box */}
          <div className="w-[70px] h-[60px] md:w-[80px] md:h-[80px] bg-white flex items-center justify-center border-r border-white shrink-0 z-50">
            <svg width="45" height="55" viewBox="0 0 100 120" className="md:w-[60px] md:h-[70px]" fill="none">
              <path d="M50 5L10 25V60C10 85 30 105 50 115C70 105 90 85 90 60V25L50 5Z" fill="white" stroke="#003087" strokeWidth="2" />
              <path d="M50 5L10 25V55H90V25L50 5Z" fill="#003087" />
              <path d="M50 15L30 35L50 55L70 35L50 15Z" fill="white" />
              <path d="M50 15L30 35L50 55L70 35L50 15Z" stroke="#003087" strokeWidth="1" />
              <text x="50" y="38" textAnchor="middle" fill="#003087" fontSize="12" fontWeight="900" fontFamily="Barlow Condensed">CBCD</text>
            </svg>
          </div>

          {/* Desktop Menu Items */}
          <div className={`hidden md:flex flex-1 items-center justify-evenly transition-all duration-500 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  px-6 h-[80px] flex items-center justify-center transition-all duration-300 relative group
                  ${isActive ? 'text-[#2962FF]' : 'text-white hover:text-[#2962FF]'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className="text-[11px] font-black tracking-[0.3em] uppercase italic group-hover:scale-110 transition-transform">
                      {item.label}
                    </span>
                    <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-[#2962FF] transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></div>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Hamburger Box */}
          <div className="w-[70px] h-[60px] md:w-[80px] md:h-[80px] bg-black flex flex-col items-center justify-center gap-[6px] md:gap-[8px] shrink-0 border-l border-white z-50">
            <div className={`h-[2px] md:h-[3px] bg-white transition-all duration-500 ${isExpanded ? 'w-8 md:w-10 rotate-45 translate-y-[8px] md:translate-y-[11px]' : 'w-8 md:w-10'}`}></div>
            <div className={`h-[2px] md:h-[3px] bg-[#2962FF] transition-all duration-300 ${isExpanded ? 'w-0 opacity-0' : 'w-8 md:w-10'}`}></div>
            <div className={`h-[2px] md:h-[3px] bg-white transition-all duration-500 ${isExpanded ? 'w-8 md:w-10 -rotate-45 translate-y-[-8px] md:translate-y-[-11px]' : 'w-8 md:w-10'}`}></div>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div className={`
        fixed inset-0 bg-black z-1000 flex flex-col items-center justify-center transition-all duration-700 md:hidden
        ${isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="flex flex-col items-center gap-8">
          {menuItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                  text-5xl font-black italic uppercase tracking-tighter transition-all duration-500 transform
                  ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                  ${isActive ? 'text-[#2962FF]' : 'text-white'}
                `}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Background Branding for Mobile Menu */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
          <span className="text-8xl font-black italic uppercase tracking-tighter whitespace-nowrap">CLUB BELGRANO</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
