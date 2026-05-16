import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Trash2, Star, Sparkles, ArrowRight, ArrowUpRight,
  Check, Clock, DollarSign
} from 'lucide-react';
import {
  HeroVisual, DashboardMockup, StatsPattern, CoinGrid, BigNumber, FloatingChart
} from '../components/visuals/DashboardVisuals';
import {
  TransactionFormModal, DeleteConfirmModal, TransactionDetailModal, SuccessToast
} from '../components/modals/Modals';

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
    const saved = localStorage.getItem('devStats_v4');
    return saved ? JSON.parse(saved) : [];
  });

  // Modales
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
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
    localStorage.setItem('devStats_v4', JSON.stringify(transactions));
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
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleDelete = () => {
    if (selectedTx) {
      setTransactions(transactions.filter(t => t.id !== selectedTx.id));
      setShowDelete(false);
      setShowDetail(false);
      setSelectedTx(null);
    }
  };

  const handleToggleStatus = () => {
    if (selectedTx) {
      setTransactions(transactions.map(t =>
        t.id === selectedTx.id
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      ));
      setSelectedTx({ ...selectedTx, status: selectedTx.status === 'completed' ? 'pending' : 'completed' });
    }
  };

  const getCategoryInfo = (category, type) => {
    return CATEGORIES[type]?.find(c => c.value === category) || { label: category, icon: '📌', desc: '' };
  };

  const handleTypeChange = (type) => {
    setFormData({ ...formData, type, category: CATEGORIES[type][0].value });
  };

  const openDetail = (tx) => {
    setSelectedTx(tx);
    setShowDetail(true);
  };

  const openDelete = (tx) => {
    setSelectedTx(tx);
    setShowDelete(true);
  };

  return (
    <div className="w-full bg-dark min-h-screen">
      {/* ════════════════════════════════════════════════════════
          HERO SECTION - Visual Generado (sin foto)
          ════════════════════════════════════════════════════════ */}
      <section id="dashboard" className="relative w-full min-h-screen flex items-center overflow-hidden pt-24">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(181,255,0,0.15) 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, rgba(181,255,0,0.1) 0%, transparent 40%)`
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
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
          <p className="text-6xl md:text-8xl font-teko font-black text-white text-right leading-none">10K+</p>
          <p className="text-sm text-brand font-oswald uppercase tracking-widest text-right mt-2">Movimientos</p>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
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
                className="text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-teko font-black uppercase text-white leading-[0.85] mb-8"
              >
                Empowering<br />
                Your <span className="italic text-brand">Code</span><br />
                Through <span className="bg-brand text-dark px-4">Data</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl text-white/80 max-w-2xl mb-12 leading-relaxed"
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
                  className="px-10 py-5 bg-brand text-dark rounded-full font-bold text-lg md:text-xl hover:bg-brand-light hover:scale-105 transition-all flex items-center gap-3 shadow-2xl shadow-brand/30"
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

            {/* Visual generado (phone mockup + cards) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hidden lg:block h-[600px]"
            >
              <HeroVisual />
            </motion.div>
          </div>
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
          STATS SECTION - Verde lima full-width
          ════════════════════════════════════════════════════════ */}
      <section id="stats" className="w-full bg-brand py-20 md:py-32 overflow-hidden relative">
        {/* Decorative */}
        <div className="absolute top-0 left-0 text-[20rem] font-teko font-black text-dark/5 leading-none">
          $
        </div>

        <div className="px-6 md:px-16 lg:px-24 relative z-10">
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
          TURNING CODE INTO PROFIT - con DashboardMockup
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

        {/* 2 Cards Gigantes - Dashboard Mockup + Stats */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[500px] md:h-[700px]"
          >
            <DashboardMockup
              amount={stats.totalIncome || 12450}
              growth={stats.margin || 23.4}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[500px] md:h-[700px] rounded-[40px] bg-surface border border-white/10 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Big $ background */}
            <div className="absolute -bottom-20 -right-10 text-[24rem] font-teko font-black text-brand/5 leading-none">
              $
            </div>

            <div className="relative z-10">
              <DollarSign className="text-brand mb-8" size={64} />
              <p className="text-sm md:text-base font-oswald uppercase tracking-widest text-muted mb-4">
                Promedio por Proyecto
              </p>
              <p className="text-7xl md:text-9xl font-teko font-black text-white leading-none">
                ${stats.avgProject.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-2xl md:text-3xl text-brand font-teko mt-2">por venta</p>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-base md:text-lg text-muted font-oswald uppercase tracking-wider">Pendiente</span>
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
          OUR SERVICES / CATEGORÍAS
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

        {/* Servicios Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          <BigNumber number="01" label="Track" description="Registra cada movimiento de tu negocio" />
          <BigNumber number="02" label="Analyze" description="Descubre patrones y oportunidades" />
        </div>

        {/* Lista de categorías */}
        <div className="space-y-4 md:space-y-6">
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
          MARQUEE
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
          ANÁLISIS - CoinGrid + StatsPattern
          ════════════════════════════════════════════════════════ */}
      <section className="w-full py-20 md:py-32 px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <p className="inline-block bg-brand text-dark px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            ✦ Portfolio Diversificado
          </p>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-teko font-black uppercase text-white leading-[0.85] mb-8">
            Análisis <span className="text-brand italic">Multi</span><br />
            Source
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[500px] md:h-[600px]"
          >
            <CoinGrid />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[500px] md:h-[600px]"
          >
            <StatsPattern />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TRANSACCIONES - Lista funcional
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
            className="px-10 py-5 bg-brand text-dark rounded-full font-bold text-lg md:text-xl hover:bg-brand-light hover:scale-105 transition-all flex items-center gap-3 self-start lg:self-auto shadow-2xl shadow-brand/30"
          >
            <Plus size={24} />
            Agregar Movimiento
          </button>
        </motion.div>

        {/* Tabs */}
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

        {/* Lista */}
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
            {filteredTransactions.map((t, idx) => {
              const info = getCategoryInfo(t.category, t.type);
              const isIncome = t.type === 'income';
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => openDetail(t)}
                  className="bg-surface border border-white/10 rounded-[30px] p-6 md:p-8 hover:border-brand/50 transition-all group cursor-pointer"
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
                      onClick={(e) => { e.stopPropagation(); openDelete(t); }}
                      className="p-3 text-muted-2 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all shrink-0"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA FINAL
          ════════════════════════════════════════════════════════ */}
      <section className="w-full bg-brand py-20 md:py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        {/* Big decoration */}
        <div className="absolute -top-10 -right-10 text-[30rem] font-teko font-black text-dark/10 leading-none">
          ✦
        </div>

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
                className="px-12 py-6 bg-dark text-brand rounded-full font-bold text-xl md:text-2xl hover:bg-surface hover:scale-105 transition-all flex items-center gap-4 shadow-2xl"
              >
                Comenzar Ahora
                <ArrowRight size={28} />
              </button>
            </div>

            {/* Visual generado en lugar de foto */}
            <div className="h-[400px] md:h-[600px] grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <FloatingChart title="Total" value={`$${(stats.totalIncome / 1000).toFixed(1)}k`} growth={`${stats.margin}%`} delay={0.2} />
                <FloatingChart title="Proyectos" value={stats.projects.toString()} growth="+8%" delay={0.4} />
              </div>
              <div className="bg-dark rounded-[30px] p-6 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-brand font-bold uppercase tracking-widest mb-2">Trending</p>
                  <p className="text-4xl md:text-5xl font-teko font-black text-white">+45%</p>
                </div>
                <svg viewBox="0 0 100 60" className="w-full h-20">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                    d="M 0,50 Q 20,40 35,30 T 65,15 T 100,5"
                    fill="none"
                    stroke="#B5FF00"
                    strokeWidth="3"
                  />
                </svg>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-brand rounded-xl p-2 text-center">
                    <p className="text-xs text-dark/70 font-bold">Hoy</p>
                    <p className="text-lg font-teko font-black text-dark">$1.2k</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2 text-center">
                    <p className="text-xs text-white/70 font-bold">Mes</p>
                    <p className="text-lg font-teko font-black text-white">$12k</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MODALES
          ════════════════════════════════════════════════════════ */}
      <TransactionFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        categories={CATEGORIES}
        handleTypeChange={handleTypeChange}
      />

      <DeleteConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        transaction={selectedTx}
      />

      <TransactionDetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        transaction={selectedTx}
        categoryInfo={selectedTx ? getCategoryInfo(selectedTx.category, selectedTx.type) : null}
        onDelete={() => { setShowDelete(true); }}
        onToggleStatus={handleToggleStatus}
      />

      <SuccessToast isOpen={showToast} message="✓ Movimiento guardado" />
    </div>
  );
};

export default HomePage;
