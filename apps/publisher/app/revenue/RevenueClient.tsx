"use client";
import { useMemo, useState } from "react";
import { format, subDays, differenceInCalendarDays } from "date-fns";
import { Card } from "@/components/Card";
import { KPICard } from "@/components/KPICard";
import { LineChartBlock } from "@/components/Chart";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Table, type Column } from "@/components/Table";
import { generateTimeSeries } from "@/lib/mock-data";
import {
  formatCompact,
  formatCurrency,
  formatPercent,
} from "@/lib/format";

type App = {
  id: string;
  name: string;
  revenue30d: number;
  impressions30d: number;
};

type Row = {
  id: string;
  name: string;
  revenue: number;
  impressions: number;
  ecpm: number;
};

export function RevenueClient({ apps }: { apps: App[] }) {
  const today = new Date();
  const [start, setStart] = useState(
    format(subDays(today, 29), "yyyy-MM-dd"),
  );
  const [end, setEnd] = useState(format(today, "yyyy-MM-dd"));

  const { series, summary, rows } = useMemo(() => {
    const days =
      Math.max(1, differenceInCalendarDays(new Date(end), new Date(start))) +
      1;
    const series = generateTimeSeries(Math.min(days, 90), 165, 0.3, 9);
    const totalRevenue = series.reduce((s, p) => s + p.value, 0);
    const rows: Row[] = apps.map((a) => {
      const revenue = (a.revenue30d / 30) * days;
      const impressions = Math.round((a.impressions30d / 30) * days);
      const ecpm = impressions === 0 ? 0 : (revenue / impressions) * 1000;
      return {
        id: a.id,
        name: a.name,
        revenue,
        impressions,
        ecpm,
      };
    });
    const totalImp = rows.reduce((s, r) => s + r.impressions, 0);
    const ecpm = totalImp === 0 ? 0 : (totalRevenue / totalImp) * 1000;
    return {
      series,
      summary: { totalRevenue, totalImp, ecpm, days },
      rows,
    };
  }, [start, end, apps]);

  const columns: Column<Row>[] = [
    { key: "name", header: "App", render: (r) => r.name },
    {
      key: "revenue",
      header: "Revenue",
      align: "right",
      render: (r) => formatCurrency(r.revenue),
    },
    {
      key: "impressions",
      header: "Impressions",
      align: "right",
      render: (r) => formatCompact(r.impressions),
    },
    {
      key: "ecpm",
      header: "eCPM",
      align: "right",
      render: (r) => formatCurrency(r.ecpm),
    },
    {
      key: "share",
      header: "Share",
      align: "right",
      render: (r) =>
        summary.totalRevenue === 0
          ? "—"
          : formatPercent((r.revenue / summary.totalRevenue) * 100, 1),
    },
  ];

  return (
    <>
      <Card
        title="Date range"
        subtitle={`Showing ${summary.days} day${summary.days === 1 ? "" : "s"} of mocked revenue`}
      >
        <DateRangePicker
          start={start}
          end={end}
          onStartChange={setStart}
          onEndChange={setEnd}
        />
      </Card>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard
          label="Total revenue"
          value={formatCurrency(summary.totalRevenue)}
          delta={9.4}
        />
        <KPICard
          label="Impressions served"
          value={formatCompact(summary.totalImp)}
          delta={6.1}
        />
        <KPICard
          label="Avg eCPM"
          value={formatCurrency(summary.ecpm)}
          delta={2.3}
        />
      </div>

      <div className="mt-6">
        <Card title="Revenue over time">
          <LineChartBlock
            data={series}
            color="#059669"
            format="currency"
          />
        </Card>
      </div>

      <div className="mt-6">
        <Card
          title="Per-app breakdown"
          subtitle="Contribution of each app within the selected range"
          padded={false}
        >
          <Table columns={columns} rows={rows} rowKey={(r) => r.id} />
        </Card>
      </div>
    </>
  );
}
