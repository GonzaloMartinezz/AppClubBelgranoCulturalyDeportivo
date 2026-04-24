import React from 'react';

const MatchCalendar = () => {
  const matches = [
    { date: '21 ABR 2026', time: '21:30', opponent: 'Talleres', status: 'COMPLETED', score: '82 - 78', result: 'W' },
    { date: '24 ABR 2026', time: '22:00', opponent: 'Estudiantes', status: 'NEXT MATCH', score: '- - -' },
    { date: '28 ABR 2026', time: '21:00', opponent: 'Mitre', status: 'UPCOMING', score: '- - -' },
  ];

  return (
    <div className="bg-[#0A0A0A] py-16 px-6">
      <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
        {matches.map((match, index) => (
          <div 
            key={index} 
            className={`min-w-[320px] snap-center rounded-xl p-6 border ${
              match.status === 'NEXT MATCH' 
                ? 'bg-gradient-to-br from-blue-900 to-[#111] border-blue-500/50' 
                : 'bg-[#161616] border-white/5'
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded">
                {match.status}
              </span>
              <span className="text-xs text-gray-400 font-mono">{match.date} | {match.time}</span>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-800 mx-auto mb-2 flex items-center justify-center text-xs font-bold">BEL</div>
              </div>
              <div className="text-3xl font-black font-mono tracking-tighter text-white">
                {match.score}
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 mx-auto mb-2 flex items-center justify-center text-xs font-bold">{match.opponent.substring(0,3).toUpperCase()}</div>
              </div>
            </div>

            <button className="w-full py-3 border border-white/20 hover:bg-white hover:text-black transition-colors uppercase text-[10px] font-bold tracking-[0.2em] rounded-sm">
              Match Centre
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchCalendar;
