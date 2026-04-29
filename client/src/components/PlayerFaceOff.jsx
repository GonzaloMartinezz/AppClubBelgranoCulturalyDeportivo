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
    <div className="bg-dark py-24 px-6 relative">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand/10 rounded-full blur-[100px]"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs font-oswald font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">Estadísticas Clave</h2>
          <h3 className="text-6xl md:text-8xl font-teko uppercase text-white tracking-normal drop-shadow-lg">
            Performance <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-cyan-400">Face-Off</span>
          </h3>
        </div>

        <div className="flex flex-col md:flex-row bg-surface/80 backdrop-blur-xl border border-white/10 rounded-4xl overflow-hidden shadow-2xl relative">

          {/* Jugador 1 (Belgrano) */}
          <div className="w-full md:w-2/5 flex flex-col items-center justify-end pt-12 pb-8 relative group order-2 md:order-1">
            <div className="absolute inset-0 bg-linear-to-t from-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="absolute top-6 left-8 text-8xl font-teko font-bold text-white/5 group-hover:text-brand/10 transition-colors duration-500">10</span>
            <div className="h-56 w-56 bg-dark border-4 border-brand/30 rounded-full mb-6 shadow-[0_0_30px_rgba(0,51,160,0.3)] relative overflow-hidden flex items-end justify-center group-hover:border-brand transition-colors duration-500">
              {/* Silhouette placeholder */}
              <svg className="w-48 h-48 text-gray-600/50 -mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
            </div>
            <h4 className="text-2xl font-teko font-bold text-white uppercase tracking-wider mb-1 drop-shadow-md">G. Martinez</h4>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand"></span>
              <span className="text-xs font-oswald text-gray-400 uppercase tracking-widest">Base • Belgrano</span>
            </div>
          </div>

          {/* Estadísticas Centrales */}
          <div className="w-full md:w-1/5 py-12 flex flex-col justify-center relative z-10 order-1 md:order-2 bg-dark/50 backdrop-blur-md border-y md:border-y-0 md:border-x border-white/5 shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent"></div>
            <div className="space-y-8 px-4 relative">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <span className="text-[10px] text-gray-500 font-oswald uppercase tracking-[0.2em] mb-2">{stat.label}</span>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xl font-teko font-bold text-brand group-hover:scale-110 transition-transform">{stat.p1}</span>
                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                    <span className="text-xl font-teko font-bold text-red-500 group-hover:scale-110 transition-transform">{stat.p2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jugador 2 (Rival) */}
          <div className="w-full md:w-2/5 flex flex-col items-center justify-end pt-12 pb-8 relative group order-3">
            <div className="absolute inset-0 bg-linear-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="absolute top-6 right-8 text-8xl font-teko font-bold text-white/5 group-hover:text-red-500/10 transition-colors duration-500">07</span>
            <div className="h-56 w-56 bg-dark border-4 border-red-500/30 rounded-full mb-6 shadow-[0_0_30px_rgba(220,38,38,0.2)] relative overflow-hidden flex items-end justify-center group-hover:border-red-500 transition-colors duration-500">
              {/* Silhouette placeholder */}
              <svg className="w-48 h-48 text-gray-600/50 -mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
            </div>
            <h4 className="text-2xl font-teko font-bold text-white uppercase tracking-wider mb-1 drop-shadow-md">J. Pérez</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs font-oswald text-gray-400 uppercase tracking-widest">Escolta • Concepción BB</span>
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlayerFaceOff;
