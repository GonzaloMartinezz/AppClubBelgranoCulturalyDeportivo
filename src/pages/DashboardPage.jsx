import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Wallet, Clock, ArrowRight, Plus,
  Activity, Target, Receipt
} from 'lucide-react';
import { useTransactions } from '../context/transactionsContext';
import { Card } from '../components/ui/Card';
import { Button, PillButton } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { TransactionRow } from '../components/transactions/TransactionRow';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { HeroBento } from '../components/dashboard/HeroBento';
import { QuickActions } from '../components/dashboard/QuickActions';
import { PendingPayments } from '../components/dashboard/PendingPayments';
import { formatMoney } from '../lib/format';

const SectionTitle = ({ number, label, title, description, action }) => (
  <div className="flex items-end justify-between flex-wrap gap-5 mb-8 md:mb-10">
    <div className="min-w-0 flex items-start gap-5">
      <span className="text-5xl md:text-7xl font-bold text-muted-3 leading-none tracking-tight font-mono">
        {number}
      </span>
      <div className="pt-1">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted font-bold mb-2">
          {label}
        </p>
        <h2 className="headline-display text-2xl md:text-4xl text-fg tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted mt-3 max-w-xl">{description}</p>
        )}
      </div>
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

const DashboardPage = () => {
  const { transactions, stats, toggleStatus } = useTransactions();
  const { openNewForm, openDetail, openDelete } = useOutletContext();
  const navigate = useNavigate();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  const uniqueDays = new Set(
    transactions.map((t) => new Date(t.date).toDateString())
  ).size;

  const monthsArr = Object.entries(stats.byMonth || {});
  const bestMonth =
    monthsArr.length > 0
      ? monthsArr.reduce(
          (best, [k, v]) => (v.income > best.income ? { key: k, income: v.income } : best),
          { key: null, income: 0 }
        )
      : null;

  return (
    <div className="space-y-20 md:space-y-28">
      {/* ═══════════════════════════════════════════
          SECCIÓN 01 — HERO BENTO
          ═══════════════════════════════════════════ */}
      <section className="animate-fade-in-up">
        <HeroBento
          stats={stats}
          onNewMovement={() => openNewForm()}
          onViewAnalysis={() => navigate('/analisis')}
        />
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 02 — KPIs
          ═══════════════════════════════════════════ */}
      <section>
        <SectionTitle
          number="02"
          label="Métricas"
          title="Indicadores principales"
          description="Resumen del rendimiento histórico del negocio."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          <BigStat
            label="Ingresos totales"
            value={formatMoney(stats.totalIncome, { compact: true })}
            hint={`${stats.projects} ${stats.projects === 1 ? 'proyecto' : 'proyectos'}`}
            icon={TrendingUp}
            tone="brand"
          />
          <BigStat
            label="Gastos totales"
            value={formatMoney(stats.totalExpense, { compact: true })}
            hint={`${transactions.filter((t) => t.type === 'expense').length} gastos`}
            icon={TrendingDown}
            tone="warning"
          />
          <BigStat
            label="Balance neto"
            value={formatMoney(stats.balance, { compact: true })}
            hint={`${stats.margin}% margen`}
            icon={Wallet}
            tone={stats.balance >= 0 ? 'dark' : 'danger'}
          />
          <BigStat
            label="Por cobrar"
            value={formatMoney(stats.pendingAmount, { compact: true })}
            hint={`${stats.pendingCount} sin cobrar`}
            icon={Clock}
            tone="cream"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 03 — Análisis
          ═══════════════════════════════════════════ */}
      <section>
        <SectionTitle
          number="03"
          label="Análisis"
          title="Evolución mensual"
          description="Comparativa de ingresos vs gastos en los últimos 6 meses."
          action={
            <Link to="/analisis">
              <PillButton variant="outline" icon={ArrowRight}>
                Ver análisis
              </PillButton>
            </Link>
          }
        />
        <RevenueChart byMonth={stats.byMonth} height="h-80 md:h-96" />
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 04 — Operaciones
          ═══════════════════════════════════════════ */}
      <section>
        <SectionTitle
          number="04"
          label="Operaciones"
          title="Acciones y pendientes"
          description="Cargá nuevos movimientos o gestioná cuentas por cobrar."
        />
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 md:gap-8">
          <QuickActions onPick={openNewForm} />
          <PendingPayments
            transactions={transactions}
            total={stats.pendingAmount}
            onPick={openDetail}
            onMark={(tx) => toggleStatus(tx.id)}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 05 — Highlights
          ═══════════════════════════════════════════ */}
      <section>
        <SectionTitle
          number="05"
          label="Highlights"
          title="Indicadores destacados"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <HighlightCard
            icon={Target}
            label="Ticket promedio"
            value={formatMoney(stats.avgProject, { compact: true })}
            hint="por proyecto cobrado"
          />
          <HighlightCard
            icon={Activity}
            label="Días con actividad"
            value={uniqueDays.toString()}
            hint={`${stats.transactionsCount} movimientos totales`}
          />
          <HighlightCard
            icon={TrendingUp}
            label="Mejor mes"
            value={
              bestMonth?.key
                ? formatMoney(bestMonth.income, { compact: true })
                : '—'
            }
            hint={bestMonth?.key ? formatMonthKey(bestMonth.key) : 'sin datos aún'}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 06 — Histórico
          ═══════════════════════════════════════════ */}
      <section>
        <SectionTitle
          number="06"
          label="Histórico"
          title="Actividad reciente"
          description={`Últimos ${recent.length} movimientos · ${stats.transactionsCount} en total.`}
          action={
            transactions.length > 6 && (
              <Link to="/movimientos">
                <PillButton variant="outline" icon={ArrowRight}>
                  Ver todos
                </PillButton>
              </Link>
            )
          }
        />

        {recent.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="Aún no hay movimientos"
            description="Cargá tu primer ingreso o gasto para empezar a ver tu actividad."
            action={
              <Button variant="primary" size="lg" onClick={() => openNewForm()}>
                <Plus size={16} /> Crear movimiento
              </Button>
            }
          />
        ) : (
          <Card radius="xl">
            <div className="p-5 md:p-7 space-y-3">
              {recent.map((tx) => (
                <TransactionRow
                  key={tx.id}
                  tx={tx}
                  onClick={openDetail}
                  onDelete={openDelete}
                />
              ))}
            </div>
          </Card>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          CTA FINAL
          ═══════════════════════════════════════════ */}
      <section>
        <Card variant="dark" radius="xxl" className="p-10 md:p-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(191,232,62,0.5) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-brand font-bold mb-4">
                ✦ Listo para más
              </p>
              <h3 className="headline-display text-3xl md:text-5xl text-white">
                Sumá un<br />movimiento.
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <PillButton variant="brand" icon={Plus} onClick={() => openNewForm()}>
                Cargar ahora
              </PillButton>
              <Link to="/movimientos">
                <PillButton
                  variant="outline"
                  icon={ArrowRight}
                  className="!bg-transparent !text-white !border-white/30 hover:!bg-white hover:!text-dark"
                >
                  Ver histórico
                </PillButton>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

