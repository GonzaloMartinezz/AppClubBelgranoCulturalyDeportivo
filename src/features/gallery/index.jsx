import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GaleriaPageNew = () => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const images = [
    { id: 1, src: '/hero-bg.png', title: 'Entrenamiento', category: 'Entrenamiento' },
    { id: 2, src: '/team-photo.png', title: 'Equipo 2026', category: 'Equipo' },
    { id: 3, src: '/player-action.png', title: 'Partido En Vivo', category: 'Partidos' },
    { id: 4, src: '/gallery-stadium.png', title: 'Estadio Belgrano', category: 'Instalaciones' },
    { id: 5, src: '/fans-crowd.png', title: 'Hinchas', category: 'Comunidad' },
    { id: 6, src: '/hero-bg.png', title: 'Celebración', category: 'Celebraciones' },
    { id: 7, src: '/shop-jerseys.png', title: 'Camisetas', category: 'Tienda' },
    { id: 8, src: '/hero-bg.png', title: 'Trofeos', category: 'Logros' },
    { id: 9, src: '/team-photo.png', title: 'Momento Especial', category: 'Momentos' },
  ];

  const categories = ['Todos', ...new Set(images.map(img => img.category))];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filtered = selectedCategory === 'Todos'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
      <div className="app-container py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16"
        >
          <span className="section-label mb-3 block">
            GALERÍA DE FOTOS
          </span>
          <h1 className="text-4xl md:text-5xl font-teko font-black uppercase tracking-tighter mb-8">
            Momentos Belgrano
          </h1>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-oswald text-xs uppercase tracking-wider transition-all rounded-sm
                  ${selectedCategory === cat
                    ? 'bg-brand text-white'
                    : 'bg-surface-2 text-muted hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {filtered.map((image, idx) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              onClick={() => setSelectedIdx(idx)}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer bg-surface-2"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-oswald text-sm uppercase tracking-wider text-white font-bold">
                  {image.title}
                </h3>
                <p className="text-xs text-accent">{image.category}</p>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Image */}
              <img
                src={filtered[selectedIdx].src}
                alt={filtered[selectedIdx].title}
                className="w-full h-full object-contain rounded-sm"
              />

              {/* Title Below Image */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <h2 className="text-xl font-oswald uppercase tracking-wider text-white font-bold">
                  {filtered[selectedIdx].title}
                </h2>
                <p className="text-sm text-muted mt-2">
                  {selectedIdx + 1} / {filtered.length}
                </p>
              </motion.div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur"
                aria-label="Close"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Navigation Buttons */}
              {filtered.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-brand transition-colors backdrop-blur"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-brand transition-colors backdrop-blur"
                    aria-label="Next"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GaleriaPageNew;
