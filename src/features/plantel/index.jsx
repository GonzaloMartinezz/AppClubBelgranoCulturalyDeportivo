import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Trophy } from 'lucide-react';
import { Card, Badge } from '../../components/atoms';

const PlantelPageNew = () => {
  const [view, setView] = useState('cards');
  const [selectedPos, setSelectedPos] = useState('ALL');

  const players = [
    { id: 1, name: 'AMAYA, U.', number: 5, pos: 'BASE', img: '/player-action.png', stats: { pts: 107, reb: 29, ast: 12 } },
    { id: 2, name: 'ARAUJO, M.', number: 10, pos: 'ESCOLTA', img: '/player-action.png', stats: { pts: 185, reb: 17, ast: 8 } },
    { id: 3, name: 'BIESCHKE, S.', number: 4, pos: 'PÍVOT', img: '/player-action.png', stats: { pts: 74, reb: 33, ast: 3 } },
    { id: 4, name: 'CASARES, B.', number: 22, pos: 'ALERO', img: '/player-action.png', stats: { pts: 44, reb: 8, ast: 4 } },
    { id: 5, name: 'GARCIA, N.', number: 7, pos: 'BASE', img: '/player-action.png', stats: { pts: 46, reb: 34, ast: 6 } },
    { id: 6, name: 'RODRIGUEZ, N.', number: 12, pos: 'ALA-PÍVOT', img: '/player-action.png', stats: { pts: 116, reb: 46, ast: 5 } },
    { id: 7, name: 'ROJAS, S.', number: 3, pos: 'ESCOLTA', img: '/player-action.png', stats: { pts: 64, reb: 16, ast: 7 } },
  ];

  const positions = ['ALL', 'BASE', 'ESCOLTA', 'ALERO', 'ALA-PÍVOT', 'PÍVOT'];

  const filtered = selectedPos === 'ALL'
    ? players
    : players.filter(p => p.pos === selectedPos);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="w-full bg-dark min-h-screen">
      {/* Background Accent */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-brand/5 blur-3xl pointer-events-none -z-10" />

      <div className="app-container py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16"
        >
          <span className="section-label mb-3 block">
            <Trophy size={14} />
            Temporada 2026
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-4xl md:text-5xl font-teko font-black uppercase tracking-tighter">
              Nuestro Plantel
            </h1>

            {/* View Toggle */}
            <div className="flex gap-2 bg-surface-2 p-1 rounded-sm w-fit">
              <button
                onClick={() => setView('cards')}
                className={`flex items-center gap-2 px-4 py-2 font-oswald text-xs uppercase tracking-wider transition-all rounded-sm
                  ${view === 'cards'
                    ? 'bg-brand text-white'
                    : 'text-muted hover:text-white'
                  }`}
              >
                <LayoutGrid size={16} />
                Grid
              </button>
              <button
                onClick={() => setView('table')}
                className={`flex items-center gap-2 px-4 py-2 font-oswald text-xs uppercase tracking-wider transition-all rounded-sm
                  ${view === 'table'
                    ? 'bg-brand text-white'
                    : 'text-muted hover:text-white'
                  }`}
              >
                <List size={16} />
                Tabla
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-12 md:mb-16"
        >
          {positions.map(pos => (
            <button
              key={pos}
              onClick={() => setSelectedPos(pos)}
              className={`px-4 py-2 font-oswald text-xs uppercase tracking-wider transition-all rounded-sm
                ${selectedPos === pos
                  ? 'bg-brand text-white'
                  : 'bg-surface-2 text-muted hover:text-white'
                }`}
            >
              {pos === 'ALL' ? 'Todos' : pos}
            </button>
          ))}
        </motion.div>

        {/* Cards View */}
        <AnimatePresence mode="wait">
          {view === 'cards' ? (
            <motion.div
              key="cards"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              {filtered.map((player) => (
                <motion.div
                  key={player.id}
                  variants={itemVariants}
                >
                  <Card hover className="overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-surface-2 mb-4">
                      <img
                        src={player.img}
                        alt={player.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="primary">{player.number}</Badge>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-teko text-lg font-black uppercase mb-1">
                        {player.name.split(',')[0]}
                      </h3>
                      <p className="text-xs font-oswald uppercase tracking-wider text-muted mb-3">
                        {player.pos}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-surface-2 p-2 rounded-sm text-center">
                          <p className="text-xs font-teko font-black text-brand">{player.stats.pts}</p>
                          <p className="text-[10px] text-muted uppercase">PTS</p>
                        </div>
                        <div className="bg-surface-2 p-2 rounded-sm text-center">
                          <p className="text-xs font-teko font-black text-accent">{player.stats.reb}</p>
                          <p className="text-[10px] text-muted uppercase">REB</p>
                        </div>
                        <div className="bg-surface-2 p-2 rounded-sm text-center">
                          <p className="text-xs font-teko font-black text-accent-2">{player.stats.ast}</p>
                          <p className="text-[10px] text-muted uppercase">AST</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-oswald text-xs uppercase tracking-wider text-muted">#</th>
                    <th className="px-4 py-3 text-left font-oswald text-xs uppercase tracking-wider text-muted">Nombre</th>
                    <th className="px-4 py-3 text-left font-oswald text-xs uppercase tracking-wider text-muted">Posición</th>
                    <th className="px-4 py-3 text-center font-oswald text-xs uppercase tracking-wider text-muted">Pts</th>
                    <th className="px-4 py-3 text-center font-oswald text-xs uppercase tracking-wider text-muted">Reb</th>
                    <th className="px-4 py-3 text-center font-oswald text-xs uppercase tracking-wider text-muted">Ast</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(player => (
                    <tr key={player.id} className="border-b border-white/5 hover:bg-surface-2/50 transition-colors">
                      <td className="px-4 py-3 font-teko font-black text-brand">{player.number}</td>
                      <td className="px-4 py-3 font-oswald uppercase text-white">{player.name}</td>
                      <td className="px-4 py-3">
                        <Badge variant="muted" className="text-xs">{player.pos}</Badge>
                      </td>
                      <td className="px-4 py-3 text-center font-teko text-accent font-black">{player.stats.pts}</td>
                      <td className="px-4 py-3 text-center font-teko text-accent font-black">{player.stats.reb}</td>
                      <td className="px-4 py-3 text-center font-teko text-accent-2 font-black">{player.stats.ast}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlantelPageNew;