/* ────────── Subcomponentes inline ────────── */

const BigStat = ({ label, value, hint, icon: Icon, tone = 'cream' }) => {
  const toneMap = {
    brand: {
      card: 'bg-brand border-brand text-dark',
      icon: 'bg-dark text-brand',
      sub: 'text-dark/70'
    },
    warning: {
      card: 'bg-warning border-warning text-white',
      icon: 'bg-white/20 text-white',
      sub: 'text-white/80'
    },
    dark: {
      card: 'bg-dark border-dark text-white',
      icon: 'bg-brand text-dark',
      sub: 'text-white/60'
    },
    danger: {
      card: 'bg-danger border-danger text-white',
      icon: 'bg-white/20 text-white',
      sub: 'text-white/80'
    },
    cream: {
      card: 'bg-surface border-border',
      icon: 'bg-surface-2 text-fg',
      sub: 'text-muted'
    }
  };
  const t = toneMap[tone];

  return (
    <Card radius="xl" className={`p-6 md:p-8 ${t.card} bento-card`}>
      <div className="flex items-center justify-between mb-6">
        <span className={`text-[10px] uppercase tracking-[0.18em] font-bold ${t.sub}`}>
          {label}
        </span>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.icon}`}>
            <Icon size={17} strokeWidth={2.5} />
          </div>
        )}
      </div>
      <p className="text-3xl md:text-5xl font-bold tabular tracking-tight leading-none">
        {value}
      </p>
      <p className={`text-xs mt-3 ${t.sub}`}>{hint}</p>
    </Card>
  );
};

const HighlightCard = ({ icon: Icon, label, value, hint }) => (
  <Card radius="xl" className="p-6 md:p-8 bento-card group">
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-2xl bg-dark text-brand border border-dark flex items-center justify-center shrink-0 group-hover:rotate-3 transition-transform">
        <Icon size={22} strokeWidth={2.2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-muted font-bold uppercase tracking-[0.18em]">
          {label}
        </p>
        <p className="text-2xl md:text-4xl font-bold tabular tracking-tight text-fg mt-2">
          {value}
        </p>
        <p className="text-xs text-muted mt-2 truncate">{hint}</p>
      </div>
    </div>
  </Card>
);

const formatMonthKey = (key) => {
  const [year, month] = key.split('-');
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
};

export default DashboardPage;
