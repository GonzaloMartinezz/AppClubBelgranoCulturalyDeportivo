import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, TrendingUp, TrendingDown, Star, Sparkles,
  ArrowRight, ArrowUpRight, Check, Clock, DollarSign
} from 'lucide-react';

const CATEGORIES = {
  income: [
    { value: 'web', label: 'Web Development', icon: '💻', desc: 'Sitios y apps web' },
    { value: 'design', label: 'UI/UX Design', icon: '🎨', desc: 'Diseño de interfaces' },
    { value: 'mobile', label: 'Mobile Apps', icon: '📱', desc: 'Apps móviles' },
    { value: 'consulting', label: 'Consultoría', icon: '💡', desc: 'Asesoría técnica' },
    { value: 'maintenance', label: 'Mantenimiento', icon: '🔧', desc: 'Soporte y updates' },
    { value: 'other_in', label: 'Otros Ingresos', icon: '💰', desc: 'Varios' }
  ],
  expense: [
    { value: 'hosting', label: 'Hosting / Dominios', icon: '🌐', desc: 'Servidores y dominios' },
    { value: 'software', label: 'Software / SaaS', icon: '💼', desc: 'Licencias y herramientas' },
    { value: 'hardware', label: 'Hardware', icon: '⌨️', desc: 'Equipos y dispositivos' },
    { value: 'education', label: 'Educación', icon: '📚', desc: 'Cursos y certificaciones' },
    { value: 'marketing', label: 'Marketing', icon: '📣', desc: 'Publicidad y ads' },
    { value: 'taxes', label: 'Impuestos', icon: '📋', desc: 'AFIP, monotributo' },
    { value: 'other_ex', label: 'Otros Gastos', icon: '💸', desc: 'Varios' }
  ]
};

