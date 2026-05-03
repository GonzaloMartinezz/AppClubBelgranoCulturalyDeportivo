import { useState, useEffect } from 'react';
import api from '../core/api/client';

const mockMatches = [
  { _id: '1', date: '2026-04-14', time: '22:00', homeTeam: { name: 'San Martín' }, awayTeam: { name: 'Belgrano' }, status: 'FINALIZADO', homeScore: 70, awayScore: 88, venue: 'San Martín Arena', competition: { name: 'Liga Federal' } },
  { _id: '2', date: '2026-04-21', time: '21:30', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Talleres' }, status: 'FINALIZADO', homeScore: 82, awayScore: 78, venue: 'Palacio de los Deportes', competition: { name: 'Liga Federal' } },
  { _id: '3', date: '2026-05-04', time: '21:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Gimnasia' }, status: 'PROGRAMADO', homeScore: null, awayScore: null, venue: 'Palacio de los Deportes', competition: { name: 'Liga Federal' } },
  { _id: '4', date: '2026-05-11', time: '21:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Estudiantes' }, status: 'PROGRAMADO', homeScore: null, awayScore: null, venue: 'Ateneo', competition: { name: 'Liga Federal' } },
  { _id: '5', date: '2026-05-18', time: '20:30', homeTeam: { name: 'Mitre' }, awayTeam: { name: 'Belgrano' }, status: 'PROGRAMADO', homeScore: null, awayScore: null, venue: 'Club Mitre', competition: { name: 'Liga Federal' } },
  { _id: '6', date: '2026-05-25', time: '21:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Rosario' }, status: 'PROGRAMADO', homeScore: null, awayScore: null, venue: 'Palacio de los Deportes', competition: { name: 'Liga Federal' } },
];

const formatDate = (dateStr) => {
  if (!dateStr) return {};
  const d = new Date(dateStr + 'T00:00:00');
  return {
    day:   d.toLocaleDateString('es-AR', { day: '2-digit' }),
    month: d.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase(),
  };
};

const FixturePage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('ALL');

  useEffect(() => {
    api.get('/matches')
      .then(r => setMatches(r.data.data || []))
      .catch(() => setMatches(mockMatches))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date();
  const nextMatch = matches.find(m => new Date(m.date + 'T00:00:00') >= today && (m.status === 'PROGRAMADO' || m.status === 'SCHEDULED'));

  const filtered = filter === 'ALL' ? matches
    : filter === 'DONE'
      ? matches.filter(m => m.status === 'FINALIZADO' || m.status === 'FINAL')
      : matches.filter(m => m.status === 'PROGRAMADO' || m.status === 'SCHEDULED');

  return (
    <div className="pt-16" style={{ background: 'var(--color-dark)' }}>

      {/* Header */}
      <section className="relative overflow-hidden py-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container relative z-10">
          <div className="section-hero-title absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none" style={{ fontSize: 'clamp(6rem, 20vw, 12rem)' }}>
            FIXTURE
          </div>
          <div className="relative z-10">
            <p className="section-label mb-4">Temporada 2026</p>
            <h1 className="font-teko font-bold uppercase leading-[0.88] tracking-tight text-white" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}>
              Fixture &<br /><span style={{ color: 'var(--color-accent)' }}>Resultados</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-30 border-b" style={{ background: 'rgba(18,18,18,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container flex gap-2 py-3">
          {[{ key: 'ALL', label: 'Todos' }, { key: 'PENDING', label: 'Próximos' }, { key: 'DONE', label: 'Resultados' }].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="font-oswald font-bold text-[12px] uppercase tracking-[0.1em] px-4 py-2 transition-all duration-200"
              style={{
                borderRadius: '10px',
                background: filter === f.key ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: filter === f.key ? '#fff' : 'rgba(255,255,255,0.4)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Match list */}
      <section className="py-8">
        <div className="app-container">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="card" style={{ height: '80px', borderRadius: '12px', opacity: 0.3 }} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.length === 0 && (
                <p className="text-center py-16 font-oswald uppercase tracking-widest text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  No hay partidos
                </p>
              )}
              {filtered.map((match) => {
                const { day, month } = formatDate(match.date);
                const isFinal  = match.status === 'FINALIZADO' || match.status === 'FINAL';
                const isBelHome = (match.homeTeam?.name || '').toLowerCase().includes('belgrano');
                const belScore  = isBelHome ? match.homeScore : match.awayScore;
                const rivScore  = isBelHome ? match.awayScore : match.homeScore;
                const rival     = isBelHome ? match.awayTeam?.name : match.homeTeam?.name;
                const won       = isFinal && belScore > rivScore;
                const isNext    = nextMatch?._id === match._id;

                return (
                  <div
                    key={match._id}
                    className="card-flat group flex items-center gap-4 p-4"
                    style={{
                      borderRadius: '12px',
                      borderColor: isNext ? 'var(--color-accent)' : undefined,
                    }}
                  >
                    {/* Date */}
                    <div className="text-center w-12 flex-shrink-0">
                      <span className="block font-teko font-bold text-2xl text-white leading-none">{day}</span>
                      <span className="block font-oswald text-[9px] uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>{month}</span>
                    </div>

                    {/* Teams */}
                    <div className="flex-1 flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center font-oswald font-bold text-[10px] text-white flex-shrink-0" style={{ background: 'var(--color-brand)', borderRadius: '8px' }}>
                        BEL
                      </div>
                      <span className="font-oswald font-bold text-sm uppercase text-white hidden sm:block">Belgrano</span>
                    </div>

                    {/* Score */}
                    <div className="text-center flex-shrink-0 px-4">
                      {isFinal ? (
                        <div className="flex items-center gap-2">
                          <span className={`font-teko font-bold text-3xl ${won ? '' : ''}`} style={{ color: won ? 'var(--color-brand)' : '#fff' }}>{belScore}</span>
                          <span className="font-teko text-xl" style={{ color: 'rgba(255,255,255,0.2)' }}>-</span>
                          <span className={`font-teko font-bold text-3xl`} style={{ color: !won ? '#F87171' : 'rgba(255,255,255,0.4)' }}>{rivScore}</span>
                        </div>
                      ) : (
                        <span className="font-teko font-bold text-2xl" style={{ color: 'rgba(255,255,255,0.15)' }}>VS</span>
                      )}
                    </div>

                    {/* Rival */}
                    <div className="flex-1 flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center font-oswald font-bold text-[10px] flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'rgba(255,255,255,0.4)' }}>
                        {(rival || '???').substring(0, 3).toUpperCase()}
                      </div>
                      <span className="font-oswald font-bold text-sm uppercase hidden sm:block" style={{ color: 'rgba(255,255,255,0.5)' }}>{rival}</span>
                    </div>

                    {/* Badge */}
                    <span className={`badge flex-shrink-0 ${isFinal ? (won ? 'badge-success' : 'badge-danger') : isNext ? 'badge-accent' : 'badge-neutral'}`}>
                      {isFinal ? (won ? 'Victoria' : 'Derrota') : isNext ? 'Próximo' : 'Pendiente'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FixturePage;
