import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Table, type Column } from "@/components/Table";
import { Button } from "@/components/Button";
import { CAMPAIGNS, type Campaign } from "@/lib/mock-data";
import {
  formatCompact,
  formatCurrency,
  formatPercent,
} from "@/lib/format";
import { StatusBadge } from "./StatusBadge";

export const metadata = { title: "Campaigns · Aduo Advertiser" };

export default function CampaignsPage() {
  const columns: Column<Campaign>[] = [
    {
      key: "name",
      header: "Campaign",
      render: (r) => (
        <Link
          href={`/campaigns/${r.id}`}
          className="font-medium text-neutral-900 hover:text-indigo-700"
        >
          {r.name}
        </Link>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "impressions",
      header: "Impressions",
      align: "right",
      render: (r) => formatCompact(r.impressions),
    },
    {
      key: "clicks",
      header: "Clicks",
      align: "right",
      render: (r) => formatCompact(r.clicks),
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
      header: "Spent / Budget",
      align: "right",
      render: (r) => (
        <span>
          {formatCurrency(r.spent)}{" "}
          <span className="text-neutral-400">
            / {formatCurrency(r.budget)}
          </span>
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (r) => (
        <div className="flex justify-end gap-2">
          <Link
            href={`/campaigns/${r.id}`}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            View
          </Link>
        </div>
      ),
    },
  ];

  return (
    <AppShell>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Campaigns
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {CAMPAIGNS.length} campaigns across your workspace.
          </p>
        </div>
        <Link href="/campaigns/new">
          <Button>+ New campaign</Button>
        </Link>
      </div>

      <Card padded={false}>
        <Table
          columns={columns}
          rows={CAMPAIGNS}
          rowKey={(r) => r.id}
          empty="No campaigns yet. Create your first one to get started."
        />
      </Card>
    </AppShell>
  );
}
