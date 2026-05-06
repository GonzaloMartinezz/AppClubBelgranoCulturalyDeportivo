import { useState, useCallback } from 'react';
import { usePlayers, useStaff } from '../../hooks/useClub';
import { PlayerCard, StaffCard } from '../../../components/molecules';

export const NuestraFamilia = () => {
  const { fetchPlayers } = usePlayers();
  const { fetchStaff } = useStaff();
  const [players, setPlayers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('players');
  const [loaded, setLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    if (loaded) return;
    setLoading(true);
    try {
      const [playersRes, staffRes] = await Promise.all([
        fetchPlayers().catch(() => ({ data: [] })),
        fetchStaff().catch(() => ({ data: [] }))
      ]);
      setPlayers(playersRes.data || []);
      setStaff(staffRes.data || []);
      setLoaded(true);
    } catch {
      console.error('Error fetching team data');
    } finally {
      setLoading(false);
    }
  }, [fetchPlayers, fetchStaff, loaded]);

  if (loading) {
    return (
      <section id="nuestra-familia" className="px-6 md:px-12 py-16 bg-surface border-b-2 border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-teko text-white mb-8 uppercase">Nuestra Familia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div key={i} className="h-40 w-full bg-white/10 animate-pulse" />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="nuestra-familia" className="px-6 md:px-12 py-16 bg-surface border-b-2 border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-teko text-white mb-8 uppercase">Nuestra Familia</h2>

        {!loaded ? (
          <div className="text-center py-12">
            <p className="text-xl font-oswald text-gray-500 mb-4">Cargá el plantel y staff técnico</p>
            <button
              onClick={fetchData}
              className="px-8 py-4 bg-brand text-white font-oswald font-bold text-sm uppercase tracking-[0.2em] hover:bg-brand-light transition-colors"
            >
              Cargar Datos
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setTab('players')}
                className={`px-6 py-3 font-oswald font-bold text-sm uppercase tracking-[0.2em] border-2 transition-all ${
                  tab === 'players' ? 'border-brand text-brand' : 'border-white/20 text-gray-400 hover:border-white'
                }`}
              >
                Plantel
              </button>
              <button
                onClick={() => setTab('staff')}
                className={`px-6 py-3 font-oswald font-bold text-sm uppercase tracking-[0.2em] border-2 transition-all ${
                  tab === 'staff' ? 'border-brand text-brand' : 'border-white/20 text-gray-400 hover:border-white'
                }`}
              >
                Staff Técnico
              </button>
            </div>

            {tab === 'players' ? (
              players.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl font-oswald text-gray-500">No hay jugadores cargados</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {players.map((player) => (
                    <PlayerCard key={player._id} player={player} stats />
                  ))}
                </div>
              )
            ) : (
              staff.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl font-oswald text-gray-500">No hay staff cargado</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {staff.map((member) => (
                    <StaffCard key={member._id} staff={member} />
                  ))}
                </div>
              )
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NuestraFamilia;
