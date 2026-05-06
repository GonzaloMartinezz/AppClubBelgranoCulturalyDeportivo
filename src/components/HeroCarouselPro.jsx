import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarouselPro = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoplay, slides.length]);

  const goTo = (index) => {
    setCurrent(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000);
  };

  const slide = slides[current];

  return (
    <div
      className="relative w-full h-screen md:h-[600px] lg:h-screen overflow-hidden group"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <AnimatePresence mode="wait">
        {/* Background Image */}
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div
          key={`content-${current}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-full flex flex-col justify-end items-start px-6 md:px-12 lg:px-20 pb-16 md:pb-24 z-10"
        >
          {/* Badge */}
          {slide.badge && (
            <span className="section-label mb-4 md:mb-6">
              {slide.badge}
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-teko font-black uppercase leading-[0.9] tracking-tighter text-white mb-4 md:mb-6 max-w-2xl md:max-w-4xl">
            {slide.title}
          </h1>

          {/* Subtitle */}
          {slide.subtitle && (
            <p className="text-base md:text-lg lg:text-xl text-gray-300 font-oswald uppercase tracking-wider max-w-lg mb-8 md:mb-10">
              {slide.subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          {slide.ctas && (
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {slide.ctas.map((cta, idx) => (
                <a
                  key={idx}
                  href={cta.href}
                  className={`px-6 md:px-8 py-3 md:py-4 font-oswald font-bold uppercase text-sm md:text-base tracking-wider transition-all duration-300 rounded-sm
                    ${cta.primary
                      ? 'bg-accent text-black hover:bg-accent-2 hover:shadow-lg'
                      : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:border-white'
                    }`}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur hover:bg-brand transition-all duration-300 text-white opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur hover:bg-brand transition-all duration-300 text-white opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {slides.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-2 md:h-3 rounded-full transition-all duration-300
              ${idx === current ? 'bg-accent w-8 md:w-10' : 'bg-white/30 w-2 md:w-3 hover:bg-white/50'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 md:top-8 right-6 md:right-8 z-20 text-xs md:text-sm font-oswald uppercase tracking-wider text-white/70">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
};

export default HeroCarouselPro;
