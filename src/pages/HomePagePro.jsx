import { motion } from 'framer-motion';
import HeroCarouselPro from '../components/HeroCarouselPro';
import MatchCardPro from '../components/atoms/MatchCardPro';
import { ArrowRight, Users, Trophy, TrendingUp } from 'lucide-react';

const HomePagePro = () => {
  // Hero slides data
  const heroSlides = [
    {
      image: '/hero-bg.png',
      badge: '⚡ TEMPORADA 2026',
      title: 'BELGRANO CyD',
      subtitle: 'Identidad. Garra. Historia. Acompañá al equipo en su camino a la gloria.',
      ctas: [
        { label: 'Hazte Socio', href: '/socios', primary: true },
        { label: 'Ver Partidos', href: '/fixture', primary: false }
      ]
    },
    {
      image: '/team-photo.png',
      badge: '🏀 NUESTRO PLANTEL',
      title: 'TALENTO TUCUMANO',
      subtitle: 'Los mejores jugadores del norte, unidos para la victoria.',
      ctas: [
        { label: 'Ver Plantel', href: '/plantel', primary: true },
        { label: 'Estadísticas', href: '/estadisticas', primary: false }
      ]
    },
    {
      image: '/fans-crowd.png',
      badge: '🎉 LA FAMILIA BELGRANO',
      title: 'JUNTOS SOMOS MÁS',
      subtitle: 'Cada socio es parte de nuestra historia. Únete a nuestro movimiento.',
      ctas: [
        { label: 'Conoce la Familia', href: '/socios', primary: true },
        { label: 'Contacto', href: '#contacto', primary: false }
      ]
    }
  ];

  // Próximos partidos (datos mock)
  const upcomingMatches = [
    {
      homeTeam: { name: 'Belgrano', score: null },
      awayTeam: { name: 'Gimnasia y Tiro', score: null },
      date: '2026-05-10T21:30:00',
      time: '21:30',
      venue: 'Augusto Machado',
      status: 'PROGRAMADO',
      competition: 'LIGA FEDERAL'
    },
    {
      homeTeam: { name: 'Jujuy Básquet', score: null },
      awayTeam: { name: 'Belgrano', score: null },
      date: '2026-05-14T21:00:00',
      time: '21:00',
      venue: 'Estadio Jujuy',
      status: 'PROGRAMADO',
      competition: 'LIGA FEDERAL'
    },
    {
      homeTeam: { name: 'Belgrano', score: 76 },
      awayTeam: { name: 'Talleres de Tafí Viejo', score: 71 },
      date: '2026-04-24T22:00:00',
      time: '22:00',
      venue: 'Augusto Machado',
      status: 'FINALIZADO',
      competition: 'LIGA FEDERAL'
    }
  ];

  // Stats cards
  const stats = [
    { icon: Trophy, label: 'Campeonatos', value: '12', color: 'brand' },
    { icon: Users, label: 'Socios', value: '2.5K+', color: 'accent' },
    { icon: TrendingUp, label: 'Victorias', value: '76%', color: 'accent-2' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="w-full bg-dark min-h-screen overflow-x-hidden">
      {/* Hero Carousel */}
      <HeroCarouselPro slides={heroSlides} />

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-dark to-surface px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const colorClass = stat.color === 'brand' ? 'text-brand' : stat.color === 'accent' ? 'text-accent' : 'text-accent-2';
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative p-6 md:p-8 rounded-sm border border-white/10 bg-surface/50 backdrop-blur hover:border-white/30 transition-all duration-300 group"
              >
                {/* Icon */}
                <Icon className={`w-8 h-8 md:w-10 md:h-10 ${colorClass} mb-4 group-hover:scale-110 transition-transform duration-300`} />

                {/* Value */}
                <div className="text-4xl md:text-5xl font-teko font-black text-white mb-2">
                  {stat.value}
                </div>

                {/* Label */}
                <p className="text-sm md:text-base font-oswald uppercase tracking-wider text-muted">
                  {stat.label}
                </p>

                {/* Background glow */}
                <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-brand to-accent pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Próximos Partidos Section */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16 flex items-center justify-between"
          >
            <div>
              <span className="section-label mb-3 block">📅 CALENDARIO</span>
              <h2 className="text-4xl md:text-5xl font-teko font-black uppercase tracking-tighter text-white">
                Próximos Partidos
              </h2>
            </div>
            <a
              href="/fixture"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-brand text-black font-oswald font-bold uppercase text-sm tracking-wider rounded-sm hover:bg-accent-2 transition-all duration-200 group"
            >
              Ver Todo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Matches Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
          >
            {upcomingMatches.slice(0, 3).map((match, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <MatchCardPro match={match} idx={idx} />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile CTA */}
          <a
            href="/fixture"
            className="md:hidden w-full block text-center px-6 py-3 bg-brand text-black font-oswald font-bold uppercase text-sm tracking-wider rounded-sm hover:bg-accent-2 transition-all duration-200"
          >
            Ver Todos los Partidos
          </a>
        </div>
      </section>

      {/* Club Info Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-surface to-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <motion.img
                src="/team-photo.png"
                alt="Club Belgrano"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent" />
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-label mb-4 block">🏀 NUESTRA HISTORIA</span>
              <h3 className="text-3xl md:text-4xl font-teko font-black uppercase tracking-tighter text-white mb-6">
                Tradición & Excelencia
              </h3>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6">
                Desde 1920, Club Belgrano Cultura y Deportivo ha sido símbolo de identidad tucumana.
                Con un plantel de campeonato y una familia de socios apasionados, buscamos llevar nuestros
                colores a lo más alto de la liga.
              </p>
              <p className="text-sm text-muted mb-8 leading-relaxed">
                Cada partido es una oportunidad de defender nuestro legado. Cada jugador, un embajador
                de nuestra historia. Cada socio, parte fundamental de nuestro movimiento.
              </p>
              <a
                href="/socios"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-oswald font-bold uppercase text-sm tracking-wider rounded-sm hover:bg-accent-2 transition-all duration-200 group"
              >
                Únete al Movimiento
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Galería Preview Section */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16 flex items-center justify-between"
          >
            <div>
              <span className="section-label mb-3 block">📸 GALERÍA</span>
              <h2 className="text-4xl md:text-5xl font-teko font-black uppercase tracking-tighter text-white">
                Momentos Belgrano
              </h2>
            </div>
            <a
              href="/galeria"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-brand text-black font-oswald font-bold uppercase text-sm tracking-wider rounded-sm hover:bg-accent-2 transition-all duration-200 group"
            >
              Ver Galería
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Gallery Preview Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer"
              >
                <img
                  src={i % 2 === 0 ? '/team-photo.png' : '/hero-bg.png'}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile CTA */}
          <a
            href="/galeria"
            className="md:hidden w-full block text-center mt-8 px-6 py-3 bg-brand text-black font-oswald font-bold uppercase text-sm tracking-wider rounded-sm hover:bg-accent-2 transition-all duration-200"
          >
            Ver Galería Completa
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePagePro;
