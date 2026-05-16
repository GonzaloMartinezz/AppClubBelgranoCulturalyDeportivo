import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, TrendingUp, TrendingDown, DollarSign,
  Calendar, Briefcase, ShoppingCart, ArrowUpRight, ArrowDownRight,
  Filter, Search
} from 'lucide-react';

const CATEGORIES = {
  income: [
    { value: 'app', label: 'App / Website', icon: '💻' },
    { value: 'mantenimiento', label: 'Mantenimiento', icon: '🔧' },
    { value: 'consultoria', label: 'Consultoría', icon: '💡' },
    { value: 'curso', label: 'Cursos / Mentorías', icon: '🎓' },
    { value: 'otro_ingreso', label: 'Otros Ingresos', icon: '💰' }
  ],
  expense: [
    { value: 'hosting', label: 'Hosting / Dominios', icon: '🌐' },
    { value: 'software', label: 'Software / Suscripciones', icon: '💼' },
    { value: 'hardware', label: 'Hardware / Equipos', icon: '⌨️' },
    { value: 'educacion', label: 'Educación / Cursos', icon: '📚' },
    { value: 'marketing', label: 'Marketing / Publicidad', icon: '📣' },
    { value: 'impuestos', label: 'Impuestos / AFIP', icon: '📋' },
    { value: 'otro_gasto', label: 'Otros Gastos', icon: '💸' }
  ]
};

