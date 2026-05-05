import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, BarChart3, List, LayoutGrid } from 'lucide-react';

const PlantelPage = () => {
  const [view, setView] = useState('cards'); // 'cards' or 'table'
  const players = [
    { id: 1, name: 'AMAYA, U.', pj: 7, minTot: 167.6, minPP: 23.9, ptsTot: 107, ptsPP: 15.3, tl: '13/17', tlPct: '76%', t2: '23/31', t2Pct: '74%', t3: '16/36', t3Pct: '44%', rd: 29, pos: 'BASE' },
    { id: 2, name: 'ARAUJO, M.', pj: 8, minTot: 238.6, minPP: 29.8, ptsTot: 185, ptsPP: 23.1, tl: '38/57', tlPct: '66%', t2: '57/76', t2Pct: '75%', t3: '11/36', t3Pct: '30%', rd: 17, pos: 'ESCOLTA' },
    { id: 4, name: 'BIESCHKE, S.', pj: 8, minTot: 174.2, minPP: 21.8, ptsTot: 74, ptsPP: 9.2, tl: '19/28', tlPct: '67%', t2: '23/35', t2Pct: '65%', t3: '3/7', t3Pct: '42%', rd: 33, pos: 'PÍVOT' },
    { id: 5, name: 'CASARES, B.', pj: 8, minTot: 125.8, minPP: 15.7, ptsTot: 44, ptsPP: 5.5, tl: '6/9', tlPct: '66%', t2: '10/20', t2Pct: '50%', t3: '6/20', t3Pct: '30%', rd: 8, pos: 'ALERO' },
    { id: 6, name: 'GARCIA, N.', pj: 8, minTot: 167.3, minPP: 20.9, ptsTot: 46, ptsPP: 5.8, tl: '6/10', tlPct: '60%', t2: '11/28', t2Pct: '39%', t3: '6/22', t3Pct: '27%', rd: 34, pos: 'BASE' },
    { id: 7, name: 'RODRIGUEZ, N.', pj: 8, minTot: 232.9, minPP: 29.1, ptsTot: 116, ptsPP: 14.5, tl: '24/30', tlPct: '80%', t2: '22/32', t2Pct: '68%', t3: '16/42', t3Pct: '38%', rd: 46, pos: 'ALA-PÍVOT' },
    { id: 8, name: 'ROJAS, S.', pj: 8, minTot: 150.1, minPP: 18.8, ptsTot: 64, ptsPP: 8, tl: '4/8', tlPct: '50%', t2: '15/23', t2Pct: '65%', t3: '10/25', t3Pct: '40%', rd: 16, pos: 'ESCOLTA' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20 overflow-hidden">
      
      {/* ── BACKGROUND ACCENT ── */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#2962FF]/5 blur-[120px] rounded-full pointer-events-none -z-1" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#2962FF]/3 blur-[120px] rounded-full pointer-events-none -z-1" />

      <div className="app-container">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.p 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-[#2962FF] font-black tracking-[0.4em] text-[10px] uppercase mb-4"
            >
               TEMPORADA 2026 — ROSTER OFICIAL
            </motion.p>
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="font-teko text-9xl font-bold italic uppercase leading-[0.8] tracking-tighter"
            >
               NUESTRO<br/>PLANTEL
            </motion.h1>
          </div>

          {/* View Toggle */}
          <div className="flex bg-white/5 p-1 border border-white/10">
            <button 
               onClick={() => setView('cards')}
               className={`flex items-center gap-2 px-6 py-2 font-teko text-xl uppercase transition-all ${view === 'cards' ? 'bg-[#2962FF] text-white' : 'text-white/40 hover:text-white'}`}
            >
               <LayoutGrid size={18} /> Galería
            </button>
            <button 
               onClick={() => setView('table')}
               className={`flex items-center gap-2 px-6 py-2 font-teko text-xl uppercase transition-all ${view === 'table' ? 'bg-[#2962FF] text-white' : 'text-white/40 hover:text-white'}`}
            >
               <List size={18} /> Datos
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'cards' ? (
            <motion.div 
               key="cards"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
               {players.map((p, i) => (
                  <motion.div
                     key={p.id}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.05 }}
                     className="group relative bg-[#111] border border-white/10 overflow-hidden hover:border-[#2962FF] transition-all"
                  >
                     {/* Player Image Placeholder */}
                     <div className="aspect-[4/5] bg-gradient-to-t from-black via-zinc-900 to-zinc-800 relative overflow-hidden">
                        <User className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 text-white/5 w-[150%] h-[150%]" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        <img 
                           src={`https://i.pravatar.cc/400?u=${p.name}`} 
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                           alt={p.name}
                        />
                        {/* Position Badge */}
                        <div className="absolute top-4 left-4 bg-[#2962FF] px-3 py-1">
                           <span className="font-teko text-lg font-bold italic tracking-wider">{p.pos}</span>
                        </div>
                     </div>

                     {/* Info */}
                     <div className="p-6">
                        <h3 className="font-teko text-3xl font-bold uppercase mb-4 group-hover:text-[#2962FF] transition-colors">{p.name}</h3>
                        <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                           <div className="text-center">
                              <p className="font-teko text-2xl font-bold">{p.ptsPP}</p>
                              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">PTS/P</p>
                           </div>
                           <div className="text-center">
                              <p className="font-teko text-2xl font-bold">{p.minPP}</p>
                              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">MIN/P</p>
                           </div>
                           <div className="text-center">
                              <p className="font-teko text-2xl font-bold">{p.rd}</p>
                              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">REB</p>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </motion.div>
          ) : (
            <motion.div 
               key="table"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="bg-[#111] border border-white/10 overflow-hidden"
            >
               <div className="overflow-x-auto">
                  <table className="w-full text-left font-display">
                     <thead className="bg-white text-black text-[10px] font-black tracking-widest uppercase">
                        <tr>
                           <th className="p-6">JUGADOR</th>
                           <th className="p-6 text-center">POS</th>
                           <th className="p-6 text-center">PJ</th>
                           <th className="p-6 text-center">PTS/P</th>
                           <th className="p-6 text-center">MIN/P</th>
                           <th className="p-6 text-center">%TL</th>
                           <th className="p-6 text-center">%T2</th>
                           <th className="p-6 text-center">%T3</th>
                           <th className="p-6 text-center">REB</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {players.map(p => (
                           <tr key={p.id} className="hover:bg-[#2962FF]/5 transition-colors group">
                              <td className="p-6 font-teko text-2xl uppercase group-hover:text-[#2962FF]">{p.name}</td>
                              <td className="p-6 text-center font-black text-[10px] text-white/40">{p.pos}</td>
                              <td className="p-6 text-center font-teko text-2xl">{p.pj}</td>
                              <td className="p-6 text-center font-teko text-2xl text-[#2962FF]">{p.ptsPP}</td>
                              <td className="p-6 text-center font-teko text-2xl">{p.minPP}</td>
                              <td className="p-6 text-center font-teko text-2xl text-white/40">{p.tlPct}</td>
                              <td className="p-6 text-center font-teko text-2xl text-white/40">{p.t2Pct}</td>
                              <td className="p-6 text-center font-teko text-2xl text-white/40">{p.t3Pct}</td>
                              <td className="p-6 text-center font-teko text-2xl">{p.rd}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default PlantelPage;
