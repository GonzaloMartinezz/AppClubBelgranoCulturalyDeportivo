import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { formatMoney } from '../../lib/format';

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const monthLabel = (key) => {
  const [, m] = key.split('-');
  return MONTHS[parseInt(m, 10) - 1];
};

export const RevenueChart = ({ byMonth, title = 'Ingresos vs Gastos', subtitle = 'Últimos 6 meses' }) => {
  const [hover, setHover] = useState(null);

  const now = new Date();
  const keys = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  const data = keys.map((k) => ({
    key: k,
    income: byMonth[k]?.income || 0,
    expense: byMonth[k]?.expense || 0
  }));

  const max = Math.max(1, ...data.map((d) => Math.max(d.income, d.expense)));
  const hasAny = data.some((d) => d.income > 0 || d.expense > 0);
  const totalIncome = data.reduce((s, d) => s + d.income, 0);
  const totalExpense = data.reduce((s, d) => s + d.expense, 0);

  return (
    <Card>
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-border">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-fg">{title}</h3>
            <p className="text-xs text-muted mt-0.5">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="text-muted">In</span>
              <span className="text-fg font-semibold tabular">
                {formatMoney(totalIncome, { compact: true })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-warning" />
              <span className="text-muted">Out</span>
              <span className="text-fg font-semibold tabular">
                {formatMoney(totalExpense, { compact: true })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {!hasAny ? (
          <div className="h-48 sm:h-56 flex items-center justify-center text-sm text-muted text-center px-6">
            Sin datos todavía — cargá tu primer movimiento
          </div>
        ) : (
          <div className="relative h-48 sm:h-56 md:h-64">
            {/* Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-[10px] text-muted-2 tabular w-10 sm:w-12 text-right">
                    {formatMoney((max / 3) * (3 - i), { compact: true })}
                  </span>
                  <div className="flex-1 border-t border-dashed border-border" />
                </div>
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 pl-12 sm:pl-14 flex items-end gap-1.5 sm:gap-3">
              {data.map((d, idx) => {
                const incH = (d.income / max) * 100;
                const expH = (d.expense / max) * 100;
                const isHovered = hover === idx;
                return (
                  <div
                    key={d.key}
                    onMouseEnter={() => setHover(idx)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setHover(isHovered ? null : idx)}
                    className="flex-1 flex flex-col items-center justify-end gap-2 h-full min-w-0 group relative cursor-pointer"
                  >
                    {isHovered && (d.income > 0 || d.expense > 0) && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-1 z-20 bg-dark text-white rounded-lg shadow-xl px-2.5 py-1.5 text-[11px] space-y-0.5 pointer-events-none whitespace-nowrap"
                      >
                        <p className="font-semibold">{monthLabel(d.key)}</p>
                        <p className="text-accent tabular">+{formatMoney(d.income, { compact: true })}</p>
                        <p className="text-warning tabular">−{formatMoney(d.expense, { compact: true })}</p>
                      </motion.div>
                    )}

                    <div className="flex items-end gap-1 w-full h-[calc(100%-1.25rem)] justify-center">
                      <div className="relative flex-1 max-w-[18px] sm:max-w-[24px] h-full flex items-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${incH}%` }}
                          transition={{ delay: idx * 0.04, duration: 0.4 }}
                          className={`w-full rounded-t-md transition-colors ${
                            isHovered ? 'bg-accent/90' : 'bg-accent/70'
                          }`}
                        />
                      </div>
                      <div className="relative flex-1 max-w-[18px] sm:max-w-[24px] h-full flex items-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${expH}%` }}
                          transition={{ delay: idx * 0.04 + 0.04, duration: 0.4 }}
                          className={`w-full rounded-t-md transition-colors ${
                            isHovered ? 'bg-warning/90' : 'bg-warning/60'
                          }`}
                        />
                      </div>
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs transition-colors ${
                        isHovered ? 'text-fg font-semibold' : 'text-muted font-medium'
                      }`}
                    >
                      {monthLabel(d.key)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
