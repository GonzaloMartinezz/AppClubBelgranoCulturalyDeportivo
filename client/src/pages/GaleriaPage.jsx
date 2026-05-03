import { useState } from 'react';

const photos = [
  { id: 1, src: '/gallery-stadium.png', title: 'EL ESTADIO',  sub: 'Cancha',  category: 'CANCHA',  span: 'col-span-2 row-span-2' },
  { id: 2, src: '/fans-crowd.png',      title: 'LA HINCHADA', sub: 'Hinchas', category: 'HINCHAS', span: '' },
  { id: 3, src: '/player-action.png',   title: 'EN ACCIÓN',   sub: 'Juego',   category: 'JUEGO',   span: '' },
  { id: 4, src: '/team-photo.png',      title: 'EL PLANTEL',  sub: 'Equipo',  category: 'EQUIPO',  span: 'col-span-2' },
  { id: 5, src: '/hero-bg.png',         title: 'PURA GARRA',  sub: 'Juego',   category: 'JUEGO',   span: '' },
  { id: 6, src: '/fans-crowd.png',      title: 'LA FAMILIA',  sub: 'Hinchas', category: 'HINCHAS', span: '' },
];

const categories = ['TODOS', 'CANCHA', 'JUEGO', 'EQUIPO', 'HINCHAS'];

const GaleriaPage = () => {
  const [filter, setFilter]     = useState('TODOS');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'TODOS' ? photos : photos.filter(p => p.category === filter);

  return (
    <div className="pt-16" style={{ background: 'var(--color-dark)' }}>

      {/* Header */}
      <section className="relative overflow-hidden py-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container relative z-10">
          <div className="section-hero-title absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none" style={{ fontSize: 'clamp(6rem, 20vw, 12rem)' }}>
            GALLERY
          </div>
          <div className="relative z-10">
            <p className="section-label mb-4">Archivo Visual</p>
            <h1 className="font-teko font-bold uppercase leading-[0.88] tracking-tight text-white" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}>
              Photo<br /><span style={{ color: 'var(--color-accent)' }}>Gallery</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-30 border-b" style={{ background: 'rgba(18,18,18,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className="flex-shrink-0 font-oswald font-bold text-[12px] uppercase tracking-[0.1em] px-4 py-2 transition-all duration-200"
              style={{
                borderRadius: '10px',
                background: filter === c ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: filter === c ? '#fff' : 'rgba(255,255,255,0.4)',
              }}
            >
              {c === 'TODOS' ? 'Todos' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-8">
        <div className="app-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
            {filtered.map((img) => (
              <div
                key={img.id}
                onClick={() => setLightbox(img)}
                className={`relative overflow-hidden group cursor-pointer ${img.span}`}
                style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }} />
                <div className="absolute bottom-4 left-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-oswald text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: 'var(--color-accent)' }}>{img.sub}</p>
                  <h3 className="font-teko font-bold text-xl text-white uppercase leading-none">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(12,12,12,0.97)', backdropFilter: 'blur(16px)' }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="btn-ghost absolute -top-12 right-0"
            >
              Cerrar ✕
            </button>
            <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img src={lightbox.src} alt={lightbox.title} className="w-full object-contain max-h-[70vh]" />
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <h3 className="font-teko font-bold text-3xl text-white uppercase">{lightbox.title}</h3>
                <p className="font-oswald text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-accent)' }}>{lightbox.sub}</p>
              </div>
              <span className="badge badge-accent">{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaPage;
