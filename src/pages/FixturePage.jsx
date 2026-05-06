import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Trophy, ChevronRight } from 'lucide-react';
import api from '../core/api/client';

const fmt = (dateStr) => {
  if (!dateStr) return {};
  const d = new Date(dateStr);
  return {
    day:   d.toLocaleDateString('es-AR', { day: '2-digit' }),
    month: d.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase(),
    full:  d.toLocaleDateString('es-AR', { weekday:'short', day:'2-digit', month:'short' }).toUpperCase(),
  };
};

const fallbackMatches = [
  { _id: 'm1', date: new Date('2026-05-06T21:30:00'), time: '21:30', homeTeam: { name: 'Gimnasia y Tiro' }, awayTeam: { name: 'Belgrano' }, venue: 'Salta', status: 'PROGRAMADO' },
  { _id: 'm2', date: new Date('2026-05-10T21:00:00'), time: '21:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Jujuy Básquet' }, venue: 'Augusto Machado', status: 'PROGRAMADO' },
  { _id: 'm_last', date: new Date('2026-04-24T22:00:00'), time: '22:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Talleres de Tafí Viejo' }, venue: 'Augusto Machado', status: 'FINALIZADO', score: { home: 76, away: 71 } },
  { _id: 'm_p1', date: new Date('2026-04-18T21:00:00'), time: '21:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Nicolás Avellaneda' }, venue: 'Augusto Machado', status: 'FINALIZADO', score: { home: 68, away: 56 } },
];

const FixturePage = () => {
  const [matches, setMatches] = useState(fallbackMatches);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState('ALL');

  useEffect(() => {
    api.get('/matches?sort=-date&limit=30')
      .then(r => {
        if (r.data.data && r.data.data.length > 0) {
          setMatches(r.data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL' ? matches
    : filter === 'DONE' ? matches.filter(m => m.status === 'FINALIZADO')
    : matches.filter(m => m.status === 'PROGRAMADO');

  const FILTERS = [{ k:'ALL', l:'Todos' }, { k:'PENDING', l:'Próximos' }, { k:'DONE', l:'Resultados' }];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* ── HERO ── */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-20">
         <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5 }}
            src="/fans-crowd.png" 
            className="absolute inset-0 w-full h-full object-cover grayscale" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
         
         <div className="relative z-10 text-center">
            <motion.p 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="text-[#2962FF] font-black tracking-[0.4em] text-[10px] uppercase mb-4"
            >
               TEMPORADA 2026 — LIGA FEDERAL
            </motion.p>
            <motion.h1 
               initial={{ y: 30, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="font-teko text-9xl md:text-[12rem] font-bold italic uppercase leading-[0.8] tracking-tighter"
            >
               FIXTURE
            </motion.h1>
         </div>
      </section>

      <div className="app-container">
         {/* Filter Bar */}
         <div className="flex justify-center gap-4 mb-16">
            {FILTERS.map(f => (
               <button 
                  key={f.k} 
                  onClick={() => setFilter(f.k)}
                  className={`
                     px-8 py-2 font-teko text-2xl font-bold uppercase transition-all
                     ${filter === f.k ? 'bg-[#2962FF] text-white' : 'text-white/40 hover:text-white'}
                  `}
               >
                  {f.l}
               </button>
            ))}
         </div>

         {/* Match List */}
         <div className="max-w-4xl mx-auto space-y-4">
            <AnimatePresence mode="popLayout">
               {filtered.map((m, i) => {
                  const { day, month } = fmt(m.date);
                  const fin = m.status === 'FINALIZADO';
                  const belHome = (m.homeTeam?.name||'').toLowerCase().includes('belgrano');
                  const belScore = belHome ? m.score?.home : m.score?.away;
                  const rivScore = belHome ? m.score?.away : m.score?.home;
                  const rival    = belHome ? m.awayTeam?.name : m.homeTeam?.name;
                  const won      = fin && belScore > rivScore;

                  return (
                     <motion.div
                        key={m._id}
                        layout
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`
                           group relative flex items-center gap-8 p-8 border border-white/10 hover:border-[#2962FF] transition-all
                           ${fin ? 'bg-white/5' : 'bg-[#111]'}
                        `}
                     >
                        {/* Date */}
                        <div className="flex flex-col items-center justify-center min-w-[80px] h-[80px] bg-white text-black p-2">
                           <span className="font-teko text-4xl font-bold leading-none">{day}</span>
                           <span className="font-black text-[10px] tracking-widest uppercase">{month}</span>
                        </div>

                        {/* Teams Info */}
                        <div className="flex-1">
                           <div className="flex items-center gap-3 mb-2">
                              <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 ${fin ? 'bg-white/10 text-white/40' : 'bg-[#2962FF] text-white'}`}>
                                 {fin ? 'FINAL' : 'PRÓXIMO'}
                              </span>
                              <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">
                                 {m.competition?.name || 'LIGA FEDERAL'}
                              </span>
                           </div>
                           <h3 className="font-teko text-4xl font-bold uppercase tracking-tight">
                              BELGRANO <span className="text-white/20 italic mx-2">VS</span> {rival}
                           </h3>
                           <div className="flex items-center gap-6 mt-4 text-white/40 font-black text-[10px] uppercase tracking-widest">
                              <div className="flex items-center gap-2">
                                 <MapPin size={12} className="text-[#2962FF]" /> {m.venue}
                              </div>
                              <div className="flex items-center gap-2">
                                 <Clock size={12} className="text-[#2962FF]" /> {m.time} HS
                              </div>
                           </div>
                        </div>

                        {/* Score / Action */}
                        <div className="text-right flex flex-col items-end gap-2">
                           {fin ? (
                              <>
                                 <div className="font-teko text-5xl font-bold leading-none">
                                    <span className={won ? 'text-[#2962FF]' : 'text-white'}>{belScore}</span>
                                    <span className="text-white/20 mx-2">-</span>
                                    <span className={!won ? 'text-red-500' : 'text-white/60'}>{rivScore}</span>
                                 </div>
                                 <span className={`text-[9px] font-black uppercase tracking-widest ${won ? 'text-[#2962FF]' : 'text-red-500/60'}`}>
                                    {won ? 'VICTORIA' : 'DERROTA'}
                                 </span>
                              </>
                           ) : (
                              <button className="flex items-center gap-2 font-teko text-2xl font-bold uppercase hover:text-[#2962FF] transition-colors group/btn">
                                 DETALLES <ChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                           )}
                        </div>
                     </motion.div>
                  );
               })}
            </AnimatePresence>
         </div>
      </div>

    </div>
  );
};

export default FixturePage;
