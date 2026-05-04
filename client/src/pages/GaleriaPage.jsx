import { useState } from 'react';

const photos = [
  { id: 1, src: '/gallery-stadium.png', title: 'EL ESTADIO', sub: 'Cancha', category: 'CANCHA', span: 'col-span-2 row-span-2' },
  { id: 2, src: '/fans-crowd.png', title: 'LA HINCHADA', sub: 'Hinchas', category: 'HINCHAS', span: '' },
  { id: 3, src: '/player-action.png', title: 'EN ACCIÓN', sub: 'Juego', category: 'JUEGO', span: '' },
  { id: 4, src: '/team-photo.png', title: 'EL PLANTEL', sub: 'Equipo', category: 'EQUIPO', span: 'col-span-2' },
  { id: 5, src: '/hero-bg.png', title: 'PURA GARRA', sub: 'Juego', category: 'JUEGO', span: '' },
  { id: 6, src: '/fans-crowd.png', title: 'LA FAMILIA', sub: 'Hinchas', category: 'HINCHAS', span: '' },
];

const categories = ['TODOS', 'CANCHA', 'JUEGO', 'EQUIPO', 'HINCHAS'];

const SectionTitle = ({ title, subtitle, align = 'center' }) => (
  <div style={{ marginBottom: '40px', textAlign: align }}>
    <h2 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,4.5rem)', textTransform: 'uppercase', lineHeight: 0.9, color: 'white', letterSpacing: '-0.02em' }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)', marginTop: '8px' }}>
        {subtitle}
      </p>
    )}
  </div>
);

const GaleriaPage = () => {
  const [filter, setFilter] = useState('TODOS');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'TODOS' ? photos : photos.filter(p => p.category === filter);

  return (
    <div style={{ background: 'var(--color-dark)', paddingTop: '68px', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '40vh', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="/gallery-stadium.png" alt="Gallery" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,28,28,0.2) 0%, var(--color-dark) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: '0 20px' }}>
          <p style={{ fontFamily: 'var(--font-oswald)', fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '10px' }}>
            Archivo Visual
          </p>
          <h1 style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: 'clamp(4rem, 15vw, 8rem)', textTransform: 'uppercase', color: 'white', lineHeight: 0.8, margin: 0 }}>
            GALERÍA
          </h1>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[68px] z-30 border-b" style={{ background: 'rgba(28,28,28,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container flex gap-2 py-4 overflow-x-auto scrollbar-hide justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className="shrink-0 font-oswald font-bold text-[12px] uppercase tracking-widest px-4 py-2 transition-all duration-200"
              style={{
                borderRadius: '10px',
                background: filter === c ? 'var(--color-accent)' : 'transparent',
                color: filter === c ? '#fff' : 'rgba(255,255,255,0.4)',
              }}
            >
              {c === 'TODOS' ? 'Todos' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="app-container">
          <SectionTitle title="Momentos" subtitle="Capturas de la Temporada" align="left" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
            {filtered.map((img) => (
              <div
                key={img.id}
                onClick={() => setLightbox(img)}
                className={`relative overflow-hidden group cursor-pointer ${img.span}`}
                style={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)', background: 'var(--color-surface-2)' }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ opacity: 0.8 }}
                />
                <div className="absolute inset-0 opacity-60 group-hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
                <div className="absolute bottom-6 left-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-oswald text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--color-accent)' }}>{img.sub}</p>
                  <h3 className="font-teko font-bold text-2xl text-white uppercase leading-none">{img.title}</h3>
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
          style={{ background: 'rgba(12,12,12,0.98)', backdropFilter: 'blur(20px)' }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white font-oswald uppercase tracking-widest text-sm hover:text-accent transition-colors"
            >
              Cerrar ✕
            </button>
            <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={lightbox.src} alt={lightbox.title} className="w-full object-contain max-h-[80vh]" />
            </div>
            <div className="mt-6 text-center">
              <span className="font-oswald text-[12px] uppercase tracking-[0.3em] block mb-2" style={{ color: 'var(--color-accent)' }}>{lightbox.sub}</span>
              <h3 className="font-teko font-bold text-4xl text-white uppercase">{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaPage;
