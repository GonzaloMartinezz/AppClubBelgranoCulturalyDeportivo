import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const HomePage = () => {
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('devSales');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    project: '',
    price: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pendiente'
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('devSales', JSON.stringify(sales));
  }, [sales]);

  const stats = {
    total: sales.reduce((sum, s) => sum + parseFloat(s.price || 0), 0),
    completed: sales.filter(s => s.status === 'completado').length,
    pending: sales.filter(s => s.status === 'pendiente').length,
    projects: sales.length
  };

  const handleAddSale = (e) => {
    e.preventDefault();
    if (!formData.project || !formData.price) return;

    setSales([
      ...sales,
      {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price)
      }
    ]);

    setFormData({
      project: '',
      price: '',
      date: new Date().toISOString().split('T')[0],
      status: 'pendiente'
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setSales(sales.filter(s => s.id !== id));
  };

  const toggleStatus = (id) => {
    setSales(sales.map(s =>
      s.id === id
        ? { ...s, status: s.status === 'pendiente' ? 'completado' : 'pendiente' }
        : s
    ));
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full bg-dark min-h-screen pt-20 md:pt-24">
      {/* Hero con imagen 3.webp */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 md:h-[500px] overflow-hidden mb-16"
      >
        <img
          src="/3.webp"
          alt="Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/70 to-transparent flex items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="app-container max-w-4xl"
          >
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl font-teko font-black uppercase text-white mb-6 leading-tight"
            >
              Gestiona tu<br />Negocio Web
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl"
            >
              Registra, analiza y crece. Control total de tus proyectos y ganancias en un solo lugar.
            </motion.p>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-gradient-to-r from-brand to-brand-light text-white font-oswald uppercase font-bold tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3 text-lg"
            >
              <Plus size={24} />
              Agregar Proyecto
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-dark to-surface">
        <div className="app-container max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-xl shadow-xl"
            >
              <DollarSign className="text-green-200 mb-3" size={32} />
              <p className="text-white/80 text-sm font-oswald uppercase tracking-wider mb-2">Total</p>
              <p className="text-4xl md:text-5xl font-teko font-black text-white">
                ${stats.total.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-xl shadow-xl"
            >
              <TrendingUp className="text-blue-200 mb-3" size={32} />
              <p className="text-white/80 text-sm font-oswald uppercase tracking-wider mb-2">Completados</p>
              <p className="text-4xl md:text-5xl font-teko font-black text-white">
                {stats.completed}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-orange-600 to-orange-700 p-8 rounded-xl shadow-xl"
            >
              <Calendar className="text-orange-200 mb-3" size={32} />
              <p className="text-white/80 text-sm font-oswald uppercase tracking-wider mb-2">Pendientes</p>
              <p className="text-4xl md:text-5xl font-teko font-black text-white">
                {stats.pending}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 rounded-xl shadow-xl"
            >
              <Plus className="text-purple-200 mb-3" size={32} />
              <p className="text-white/80 text-sm font-oswald uppercase tracking-wider mb-2">Proyectos</p>
              <p className="text-4xl md:text-5xl font-teko font-black text-white">
                {stats.projects}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Formulario */}
      {showForm && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 pt-24"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-surface rounded-xl shadow-2xl max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-teko font-black uppercase text-white">Nuevo Proyecto</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-white/60 hover:text-white transition text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSale} className="space-y-6">
              <div>
                <label className="block text-sm font-oswald uppercase tracking-wider text-white/80 mb-3">
                  Nombre del Proyecto
                </label>
                <input
                  type="text"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  placeholder="Ej: E-commerce TechStore"
                  className="w-full bg-dark border-2 border-white/10 px-6 py-4 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-all text-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-oswald uppercase tracking-wider text-white/80 mb-3">
                    Precio ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="5000"
                    step="100"
                    className="w-full bg-dark border-2 border-white/10 px-6 py-4 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-all text-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-oswald uppercase tracking-wider text-white/80 mb-3">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-dark border-2 border-white/10 px-6 py-4 rounded-lg text-white focus:outline-none focus:border-brand transition-all text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-oswald uppercase tracking-wider text-white/80 mb-3">
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-dark border-2 border-white/10 px-6 py-4 rounded-lg text-white focus:outline-none focus:border-brand transition-all text-lg"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="completado">Completado</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-brand to-brand-light text-white font-oswald uppercase font-bold tracking-wider rounded-lg hover:shadow-lg transition-all text-lg"
                >
                  Guardar Proyecto
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-8 py-4 bg-white/10 text-white font-oswald uppercase font-bold tracking-wider rounded-lg hover:bg-white/20 transition-all text-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.section>
      )}

      {/* Lista de Proyectos */}
      <section className="py-20 md:py-28 bg-dark">
        <div className="app-container max-w-6xl">
          <h2 className="text-5xl font-teko font-black uppercase text-white mb-12">
            Tus Proyectos
          </h2>

          {sales.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-muted mb-6">No hay proyectos aún</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-4 bg-brand text-white font-oswald uppercase font-bold tracking-wider rounded-lg hover:bg-brand-light transition-all"
              >
                Crear Primer Proyecto
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {sales.map((sale) => (
                <motion.div
                  key={sale.id}
                  variants={itemVariants}
                  className={`p-8 rounded-xl border-2 transition-all ${
                    sale.status === 'completado'
                      ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/60'
                      : 'bg-orange-500/10 border-orange-500/30 hover:border-orange-500/60'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-teko font-black text-white mb-3">
                        {sale.project}
                      </h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-4 text-muted">
                        <span className="text-lg">
                          💰 <span className="font-bold text-white">${sale.price.toLocaleString()}</span>
                        </span>
                        <span className="text-lg">
                          📅 {new Date(sale.date).toLocaleDateString('es-AR')}
                        </span>
                        <span className={`px-4 py-2 rounded-full font-oswald uppercase font-bold text-sm ${
                          sale.status === 'completado'
                            ? 'bg-green-500/30 text-green-300'
                            : 'bg-orange-500/30 text-orange-300'
                        }`}>
                          {sale.status === 'completado' ? '✓ Completado' : '⏳ Pendiente'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleStatus(sale.id)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-oswald uppercase font-bold rounded-lg transition-all"
                      >
                        {sale.status === 'completado' ? 'Pendiente' : 'Completar'}
                      </button>
                      <button
                        onClick={() => handleDelete(sale.id)}
                        className="px-6 py-3 bg-red-600/20 hover:bg-red-600/40 text-red-300 font-oswald uppercase font-bold rounded-lg transition-all flex items-center gap-2"
                      >
                        <Trash2 size={20} />
                        Borrar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer Stats */}
      <section className="py-16 bg-gradient-to-t from-surface to-dark border-t border-white/10">
        <div className="app-container max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-white/60 text-lg">
              Total en proyectos: <span className="font-teko text-3xl font-black text-white">${stats.total.toLocaleString()}</span>
            </p>
            <p className="text-white/60 text-lg">
              Proyectos completados: <span className="font-teko text-2xl font-black text-green-400">{stats.completed}</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
