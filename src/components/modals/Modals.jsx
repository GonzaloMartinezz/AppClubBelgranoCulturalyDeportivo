import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Check, Clock, Sparkles, AlertCircle, Trash2 } from 'lucide-react';

/* ════════════════════════════════════════════
   BASE MODAL - Wrapper reutilizable
   ════════════════════════════════════════════ */
export const BaseModal = ({ isOpen, onClose, children, maxWidth = 'max-w-3xl' }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={`${maxWidth} w-full my-8 max-h-[92vh] overflow-y-auto`}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ════════════════════════════════════════════
   TRANSACTION FORM MODAL
   ════════════════════════════════════════════ */
export const TransactionFormModal = ({
  isOpen, onClose, onSubmit, formData, setFormData, categories, handleTypeChange
}) => (
  <BaseModal isOpen={isOpen} onClose={onClose}>
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-[40px] overflow-hidden shadow-2xl">
      {/* Header con gradiente */}
      <div className="relative bg-gradient-to-r from-brand to-brand-light p-8 md:p-12 overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute -top-10 -right-10 text-[15rem] font-teko font-black text-dark/10 leading-none">
          {formData.type === 'income' ? '$' : '−'}
        </div>

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-dark/20 backdrop-blur-md px-3 py-1.5 rounded-full mb-4">
              <Sparkles size={14} className="text-dark" fill="currentColor" />
              <span className="text-xs font-bold uppercase tracking-widest text-dark">
                {formData.type === 'income' ? 'Nuevo Ingreso' : 'Nuevo Gasto'}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-teko font-black uppercase text-dark leading-[0.85]">
              Registra<br />
              <span className="italic">tu</span> movimiento
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-dark text-brand hover:bg-surface hover:scale-110 flex items-center justify-center transition-all shadow-lg"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="p-8 md:p-12 space-y-6">
        {/* Tipo selector */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTypeChange('income')}
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
              formData.type === 'income'
                ? 'bg-brand border-brand text-dark shadow-lg shadow-brand/40'
                : 'bg-white border-gray-200 text-gray-400 hover:border-dark'
            }`}
          >
            <TrendingUp size={32} />
            <div>
              <p className="font-bold text-lg uppercase">Ingreso</p>
              <p className="text-xs opacity-70">Suma a tu balance</p>
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTypeChange('expense')}
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
              formData.type === 'expense'
                ? 'bg-dark border-dark text-brand shadow-lg shadow-dark/40'
                : 'bg-white border-gray-200 text-gray-400 hover:border-dark'
            }`}
          >
            <TrendingDown size={32} />
            <div>
              <p className="font-bold text-lg uppercase">Gasto</p>
              <p className="text-xs opacity-70">Resta de tu balance</p>
            </div>
          </motion.button>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            Descripción del movimiento
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={formData.type === 'income' ? 'Ej: Landing Page Cliente X' : 'Ej: Hosting Anual VPS'}
            className="w-full bg-gray-50 border-2 border-gray-200 px-6 py-4 rounded-2xl text-dark text-lg placeholder:text-gray-400 focus:outline-none focus:border-brand transition-all"
            required
            autoFocus
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            Categoría
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {categories[formData.type].map(c => (
              <motion.button
                key={c.value}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormData({ ...formData, category: c.value })}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${
                  formData.category === c.value
                    ? 'bg-dark border-dark text-brand'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-dark'
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-tight text-center leading-tight">
                  {c.label.split(' ')[0]}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Monto y Fecha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              Monto
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-teko font-black text-gray-400">
                $
              </span>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0"
                step="0.01"
                min="0"
                className="w-full bg-gray-50 border-2 border-gray-200 pl-12 pr-6 py-4 rounded-2xl text-dark text-2xl font-teko font-black placeholder:text-gray-300 focus:outline-none focus:border-brand transition-all"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
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

        {/* Estado */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            Estado
          </label>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData({ ...formData, status: 'completed' })}
              className={`p-4 rounded-2xl border-2 transition-all font-bold text-base flex items-center justify-center gap-2 ${
                formData.status === 'completed'
                  ? 'bg-brand border-brand text-dark'
                  : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              <Check size={20} /> Confirmado
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData({ ...formData, status: 'pending' })}
              className={`p-4 rounded-2xl border-2 transition-all font-bold text-base flex items-center justify-center gap-2 ${
                formData.status === 'pending'
                  ? 'bg-orange-100 border-orange-400 text-orange-600'
                  : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              <Clock size={20} /> Pendiente
            </motion.button>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex-1 px-8 py-5 bg-dark text-brand rounded-full font-bold text-lg hover:bg-surface transition-all shadow-xl"
          >
            ✦ Guardar Movimiento
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onClose}
            className="px-8 py-5 bg-gray-100 text-dark rounded-full font-bold text-lg hover:bg-gray-200 transition-all"
          >
            Cancelar
          </motion.button>
        </div>
      </form>
    </div>
  </BaseModal>
);

/* ════════════════════════════════════════════
   DELETE CONFIRMATION MODAL
   ════════════════════════════════════════════ */
export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, transaction }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
    <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl">
      <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-8 text-center">
        <div className="absolute -top-4 -right-4 text-[10rem] font-teko font-black text-white/10 leading-none">
          !
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
        >
          <AlertCircle size={40} className="text-red-500" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-teko font-black uppercase text-white leading-none">
          ¿Eliminar?
        </h2>
      </div>

      <div className="p-8 text-center">
        {transaction && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Movimiento</p>
            <p className="text-xl font-bold text-dark">{transaction.description}</p>
            <p className="text-2xl font-teko font-black text-dark mt-2">
              ${transaction.amount.toLocaleString('es-AR')}
            </p>
          </div>
        )}

        <p className="text-gray-600 mb-6">
          Esta acción no se puede deshacer. ¿Estás seguro?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 bg-gray-100 text-dark rounded-full font-bold hover:bg-gray-200 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-4 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
);

