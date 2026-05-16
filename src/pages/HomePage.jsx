import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, TrendingUp, TrendingDown, Star, Sparkles,
  ArrowRight, ArrowUpRight, Check, Clock, DollarSign, X
} from 'lucide-react';

const CATEGORIES = {
  income: [
    { value: 'web', label: 'Web Development', icon: '💻', desc: 'Sitios y apps web' },
    { value: 'design', label: 'UI/UX Design', icon: '🎨', desc: 'Diseño de interfaces' },
    { value: 'mobile', label: 'Mobile Apps', icon: '📱', desc: 'Apps móviles' },
    { value: 'consulting', label: 'Consultoría', icon: '💡', desc: 'Asesoría técnica' },
    { value: 'maintenance', label: 'Mantenimiento', icon: '🔧', desc: 'Soporte y updates' },
    { value: 'other_in', label: 'Otros', icon: '💰', desc: 'Varios' }
  ],
  expense: [
    { value: 'hosting', label: 'Hosting / Dominios', icon: '🌐', desc: 'Servidores y dominios' },
    { value: 'software', label: 'Software / SaaS', icon: '💼', desc: 'Licencias y herramientas' },
    { value: 'hardware', label: 'Hardware', icon: '⌨️', desc: 'Equipos y dispositivos' },
    { value: 'education', label: 'Educación', icon: '📚', desc: 'Cursos y certificaciones' },
    { value: 'marketing', label: 'Marketing', icon: '📣', desc: 'Publicidad y ads' },
    { value: 'taxes', label: 'Impuestos', icon: '📋', desc: 'AFIP, monotributo' },
    { value: 'other_ex', label: 'Otros', icon: '💸', desc: 'Varios' }
  ]
};

