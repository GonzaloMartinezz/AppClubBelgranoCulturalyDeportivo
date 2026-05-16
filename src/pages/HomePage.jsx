import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, DollarSign, Briefcase, BarChart3, PieChart, Calendar } from 'lucide-react';

const HomePage = () => {
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('sales');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    project: '',
    type: 'app',
    price: '',
    date: new Date().toISOString().split('T')[0],
    status: 'completed',
    description: ''
  });

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  // Análisis avanzado
  const analytics = useMemo(() => {
    const completed = sales.filter(s => s.status === 'completed');
    const byType = {};
    const byMonth = {};

    sales.forEach(s => {
      byType[s.type] = (byType[s.type] || 0) + 1;
      const month = new Date(s.date).toLocaleDateString('es-AR', { month: 'short', year: '2-digit' });
      byMonth[month] = (byMonth[month] || 0) + (s.status === 'completed' ? parseFloat(s.price) || 0 : 0);
    });

    return {
      totalSales: completed.length,
      totalBudgets: sales.filter(s => s.type === 'presupuesto').length,
      totalApps: sales.filter(s => s.type === 'app').length,
      totalEarnings: completed.reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0),
      pendingBudgets: sales.filter(s => s.status === 'pendiente').length,
      pendingAmount: sales.filter(s => s.status === 'pendiente').reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0),
      averageProject: completed.length ? (completed.reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0) / completed.length).toFixed(0) : 0,
      byType,
      byMonth,
      monthlyData: Object.entries(byMonth)
    };
  }, [sales]);

  const handleAddSale = (e) => {
    e.preventDefault();
    if (!formData.project || !formData.price) return;

    setSales([...sales, {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price)
    }]);

    setFormData({
      project: '',
      type: 'app',
      price: '',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      description: ''
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setSales(sales.filter(s => s.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Gráfico simple en SVG
  const maxEarning = Math.max(...analytics.monthlyData.map(([_, v]) => v), 1);
  const chartHeight = 150;
  const barWidth = analytics.monthlyData.length ? 100 / analytics.monthlyData.length : 100;

  return (
    <div className="w-full bg-dark min-h-screen pt-20 md:pt-24">
      {/* Hero con imagen 3.webp */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-80 md:h-96 overflow-hidden"
      >
        <img
          src="/3.webp"
          alt="Dashboard Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-dark/80 flex items-center justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-teko font-black uppercase mb-4 text-white"
            >
              Business Intelligence
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/90 mb-8"
            >
              Análisis profesional de tu negocio de desarrollo web
            </motion.p>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(!showForm)}
              className="px-8 py-4 bg-gradient-to-r from-brand to-brand-light text-white font-oswald uppercase font-bold text-sm tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Registrar Venta
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Grid Principal */}
      <section className="py-16 md:py-24 bg-dark">
        <div className="app-container max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {/* Earnings */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-oswald uppercase tracking-wider text-green-100">Ganancias Total</span>
                <DollarSign size={24} className="text-green-200" />
              </div>
              <p className="text-4xl font-teko font-black text-white mb-2">
                ${analytics.totalEarnings.toLocaleString('es-AR')}
              </p>
              <p className="text-xs text-green-100">De {analytics.totalSales} proyectos completados</p>
            </motion.div>

            {/* Apps Sold */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-oswald uppercase tracking-wider text-blue-100">Apps</span>
                <Briefcase size={20} className="text-blue-200" />
              </div>
              <p className="text-3xl font-teko font-black text-white">{analytics.totalApps}</p>
            </motion.div>

            {/* Completed */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-oswald uppercase tracking-wider text-purple-100">Completados</span>
                <TrendingUp size={20} className="text-purple-200" />
              </div>
              <p className="text-3xl font-teko font-black text-white">{analytics.totalSales}</p>
            </motion.div>

            {/* Budgets */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-orange-600 to-orange-700 p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-oswald uppercase tracking-wider text-orange-100">Presupuestos</span>
                <BarChart3 size={20} className="text-orange-200" />
              </div>
              <p className="text-3xl font-teko font-black text-white">{analytics.totalBudgets}</p>
            </motion.div>

            {/* Pending */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-red-600 to-red-700 p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-oswald uppercase tracking-wider text-red-100">Pendiente</span>
                <Calendar size={20} className="text-red-200" />
              </div>
              <p className="text-3xl font-teko font-black text-white">{analytics.pendingBudgets}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Análisis Cards con Imágenes */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="app-container max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1 - Imagen 5.jpg */}
            <motion.div
              variants={itemVariants}
              className="group relative h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src="/5.jpg"
                alt="Promedio por Proyecto"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-oswald uppercase tracking-wider text-white/70 mb-2">Promedio</p>
                <p className="text-3xl font-teko font-black text-white mb-2">
                  ${analytics.averageProject.toLocaleString('es-AR')}
                </p>
                <p className="text-xs text-white/60">Por proyecto</p>
              </div>
            </motion.div>

            {/* Card 2 - Imagen 4.webp */}
            <motion.div
              variants={itemVariants}
              className="group relative h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src="/4.webp"
                alt="Pendiente de Cobrar"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-oswald uppercase tracking-wider text-amber-300 mb-2">Pendiente</p>
                <p className="text-3xl font-teko font-black text-white mb-2">
                  ${analytics.pendingAmount.toLocaleString('es-AR')}
                </p>
                <p className="text-xs text-white/60">En {analytics.pendingBudgets} proyectos</p>
              </div>
            </motion.div>

            {/* Card 3 - Análisis de Tipos */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 rounded-lg shadow-lg"
            >
              <p className="text-xs font-oswald uppercase tracking-wider text-indigo-100 mb-6">Distribución</p>
              <div className="space-y-4">
                {Object.entries(analytics.byType).map(([type, count]) => (
                  <div key={type}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-indigo-100 capitalize">{type}</span>
                      <span className="text-xs font-bold text-white">{count}</span>
                    </div>
                    <div className="w-full bg-indigo-900 rounded-full h-2">
                      <div
                        className="bg-indigo-300 h-2 rounded-full transition-all"
                        style={{ width: `${(count / Math.max(...Object.values(analytics.byType), 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gráfico de Ganancias Mensuales */}
      {analytics.monthlyData.length > 0 && (
        <section className="py-16 md:py-24 bg-dark">
          <div className="app-container max-w-7xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-teko font-black uppercase mb-8 text-white"
              >
                Ganancias Mensuales
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="bg-surface p-8 rounded-lg border border-white/10"
              >
                <svg viewBox={`0 0 ${Math.max(400, analytics.monthlyData.length * 80)} 250`} className="w-full">
                  {/* Grid líneas */}
                  {[0, 25, 50, 75, 100].map((i) => (
                    <line
                      key={`grid-${i}`}
                      x1="50"
                      y1={chartHeight - (i / 100) * chartHeight + 30}
                      x2={Math.max(400, analytics.monthlyData.length * 80) - 20}
                      y2={chartHeight - (i / 100) * chartHeight + 30}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Barras */}
                  {analytics.monthlyData.map(([month, value], idx) => {
                    const barHeight = (value / maxEarning) * chartHeight;
                    const x = 50 + idx * (barWidth + 8);
                    return (
                      <g key={month}>
                        <rect
                          x={x}
                          y={chartHeight - barHeight + 30}
                          width={barWidth - 4}
                          height={barHeight}
                          fill="url(#gradient)"
                          rx="4"
                          className="hover:opacity-80 transition-opacity"
                        />
                        <text
                          x={x + (barWidth - 4) / 2}
                          y={chartHeight + 50}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.6)"
                          fontSize="12"
                        >
                          {month}
                        </text>
                        <text
                          x={x + (barWidth - 4) / 2}
                          y={chartHeight - barHeight + 15}
                          textAnchor="middle"
                          fill="white"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          ${(value / 1000).toFixed(0)}k
                        </text>
                      </g>
                    );
                  })}

                  {/* Gradient */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Formulario */}
      {showForm && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 bg-surface border-b border-white/10"
        >
          <div className="app-container max-w-3xl">
            <h2 className="text-3xl font-teko font-black uppercase mb-8 text-white">Registrar Nueva Venta</h2>

            <form onSubmit={handleAddSale} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                  placeholder="Nombre del proyecto"
                  className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand"
                  required
                />

                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white focus:outline-none focus:border-brand"
                >
                  <option value="app">App/Website</option>
                  <option value="presupuesto">Presupuesto</option>
                  <option value="mantenimiento">Mantenimiento</option>
                </select>

                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="Precio"
                  step="100"
                  className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand"
                  required
                />

                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white focus:outline-none focus:border-brand"
                />

                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white focus:outline-none focus:border-brand"
                >
                  <option value="completed">Completado</option>
                  <option value="pendiente">Pendiente</option>
                </select>

                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descripción"
                  className="md:col-span-2 w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand h-24 resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-brand text-white font-oswald uppercase font-bold rounded-lg hover:bg-brand-light transition"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 bg-white/10 text-white font-oswald uppercase font-bold rounded-lg hover:bg-white/20 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </motion.section>
      )}

      {/* Tabla de Historial */}
      <section className="py-16 md:py-24 bg-dark">
        <div className="app-container max-w-7xl">
          <h2 className="text-3xl font-teko font-black uppercase mb-8 text-white">
            Historial Completo
          </h2>

          {sales.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted text-lg">No hay registros. ¡Crea tu primer registro!</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="overflow-x-auto rounded-lg border border-white/10"
            >
              <table className="w-full">
                <thead>
                  <tr className="bg-surface border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs font-oswald uppercase text-white/70">Proyecto</th>
                    <th className="px-6 py-4 text-left text-xs font-oswald uppercase text-white/70">Tipo</th>
                    <th className="px-6 py-4 text-right text-xs font-oswald uppercase text-white/70">Precio</th>
                    <th className="px-6 py-4 text-left text-xs font-oswald uppercase text-white/70">Fecha</th>
                    <th className="px-6 py-4 text-left text-xs font-oswald uppercase text-white/70">Estado</th>
                    <th className="px-6 py-4 text-center text-xs font-oswald uppercase text-white/70">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <motion.tr
                      key={sale.id}
                      variants={itemVariants}
                      className="border-b border-white/5 hover:bg-surface/50 transition"
                    >
                      <td className="px-6 py-4 text-white font-semibold">{sale.project}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-brand/20 text-brand text-xs font-oswald rounded-full">
                          {sale.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-teko text-lg text-green-400">
                        ${sale.price.toLocaleString('es-AR')}
                      </td>
                      <td className="px-6 py-4 text-muted text-sm">
                        {new Date(sale.date).toLocaleDateString('es-AR')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-oswald rounded-full ${
                          sale.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {sale.status === 'completed' ? 'Completado' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(sale.id)}
                          className="text-red-400 hover:text-red-300 text-sm font-oswald uppercase transition"
                        >
                          Eliminar
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
