import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const GaleriaPagePro = () => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const images = [
    { id: 1, src: '/hero-bg.png', title: 'Entrenamiento Intenso', category: 'Entrenamiento', featured: true },
    { id: 2, src: '/team-photo.png', title: 'Equipo 2026', category: 'Equipo', featured: true },
    { id: 3, src: '/player-action.png', title: 'Acción en Cancha', category: 'Partidos', featured: false },
    { id: 4, src: '/gallery-stadium.png', title: 'Estadio Belgrano', category: 'Instalaciones', featured: false },
    { id: 5, src: '/fans-crowd.png', title: 'La Hinchada', category: 'Comunidad', featured: true },
    { id: 6, src: '/hero-bg.png', title: 'Celebración de Gol', category: 'Partidos', featured: false },
    { id: 7, src: '/shop-jerseys.png', title: 'Tienda Oficial', category: 'Tienda', featured: false },
    { id: 8, src: '/team-photo.png', title: 'Trofeos Ganados', category: 'Logros', featured: false },
    { id: 9, src: '/player-action.png', title: 'Momento Histórico', category: 'Momentos', featured: true },
  ];

  const categories = ['Todos', ...new Set(images.map(img => img.category))];

  const filtered = selectedCategory === 'Todos'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === filtered.length - 1 ? 0 : prev + 1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden mb-12 md:mb-20">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          src="/team-photo.png"
          alt="Gallery Hero"
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <span className="section-label inline-flex items-center gap-2 mb-4">
            📸 GALERÍA DE FOTOS
          </span>
          <h1 className="text-5xl md:text-7xl font-teko font-black uppercase tracking-tighter text-white">
            Momentos Belgrano
          </h1>
          <p className="text-base md:text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Revive los mejores momentos del club, desde entrenamientos hasta celebraciones de victorias
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="app-container mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedIdx(null);
              }}
              className={`px-4 md:px-6 py-2.5 md:py-3 font-oswald text-xs md:text-sm uppercase tracking-wider transition-all duration-300 rounded-sm border
                ${selectedCategory === cat
                  ? 'bg-brand text-white border-brand'
                  : 'bg-surface border-white/10 text-muted hover:text-white hover:border-white/30'
                }`}
            >
              {cat}
              <span className="ml-2 text-xs">({filtered.filter(img => selectedCategory === 'Todos' ? true : img.category === cat).length})</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Gallery Grid with Masonry-like Layout */}
      <div className="app-container pb-16 md:pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted text-lg">No hay imágenes en esta categoría</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]"
          >
            {filtered.map((image, idx) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                onClick={() => setSelectedIdx(idx)}
                className={`group relative rounded-sm overflow-hidden cursor-pointer bg-surface-2 border border-white/10 hover:border-brand transition-all duration-300
                  ${image.featured ? 'sm:col-span-2 lg:col-span-2 md:row-span-2' : ''}`}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Top Badge */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-oswald font-bold uppercase tracking-widest text-accent px-2.5 py-1.5 bg-black/40 rounded-sm backdrop-blur">
                      {image.category}
                    </span>
                    {image.featured && (
                      <span className="text-xs font-oswald font-bold uppercase tracking-widest text-yellow-400 px-2.5 py-1.5 bg-yellow-500/20 rounded-sm backdrop-blur">
                        ⭐ Destacado
                      </span>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div>
                    <h3 className="font-oswald text-base md:text-lg uppercase tracking-wider text-white font-bold mb-3">
                      {image.title}
                    </h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-brand text-black font-oswald font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-accent-2 transition-all duration-200">
                      <span>Ver</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* View Count */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-3 py-2 bg-black/40 backdrop-blur rounded-sm border border-white/20">
                    <p className="text-xs text-white font-oswald font-bold">EXPANDIR</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl max-h-[85vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Main Image */}
              <div className="relative flex-1 rounded-t-sm md:rounded-t-lg overflow-hidden bg-black">
                <motion.img
                  key={selectedIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={filtered[selectedIdx].src}
                  alt={filtered[selectedIdx].title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info Bar */}
              <div className="bg-gradient-to-t from-dark to-dark-2 px-4 md:px-8 py-4 md:py-6 rounded-b-sm md:rounded-b-lg border-t border-white/10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-lg md:text-2xl font-oswald uppercase tracking-wider text-white font-bold mb-2">
                      {filtered[selectedIdx].title}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {filtered[selectedIdx].category} •{' '}
                      <span className="text-accent font-oswald">
                        {selectedIdx + 1} / {filtered.length}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2.5 rounded-sm bg-white/10 hover:bg-brand text-white transition-all duration-200 border border-white/10">
                      <Download size={18} />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Buttons */}
              {filtered.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-black/50 backdrop-blur hover:bg-brand transition-all duration-300 text-white z-10"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-black/50 backdrop-blur hover:bg-brand transition-all duration-300 text-white z-10"
                    aria-label="Next"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 backdrop-blur hover:bg-brand transition-all duration-300 text-white z-20"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {/* Keyboard Navigation Info */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 bg-black/50 backdrop-blur px-4 py-2 rounded-sm">
                ← → para navegar • ESC para cerrar
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Navigation */}
      <div
        onKeyDown={(e) => {
          if (selectedIdx === null) return;
          if (e.key === 'ArrowLeft') handlePrev();
          if (e.key === 'ArrowRight') handleNext();
          if (e.key === 'Escape') setSelectedIdx(null);
        }}
        tabIndex={0}
      />
    </div>
  );
};

export default GaleriaPagePro;
