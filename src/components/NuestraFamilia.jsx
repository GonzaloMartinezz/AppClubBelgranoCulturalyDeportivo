import teamMobile from '../assets/hero.png';

const NuestraFamilia = () => {
  const stats = [
    { value: '106', label: 'Años de Historia', suffix: '+' },
    { value: '5', label: 'Socios Activos', suffix: 'K+' },
    { value: '3', label: 'Títulos Liga', suffix: '' },
  ];

  return (
    <section id="nuestra-familia" className="relative overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Background Large Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="bg-text text-[25vw] font-bold leading-none uppercase whitespace-nowrap">
          FAMILIA BELGRANO
        </span>
      </div>

      <div className="max-w-350 mx-auto section-inner px-6 md:px-12 py-28 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20 pb-8 border-b border-white/10">
          <div>
            <div
              className="inline-flex items-center gap-3 px-4 py-2 font-oswald text-[10px] uppercase tracking-[0.25em] font-bold mb-6"
              style={{ background: 'rgba(255,140,0,0.1)', border: '1px solid var(--color-accent)', color: 'var(--color-accent)' }}
            >
              IDENTIDAD / 1920
            </div>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-teko font-bold uppercase leading-[0.85] tracking-tight">
              <span className="text-white">Más que</span><br />
              <span style={{ color: 'var(--color-accent)' }}>un Club</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm font-sans leading-relaxed max-w-md lg:text-right lg:mb-4">
            Desde 1920, hemos forjado un legado de pasión, garra y comunidad.
            Somos la familia que alienta incondicionalmente en cada encuentro.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">

          {/* Image Area */}
          <div className="lg:col-span-8 image-area h-[400px] md:h-[500px] relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, rgba(255,140,0,0.05) 0%, transparent 100%)' }}>
            <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-700"></div>
            {/* Mobile image (falls back to decorative overlay on large screens) */}
            <img src={teamMobile} alt="Equipo Belgrano" className="w-full h-full object-cover lg:hidden block" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center hidden lg:block">
                <span className="font-teko text-9xl font-bold text-white/5 block">BEL</span>
                <span className="font-oswald text-sm text-white/20 uppercase tracking-[0.3em]">Imagen Histórica</span>
              </div>
            </div>
            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity accent-corner"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity accent-corner"></div>
          </div>

          {/* Stats Column */}
          <div className="lg:col-span-4 flex flex-col">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex-1 stats-item p-6 md:p-10 flex flex-col justify-center items-center text-center group cursor-default border-b lg:border-b-0 border-white/10 last:border-b-0 transition-all duration-300 hover:-translate-y-1 ${idx < stats.length - 1 ? 'lg:border-b' : ''}`}
                style={{ borderBottomColor: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,140,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span className="stats-value text-5xl md:text-6xl font-teko font-bold mb-2 text-white transition-colors">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-[10px] font-oswald uppercase tracking-[0.25em] text-gray-500 group-hover:text-gray-300 transition-colors">
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
