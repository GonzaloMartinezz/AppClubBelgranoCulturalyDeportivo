import React from 'react';

const PlayerFaceOff = () => {
  // Datos mockeados (luego vendrán de tu API/DB en el frontend)
  const stats = [
    { label: 'Puntos', p1: 18.5, p2: 16.2 },
    { label: 'Rebotes', p1: 4.2, p2: 7.1 },
    { label: 'Asistencias', p1: 6.8, p2: 2.1 },
    { label: 'Minutos', p1: '28:15', p2: '31:00' },
    { label: 'Eficiencia', p1: 19.4, p2: 17.8 },
  ];

  return (
    <div className="bg-[#0A0A0A] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl font-black uppercase text-white mb-8 text-center tracking-tighter">
          Performance <span className="text-blue-500 italic">Face-Off</span>
        </h3>

        <div className="flex flex-col md:flex-row bg-[#161616] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Jugador 1 (Belgrano) */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-end pt-8 relative bg-gradient-to-t from-[#0A0A0A] to-transparent order-2 md:order-1">
            <span className="absolute top-4 left-4 text-6xl font-black text-white/5">10</span>
            <div className="h-48 w-48 bg-gray-800 rounded-full mb-4"></div> {/* Placeholder foto */}
            <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2">G. Martinez</h4>
            <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest w-full text-center">
              Belgrano
            </div>
          </div>

          {/* Estadísticas Centrales */}
          <div className="w-full md:w-1/3 px-4 py-8 flex flex-col justify-center border-y md:border-y-0 md:border-x border-white/5 order-1 md:order-2">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex justify-between items-center mb-4 last:mb-0">
                <span className="text-sm font-mono font-bold text-blue-400">{stat.p1}</span>
                <span className="text-[11px] text-gray-500 uppercase tracking-[0.2em]">{stat.label}</span>
                <span className="text-sm font-mono font-bold text-red-400">{stat.p2}</span>
              </div>
            ))}
          </div>

          {/* Jugador 2 (Rival) */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-end pt-8 relative bg-gradient-to-t from-[#0A0A0A] to-transparent order-3">
            <span className="absolute top-4 right-4 text-6xl font-black text-white/5">07</span>
            <div className="h-48 w-48 bg-gray-800 rounded-full mb-4"></div> {/* Placeholder foto */}
            <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2">J. Pérez</h4>
            <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest w-full text-center">
              Concepción BB
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlayerFaceOff;
