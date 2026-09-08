import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Table, type Column } from "@/components/Table";
import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { CopyButton } from "@/components/CopyButton";
import { APPS, type PublisherApp } from "@/lib/mock-data";
import { formatCompact, formatCurrency, maskKey } from "@/lib/format";

export const metadata = { title: "Apps · Aduo Publisher" };

export default function AppsPage() {
  const columns: Column<PublisherApp>[] = [
    {
      key: "name",
      header: "App",
      render: (r) => (
        <div>
          <Link
            href={`/apps/${r.id}`}
            className="font-medium text-neutral-900 hover:text-indigo-700"
          >
            {r.name}
          </Link>
          <div className="text-xs text-neutral-500">{r.packageName}</div>
        </div>
      ),
    },
    {
      key: "sdkKey",
      header: "SDK key",
      render: (r) => (
        <div className="flex items-center gap-2">
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-700">
            {maskKey(r.sdkKey)}
          </code>
          <CopyButton text={r.sdkKey} label="Copy" />
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "impressions",
      header: "Impressions (30d)",
      align: "right",
      render: (r) => formatCompact(r.impressions30d),
    },
    {
      key: "revenue",
      header: "Revenue (30d)",
      align: "right",
      render: (r) => formatCurrency(r.revenue30d),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (r) => (
        <div className="flex justify-end gap-3">
          <Link
            href={`/apps/${r.id}`}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            Details
          </Link>
          <Link
            href={`/integration?app=${r.id}`}
            className="text-xs font-medium text-neutral-700 hover:text-neutral-900"
          >
            Integrate
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
            Apps
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {APPS.length} apps registered under this account.
          </p>
        </div>
        <Link href="/apps/new">
          <Button>+ Register app</Button>
        </Link>
      </div>

      <Card padded={false}>
        <Table
          columns={columns}
          rows={APPS}
          rowKey={(r) => r.id}
          empty="No apps yet. Register your first one to get started."
        />
      </Card>
    </AppShell>
  );
}
