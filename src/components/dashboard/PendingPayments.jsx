import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatMoney, formatDate } from '../../lib/format';
import { getCategoryInfo } from '../../data/categories';

const daysUntil = (dateStr) => {
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.round((d - today) / 86400000);
};

export const PendingPayments = ({ transactions, total, onPick, onMark }) => {
  const pending = transactions
    .filter((t) => t.status === 'pending' && t.type === 'income')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <Card radius="xl" className="h-full flex flex-col overflow-hidden">
      <div className="px-7 py-6 border-b border-border flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-fg tracking-tight">Cuentas por cobrar</h3>
          <p className="text-xs text-muted mt-1">
            {pending.length === 0
              ? 'Todo cobrado · sin pendientes'
              : `${pending.length} ${pending.length === 1 ? 'pendiente' : 'pendientes'} · ${formatMoney(total, { compact: true })}`}
          </p>
        </div>
        {pending.length > 0 && (
          <Link
            to="/movimientos"
            className="text-xs text-fg hover:text-brand-dark font-bold inline-flex items-center gap-1 underline underline-offset-4 decoration-2"
          >
            Ver todo <ArrowRight size={11} />
          </Link>
        )}
      </div>

      <div className="p-5 md:p-7 flex-1">
        {pending.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 rounded-2xl bg-brand-soft border border-brand/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={22} className="text-brand-dark" />
            </div>
            <p className="text-sm font-bold text-fg">Sin pendientes</p>
            <p className="text-xs text-muted mt-1.5">Felicitaciones, todo cobrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((tx) => {
              const info = getCategoryInfo(tx.category, tx.type);
              const days = daysUntil(tx.date);
              const isOverdue = days < 0;
              return (
                <button
                  key={tx.id}
                  onClick={() => onPick?.(tx)}
                  className="w-full flex items-center gap-4 p-4 bg-surface-2 hover:bg-surface-3 border border-border hover:border-border-strong rounded-2xl transition-all group text-left"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      isOverdue ? 'bg-danger/10' : 'bg-warning/15'
                    }`}
                  >
                    {info.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-fg truncate">{tx.description}</p>
                    <div className="flex items-center gap-1.5 text-[11px] mt-1">
                      <Clock size={11} className={isOverdue ? 'text-danger' : 'text-muted'} />
                      <span
                        className={`tabular font-medium ${
                          isOverdue ? 'text-danger' : 'text-muted'
                        }`}
                      >
                        {isOverdue
                          ? `Vencido hace ${Math.abs(days)} ${Math.abs(days) === 1 ? 'día' : 'días'}`
                          : days === 0
                          ? 'Vence hoy'
                          : `Vence en ${days} ${days === 1 ? 'día' : 'días'} · ${formatDate(tx.date)}`}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base font-bold tabular text-fg">
                      {formatMoney(tx.amount, { compact: true })}
                    </p>
                    <Button
                      size="xs"
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMark?.(tx);
                      }}
                      className="mt-1.5"
                    >
                      Cobrar
                    </Button>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};
