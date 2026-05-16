import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PieChart, TrendingUp, ArrowUpRight, Plus, BarChart3 } from 'lucide-react';
import { useTransactions } from '../context/transactionsContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { CATEGORIES } from '../data/categories';
import { formatMoney } from '../lib/format';

const AnalyticsPage = () => {
  const { transactions, stats } = useTransactions();
  const { openNewForm } = useOutletContext();
  const [view, setView] = useState('income');

  const breakdown = useMemo(() => {
    const list = CATEGORIES[view].map((cat) => {
      const data = stats.categoryStats[`${view}:${cat.value}`];
      return {
        ...cat,
        total: data?.total || 0,
        count: data?.count || 0
      };
    });
    const total = list.reduce((s, c) => s + c.total, 0);
    return { list: list.sort((a, b) => b.total - a.total), total };
  }, [stats, view]);

  const hasData = transactions.length > 0;

  return (
    <div className="space-y-8 md:space-y-12">
      <PageHeader
        eyebrow="Insights"
        title="Análisis"
        description="Descubrí dónde se concentra tu rentabilidad y cómo evoluciona tu negocio."
      />

      {!hasData ? (
        <EmptyState
          icon={BarChart3}
          title="Aún no hay datos para analizar"
          description="Cargá movimientos para empezar a ver tendencias, categorías y métricas clave."
          action={
            <Button variant="primary" onClick={() => openNewForm()}>
              <Plus size={15} /> Crear movimiento
            </Button>
          }
        />
      ) : (
        <>
          {/* Métricas clave */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <Card className="p-5 md:p-6">
              <p className="text-xs text-muted">Margen neto</p>
              <p className="text-2xl font-semibold tabular text-fg mt-1">{stats.margin}%</p>
              <p className="text-[11px] text-muted mt-1">balance / ingresos</p>
            </Card>
            <Card className="p-5 md:p-6">
              <p className="text-xs text-muted">Ticket promedio</p>
              <p className="text-2xl font-semibold tabular text-fg mt-1">
                {formatMoney(stats.avgProject, { compact: true })}
              </p>
              <p className="text-[11px] text-muted mt-1">por proyecto</p>
            </Card>
            <Card className="p-5 md:p-6">
              <p className="text-xs text-muted">Tasa de cobro</p>
              <p className="text-2xl font-semibold tabular text-fg mt-1">
                {transactions.length > 0
                  ? `${((transactions.filter((t) => t.status === 'completed').length / transactions.length) * 100).toFixed(0)}%`
                  : '—'}
              </p>
              <p className="text-[11px] text-muted mt-1">
                {stats.pendingCount} pendientes
              </p>
            </Card>
            <Card className="p-5 md:p-6">
              <p className="text-xs text-muted">Movimientos</p>
              <p className="text-2xl font-semibold tabular text-fg mt-1">
                {stats.transactionsCount}
              </p>
              <p className="text-[11px] text-muted mt-1">en total</p>
            </Card>
          </div>

          {/* Tendencia */}
          <RevenueChart byMonth={stats.byMonth} />

          {/* Breakdown por categoría */}
          <Card>
            <CardHeader
              title="Desglose por categoría"
              subtitle="Ordenado por monto total"
              action={
                <Tabs
                  value={view}
                  onChange={setView}
                  options={[
                    { value: 'income', label: 'Ingresos' },
                    { value: 'expense', label: 'Gastos' }
                  ]}
                />
              }
            />
            <div className="p-3 md:p-4">
              {breakdown.list.every((c) => c.total === 0) ? (
                <div className="py-10 text-center text-sm text-muted">
                  No hay {view === 'income' ? 'ingresos' : 'gastos'} registrados todavía
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {breakdown.list.map((cat) => {
                    const pct = breakdown.total > 0 ? (cat.total / breakdown.total) * 100 : 0;
                    return (
                      <button
                        key={cat.value}
                        onClick={() =>
                          openNewForm({ type: view, category: cat.value })
                        }
                        className="w-full flex items-center gap-4 px-3 py-4 hover:bg-surface-2/50 rounded-lg transition-colors group text-left"
                      >
                        <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center text-lg shrink-0">
                          {cat.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <p className="text-sm font-medium text-fg truncate">{cat.label}</p>
                            <p className="text-sm font-semibold tabular text-fg">
                              {formatMoney(cat.total, { compact: true })}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1 bg-surface-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  view === 'income' ? 'bg-brand' : 'bg-warning'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[11px] text-muted tabular w-16 text-right">
                              {pct.toFixed(0)}% · {cat.count}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-muted-2 group-hover:text-brand transition-colors shrink-0"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader title="Recomendaciones" subtitle="Basadas en tus datos actuales" />
            <div className="p-5 md:p-6 grid md:grid-cols-2 gap-3">
              {stats.margin < 30 && stats.totalIncome > 0 && (
                <InsightItem
                  tone="warning"
                  title="Margen bajo"
                  text={`Tu margen está en ${stats.margin}%. Revisá tus gastos fijos o ajustá precios.`}
                />
              )}
              {stats.pendingAmount > stats.totalIncome * 0.2 && stats.pendingAmount > 0 && (
                <InsightItem
                  tone="warning"
                  title="Cuentas por cobrar altas"
                  text={`Tenés ${formatMoney(stats.pendingAmount, { compact: true })} pendientes. Es buen momento para reclamar pagos.`}
                />
              )}
              {breakdown.list[0]?.total > 0 && view === 'income' && (
                <InsightItem
                  tone="success"
                  title="Tu fuente principal"
                  text={`${breakdown.list[0].label} representa ${((breakdown.list[0].total / breakdown.total) * 100).toFixed(0)}% de tus ingresos.`}
                />
              )}
              {stats.transactionsCount < 5 && (
                <InsightItem
                  tone="info"
                  title="Pocos datos todavía"
                  text="Cargá al menos 5 movimientos para tener análisis más representativos."
                />
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

const InsightItem = ({ tone, title, text }) => {
  const toneMap = {
    success: { bar: 'bg-success', icon: TrendingUp, badge: 'success' },
    warning: { bar: 'bg-warning', icon: TrendingUp, badge: 'warning' },
    info: { bar: 'bg-info', icon: PieChart, badge: 'info' }
  };
  const m = toneMap[tone] || toneMap.info;
  const Icon = m.icon;
  return (
    <div className="flex gap-3 p-4 bg-surface-2 border border-border rounded-xl">
      <div className={`w-1 rounded-full ${m.bar} shrink-0`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Icon size={13} className="text-muted" />
          <p className="text-sm font-medium text-fg">{title}</p>
        </div>
        <p className="text-xs text-muted leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
