import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);

  const defaultSlides = [
    {
      id: 1,
      image: '/hero-bg.png',
      title: 'Belgrano',
      subtitle: 'Cultural y Deportivo',
      cta: 'Explora'
    },
    {
      id: 2,
      image: '/team-photo.png',
      title: 'Nuestro Plantel',
      subtitle: 'Campeones en cancha',
      cta: 'Ver Plantel'
    },
    {
      id: 3,
      image: '/player-action.png',
      title: 'Partido en Vivo',
      subtitle: 'Siente la acción',
      cta: 'Seguir'
    }
  ];

  const carouselSlides = slides.length > 0 ? slides : defaultSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const goToSlide = (index) => setCurrent(index % carouselSlides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <div className="relative w-full h-screen md:h-[600px] lg:h-[700px] overflow-hidden bg-dark">
      <AnimatePresence mode="wait">
        {carouselSlides.map((slide, index) => (
          index === current && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-teko font-black
                    text-white uppercase tracking-tighter mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  className="text-lg md:text-2xl font-oswald uppercase tracking-widest
                    text-accent mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {slide.subtitle}
                </motion.p>

                <motion.button
                  className="px-8 py-3 bg-brand text-white font-oswald uppercase
                    text-sm md:text-base tracking-wider
                    hover:bg-brand-light transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {slide.cta}
                </motion.button>
              </motion.div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40
          p-3 rounded-full bg-white/10 hover:bg-brand text-white
          transition-all duration-300 backdrop-blur"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40
          p-3 rounded-full bg-white/10 hover:bg-brand text-white
          transition-all duration-300 backdrop-blur"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full
              ${index === current
                ? 'bg-accent w-8 h-2'
                : 'bg-white/30 hover:bg-white/50 w-2 h-2'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
