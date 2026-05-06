import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Trophy, ChevronRight } from 'lucide-react';
import { Button, Card, Badge } from '../components/atoms';
import api from '../core/api/client';

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString('es-AR', { day: '2-digit' }),
    month: d.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase(),
  };
};

const fallbackMatches = [
  {
    id: 'm1',
    date: '2026-05-06T21:30:00',
    time: '21:30',
    homeTeam: { name: 'Gimnasia y Tiro' },
    awayTeam: { name: 'Belgrano' },
    venue: 'Salta',
    status: 'PROGRAMADO'
  },
  {
    id: 'm2',
    date: '2026-05-10T21:00:00',
    time: '21:00',
    homeTeam: { name: 'Belgrano' },
    awayTeam: { name: 'Jujuy Básquet' },
    venue: 'Augusto Machado',
    status: 'PROGRAMADO'
  },
  {
    id: 'm3',
    date: '2026-04-24T22:00:00',
    time: '22:00',
    homeTeam: { name: 'Belgrano', score: 76 },
    awayTeam: { name: 'Talleres de Tafí Viejo', score: 71 },
    venue: 'Augusto Machado',
    status: 'FINALIZADO'
  },
];

const FixturePageNew = () => {
  const [matches, setMatches] = useState(fallbackMatches);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    api.get('/matches?sort=-date&limit=30')
      .then(r => {
        if (r.data.data?.length > 0) {
          setMatches(r.data.data);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL' ? matches
    : filter === 'PENDING' ? matches.filter(m => m.status === 'PROGRAMADO')
      : matches.filter(m => m.status === 'FINALIZADO');

  const filters = [
    { key: 'ALL', label: 'Todos' },
    { key: 'PENDING', label: 'Próximos' },
    { key: 'DONE', label: 'Resultados' }
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
    <div className="w-full bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden mb-12 md:mb-20">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          src="/fans-crowd.png"
          alt="Fixture Hero"
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
            <Calendar size={14} />
            TEMPORADA 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-teko font-black uppercase tracking-tighter text-white">
            Fixture
          </h1>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="app-container mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-6 py-2 font-oswald uppercase text-sm tracking-wider transition-all duration-200 rounded-sm
                ${filter === key
                  ? 'bg-brand text-white'
                  : 'bg-surface border border-white/10 text-muted hover:text-white hover:border-white/30'
                }`}
            >
              {label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Matches List */}
      <div className="app-container pb-16 md:pb-24">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted animate-pulse">Cargando partidos...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted">No hay partidos en esta categoría</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filtered.map((match) => {
              const { day, month } = formatDate(match.date);
              const isPlayed = match.status === 'FINALIZADO';

              return (
                <motion.div
                  key={match.id}
                  variants={itemVariants}
                >
                  <Card hover className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Date */}
                      <div className="flex-shrink-0 text-center">
                        <p className="text-2xl font-teko font-black text-brand">{day}</p>
                        <p className="text-xs font-oswald uppercase tracking-wider text-muted">{month}</p>
                      </div>

                      {/* Match Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3">
                          <h3 className="text-base md:text-lg font-teko uppercase font-black">
                            {match.homeTeam.name}
                          </h3>
                          {isPlayed && match.homeTeam.score !== undefined && (
                            <Badge variant="muted" className="text-xs">
                              {match.homeTeam.score} - {match.awayTeam.score}
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted mb-2">
                          vs <span className="font-oswald font-bold text-white">{match.awayTeam.name}</span>
                        </p>

                        <div className="flex flex-wrap gap-3 text-xs text-muted">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {match.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {match.venue}
                          </div>
                          <Badge variant={isPlayed ? 'outline' : 'primary'} className="text-xs ml-auto md:ml-0">
                            {isPlayed ? 'Finalizado' : 'Próximo'}
                          </Badge>
                        </div>
                      </div>

                      {/* Score (Played) */}
                      {isPlayed && match.homeTeam.score !== undefined && (
                        <div className="flex-shrink-0 text-right">
                          <p className="text-3xl font-teko font-black text-white mb-1">
                            {match.homeTeam.score}
                          </p>
                          <p className="text-xs text-muted uppercase">vs</p>
                          <p className="text-3xl font-teko font-black text-muted-2">
                            {match.awayTeam.score}
                          </p>
                        </div>
                      )}

                      {/* CTA */}
                      <button className="w-full md:w-auto p-2 rounded-sm text-white/70 hover:text-white hover:bg-surface-2 transition-colors hidden md:block">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FixturePageNew;
