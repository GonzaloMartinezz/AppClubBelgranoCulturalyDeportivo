import React from 'react';

const Scoreboard = () => {
  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-sm max-w-sm w-full">
      <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-bold text-center">
        Resultado Final
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full mb-2 flex items-center justify-center">
            {/* Team Logo Placeholder */}
            <span className="text-xl font-bold">BEL</span>
          </div>
          <span className="text-[6rem] font-teko leading-none font-bold text-white">40</span>
        </div>
        <div className="text-4xl font-teko text-brand/50 mt-8">-</div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full mb-2 flex items-center justify-center">
            {/* Opponent Logo Placeholder */}
            <span className="text-xl font-bold">OPP</span>
          </div>
          <span className="text-[6rem] font-teko leading-none font-bold text-white">66</span>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-white/5 text-center">
        <div className="text-sm font-semibold uppercase tracking-wider text-brand">Torneo Federal A</div>
      </div>
    </div>
  );
};

export default Scoreboard;
