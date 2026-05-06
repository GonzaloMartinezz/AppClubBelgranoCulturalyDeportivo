import { useState } from 'react';

const TechnicalTable = ({ title, headers, rows }) => (
  <div className="border border-white/20 p-1 bg-black/40 mb-12">
    <div className="bg-zinc-900/50 p-4 border-b border-white/10 mb-4">
      <h3 className="text-xl font-black uppercase tracking-tighter italic">{title}</h3>
    </div>
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left border-collapse font-mono text-[11px] uppercase tracking-widest">
        <thead>
          <tr className="border-b border-white/20 text-gray-500">
            {headers.map((h, i) => <th key={i} className="pb-4 font-black">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              {Object.values(row).map((val, j) => (
                <td key={j} className={`py-4 ${j === 0 ? 'font-black text-white' : 'text-gray-400'}`}>
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const TiendaPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-display selection:bg-[#2962FF] pt-32 pb-20">

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85]">
          SUMINISTROS —<br />CLUB BELGRANO
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-8">

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">

          {/* Jersey Image Box */}
          <div className="border border-white/20 p-6 flex flex-col items-center justify-center bg-zinc-900/30 group">
            <span className="self-start text-[10px] font-mono text-gray-600 mb-8">([EQUIPMENT.IDENT:JERSEY_24])</span>
            <div className="relative w-full max-w-sm aspect-4/5 bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              {/* Placeholder for Jersey Illustration */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                <svg width="200" height="300" viewBox="0 0 100 150" fill="none">
                  <path d="M20 20L35 15H65L80 20V50L75 140H25L20 50V20Z" fill="white" />
                  <text x="50" y="70" textAnchor="middle" fill="#003087" fontSize="12" fontWeight="900">JERSEY</text>
                  <text x="50" y="90" textAnchor="middle" fill="#003087" fontSize="24" fontWeight="900" fontFamily="Teko">'24</text>
                </svg>
              </div>
              <div className="absolute top-4 left-4 text-[8px] font-mono text-white/30">REF. 00-24-TECH</div>
            </div>
            <h2 className="mt-8 text-3xl font-black uppercase italic tracking-tighter self-start">JERSEY TITULAR '24</h2>
          </div>

          {/* Specs Table Box */}
          <div className="flex flex-col h-full">
            <TechnicalTable
              title="EQUIPMENT SPECS - JERSEY TITULAR '24"
              headers={['ESPECIFICACIÓN', 'DETALLE']}
              rows={[
                { s: 'MATERIAL', d: '100% Poliéster Técnico con tecnología de absorción de humedad' },
                { s: 'CALCE', d: 'Athletic Fit, corte ajustado para rendimiento deportivo' },
                { s: 'TALLES', d: 'S, M, L, XL (Ver tabla de talles abajo)' },
                { s: 'PRECIO', d: '$45.000 (Moneda local)' },
                { s: 'ESTADO', d: 'DISPONIBLE' },
              ]}
            />
            <button className="w-full mt-auto border-2 border-white/40 py-6 font-black uppercase italic tracking-tighter text-2xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4">
              ADQUIRIR EQUIPO
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </button>
          </div>

        </div>

        {/* Size Guide */}
        <TechnicalTable
          title="GUÍA DE TALLES - TABLA TÉCNICA"
          headers={['TALLE', 'PECHO (CM)', 'CINTURA (CM)', 'LARGO (CM)']}
          rows={[
            { t: 'S', p: '90-95', c: '75-80', l: '70' },
            { t: 'M', p: '96-101', c: '81-86', l: '72' },
            { t: 'L', p: '102-107', c: '87-92', l: '74' },
            { t: 'XL', p: '108-113', c: '93-98', l: '76' },
          ]}
        />

        {/* Data Transmission Section */}
        <div className="mt-40">
          <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-12">ENLACE — CLUB BELGRANO</h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">

            {/* Form Box */}
            <div className="border-2 border-[#2962FF]/40 p-1 bg-black">
              <div className="border border-[#2962FF]/20 p-8">
                <span className="bg-[#2962FF]/10 text-[#2962FF] text-[10px] font-black px-3 py-1 rounded-sm w-fit mb-8 block tracking-widest">LINK SEGURO</span>
                <h3 className="text-5xl font-black uppercase italic tracking-tighter mb-12 leading-none">TRANSMISIÓN<br />DE DATOS</h3>

                <form className="space-y-10">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 font-mono">{'>'} IDENTIFICACIÓN (NOMBRE):</label>
                    <input type="text" className="w-full bg-zinc-900/50 border border-white/10 px-4 py-3 outline-none focus:border-[#2962FF] font-mono text-sm" placeholder="[ _ ]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 font-mono">{'>'} ENLACE COMUNICACIÓN (EMAIL):</label>
                    <input type="email" className="w-full bg-zinc-900/50 border border-white/10 px-4 py-3 outline-none focus:border-[#2962FF] font-mono text-sm" placeholder="[ _ ]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2 font-mono">{'>'} PAQUETE DE DATOS (MENSAJE):</label>
                    <textarea rows={4} className="w-full bg-zinc-900/50 border border-white/10 px-4 py-3 outline-none focus:border-[#2962FF] font-mono text-sm resize-none" placeholder="[ > _ ]"></textarea>
                  </div>

                  <button className="w-full bg-[#2962FF] text-white py-5 font-black uppercase italic tracking-tighter text-xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4">
                    INICIAR TRANSMISIÓN
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M22 2L11 13"></path>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Map/Graphics Box */}
            <div className="flex flex-col gap-8">
              <div className="flex-1 border-2 border-white/10 relative overflow-hidden bg-zinc-900/50 group">
                {/* Technical Map Placeholder */}
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2068&auto=format&fit=crop" className="w-full h-full object-cover opacity-30 grayscale group-hover:scale-110 transition-transform duration-1000" alt="Map" />
                <div className="absolute inset-0 bg-[#2962FF]/10 mix-blend-color"></div>
                {/* UI Overlay Grid */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-20">
                  {[...Array(36)].map((_, i) => <div key={i} className="border-[0.5px] border-white/20"></div>)}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-[#2962FF] rounded-full animate-ping opacity-50"></div>
              </div>

              <div className="border border-white/20 p-8 bg-zinc-900/20">
                <h4 className="text-xl font-black uppercase italic mb-4">CENTRO DE OPERACIONES</h4>
                <div className="font-mono text-[10px] text-gray-500 space-y-1 uppercase tracking-widest">
                  <p>+ LAT: -26.8083</p>
                  <p>+ LON: -65.2175</p>
                  <p className="text-white mt-4 font-black">{'>'} SAN MIGUEL DE TUCUMÁN, AR</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Technical Footer Images */}
      <div className="mt-40 border-t border-white/10 py-1 flex overflow-hidden grayscale opacity-30">
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className="min-w-[200px] h-[100px] border-r border-white/10 flex flex-col p-2 relative overflow-hidden group">
            <img src={`https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-100 transition-all" alt="Archive" />
            <span className="absolute bottom-1 left-2 text-[8px] font-mono text-white/40">IMAGE_{i + 20}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TiendaPage;
