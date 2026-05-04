import { useState } from 'react';

const MatchCalendar = ({ matches = [] }) => {
  const [scrollPos, setScrollPos] = useState(0);

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
    <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#1a1a1a', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-350 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <h2 className="text-6xl md:text-8xl font-teko font-bold uppercase leading-[0.85] tracking-tight">
              <span className="text-white">Fixture</span> <span style={{ color: 'var(--color-accent)' }}>Temporada</span>
            </h2>
            <p className="text-gray-500 font-oswald uppercase tracking-[0.2em] text-xs mt-3">Próximos encuentros y resultados</p>
          </div>
          <div className="flex gap-3">
            <button
              className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all group"
              style={{ borderColor: scrollPos > 0 ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)' }}
            >
              <svg className="h-4 w-4 text-gray-500 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all group">
              <svg className="h-4 w-4 text-gray-500 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Matches Scroll */}
        <div
          className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-6 px-6"
          onScroll={(e) => setScrollPos(e.currentTarget.scrollLeft)}
        >
          {displayMatches.map((match, index) => {
            const nextMatch = isNextMatch(match.status);
            return (
              <div
                key={match._id || index}
                className="min-w-95 snap-center p-8 transition-all duration-500 hover:-translate-y-2 group"
                style={{
                  border: nextMatch ? '2px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.1)',
                  background: nextMatch ? 'rgba(255,140,0,0.05)' : 'rgba(255,255,255,0.02)',
                  boxShadow: nextMatch ? '0 0 40px rgba(255,140,0,0.15)' : 'none'
                }}
              >
                {/* Match Header */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <span
                    className="text-[9px] font-oswald font-bold uppercase tracking-[0.25em] px-3 py-1.5"
                    style={{
                      background: nextMatch ? 'var(--color-accent)' : 'rgba(255,255,255,0.05)',
                      color: nextMatch ? 'white' : '#999'
                    }}
                  >
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
                    <div
                      className="w-16 h-16 mx-auto mb-3 border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(255,140,0,0.1)',
                        borderColor: 'var(--color-accent)'
                      }}
                    >
                      <span className="font-oswald font-bold text-base" style={{ color: 'var(--color-accent)' }}>BEL</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-oswald tracking-[0.2em] uppercase">{match.homeTeam?.name || 'Belgrano'}</p>
                  </div>

                  <div className="text-center px-6">
                    {match.homeScore !== null && match.homeScore !== undefined ? (
                      <div className="text-5xl font-teko font-bold tracking-tighter">
                        <span style={{ color: 'var(--color-accent)' }}>{match.homeScore}</span>
                        <span className="text-gray-600 mx-2">-</span>
                        <span className="text-gray-300">{match.awayScore}</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-teko font-bold text-gray-600 tracking-tighter">VS</div>
                    )}
                  </div>

                  <div className="text-center flex-1">
                    <div
                      className="w-16 h-16 mx-auto mb-3 border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderColor: 'rgba(255,255,255,0.1)'
                      }}
                    >
                      <span className="font-oswald font-bold text-base text-gray-400">
                        {(match.awayTeam?.name || '???').substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-oswald tracking-[0.2em] uppercase">{match.awayTeam?.name || match.opponent}</p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className="w-full py-4 border text-[10px] font-oswald font-bold uppercase tracking-[0.25em] transition-all duration-300 flex justify-center items-center gap-3"
                  style={{
                    background: nextMatch ? 'var(--color-accent)' : 'transparent',
                    borderColor: nextMatch ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)',
                    color: nextMatch ? 'white' : '#999'
                  }}
                  onMouseEnter={(e) => {
                    if (!nextMatch) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!nextMatch) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#999';
                    }
                  }}
                >
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
