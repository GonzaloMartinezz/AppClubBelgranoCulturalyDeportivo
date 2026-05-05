import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trophy, Users, ShoppingBag, Calendar, ArrowDown } from 'lucide-react';
import api from '../core/api/client';

const HomePage = () => {
  const [latestMatch, setLatestMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroRef = useRef(null);

  const heroImages = [
    '/hero-bg.png',
    '/fans-crowd.png',
  ];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    api.get('/matches/latest')
      .then(r => setLatestMatch(r.data.data))
      .catch(() => setLatestMatch({
        homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Ateneo' },
        homeScore: 85, awayScore: 72, status: 'FINAL',
        date: '2026-04-27',
        competition: { name: 'Liga Federal' },
      }))
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } }
  };

  return (
    <div className="w-full bg-[#0A0A0A]">
      
      {/* ── PARALLAX HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIndex}
              src={heroImages[heroIndex]}
              className="w-full h-full object-cover opacity-40 grayscale-[0.5]"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0A0A0A]" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative z-10 text-center px-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p variants={itemVariants} className="text-[#2962FF] font-black tracking-[0.5em] text-[10px] uppercase mb-6 flex items-center justify-center gap-4">
             <span className="w-12 h-[1px] bg-[#2962FF]/30"></span>
             LIGA FEDERAL — TEMPORADA 2026
             <span className="w-12 h-[1px] bg-[#2962FF]/30"></span>
          </motion.p>
          <motion.h1 
            variants={itemVariants}
            className="font-teko font-bold italic text-[15vw] md:text-[12vw] leading-[0.75] uppercase text-white tracking-tighter"
          >
            CLUB<br/>BELGRANO
          </motion.h1>
          <motion.div variants={itemVariants} className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
             <button className="btn-brutal group">
                Hacerse Socio <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
             </button>
             <button className="btn-brutal-outline">
                Ver Fixture
             </button>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      {/* ── DATA TICKER ── */}
      <div className="w-full bg-white text-black py-4 overflow-hidden border-y-2 border-black flex items-center">
         <motion.div 
           animate={{ x: [0, -1000] }} 
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="flex gap-12 whitespace-nowrap font-teko text-3xl font-bold italic uppercase"
         >
            {Array(10).fill("EL GIGANTE DE TUCUMÁN — CLUB BELGRANO CULTURA Y DEPORTIVO — 1920 —").map((t, i) => (
              <span key={i}>{t}</span>
            ))}
         </motion.div>
      </div>

      {/* ── BENTO GRID FEATURES ── */}
      <section className="py-24 px-4 md:px-10 max-w-[1400px] mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            
            {/* Featured Match Card */}
            <motion.div 
               whileHover={{ scale: 0.98 }}
               className="md:col-span-2 md:row-span-2 bg-[#111] border border-white/10 p-10 flex flex-col justify-between relative group overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Trophy size={200} />
               </div>
               <div>
                  <p className="text-[#2962FF] font-black text-[10px] tracking-widest uppercase mb-2">ÚLTIMO RESULTADO</p>
                  <h3 className="font-teko text-6xl font-bold uppercase leading-none mb-6">GRAN VICTORIA<br/>EN EL GIGANTE</h3>
               </div>
               <div className="flex items-center gap-8">
                  <div className="text-center">
                     <p className="font-teko text-7xl font-bold">{latestMatch?.homeScore}</p>
                     <p className="text-[10px] font-black uppercase text-white/40">BELGRANO</p>
                  </div>
                  <div className="h-12 w-px bg-white/10"></div>
                  <div className="text-center">
                     <p className="font-teko text-7xl font-bold">{latestMatch?.awayScore}</p>
                     <p className="text-[10px] font-black uppercase text-white/40">{latestMatch?.awayTeam?.name}</p>
                  </div>
               </div>
               <button className="flex items-center gap-2 font-black text-[10px] tracking-widest uppercase mt-12 hover:text-[#2962FF] transition-colors">
                  VER RESUMEN DEL PARTIDO <ArrowRight size={14} />
               </button>
            </motion.div>

            {/* Quick Link Cards */}
            <motion.a href="/plantel" whileHover={{ y: -5 }} className="bg-[#171717] border border-white/10 p-8 flex flex-col justify-between group">
               <Users className="text-[#2962FF] group-hover:scale-110 transition-transform" size={32} />
               <div>
                  <h4 className="font-teko text-3xl font-bold uppercase">PLANTEL</h4>
                  <p className="text-[10px] font-black text-white/30 uppercase mt-1">CONOCÉ A NUESTROS GUERREROS</p>
               </div>
            </motion.a>

            <motion.a href="/tienda" whileHover={{ y: -5 }} className="bg-[#171717] border border-white/10 p-8 flex flex-col justify-between group">
               <ShoppingBag className="text-[#2962FF] group-hover:scale-110 transition-transform" size={32} />
               <div>
                  <h4 className="font-teko text-3xl font-bold uppercase">TIENDA</h4>
                  <p className="text-[10px] font-black text-white/30 uppercase mt-1">EQUIPACIÓN OFICIAL 2025</p>
               </div>
            </motion.a>

            <motion.a href="/fixture" whileHover={{ y: -5 }} className="md:col-span-2 bg-[#2962FF] p-8 flex flex-col justify-between group">
               <Calendar className="text-white group-hover:rotate-12 transition-transform" size={32} />
               <div className="flex justify-between items-end">
                  <div>
                     <h4 className="font-teko text-4xl font-bold uppercase">PRÓXIMOS ENCUENTROS</h4>
                     <p className="text-[10px] font-black text-white/60 uppercase mt-1">NO TE PIERDAS NINGÚN PARTIDO</p>
                  </div>
                  <ArrowRight size={24} />
               </div>
            </motion.a>

         </div>
      </section>

      {/* ── IMAGE SECTION ── */}
      <section className="relative py-24 overflow-hidden">
         <div className="app-container">
            <div className="relative aspect-[21/9] w-full overflow-hidden">
               <motion.img 
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  src="/fans-crowd.png" 
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center">
                     <h2 className="font-teko text-7xl md:text-9xl font-bold italic uppercase leading-none mb-4">MÁS QUE<br/>UN CLUB</h2>
                     <p className="font-oswald text-xs md:text-sm tracking-[0.4em] uppercase text-[#2962FF] font-bold">UNA PASIÓN QUE NO SE DETIENE</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-32 bg-[#050505] border-t border-white/5">
         <div className="app-container text-center">
            <h2 className="font-teko text-6xl md:text-9xl font-bold italic uppercase tracking-tighter mb-8">
               ÚNETE A LA<br/><span className="text-[#2962FF]">FAMILIA</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center mt-12">
               <button className="btn-brutal px-16">REGISTRARSE</button>
               <button className="btn-brutal-outline px-16">INFO ABONOS</button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default HomePage;
