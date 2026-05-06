const PlayerFaceOff = () => {
  const stats = [
    { label: 'Puntos', p1: 18.5, p2: 16.2 },
    { label: 'Rebotes', p1: 4.2, p2: 7.1 },
    { label: 'Asistencias', p1: 6.8, p2: 2.1 },
    { label: 'Robos', p1: 2.3, p2: 1.5 },
    { label: 'Eficiencia', p1: 19.4, p2: 17.8 },
  ];

  return (
    <section className="bg-dark py-32 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand/5 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-white/5 rounded-full blur-[120px]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[10px] font-oswald font-bold text-gray-600 uppercase tracking-[0.35em] mb-4">ESTADÍSTICAS CLAVE</p>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-teko uppercase tracking-tight">
            <span className="text-white">Face-</span><span className="text-stroke-brand">Off</span>
          </h2>
        </div>

        {/* Face-Off Card */}
        <div className="bg-surface border border-white/10 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">

            {/* Player 1 - Home */}
            <div className="md:col-span-2 p-10 md:p-16 flex flex-col items-center justify-center relative group border-b md:border-b-0 md:border-r border-white/5">
              <div className="absolute inset-0 bg-linear-to-t from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="absolute top-6 left-8 text-[8rem] font-teko font-bold text-white/[0.03] group-hover:text-brand/[0.05] transition-colors">10</span>
              
              <div className="w-40 h-40 md:w-48 md:h-48 bg-dark border-2 border-brand/20 rounded-full mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-brand/50 transition-colors duration-500">
                <svg className="w-32 h-32 text-gray-700/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-teko font-bold text-white uppercase tracking-wider mb-2">G. Martinez</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand"></span>
                <span className="text-xs font-oswald text-gray-500 uppercase tracking-[0.2em]">Base • Belgrano</span>
              </div>
            </div>

            {/* Stats Center */}
            <div className="md:col-span-1 bg-dark/50 py-12 px-4 flex flex-col justify-center border-b md:border-b-0 border-white/5">
              <div className="space-y-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[9px] text-gray-600 font-oswald uppercase tracking-[0.25em] mb-3">{stat.label}</span>
                    <div className="flex items-center justify-between w-full px-2">
                      <span className="text-2xl font-teko font-bold text-brand">{stat.p1}</span>
                      <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>
                      <span className="text-2xl font-teko font-bold text-gray-400">{stat.p2}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Player 2 - Away */}
            <div className="md:col-span-2 p-10 md:p-16 flex flex-col items-center justify-center relative group">
              <div className="absolute inset-0 bg-linear-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="absolute top-6 right-8 text-[8rem] font-teko font-bold text-white/[0.03] group-hover:text-white/[0.05] transition-colors">07</span>
              
              <div className="w-40 h-40 md:w-48 md:h-48 bg-dark border-2 border-white/10 rounded-full mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-white/30 transition-colors duration-500">
                <svg className="w-32 h-32 text-gray-700/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-teko font-bold text-white uppercase tracking-wider mb-2">J. Pérez</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-oswald text-gray-500 uppercase tracking-[0.2em]">Escolta • Concepción BB</span>
                <span className="w-2 h-2 bg-gray-500"></span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerFaceOff;
