import { useState, useEffect } from 'react';
import { useMatches } from '../hooks/useMatches';
import { useClub } from '../hooks/useClub';
import { MatchCard } from '../../components/molecules';

export const HeroSection = () => {
  const { fetchLatestMatch, fetchNextMatch } = useMatches();
  const { fetchClub } = useClub();
  const [latestMatch, setLatestMatch] = useState(null);
  const [nextMatch, setNextMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latest, next, clubData] = await Promise.all([
          fetchLatestMatch().catch(() => null),
          fetchNextMatch().catch(() => null),
          fetchClub().catch(() => null)
        ]);
        setLatestMatch(latest);
        setNextMatch(next);
        if (clubData) {
          // Club data loaded if needed
        }
      } catch {
        console.error('Error fetching hero data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchLatestMatch, fetchNextMatch, fetchClub]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="px-6 md:px-12 py-12 lg:py-24 border-b-2 border-white/10 max-w-[100vw] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          <div className="lg:col-span-7 space-y-8">
            <div className="h-12 w-48 bg-white/10 animate-pulse"></div>
            <div className="h-32 w-full bg-white/10 animate-pulse"></div>
            <div className="h-8 w-64 bg-white/10 animate-pulse"></div>
            <div className="flex gap-4">
              <div className="h-14 w-40 bg-white/10 animate-pulse"></div>
              <div className="h-14 w-40 bg-white/10 animate-pulse"></div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="h-80 w-full bg-white/10 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 md:px-12 py-12 lg:py-24 max-w-[100vw] overflow-hidden border-b-2 border-white/10">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <span className="font-teko text-[30vw] leading-none font-bold">1920</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-block border-2 border-brand bg-dark text-white px-4 py-2 font-oswald font-bold text-xs uppercase tracking-[0.2em]">
            <span className="w-2 h-2 inline-block bg-brand mr-3 animate-pulse"></span>
            LIGA FEDERAL DE BÁSQUET
          </div>

          <h1 className="text-[5rem] sm:text-[7rem] md:text-[9rem] font-teko uppercase leading-[0.8] tracking-normal text-white">
            EL GIGANTE <br />
            <span className="text-stroke-brand">TUCUMANO</span>
          </h1>

          <p className="font-oswald text-gray-400 max-w-md text-lg leading-relaxed uppercase tracking-widest border-l-4 border-brand pl-6">
            Identidad. Garra. Historia. Acompañá al equipo en su camino a lo más alto de la liga.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('contacto')}
              className="font-oswald font-bold tracking-[0.2em] uppercase bg-brand text-white border-2 border-brand px-10 py-5 hover:bg-white hover:text-brand transition-all duration-300"
            >
              HAZTE SOCIO
            </button>
            <button
              onClick={() => scrollToSection('calendario')}
              className="font-oswald font-bold tracking-[0.2em] uppercase bg-transparent text-white border-2 border-white px-10 py-5 hover:bg-white hover:text-dark transition-all duration-300"
            >
              VER PARTIDOS
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          {latestMatch ? (
            <MatchCard match={latestMatch} showDetails={false} />
          ) : nextMatch ? (
            <div className="bg-dark border-4 border-brand p-8 text-center">
              <p className="text-xs font-oswald text-brand mb-4 uppercase tracking-[0.3em]">PRÓXIMO PARTIDO</p>
              <div className="text-4xl font-teko text-white mb-2">
                {new Date(nextMatch.date).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
              </div>
              <p className="text-xl font-oswald text-gray-400">{nextMatch.time}</p>
              <p className="text-lg font-oswald text-white mt-4">{nextMatch.venue}</p>
            </div>
          ) : (
            <div className="bg-dark border-4 border-white p-8 text-center">
              <p className="text-xl font-teko text-gray-500">Sin partidos programados</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
