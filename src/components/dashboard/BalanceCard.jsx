import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatMoney } from '../../lib/format';

const MONTHS_LONG = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const BalanceCard = ({ stats, onNewMovement }) => {
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

  const current = stats.byMonth[monthKey] || { income: 0, expense: 0 };
  const prev = stats.byMonth[prevKey] || { income: 0, expense: 0 };
  const currentBalance = current.income - current.expense;
  const prevBalance = prev.income - prev.expense;
  const deltaPct =
    prevBalance !== 0
      ? Math.round(((currentBalance - prevBalance) / Math.abs(prevBalance)) * 100)
      : null;
  const positive = deltaPct === null ? true : deltaPct >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-dark text-white p-6 sm:p-8 md:p-10"
    >
      {/* Subtle radial */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(34,197,94,0.15) 0%, transparent 50%)'
        }}
      />

      <div className="relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <p className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">
            Balance · {MONTHS_LONG[now.getMonth()]} {now.getFullYear()}
          </p>
        </div>

        {/* Balance principal */}
        <div className="mt-3 flex items-baseline gap-3 flex-wrap">
          <p
            className={`text-4xl sm:text-5xl md:text-6xl font-bold tabular tracking-tight ${
              currentBalance >= 0 ? 'text-white' : 'text-danger'
            }`}
          >
            {currentBalance >= 0 ? '' : '−'}
            {formatMoney(Math.abs(currentBalance))}
          </p>
          {deltaPct !== null && (
            <span
              className={`inline-flex items-center gap-1 px-2.5 h-7 rounded-full text-xs font-semibold tabular ${
                positive
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'bg-danger/20 text-danger border border-danger/30'
              }`}
            >
              {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {Math.abs(deltaPct)}%
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-white/60 mt-3">
          {prevBalance === 0
            ? 'Sin datos del mes anterior para comparar'
            : `${positive ? 'Mejor' : 'Peor'} que ${MONTHS_LONG[prevDate.getMonth()]} (${formatMoney(prevBalance, { compact: true })})`}
        </p>

        {/* Breakdown ingresos vs gastos */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-accent/20 flex items-center justify-center">
                <TrendingUp size={13} className="text-accent" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] sm:text-[11px] text-white/60 uppercase tracking-wider font-semibold">
                Ingresos
              </span>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold tabular text-accent tracking-tight">
              {formatMoney(current.income, { compact: true })}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-warning/20 flex items-center justify-center">
                <TrendingDown size={13} className="text-warning" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] sm:text-[11px] text-white/60 uppercase tracking-wider font-semibold">
                Gastos
              </span>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold tabular text-warning tracking-tight">
              {formatMoney(current.expense, { compact: true })}
            </p>
          </div>
        </div>

        {/* CTA (solo desktop, mobile usa FAB) */}
        <div className="hidden lg:flex items-center gap-2 mt-6">
          <Button
            variant="accent"
            size="md"
            onClick={onNewMovement}
            className="!bg-white !text-dark hover:!bg-white/90"
          >
            <Plus size={15} strokeWidth={2.5} /> Nuevo movimiento
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
