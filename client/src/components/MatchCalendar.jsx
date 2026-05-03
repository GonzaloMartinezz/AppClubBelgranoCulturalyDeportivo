const MatchCalendar = ({ matches = [] }) => {
  const displayMatches = matches.length > 0 ? matches : [
    { _id: '1', date: '2026-04-21', time: '21:30', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Talleres' }, status: 'FINAL', homeScore: 82, awayScore: 78 },
    { _id: '2', date: '2026-04-24', time: '22:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Estudiantes' }, status: 'NEXT', homeScore: null, awayScore: null },
    { _id: '3', date: '2026-04-28', time: '21:00', homeTeam: { name: 'Belgrano' }, awayTeam: { name: 'Mitre' }, status: 'UPCOMING', homeScore: null, awayScore: null },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return 'PRÓXIMO';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }).toUpperCase();
  };

  const isNextMatch = (status) => ['NEXT', 'NEXT MATCH', 'Próximo'].includes(status);

  return (
    <section className="bg-dark py-32 px-6 relative overflow-hidden">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <h2 className="text-6xl md:text-8xl font-teko font-bold uppercase leading-[0.85] tracking-tight">
              <span className="text-white">Fixture</span> <span className="text-brand">Temporada</span>
            </h2>
            <p className="text-gray-500 font-oswald uppercase tracking-[0.2em] text-xs mt-3">Próximos encuentros y resultados</p>
          </div>
          <div className="flex gap-3">
            <button className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-brand/30 transition-all group">
              <svg className="h-4 w-4 text-gray-500 group-hover:text-brand transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-brand/30 transition-all group">
              <svg className="h-4 w-4 text-gray-500 group-hover:text-brand transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Matches Scroll */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-6 px-6">
          {displayMatches.map((match, index) => {
            const nextMatch = isNextMatch(match.status);
            return (
              <div
                key={match._id || index}
                className={`min-w-[380px] snap-center border p-8 transition-all duration-500 hover:-translate-y-2 ${nextMatch
                    ? 'bg-surface border-brand/30 shadow-[0_0_40px_rgba(0,51,160,0.15)]'
                    : 'bg-surface/50 border-white/5 hover:border-white/10'
                  }`}
              >
                {/* Match Header */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <span className={`text-[9px] font-oswald font-bold uppercase tracking-[0.25em] px-3 py-1.5 ${nextMatch ? 'bg-brand text-white' : 'bg-white/5 text-gray-500'}`}>
                    {match.status === 'FINAL' ? 'Finalizado' : match.status === 'NEXT' ? 'Próximo' : match.status}
                  </span>
                  <div className="text-right">
                    <span className="block text-sm text-white font-oswald tracking-widest">
                      {formatDate(match.date)}
                    </span>
                    <span className="text-xs text-gray-600 font-mono">{match.time || '22:00'}</span>
                  </div>
                </div>

                {/* Teams & Score */}
                <div className="flex justify-between items-center mb-10 px-4">
                  <div className="text-center flex-1">
                    <div className="w-16 h-16 mx-auto mb-3 bg-dark border border-white/10 flex items-center justify-center">
                      <span className="font-oswald font-bold text-base text-brand">BEL</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-oswald tracking-[0.2em] uppercase">{match.homeTeam?.name || 'Belgrano'}</p>
                  </div>

                  <div className="text-center px-6">
                    {match.homeScore !== null && match.homeScore !== undefined ? (
                      <div className="text-5xl font-teko font-bold tracking-tighter">
                        <span className="text-brand">{match.homeScore}</span>
                        <span className="text-gray-600 mx-2">-</span>
                        <span className="text-gray-300">{match.awayScore}</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-teko font-bold text-gray-600 tracking-tighter">VS</div>
                    )}
                  </div>

                  <div className="text-center flex-1">
                    <div className="w-16 h-16 mx-auto mb-3 bg-dark border border-white/10 flex items-center justify-center">
                      <span className="font-oswald font-bold text-base text-gray-400">
                        {(match.awayTeam?.name || '???').substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-oswald tracking-[0.2em] uppercase">{match.awayTeam?.name || match.opponent}</p>
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full py-4 border text-[10px] font-oswald font-bold uppercase tracking-[0.25em] transition-all duration-300 flex justify-center items-center gap-3 ${nextMatch
                    ? 'bg-brand border-brand text-white hover:bg-brand-light shadow-lg shadow-brand/20'
                    : 'border-white/10 text-gray-400 hover:bg-white hover:text-dark hover:border-white'
                  }`}>
                  Ver Detalles
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MatchCalendar;
