import { useState } from 'react';

const Galeria = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const images = [
    { id: 1, title: 'EL GIGANTE', subtitle: 'Estadio', span: 'col-span-1 md:col-span-2 row-span-2', image: '/hero-bg.png' },
    { id: 2, title: 'HINCHADA', subtitle: 'Pasión', span: 'col-span-1 row-span-1', image: '/fans-crowd.png' },
    { id: 3, title: 'EQUIPO', subtitle: 'Primera', span: 'col-span-1 row-span-1', image: '/hero-bg.png' },
    { id: 4, title: 'CANTERA', subtitle: 'Formativas', span: 'col-span-1 md:col-span-2 row-span-1', image: '/fans-crowd.png' },
  ];

  return (
    <section id="galeria" className="py-32 px-6 md:px-12 relative" style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="max-w-350 mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <h2 className="text-7xl md:text-9xl font-teko font-bold uppercase leading-[0.85] tracking-tight">
              <span className="text-white">Gale</span><span style={{ color: 'var(--color-accent)' }}>ría</span>
            </h2>
          </div>
          <p className="text-gray-500 font-oswald text-sm uppercase tracking-[0.2em] max-w-xs md:text-right">
            Capturando momentos de gloria. Sangre, sudor y pasión en cada toma.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px] md:auto-rows-[250px]">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative overflow-hidden cursor-pointer group transition-all duration-500 ${img.span}`}
              style={{
                background: 'linear-gradient(135deg, rgba(255,140,0,0.1) 0%, transparent 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onMouseEnter={() => setHoveredId(img.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Image */}
              <img
                src={img.image}
                alt={img.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 transition-all duration-500 flex flex-col justify-end p-6"
                style={{
                  background: hoveredId === img.id
                    ? 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%)'
                    : 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)'
                }}
              >
                <span
                  className="text-[10px] font-oswald font-bold uppercase tracking-[0.3em] mb-2 transition-all duration-300"
                  style={{ color: 'var(--color-accent)', opacity: hoveredId === img.id ? 1 : 0.6 }}
                >
                  {img.subtitle}
                </span>
                <h3
                  className="font-teko text-4xl font-bold text-white uppercase leading-none transition-all duration-300"
                  style={{ transform: hoveredId === img.id ? 'translateY(0)' : 'translateY(10px)' }}
                >
                  {img.title}
                </h3>
              </div>

              {/* Center Number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span
                  className="font-teko text-8xl font-bold transition-all duration-700"
                  style={{
                    color: 'rgba(255,255,255,0.02)',
                    transform: hoveredId === img.id ? 'scale(1.2)' : 'scale(1)'
                  }}
                >
                  0{img.id}
                </span>
              </div>

              {/* Corner Accents */}
              <div
                className="absolute top-3 left-3 w-6 h-6 border-t border-l transition-all duration-300"
                style={{
                  borderColor: 'var(--color-accent)',
                  opacity: hoveredId === img.id ? 1 : 0
                }}
              />
              <div
                className="absolute bottom-3 right-3 w-6 h-6 border-b border-r transition-all duration-300"
                style={{
                  borderColor: 'var(--color-accent)',
                  opacity: hoveredId === img.id ? 1 : 0
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            className="group relative inline-block px-12 py-5 font-oswald font-bold uppercase text-xs tracking-[0.25em] overflow-hidden transition-all duration-300"
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.background = 'rgba(255,140,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span className="relative z-10">Ver Archivo Completo</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Galeria;
