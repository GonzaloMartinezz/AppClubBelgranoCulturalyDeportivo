
import { Avatar } from '../atoms';

export const PlayerCard = ({ player, onClick, stats = false }) => (
  <div 
    onClick={onClick}
    className="bg-dark border-2 border-white p-4 hover:border-brand hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#0033A0] transition-all cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <Avatar src={player.photo} alt={`${player.name} ${player.lastName}`} size="lg" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-teko font-bold text-brand">#{player.number}</span>
          <h3 className="text-lg font-teko font-bold text-white uppercase">
            {player.name} {player.lastName}
          </h3>
        </div>
        <p className="text-xs font-oswald text-gray-400 uppercase tracking-widest">{player.position}</p>
      </div>
    </div>
    {stats && player.careerStats && (
      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-4 gap-2 text-center">
        <div>
          <span className="block text-lg font-teko font-bold text-white">{player.careerStats.points}</span>
          <span className="text-[10px] font-oswald text-gray-400 uppercase">PTS</span>
        </div>
        <div>
          <span className="block text-lg font-teko font-bold text-white">{player.careerStats.rebounds}</span>
          <span className="text-[10px] font-oswald text-gray-400 uppercase">REB</span>
        </div>
        <div>
          <span className="block text-lg font-teko font-bold text-white">{player.careerStats.assists}</span>
          <span className="text-[10px] font-oswald text-gray-400 uppercase">AST</span>
        </div>
        <div>
          <span className="block text-lg font-teko font-bold text-white">{player.careerStats.matchesPlayed}</span>
          <span className="text-[10px] font-oswald text-gray-400 uppercase">PJ</span>
        </div>
      </div>
    )}
  </div>
);

export const MatchCard = ({ match, showDetails = true }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
  };
  
  const formatTime = (time) => time;

  return (
    <div className="bg-dark border-2 border-white p-6 hover:border-brand transition-all">
      <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
        <span className="text-xs font-oswald text-brand font-bold tracking-[0.3em] uppercase">
          {match.competition?.name || 'LIGA FEDERAL'}
        </span>
        <span className={`text-xs font-oswald font-bold tracking-widest px-2 py-0.5 ${
          match.status === 'FINAL' ? 'bg-brand text-white' : 
          match.status === 'LIVE' ? 'bg-green-500 text-white animate-pulse' : 
          'bg-white/10 text-white'
        }`}>
          {match.status === 'LIVE' ? 'EN VIVO' : match.status}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-center flex-1">
          <div className="w-16 h-16 mx-auto mb-2 bg-white/10 flex items-center justify-center">
            {match.homeTeam?.logo ? (
              <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain p-2" />
            ) : (
              <span className="font-teko text-2xl text-white">{match.homeTeam?.name?.[0]}</span>
            )}
          </div>
          <h4 className="text-sm font-oswald text-gray-400 uppercase tracking-widest">{match.homeTeam?.name}</h4>
        </div>
        
        <div className="px-4">
          <span className="text-4xl font-teko font-bold text-white">
            {match.score?.home ?? '-'}
          </span>
        </div>
        
        <div className="text-brand text-xl font-teko font-bold">VS</div>
        
        <div className="px-4">
          <span className="text-4xl font-teko font-bold text-brand">
            {match.score?.away ?? '-'}
          </span>
        </div>
        
        <div className="text-center flex-1">
          <div className="w-16 h-16 mx-auto mb-2 bg-white/10 flex items-center justify-center">
            {match.awayTeam?.logo ? (
              <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain p-2" />
            ) : (
              <span className="font-teko text-2xl text-white">{match.awayTeam?.name?.[0]}</span>
            )}
          </div>
          <h4 className="text-sm font-oswald text-brand uppercase tracking-widest font-bold">{match.awayTeam?.name}</h4>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
          <div className="text-xs font-oswald text-gray-400">
            {formatDate(match.date)} - {formatTime(match.time)}
          </div>
          <div className="text-xs font-oswald text-gray-400">
            {match.venue}
          </div>
        </div>
      )}
      
      {match.mvp && (
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 bg-surface -mx-6 -mb-6 p-4">
          <Avatar src={match.mvp.player?.photo} alt={match.mvp.player?.name} size="md" />
          <div>
            <p className="text-[10px] text-brand uppercase tracking-[0.2em] font-oswald font-bold">MVP</p>
            <p className="text-base font-teko text-white uppercase">
              #{match.mvp.player?.number} {match.mvp.player?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const ScoreBoard = ({ match, compact = false }) => (
  <div className={`bg-dark border-4 border-white ${compact ? 'p-4' : 'p-8'}`}>
    <div className="flex justify-between items-center">
      <div className="text-center flex-1">
        <div className={`${compact ? 'w-12' : 'w-20'} h-full bg-white/10 flex items-center justify-center mb-2`}>
          {match.homeTeam?.logo && <img src={match.homeTeam.logo} className="w-full p-2" />}
        </div>
        <span className={`${compact ? 'text-sm' : 'text-2xl'} font-teko text-white`}>
          {match.homeTeam?.name}
        </span>
      </div>
      
      <div className="text-center px-4">
        <span className={`${compact ? 'text-5xl' : 'text-7xl'} font-teko font-bold text-white tracking-tighter`}>
          {match.score?.home ?? 0}
        </span>
      </div>
      
      <div className="text-brand text-2xl font-teko font-bold">:</div>
      
      <div className="text-center px-4">
        <span className={`${compact ? 'text-5xl' : 'text-7xl'} font-teko font-bold text-brand tracking-tighter`}>
          {match.score?.away ?? 0}
        </span>
      </div>
      
      <div className="text-center flex-1">
        <div className={`${compact ? 'w-12' : 'w-20'} h-full bg-white/10 flex items-center justify-center mb-2`}>
          {match.awayTeam?.logo && <img src={match.awayTeam.logo} className="w-full p-2" />}
        </div>
        <span className={`${compact ? 'text-sm' : 'text-2xl'} font-teko text-brand font-bold`}>
          {match.awayTeam?.name}
        </span>
      </div>
    </div>
    
    {match.status === 'LIVE' && (
      <div className="mt-4 text-center">
        <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-oswald font-bold tracking-widest animate-pulse">
          CUARTO {match.score?.quarter || 1}
        </span>
      </div>
    )}
  </div>
);

export const SponsorLogo = ({ sponsor, size = 'md' }) => {
  const sizes = { sm: 'h-8', md: 'h-12', lg: 'h-16' };
  return (
    <img 
      src={sponsor.logo} 
      alt={sponsor.name} 
      className={`${sizes[size]} w-auto object-contain brightness-0 invert pr-4`}
    />
  );
};

export const StaffCard = ({ staff }) => (
  <div className="bg-dark border-2 border-white p-4 hover:border-brand transition-all">
    <div className="flex items-center gap-4">
      <Avatar src={staff.photo} alt={`${staff.name} ${staff.lastName}`} size="lg" />
      <div>
        <p className="text-[10px] text-brand uppercase tracking-[0.2em] font-oswald font-bold">{staff.roleDisplay}</p>
        <h4 className="text-lg font-teko text-white uppercase">
          {staff.name} {staff.lastName}
        </h4>
        {staff.credentials?.license && (
          <p className="text-xs text-gray-500 font-oswald">{staff.credentials.license}</p>
        )}
      </div>
    </div>
  </div>
);