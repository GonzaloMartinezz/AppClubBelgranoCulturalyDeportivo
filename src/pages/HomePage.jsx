import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Calendar, Play } from 'lucide-react';
import { Button, Card } from '../components/atoms';
import api from '../core/api/client';

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/matches/upcoming?limit=6')
      .then(r => setMatches(r.data.data || []))
      .catch(() => setMatches([
        { id: 1, homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Ateneo' }, date: '2026-05-20', time: '21:00', venue: 'Polideportivo' },
        { id: 2, homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Rivadavia' }, date: '2026-05-27', time: '21:00', venue: 'Polideportivo' },
        { id: 3, homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Olimpo' }, date: '2026-06-03', time: '21:00', venue: 'Polideportivo' },
        { id: 4, homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Alumni' }, date: '2026-06-10', time: '21:00', venue: 'Polideportivo' },
        { id: 5, homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'San Martín' }, date: '2026-06-17', time: '21:00', venue: 'Polideportivo' },
        { id: 6, homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Junín' }, date: '2026-06-24', time: '21:00', venue: 'Polideportivo' },
      ]))
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="w-full bg-dark overflow-x-hidden">
      {/* Hero Full Section with Image 4.webp */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-16 md:mt-0">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src="/4.webp"
            alt="Club Belgrano Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </motion.div>

        <motion.div
          className="relative z-10 app-container text-center max-w-3xl mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="section-label">
              <Trophy size={16} />
              Desde 1920
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-teko font-black uppercase mb-6 text-white leading-tight"
          >
            Club Belgrano<br />Cultural y Deportivo
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            La pasión por el básquet llevada a cada rincón de Tucumán. Somos historia, somos tradición, somos comunidad.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" className="text-lg">
              Únete al Club
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button variant="secondary" className="text-lg">
              Ver Fixture
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-dark">
        <div className="app-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {[
              { icon: Trophy, label: 'Títulos', value: '12', color: 'from-brand to-brand-light' },
              { icon: Users, label: 'Socios', value: '500+', color: 'from-accent to-accent-2' },
              { icon: Calendar, label: 'Partidos', value: '20', color: 'from-purple-600 to-pink-600' }
            ].map(({ icon: Icon, label, value, color }, idx) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className={`bg-gradient-to-br ${color} p-8 md:p-12 rounded-lg text-center group hover:shadow-2xl transition-all duration-300`}
              >
                <Icon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-white/80 group-hover:scale-110 transition-transform" />
                <p className="text-sm md:text-base font-oswald font-bold uppercase tracking-wider text-white/80 mb-2">{label}</p>
                <p className="text-4xl md:text-5xl font-teko font-black text-white">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Section 7.webp with Content */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src="/7.webp"
            alt="Club Belgrano Moments"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </motion.div>

        <div className="relative z-10 app-container max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="section-label text-white/90">
                <Play size={14} />
                Nuestra Misión
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-teko font-black uppercase mb-6 text-white"
            >
              Conectar. Competir. Crecer.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/80 mb-6 leading-relaxed"
            >
              Desde nuestros inicios en 1920, hemos forjado una comunidad que trasciende el deporte. El Club Belgrano es el corazón pulsante del básquet tucumano, donde cada jugador, cada socio, cada aficionado es parte de una familia unida por la pasión.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base text-white/70 mb-8 leading-relaxed"
            >
              Nuestro compromiso es desarrollar talento, fortalecer valores y ser un espacio de pertenencia donde la excelencia deportiva va de la mano con la responsabilidad social.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button variant="primary" className="text-base">
                Conoce más sobre nosotros
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="app-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <span className="section-label mb-3 block">
                <Calendar size={16} />
                Próximos Compromisos
              </span>
              <h2 className="text-4xl md:text-5xl font-teko font-black uppercase">
                Fixture de Temporada
              </h2>
              <p className="text-muted mt-3">Todos los partidos programados</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.slice(0, 6).map((match, idx) => (
                <motion.div
                  key={match.id}
                  variants={itemVariants}
                  custom={idx}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card hover className="h-full p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-oswald uppercase tracking-widest text-brand font-bold">
                          {new Date(match.date).toLocaleDateString('es-AR', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="text-sm font-oswald uppercase tracking-wider text-white font-bold">
                          {match.time}
                        </span>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-teko text-2xl uppercase mb-2 text-white">
                          {match.homeTeam.name}
                        </h3>
                        <p className="text-muted mb-3 uppercase font-oswald tracking-wider">vs {match.awayTeam.name}</p>
                        <p className="text-xs text-muted/80 uppercase">
                          📍 {match.venue}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full text-sm font-bold">
                      Ver Detalles
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-12 text-center"
            >
              <Button variant="primary" className="text-base">
                Ver Fixture Completa
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Image Section 9.jpg */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src="/9.jpg"
            alt="Galería Belgrano"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        <div className="relative z-10 app-container text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="section-label text-white/90 justify-center">
                <Trophy size={14} />
                Momentos Icónicos
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-teko font-black uppercase mb-6 text-white max-w-2xl mx-auto"
            >
              Cada foto es una Victoria
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
            >
              La historia de Belgrano escrita en imágenes. Campeonatos ganados, generaciones formadas, comunidad unida.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button variant="primary" className="text-base">
                Ver Galería Completa
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview Grid */}
      <section className="py-20 md:py-28 bg-dark">
        <div className="app-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-4xl md:text-5xl font-teko font-black uppercase mb-3">
                Galería
              </h2>
              <p className="text-muted">Momentos que perduran en la memoria</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['/hero-bg.png', '/team-photo.png', '/gallery-stadium.png'].map((img, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative aspect-video rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={img}
                    alt={`Galería ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/40 transition-colors duration-300 flex items-center justify-center">
                    <Play size={48} className="text-white/0 group-hover:text-white/80 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Player Spotlight Section with webperfiljob1.jpg */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src="/webperfiljob1.jpg"
            alt="Plantel Belgrano"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-black/40" />
        </motion.div>

        <div className="relative z-10 app-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="section-label text-white/90">
                <Users size={14} />
                Nuestro Plantel
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-teko font-black uppercase mb-6 text-white"
            >
              Talento en Cancha
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/80 mb-8 leading-relaxed"
            >
              Los mejores jugadores de Tucumán visten los colores de Belgrano. Dedicación, disciplina y pasión en cada entrenamiento y cada partido.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" className="text-base">
                Ver Plantel Completo
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button variant="secondary" className="text-base">
                Estadísticas
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="app-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="section-label justify-center">
                <Users size={14} />
                Sé Parte
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-teko font-black uppercase mb-6 text-white"
            >
              Únete a la Familia Belgrano
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted mb-10 max-w-2xl mx-auto"
            >
              Socios, aficionados, voluntarios. En Belgrano hay un lugar para todos. Desde 1920, construimos juntos la historia.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" className="text-base">
                Hacerse Socio
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button variant="secondary" className="text-base">
                Contactar
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
