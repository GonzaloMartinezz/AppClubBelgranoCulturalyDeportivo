import { useState, useCallback } from 'react';
import { useMatches } from '../../hooks/useMatches';
import { MatchCard } from '../../../components/molecules';

const MatchCalendar = ({ matches = [], loading: externalLoading }) => {
  const { fetchMatches } = useMatches();
  const initialMatches = matches.length > 0 ? matches : [];
  const [allMatches, setAllMatches] = useState(initialMatches);
  const [loading, setLoading] = useState(externalLoading || false);
  const [filter, setFilter] = useState('all');

  const loadMatches = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchMatches({ limit: 50 });
      setAllMatches(res.data || []);
    } catch {
      setAllMatches([]);
    } finally {
      setLoading(false);
    }
  }, [fetchMatches]);

  const filteredMatches = allMatches.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'past') return m.status === 'FINAL';
    if (filter === 'upcoming') return m.status === 'SCHEDULED';
    if (filter === 'live') return m.status === 'LIVE';
    return true;
  });

  if (loading) {
    return (
      <section id="calendario" className="px-6 md:px-12 py-16 bg-dark border-b-2 border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-teko text-white mb-8 uppercase">Calendario</h2>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-48 w-full bg-white/10 animate-pulse" />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calendario" className="px-6 md:px-12 py-16 bg-dark border-b-2 border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-teko text-white mb-8 uppercase">Calendario</h2>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['all', 'live', 'upcoming', 'past'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-oswald font-bold text-xs uppercase tracking-[0.2em] border-2 transition-all ${
                filter === f ? 'border-brand text-brand bg-surface' : 'border-white/20 text-gray-400 hover:border-white'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'live' ? 'En Vivo' : f === 'upcoming' ? 'Próximos' : 'Jugados'}
            </button>
          ))}
        </div>

        {filteredMatches.length === 0 && allMatches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-oswald text-gray-500 mb-4">No hay partidos</p>
            <button
              onClick={loadMatches}
              className="px-6 py-3 border-2 border-brand text-brand font-oswald font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand hover:text-white transition-all"
            >
              Cargar Partidos
            </button>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-oswald text-gray-500">No hay partidos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MatchCalendar;
