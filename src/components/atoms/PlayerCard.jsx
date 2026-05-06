import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';

const PlayerCard = ({ player, idx = 0 }) => {
  const {
    name = 'Jugador',
    number = '--',
    position = 'POS',
    image = '/team-photo.png',
    stats = { games: 0, points: 0, assists: 0 },
    social = {}
  } = player;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="group relative overflow-hidden rounded-sm bg-surface border border-white/10 hover:border-brand transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-2">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Number Badge */}
        <div className="absolute top-3 left-3 flex items-center justify-center w-12 h-12 bg-accent text-black font-teko font-black text-lg rounded-sm">
          {number}
        </div>

        {/* Position Badge */}
        <div className="absolute top-3 right-3 px-3 py-1.5 bg-brand/20 backdrop-blur text-brand text-xs font-oswald font-bold uppercase tracking-wider rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {position}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Name */}
        <h3 className="text-lg md:text-xl font-oswald font-bold uppercase tracking-wider text-white mb-2">
          {name}
        </h3>

        {/* Position Small */}
        <p className="text-xs text-brand font-oswald uppercase tracking-widest mb-4">
          {position}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-y border-white/10">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-teko font-black text-accent">
              {stats.games || '--'}
            </span>
            <span className="text-[10px] text-muted uppercase tracking-wider mt-1">Partidos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-teko font-black text-white">
              {stats.points || '--'}
            </span>
            <span className="text-[10px] text-muted uppercase tracking-wider mt-1">Puntos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-teko font-black text-brand">
              {stats.assists || '--'}
            </span>
            <span className="text-[10px] text-muted uppercase tracking-wider mt-1">Asistencias</span>
          </div>
        </div>

        {/* Social Links */}
        {Object.keys(social).length > 0 && (
          <div className="flex gap-2 justify-center">
            {social.twitter && (
              <a
                href={social.twitter}
                className="p-2 rounded-sm bg-white/5 hover:bg-brand text-muted hover:text-white transition-all duration-200"
                aria-label="Twitter"
              >
                <Share2 size={16} />
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                className="p-2 rounded-sm bg-white/5 hover:bg-brand text-muted hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Share2 size={16} />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                className="p-2 rounded-sm bg-white/5 hover:bg-brand text-muted hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Share2 size={16} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Hover Action Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-full py-2 bg-brand text-black font-oswald font-bold uppercase text-sm tracking-wider rounded-sm hover:bg-accent-2 transition-colors duration-200">
          Ver Perfil
        </button>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
