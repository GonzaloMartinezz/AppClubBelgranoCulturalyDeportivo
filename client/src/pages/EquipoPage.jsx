import { useState, useEffect } from 'react';
import api from '../core/api/client';

const positions = { BASE: 'Base', ESCOLTA: 'Escolta', ALERO: 'Alero', 'ALA-PIVOT': 'Ala-Pívot', PIVOT: 'Pívot' };

const mockPlayers = [
  { _id: '1', name: 'Gonzalo',   lastName: 'Martínez', number: 10, position: 'BASE',      status: 'ACTIVE',  age: 24, careerStats: { points: 18, games: 32 } },
  { _id: '2', name: 'Facundo',   lastName: 'Romero',   number: 7,  position: 'ESCOLTA',   status: 'ACTIVE',  age: 22, careerStats: { points: 16, games: 28 } },
  { _id: '3', name: 'Lucas',     lastName: 'García',   number: 14, position: 'ALERO',     status: 'ACTIVE',  age: 26, careerStats: { points: 12, games: 30 } },
  { _id: '4', name: 'Mateo',     lastName: 'Díaz',     number: 9,  position: 'ALA-PIVOT', status: 'ACTIVE',  age: 28, careerStats: { points: 14, games: 25 } },
  { _id: '5', name: 'Nahuel',    lastName: 'Torres',   number: 5,  position: 'PIVOT',     status: 'ACTIVE',  age: 30, careerStats: { points: 10, games: 35 } },
  { _id: '6', name: 'Sebastián', lastName: 'López',    number: 21, position: 'ESCOLTA',   status: 'ACTIVE',  age: 23, careerStats: { points: 9,  games: 20 } },
  { _id: '7', name: 'Rodrigo',   lastName: 'Pérez',    number: 33, position: 'PIVOT',     status: 'INJURED', age: 27, careerStats: { points: 8,  games: 18 } },
  { _id: '8', name: 'Agustín',   lastName: 'Ríos',     number: 4,  position: 'BASE',      status: 'ACTIVE',  age: 21, careerStats: { points: 7,  games: 22 } },
];

const mockStaff = [
  { _id: 's1', name: 'Carlos',  lastName: 'Fernández', role: 'Director Técnico',   age: 52, experience: '15 años' },
  { _id: 's2', name: 'Marcelo', lastName: 'Ríos',      role: 'Asistente Técnico',  age: 44, experience: 'Ex-jugador' },
  { _id: 's3', name: 'Diego',   lastName: 'Molina',    role: 'Preparador Físico',  age: 38, experience: 'Alto rendimiento' },
];