const HomePage = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('devStats_v2');
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
    localStorage.setItem('devStats_v2', JSON.stringify(transactions));
  }, [transactions]);

  // Cálculos
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

    // Por categoría
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
      {/* ═══════════════════════════════════════════
          HERO SECTION - Estilo Creatix con Card Blanca
          ═══════════════════════════════════════════ */}
      <section id="dashboard" className="pt-24 md:pt-28 px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto bg-white rounded-[40px] md:rounded-[60px] overflow-hidden relative"
        >
          {/* Sparkles decorativo */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10">
            <Sparkles className="text-brand" size={40} fill="currentColor" />
          </div>

          {/* Stars decorativas */}
          <div className="absolute top-8 right-8 md:top-12 md:right-16 z-10 flex flex-col items-end">
            <div className="flex gap-1 mb-2">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="text-brand" size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-3xl md:text-5xl font-teko font-black text-dark">10 Years</p>
            <p className="text-xs md:text-sm text-muted-2 font-oswald uppercase tracking-wider">Experience</p>
          </div>

          <div className="px-6 md:px-16 pt-20 md:pt-24 pb-12 md:pb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-teko font-black text-dark leading-[0.95] mb-6"
                >
                  Empowering Your<br />
                  <span className="italic">Code</span><br />
                  Through <span className="bg-brand px-2">Data</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm md:text-base text-muted-2 mb-6 max-w-md"
                >
                  Del código al cliente, gestionamos cada peso. Analiza ingresos, gastos y proyectos en tiempo real. Convierte datos en decisiones.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 border-2 border-dark text-dark rounded-full font-semibold text-sm hover:bg-dark hover:text-white transition-all"
                >
                  Registrar Movimiento
                </motion.button>
              </div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative h-[400px] md:h-[500px]"
              >
                <div className="absolute inset-0 bg-gradient-radial from-brand/20 to-transparent rounded-full" />
                <div className="relative h-full w-full rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src="/3.webp"
                    alt="Dashboard Hero"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CTA Buttons Floating */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-5 py-3 bg-brand text-dark rounded-full font-bold text-sm whitespace-nowrap hover:bg-brand-light transition-all shadow-lg"
                  >
                    Start Project
                  </button>
                  <button
                    onClick={() => document.getElementById('stats').scrollIntoView({ behavior: 'smooth' })}
                    className="px-5 py-3 bg-dark text-white rounded-full font-bold text-sm whitespace-nowrap hover:bg-surface transition-all shadow-lg"
                  >
                    Ver Stats
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR - 4 Métricas
          ═══════════════════════════════════════════ */}
      <section id="stats" className="py-12 md:py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-surface border border-white/10 rounded-full px-6 md:px-12 py-6 md:py-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { value: `$${(stats.totalIncome / 1000).toFixed(1)}k`, label: 'Ingresos Total' },
              { value: stats.projects, label: 'Proyectos', suffix: '+' },
              { value: `$${(stats.balance / 1000).toFixed(1)}k`, label: 'Balance' },
              { value: `${stats.margin}%`, label: 'Margen' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center md:text-left"
              >
                <p className="text-4xl md:text-5xl font-teko font-black text-white leading-none">
                  {stat.value}<span className="text-brand">{stat.suffix}</span>
                </p>
                <p className="text-xs text-muted font-oswald uppercase tracking-wider mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          TURNING IDEAS - Sección con cards
          ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 mb-8"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-teko font-black uppercase text-white leading-[0.95] mb-4">
                Turning <span className="text-brand">Code</span><br />
                Into Profit
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-sm md:text-base text-muted leading-relaxed">
                Cada proyecto cuenta una historia. Cada gasto es una inversión. Visualiza el impacto real de tu trabajo y descubre dónde está la verdadera rentabilidad de tu negocio como desarrollador.
              </p>
            </div>
          </motion.div>

          {/* 2 cards con imagen */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 relative h-72 md:h-96 rounded-3xl overflow-hidden group"
            >
              <img src="/3.webp" alt="Workspace" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="inline-block px-4 py-2 bg-brand text-dark font-bold text-xs uppercase rounded-full">
                  Tu Estudio Digital
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-72 md:h-96 rounded-3xl overflow-hidden bg-surface border border-white/10 p-8 flex flex-col justify-between"
            >
              <div>
                <DollarSign className="text-brand mb-4" size={40} />
                <p className="text-xs font-oswald uppercase tracking-wider text-muted mb-2">Promedio por Proyecto</p>
                <p className="text-5xl font-teko font-black text-white">
                  ${stats.avgProject.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Pendiente de cobro</span>
                  <span className="text-brand font-bold">${stats.pendingAmount.toLocaleString('es-AR')}</span>
                </div>
                <div className="w-full bg-dark mt-2 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stats.totalIncome > 0 ? (stats.pendingAmount / (stats.totalIncome + stats.pendingAmount) * 100) : 0}%` }}
                    transition={{ duration: 1 }}
                    className="bg-brand h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR SERVICES / CATEGORÍAS
          ═══════════════════════════════════════════ */}
      <section id="categories" className="py-16 md:py-24 px-4 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="inline-block bg-brand text-dark px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4">
              What I Do
            </p>
            <h2 className="text-4xl md:text-6xl font-teko font-black uppercase text-white leading-[0.95] mb-4">
              Our <span className="text-brand italic">Services</span>
            </h2>
            <p className="text-sm md:text-base text-muted max-w-2xl">
              Cada categoría refleja una línea de negocio. Sigue tus ingresos por tipo de servicio y descubre dónde se concentra la rentabilidad.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Lista de categorías izquierda */}
            <div className="space-y-3">
              {CATEGORIES.income.slice(0, 4).map((cat, idx) => {
                const catStats = stats.categoryStats[cat.value];
                return (
                  <motion.div
                    key={cat.value}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-surface border border-white/10 rounded-2xl p-5 hover:border-brand transition-all cursor-pointer"
                    onClick={() => {
                      handleTypeChange('income');
                      setFormData(f => ({ ...f, category: cat.value }));
                      setShowForm(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl md:text-3xl font-teko font-black text-muted-2 group-hover:text-brand transition-colors">
                          0{idx + 1}
                        </span>
                        <div>
                          <p className="text-white font-bold text-base md:text-lg">{cat.label}</p>
                          <p className="text-xs text-muted">{cat.desc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {catStats ? (
                          <>
                            <p className="text-brand font-bold text-sm md:text-base">
                              ${catStats.total.toLocaleString('es-AR')}
                            </p>
                            <p className="text-xs text-muted">{catStats.count} proyectos</p>
                          </>
                        ) : (
                          <ArrowRight className="text-muted group-hover:text-brand transition-colors" size={20} />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Card derecha con imagen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-rows-2 gap-4"
            >
              <div className="relative rounded-3xl overflow-hidden bg-surface group">
                <img src="/3.webp" alt="Work" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent flex flex-col justify-end p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand mb-1">¿Qué hace falta?</p>
                  <p className="text-white text-sm md:text-base font-semibold leading-tight">
                    Registra tus servicios para ver el análisis
                  </p>
                </div>
              </div>

              <div className="bg-brand rounded-3xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-dark text-xs font-bold uppercase tracking-wider mb-1">Sumar Ingreso</p>
                  <p className="text-dark text-xl md:text-2xl font-teko font-black leading-tight">
                    Registra un<br />nuevo proyecto
                  </p>
                </div>
                <button
                  onClick={() => { handleTypeChange('income'); setShowForm(true); }}
                  className="w-12 h-12 md:w-14 md:h-14 bg-dark rounded-full flex items-center justify-center hover:scale-110 transition-transform shrink-0"
                >
                  <ArrowUpRight className="text-brand" size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE BANNER
          ═══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="flex marquee-scroll">
            {Array(2).fill(null).map((_, i) => (
              <div key={i} className="flex items-center gap-6 px-6 shrink-0">
                {['Track', 'Analyze', 'Grow', 'Profit', 'Code', 'Bill', 'Save', 'Invest'].map((word) => (
                  <div key={`${i}-${word}`} className="flex items-center gap-6 shrink-0">
                    <span className="text-4xl md:text-7xl font-teko font-black text-white">
                      {word}
                    </span>
                    <Sparkles className="text-brand" size={32} fill="currentColor" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRANSACCIONES - Lista funcional
          ═══════════════════════════════════════════ */}
      <section id="transactions" className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
          >
            <div>
              <p className="inline-block bg-brand text-dark px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4">
                Histórico
              </p>
              <h2 className="text-4xl md:text-6xl font-teko font-black uppercase text-white leading-[0.95]">
                Tus <span className="text-brand italic">Movimientos</span>
              </h2>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-brand text-dark rounded-full font-bold text-sm hover:bg-brand-light transition-all flex items-center gap-2 self-start md:self-auto"
            >
              <Plus size={18} />
              Agregar
            </button>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'Todas', count: transactions.length },
              { id: 'income', label: 'Ingresos', count: transactions.filter(t => t.type === 'income').length },
              { id: 'expense', label: 'Gastos', count: transactions.filter(t => t.type === 'expense').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-brand text-dark'
                    : 'bg-surface text-muted hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-dark/20 text-dark' : 'bg-white/10 text-white'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Transactions Grid */}
          {filteredTransactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-surface border border-white/10 rounded-3xl p-12 text-center"
            >
              <Sparkles className="text-brand mx-auto mb-4" size={48} fill="currentColor" />
              <p className="text-white text-xl font-teko mb-2">No hay movimientos aún</p>
              <p className="text-muted text-sm mb-6">Empieza registrando tu primer ingreso o gasto</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-brand text-dark rounded-full font-bold text-sm hover:bg-brand-light transition-all"
              >
                Crear Primer Movimiento
              </button>
            </motion.div>
          ) : (
            <div className="space-y-3">
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
                      className="bg-surface border border-white/10 rounded-2xl p-5 hover:border-brand/50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0 ${
                          isIncome ? 'bg-brand/20' : 'bg-orange-500/20'
                        }`}>
                          {info.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold truncate text-sm md:text-base">{t.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                            <span className="text-muted">{info.label}</span>
                            <span className="text-muted-2 hidden sm:inline">•</span>
                            <span className="text-muted hidden sm:inline">
                              {new Date(t.date).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] flex items-center gap-1 ${
                              t.status === 'completed'
                                ? 'bg-brand/20 text-brand'
                                : 'bg-orange-500/20 text-orange-400'
                            }`}>
                              {t.status === 'completed' ? <Check size={10} /> : <Clock size={10} />}
                              {t.status === 'completed' ? 'Cobrado' : 'Pendiente'}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className={`text-xl md:text-2xl font-teko font-black ${
                            isIncome ? 'text-brand' : 'text-orange-400'
                          }`}>
                            {isIncome ? '+' : '-'}${t.amount.toLocaleString('es-AR')}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-2 text-muted-2 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA FINAL - Estilo Get in Touch
          ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-brand rounded-[40px] md:rounded-[60px] overflow-hidden relative"
        >
          <div className="px-6 md:px-16 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-teko font-black uppercase text-dark leading-[0.95] mb-4">
                  Listo para<br />
                  <span className="italic">analizar</span> tu<br />
                  negocio?
                </h2>
                <p className="text-sm md:text-base text-dark/70 mb-6">
                  Empieza a tomar el control. Registra tu primer movimiento y descubre la salud real de tu negocio.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-4 bg-dark text-brand rounded-full font-bold hover:bg-surface transition-all flex items-center gap-2"
                >
                  Comenzar Ahora
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden">
                <img src="/3.webp" alt="Get Started" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          MODAL FORMULARIO
          ═══════════════════════════════════════════ */}
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
              className="bg-white rounded-[40px] max-w-2xl w-full p-6 md:p-10 my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <Sparkles className="text-brand mb-2" size={32} fill="currentColor" />
                  <h2 className="text-3xl md:text-4xl font-teko font-black uppercase text-dark leading-none">
                    Nuevo<br />
                    <span className="italic">Movimiento</span>
                  </h2>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="text-dark" size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Tipo */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('income')}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-bold text-sm ${
                      formData.type === 'income'
                        ? 'bg-brand border-brand text-dark'
                        : 'bg-white border-gray-200 text-muted-2 hover:border-dark'
                    }`}
                  >
                    <TrendingUp size={18} />
                    Ingreso
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('expense')}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-bold text-sm ${
                      formData.type === 'expense'
                        ? 'bg-dark border-dark text-white'
                        : 'bg-white border-gray-200 text-muted-2 hover:border-dark'
                    }`}
                  >
                    <TrendingDown size={18} />
                    Gasto
                  </button>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-2 mb-2">
                    Descripción
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={formData.type === 'income' ? 'Ej: Landing Page para Cliente X' : 'Ej: Hosting Anual'}
                    className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-2xl text-dark placeholder:text-gray-400 focus:outline-none focus:border-brand transition-all"
                    required
                    autoFocus
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-2 mb-2">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-2xl text-dark focus:outline-none focus:border-brand transition-all"
                  >
                    {CATEGORIES[formData.type].map(c => (
                      <option key={c.value} value={c.value}>
                        {c.icon} {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Monto y Fecha */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-2 mb-2">
                      Monto ($)
                    </label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0"
                      step="0.01"
                      min="0"
                      className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-2xl text-dark placeholder:text-gray-400 focus:outline-none focus:border-brand transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-2 mb-2">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-2xl text-dark focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-2 mb-2">
                    Estado
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: 'completed' })}
                      className={`p-3 rounded-2xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-2 ${
                        formData.status === 'completed'
                          ? 'bg-brand border-brand text-dark'
                          : 'bg-white border-gray-200 text-muted-2'
                      }`}
                    >
                      <Check size={16} /> Confirmado
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: 'pending' })}
                      className={`p-3 rounded-2xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-2 ${
                        formData.status === 'pending'
                          ? 'bg-orange-100 border-orange-400 text-orange-600'
                          : 'bg-white border-gray-200 text-muted-2'
                      }`}
                    >
                      <Clock size={16} /> Pendiente
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-dark text-brand rounded-full font-bold hover:bg-surface transition-all"
                  >
                    Guardar Movimiento
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-4 bg-gray-100 text-dark rounded-full font-bold hover:bg-gray-200 transition-all"
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
