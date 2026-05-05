import { useState } from 'react';

const PlantelPage = () => {
  const players = [
    { name: 'AMAYA, U.', pj: 7, minTot: 167.6, minPP: 23.9, ptsTot: 107, ptsPP: 15.3, tl: '13/17', tlPct: '76%', t2: '23/31', t2Pct: '74%', t3: '16/36', t3Pct: '44%', rd: 29 },
    { name: 'ARAUJO, M.', pj: 8, minTot: 238.6, minPP: 29.8, ptsTot: 185, ptsPP: 23.1, tl: '38/57', tlPct: '66%', t2: '57/76', t2Pct: '75%', t3: '11/36', t3Pct: '30%', rd: 17 },
    { name: 'ARMANDO, J.', pj: 4, minTot: 27.5, minPP: 6.9, ptsTot: 2, ptsPP: 0.5, tl: '0/2', tlPct: '0%', t2: '1/2', t2Pct: '50%', t3: '0/2', t3Pct: '0%', rd: 3 },
    { name: 'BIESCHKE, S.', pj: 8, minTot: 174.2, minPP: 21.8, ptsTot: 74, ptsPP: 9.2, tl: '19/28', tlPct: '67%', t2: '23/35', t2Pct: '65%', t3: '3/7', t3Pct: '42%', rd: 33 },
    { name: 'CASARES, B.', pj: 8, minTot: 125.8, minPP: 15.7, ptsTot: 44, ptsPP: 5.5, tl: '6/9', tlPct: '66%', t2: '10/20', t2Pct: '50%', t3: '6/20', t3Pct: '30%', rd: 8 },
    { name: 'GARCIA, N.', pj: 8, minTot: 167.3, minPP: 20.9, ptsTot: 46, ptsPP: 5.8, tl: '6/10', tlPct: '60%', t2: '11/28', t2Pct: '39%', t3: '6/22', t3Pct: '27%', rd: 34 },
    { name: 'GONZALEZ, M.', pj: 7, minTot: 103.8, minPP: 14.8, ptsTot: 27, ptsPP: 3.9, tl: '4/4', tlPct: '100%', t2: '7/14', t2Pct: '50%', t3: '3/20', t3Pct: '15%', rd: 6 },
    { name: 'NIEVA, J.', pj: 5, minTot: 27.6, minPP: 5.5, ptsTot: 10, ptsPP: 2, tl: '0/0', tlPct: '0%', t2: '2/4', t2Pct: '50%', t3: '2/4', t3Pct: '50%', rd: 2 },
    { name: 'ORTIZ, C.', pj: 8, minTot: 168.7, minPP: 21.1, ptsTot: 65, ptsPP: 8.1, tl: '6/8', tlPct: '75%', t2: '4/10', t2Pct: '40%', t3: '17/44', t3Pct: '38%', rd: 29 },
    { name: 'PONCE, M.', pj: 3, minTot: 9.1, minPP: 3.0, ptsTot: 6, ptsPP: 2, tl: '0/0', tlPct: '0%', t2: '0/1', t2Pct: '0%', t3: '2/4', t3Pct: '50%', rd: 1 },
    { name: 'RISSO, T.', pj: 2, minTot: 6.9, minPP: 3.4, ptsTot: 3, ptsPP: 1.5, tl: '0/0', tlPct: '0%', t2: '0/0', t2Pct: '0%', t3: '1/1', t3Pct: '100%', rd: 0 },
    { name: 'RODRIGUEZ, N.', pj: 8, minTot: 232.9, minPP: 29.1, ptsTot: 116, ptsPP: 14.5, tl: '24/30', tlPct: '80%', t2: '22/32', t2Pct: '68%', t3: '16/42', t3Pct: '38%', rd: 46 },
    { name: 'ROJAS, S.', pj: 8, minTot: 150.1, minPP: 18.8, ptsTot: 64, ptsPP: 8, tl: '4/8', tlPct: '50%', t2: '15/23', t2Pct: '65%', t3: '10/25', t3Pct: '40%', rd: 16 },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-display pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#2962FF] text-xs font-black tracking-[0.4em] uppercase mb-4">
            ESTADÍSTICAS INDIVIDUALES — TEMPORADA 2024/25
          </p>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
            PLANTEL Y<br/>RENDIMIENTO
          </h1>
        </div>

        {/* Technical Stats Table */}
        <div className="bg-white overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-bold uppercase tracking-tighter">
              <thead>
                {/* Grouped Header */}
                <tr className="bg-[#1A1A1A] text-[#FFD700] text-[10px] tracking-widest border-b border-white/10">
                  <th className="py-2 px-6"></th>
                  <th className="py-2 px-4 text-center"></th>
                  <th colSpan="2" className="py-2 px-4 text-center border-x border-white/5 bg-zinc-900">MINUTOS</th>
                  <th colSpan="2" className="py-2 px-4 text-center border-x border-white/5 bg-[#001D4D]">PUNTOS</th>
                  <th colSpan="3" className="py-2 px-4 text-center border-x border-white/5 bg-zinc-900">TIROS LIBRES</th>
                  <th colSpan="3" className="py-2 px-4 text-center border-x border-white/5 bg-zinc-800">TIROS 2P</th>
                  <th colSpan="3" className="py-2 px-4 text-center border-x border-white/5 bg-zinc-900">TIROS 3P</th>
                  <th className="py-2 px-4 text-center"></th>
                </tr>
                {/* Detailed Header */}
                <tr className="bg-black text-white text-[10px] uppercase tracking-widest">
                  <th className="py-4 px-6">JUGADOR</th>
                  <th className="py-4 px-4 text-center">PJ</th>
                  <th className="py-4 px-4 text-center border-l border-white/5">TOT</th>
                  <th className="py-4 px-4 text-center">PP</th>
                  <th className="py-4 px-4 text-center bg-[#001D4D] border-x border-white/10">TOT</th>
                  <th className="py-4 px-4 text-center bg-[#001D4D]">PP</th>
                  <th className="py-4 px-4 text-center border-l border-white/5">A/I TOT</th>
                  <th className="py-4 px-4 text-center">A/I PP</th>
                  <th className="py-4 px-4 text-center">%</th>
                  <th className="py-4 px-4 text-center border-l border-white/5">A/I TOT</th>
                  <th className="py-4 px-4 text-center">A/I PP</th>
                  <th className="py-4 px-4 text-center">%</th>
                  <th className="py-4 px-4 text-center border-l border-white/5">A/I TOT</th>
                  <th className="py-4 px-4 text-center">A/I PP</th>
                  <th className="py-4 px-4 text-center">%</th>
                  <th className="py-4 px-6 text-center">RD TOT</th>
                </tr>
              </thead>
              <tbody className="text-black text-[12px]">
                {players.map((row, i) => (
                  <tr 
                    key={i} 
                    className={`
                      border-b border-gray-200 transition-colors
                      ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      hover:bg-blue-50
                    `}
                  >
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-gray-200 rounded-full border border-gray-300 overflow-hidden shrink-0">
                            <img src={`https://i.pravatar.cc/100?u=${row.name}`} alt="Player" className="w-full h-full object-cover grayscale" />
                         </div>
                         <span className="font-black text-gray-900 tracking-tighter whitespace-nowrap">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-500">{row.pj}</td>
                    <td className="py-3 px-4 text-center text-gray-500 font-teko text-lg border-l border-gray-100">{row.minTot}</td>
                    <td className="py-3 px-4 text-center text-gray-500 font-teko text-lg">{row.minPP}</td>
                    <td className="py-3 px-4 text-center bg-[#001D4D] text-[#FFD700] font-black text-lg border-x border-white/10">{row.ptsTot}</td>
                    <td className="py-3 px-4 text-center bg-[#001D4D] text-[#FFD700] font-black text-lg">{row.ptsPP}</td>
                    <td className="py-3 px-4 text-center text-gray-500 border-l border-gray-100">{row.tl}</td>
                    <td className="py-3 px-4 text-center text-gray-400">1.9/2.4</td>
                    <td className="py-3 px-4 text-center font-black text-blue-600">{row.tlPct}</td>
                    <td className="py-3 px-4 text-center text-gray-500 border-l border-gray-100">{row.t2}</td>
                    <td className="py-3 px-4 text-center text-gray-400">3.3/4.4</td>
                    <td className="py-3 px-4 text-center font-black text-blue-600">{row.t2Pct}</td>
                    <td className="py-3 px-4 text-center text-gray-500 border-l border-gray-100">{row.t3}</td>
                    <td className="py-3 px-4 text-center text-gray-400">2.3/5.1</td>
                    <td className="py-3 px-4 text-center font-black text-blue-600">{row.t3Pct}</td>
                    <td className="py-3 px-6 text-center font-black text-gray-400">{row.rd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend/Footer */}
        <div className="mt-8 text-[9px] font-mono text-gray-600 uppercase tracking-widest flex justify-between">
           <p>* ESTADÍSTICAS INDIVIDUALES PROCESADAS POR EL CENTRO DE ANÁLISIS BELGRANO</p>
           <p>CONFERENCIA NORTE - LIGA FEDERAL</p>
        </div>

      </div>
    </div>
  );
};

export default PlantelPage;