/* ─────────────────────────────────────────
   PLAYER CARD — Image 4 style
   Giant number watermark, photo, stats left, name bottom
───────────────────────────────────────── */
const PersonCard = ({ person, isStaff = false }) => {
  const number   = person.number ?? '—';
  const fullName = `${person.name}`;
  const lastName = person.lastName;
  const position = isStaff ? person.role : (positions[person.position] || person.position);
  const stats    = isStaff
    ? [
        { label: 'Exp', val: person.experience || '—' },
      ]
    : [
        { label: 'Edad',     val: person.age ?? '—' },
        { label: 'Partidos', val: person.careerStats?.games ?? '—' },
        { label: 'Puntos',   val: person.careerStats?.points ?? '—' },
      ];

  return (
    <div
      className="card-flat relative group cursor-default"
      style={{ borderRadius: 0 }}
    >
      {/* ── Giant number watermark ── */}
      <div
        className="absolute top-0 right-0 z-0 select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-teko)',
          fontWeight: 800,
          fontSize: '14rem',
          lineHeight: 0.85,
          color: 'rgba(255,255,255,0.04)',
          right: '-10px',
          top: '-20px',
        }}
      >
        {isStaff ? '' : number}
      </div>

      {/* ── Player photo ── */}
      <div className="relative overflow-hidden" style={{ height: '320px' }}>
        <img
          src={isStaff ? '/team-photo.png' : '/player-action.png'}
          alt={`${person.name} ${person.lastName}`}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          style={{ opacity: 0.85 }}
        />

        {/* ── Stats overlay — LEFT side ── */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-3">
          {stats.map((s) => (
            <div key={s.label}>
              <span
                className="block font-teko font-bold text-3xl text-white leading-none"
              >
                {s.val}
              </span>
              <span
                className="block font-oswald text-[9px] uppercase tracking-[0.2em]"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Status badge — top right */}
        {!isStaff && (
          <div className="absolute top-4 right-4 z-10">
            <span className={`badge ${person.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
              {person.status === 'ACTIVE' ? 'Activo' : 'Lesionado'}
            </span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: 'linear-gradient(to top, var(--color-surface) 0%, transparent 100%)' }}
        />
      </div>

      {/* ── Bottom bar: Position + Name ── */}
      <div
        className="relative z-10 px-5 py-4 flex items-end gap-4"
        style={{ background: 'var(--color-surface)', marginTop: '-1px' }}
      >
        {/* Position label */}
        <div
          className="flex-shrink-0 px-3 py-1.5 font-oswald font-bold text-[10px] uppercase tracking-[0.15em]"
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '6px',
            color: 'rgba(255,255,255,0.4)',
            borderLeft: '3px solid var(--color-accent)',
          }}
        >
          {position}
        </div>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <p className="font-teko font-bold text-2xl text-white uppercase leading-none truncate">
            {fullName}
          </p>
          <p className="font-oswald text-[10px] uppercase tracking-[0.2em] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

const filters = ['ALL', 'BASE', 'ESCOLTA', 'ALERO', 'ALA-PIVOT', 'PIVOT'];

const EquipoPage = () => {
  const [players, setPlayers] = useState([]);
  const [staff, setStaff]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('ALL');
  const [tab, setTab]         = useState('PLAYERS'); // PLAYERS | STAFF

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/players');
        setPlayers(res.data.data || []);
      } catch {
        setPlayers(mockPlayers);
      }
      try {
        const res2 = await api.get('/staff');
        setStaff(res2.data.data || []);
      } catch {
        setStaff(mockStaff);
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = filter === 'ALL' ? players : players.filter(p => p.position === filter);

  return (
    <div className="pt-16" style={{ background: 'var(--color-dark)' }}>

      {/* ── Big section title (like "OUR FAMILY") ── */}
      <section className="relative overflow-hidden py-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="app-container relative z-10">
          {/* Ghost giant title behind */}
          <div
            className="section-hero-title absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
            style={{ fontSize: 'clamp(6rem, 20vw, 12rem)' }}
          >
            BELGRANO
          </div>

          <div className="relative z-10">
            <p className="section-label mb-4">Temporada 2026</p>
            <h1
              className="font-teko font-bold uppercase leading-[0.88] tracking-tight text-white"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}
            >
              Nuestra<br />
              <span style={{ color: 'var(--color-accent)' }}>Familia</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ── Tabs: Players / Staff ── */}
      <div
        className="sticky top-16 z-30 border-b"
        style={{
          background: 'rgba(18,18,18,0.95)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <div className="app-container flex items-center justify-between py-3">
          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { key: 'PLAYERS', label: 'Jugadores' },
              { key: 'STAFF',   label: 'Cuerpo Técnico' },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="font-oswald font-bold text-[12px] uppercase tracking-[0.1em] px-4 py-2 transition-all duration-200"
                style={{
                  borderRadius: '10px',
                  background: tab === t.key ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: tab === t.key ? '#fff' : 'rgba(255,255,255,0.4)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Position filters (only on players tab) */}
          {tab === 'PLAYERS' && (
            <div className="hidden md:flex gap-1.5">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="font-oswald font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 transition-all duration-200"
                  style={{
                    borderRadius: '8px',
                    background: filter === f ? 'var(--color-accent)' : 'transparent',
                    color: filter === f ? '#fff' : 'rgba(255,255,255,0.35)',
                  }}
                >
                  {f === 'ALL' ? 'Todos' : positions[f] || f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="py-10">
        <div className="app-container">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ height: '380px', background: 'var(--color-surface)', opacity: 0.5 }} />
              ))}
            </div>
          ) : tab === 'PLAYERS' ? (
            <>
              <p className="font-oswald text-[10px] uppercase tracking-[0.25em] mb-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {filtered.length} jugadores
              </p>
              {/* Grid with 1px gap borders like the reference */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: '1px', background: 'rgba(255,255,255,0.06)' }}
              >
                {filtered.map((p) => (
                  <PersonCard key={p._id} person={p} />
                ))}
              </div>
            </>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: '1px', background: 'rgba(255,255,255,0.06)' }}
            >
              {staff.map((s) => (
                <PersonCard key={s._id} person={s} isStaff />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EquipoPage;
