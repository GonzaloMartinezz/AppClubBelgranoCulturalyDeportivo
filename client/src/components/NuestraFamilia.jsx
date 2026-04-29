import React from 'react';

const NuestraFamilia = () => {
  return (
    <section id="nuestra-familia" className="bg-dark text-white border-y-2 border-white/10 py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Decorative brutalist background text */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none flex items-center justify-center">
        <span className="text-[20vw] font-teko font-bold leading-none uppercase whitespace-nowrap">
          FAMILIA BELGRANO
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 border-2 border-white/10">
          
          {/* Header Column */}
          <div className="lg:col-span-5 p-8 md:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-white/10 flex flex-col justify-between bg-dark">
            <div>
              <div className="inline-block border border-brand text-brand px-3 py-1 font-oswald text-xs uppercase tracking-widest mb-8 font-bold">
                Identidad / 1920
              </div>
              <h2 className="text-6xl md:text-8xl font-teko font-bold uppercase leading-[0.85] tracking-normal mb-8">
                Más que <br />
                <span className="text-brand">un Club</span>
              </h2>
            </div>
            <p className="font-sans text-gray-400 leading-relaxed text-sm max-w-md">
              Desde nuestros inicios en Barrio Sur, hemos forjado un legado de pasión, garra y comunidad. No somos solo un equipo de básquet; somos la familia que alienta incondicionalmente en cada cuarto.
            </p>
          </div>

          {/* Image & Stats Column */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="h-96 bg-surface relative overflow-hidden group border-b-2 border-white/10">
              <div className="absolute inset-0 bg-brand/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-700"></div>
              {/* Brutalist Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-oswald text-4xl text-white/20 uppercase tracking-widest font-bold">IMAGEN HISTÓRICA</span>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 h-full">
              <div className="p-8 border-r-2 lg:border-b-0 border-b-2 border-white/10 flex flex-col justify-center items-center text-center hover:bg-white hover:text-dark transition-colors group cursor-default">
                <span className="text-6xl font-teko font-bold mb-2 group-hover:text-brand transition-colors">100+</span>
                <span className="text-[10px] font-oswald uppercase tracking-[0.2em] text-gray-500 group-hover:text-dark">Años de Historia</span>
              </div>
              <div className="p-8 border-b-2 lg:border-b-0 border-r-0 lg:border-r-2 border-white/10 flex flex-col justify-center items-center text-center hover:bg-brand transition-colors group cursor-default">
                <span className="text-6xl font-teko font-bold mb-2 text-white">5K+</span>
                <span className="text-[10px] font-oswald uppercase tracking-[0.2em] text-gray-500 group-hover:text-white/70">Socios Activos</span>
              </div>
              <div className="p-8 lg:col-span-1 col-span-2 flex flex-col justify-center items-center text-center bg-brand text-white group cursor-default hover:bg-blue-700 transition-colors">
                <span className="text-6xl font-teko font-bold mb-2">3</span>
                <span className="text-[10px] font-oswald uppercase tracking-[0.2em] text-white/70">Títulos Liga</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NuestraFamilia;