/* ════════════════════════════════════════════
   TRANSACTION DETAIL MODAL
   ════════════════════════════════════════════ */
export const TransactionDetailModal = ({ isOpen, onClose, transaction, categoryInfo, onDelete, onToggleStatus }) => {
  if (!transaction) return null;
  const isIncome = transaction.type === 'income';

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl">
      <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl">
        <div className={`relative p-8 md:p-12 ${
          isIncome ? 'bg-gradient-to-br from-brand to-brand-light' : 'bg-gradient-to-br from-orange-500 to-red-500'
        }`}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-dark/20 backdrop-blur-md text-dark hover:bg-dark/30 flex items-center justify-center transition-all"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <div className="w-24 h-24 bg-dark/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-5xl mx-auto mb-4">
              {categoryInfo?.icon || '📌'}
            </div>
            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isIncome ? 'text-dark/70' : 'text-white/70'}`}>
              {isIncome ? 'Ingreso' : 'Gasto'}
            </p>
            <h2 className={`text-3xl md:text-4xl font-teko font-black uppercase leading-tight ${isIncome ? 'text-dark' : 'text-white'}`}>
              {transaction.description}
            </h2>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {/* Monto destacado */}
          <div className="text-center mb-8 pb-8 border-b border-gray-200">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Monto</p>
            <p className={`text-6xl md:text-8xl font-teko font-black leading-none ${
              isIncome ? 'text-brand-dark' : 'text-red-500'
            }`}>
              {isIncome ? '+' : '-'}${transaction.amount.toLocaleString('es-AR')}
            </p>
          </div>

          {/* Detalles */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Categoría</p>
              <p className="font-bold text-dark">{categoryInfo?.label || 'Sin categoría'}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Fecha</p>
              <p className="font-bold text-dark">
                {new Date(transaction.date).toLocaleDateString('es-AR', {
                  day: '2-digit', month: 'long', year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Estado */}
          <div className={`rounded-2xl p-4 mb-6 flex items-center justify-between ${
            transaction.status === 'completed' ? 'bg-brand/10' : 'bg-orange-100'
          }`}>
            <div className="flex items-center gap-3">
              {transaction.status === 'completed' ? (
                <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center">
                  <Check size={20} className="text-dark" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-white" />
                </div>
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Estado</p>
                <p className="font-bold text-dark">
                  {transaction.status === 'completed' ? 'Confirmado' : 'Pendiente'}
                </p>
              </div>
            </div>
            <button
              onClick={onToggleStatus}
              className="px-4 py-2 bg-dark text-brand rounded-full font-bold text-xs hover:bg-surface transition-all"
            >
              Cambiar
            </button>
          </div>

          {/* Acciones */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 text-dark rounded-full font-bold hover:bg-gray-200 transition-all"
            >
              Cerrar
            </button>
            <button
              onClick={onDelete}
              className="flex-1 px-6 py-4 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

/* ════════════════════════════════════════════
   SUCCESS TOAST
   ════════════════════════════════════════════ */
export const SuccessToast = ({ isOpen, message = "Movimiento guardado" }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: -20, x: '-50%' }}
        className="fixed top-24 left-1/2 z-[100] bg-brand text-dark px-6 py-3 rounded-full font-bold text-sm shadow-2xl flex items-center gap-2"
      >
        <Check size={18} />
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);
