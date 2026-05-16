import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Card } from '../ui/Card';
import { CATEGORIES } from '../../data/categories';

export const QuickActions = ({ onPick }) => {
  const items = [
    ...CATEGORIES.income.slice(0, 3).map((c) => ({ ...c, type: 'income' })),
    ...CATEGORIES.expense.slice(0, 3).map((c) => ({ ...c, type: 'expense' }))
  ];

  return (
    <Card radius="xl" className="overflow-hidden">
      <div className="px-7 py-6 border-b border-border">
        <h3 className="text-base font-semibold text-fg tracking-tight">Acciones rápidas</h3>
        <p className="text-xs text-muted mt-1">Cargá un movimiento en un clic</p>
      </div>

      <div className="p-5 md:p-7 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {items.map((it, idx) => (
          <motion.button
            key={`${it.type}-${it.value}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            onClick={() => onPick?.({ type: it.type, category: it.value })}
            className="group relative bg-surface-2 hover:bg-dark border border-border hover:border-dark rounded-2xl p-5 text-left transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  it.type === 'income'
                    ? 'bg-brand text-dark group-hover:bg-brand-light'
                    : 'bg-warning/15 text-warning group-hover:bg-warning group-hover:text-white'
                }`}
              >
                {it.icon}
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-brand text-dark">
                <Plus size={15} strokeWidth={2.8} />
              </div>
            </div>
            <p className="text-sm font-bold text-fg leading-tight truncate group-hover:text-white transition-colors">
              {it.label}
            </p>
            <p
              className={`text-[10px] uppercase tracking-[0.18em] font-bold mt-2 ${
                it.type === 'income'
                  ? 'text-brand-dark group-hover:text-brand'
                  : 'text-warning group-hover:text-warning'
              }`}
            >
              {it.type === 'income' ? 'Ingreso' : 'Gasto'}
            </p>
          </motion.button>
        ))}
      </div>
    </Card>
  );
};
