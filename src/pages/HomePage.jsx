import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, DollarSign, Briefcase } from 'lucide-react';

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

  const stats = {
    totalSales: sales.filter(s => s.status === 'completed').length,
    totalBudgets: sales.filter(s => s.type === 'presupuesto').length,
    totalApps: sales.filter(s => s.type === 'app').length,
    totalEarnings: sales
      .filter(s => s.status === 'completed')
      .reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0),
    pendingBudgets: sales.filter(s => s.status === 'pendiente').length
  };

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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="w-full bg-dark min-h-screen pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-dark to-surface">
        <div className="app-container max-w-4xl">
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
              Business Analytics
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted mb-8"
            >
              Analiza tu negocio de desarrollo web en tiempo real
            </motion.p>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(!showForm)}
              className="px-8 py-4 bg-gradient-to-r from-brand to-brand-light text-white font-oswald uppercase font-bold text-sm tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Nueva Venta / Presupuesto
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 md:py-24 bg-dark">
        <div className="app-container max-w-5xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {/* Total Earnings */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-oswald uppercase tracking-wider text-green-100">Ganancias Total</span>
                <DollarSign size={20} className="text-green-200" />
              </div>
              <p className="text-3xl font-teko font-black text-white">
                ${stats.totalEarnings.toLocaleString('es-AR')}
              </p>
            </motion.div>

            {/* Apps Sold */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-oswald uppercase tracking-wider text-blue-100">Apps Vendidas</span>
                <Briefcase size={20} className="text-blue-200" />
              </div>
              <p className="text-3xl font-teko font-black text-white">
                {stats.totalApps}
              </p>
            </motion.div>

            {/* Completed Sales */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-oswald uppercase tracking-wider text-purple-100">Ventas Completadas</span>
                <TrendingUp size={20} className="text-purple-200" />
              </div>
              <p className="text-3xl font-teko font-black text-white">
                {stats.totalSales}
              </p>
            </motion.div>

            {/* Total Budgets */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-oswald uppercase tracking-wider text-orange-100">Presupuestos Total</span>
                <DollarSign size={20} className="text-orange-200" />
              </div>
              <p className="text-3xl font-teko font-black text-white">
                {stats.totalBudgets}
              </p>
            </motion.div>

            {/* Pending */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-oswald uppercase tracking-wider text-red-100">Pendientes</span>
                <Plus size={20} className="text-red-200" />
              </div>
              <p className="text-3xl font-teko font-black text-white">
                {stats.pendingBudgets}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      {showForm && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="py-16 bg-surface border-b border-white/10"
        >
          <div className="app-container max-w-3xl">
            <h2 className="text-3xl font-teko font-black uppercase mb-8 text-white">
              Registrar Nueva Venta
            </h2>

            <form onSubmit={handleAddSale} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-oswald uppercase tracking-wider text-white/80 mb-2">
                    Nombre del Proyecto
                  </label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    placeholder="Ej: E-commerce TechStore"
                    className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-all"
                    required
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-oswald uppercase tracking-wider text-white/80 mb-2">
                    Tipo
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white focus:outline-none focus:border-brand transition-all"
                  >
                    <option value="app">App/Website</option>
                    <option value="presupuesto">Presupuesto</option>
                    <option value="mantenimiento">Mantenimiento</option>
                    <option value="consultoria">Consultoría</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-oswald uppercase tracking-wider text-white/80 mb-2">
                    Precio ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="5000"
                    step="100"
                    className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-all"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-oswald uppercase tracking-wider text-white/80 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white focus:outline-none focus:border-brand transition-all"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-oswald uppercase tracking-wider text-white/80 mb-2">
                    Estado
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white focus:outline-none focus:border-brand transition-all"
                  >
                    <option value="completed">Completado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en-proceso">En Proceso</option>
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-oswald uppercase tracking-wider text-white/80 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Detalles del proyecto..."
                    className="w-full bg-dark border border-white/10 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-all h-24 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-brand text-white font-oswald uppercase font-bold text-sm tracking-wider rounded-lg hover:bg-brand-light transition-all"
                >
                  Guardar Venta
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 bg-white/10 text-white font-oswald uppercase font-bold text-sm tracking-wider rounded-lg hover:bg-white/20 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </motion.section>
      )}

      {/* Sales Table */}
      <section className="py-16 md:py-24 bg-dark">
        <div className="app-container max-w-6xl">
          <h2 className="text-3xl font-teko font-black uppercase mb-8 text-white">
            Historial de Ventas
          </h2>

          {sales.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted text-lg">No hay registros aún. ¡Crea tu primera venta!</p>
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
                    <th className="px-6 py-4 text-left text-xs font-oswald uppercase tracking-wider text-white/70">Proyecto</th>
                    <th className="px-6 py-4 text-left text-xs font-oswald uppercase tracking-wider text-white/70">Tipo</th>
                    <th className="px-6 py-4 text-right text-xs font-oswald uppercase tracking-wider text-white/70">Precio</th>
                    <th className="px-6 py-4 text-left text-xs font-oswald uppercase tracking-wider text-white/70">Fecha</th>
                    <th className="px-6 py-4 text-left text-xs font-oswald uppercase tracking-wider text-white/70">Estado</th>
                    <th className="px-6 py-4 text-center text-xs font-oswald uppercase tracking-wider text-white/70">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <motion.tr
                      key={sale.id}
                      variants={itemVariants}
                      className="border-b border-white/5 hover:bg-surface/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-semibold">{sale.project}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-brand/20 text-brand text-xs font-oswald uppercase rounded-full">
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
                        <span className={`px-3 py-1 text-xs font-oswald uppercase rounded-full ${
                          sale.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          sale.status === 'pendiente' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {sale.status === 'completed' ? 'Completado' :
                           sale.status === 'pendiente' ? 'Pendiente' : 'En Proceso'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(sale.id)}
                          className="text-red-400 hover:text-red-300 text-sm font-oswald uppercase tracking-wider transition-colors"
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