const HomePage = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('devFinances');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    type: 'income',
    description: '',
    category: 'app',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'completed'
  });

  useEffect(() => {
    localStorage.setItem('devFinances', JSON.stringify(transactions));
  }, [transactions]);

  // Análisis y estadísticas
  const stats = useMemo(() => {
    const completed = transactions.filter(t => t.status === 'completed');
    const totalIncome = completed
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    const totalExpense = completed
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    const balance = totalIncome - totalExpense;
    const profit = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

    // Análisis por categoría
    const expensesByCategory = {};
    completed.filter(t => t.type === 'expense').forEach(t => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + parseFloat(t.amount || 0);
    });

    const incomeByCategory = {};
    completed.filter(t => t.type === 'income').forEach(t => {
      incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + parseFloat(t.amount || 0);
    });

    // Evolución mensual
    const monthlyData = {};
    completed.forEach(t => {
      const month = new Date(t.date).toLocaleDateString('es-AR', { month: 'short', year: '2-digit' });
      if (!monthlyData[month]) monthlyData[month] = { income: 0, expense: 0 };
      if (t.type === 'income') monthlyData[month].income += parseFloat(t.amount || 0);
      else monthlyData[month].expense += parseFloat(t.amount || 0);
    });

    return {
      totalIncome,
      totalExpense,
      balance,
      profit,
      pendingCount: transactions.filter(t => t.status === 'pending').length,
      pendingAmount: transactions.filter(t => t.status === 'pending')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0),
      projectCount: completed.filter(t => t.type === 'income').length,
      expensesByCategory,
      incomeByCategory,
      monthlyData: Object.entries(monthlyData),
      avgProject: completed.filter(t => t.type === 'income').length > 0
        ? totalIncome / completed.filter(t => t.type === 'income').length
        : 0
    };
  }, [transactions]);

  // Filtrar transacciones
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => activeTab === 'all' || t.type === activeTab)
      .filter(t => filterCategory === 'all' || t.category === filterCategory)
      .filter(t => !searchQuery || t.description.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, activeTab, filterCategory, searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount)
      }
    ]);

    setFormData({
      type: 'income',
      description: '',
      category: 'app',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleTypeChange = (type) => {
    const defaultCategory = CATEGORIES[type][0].value;
    setFormData({ ...formData, type, category: defaultCategory });
  };

  const getCategoryInfo = (category, type) => {
    return CATEGORIES[type]?.find(c => c.value === category) || { label: category, icon: '📌' };
  };

  // Cálculos para gráfico
  const maxMonthly = Math.max(
    ...stats.monthlyData.flatMap(([_, v]) => [v.income, v.expense]),
    1
  );

  return (
    <div className="w-full bg-dark min-h-screen pt-20 md:pt-24">
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] md:h-[450px] overflow-hidden"
      >
        <img src="/3.webp" alt="Dashboard" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/40" />

        <div className="absolute inset-0 flex items-center">
          <div className="app-container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-brand font-oswald uppercase tracking-widest text-sm mb-4">
                Dashboard Financiero
              </p>
              <h1 className="text-5xl md:text-7xl font-teko font-black uppercase text-white leading-none mb-4">
                Tu Negocio<br />
                <span className="text-brand">Bajo Control</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
                Gestiona ingresos, gastos y estadísticas de tu emprendimiento como programador en un solo lugar
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="px-8 py-4 bg-brand text-white font-oswald uppercase font-bold tracking-wider rounded-lg shadow-xl hover:shadow-brand/40 transition-all flex items-center gap-3"
              >
                <Plus size={22} />
                Nueva Transacción
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* KPIs PRINCIPALES */}
      <section className="py-12 md:py-16 -mt-20 relative z-10">
        <div className="app-container max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* BALANCE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-6 rounded-2xl shadow-2xl ${
                stats.balance >= 0
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-700'
                  : 'bg-gradient-to-br from-red-500 to-red-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <DollarSign className="text-white/80" size={28} />
                {stats.balance >= 0 ? (
                  <ArrowUpRight className="text-white/80" size={20} />
                ) : (
                  <ArrowDownRight className="text-white/80" size={20} />
                )}
              </div>
              <p className="text-white/80 text-xs font-oswald uppercase tracking-wider mb-1">Balance</p>
              <p className="text-3xl md:text-4xl font-teko font-black text-white leading-none">
                ${stats.balance.toLocaleString('es-AR')}
              </p>
              <p className="text-xs text-white/70 mt-2">{stats.profit}% margen</p>
            </motion.div>

            {/* INGRESOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-500 to-blue-700"
            >
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="text-white/80" size={28} />
                <ArrowUpRight className="text-white/80" size={20} />
              </div>
              <p className="text-white/80 text-xs font-oswald uppercase tracking-wider mb-1">Ingresos</p>
              <p className="text-3xl md:text-4xl font-teko font-black text-white leading-none">
                ${stats.totalIncome.toLocaleString('es-AR')}
              </p>
              <p className="text-xs text-white/70 mt-2">{stats.projectCount} proyectos</p>
            </motion.div>

            {/* GASTOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-orange-500 to-red-600"
            >
              <div className="flex items-center justify-between mb-3">
                <TrendingDown className="text-white/80" size={28} />
                <ArrowDownRight className="text-white/80" size={20} />
              </div>
              <p className="text-white/80 text-xs font-oswald uppercase tracking-wider mb-1">Gastos</p>
              <p className="text-3xl md:text-4xl font-teko font-black text-white leading-none">
                ${stats.totalExpense.toLocaleString('es-AR')}
              </p>
              <p className="text-xs text-white/70 mt-2">Total gastado</p>
            </motion.div>

            {/* PENDIENTE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-purple-500 to-purple-700"
            >
              <div className="flex items-center justify-between mb-3">
                <Calendar className="text-white/80" size={28} />
                <span className="text-white/80 text-sm">{stats.pendingCount}</span>
              </div>
              <p className="text-white/80 text-xs font-oswald uppercase tracking-wider mb-1">Pendiente</p>
              <p className="text-3xl md:text-4xl font-teko font-black text-white leading-none">
                ${stats.pendingAmount.toLocaleString('es-AR')}
              </p>
              <p className="text-xs text-white/70 mt-2">Por cobrar</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GRÁFICO MENSUAL */}
      {stats.monthlyData.length > 0 && (
        <section className="py-12 md:py-16 bg-surface">
          <div className="app-container max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-brand font-oswald uppercase tracking-wider text-xs mb-2">Análisis</p>
                <h2 className="text-3xl md:text-4xl font-teko font-black uppercase text-white">
                  Evolución Mensual
                </h2>
              </div>
              <div className="hidden md:flex gap-4 text-sm">
                <span className="flex items-center gap-2 text-white/70">
                  <span className="w-3 h-3 rounded bg-blue-500"></span> Ingresos
                </span>
                <span className="flex items-center gap-2 text-white/70">
                  <span className="w-3 h-3 rounded bg-orange-500"></span> Gastos
                </span>
              </div>
            </div>

            <div className="bg-dark p-6 md:p-8 rounded-2xl border border-white/10 overflow-x-auto">
              <div className="flex gap-4 md:gap-8 min-h-[280px] items-end pb-12 relative">
                {stats.monthlyData.map(([month, values], idx) => {
                  const incomeHeight = (values.income / maxMonthly) * 200;
                  const expenseHeight = (values.expense / maxMonthly) * 200;
                  return (
                    <motion.div
                      key={month}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex-1 min-w-[60px] flex flex-col items-center"
                    >
                      <div className="flex gap-1 items-end w-full justify-center mb-3">
                        <div className="relative flex-1 max-w-[24px]">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: incomeHeight }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="bg-gradient-to-t from-blue-700 to-blue-400 rounded-t-md w-full"
                            style={{ height: incomeHeight }}
                          />
                        </div>
                        <div className="relative flex-1 max-w-[24px]">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: expenseHeight }}
                            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                            className="bg-gradient-to-t from-red-700 to-orange-400 rounded-t-md w-full"
                            style={{ height: expenseHeight }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-white/60 font-oswald uppercase tracking-wider text-center">
                        {month}
                      </p>
                      <p className="text-xs text-emerald-400 font-bold mt-1">
                        ${((values.income - values.expense) / 1000).toFixed(1)}k
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ANÁLISIS POR CATEGORÍA */}
      <section className="py-12 md:py-16 bg-dark">
        <div className="app-container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* INGRESOS POR CATEGORÍA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 p-8 border border-blue-700/30"
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                <img src="/4.webp" alt="" className="w-full h-full object-cover rounded-bl-3xl" />
              </div>
              <div className="relative z-10">
                <p className="text-blue-300 font-oswald uppercase tracking-wider text-xs mb-2">
                  Top Ingresos
                </p>
                <h3 className="text-3xl font-teko font-black uppercase text-white mb-6">
                  Por Categoría
                </h3>
                <div className="space-y-4">
                  {Object.keys(stats.incomeByCategory).length === 0 ? (
                    <p className="text-white/40 text-sm">Sin datos aún</p>
                  ) : (
                    Object.entries(stats.incomeByCategory)
                      .sort((a, b) => b[1] - a[1])
                      .map(([cat, amount]) => {
                        const info = getCategoryInfo(cat, 'income');
                        const percentage = stats.totalIncome > 0
                          ? (amount / stats.totalIncome * 100).toFixed(0)
                          : 0;
                        return (
                          <div key={cat}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white text-sm flex items-center gap-2">
                                <span className="text-lg">{info.icon}</span>
                                {info.label}
                              </span>
                              <span className="text-white font-bold text-sm">
                                ${amount.toLocaleString('es-AR')}
                              </span>
                            </div>
                            <div className="w-full bg-blue-900/50 rounded-full h-2 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8 }}
                                className="bg-gradient-to-r from-blue-400 to-blue-300 h-full rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>
            </motion.div>

            {/* GASTOS POR CATEGORÍA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-950 to-red-900 p-8 border border-orange-700/30"
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                <img src="/5.jpg" alt="" className="w-full h-full object-cover rounded-bl-3xl" />
              </div>
              <div className="relative z-10">
                <p className="text-orange-300 font-oswald uppercase tracking-wider text-xs mb-2">
                  Top Gastos
                </p>
                <h3 className="text-3xl font-teko font-black uppercase text-white mb-6">
                  Por Categoría
                </h3>
                <div className="space-y-4">
                  {Object.keys(stats.expensesByCategory).length === 0 ? (
                    <p className="text-white/40 text-sm">Sin datos aún</p>
                  ) : (
                    Object.entries(stats.expensesByCategory)
                      .sort((a, b) => b[1] - a[1])
                      .map(([cat, amount]) => {
                        const info = getCategoryInfo(cat, 'expense');
                        const percentage = stats.totalExpense > 0
                          ? (amount / stats.totalExpense * 100).toFixed(0)
                          : 0;
                        return (
                          <div key={cat}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white text-sm flex items-center gap-2">
                                <span className="text-lg">{info.icon}</span>
                                {info.label}
                              </span>
                              <span className="text-white font-bold text-sm">
                                ${amount.toLocaleString('es-AR')}
                              </span>
                            </div>
                            <div className="w-full bg-orange-900/50 rounded-full h-2 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8 }}
                                className="bg-gradient-to-r from-orange-400 to-red-400 h-full rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRANSACCIONES */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="app-container max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <p className="text-brand font-oswald uppercase tracking-wider text-xs mb-2">Historial</p>
              <h2 className="text-3xl md:text-4xl font-teko font-black uppercase text-white">
                Transacciones
              </h2>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-brand text-white font-oswald uppercase font-bold tracking-wider rounded-lg hover:bg-brand-light transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Agregar
            </button>
          </div>

          {/* TABS */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'Todas', icon: '📊' },
              { id: 'income', label: 'Ingresos', icon: '💰' },
              { id: 'expense', label: 'Gastos', icon: '💸' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setFilterCategory('all'); }}
                className={`px-5 py-3 rounded-lg font-oswald uppercase font-bold text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand text-white shadow-lg'
                    : 'bg-dark text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* SEARCH & FILTER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
                className="w-full bg-dark border border-white/10 pl-12 pr-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-dark border border-white/10 pl-12 pr-4 py-3 rounded-lg text-white focus:outline-none focus:border-brand transition-all appearance-none"
              >
                <option value="all">Todas las categorías</option>
                {activeTab !== 'expense' && CATEGORIES.income.map(c => (
                  <option key={`i-${c.value}`} value={c.value}>{c.icon} {c.label}</option>
                ))}
                {activeTab !== 'income' && CATEGORIES.expense.map(c => (
                  <option key={`e-${c.value}`} value={c.value}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* LISTA */}
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-20 bg-dark rounded-2xl border border-white/10">
              <p className="text-white/40 text-lg mb-6">No hay transacciones</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-4 bg-brand text-white font-oswald uppercase font-bold tracking-wider rounded-lg hover:bg-brand-light transition-all"
              >
                Crear Primera Transacción
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {filteredTransactions.map((t) => {
                  const info = getCategoryInfo(t.category, t.type);
                  const isIncome = t.type === 'income';
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-dark p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 ${
                          isIncome ? 'bg-emerald-500/20' : 'bg-orange-500/20'
                        }`}>
                          {info.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold truncate">{t.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                            <span className="text-white/60">{info.label}</span>
                            <span className="text-white/40">•</span>
                            <span className="text-white/60">
                              {new Date(t.date).toLocaleDateString('es-AR', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                              t.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-orange-500/20 text-orange-300'
                            }`}>
                              {t.status === 'completed' ? '✓ Pagado' : '⏳ Pendiente'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <p className={`text-xl md:text-2xl font-teko font-black ${
                            isIncome ? 'text-emerald-400' : 'text-orange-400'
                          }`}>
                            {isIncome ? '+' : '-'}${t.amount.toLocaleString('es-AR')}
                          </p>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* MODAL FORMULARIO */}
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
              className="bg-surface rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl md:text-4xl font-teko font-black uppercase text-white">
                  Nueva Transacción
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-white/60 hover:text-white transition text-2xl w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Tipo */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('income')}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-oswald uppercase font-bold ${
                      formData.type === 'income'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-dark border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    <TrendingUp size={20} />
                    Ingreso
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('expense')}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-oswald uppercase font-bold ${
                      formData.type === 'expense'
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                        : 'bg-dark border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    <TrendingDown size={20} />
                    Gasto
                  </button>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-xs font-oswald uppercase tracking-wider text-white/60 mb-2">
                    Descripción
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={formData.type === 'income' ? 'Ej: Landing Page para Cliente X' : 'Ej: Hosting Anual VPS'}
                    className="w-full bg-dark border-2 border-white/10 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-all"
                    required
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-xs font-oswald uppercase tracking-wider text-white/60 mb-2">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-dark border-2 border-white/10 px-4 py-3 rounded-lg text-white focus:outline-none focus:border-brand transition-all"
                  >
                    {CATEGORIES[formData.type].map(c => (
                      <option key={c.value} value={c.value}>
                        {c.icon} {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Monto y Fecha */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-oswald uppercase tracking-wider text-white/60 mb-2">
                      Monto ($)
                    </label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0"
                      step="0.01"
                      min="0"
                      className="w-full bg-dark border-2 border-white/10 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-oswald uppercase tracking-wider text-white/60 mb-2">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-dark border-2 border-white/10 px-4 py-3 rounded-lg text-white focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-xs font-oswald uppercase tracking-wider text-white/60 mb-2">
                    Estado
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: 'completed' })}
                      className={`p-3 rounded-lg border-2 transition-all font-oswald uppercase font-bold text-sm ${
                        formData.status === 'completed'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-dark border-white/10 text-white/60'
                      }`}
                    >
                      ✓ {formData.type === 'income' ? 'Cobrado' : 'Pagado'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: 'pending' })}
                      className={`p-3 rounded-lg border-2 transition-all font-oswald uppercase font-bold text-sm ${
                        formData.status === 'pending'
                          ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                          : 'bg-dark border-white/10 text-white/60'
                      }`}
                    >
                      ⏳ Pendiente
                    </button>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-brand text-white font-oswald uppercase font-bold tracking-wider rounded-lg hover:bg-brand-light transition-all"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-4 bg-white/5 text-white font-oswald uppercase font-bold tracking-wider rounded-lg hover:bg-white/10 transition-all border border-white/10"
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
