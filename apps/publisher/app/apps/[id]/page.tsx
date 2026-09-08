import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { KPICard } from "@/components/KPICard";
import { LineChartBlock } from "@/components/Chart";
import { StatusBadge } from "@/components/StatusBadge";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/Button";
import { appById, generateTimeSeries } from "@/lib/mock-data";
import {
  formatCompact,
  formatCurrency,
  formatPercent,
} from "@/lib/format";

export default async function AppDetailPage(props: PageProps<"/apps/[id]">) {
  const { id } = await props.params;
  const app = appById(id);
  if (!app) notFound();

  const revenueSeries = generateTimeSeries(
    30,
    Math.max(20, app.revenue30d / 30),
    0.3,
    id.length,
  );
  const impressionsSeries = generateTimeSeries(
    30,
    Math.max(500, Math.floor(app.impressions30d / 30)),
    0.35,
    id.length + 3,
  );

  return (
    <AppShell>
      <div className="mb-6">
        <div className="text-xs text-neutral-500">
          <Link href="/apps" className="hover:text-neutral-800">
            Apps
          </Link>{" "}
          / {app.name}
        </div>
        <div className="mt-1 flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {app.name}
          </h1>
          <StatusBadge status={app.status} />
        </div>
        <p className="text-sm text-neutral-500 mt-1">
          {app.packageName} · registered {app.createdAt}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Revenue (30d)"
          value={formatCurrency(app.revenue30d)}
        />
        <KPICard
          label="Impressions (30d)"
          value={formatCompact(app.impressions30d)}
        />
        <KPICard label="Fill rate" value={formatPercent(app.fillRate, 1)} />
        <KPICard label="Integration" value={app.status.toUpperCase()} />
      </div>

      <div className="mt-6">
        <Card
          title="SDK key"
          subtitle="Use this key when initializing the Aduo SDK in your app."
          actions={
            <Link href={`/integration?app=${app.id}`}>
              <Button variant="secondary" size="sm">
                Integration guide
              </Button>
            </Link>
          }
        >
          <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2.5">
            <code className="flex-1 text-xs text-neutral-800 break-all">
              {app.sdkKey}
            </code>
            <CopyButton text={app.sdkKey} label="Copy key" />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Revenue timeline" subtitle="Daily, last 30 days">
          <LineChartBlock
            data={revenueSeries}
            color="#059669"
            format="currency"
          />
        </Card>
        <Card title="Impressions timeline" subtitle="Daily, last 30 days">
          <LineChartBlock data={impressionsSeries} />
        </Card>
      </div>
    </AppShell>
  );
}
