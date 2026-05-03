const Galeria = () => {
  const images = [
    { id: 1, title: 'EL GIGANTE', subtitle: 'Estadio', span: 'col-span-1 md:col-span-2 row-span-2' },
    { id: 2, title: 'HINCHADA', subtitle: 'Pasión', span: 'col-span-1 row-span-1' },
    { id: 3, title: 'EQUIPO', subtitle: 'Primera', span: 'col-span-1 row-span-1' },
    { id: 4, title: 'CANTERA', subtitle: 'Formativas', span: 'col-span-1 md:col-span-2 row-span-1' },
  ];

  return (
    <section id="galeria" className="bg-surface py-32 px-6 md:px-12 relative">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <h2 className="text-7xl md:text-9xl font-teko font-bold uppercase leading-[0.85] tracking-tight">
              <span className="text-white">Gale</span><span className="text-brand">ría</span>
            </h2>
          </div>
          <p className="text-gray-500 font-oswald text-sm uppercase tracking-[0.2em] max-w-xs md:text-right">
            Capturando la esencia de cada encuentro. Sangre, sudor y gloria.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px] md:auto-rows-[250px]">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative bg-dark border border-white/10 group overflow-hidden cursor-pointer hover:border-brand/30 transition-colors duration-500 ${img.span}`}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-linear-to-br from-brand/10 to-transparent group-hover:from-brand/20 transition-all duration-500"></div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-oswald text-brand font-bold uppercase tracking-[0.3em] mb-1">
                  {img.subtitle}
                </span>
                <h3 className="font-teko text-4xl font-bold text-white uppercase leading-none">
                  {img.title}
                </h3>
              </div>

              {/* Center Number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-teko text-8xl text-white/[0.04] font-bold group-hover:scale-125 transition-transform duration-700">
                  0{img.id}
                </span>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-brand/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-brand/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="group relative inline-block px-12 py-5 border border-white/30 text-white font-oswald font-bold uppercase text-xs tracking-[0.25em] overflow-hidden hover:border-brand transition-colors">
            <span className="relative z-10">Ver Archivo Completo</span>
            <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Galeria;
