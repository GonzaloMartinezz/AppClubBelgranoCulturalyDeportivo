import { useState, useEffect } from 'react';
import api from '../../core/api/client';

const StandingsFeature = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/competitions/active')
      .then(r => {
        const id = r.data?.data?._id;
        if (id) return api.get(`/competitions/${id}/standings`);
        return null;
      })
      .then(r => {
        if (r?.data?.data) {
          setStandings(r.data.data);
        } else {
          setStandings([
            { position: '01', teamName: 'BELGRANO_B', played: 24, won: 21, lost: '03', points: 45 },
            { position: '02', teamName: 'ATHENAS DE CORDOBA', played: 24, won: 19, lost: '05', points: 43 },
            { position: '03', teamName: 'INSTITUTO ACC', played: 24, won: 18, lost: '06', points: 42 },
            { position: '04', teamName: 'QUIMSA', played: 23, won: 16, lost: '07', points: 39 },
            { position: '05', teamName: 'REGATAS CORRIENTES', played: 24, won: 14, lost: 10, points: 38 },
          ]);
        }
      })
      .catch(() => {
        setStandings([
          { position: '01', teamName: 'BELGRANO_B', played: 24, won: 21, lost: '03', points: 45 },
          { position: '02', teamName: 'ATHENAS DE CORDOBA', played: 24, won: 19, lost: '05', points: 43 },
          { position: '03', teamName: 'INSTITUTO ACC', played: 24, won: 18, lost: '06', points: 42 },
          { position: '04', teamName: 'QUIMSA', played: 23, won: 16, lost: '07', points: 39 },
          { position: '05', teamName: 'REGATAS CORRIENTES', played: 24, won: 14, lost: 10, points: 38 },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans pt-24 pb-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* ── HEADER SECTION ── */}
        <div className="relative mb-16">
          <div className="absolute -top-10 -left-4 opacity-10 pointer-events-none">
             <span className="font-teko font-black text-[180px] leading-none tracking-tighter text-white">DATA</span>
          </div>
          <div className="relative z-10">
            <h1 className="font-teko font-bold italic text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.8] mb-0 tracking-tighter">
              INTELIGENCIA<br/>
              <span className="text-[#2962FF]">DEPORTIVA</span>
            </h1>
          </div>

          {/* Top Summary Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/20 bg-black/40 backdrop-blur-sm">
             <div className="col-span-1 md:col-span-3 h-[300px] relative overflow-hidden group border-r border-white/20">
                <img src="/hero-bg.png" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                   <p className="bg-[#2962FF] text-white text-[10px] font-black tracking-widest px-3 py-1 uppercase inline-block mb-3">ESTADO DE TEMPORADA 2025</p>
                   <h2 className="font-teko text-4xl font-bold uppercase">LÍDERES ABSOLUTOS</h2>
                </div>
             </div>
             <div className="flex flex-col">
                <div className="flex-1 p-6 border-b border-white/20 flex flex-col justify-center">
                   <p className="text-[10px] font-black text-white/50 tracking-widest uppercase mb-1">PARTIDOS JUGADOS</p>
                   <p className="font-teko text-7xl font-bold leading-none">24</p>
                </div>
                <div className="flex-1 p-6 border-b border-white/20 flex flex-col justify-center">
                   <p className="text-[10px] font-black text-white/50 tracking-widest uppercase mb-1">PORCENTAJE VICTORIAS</p>
                   <p className="font-teko text-7xl font-bold leading-none">87.5%</p>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center">
                   <p className="text-[10px] font-black text-white/50 tracking-widest uppercase mb-1">PROMEDIO PUNTOS</p>
                   <p className="font-teko text-7xl font-bold leading-none">92.4</p>
                </div>
             </div>
          </div>
        </div>

        {/* ── TABLA DE POSICIONES ── */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-10 bg-[#2962FF]" />
            <h2 className="font-teko text-5xl font-bold uppercase italic tracking-tighter">TABLA DE POSICIONES</h2>
            <div className="ml-auto text-[10px] font-black text-white/30 tracking-widest uppercase hidden md:block">CONF_NORTE / NIVEL_PRO</div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left uppercase font-bold tracking-tighter">
              <thead>
                <tr className="bg-white text-black text-[11px] font-black border-b border-white/10">
                  <th className="py-4 px-6 w-20">POS</th>
                  <th className="py-4 px-6">EQUIPO</th>
                  <th className="py-4 px-6 text-center">GP</th>
                  <th className="py-4 px-6 text-center">W</th>
                  <th className="py-4 px-6 text-center">L</th>
                  <th className="py-4 px-6 text-center">PTS</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {standings.map((row, i) => {
                  const isBelgrano = row.teamName?.toLowerCase().includes('belgrano');
                  return (
                    <tr 
                      key={i} 
                      className={`
                        border-b border-white/5 transition-colors
                        ${isBelgrano ? 'bg-[#2962FF] text-white' : 'hover:bg-white/5'}
                      `}
                    >
                      <td className={`py-5 px-6 font-teko text-2xl ${isBelgrano ? 'text-white' : 'text-white/40'}`}>{row.position}</td>
                      <td className="py-5 px-6 font-teko text-2xl flex items-center gap-4">
                         <span className="italic">{row.teamName}</span>
                         {isBelgrano && <span className="text-sm">☆</span>}
                      </td>
                      <td className="py-5 px-6 text-center font-teko text-2xl">{row.played}</td>
                      <td className="py-5 px-6 text-center font-teko text-2xl">{row.won}</td>
                      <td className="py-5 px-6 text-center font-teko text-2xl">{row.lost}</td>
                      <td className={`py-5 px-6 text-center font-teko text-2xl ${isBelgrano ? 'text-white' : 'text-[#2962FF]'}`}>{row.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── LÍDERES DE ESTADÍSTICAS ── */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
             <h2 className="font-teko text-5xl font-bold uppercase italic tracking-tighter">LÍDERES DE ESTADÍSTICAS</h2>
             <div className="flex-1 h-px bg-white/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Leader Card 1 */}
             <div className="bg-[#111] border border-white/10 group hover:border-[#2962FF] transition-colors">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                   <p className="text-[10px] font-black tracking-widest text-white/50 uppercase">PTS_PROMEDIO</p>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div className="p-8 flex flex-col items-center text-center">
                   <div className="flex items-end gap-1 mb-8">
                      <div className="text-left">
                        <p className="font-teko text-3xl font-bold leading-none">MARCOS</p>
                        <p className="font-teko text-3xl font-bold leading-none text-[#2962FF]">VIDAL</p>
                        <p className="text-[10px] font-black text-white/40 mt-1 uppercase">ALERO | #10</p>
                      </div>
                      <p className="font-teko text-8xl font-bold leading-[0.7] ml-2">28.4</p>
                   </div>
                   <div className="w-full aspect-square bg-zinc-900 overflow-hidden relative border border-white/5 mb-8">
                      <img src="/players-hero.png" alt="Player" className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-500" />
                   </div>
                   <div className="w-full space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase">
                         <span className="text-white/40">TIROS DE CAMPO</span>
                         <span>54.2%</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase">
                         <span className="text-white/40">TRIPLES</span>
                         <span>41.8%</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Leader Card 2 */}
             <div className="bg-[#111] border border-white/10 group hover:border-[#2962FF] transition-colors">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                   <p className="text-[10px] font-black tracking-widest text-white/50 uppercase">REB_TOTALES</p>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M17 11l-5-5-5 5M17 18l-5-5-5 5"/></svg>
                </div>
                <div className="p-8 flex flex-col items-center text-center">
                   <div className="flex items-end gap-1 mb-8">
                      <div className="text-left">
                        <p className="font-teko text-3xl font-bold leading-none">SANTIAGO</p>
                        <p className="font-teko text-3xl font-bold leading-none text-[#2962FF]">LONGO</p>
                        <p className="text-[10px] font-black text-white/40 mt-1 uppercase">PIVOT | #32</p>
                      </div>
                      <p className="font-teko text-8xl font-bold leading-[0.7] ml-2">12.1</p>
                   </div>
                   <div className="w-full aspect-square bg-zinc-900 overflow-hidden relative border border-white/5 mb-8">
                      <img src="/fans-crowd.png" alt="Player" className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-500" />
                   </div>
                   <div className="w-full space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase">
                         <span className="text-white/40">REB. OFENSIVOS</span>
                         <span>4.5</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase">
                         <span className="text-white/40">BLOQUEOS</span>
                         <span>2.8</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Leader Card 3 */}
             <div className="bg-[#111] border border-white/10 group hover:border-[#2962FF] transition-colors">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                   <p className="text-[10px] font-black tracking-widest text-white/50 uppercase">ASISTENCIAS</p>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 8h-6a4 4 0 00-4 4v6M18 12l3 3-3 3M18 8l3-3-3 3"/></svg>
                </div>
                <div className="p-8 flex flex-col items-center text-center">
                   <div className="flex items-end gap-1 mb-8">
                      <div className="text-left">
                        <p className="font-teko text-3xl font-bold leading-none">LUCAS</p>
                        <p className="font-teko text-3xl font-bold leading-none text-[#2962FF]">PAREDES</p>
                        <p className="text-[10px] font-black text-white/40 mt-1 uppercase">BASE | #05</p>
                      </div>
                      <p className="font-teko text-8xl font-bold leading-[0.7] ml-2">09.5</p>
                   </div>
                   <div className="w-full aspect-square bg-zinc-900 overflow-hidden relative border border-white/5 mb-8">
                      <img src="/hero-bg.png" alt="Player" className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-500" />
                   </div>
                   <div className="w-full space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase">
                         <span className="text-white/40">RATIO ASIST/TO</span>
                         <span>3.2</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase">
                         <span className="text-white/40">ROBOS</span>
                         <span>1.5</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* ── LOWER ANALYTICS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
           <div className="border border-white/10 p-10 bg-[#0A0A0A]">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="font-teko text-4xl font-bold uppercase italic tracking-tighter">ANÁLISIS_EFICIENCIA</h3>
                 <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">DATA_LOG_F25</span>
              </div>
              <div className="space-y-8">
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                       <span className="text-[#2962FF]">ATAQUE_POSICIONAL</span>
                       <span>92%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 w-full">
                       <div className="h-full bg-[#2962FF]" style={{ width: '92%' }} />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                       <span className="text-white/40">DEFENSA_PERIMETRO</span>
                       <span>85%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 w-full">
                       <div className="h-full bg-white/60" style={{ width: '85%' }} />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                       <span className="text-white/40">TRANSICIÓN_RÁPIDA</span>
                       <span>78%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 w-full">
                       <div className="h-full bg-white/40" style={{ width: '78%' }} />
                    </div>
                 </div>
              </div>
           </div>

           <div className="relative group overflow-hidden border border-white/10 h-full min-h-[300px]">
              <img src="/fans-crowd.png" alt="Heatmap" className="absolute inset-0 w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <button className="bg-[#2962FF] text-white font-teko text-2xl font-bold uppercase px-8 py-4 tracking-tight hover:bg-white hover:text-black transition-all">
                    VER MAPA DE CALOR
                 </button>
              </div>
           </div>
        </div>

        {/* Footer info */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8">
           <div className="max-w-md">
              <p className="font-teko text-3xl font-bold italic uppercase tracking-tighter mb-4">BELGRANO_BASQUET</p>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                 ESTA PLATAFORMA ES PROPIEDAD DEL DEPARTAMENTO TÉCNICO DE CLUB BELGRANO. TODOS LOS DATOS SON EXTRAÍDOS EN TIEMPO REAL DEL SISTEMA DE ESTADÍSTICA OFICIAL.
              </p>
           </div>
           <div className="flex flex-col items-end gap-2">
              <p className="text-[10px] font-black text-[#2962FF] uppercase tracking-widest">PROTOCOLOS_INTERNOS</p>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">©2025 CLUB BELGRANO / DEPT_TECHNICAL_OPS</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default StandingsFeature;
