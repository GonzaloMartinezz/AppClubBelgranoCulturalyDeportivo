const NuestraFamilia = () => {
  const stats = [
    { value: '106', label: 'Años de Historia', suffix: '+' },
    { value: '5', label: 'Socios Activos', suffix: 'K+' },
    { value: '3', label: 'Títulos Liga', suffix: '' },
  ];

  return (
    <section id="nuestra-familia" className="bg-dark relative overflow-hidden">
      {/* Background Large Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-teko text-[25vw] font-bold text-white/[0.02] leading-none uppercase whitespace-nowrap">
          FAMILIA BELGRANO
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-3 border border-brand/30 bg-brand/5 px-4 py-2 font-oswald text-[10px] uppercase tracking-[0.25em] text-brand font-bold mb-6">
              IDENTIDAD / 1920
            </div>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-teko font-bold uppercase leading-[0.85] tracking-tight">
              <span className="text-white">Más que</span><br />
              <span className="text-brand">un Club</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm font-sans leading-relaxed max-w-md lg:text-right lg:mb-4">
            Desde Barrio Sur, hemos forjado un legado de pasión, garra y comunidad.
            Somos la familia que alienta incondicionalmente en cada cuarto.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
          
          {/* Image Area */}
          <div className="lg:col-span-8 h-[400px] md:h-[500px] bg-surface relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-brand/20 to-transparent group-hover:opacity-70 transition-opacity duration-700"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="font-teko text-9xl font-bold text-white/5 block">BEL</span>
                <span className="font-oswald text-sm text-white/20 uppercase tracking-[0.3em]">Imagen Histórica</span>
              </div>
            </div>
            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand/50"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brand/50"></div>
          </div>
          
          {/* Stats Column */}
          <div className="lg:col-span-4 flex flex-col">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex-1 p-8 md:p-10 flex flex-col justify-center items-center text-center group cursor-default border-b lg:border-b-0 border-white/10 last:border-b-0 hover:bg-brand transition-colors duration-300 ${idx < stats.length - 1 ? 'lg:border-b' : ''}`}
              >
                <span className="text-5xl md:text-6xl font-teko font-bold mb-2 text-white group-hover:text-white transition-colors">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-[10px] font-oswald uppercase tracking-[0.25em] text-gray-500 group-hover:text-white/70 transition-colors">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default NuestraFamilia;
