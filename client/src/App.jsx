import { useState, useEffect } from 'react';
import MatchCalendar from './components/MatchCalendar';
import PlayerFaceOff from './components/PlayerFaceOff';
import ContactSection from './components/ContactSection';
import NuestraFamilia from './components/NuestraFamilia';
import Galeria from './components/Galeria';
import Shop from './components/Shop';
import api from './core/api/client';

function App() {
  const [latestMatch, setLatestMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestRes = await api.get('/matches/latest');
        setLatestMatch(latestRes.data.data);
        const matchesRes = await api.get('/matches');
        setMatches(matchesRes.data.data);
      } catch {
        console.log('Modo offline - sin conexión al servidor');
        setLatestMatch({
          homeTeam: { name: 'Belgrano' },
          awayTeam: { name: 'Ateneo' },
          homeScore: 85,
          awayScore: 72,
          status: 'FINAL',
          competition: { name: 'Liga Federal' },
          mvp: { player: { name: 'Mateo', number: 9 } }
        });
        setMatches([
          { _id: '1', date: '2026-05-04', time: '21:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Gimnasia' }, venue: 'Palacio', status: 'SCHEDULED', competition: { name: 'Liga Federal' } },
          { _id: '2', date: '2026-05-11', time: '21:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Rosario' }, venue: 'Palacio', status: 'SCHEDULED', competition: { name: 'Liga Federal' } },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Familia', id: 'nuestra-familia' },
    { label: 'Galería', id: 'galeria' },
    { label: 'Tienda', id: 'shop' },
    { label: 'Contacto', id: 'contacto' },
  ];

  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-brand selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-dark/95 backdrop-blur-xl py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 bg-brand flex items-center justify-center group-hover:bg-white transition-colors duration-300">
              <span className="font-teko font-bold text-2xl tracking-wider text-white group-hover:text-dark">CB</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-teko font-bold tracking-widest text-white uppercase">Belgrano</span>
              <span className="text-[9px] font-oswald text-gray-400 uppercase tracking-[0.35em]">Cultural & Deportivo</span>
            </div>
          </div>

          <ul className="hidden lg:flex gap-10 text-xs font-oswald font-bold tracking-[0.25em] text-white uppercase">
            {navLinks.map((link) => (
              <li
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative cursor-pointer group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand group-hover:w-full transition-all duration-300"></span>
              </li>
            ))}
          </ul>

          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 bg-dark/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link, idx) => (
              <li
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-5xl font-teko font-bold uppercase tracking-wider cursor-pointer hover:text-brand transition-colors"
                style={{ transitionDelay: mobileMenuOpen ? `${idx * 100}ms` : '0ms' }}
              >
                {link.label}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}></div>

        {/* Large Background Text */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-teko text-[40vw] leading-none font-bold text-white/[0.02]">1920</span>
        </div>

        {/* Accent Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[150px]"></div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3 border border-brand/30 bg-brand/5 px-5 py-2.5 font-oswald font-bold text-[10px] uppercase tracking-[0.25em] text-brand">
                <span className="w-2 h-2 bg-brand animate-pulse"></span>
                Liga Federal de Básquet
              </div>
              
              <h1 className="text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-teko uppercase leading-[0.85] tracking-tight">
                <span className="block text-white">El Gigante</span>
                <span className="block text-stroke-brand">Tucumano</span>
              </h1>
              
              <p className="font-oswald text-gray-400 max-w-lg text-base leading-relaxed uppercase tracking-[0.15em] border-l-2 border-brand pl-6">
                Identidad. Garra. Historia.<br />
                Acompañá al equipo en su camino a lo más alto.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="group relative px-10 py-5 bg-white text-dark font-oswald font-bold tracking-[0.2em] text-xs uppercase overflow-hidden hover:text-white transition-colors duration-300"
                >
                  <span className="relative z-10">Hacete Socio</span>
                  <div className="absolute inset-0 bg-brand translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
                <button
                  onClick={() => scrollToSection('galeria')}
                  className="px-10 py-5 border border-white/30 text-white font-oswald font-bold tracking-[0.2em] text-xs uppercase hover:border-brand hover:text-brand transition-all duration-300"
                >
                  Ver Galería
                </button>
              </div>
            </div>

            {/* Right Scoreboard */}
            <div className="lg:col-span-5">
              <div className="bg-surface border border-white/10 p-8 md:p-10 relative group hover:border-brand/30 transition-all duration-500">
                {/* Top Glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand/50 to-transparent"></div>
                
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                  <p className="text-[10px] text-brand font-oswald font-bold tracking-[0.3em] uppercase">
                    {loading ? 'CARGANDO...' : latestMatch?.competition?.name || 'LIGA FEDERAL'}
                  </p>
                  <span className="text-[10px] text-white bg-brand/20 border border-brand/30 px-3 py-1.5 font-oswald font-bold tracking-widest">
                    {loading ? '...' : latestMatch?.status || 'FINAL'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center px-4">
                  <div className="text-center flex-1">
                    <div className="w-16 h-16 mx-auto mb-4 bg-dark/50 border border-white/10 rounded-full flex items-center justify-center">
                      <span className="font-oswald font-bold text-lg text-gray-400">
                        {(loading ? 'RIVAL' : latestMatch?.awayTeam?.name || 'RIVAL').substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xs font-oswald text-gray-400 tracking-widest uppercase">
                      {loading ? 'RIVAL' : latestMatch?.awayTeam?.name || 'RIVAL'}
                    </h3>
                    <span className="text-6xl md:text-7xl font-teko font-bold text-gray-300 tracking-tighter mt-2 block">
                      {loading ? '--' : latestMatch?.awayScore ?? '--'}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center px-6">
                    <span className="text-xs font-oswald font-bold text-brand mb-3 tracking-widest">VS</span>
                    <div className="h-12 w-px bg-linear-to-b from-transparent via-white/20 to-transparent"></div>
                  </div>
                  
                  <div className="text-center flex-1">
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand/20 border border-brand/30 rounded-full flex items-center justify-center">
                      <span className="font-oswald font-bold text-lg text-brand">BEL</span>
                    </div>
                    <h3 className="text-xs font-oswald text-brand tracking-widest uppercase font-bold">
                      {loading ? 'BELGRANO' : latestMatch?.homeTeam?.name || 'BELGRANO'}
                    </h3>
                    <span className="text-6xl md:text-7xl font-teko font-bold text-brand tracking-tighter mt-2 block">
                      {loading ? '--' : latestMatch?.homeScore ?? '--'}
                    </span>
                  </div>
                </div>

                {latestMatch?.mvp && (
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                    <div className="w-14 h-14 bg-dark border border-white/10 flex items-center justify-center font-teko font-bold text-3xl text-brand">
                      #{latestMatch.mvp.player?.number || '0'}
                    </div>
                    <div>
                      <p className="text-[9px] text-brand uppercase tracking-[0.25em] mb-1 font-oswald font-bold">MVP DEL PARTIDO</p>
                      <p className="text-xl font-teko font-bold text-white uppercase tracking-wide">
                        {latestMatch.mvp.player?.name || '---'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <span className="text-[10px] font-oswald uppercase tracking-[0.3em] text-gray-500">Scroll</span>
          <div className="w-px h-8 bg-linear-to-b from-brand to-transparent"></div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-brand py-4 overflow-hidden whitespace-nowrap border-y border-white/10">
        <div className="animate-marquee inline-flex items-center font-oswald font-bold text-sm uppercase tracking-[0.25em]">
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">TEMPORADA 2026</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">LIGA FEDERAL DE BÁSQUET</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">EL GIGANTE TUCUMANO</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">PASIÓN Y GARRA</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">TEMPORADA 2026</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">LIGA FEDERAL DE BÁSQUET</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">EL GIGANTE TUCUMANO</span>
          <span className="mx-8 text-white/50">★</span>
          <span className="mx-8 text-white">PASIÓN Y GARRA</span>
        </div>
      </div>

      <NuestraFamilia />
      <MatchCalendar matches={matches} />
      <PlayerFaceOff />
      <Galeria />
      <Shop />

      <div id="contacto">
        <ContactSection />
      </div>

      {/* Footer */}
      <footer className="bg-surface border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand flex items-center justify-center">
                  <span className="font-teko font-bold text-2xl tracking-wider text-white">CB</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-3xl font-teko font-bold tracking-widest text-white uppercase">Belgrano</span>
                  <span className="text-[10px] font-oswald text-brand uppercase tracking-[0.35em] font-bold">San Miguel de Tucumán</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm font-sans leading-relaxed max-w-sm">
                Más que un club, una familia. Desde 1920 forjando historia en el básquet tucumano.
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-8">
              <h4 className="text-xs font-oswald font-bold uppercase tracking-[0.25em] text-white mb-6">Navegación</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button onClick={() => scrollToSection(link.id)} className="text-gray-500 text-sm font-sans hover:text-brand transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs font-oswald font-bold uppercase tracking-[0.25em] text-white mb-6">Contacto</h4>
              <ul className="space-y-3 text-gray-500 text-sm font-sans">
                <li>info@belgrano.com</li>
                <li>+54 381 456-7890</li>
                <li>San Martín 500, SMT</li>
              </ul>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase font-oswald">
              © 2026 Club Belgrano Cultural y Deportivo. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-brand transition-colors text-xs font-oswald uppercase tracking-widest">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-brand transition-colors text-xs font-oswald uppercase tracking-widest">Facebook</a>
              <a href="#" className="text-gray-600 hover:text-brand transition-colors text-xs font-oswald uppercase tracking-widest">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