const HomePage = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('devStats_v3');
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({
    type: 'income',
    description: '',
    category: 'web',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'completed'
  });

  useEffect(() => {
    localStorage.setItem('devStats_v3', JSON.stringify(transactions));
  }, [transactions]);

  const stats = useMemo(() => {
    const completed = transactions.filter(t => t.status === 'completed');
    const totalIncome = completed.filter(t => t.type === 'income')
      .reduce((s, t) => s + parseFloat(t.amount || 0), 0);
    const totalExpense = completed.filter(t => t.type === 'expense')
      .reduce((s, t) => s + parseFloat(t.amount || 0), 0);
    const balance = totalIncome - totalExpense;
    const projects = completed.filter(t => t.type === 'income').length;
    const pending = transactions.filter(t => t.status === 'pending');
    const pendingAmount = pending.reduce((s, t) => s + parseFloat(t.amount || 0), 0);

    const categoryStats = {};
    completed.forEach(t => {
      if (!categoryStats[t.category]) {
        categoryStats[t.category] = { total: 0, count: 0, type: t.type };
      }
      categoryStats[t.category].total += parseFloat(t.amount || 0);
      categoryStats[t.category].count += 1;
    });

    return {
      totalIncome, totalExpense, balance, projects,
      pendingCount: pending.length, pendingAmount,
      categoryStats,
      avgProject: projects > 0 ? totalIncome / projects : 0,
      margin: totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(0) : 0
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => activeTab === 'all' || t.type === activeTab)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, activeTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
    setTransactions([
      { id: Date.now(), ...formData, amount: parseFloat(formData.amount) },
      ...transactions
    ]);
    setFormData({
      type: 'income', description: '', category: 'web',
      amount: '', date: new Date().toISOString().split('T')[0], status: 'completed'
    });
    setShowForm(false);
  };

  const handleDelete = (id) => setTransactions(transactions.filter(t => t.id !== id));

  const getCategoryInfo = (category, type) => {
    return CATEGORIES[type]?.find(c => c.value === category) || { label: category, icon: '📌', desc: '' };
  };

  const handleTypeChange = (type) => {
    setFormData({ ...formData, type, category: CATEGORIES[type][0].value });
  };

  return (
    <div className="w-full bg-dark min-h-screen">
      {/* ════════════════════════════════════════════════════════
          HERO SECTION - FULL WIDTH 100vh
          ════════════════════════════════════════════════════════ */}
      <section id="dashboard" className="relative w-full min-h-screen flex items-center overflow-hidden pt-24">
        {/* Background image full */}
        <div className="absolute inset-0 z-0">
          <img
            src="/3.webp"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
        </div>

        {/* Floating sparkles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-32 left-12 md:left-24 z-10"
        >
          <Sparkles className="text-brand" size={60} fill="currentColor" />
        </motion.div>

        {/* Stars top right */}
        <div className="absolute top-32 right-8 md:right-24 z-10 hidden md:block">
          <div className="flex gap-1 mb-3 justify-end">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="text-brand" size={20} fill="currentColor" />
            ))}
          </div>
          <p className="text-6xl md:text-8xl font-teko font-black text-white text-right leading-none">10 Years</p>
          <p className="text-sm text-brand font-oswald uppercase tracking-widest text-right mt-2">Experience</p>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block bg-brand text-dark px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-8"
            >
              ✦ Dashboard Financiero
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] xl:text-[12rem] font-teko font-black uppercase text-white leading-[0.85] mb-8"
            >
              Empowering<br />
              Your <span className="italic text-brand">Code</span><br />
              Through <span className="bg-brand text-dark px-4">Data</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl mb-12 leading-relaxed"
            >
              Del código al cliente, gestionamos cada peso. Analiza ingresos, gastos y proyectos en tiempo real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setShowForm(true)}
                className="px-10 py-5 bg-brand text-dark rounded-full font-bold text-lg md:text-xl hover:bg-brand-light hover:scale-105 transition-all flex items-center gap-3 shadow-2xl"
              >
                <Plus size={24} />
                Nuevo Movimiento
              </button>
              <button
                onClick={() => document.getElementById('stats').scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full font-bold text-lg md:text-xl hover:bg-white/20 transition-all flex items-center gap-3"
              >
                Ver Análisis
                <ArrowRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-brand rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STATS SECTION - FULL WIDTH GIGANTE
          ════════════════════════════════════════════════════════ */}
      <section id="stats" className="w-full bg-brand py-20 md:py-32 overflow-hidden">
        <div className="px-6 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: `$${(stats.totalIncome / 1000).toFixed(1)}k`, label: 'Ingresos Totales' },
              { value: stats.projects, label: 'Proyectos', suffix: '+' },
              { value: `$${(stats.balance / 1000).toFixed(1)}k`, label: 'Balance Neto' },
              { value: `${stats.margin}%`, label: 'Margen' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center md:text-left"
              >
                <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-teko font-black text-dark leading-none mb-3">
                  {stat.value}<span className="text-dark/30">{stat.suffix}</span>
                </p>
                <p className="text-base md:text-xl text-dark/70 font-oswald uppercase tracking-widest font-bold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TURNING CODE INTO PROFIT - FULL WIDTH
          ════════════════════════════════════════════════════════ */}
      <section className="w-full py-20 md:py-32 px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <p className="inline-block bg-brand text-dark px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            ✦ Análisis Profundo
          </p>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-teko font-black uppercase text-white leading-[0.85] mb-8">
            Turning <span className="text-brand italic">Code</span><br />
            Into <span className="bg-brand text-dark px-4">Profit</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed">
            Cada proyecto cuenta una historia. Cada gasto es una inversión. Visualiza el impacto real de tu trabajo.
          </p>
        </motion.div>

        {/* 2 Cards Gigantes */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Card 1 - Imagen grande */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] md:h-[700px] rounded-[40px] overflow-hidden group"
          >
            <img src="/3.webp" alt="Workspace" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span className="inline-block px-5 py-2 bg-brand text-dark font-bold text-sm uppercase rounded-full mb-4">
                Tu Estudio Digital
              </span>
              <h3 className="text-4xl md:text-6xl font-teko font-black text-white uppercase leading-tight">
                Donde la magia<br />sucede
              </h3>
            </div>
          </motion.div>

          {/* Card 2 - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[500px] md:h-[700px] rounded-[40px] bg-surface border border-white/10 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <DollarSign className="text-brand mb-8" size={64} />
              <p className="text-sm md:text-base font-oswald uppercase tracking-widest text-muted mb-4">
                Promedio por Proyecto
              </p>
              <p className="text-7xl md:text-9xl font-teko font-black text-white leading-none">
                ${stats.avgProject.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-2xl md:text-3xl text-brand font-teko mt-2">por venta</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-base md:text-lg text-muted font-oswald uppercase tracking-wider">Pendiente de cobro</span>
                <span className="text-2xl md:text-3xl text-brand font-teko font-black">
                  ${stats.pendingAmount.toLocaleString('es-AR')}
                </span>
              </div>
              <div className="w-full bg-dark rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stats.totalIncome > 0 ? (stats.pendingAmount / (stats.totalIncome + stats.pendingAmount) * 100) : 0}%` }}
                  transition={{ duration: 1.2 }}
                  className="bg-brand h-3 rounded-full"
                />
              </div>
              <p className="text-sm text-muted mt-3">{stats.pendingCount} movimientos pendientes</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          OUR SERVICES - FULL WIDTH GIGANTE
          ════════════════════════════════════════════════════════ */}
      <section id="categories" className="w-full bg-surface py-20 md:py-32 px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <p className="inline-block bg-brand text-dark px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            ✦ What I Do
          </p>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-teko font-black uppercase text-white leading-[0.85] mb-8">
            Our <span className="text-brand italic">Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed">
            Sigue tus ingresos por tipo de servicio y descubre dónde se concentra tu rentabilidad.
          </p>
        </motion.div>

        {/* Lista grande de categorías */}
        <div className="space-y-6 md:space-y-8">
          {CATEGORIES.income.map((cat, idx) => {
            const catStats = stats.categoryStats[cat.value];
            return (
              <motion.div
                key={cat.value}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                onClick={() => {
                  handleTypeChange('income');
                  setFormData(f => ({ ...f, category: cat.value }));
                  setShowForm(true);
                }}
                className="group bg-dark border border-white/10 hover:border-brand rounded-[30px] md:rounded-[40px] p-8 md:p-12 cursor-pointer transition-all hover:bg-brand"
              >
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="text-5xl md:text-8xl font-teko font-black text-muted-2 group-hover:text-dark transition-colors">
                      0{idx + 1}
                    </span>
                    <div>
                      <p className="text-3xl md:text-6xl font-teko font-black text-white group-hover:text-dark uppercase leading-none mb-2 transition-colors">
                        {cat.label}
                      </p>
                      <p className="text-sm md:text-lg text-muted group-hover:text-dark/70 transition-colors">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-6">
                    {catStats ? (
                      <div>
                        <p className="text-4xl md:text-6xl font-teko font-black text-brand group-hover:text-dark transition-colors leading-none">
                          ${(catStats.total / 1000).toFixed(1)}k
                        </p>
                        <p className="text-sm text-muted group-hover:text-dark/70 transition-colors mt-1">
                          {catStats.count} proyectos
                        </p>
                      </div>
                    ) : (
                      <p className="text-base md:text-xl text-muted group-hover:text-dark/70 transition-colors font-bold uppercase tracking-wider">
                        Sin datos
                      </p>
                    )}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand group-hover:bg-dark flex items-center justify-center transition-all group-hover:scale-110">
                      <ArrowUpRight className="text-dark group-hover:text-brand transition-colors" size={32} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MARQUEE BANNER - GIGANTE
          ════════════════════════════════════════════════════════ */}
      <section className="w-full py-16 md:py-24 overflow-hidden border-y border-white/10">
        <div className="flex whitespace-nowrap">
          <div className="flex marquee-scroll">
            {Array(2).fill(null).map((_, i) => (
              <div key={i} className="flex items-center gap-10 px-10 shrink-0">
                {['Track', 'Analyze', 'Grow', 'Profit', 'Code', 'Bill', 'Save', 'Invest'].map((word) => (
                  <div key={`${i}-${word}`} className="flex items-center gap-10 shrink-0">
                    <span className="text-7xl md:text-9xl lg:text-[12rem] font-teko font-black text-white leading-none">
                      {word}
                    </span>
                    <Sparkles className="text-brand" size={48} fill="currentColor" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TRANSACCIONES - FULL WIDTH
          ════════════════════════════════════════════════════════ */}
      <section id="transactions" className="w-full py-20 md:py-32 px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 md:mb-20"
        >
          <div>
            <p className="inline-block bg-brand text-dark px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              ✦ Histórico
            </p>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-teko font-black uppercase text-white leading-[0.85]">
              Tus <span className="text-brand italic">Movimientos</span>
            </h2>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="px-10 py-5 bg-brand text-dark rounded-full font-bold text-lg md:text-xl hover:bg-brand-light hover:scale-105 transition-all flex items-center gap-3 self-start lg:self-auto"
          >
            <Plus size={24} />
            Agregar Movimiento
          </button>
        </motion.div>

        {/* Tabs grandes */}
        <div className="flex gap-3 md:gap-4 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Todas', count: transactions.length },
            { id: 'income', label: 'Ingresos', count: transactions.filter(t => t.type === 'income').length },
            { id: 'expense', label: 'Gastos', count: transactions.filter(t => t.type === 'expense').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-full font-bold text-base md:text-lg whitespace-nowrap transition-all flex items-center gap-3 ${
                activeTab === tab.id
                  ? 'bg-brand text-dark'
                  : 'bg-surface text-muted hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
              <span className={`text-sm px-3 py-1 rounded-full ${
                activeTab === tab.id ? 'bg-dark/20 text-dark' : 'bg-white/10 text-white'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Lista de transacciones grandes */}
        {filteredTransactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface border border-white/10 rounded-[40px] p-16 md:p-24 text-center"
          >
            <Sparkles className="text-brand mx-auto mb-6" size={80} fill="currentColor" />
            <p className="text-white text-3xl md:text-5xl font-teko font-black mb-4">No hay movimientos aún</p>
            <p className="text-muted text-lg md:text-xl mb-10">Empieza registrando tu primer ingreso o gasto</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-10 py-5 bg-brand text-dark rounded-full font-bold text-lg hover:bg-brand-light hover:scale-105 transition-all"
            >
              Crear Primer Movimiento
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            <AnimatePresence>
              {filteredTransactions.map((t, idx) => {
                const info = getCategoryInfo(t.category, t.type);
                const isIncome = t.type === 'income';
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.03 }}
                    className="bg-surface border border-white/10 rounded-[30px] p-6 md:p-8 hover:border-brand/50 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl md:text-5xl shrink-0 ${
                        isIncome ? 'bg-brand/20' : 'bg-orange-500/20'
                      }`}>
                        {info.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold truncate text-xl md:text-2xl mb-2">{t.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                          <span className="text-muted">{info.label}</span>
                          <span className="text-muted-2 hidden sm:inline">•</span>
                          <span className="text-muted hidden sm:inline">
                            {new Date(t.date).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                          <span className={`px-3 py-1 rounded-full font-bold uppercase text-xs flex items-center gap-1 ${
                            t.status === 'completed'
                              ? 'bg-brand/20 text-brand'
                              : 'bg-orange-500/20 text-orange-400'
                          }`}>
                            {t.status === 'completed' ? <Check size={12} /> : <Clock size={12} />}
                            {t.status === 'completed' ? 'Cobrado' : 'Pendiente'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className={`text-3xl md:text-5xl font-teko font-black ${
                          isIncome ? 'text-brand' : 'text-orange-400'
                        }`}>
                          {isIncome ? '+' : '-'}${t.amount.toLocaleString('es-AR')}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-3 text-muted-2 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all shrink-0"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA FINAL - FULL WIDTH VERDE GIGANTE
          ════════════════════════════════════════════════════════ */}
      <section className="w-full bg-brand py-20 md:py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="inline-block bg-dark text-brand px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
                ✦ Listo para comenzar
              </p>
              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-teko font-black uppercase text-dark leading-[0.85] mb-10">
                Tu Negocio,<br />
                <span className="italic">Bajo</span><br />
                <span className="underline decoration-8 underline-offset-8">Control</span>
              </h2>
              <p className="text-xl md:text-2xl text-dark/80 mb-10 max-w-2xl">
                Empieza a tomar el control. Registra tu primer movimiento y descubre la salud real de tu negocio.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-12 py-6 bg-dark text-brand rounded-full font-bold text-xl md:text-2xl hover:bg-surface hover:scale-105 transition-all flex items-center gap-4"
              >
                Comenzar Ahora
                <ArrowRight size={28} />
              </button>
            </div>

            <div className="relative h-[400px] md:h-[600px] rounded-[40px] overflow-hidden">
              <img src="/3.webp" alt="Start" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MODAL FORMULARIO
          ════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[40px] max-w-3xl w-full p-8 md:p-12 my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <Sparkles className="text-brand mb-3" size={48} fill="currentColor" />
                  <h2 className="text-5xl md:text-7xl font-teko font-black uppercase text-dark leading-none">
                    Nuevo<br />
                    <span className="italic">Movimiento</span>
                  </h2>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="text-dark" size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('income')}
                    className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-center gap-3 font-bold text-lg ${
                      formData.type === 'income'
                        ? 'bg-brand border-brand text-dark'
                        : 'bg-white border-gray-200 text-muted-2 hover:border-dark'
                    }`}
                  >
                    <TrendingUp size={24} />
                    Ingreso
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('expense')}
                    className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-center gap-3 font-bold text-lg ${
                      formData.type === 'expense'
                        ? 'bg-dark border-dark text-white'
                        : 'bg-white border-gray-200 text-muted-2 hover:border-dark'
                    }`}
                  >
                    <TrendingDown size={24} />
                    Gasto
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-muted-2 mb-3">
                    Descripción
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={formData.type === 'income' ? 'Ej: Landing Page Cliente X' : 'Ej: Hosting Anual'}
                    className="w-full bg-gray-50 border-2 border-gray-200 px-6 py-4 rounded-2xl text-dark text-lg placeholder:text-gray-400 focus:outline-none focus:border-brand transition-all"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-muted-2 mb-3">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-gray-200 px-6 py-4 rounded-2xl text-dark text-lg focus:outline-none focus:border-brand transition-all"
                  >
                    {CATEGORIES[formData.type].map(c => (
                      <option key={c.value} value={c.value}>
                        {c.icon} {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-muted-2 mb-3">
                      Monto ($)
                    </label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0"
                      step="0.01"
                      min="0"
                      className="w-full bg-gray-50 border-2 border-gray-200 px-6 py-4 rounded-2xl text-dark text-lg placeholder:text-gray-400 focus:outline-none focus:border-brand transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-muted-2 mb-3">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-gray-200 px-6 py-4 rounded-2xl text-dark text-lg focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-muted-2 mb-3">
                    Estado
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: 'completed' })}
                      className={`p-4 rounded-2xl border-2 transition-all font-bold text-base flex items-center justify-center gap-2 ${
                        formData.status === 'completed'
                          ? 'bg-brand border-brand text-dark'
                          : 'bg-white border-gray-200 text-muted-2'
                      }`}
                    >
                      <Check size={18} /> Confirmado
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: 'pending' })}
                      className={`p-4 rounded-2xl border-2 transition-all font-bold text-base flex items-center justify-center gap-2 ${
                        formData.status === 'pending'
                          ? 'bg-orange-100 border-orange-400 text-orange-600'
                          : 'bg-white border-gray-200 text-muted-2'
                      }`}
                    >
                      <Clock size={18} /> Pendiente
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-5 bg-dark text-brand rounded-full font-bold text-lg hover:bg-surface transition-all"
                  >
                    Guardar Movimiento
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-5 bg-gray-100 text-dark rounded-full font-bold text-lg hover:bg-gray-200 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
