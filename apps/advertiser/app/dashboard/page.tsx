import { AppShell } from "@/components/AppShell";
import { KPICard } from "@/components/KPICard";
import { Card } from "@/components/Card";
import { LineChartBlock } from "@/components/Chart";
import {
  RECENT_ACTIVITY,
  generateTimeSeries,
  totalKPIs,
} from "@/lib/mock-data";
import { formatCompact, formatCurrency, formatPercent } from "@/lib/format";
import { formatDistanceToNow } from "date-fns";
import { Activity as ActivityIcon } from "lucide-react";

export const metadata = { title: "Dashboard · Aduo Advertiser" };

export default function DashboardPage() {
  const kpis = totalKPIs();
  const impressionsSeries = generateTimeSeries(30, 85_000, 0.35, 7);
  const clicksSpark = generateTimeSeries(14, 2_800, 0.4, 3);
  const spendSpark = generateTimeSeries(14, 950, 0.3, 11);
  const impressionsSpark = generateTimeSeries(14, 85_000, 0.35, 5);
  const ctrSpark = generateTimeSeries(14, 32, 0.15, 8);

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Overview
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Real-time performance across your active campaigns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total impressions"
          value={formatCompact(kpis.impressions)}
          delta={12.4}
          spark={impressionsSpark}
        />
        <KPICard
          label="Total clicks"
          value={formatCompact(kpis.clicks)}
          delta={8.9}
          spark={clicksSpark}
        />
        <KPICard
          label="CTR"
          value={formatPercent(kpis.ctr, 2)}
          delta={-0.4}
          spark={ctrSpark}
        />
        <KPICard
          label="Total spend"
          value={formatCurrency(kpis.spent)}
          delta={5.2}
          spark={spendSpark}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card
            title="Impressions — last 30 days"
            subtitle="Aggregate across all campaigns"
          >
            <LineChartBlock data={impressionsSeries} />
          </Card>
        </div>
        <Card title="Recent activity" subtitle="System + campaign events">
          <ul className="divide-y divide-neutral-100 -mx-5">
            {RECENT_ACTIVITY.map((a) => (
              <li key={a.id} className="px-5 py-3">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 text-neutral-400">
                    <ActivityIcon size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-neutral-800 leading-snug">
                      {a.message}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {formatDistanceToNow(new Date(a.timestamp), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
