import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Calendar } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import { Button, Card } from '../components/atoms';
import api from '../core/api/client';

const HomePageNew = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/matches/upcoming?limit=3')
      .then(r => setMatches(r.data.data || []))
      .catch(() => setMatches([
        {
          id: 1,
          homeTeam: { name: 'Belgrano', logo: '/club-logo.png' },
          awayTeam: { name: 'Ateneo' },
          date: '2026-05-10',
          time: '21:00',
          venue: 'Polideportivo Belgrano'
        },
        {
          id: 2,
          homeTeam: { name: 'Belgrano' },
          awayTeam: { name: 'Rivadavia' },
          date: '2026-05-17',
          time: '21:00',
          venue: 'Polideportivo Belgrano'
        },
        {
          id: 3,
          homeTeam: { name: 'Belgrano' },
          awayTeam: { name: 'Olimpo' },
          date: '2026-05-24',
          time: '21:00',
          venue: 'Polideportivo Belgrano'
        }
      ]))
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }
    }
  };

  return (
    <div className="w-full bg-dark">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Welcome Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-dark to-surface">
        <div className="app-container max-w-5xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="section-label">
                <Trophy size={14} />
                Bienvenido
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-teko font-black uppercase mb-4"
            >
              Club Belgrano Cultural y Deportivo
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted mb-8 max-w-2xl mx-auto"
            >
              Desde 1920 llevando la pasión por el básquet a cada rincón de Tucumán.
              Únete a nuestra comunidad y sé parte de la historia.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary">
                Únete al Club
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button variant="secondary">
                Ver Fixture
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="py-16 md:py-24 bg-dark">
        <div className="app-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <span className="section-label mb-3 block">
                <Calendar size={14} />
                Próximos Partidos
              </span>
              <h2 className="text-3xl md:text-4xl font-teko font-black uppercase">
                Fixture de la Temporada
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matches.map((match, idx) => (
                <motion.div
                  key={match.id}
                  variants={itemVariants}
                  custom={idx}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card hover className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-oswald uppercase tracking-wider text-muted">
                          {new Date(match.date).toLocaleDateString('es-AR', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="text-xs font-oswald uppercase tracking-wider text-muted">
                          {match.time}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h3 className="font-teko text-xl uppercase mb-2">
                          {match.homeTeam.name}
                        </h3>
                        <p className="text-sm text-muted mb-3">
                          vs {match.awayTeam.name}
                        </p>
                        <p className="text-xs text-muted">
                          {match.venue}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full text-xs"
                    >
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
              <Button variant="primary">
                Ver Fixture Completa
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="app-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Trophy, label: 'Títulos', value: '12' },
              { icon: Users, label: 'Socios', value: '500+' },
              { icon: Calendar, label: 'Partidos', value: '20' }
            ].map(({ icon: Icon, label, value }, idx) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-4">
                  <Icon className="text-brand" size={32} />
                </div>
                <p className="text-sm text-muted uppercase tracking-wider mb-2">{label}</p>
                <p className="text-4xl font-teko font-black text-white">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-dark">
        <div className="app-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl md:text-4xl font-teko font-black uppercase">
                Galería
              </h2>
              <p className="text-muted mt-2">Momentos que perduran en la memoria</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['/hero-bg.png', '/team-photo.png', '/gallery-stadium.png'].map((img, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative aspect-video rounded-sm overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/30 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePageNew;
