import { AppShell } from "@/components/AppShell";
import { KPICard } from "@/components/KPICard";
import { Card } from "@/components/Card";
import { LineChartBlock } from "@/components/Chart";
import {
  APPS,
  PAYOUTS,
  generateTimeSeries,
  totalKPIs,
} from "@/lib/mock-data";
import {
  formatCompact,
  formatCurrency,
  formatPercent,
  formatNumber,
} from "@/lib/format";
import clsx from "clsx";

export const metadata = { title: "Dashboard · Aduo Publisher" };

export default function DashboardPage() {
  const kpis = totalKPIs();
  const revenueSeries = generateTimeSeries(30, 165, 0.35, 9);
  const revSpark = generateTimeSeries(14, 155, 0.35, 4);
  const impSpark = generateTimeSeries(14, 82_000, 0.35, 15);
  const keysSpark = generateTimeSeries(14, 3, 0.05, 18);
  const fillSpark = generateTimeSeries(14, 86, 0.05, 22);

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Overview
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Revenue and delivery across all your integrated apps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total revenue (30d)"
          value={formatCurrency(kpis.totalRevenue)}
          delta={9.2}
          spark={revSpark}
        />
        <KPICard
          label="Impressions served"
          value={formatCompact(kpis.totalImpressions)}
          delta={6.8}
          spark={impSpark}
        />
        <KPICard
          label="Active SDK keys"
          value={formatNumber(kpis.activeKeys)}
          delta={0}
          spark={keysSpark}
        />
        <KPICard
          label="Fill rate"
          value={formatPercent(kpis.fillRate, 1)}
          delta={1.4}
          spark={fillSpark}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card
            title="Revenue — last 30 days"
            subtitle="Daily gross revenue across apps"
          >
            <LineChartBlock
              data={revenueSeries}
              color="#059669"
              formatValue={(v) => `$${v}`}
            />
          </Card>
        </div>
        <Card title="Recent payouts" subtitle="Last 5 transfers">
          <ul className="divide-y divide-neutral-100 -mx-5">
            {PAYOUTS.map((p) => (
              <li key={p.id} className="px-5 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-neutral-900">
                      {formatCurrency(p.amount)}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {p.date} · {p.method}
                    </div>
                  </div>
                  <span
                    className={clsx(
                      "text-xs font-medium capitalize rounded-full border px-2 py-0.5",
                      p.status === "paid" &&
                        "bg-emerald-50 text-emerald-700 border-emerald-200",
                      p.status === "pending" &&
                        "bg-amber-50 text-amber-700 border-amber-200",
                      p.status === "failed" &&
                        "bg-red-50 text-red-700 border-red-200",
                    )}
                  >
                    {p.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6">
        <Card
          title="Your apps"
          subtitle={`${APPS.length} apps integrated`}
        >
          <ul className="space-y-2">
            {APPS.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2.5"
              >
                <div>
                  <div className="text-sm font-medium text-neutral-900">
                    {a.name}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {a.packageName}
                  </div>
                </div>
                <div className="text-sm tabular-nums text-neutral-700">
                  {formatCurrency(a.revenue30d)}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
