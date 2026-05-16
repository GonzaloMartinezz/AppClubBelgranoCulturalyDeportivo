import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Search, Receipt, Filter } from 'lucide-react';
import { useTransactions } from '../context/transactionsContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/EmptyState';
import { InputWithIcon } from '../components/ui/Input';
import { TransactionRow } from '../components/transactions/TransactionRow';
import { formatMoney } from '../lib/format';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'completed', label: 'Cobrados' },
  { value: 'pending', label: 'Pendientes' }
];

const TransactionsPage = () => {
  const { transactions } = useTransactions();
  const { openNewForm, openDetail, openDelete } = useOutletContext();

  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => (type === 'all' ? true : t.type === type))
      .filter((t) => (status === 'all' ? true : t.status === status))
      .filter((t) =>
        search.trim() === ''
          ? true
          : t.description.toLowerCase().includes(search.toLowerCase().trim())
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, type, status, search]);

  const totals = useMemo(() => {
    const income = filtered.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = filtered.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense, count: filtered.length };
  }, [filtered]);

  const typeOptions = [
    { value: 'all', label: 'Todas', count: transactions.length },
    { value: 'income', label: 'Ingresos', count: transactions.filter((t) => t.type === 'income').length },
    { value: 'expense', label: 'Gastos', count: transactions.filter((t) => t.type === 'expense').length }
  ];

  return (
    <div className="space-y-8 md:space-y-10">
      <PageHeader
        eyebrow="Histórico"
        title="Movimientos"
        description="Buscá, filtrá y revisá cada ingreso y gasto de tu negocio."
        actions={
          <Button variant="primary" onClick={() => openNewForm()}>
            <Plus size={15} /> Nuevo movimiento
          </Button>
        }
      />

      {/* Summary chips */}
      <div className="grid grid-cols-3 gap-4 md:gap-5">
        <Card className="p-5 md:p-6">
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Resultados</p>
          <p className="text-2xl md:text-3xl font-semibold tabular text-fg mt-2">{totals.count}</p>
        </Card>
        <Card className="p-5 md:p-6">
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Ingresos</p>
          <p className="text-2xl md:text-3xl font-semibold tabular text-brand mt-2">
            {formatMoney(totals.income, { compact: true })}
          </p>
        </Card>
        <Card className="p-5 md:p-6">
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Gastos</p>
          <p className="text-2xl md:text-3xl font-semibold tabular text-warning mt-2">
            {formatMoney(totals.expense, { compact: true })}
          </p>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="p-4 md:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex-1">
            <InputWithIcon
              icon={Search}
              placeholder="Buscar por descripción…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <Tabs value={type} onChange={setType} options={typeOptions} />
            <Tabs value={status} onChange={setStatus} options={STATUS_OPTIONS} />
          </div>
        </div>
      </Card>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={transactions.length === 0 ? Receipt : Filter}
          title={transactions.length === 0 ? 'Aún no hay movimientos' : 'Sin resultados'}
          description={
            transactions.length === 0
              ? 'Cargá tu primer movimiento para empezar.'
              : 'Probá con otros filtros o limpiá la búsqueda.'
          }
          action={
            transactions.length === 0 ? (
              <Button variant="primary" onClick={() => openNewForm()}>
                <Plus size={15} /> Crear movimiento
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setType('all');
                  setStatus('all');
                  setSearch('');
                }}
              >
                Limpiar filtros
              </Button>
            )
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} onClick={openDetail} onDelete={openDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
