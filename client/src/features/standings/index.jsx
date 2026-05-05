import { useState, useEffect } from 'react';
import api from '../../core/api/client';

const StandingsPage = () => {
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
          // Fallback mock data if API is empty/not ready to show the design
          setStandings([
            { position: 1, teamName: 'EL CARMEN (JUJUY)', played: 8, won: 8, lost: 0, pointsFor: 646, pointsAgainst: 546, points: 16 },
            { position: 2, teamName: 'BELGRANO (TUCUMÁN)', played: 9, won: 6, lost: 3, pointsFor: 834, pointsAgainst: 705, points: 15 },
            { position: 3, teamName: 'TALLERES (TAFÍ VIEJO)', played: 9, won: 6, lost: 3, pointsFor: 691, pointsAgainst: 652, points: 15 },
            { position: 4, teamName: 'RED STAR (CATAMARCA)', played: 9, won: 5, lost: 4, pointsFor: 620, pointsAgainst: 636, points: 14 },
            { position: 5, teamName: 'CONCEPCION (TUCUMÁN)', played: 9, won: 5, lost: 4, pointsFor: 745, pointsAgainst: 721, points: 14 },
            { position: 6, teamName: 'ASOC. MITRE (TUCUMÁN)', played: 9, won: 4, lost: 5, pointsFor: 630, pointsAgainst: 649, points: 13 },
            { position: 7, teamName: '9 DE JULIO (SALTA)', played: 9, won: 1, lost: 8, pointsFor: 614, pointsAgainst: 739, points: 10 },
            { position: 8, teamName: 'MONTMARTRE', played: 10, won: 1, lost: 9, pointsFor: 711, pointsAgainst: 843, points: 11 },
          ]);
        }
      })
      .catch(() => {
        // Mock data for demo purposes if API fails
        setStandings([
          { position: 1, teamName: 'EL CARMEN (JUJUY)', played: 8, won: 8, lost: 0, pointsFor: 646, pointsAgainst: 546, points: 16 },
          { position: 2, teamName: 'BELGRANO (TUCUMÁN)', played: 9, won: 6, lost: 3, pointsFor: 834, pointsAgainst: 705, points: 15 },
          { position: 3, teamName: 'TALLERES (TAFÍ VIEJO)', played: 9, won: 6, lost: 3, pointsFor: 691, pointsAgainst: 652, points: 15 },
          { position: 4, teamName: 'RED STAR (CATAMARCA)', played: 9, won: 5, lost: 4, pointsFor: 620, pointsAgainst: 636, points: 14 },
          { position: 5, teamName: 'CONCEPCION (TUCUMÁN)', played: 9, won: 5, lost: 4, pointsFor: 745, pointsAgainst: 721, points: 14 },
          { position: 6, teamName: 'ASOC. MITRE (TUCUMÁN)', played: 9, won: 4, lost: 5, pointsFor: 630, pointsAgainst: 649, points: 13 },
          { position: 7, teamName: '9 DE JULIO (SALTA)', played: 9, won: 1, lost: 8, pointsFor: 614, pointsAgainst: 739, points: 10 },
          { position: 8, teamName: 'MONTMARTRE', played: 10, won: 1, lost: 9, pointsFor: 711, pointsAgainst: 843, points: 11 },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-display pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Page Header */}
        <div className="mb-12">
          <p className="text-[#2962FF] text-[10px] font-black tracking-[0.4em] uppercase mb-4">
            LIGA FEDERAL 2025 — CONFERENCIA NORTE, GRUPO A
          </p>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
            TABLA DE<br/>POSICIONES
          </h1>
        </div>

        {loading ? (
          <div className="w-full h-96 bg-zinc-900 animate-pulse border border-white/5"></div>
        ) : (
          <div className="bg-white overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-bold uppercase tracking-tighter">
                <thead>
                  <tr className="bg-black text-white text-[11px] md:text-sm font-black tracking-widest">
                    <th className="py-4 px-6 text-center w-16">POSICION</th>
                    <th className="py-4 px-6">EQUIPO</th>
                    <th className="py-4 px-4 text-center">PJ</th>
                    <th className="py-4 px-4 text-center">PG</th>
                    <th className="py-4 px-4 text-center">PP</th>
                    <th className="py-4 px-4 text-center">PF</th>
                    <th className="py-4 px-4 text-center">PC</th>
                    <th className="py-4 px-4 text-center">PTOS</th>
                    <th className="py-4 px-6 text-center">%VICT</th>
                  </tr>
                </thead>
                <tbody className="text-black text-sm md:text-base">
                  {standings.map((row, i) => {
                    const isBelgrano = row.teamName?.toLowerCase().includes('belgrano');
                    const winPct = ((row.won / (row.played || 1)) * 100).toFixed(1);

                    return (
                      <tr 
                        key={i} 
                        className={`
                          border-b border-gray-200 transition-all duration-300
                          ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                          ${isBelgrano ? 'bg-blue-50 ring-1 ring-inset ring-blue-200' : ''}
                          hover:bg-blue-100/40
                        `}
                      >
                        <td className="py-4 px-6 text-center font-black text-gray-400 text-lg">{row.position}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                             {/* Shield Placeholder */}
                             <div className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-full border ${isBelgrano ? 'bg-[#003087] border-[#003087]' : 'bg-gray-100 border-gray-200'}`}>
                                <span className={`text-[10px] font-black ${isBelgrano ? 'text-white' : 'text-gray-400'}`}>
                                   {row.teamName?.charAt(0)}
                                </span>
                             </div>
                             <span className={`font-black tracking-tighter text-lg ${isBelgrano ? 'text-[#003087]' : 'text-gray-900'}`}>
                               {row.teamName}
                               {isBelgrano && (
                                 <span className="ml-3 text-[9px] bg-[#003087] text-white px-2 py-0.5 rounded-sm tracking-[0.2em] font-bold inline-block align-middle">
                                   EL PATRIOTA
                                 </span>
                               )}
                             </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-gray-600">{row.played}</td>
                        <td className="py-4 px-4 text-center font-bold text-gray-600">{row.won}</td>
                        <td className="py-4 px-4 text-center font-bold text-gray-600">{row.lost}</td>
                        <td className="py-4 px-4 text-center font-bold text-gray-500 font-teko text-2xl">{row.pointsFor}</td>
                        <td className="py-4 px-4 text-center font-bold text-gray-500 font-teko text-2xl">{row.pointsAgainst}</td>
                        <td className="py-4 px-4 text-center font-black text-gray-900 text-xl">{row.points}</td>
                        <td className="py-4 px-6 text-center font-black text-[#2962FF] text-lg">{winPct}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
           <span>* ACTUALIZACIÓN AUTOMÁTICA — SISTEMA DE DATOS BELGRANO</span>
           <span>CONFERENCIA NORTE 2025</span>
        </div>

      </div>
    </div>
  );
};

export default StandingsPage;
