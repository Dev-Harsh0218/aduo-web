import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { KPICard } from "@/components/KPICard";
import { LineChartBlock } from "@/components/Chart";
import { Table, type Column } from "@/components/Table";
import { StatusBadge } from "../StatusBadge";
import {
  campaignById,
  generateTimeSeries,
  TARGET_APPS,
} from "@/lib/mock-data";
import {
  formatCompact,
  formatCurrency,
  formatPercent,
  formatNumber,
} from "@/lib/format";

type AppBreakdownRow = {
  id: string;
  name: string;
  impressions: number;
  clicks: number;
  spent: number;
};

export default async function CampaignDetailPage(
  props: PageProps<"/campaigns/[id]">,
) {
  const { id } = await props.params;
  const campaign = campaignById(id);
  if (!campaign) notFound();

  const impressionsSeries = generateTimeSeries(
    30,
    Math.max(500, Math.floor(campaign.impressions / 30)),
    0.3,
    id.length,
  );
  const clicksSeries = generateTimeSeries(
    30,
    Math.max(20, Math.floor(campaign.clicks / 30)),
    0.35,
    id.length + 1,
  );

  const perApp: AppBreakdownRow[] = campaign.targetApps.map((name, i) => {
    const app = TARGET_APPS.find((a) => a.name === name);
    const weight = 1 / campaign.targetApps.length;
    const jitter = 0.85 + ((i * 7) % 5) / 15;
    return {
      id: app?.id ?? name,
      name,
      impressions: Math.round(campaign.impressions * weight * jitter),
      clicks: Math.round(campaign.clicks * weight * jitter),
      spent: campaign.spent * weight * jitter,
    };
  });

  const columns: Column<AppBreakdownRow>[] = [
    { key: "name", header: "App", render: (r) => r.name },
    {
      key: "impressions",
      header: "Impressions",
      align: "right",
      render: (r) => formatNumber(r.impressions),
    },
    {
      key: "clicks",
      header: "Clicks",
      align: "right",
      render: (r) => formatNumber(r.clicks),
    },
    {
      key: "ctr",
      header: "CTR",
      align: "right",
      render: (r) =>
        r.impressions === 0
          ? "—"
          : formatPercent((r.clicks / r.impressions) * 100, 2),
    },
    {
      key: "spent",
      header: "Spent",
      align: "right",
      render: (r) => formatCurrency(r.spent),
    },
  ];

  const ctr =
    campaign.impressions === 0
      ? 0
      : (campaign.clicks / campaign.impressions) * 100;

  return (
    <AppShell>
      <div className="mb-6">
        <div className="text-xs text-neutral-500">
          <Link href="/campaigns" className="hover:text-neutral-800">
            Campaigns
          </Link>{" "}
          / {campaign.name}
        </div>
        <div className="mt-1 flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {campaign.name}
          </h1>
          <StatusBadge status={campaign.status} />
        </div>
        <p className="text-sm text-neutral-500 mt-1">
          {campaign.startDate} → {campaign.endDate} · Targeting{" "}
          {campaign.targetApps.length} apps
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Impressions"
          value={formatCompact(campaign.impressions)}
        />
        <KPICard label="Clicks" value={formatCompact(campaign.clicks)} />
        <KPICard label="CTR" value={formatPercent(ctr, 2)} />
        <KPICard
          label="Spent"
          value={`${formatCurrency(campaign.spent)} / ${formatCurrency(
            campaign.budget,
          )}`}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Impressions timeline" subtitle="Daily, last 30 days">
          <LineChartBlock data={impressionsSeries} />
        </Card>
        <Card title="Clicks timeline" subtitle="Daily, last 30 days">
          <LineChartBlock data={clicksSeries} color="#0ea5e9" />
        </Card>
      </div>

      <div className="mt-6">
        <Card
          title="Per-app breakdown"
          subtitle="Distribution across target apps"
          padded={false}
        >
          <Table
            columns={columns}
            rows={perApp}
            rowKey={(r) => r.id}
            empty="This campaign has no target apps."
          />
        </Card>
      </div>
    </AppShell>
  );
}
