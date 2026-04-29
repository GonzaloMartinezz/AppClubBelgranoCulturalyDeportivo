import React from 'react';

const Galeria = () => {
  const images = [
    { id: 1, title: 'EL GIGANTE', subtitle: 'Estadio', span: 'col-span-1 md:col-span-2 row-span-2' },
    { id: 2, title: 'HINCHADA', subtitle: 'Pasión', span: 'col-span-1 row-span-1' },
    { id: 3, title: 'EQUIPO', subtitle: 'Primera', span: 'col-span-1 row-span-1' },
    { id: 4, title: 'CANTERA', subtitle: 'Formativas', span: 'col-span-1 md:col-span-2 row-span-1' },
  ];

  return (
    <section id="galeria" className="bg-surface py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Brutalist Header */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-white pb-8 mb-16">
          <div>
            <h2 className="text-7xl md:text-[9rem] font-teko font-bold uppercase leading-[0.8] tracking-normal text-white">
              Gale<span className="text-brand">ría</span>
            </h2>
          </div>
          <div className="mt-8 md:mt-0 text-right">
            <p className="font-oswald text-sm text-gray-400 uppercase tracking-widest max-w-xs">
              Capturando la esencia brutal de cada encuentro. Sangre, sudor y gloria en imágenes.
            </p>
          </div>
        </div>

        {/* Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative bg-dark border-2 border-white/20 group overflow-hidden ${img.span}`}
            >
              <div className="absolute inset-0 bg-white/5 group-hover:bg-brand/20 transition-colors duration-500 z-0"></div>

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-oswald text-[10px] text-brand font-bold uppercase tracking-[0.3em] mb-1">
                  {img.subtitle}
                </span>
                <h3 className="font-teko text-4xl font-bold text-white uppercase leading-none">
                  {img.title}
                </h3>
              </div>

              {/* Central Brutalist Number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-teko text-8xl text-white/5 font-bold group-hover:scale-150 transition-transform duration-700">
                  0{img.id}
                </span>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand opacity-0 group-hover:opacity-100 transition-opacity m-4"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand opacity-0 group-hover:opacity-100 transition-opacity m-4"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <button className="inline-block border-2 border-white text-white font-oswald font-bold uppercase text-sm tracking-[0.2em] px-12 py-5 hover:bg-white hover:text-dark transition-all duration-300 relative group overflow-hidden">
            <span className="relative z-10">Ver Archivo Completo</span>
            <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Galeria;
