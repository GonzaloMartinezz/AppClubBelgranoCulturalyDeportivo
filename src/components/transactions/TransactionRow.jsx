import { Check, Clock, Trash2, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { IconButton } from '../ui/Button';
import { formatMoney, formatDate } from '../../lib/format';
import { getCategoryInfo } from '../../data/categories';

export const TransactionRow = ({ tx, onClick, onDelete, compact = false }) => {
  const info = getCategoryInfo(tx.category, tx.type);
  const isIncome = tx.type === 'income';

  return (
    <div
      onClick={() => onClick?.(tx)}
      className={`group flex items-center gap-3 md:gap-4 cursor-pointer transition-all ${
        compact
          ? 'py-3 px-3 rounded-xl hover:bg-surface-2'
          : 'p-4 md:p-5 bg-surface-2 border border-border hover:border-dark hover:bg-surface rounded-2xl'
      }`}
    >
      <div
        className={`rounded-xl flex items-center justify-center shrink-0 ${
          compact ? 'w-11 h-11 text-lg' : 'w-13 h-13 md:w-14 md:h-14 text-xl md:text-2xl'
        } ${isIncome ? 'bg-brand/30' : 'bg-warning/20'}`}
      >
        {info.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`font-bold text-fg truncate ${
            compact ? 'text-sm' : 'text-sm md:text-base'
          }`}
        >
          {tx.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted mt-1">
          <span className="font-medium">{info.label}</span>
          <span className="text-muted-2">·</span>
          <span className="tabular">{formatDate(tx.date)}</span>
          {Array.isArray(tx.items) && tx.items.length > 1 && (
            <>
              <span className="text-muted-2">·</span>
              <span>{tx.items.length} ítems</span>
            </>
          )}
        </div>
      </div>

      <div className="hidden sm:block shrink-0">
        <Badge
          tone={tx.status === 'completed' ? 'success' : 'warning'}
          icon={tx.status === 'completed' ? Check : Clock}
        >
          {tx.status === 'completed' ? 'Cobrado' : 'Pendiente'}
        </Badge>
      </div>

      <div className="text-right shrink-0">
        <p
          className={`font-bold tabular ${
            compact ? 'text-sm' : 'text-base md:text-lg'
          } ${isIncome ? 'text-fg' : 'text-warning'}`}
        >
          {isIncome ? '+' : '−'}
          {formatMoney(tx.amount)}
        </p>
      </div>

      {onDelete ? (
        <IconButton
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(tx);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-danger hover:bg-danger/10"
          aria-label="Eliminar"
        >
          <Trash2 size={14} />
        </IconButton>
      ) : (
        <ChevronRight
          size={16}
          className="text-muted-2 group-hover:text-fg transition-colors shrink-0"
        />
      )}
    </div>
  );
};
