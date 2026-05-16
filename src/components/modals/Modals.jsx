import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, TrendingUp, TrendingDown, Check, Clock,
  AlertCircle, Trash2, Plus, Minus, Calculator, ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { formatMoney, formatDate } from '../../lib/format';

const QUICK_AMOUNTS = [500, 1000, 2500, 5000, 10000, 25000];

export const BaseModal = ({ isOpen, onClose, children, maxWidth = 'max-w-2xl' }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-sm flex items-start md:items-center justify-center p-3 md:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.98, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 8 }}
          transition={{ type: 'spring', damping: 28, stiffness: 360 }}
          onClick={(e) => e.stopPropagation()}
          className={`${maxWidth} w-full my-4 md:my-8`}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const LineItemRow = ({ item, index, onChange, onRemove, canRemove }) => {
  const subtotal = (Number(item.quantity) || 0) * (Number(item.unitAmount) || 0);

  const addToAmount = (delta) => {
    onChange(item.id, 'unitAmount', (Number(item.unitAmount) || 0) + delta);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="bg-surface-2 border border-border rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
          Ítem {String(index + 1).padStart(2, '0')}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-muted-2 hover:text-danger transition-colors p-1 rounded"
            aria-label="Eliminar ítem"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-12 gap-2.5">
        <div className="col-span-12 md:col-span-6">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1">Concepto</label>
          <input
            type="text"
            value={item.concept}
            onChange={(e) => onChange(item.id, 'concept', e.target.value)}
            placeholder="Ej: Diseño Landing"
            className="w-full bg-surface border border-border text-fg rounded-lg px-3 h-10 text-sm placeholder:text-muted-2 focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/10 transition-all"
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1">Cant.</label>
          <div className="flex items-center bg-surface border border-border rounded-lg overflow-hidden focus-within:border-dark focus-within:ring-2 focus-within:ring-dark/10 transition-all">
            <button
              type="button"
              onClick={() => onChange(item.id, 'quantity', Math.max(1, (Number(item.quantity) || 1) - 1))}
              className="w-8 h-10 flex items-center justify-center text-muted hover:text-fg hover:bg-surface-2 transition-all"
            >
              <Minus size={12} />
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => onChange(item.id, 'quantity', e.target.value)}
              className="flex-1 bg-transparent text-center text-fg text-sm font-bold tabular py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full min-w-0"
            />
            <button
              type="button"
              onClick={() => onChange(item.id, 'quantity', (Number(item.quantity) || 0) + 1)}
              className="w-8 h-10 flex items-center justify-center text-muted hover:text-fg hover:bg-surface-2 transition-all"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
        <div className="col-span-8 md:col-span-4">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1">Monto unitario</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-2">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.unitAmount}
              onChange={(e) => onChange(item.id, 'unitAmount', e.target.value)}
              placeholder="0"
              className="w-full bg-surface border border-border text-fg pl-6 pr-3 h-10 rounded-lg text-sm font-bold tabular placeholder:text-muted-2 focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/10 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] text-muted font-bold mr-1 uppercase tracking-wider">Sumar</span>
        {QUICK_AMOUNTS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => addToAmount(amt)}
            className="px-2.5 h-7 bg-surface hover:bg-dark hover:text-brand text-fg rounded-full text-[11px] font-bold tabular transition-all border border-border hover:border-dark"
          >
            +${amt >= 1000 ? `${amt / 1000}k` : amt}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange(item.id, 'unitAmount', 0)}
          className="ml-auto px-2.5 h-7 text-muted-2 hover:text-danger text-[10px] font-bold uppercase tracking-wider transition-colors"
        >
          Limpiar
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
        <span className="text-[11px] text-muted font-bold uppercase tracking-wider">Subtotal</span>
        <span className="text-base font-bold tabular text-fg">{formatMoney(subtotal)}</span>
      </div>
    </motion.div>
  );
};

