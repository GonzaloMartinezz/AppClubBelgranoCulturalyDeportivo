import React from 'react';

const MatchCalendar = ({ matches = [] }) => {
  // Si no hay partidos pasados por props, usamos unos mock por defecto o mensaje
  const displayMatches = matches.length > 0 ? matches : [
    { date: '21 ABR 2026', time: '21:30', opponent: 'Talleres', status: 'COMPLETED', score: '82 - 78' },
    { date: '24 ABR 2026', time: '22:00', opponent: 'Estudiantes', status: 'NEXT MATCH', score: '- - -' },
    { date: '28 ABR 2026', time: '21:00', opponent: 'Mitre', status: 'UPCOMING', score: '- - -' },
  ];

  return (
    <div className="bg-dark py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-5xl md:text-7xl font-teko font-bold uppercase tracking-normal text-white drop-shadow-md">
            Fixture <span className="text-brand">Temporada</span>
          </h2>
          <p className="text-gray-400 font-oswald uppercase tracking-widest text-sm mt-2">Próximos encuentros y resultados</p>
        </div>
        <div className="hidden md:flex gap-2">
          <button className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto pb-12 snap-x scrollbar-hide">
        {displayMatches.map((match, index) => (
          <div
            key={index}
            className={`min-w-[340px] snap-center rounded-2xl p-8 border backdrop-blur-md transition-all duration-500 hover:-translate-y-2 ${match.status === 'NEXT MATCH' || match.status === 'Próximo'
                ? 'bg-linear-to-br from-brand/20 to-surface border-brand/50 shadow-[0_0_30px_rgba(0,51,160,0.15)]'
                : 'bg-surface/50 border-white/5 hover:border-white/10'
              }`}
          >
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <span className={`text-[10px] font-oswald font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${match.status === 'NEXT MATCH' || match.status === 'Próximo' ? 'bg-brand text-white' : 'bg-white/5 text-gray-400'
                }`}>
                {match.status}
              </span>
              <div className="text-right">
                <span className="block text-sm text-white font-oswald tracking-widest">
                  {match.date ? new Date(match.date).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }).toUpperCase() : 'PRÓXIMO'}
                </span>
                <span className="text-xs text-gray-500 font-mono">{match.time || '22:00 HS'}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-10">
              <div className="text-center flex-1">
                <div className="w-14 h-14 rounded-full bg-dark border border-white/10 mx-auto mb-3 flex items-center justify-center text-sm font-oswald font-bold text-white shadow-inner">BEL</div>
                <p className="text-[11px] text-gray-400 font-oswald tracking-widest uppercase">Belgrano</p>
              </div>

              <div className="text-5xl font-teko font-bold tracking-tighter text-white px-4 drop-shadow-md">
                {match.homeScore !== undefined ? `${match.awayScore} - ${match.homeScore}` : match.score}
              </div>

              <div className="text-center flex-1">
                <div className="w-14 h-14 rounded-full bg-dark border border-white/10 mx-auto mb-3 flex items-center justify-center text-sm font-oswald font-bold text-gray-400 shadow-inner">
                  {(match.homeTeam || match.opponent || '???').substring(0, 3).toUpperCase()}
                </div>
                <p className="text-[11px] text-gray-400 font-oswald tracking-widest uppercase">{match.homeTeam || match.opponent}</p>
              </div>
            </div>

            <button className={`w-full py-3.5 border transition-all duration-300 uppercase text-[11px] font-oswald font-bold tracking-[0.2em] rounded-xl flex justify-center items-center gap-2 ${match.status === 'NEXT MATCH' || match.status === 'Próximo'
                ? 'bg-brand text-white border-brand hover:bg-blue-700 shadow-lg shadow-brand/20'
                : 'bg-transparent border-white/10 text-gray-300 hover:bg-white hover:text-black hover:border-white'
              }`}>
              Match Centre
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchCalendar;
