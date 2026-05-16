import { motion } from 'framer-motion';

/* ════════════════════════════════════════════
   DASHBOARD MOCKUP - Visualización de stats
   ════════════════════════════════════════════ */
export const DashboardMockup = ({ amount = 12450, growth = 23.4 }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-dark via-surface to-dark p-6 md:p-10 rounded-[40px] overflow-hidden border border-white/10">
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `linear-gradient(rgba(181,255,0,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(181,255,0,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    />

    {/* Header */}
    <div className="relative z-10 flex items-center justify-between mb-8">
      <div>
        <p className="text-xs text-muted font-oswald uppercase tracking-widest mb-1">Total Revenue</p>
        <p className="text-3xl md:text-5xl font-teko font-black text-white">
          ${amount.toLocaleString()}
        </p>
      </div>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="px-3 py-1.5 bg-brand text-dark rounded-full text-xs font-bold flex items-center gap-1"
      >
        <span>↑</span> +{growth}%
      </motion.div>
    </div>

    {/* Chart line */}
    <div className="relative z-10 h-32 md:h-48 mb-6">
      <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B5FF00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B5FF00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          d="M 0,100 Q 50,80 80,90 T 150,60 T 220,75 T 290,40 T 360,30 L 400,20"
          fill="none"
          stroke="#B5FF00"
          strokeWidth="3"
        />
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          d="M 0,100 Q 50,80 80,90 T 150,60 T 220,75 T 290,40 T 360,30 L 400,20 L 400,150 L 0,150 Z"
          fill="url(#chartGrad)"
        />
        {/* Dots */}
        {[80, 150, 220, 290, 360].map((x, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + i * 0.1 }}
            cx={x}
            cy={[90, 60, 75, 40, 30][i]}
            r="5"
            fill="#B5FF00"
          />
        ))}
      </svg>
    </div>

    {/* Stats bottom */}
    <div className="relative z-10 grid grid-cols-3 gap-3">
      {[
        { label: 'Ingresos', value: '8.2k', color: 'text-brand' },
        { label: 'Gastos', value: '2.1k', color: 'text-orange-400' },
        { label: 'Neto', value: '6.1k', color: 'text-white' }
      ].map((s) => (
        <div key={s.label} className="bg-dark/80 border border-white/10 rounded-2xl p-3">
          <p className="text-xs text-muted mb-1">{s.label}</p>
          <p className={`text-xl md:text-2xl font-teko font-black ${s.color}`}>${s.value}</p>
        </div>
      ))}
    </div>

    {/* Floating elements */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute top-8 right-8 w-12 h-12 bg-brand/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-brand text-xl"
    >
      $
    </motion.div>
  </div>
);

/* ════════════════════════════════════════════
   PHONE MOCKUP - Mockup de teléfono con dashboard
   ════════════════════════════════════════════ */
export const PhoneMockup = ({ rotation = 0 }) => (
  <div
    className="relative mx-auto"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <div className="w-[200px] md:w-[280px] h-[400px] md:h-[560px] bg-gradient-to-br from-surface to-dark border-4 border-white/20 rounded-[40px] p-3 shadow-2xl">
      {/* Notch */}
      <div className="w-20 h-5 bg-dark rounded-b-2xl mx-auto mb-2" />

      {/* Screen content */}
      <div className="bg-dark rounded-3xl h-[calc(100%-30px)] p-4 overflow-hidden relative">
        {/* Status bar */}
        <div className="flex justify-between text-xs text-white/60 mb-3">
          <span>9:41</span>
          <span>●●●</span>
        </div>

        {/* Header */}
        <p className="text-xs text-muted mb-1">Bienvenido</p>
        <p className="text-lg md:text-2xl font-teko font-black text-white mb-4">DevStats</p>

        {/* Big number */}
        <div className="bg-brand rounded-2xl p-4 mb-4">
          <p className="text-xs text-dark/70 font-bold uppercase">Balance</p>
          <p className="text-2xl md:text-4xl font-teko font-black text-dark">$12.4k</p>
          <p className="text-xs text-dark/70 mt-1">↑ +23.4% este mes</p>
        </div>

        {/* Chart */}
        <svg viewBox="0 0 200 80" className="w-full h-16 mb-4">
          <defs>
            <linearGradient id={`pg-${rotation}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B5FF00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#B5FF00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
            d="M 0,60 Q 30,40 60,50 T 120,30 T 180,15 L 200,10"
            fill="none"
            stroke="#B5FF00"
            strokeWidth="2"
          />
          <path
            d="M 0,60 Q 30,40 60,50 T 120,30 T 180,15 L 200,10 L 200,80 L 0,80 Z"
            fill={`url(#pg-${rotation})`}
          />
        </svg>

        {/* List items */}
        {[
          { name: 'Landing Web', amount: '+$2.5k', color: 'text-brand' },
          { name: 'Hosting', amount: '-$45', color: 'text-orange-400' },
          { name: 'Consultoría', amount: '+$800', color: 'text-brand' }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-xs">
                {i === 0 ? '💻' : i === 1 ? '🌐' : '💡'}
              </div>
              <span className="text-xs text-white">{item.name}</span>
            </div>
            <span className={`text-xs font-bold ${item.color}`}>{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════
   STATS PATTERN - Patrón decorativo con stats
   ════════════════════════════════════════════ */
export const StatsPattern = () => (
  <div className="relative w-full h-full bg-gradient-to-br from-brand to-brand-light p-8 rounded-[40px] overflow-hidden">
    {/* Big number background */}
    <div className="absolute -bottom-10 -right-10 text-[20rem] font-teko font-black text-dark/10 leading-none">
      $
    </div>

    <div className="relative z-10 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-dark rounded-full" />
          <p className="text-xs text-dark font-bold uppercase tracking-widest">Live Dashboard</p>
        </div>
        <h3 className="text-4xl md:text-6xl font-teko font-black text-dark uppercase leading-[0.9]">
          Real-time<br />analytics
        </h3>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-2 md:gap-3 h-32 md:h-40">
        {[40, 65, 35, 80, 55, 75, 95, 60].map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${height}%` }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className="flex-1 bg-dark rounded-t-lg"
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-dark rounded-2xl p-3">
          <p className="text-xs text-brand font-bold uppercase">Hoy</p>
          <p className="text-2xl font-teko font-black text-white">$1.2k</p>
        </div>
        <div className="bg-dark rounded-2xl p-3">
          <p className="text-xs text-brand font-bold uppercase">Mes</p>
          <p className="text-2xl font-teko font-black text-white">$12.4k</p>
        </div>
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════
   COIN GRID - Grid de iconos de "monedas" / categorías
   ════════════════════════════════════════════ */
export const CoinGrid = () => (
  <div className="relative w-full h-full bg-gradient-to-br from-dark to-surface p-8 rounded-[40px] overflow-hidden border border-white/10">
    {/* Decorative big text */}
    <div className="absolute top-1/2 -translate-y-1/2 right-0 text-[12rem] font-teko font-black text-white/5 leading-none -mr-12">
      DEV
    </div>

    <div className="relative z-10 h-full flex flex-col justify-between">
      <div>
        <p className="text-xs text-brand font-bold uppercase tracking-widest mb-3">
          ✦ Tu portfolio
        </p>
        <h3 className="text-4xl md:text-5xl font-teko font-black text-white uppercase leading-[0.9] mb-6">
          Múltiples<br />fuentes
        </h3>
      </div>

      {/* Coins / Icons grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '💻', name: 'Web', val: '$8.2k', up: true },
          { icon: '📱', name: 'Mobile', val: '$3.1k', up: true },
          { icon: '🎨', name: 'Design', val: '$2.4k', up: false },
          { icon: '💡', name: 'Consult', val: '$1.8k', up: true },
          { icon: '🔧', name: 'Maint.', val: '$950', up: true },
          { icon: '📚', name: 'Course', val: '$420', up: false }
        ].map((coin, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface border border-white/10 rounded-2xl p-3 text-center hover:border-brand transition-all"
          >
            <div className="text-2xl mb-1">{coin.icon}</div>
            <p className="text-xs text-muted">{coin.name}</p>
            <p className={`text-sm font-bold ${coin.up ? 'text-brand' : 'text-orange-400'}`}>
              {coin.up ? '↑' : '↓'} {coin.val}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════
   FLOATING CHART - Tarjeta flotante con gráfico
   ════════════════════════════════════════════ */
export const FloatingChart = ({ title = "Average Rate", value = "$4,528", growth = "+45.66%", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-surface/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 shadow-2xl"
  >
    <p className="text-xs text-muted mb-1">{title}</p>
    <p className="text-2xl md:text-3xl font-teko font-black text-white mb-1">{value}</p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-brand font-bold">↑ {growth}</span>
      <svg viewBox="0 0 60 20" className="w-16 h-5">
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
          d="M 0,15 Q 15,10 30,12 T 60,5"
          fill="none"
          stroke="#B5FF00"
          strokeWidth="2"
        />
      </svg>
    </div>
  </motion.div>
);

/* ════════════════════════════════════════════
   HERO VISUAL - Visualización principal del hero
   ════════════════════════════════════════════ */
export const HeroVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Glow background */}
    <div className="absolute inset-0 bg-gradient-radial from-brand/30 via-brand/10 to-transparent rounded-full blur-3xl" />

    {/* Phone in center */}
    <div className="relative z-10">
      <PhoneMockup rotation={-8} />
    </div>

    {/* Floating cards */}
    <div className="absolute top-4 -left-4 md:-left-12 z-20">
      <FloatingChart title="Ingresos Hoy" value="$1,250" growth="+12%" delay={0.5} />
    </div>

    <div className="absolute bottom-12 -right-4 md:-right-12 z-20">
      <FloatingChart title="Proyectos" value="24" growth="+8%" delay={0.8} />
    </div>

    {/* Floating coins */}
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute top-1/2 -right-2 md:-right-16 w-16 h-16 md:w-20 md:h-20 bg-brand rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-2xl"
    >
      💰
    </motion.div>

    <motion.div
      animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      className="absolute bottom-1/4 -left-2 md:-left-16 w-12 h-12 md:w-16 md:h-16 bg-dark border-2 border-brand rounded-full flex items-center justify-center text-xl md:text-2xl shadow-2xl"
    >
      📈
    </motion.div>
  </div>
);

/* ════════════════════════════════════════════
   BIG NUMBER - Número decorativo gigante
   ════════════════════════════════════════════ */
export const BigNumber = ({ number = "01", label = "Track", description = "Registra cada movimiento" }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-surface to-dark border border-white/10 rounded-[40px] p-8 md:p-12 overflow-hidden">
    {/* Big number background */}
    <div className="absolute -top-8 -right-8 text-[18rem] font-teko font-black text-brand/10 leading-none">
      {number}
    </div>

    <div className="relative z-10 h-full flex flex-col justify-between">
      <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-3xl font-teko font-black text-dark">
        {number}
      </div>
      <div>
        <h3 className="text-4xl md:text-6xl font-teko font-black uppercase text-white leading-none mb-3">
          {label}
        </h3>
        <p className="text-sm md:text-base text-muted">{description}</p>
      </div>
    </div>
  </div>
);