const CategoryDropdown = ({ value, options, onChange }) => {
  const current = options.find((o) => o.value === value) || options[0];
  return (
    <details className="group relative">
      <summary className="list-none cursor-pointer flex items-center gap-3 w-full bg-surface-2 border border-border px-3 h-11 rounded-full hover:border-border-strong transition-all">
        <span className="text-base">{current.icon}</span>
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-bold text-fg leading-tight truncate">{current.label}</p>
        </div>
        <ChevronDown size={14} className="text-muted group-open:rotate-180 transition-transform" />
      </summary>
      <div className="absolute z-20 left-0 right-0 mt-2 bg-surface border border-border rounded-2xl shadow-2xl p-1.5 max-h-64 overflow-y-auto">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={(e) => {
              onChange(o.value);
              e.currentTarget.closest('details').open = false;
            }}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left transition-all ${
              o.value === value ? 'bg-dark text-brand' : 'hover:bg-surface-2 text-fg'
            }`}
          >
            <span className="text-base">{o.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight truncate">{o.label}</p>
              <p
                className={`text-[10px] truncate ${
                  o.value === value ? 'text-brand/70' : 'text-muted'
                }`}
              >
                {o.desc}
              </p>
            </div>
            {o.value === value && <Check size={13} />}
          </button>
        ))}
      </div>
    </details>
  );
};

export const TransactionFormModal = ({
  isOpen, onClose, onSubmit, formData, setFormData, categories, handleTypeChange
}) => {
  const items = useMemo(() => formData.items || [], [formData.items]);
  const isIncome = formData.type === 'income';

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, it) => sum + (Number(it.quantity) || 0) * (Number(it.unitAmount) || 0),
      0
    );
    const discountAmount = subtotal * ((Number(formData.discount) || 0) / 100);
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = afterDiscount * ((Number(formData.taxRate) || 0) / 100);
    return { subtotal, discountAmount, taxAmount, total: afterDiscount + taxAmount };
  }, [items, formData.discount, formData.taxRate]);

  const updateItem = (id, field, value) =>
    setFormData({
      ...formData,
      items: items.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    });

  const addItem = () =>
    setFormData({
      ...formData,
      items: [...items, { id: Date.now(), concept: '', quantity: 1, unitAmount: 0 }]
    });

  const removeItem = (id) =>
    setFormData({ ...formData, items: items.filter((it) => it.id !== id) });

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="bg-surface border border-border rounded-[28px] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-border">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted font-bold mb-1">
              {isIncome ? 'Nuevo ingreso' : 'Nuevo gasto'}
            </p>
            <h2 className="text-lg md:text-xl font-bold text-fg tracking-tight">Crear movimiento</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full text-muted hover:text-fg hover:bg-surface-2 flex items-center justify-center transition-all"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 md:p-8 space-y-5 max-h-[85vh] overflow-y-auto">
          {/* Tipo */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                isIncome
                  ? 'bg-dark border-dark text-brand'
                  : 'bg-surface-2 border-border text-muted hover:text-fg hover:border-border-strong'
              }`}
            >
              <TrendingUp size={18} strokeWidth={2.4} />
              <div className="text-left">
                <p className="text-sm font-bold leading-tight">Ingreso</p>
                <p className="text-[10px] opacity-70">Suma al balance</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                !isIncome
                  ? 'bg-warning border-warning text-white'
                  : 'bg-surface-2 border-border text-muted hover:text-fg hover:border-border-strong'
              }`}
            >
              <TrendingDown size={18} strokeWidth={2.4} />
              <div className="text-left">
                <p className="text-sm font-bold leading-tight">Gasto</p>
                <p className="text-[10px] opacity-70">Resta del balance</p>
              </div>
            </button>
          </div>

          {/* Descripción + Categoría */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Descripción</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={isIncome ? 'Ej: Proyecto Cliente X' : 'Ej: Setup oficina'}
                className="w-full bg-surface-2 border border-border text-fg rounded-full px-4 h-11 text-sm placeholder:text-muted-2 focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/10 transition-all"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Categoría</label>
              <CategoryDropdown
                value={formData.category}
                options={categories[formData.type]}
                onChange={(v) => setFormData({ ...formData, category: v })}
              />
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Calculator size={12} /> Ítems del movimiento
              </label>
              <Button size="xs" variant="primary" onClick={addItem}>
                <Plus size={12} /> Agregar
              </Button>
            </div>
            <div className="space-y-2.5">
              <AnimatePresence initial={false}>
                {items.map((it, idx) => (
                  <LineItemRow
                    key={it.id}
                    item={it}
                    index={idx}
                    onChange={updateItem}
                    onRemove={removeItem}
                    canRemove={items.length > 1}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* IVA + Descuento */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Descuento</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount || 0}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full bg-surface-2 border border-border text-fg pl-4 pr-9 h-11 rounded-full text-sm font-bold tabular focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/10 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted">%</span>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">IVA</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.taxRate || 0}
                  onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                  className="w-full bg-surface-2 border border-border text-fg pl-4 pr-9 h-11 rounded-full text-sm font-bold tabular focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/10 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted">%</span>
              </div>
            </div>
          </div>

          {/* Totales */}
          <motion.div
            layout
            className="bg-dark text-white rounded-2xl p-5 space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60 uppercase tracking-wider font-bold text-[11px]">Subtotal</span>
              <span className="font-bold tabular">{formatMoney(totals.subtotal)}</span>
            </div>
            {totals.discountAmount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60 uppercase tracking-wider font-bold text-[11px]">
                  Descuento ({formData.discount || 0}%)
                </span>
                <span className="text-warning font-bold tabular">
                  −{formatMoney(totals.discountAmount)}
                </span>
              </div>
            )}
            {totals.taxAmount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60 uppercase tracking-wider font-bold text-[11px]">
                  IVA ({formData.taxRate || 0}%)
                </span>
                <span className="font-bold tabular">
                  +{formatMoney(totals.taxAmount)}
                </span>
              </div>
            )}
            <div className="pt-3 mt-2 border-t border-white/10 flex items-end justify-between">
              <div>
                <p className="text-[11px] text-brand uppercase tracking-wider font-bold">Total</p>
                <p className="text-[10px] text-white/40 mt-0.5">
                  {items.length} ítem{items.length === 1 ? '' : 's'}
                </p>
              </div>
              <motion.p
                key={totals.total}
                initial={{ opacity: 0.6, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-3xl md:text-5xl font-bold tabular tracking-tight ${
                  isIncome ? 'text-brand' : 'text-warning'
                }`}
              >
                {isIncome ? '+' : '−'}
                {formatMoney(totals.total)}
              </motion.p>
            </div>
          </motion.div>

          {/* Fecha + Estado */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Fecha</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-surface-2 border border-border text-fg rounded-full px-4 h-11 text-sm focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Estado</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'completed' })}
                  className={`h-11 rounded-full border text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    formData.status === 'completed'
                      ? 'bg-brand border-brand text-dark'
                      : 'bg-surface-2 border-border text-muted hover:text-fg'
                  }`}
                >
                  <Check size={14} /> Cobrado
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'pending' })}
                  className={`h-11 rounded-full border text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    formData.status === 'pending'
                      ? 'bg-warning/15 border-warning text-warning'
                      : 'bg-surface-2 border-border text-muted hover:text-fg'
                  }`}
                >
                  <Clock size={14} /> Pendiente
                </button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
            <Button variant="secondary" onClick={onClose} className="sm:w-32">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={totals.total <= 0 || !formData.description}
            >
              Guardar · {formatMoney(totals.total)}
            </Button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, transaction }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
    <div className="bg-surface border border-border rounded-[28px] overflow-hidden shadow-2xl">
      <div className="p-7 text-center">
        <div className="w-14 h-14 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={22} className="text-danger" />
        </div>
        <h2 className="text-lg font-bold text-fg mb-2">Eliminar movimiento</h2>
        <p className="text-sm text-muted mb-5">Esta acción no se puede deshacer.</p>

        {transaction && (
          <div className="bg-surface-2 border border-border rounded-2xl p-4 mb-5 text-left">
            <p className="text-[11px] text-muted uppercase tracking-wider font-bold mb-1">
              {formatDate(transaction.date)}
            </p>
            <p className="text-sm font-bold text-fg truncate">{transaction.description}</p>
            <p className="text-xl font-bold tabular text-fg mt-1.5">
              {formatMoney(transaction.amount)}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" className="flex-1" onClick={onConfirm}>
            <Trash2 size={14} /> Eliminar
          </Button>
        </div>
      </div>
    </div>
  </BaseModal>
);

export const TransactionDetailModal = ({
  isOpen, onClose, transaction, categoryInfo, onDelete, onToggleStatus
}) => {
  if (!transaction) return null;
  const isIncome = transaction.type === 'income';
  const items = transaction.items || [];

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="bg-surface border border-border rounded-[28px] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                isIncome ? 'bg-brand/30' : 'bg-warning/20'
              }`}
            >
              {categoryInfo?.icon || '📌'}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted font-bold">
                {isIncome ? 'Ingreso' : 'Gasto'} · {categoryInfo?.label}
              </p>
              <h2 className="text-base md:text-lg font-bold text-fg truncate">
                {transaction.description}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full text-muted hover:text-fg hover:bg-surface-2 flex items-center justify-center transition-all shrink-0"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
          <div>
            <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-1.5">Monto total</p>
            <p
              className={`text-5xl md:text-7xl font-bold tabular tracking-tight headline-display ${
                isIncome ? 'text-fg' : 'text-warning'
              }`}
            >
              {isIncome ? '+' : '−'}
              {formatMoney(transaction.amount)}
            </p>
          </div>

          {items.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Desglose</p>
              <div className="bg-surface-2 border border-border rounded-2xl divide-y divide-border">
                {items.map((it, i) => {
                  const sub = (Number(it.quantity) || 0) * (Number(it.unitAmount) || 0);
                  return (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-fg font-bold truncate">{it.concept || `Ítem ${i + 1}`}</p>
                        <p className="text-[11px] text-muted tabular">
                          {it.quantity} × {formatMoney(it.unitAmount)}
                        </p>
                      </div>
                      <p className="text-sm font-bold tabular text-fg shrink-0 ml-3">
                        {formatMoney(sub)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-2 border border-border rounded-2xl p-4">
              <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Categoría</p>
              <p className="text-sm font-bold text-fg mt-1">{categoryInfo?.label || '—'}</p>
            </div>
            <div className="bg-surface-2 border border-border rounded-2xl p-4">
              <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Fecha</p>
              <p className="text-sm font-bold text-fg tabular mt-1">
                {formatDate(transaction.date, { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div
            className={`rounded-2xl p-4 flex items-center justify-between border ${
              transaction.status === 'completed'
                ? 'bg-brand-soft border-brand/30'
                : 'bg-warning/10 border-warning/30'
            }`}
          >
            <div className="flex items-center gap-3">
              {transaction.status === 'completed' ? (
                <div className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center">
                  <Check size={15} strokeWidth={2.8} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-warning text-white flex items-center justify-center">
                  <Clock size={15} strokeWidth={2.8} />
                </div>
              )}
              <div>
                <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Estado</p>
                <p className="text-sm font-bold text-fg">
                  {transaction.status === 'completed' ? 'Confirmado' : 'Pendiente'}
                </p>
              </div>
            </div>
            <Button size="xs" variant="primary" onClick={onToggleStatus}>
              Cambiar
            </Button>
          </div>

          <div className="flex gap-2 pt-1">
            <Button variant="secondary" className="flex-1" onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="danger" className="flex-1" onClick={onDelete}>
              <Trash2 size={14} /> Eliminar
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export const SuccessToast = ({ isOpen, message = 'Guardado' }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: -10, x: '-50%' }}
        className="fixed top-20 left-1/2 z-[100] bg-dark text-brand px-5 h-11 rounded-full shadow-2xl flex items-center gap-2 text-sm font-bold"
      >
        <Check size={15} strokeWidth={2.8} />
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);
