import { motion } from 'framer-motion';
import { MapPin, Clock, Trophy } from 'lucide-react';

const MatchCardPro = ({ match, idx = 0 }) => {
  const {
    homeTeam = { name: 'TEAM A', score: null },
    awayTeam = { name: 'TEAM B', score: null },
    date = new Date().toISOString(),
    time = '21:00',
    venue = 'Stadium',
    status = 'PROGRAMADO',
    competition = 'LIGA FEDERAL'
  } = match;

  const isPlayed = status === 'FINALIZADO' && homeTeam.score !== null;
  const dateObj = new Date(date);
  const dayNum = dateObj.getDate();
  const monthStr = dateObj.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="group relative overflow-hidden rounded-sm border border-white/10 transition-all duration-300 hover:border-brand hover:shadow-xl hover:shadow-brand/20"
    >
      {/* Card Container */}
      <div className={`relative p-4 md:p-6 ${isPlayed ? 'bg-gradient-to-br from-surface-2 to-surface' : 'bg-surface'}`}>
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
          <Trophy size={120} className="text-brand" />
        </div>

        {/* Date Column */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 relative z-10">
          {/* Date Box */}
          <div className="flex-shrink-0 text-center bg-gradient-to-br from-brand/20 to-brand/5 p-4 rounded-sm border border-brand/30">
            <div className="text-3xl font-teko font-black text-white">{dayNum}</div>
            <div className="text-xs font-oswald uppercase tracking-widest text-brand font-bold mt-1">{monthStr}</div>
          </div>

          {/* Match Info */}
          <div className="flex-1 min-w-0">
            {/* Competition Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-oswald font-black uppercase tracking-widest text-accent px-2 py-1 bg-accent/10 rounded-sm">
                {competition}
              </span>
              <span className={`text-[10px] font-oswald font-bold uppercase tracking-widest px-2 py-1 rounded-sm
                ${isPlayed ? 'bg-green-500/20 text-green-400' : 'bg-brand/20 text-brand'}`}>
                {status}
              </span>
            </div>

            {/* Teams */}
            <div className="mb-3">
              <h3 className="text-base md:text-lg font-teko font-black uppercase tracking-tight text-white mb-2">
                {homeTeam.name}
              </h3>
              {isPlayed && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-muted">vs</span>
                  <span className="text-4xl font-teko font-black text-accent">{homeTeam.score}</span>
                </div>
              )}
              <p className="text-sm text-muted">
                vs <span className="font-oswald font-bold text-white">{awayTeam.name}</span>
              </p>
              {isPlayed && (
                <span className="text-sm text-gray-400 ml-8">{awayTeam.score}</span>
              )}
            </div>

            {/* Match Details */}
            <div className="flex flex-wrap gap-4 text-xs text-muted border-t border-white/10 pt-3">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-brand" />
                <span className="font-oswald font-bold">{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent" />
                <span className="font-oswald font-bold">{venue}</span>
              </div>
            </div>
          </div>

          {/* Score Large (If Played) */}
          {isPlayed && (
            <div className="flex-shrink-0 text-right py-2 px-4 bg-white/5 rounded-sm border border-white/10">
              <div className="text-sm text-muted uppercase tracking-widest font-oswald font-bold mb-1">RESULTADO</div>
              <div className="text-3xl font-teko font-black text-white">
                {homeTeam.score}-{awayTeam.score}
              </div>
            </div>
          )}
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none group-hover:pointer-events-auto rounded-sm">
          <button className="w-full py-2 bg-brand text-black font-oswald font-bold uppercase text-sm tracking-wider rounded-sm hover:bg-accent-2 transition-colors duration-200">
            Ver Detalles
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchCardPro;
