import { useState, useEffect } from 'react';

const HomePage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hrs: 14, min: 45, sec: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
        if (prev.min > 0) return { ...prev, min: prev.min - 1, sec: 59 };
        if (prev.hrs > 0) return { ...prev, hrs: prev.hrs - 1, min: 59, sec: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hrs: 23, min: 59, sec: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-display selection:bg-[#2962FF] pt-32 pb-20 px-4 md:px-10 lg:px-16">

      {/* Expansive Bento Grid Container */}
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

        {/* 1. IDENTITY IN CEMENT - Main Hero Box (8 cols) */}
        <div className="md:col-span-8 bg-[#0A0A0A] p-10 md:p-16 flex flex-col justify-between min-h-[550px] border border-white/5 hover:border-white/20 transition-colors group relative overflow-hidden">
          {/* Subtle Background Branding */}
          <div className="absolute top-0 right-0 text-[15rem] font-black italic text-white/2 leading-none translate-x-1/4 -translate-y-1/4 pointer-events-none uppercase">
            BEL
          </div>

          <div className="relative z-10">
            <h1 className="text-[clamp(4rem,10vw,7rem)] font-black italic leading-[0.8] tracking-tighter uppercase mb-8">
              IDENTITY<br /><span className="text-[#2962FF]">IN CEMENT</span>
            </h1>
            <p className="max-w-lg text-gray-400 font-bold uppercase tracking-widest text-[11px] leading-relaxed mb-6">
              We are built on the foundations of brutalist principles. Defense that feels like concrete, offense that strikes with architectural precision. Our game is not just played; it is constructed.
            </p>
            <p className="max-w-lg text-gray-500 font-medium text-[11px] leading-relaxed">
              Every possession is an opportunity to reinforce the structure of our legacy. We do not rely on flash, but on the undeniable weight of consistent, hard-nosed basketball.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-[#2962FF] uppercase tracking-widest">DIVISION</span>
              <span className="text-3xl font-black uppercase italic tracking-tighter">LIGA NACIONAL</span>
            </div>
            <button className="bg-white text-black px-8 py-4 font-black uppercase italic tracking-tighter text-xl hover:bg-[#2962FF] hover:text-white transition-all flex items-center gap-4">
              VER ROSTER <span className="text-2xl">→</span>
            </button>
          </div>
        </div>

        {/* 2. TABLA DE POSICIONES (4 cols) */}
        <div className="md:col-span-4 bg-[#0A0A0A] p-10 flex flex-col border border-white/5 hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start mb-12">
            <h2 className="text-[#2962FF] text-4xl font-black uppercase leading-[0.9] italic tracking-tighter">
              TABLA DE<br />POSICIONES
            </h2>
            <div className="w-10 h-10 border-2 border-white flex flex-col items-center justify-center gap-1.5">
              <div className="w-5 h-[2px] bg-white"></div>
              <div className="w-5 h-[2px] bg-white"></div>
              <div className="w-5 h-[2px] bg-white"></div>
            </div>
          </div>

          <div className="flex-1">
            <table className="w-full text-left font-bold uppercase tracking-widest text-[11px]">
              <thead>
                <tr className="text-gray-600 border-b border-white/10">
                  <th className="pb-6">POS</th>
                  <th className="pb-6">TEAM</th>
                  <th className="pb-6">GP</th>
                  <th className="pb-6">W</th>
                  <th className="pb-6">L</th>
                  <th className="pb-6 text-[#2962FF]">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { p: 1, t: 'BELGRANO', g: 14, w: 11, l: 3, pts: 25, active: true },
                  { p: 2, t: 'IACC', g: 14, w: 10, l: 4, pts: 24 },
                  { p: 3, t: 'CAB', g: 14, w: 9, l: 5, pts: 23 },
                  { p: 4, t: 'OVR', g: 14, w: 8, l: 6, pts: 22 },
                  { p: 5, t: 'QSA', g: 14, w: 7, l: 7, pts: 21 },
                ].map((row, i) => (
                  <tr key={i} className={`hover:bg-white/5 transition-colors ${row.active ? 'bg-[#2962FF]/10' : ''}`}>
                    <td className="py-6">{row.p}</td>
                    <td className={`py-6 font-black ${row.active ? 'text-white' : 'text-gray-400'}`}>{row.t}</td>
                    <td className="py-6 text-gray-500">{row.g}</td>
                    <td className="py-6 text-gray-500">{row.w}</td>
                    <td className="py-6 text-gray-500">{row.l}</td>
                    <td className={`py-6 font-black ${row.active ? 'text-[#2962FF]' : 'text-gray-300'}`}>{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. ÚLTIMO RESULTADO (6 cols) */}
        <div className="md:col-span-6 bg-[#0A0A0A] p-10 md:p-16 border border-white/5 hover:border-white/20 transition-colors">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">ÚLTIMO RESULTADO</h2>
            <span className="bg-white text-black text-[11px] font-black px-3 py-1.5 uppercase tracking-widest">FINAL</span>
          </div>

          <div className="flex justify-between items-center mb-20 px-2 md:px-4">
            <div className="flex flex-col">
              <span className="text-2xl md:text-5xl font-black text-gray-600 mb-2">CAB</span>
              <span className="text-7xl md:text-[10rem] font-black font-teko leading-none text-gray-400">84</span>
            </div>
            <div className="w-8 md:w-20 h-[2px] bg-gray-800"></div>
            <div className="flex flex-col items-end">
              <span className="text-2xl md:text-5xl font-black text-[#2962FF] mb-2">BEL</span>
              <span className="text-7xl md:text-[10rem] font-black font-teko leading-none text-white">92</span>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10">
            <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest block mb-8">TEAM STATISTICS</span>
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col items-center border-r border-white/10">
                <span className="text-[#2962FF] text-[11px] font-black uppercase mb-2">FG%</span>
                <span className="text-5xl font-black font-teko">48.5</span>
              </div>
              <div className="flex flex-col items-center border-r border-white/10">
                <span className="text-[#2962FF] text-[11px] font-black uppercase mb-2">REB</span>
                <span className="text-5xl font-black font-teko">42</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#2962FF] text-[11px] font-black uppercase mb-2">AST</span>
                <span className="text-5xl font-black font-teko">24</span>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-gray-600">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#2962FF] animate-pulse"></div>
              OCT 24 / AWAY
            </span>
            <button className="hover:text-white transition-colors border-b border-white/10 pb-1">MATCH RECAP ↗</button>
          </div>
        </div>

        {/* 4. PRÓXIMO PARTIDO (6 cols) */}
        <div className="md:col-span-6 bg-[#2962FF] p-6 md:p-12 border-t border-white/10 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-10 md:mb-12">
              <h2 className="text-white text-2xl md:text-3xl font-black uppercase italic tracking-tighter">PRÓXIMO PARTIDO</h2>
              <span className="bg-black text-white text-[9px] md:text-[10px] font-black px-2 py-1 uppercase tracking-widest">HOME</span>
            </div>

            <h3 className="text-8xl md:text-[10rem] font-black leading-[0.75] tracking-tighter uppercase mb-4">BEL</h3>
            <h4 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 md:mb-12">VS OBRAS</h4>
          </div>

          <div>
            <div className="flex justify-between items-center text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4">
              <span>BEL 8</span>
              <span className="text-black/60 font-bold hidden sm:block">HEAD TO HEAD W-L</span>
              <span>OVR 3</span>
            </div>
            <div className="h-3 md:h-4 bg-black w-full mb-8 md:mb-12 overflow-hidden flex">
              <div className="h-full bg-white w-[75%]"></div>
              <div className="h-full bg-black w-[25%]"></div>
            </div>

            <div className="grid grid-cols-4 bg-black p-4 md:p-6">
              {[
                { val: String(timeLeft.days).padStart(2, '0'), label: 'DAYS' },
                { val: String(timeLeft.hrs).padStart(2, '0'), label: 'HRS' },
                { val: String(timeLeft.min).padStart(2, '0'), label: 'MIN' },
                { val: String(timeLeft.sec).padStart(2, '0'), label: 'SEC' },
              ].map((unit, i) => (
                <div key={i} className={`flex flex-col items-center ${i !== 3 ? 'border-r border-white/10' : ''}`}>
                  <span className="text-[#2962FF] text-2xl md:text-3xl font-black font-teko">{unit.val}</span>
                  <span className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Simplified Footer for Bento Style */}
      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-black uppercase italic tracking-tighter">BELGRANO</span>
          <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">©2024 CLUB BELGRANO - BRUTALIST DIVISION</p>
        </div>
        <div className="flex gap-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
          {['CONTACTO', 'SPONSORS', 'PRIVACIDAD', 'TÉRMINOS'].map(link => (
            <span key={link} className="cursor-pointer hover:text-white transition-colors">{link}</span>
          ))}
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
